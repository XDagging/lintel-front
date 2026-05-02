import { useState } from 'react';
import { X } from 'lucide-react';
import { formatCurrency, cn } from '../lib/utils';
import { jobs } from '../lib/api';
import type { ServiceType } from '../lib/api';
import { PaymentPanel } from './PaymentPanel';
import { toast } from '../hooks/useToast';

const PRESET_TIPS = [5, 10, 15, 20];

interface TipModalProps {
  jobPrice: number;
  workerName: string;
  workerImg?: string;
  jobId: string;
  serviceType: ServiceType | 'bundle';
  onComplete: () => void;
  onSkip: () => void;
}

export function TipModal({ jobPrice, workerName, workerImg, jobId, serviceType, onComplete, onSkip }: TipModalProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [custom, setCustom] = useState('');
  const [phase, setPhase] = useState<'select' | 'pay'>('select');
  const [tipAmount, setTipAmount] = useState(0);

  const currentAmount = custom ? parseFloat(custom) : selected ?? 0;

  const handleContinue = () => {
    if (currentAmount <= 0) return;
    setTipAmount(currentAmount);
    setPhase('pay');
  };

  const handlePay = async (paymentMethodId?: string) => {
    await jobs.tip(jobId, serviceType, tipAmount, paymentMethodId);
    toast({ title: 'Tip sent!', description: `${formatCurrency(tipAmount)} sent to your pro.` });
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-uber-gray-100 flex items-center justify-center font-black text-lg text-black overflow-hidden">
              {workerImg
                ? <img src={workerImg} alt={workerName} className="w-full h-full object-cover" />
                : workerName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-black text-black">
                {phase === 'select' ? `Add a tip for ${workerName}?` : `Tip ${formatCurrency(tipAmount)}`}
              </p>
              <p className="text-xs text-uber-gray-500">100% goes directly to your pro</p>
            </div>
          </div>
          <button onClick={onSkip} className="p-1 hover:bg-uber-gray-100 rounded-lg transition-colors">
            <X className="w-4 h-4 text-uber-gray-400" />
          </button>
        </div>

        <div className="px-6 pb-6 space-y-4">
          {phase === 'select' ? (
            <>
              <div className="grid grid-cols-4 gap-2">
                {PRESET_TIPS.map((tip) => (
                  <button
                    key={tip}
                    onClick={() => { setSelected(tip); setCustom(''); }}
                    className={cn(
                      'flex flex-col items-center py-3 rounded-xl border-2 transition-all',
                      selected === tip && !custom
                        ? 'border-black bg-black text-white'
                        : 'border-uber-gray-200 text-black hover:border-uber-gray-400'
                    )}
                  >
                    <span className="font-black text-base">${tip}</span>
                    <span className="text-xs opacity-60">{Math.round((tip / jobPrice) * 100)}%</span>
                  </button>
                ))}
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-uber-gray-400 font-semibold">$</span>
                <input
                  type="number"
                  min="1"
                  placeholder="Custom amount"
                  value={custom}
                  onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
                  className="w-full bg-uber-gray-50 rounded-lg pl-8 pr-4 h-12 text-sm text-black placeholder-uber-gray-400 outline-none focus:bg-uber-gray-100 transition-colors"
                />
              </div>

              <button
                onClick={handleContinue}
                disabled={currentAmount <= 0}
                className="w-full h-14 bg-black text-white font-bold rounded-xl disabled:bg-uber-gray-100 disabled:text-uber-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {currentAmount > 0 ? `Tip ${formatCurrency(currentAmount)}` : 'Select an amount'}
              </button>

              <button onClick={onSkip} className="w-full text-center text-sm text-uber-gray-400 hover:text-black transition-colors py-1">
                No tip this time
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setPhase('select')}
                className="text-sm text-uber-gray-500 hover:text-black transition-colors"
              >
                ← Change amount
              </button>
              <PaymentPanel
                amount={tipAmount}
                label={`Send tip ${formatCurrency(tipAmount)}`}
                onPay={handlePay}
                onError={(err) => toast({ title: 'Tip failed', description: err, variant: 'destructive' })}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
