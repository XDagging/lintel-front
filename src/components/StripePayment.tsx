import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Loader2, Lock } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

interface StripePaymentProps {
  amount: number;
  onSuccess: (paymentMethodId: string) => void;
  onError: (error: string) => void;
  submitLabel?: string;
}

export function StripePayment({ amount, onSuccess, onError, submitLabel }: StripePaymentProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        onError(submitError.message ?? 'Payment failed');
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({ elements });
      if (error) {
        onError(error.message ?? 'Payment failed');
        return;
      }

      onSuccess(paymentMethod.id);
    } catch {
      onError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-uber-gray-50 rounded-xl p-4">
        <PaymentElement
          options={{
            layout: 'tabs',
            appearance: {
              theme: 'stripe',
              variables: {
                colorPrimary: '#000000',
                colorBackground: '#F6F6F6',
                colorText: '#000000',
                colorDanger: '#C01A1A',
                borderRadius: '8px',
                fontFamily: 'Inter, system-ui, sans-serif',
              },
            },
          }}
        />
      </div>

      <div className="flex items-center gap-2 text-xs text-uber-gray-400">
        <Lock className="w-3 h-3 flex-shrink-0" />
        <span>Secured by Stripe. Your card is authorized now, charged only after job completion.</span>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full h-14 bg-black text-white font-bold text-base rounded-xl flex items-center justify-center gap-2 hover:bg-uber-gray-800 transition-colors disabled:bg-uber-gray-200 disabled:text-uber-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
        ) : (
          submitLabel ?? `Book for ${formatCurrency(amount)}`
        )}
      </button>
    </form>
  );
}
