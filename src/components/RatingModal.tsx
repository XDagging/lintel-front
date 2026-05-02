import { useState } from 'react';
import { Star } from 'lucide-react';
import { jobs } from '../lib/api';
import type { ServiceType } from '../lib/api';
import { cn } from '../lib/utils';
import { toast } from '../hooks/useToast';

interface RatingModalProps {
  jobId: string;
  serviceType: ServiceType | 'bundle';
  workerName?: string;
  onComplete: () => void;
  onSkip: () => void;
}

export function RatingModal({ jobId, serviceType, workerName, onComplete, onSkip }: RatingModalProps) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const displayed = hovered || selected;

  const LABELS: Record<number, string> = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Great',
    5: 'Excellent!',
  };

  const handleSubmit = async () => {
    if (!selected) return;
    setSubmitting(true);
    try {
      await jobs.rate(jobId, serviceType, selected);
      toast({ title: 'Thanks for your rating!', description: `You gave ${selected} star${selected !== 1 ? 's' : ''}.` });
      onComplete();
    } catch {
      toast({ title: 'Rating failed', description: 'Please try again.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 pt-8 pb-6 text-center">
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
          </div>
          <h2 className="font-black text-black text-2xl mb-1">Rate your pro</h2>
          <p className="text-uber-gray-500 text-sm mb-6">
            {workerName ? `How did ${workerName} do?` : 'How was the service?'}
          </p>

          <div className="flex justify-center gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => setSelected(star)}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={cn(
                    'w-9 h-9 transition-colors',
                    star <= displayed ? 'text-amber-400 fill-amber-400' : 'text-uber-gray-200 fill-uber-gray-200'
                  )}
                />
              </button>
            ))}
          </div>

          <p className={cn('text-sm font-semibold h-5 transition-opacity', displayed ? 'opacity-100' : 'opacity-0')}>
            {LABELS[displayed] ?? ''}
          </p>
        </div>

        <div className="px-6 pb-6 space-y-2">
          <button
            onClick={handleSubmit}
            disabled={!selected || submitting}
            className="w-full h-14 bg-black text-white font-bold rounded-xl disabled:bg-uber-gray-100 disabled:text-uber-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? 'Submitting…' : selected ? `Submit ${selected}-star rating` : 'Select a rating'}
          </button>
          <button
            onClick={onSkip}
            className="w-full text-center text-sm text-uber-gray-400 hover:text-black transition-colors py-2"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
