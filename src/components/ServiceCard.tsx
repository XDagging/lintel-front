import { Wind, Droplets, Sparkles, Home, Scissors, Check } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import type { Service, ServiceType } from '../lib/api';

export const SERVICE_ICONS: Record<ServiceType, React.ElementType> = {
  'gutter-cleaning': Wind,
  'window-cleaning': Droplets,
  'pressure-washing': Sparkles,
  'house-cleaning-standard': Home,
  'house-cleaning-deep': Sparkles,
  'lawn-mowing': Scissors,
};

interface ServiceCardProps {
  service: Service;
  selected?: boolean;
  comingSoon?: boolean;
  discountedPrice?: number;
  onClick: () => void;
}

export function ServiceCard({ service, selected, comingSoon, discountedPrice, onClick }: ServiceCardProps) {
  const Icon = SERVICE_ICONS[service.id] ?? Home;
  const showDiscount = discountedPrice !== undefined && discountedPrice !== service.price;

  return (
    <button
      onClick={onClick}
      disabled={comingSoon}
      className={cn(
        'w-full flex items-center gap-4 px-4 py-4 rounded-xl border-2 text-left transition-all duration-150',
        comingSoon
          ? 'border-uber-gray-100 bg-uber-gray-50 cursor-not-allowed opacity-60'
          : cn(
              'hover:bg-uber-gray-50 active:scale-[0.99]',
              selected ? 'border-black bg-white' : 'border-uber-gray-200 bg-white'
            )
      )}
    >
      <div className={cn(
        'w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors relative',
        comingSoon ? 'bg-uber-gray-100' : selected ? 'bg-black' : 'bg-uber-gray-100'
      )}>
        <Icon className={cn('w-6 h-6', !comingSoon && selected ? 'text-white' : 'text-uber-gray-400')} />
        {selected && !comingSoon && (
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-uber-green rounded-full flex items-center justify-center shadow-sm">
            <Check className="w-3 h-3 text-white" strokeWidth={3} />
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-bold text-black text-base leading-tight">{service.name}</p>
          {comingSoon && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide bg-uber-gray-200 text-uber-gray-500">
              Coming soon
            </span>
          )}
        </div>
        <p className="text-uber-gray-500 text-sm mt-0.5 truncate">{service.description}</p>
        <p className="text-uber-gray-400 text-xs mt-1">{service.duration}</p>
      </div>

      <div className="text-right flex-shrink-0">
        {showDiscount ? (
          <>
            <p className="text-uber-gray-400 text-sm line-through leading-tight">{formatCurrency(service.price)}</p>
            <p className="font-bold text-uber-green text-lg leading-tight">{formatCurrency(discountedPrice!)}</p>
          </>
        ) : (
          <p className="font-bold text-black text-lg">{formatCurrency(service.price)}</p>
        )}
      </div>
    </button>
  );
}
