import { useState } from 'react';
import { X, Phone, Loader2 } from 'lucide-react';
import { jobs } from '../lib/api';
import type { ServiceType } from '../lib/api';
import { toast } from '../hooks/useToast';

interface DisputeModalProps {
  jobId: string;
  serviceType: ServiceType | 'bundle';
  onClose: () => void;
}

export function DisputeModal({ jobId, serviceType, onClose }: DisputeModalProps) {
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!reason.trim()) return;
    setLoading(true);
    try {
      await jobs.dispute(jobId, serviceType, reason);
      toast({ title: 'Dispute filed', description: 'Our team will reach out within 24 hours.' });
      onClose();
    } catch {
      toast({ title: 'Error', description: 'Could not file dispute. Please call us.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-uber-gray-100">
          <h2 className="font-black text-black text-xl">File a dispute</h2>
          <button onClick={onClose} className="p-1 hover:bg-uber-gray-100 rounded-lg transition-colors">
            <X className="w-4 h-4 text-uber-gray-400" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Phone CTA */}
          <a
            href="tel:3012727224"
            className="flex items-center gap-3 bg-uber-gray-50 rounded-xl p-4 hover:bg-uber-gray-100 transition-colors"
          >
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-bold text-black text-sm">Prefer to talk?</p>
              <p className="font-black text-black text-lg">(301) 272-7224</p>
              <p className="text-xs text-uber-gray-400">Mon–Sat, 8am–8pm ET</p>
            </div>
          </a>

          <div>
            <label className="block text-xs font-bold text-uber-gray-400 uppercase tracking-widest mb-2">
              Describe the issue
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="What went wrong?"
              className="w-full h-28 px-4 py-3 bg-uber-gray-50 rounded-lg text-sm text-black placeholder-uber-gray-400 resize-none outline-none focus:bg-uber-gray-100 transition-colors"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 h-12 bg-uber-gray-100 text-black font-semibold rounded-xl hover:bg-uber-gray-200 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!reason.trim() || loading}
              className="flex-1 h-12 bg-black text-white font-semibold rounded-xl hover:bg-uber-gray-800 transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit dispute'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
