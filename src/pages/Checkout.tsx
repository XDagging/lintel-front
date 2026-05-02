import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ChevronLeft, Tag, X, Sparkles } from 'lucide-react';
import { useBookingStore } from '../store/bookingStore';
import { useQuery } from '@tanstack/react-query';
import { services, jobs } from '../lib/api';
import { PaymentPanel } from '../components/PaymentPanel';
import { Input } from '../components/ui/input';
import { formatCurrency } from '../lib/utils';
import { toast } from '../hooks/useToast';

const BUNDLE_DISCOUNT = 0.1;

export default function Checkout() {
  const navigate = useNavigate();
  const {
    selectedServices, confirmedAddress, notes, promoCode, scheduledAt,
    setNotes, setPromoCode, setScheduledAt, setCurrentJobId, reset,
  } = useBookingStore();

  const [creating, setCreating] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const { data: serviceList } = useQuery({
    queryKey: ['services'],
    queryFn: () => services.list().then((r) => r.data),
    enabled: selectedServices.length > 0,
  });

  if (selectedServices.length === 0 || !confirmedAddress) return <Navigate to="/book" replace />;
  if (!serviceList) return null;

  const selectedServiceObjects = serviceList.filter((s) => selectedServices.includes(s.id));
  const hasBundle = selectedServiceObjects.length > 1;
  const subtotal = selectedServiceObjects.reduce((sum, s) => sum + s.price, 0);
  const discountAmount = hasBundle ? subtotal * BUNDLE_DISCOUNT : 0;
  const total = subtotal - discountAmount;

  const applyPromo = () => {
    if (!promoInput.trim()) return;
    setPromoCode(promoInput.trim().toUpperCase());
    setPromoApplied(true);
    toast({ title: 'Promo applied!' });
  };

  const handlePay = async (paymentMethodId?: string) => {
    if (selectedServiceObjects.length === 0 || !confirmedAddress) return;
    setCreating(true);
    try {
      let jobId: string;
      let jobServiceType: string;

      if (hasBundle) {
        const res = await jobs.createBundle({
          serviceTypes: selectedServices,
          address: confirmedAddress,
          scheduledAt: scheduledAt ?? undefined,
          notes: notes || undefined,
          promoCode: promoCode || undefined,
          paymentMethodId,
        });
        jobId = res.data.job.uuid;
        jobServiceType = 'bundle';
      } else {
        const res = await jobs.create({
          serviceType: selectedServices[0],
          address: confirmedAddress,
          scheduledAt: scheduledAt ?? undefined,
          notes: notes || undefined,
          promoCode: promoCode || undefined,
          paymentMethodId,
        });
        jobId = res.data.job.uuid;
        jobServiceType = selectedServices[0];
      }

      setCurrentJobId(jobId);
      toast({
        title: 'Booking confirmed!',
        description: hasBundle
          ? `${selectedServices.length} services booked — we're finding a pro for you.`
          : "We're finding a pro for you.",
      });
      reset();
      navigate(`/jobs/${jobId}?serviceType=${jobServiceType}`);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate('/book')}
          className="flex items-center gap-1 text-sm font-semibold text-uber-gray-500 hover:text-black transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <h1 className="text-3xl font-black text-black mb-1">Review & pay</h1>
        <p className="text-uber-gray-500 mb-8">Confirm your booking details</p>

        {/* Services summary */}
        <div className="border border-uber-gray-200 rounded-xl overflow-hidden mb-4">
          {selectedServiceObjects.map((svc, i) => (
            <div key={svc.id} className={i > 0 ? 'border-t border-uber-gray-100' : ''}>
              <div className="flex items-start justify-between px-5 py-4">
                <div className="flex-1 min-w-0 pr-4">
                  <p className="font-bold text-black text-base">{svc.name}</p>
                  <p className="text-uber-gray-500 text-sm mt-0.5">{svc.description}</p>
                  <p className="text-uber-gray-400 text-xs mt-1">⏱ {svc.duration}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  {hasBundle ? (
                    <>
                      <p className="text-uber-gray-400 text-sm line-through leading-tight">
                        {formatCurrency(svc.price)}
                      </p>
                      <p className="font-bold text-uber-green text-lg leading-tight">
                        {formatCurrency(svc.price * (1 - BUNDLE_DISCOUNT))}
                      </p>
                    </>
                  ) : (
                    <p className="font-black text-black text-2xl">{formatCurrency(svc.price)}</p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Price breakdown */}
          <div className="border-t border-uber-gray-200 bg-uber-gray-50 px-5 py-4 space-y-2">
            {hasBundle && (
              <>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-uber-gray-500">Subtotal</span>
                  <span className="text-uber-gray-500">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 font-semibold text-uber-green">
                    <Sparkles className="w-3.5 h-3.5" />
                    Bundle discount (10%)
                  </span>
                  <span className="font-semibold text-uber-green">−{formatCurrency(discountAmount)}</span>
                </div>
              </>
            )}
            <div className="flex items-center justify-between pt-1">
              <span className="font-black text-black">Total</span>
              <span className="font-black text-black text-xl">{formatCurrency(total)}</span>
            </div>
          </div>

          {/* Address */}
          <div className="border-t border-uber-gray-100 px-5 py-3">
            <p className="text-sm text-uber-gray-500">📍 {confirmedAddress}</p>
          </div>
        </div>

        {/* Options */}
        <div className="border border-uber-gray-200 rounded-xl p-5 mb-4 space-y-4">
          <div>
            <label className="block text-xs font-bold text-uber-gray-400 uppercase tracking-widest mb-2">Schedule (optional)</label>
            <Input
              type="datetime-local"
              value={scheduledAt ?? ''}
              onChange={(e) => setScheduledAt(e.target.value || null)}
              min={new Date().toISOString().slice(0, 16)}
              className="[color-scheme:light]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-uber-gray-400 uppercase tracking-widest mb-2">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Special instructions for your pro..."
              className="w-full h-20 px-4 py-3 bg-uber-gray-50 rounded-lg text-sm text-black placeholder-uber-gray-400 resize-none outline-none focus:bg-uber-gray-100 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-uber-gray-400 uppercase tracking-widest mb-2">Promo code (optional)</label>
            {promoApplied ? (
              <div className="flex items-center gap-2 bg-uber-gray-50 rounded-lg px-4 h-12">
                <Tag className="w-4 h-4 text-uber-green" />
                <span className="font-mono font-bold text-black flex-1">{promoCode}</span>
                <button onClick={() => { setPromoCode(''); setPromoInput(''); setPromoApplied(false); }}>
                  <X className="w-4 h-4 text-uber-gray-400 hover:text-black" />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                  placeholder="Enter promo code"
                  className="font-mono uppercase"
                  maxLength={10}
                />
                <button
                  onClick={applyPromo}
                  disabled={!promoInput.trim()}
                  className="px-5 h-12 bg-uber-gray-100 text-black font-semibold rounded-lg hover:bg-uber-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm flex-shrink-0"
                >
                  Apply
                </button>

              </div>
            )}

           
          </div>
        </div>


          <div className="border border-uber-gray-200 rounded-xl overflow-hidden mb-4">
            

          {/* Price breakdown */}
       
          {/* Address */}
        
        </div>


        {/* Payment */}
        <div className="border bg-white border-uber-gray-200 rounded-xl p-5 mb-6">
          <p className="text-xs font-bold text-uber-gray-400 uppercase tracking-widest mb-4">Payment</p>
          <PaymentPanel
            amount={total}
            label={`Book — ${formatCurrency(total)}`}
            loading={creating}
            onPay={handlePay}
            onError={(err) => toast({ title: 'Payment error', description: err, variant: 'destructive' })}
          />
        </div>
        <div className="border rounded-lg border-uber-gray-200 px-5 py-4 space-y-2">
          <p className='text-center'>You aren't charged till you are satisified with our work</p>
            
        </div>

      </div>
    </div>
  );
}
