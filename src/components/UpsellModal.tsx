import { X, Check, Plus, Minus, Zap, Home } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { SERVICE_ICONS } from './ServiceCard';
import type { Service, ServiceType } from '../lib/api';

const BUNDLE_DISCOUNT = 0.1;

interface UpsellModalProps {
  originalServiceId: ServiceType;
  selectedServices: ServiceType[];
  allServices: Service[];
  comingSoonIds: ServiceType[];
  onToggle: (id: ServiceType) => void;
  onContinue: () => void;
  onClose: () => void;
}

export function UpsellModal({
  originalServiceId,
  selectedServices,
  allServices,
  comingSoonIds,
  onToggle,
  onContinue,
  onClose,
}: UpsellModalProps) {
  const hasBundle = selectedServices.length > 1;

  const selectedObjects = allServices.filter((s) => selectedServices.includes(s.id));
  const addableServices = allServices.filter(
    (s) => !selectedServices.includes(s.id) && !comingSoonIds.includes(s.id)
  );

  const subtotal = selectedObjects.reduce((sum, s) => sum + s.price, 0);
  const savings = hasBundle ? subtotal * BUNDLE_DISCOUNT : 0;
  const total = subtotal - savings;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-3xl shadow-2xl max-h-[92vh] flex flex-col">
        {/* Mobile drag handle */}
        <div className="sm:hidden flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 bg-uber-gray-200 rounded-full" />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full text-uber-gray-400 hover:text-black hover:bg-uber-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1">
          {/* Hero */}
          <div className="px-6 pt-6 pb-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" fill="white" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-uber-gray-400 uppercase tracking-widest">Limited offer</p>
                <p className="font-black text-black text-sm leading-none">Bundle & Save 10%</p>
              </div>
            </div>

            {hasBundle ? (
              <>
                <h2 className="text-2xl font-black text-black leading-tight">
                  You're saving{' '}
                  <span className="text-uber-green">{formatCurrency(savings)}</span>
                </h2>
                <p className="text-uber-gray-500 text-sm mt-1.5">
                  Your 10% bundle discount is applied to all services.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-black text-black leading-tight">
                  Add a service,<br />save 10% on everything
                </h2>
                <p className="text-uber-gray-500 text-sm mt-1.5">
                  Bundle two or more services and we'll take 10% off your entire order.
                </p>
              </>
            )}

            {hasBundle && (
              <div className="mt-4 bg-uber-green/10 border border-uber-green/20 rounded-xl px-4 py-3 flex items-center justify-between">
                <span className="text-sm font-bold text-uber-green">Bundle discount applied</span>
                <span className="text-lg font-black text-uber-green">−{formatCurrency(savings)}</span>
              </div>
            )}
          </div>

          {/* Selected services */}
          <div className="px-6 pb-4">
            <p className="text-[11px] font-bold text-uber-gray-400 uppercase tracking-widest mb-2">
              Your Selection
            </p>
            <div className="space-y-1">
              {selectedObjects.map((svc) => {
                const Icon = SERVICE_ICONS[svc.id] ?? Home;
                const isOriginal = svc.id === originalServiceId;
                const discountedPrice = hasBundle ? svc.price * (1 - BUNDLE_DISCOUNT) : null;

                return (
                  <div key={svc.id} className="flex items-center gap-3 py-2">
                    <div className={cn(
                      'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0',
                      'bg-black'
                    )}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-black text-sm leading-tight">{svc.name}</p>
                      <p className="text-xs text-uber-gray-400 mt-0.5 truncate">{svc.duration}</p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="text-right">
                        {discountedPrice ? (
                          <>
                            <p className="text-[11px] text-uber-gray-400 line-through leading-none">
                              {formatCurrency(svc.price)}
                            </p>
                            <p className="text-sm font-bold text-uber-green leading-tight">
                              {formatCurrency(discountedPrice)}
                            </p>
                          </>
                        ) : (
                          <p className="text-sm font-bold text-black">{formatCurrency(svc.price)}</p>
                        )}
                      </div>

                      {isOriginal ? (
                        <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                        </div>
                      ) : (
                        <button
                          onClick={() => onToggle(svc.id)}
                          title="Remove"
                          className="w-7 h-7 rounded-full bg-uber-gray-100 hover:bg-uber-gray-200 flex items-center justify-center flex-shrink-0 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5 text-uber-gray-500" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add to bundle */}
          {addableServices.length > 0 && (
            <>
              <div className="mx-6 border-t border-uber-gray-100" />
              <div className="px-6 py-4">
                <p className="text-[11px] font-bold text-uber-gray-400 uppercase tracking-widest mb-3">
                  Add to Bundle
                </p>
                <div className="space-y-2">
                  {addableServices.map((svc) => {
                    const Icon = SERVICE_ICONS[svc.id] ?? Home;
                    const bundledPrice = svc.price * (1 - BUNDLE_DISCOUNT);

                    return (
                      <div
                        key={svc.id}
                        className="flex items-center gap-3 border-2 border-uber-gray-200 rounded-xl px-4 py-3 hover:border-uber-gray-300 transition-colors"
                      >
                        <div className="w-9 h-9 bg-uber-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-uber-gray-400" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-black text-sm leading-tight">{svc.name}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[11px] text-uber-gray-400 line-through">
                              {formatCurrency(svc.price)}
                            </span>
                            <span className="text-[11px] font-bold text-uber-green">
                              {formatCurrency(bundledPrice)} with bundle
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => onToggle(svc.id)}
                          className="flex items-center gap-1.5 px-3 h-8 bg-uber-gray-100 hover:bg-uber-gray-200 text-black text-sm font-bold rounded-lg transition-colors flex-shrink-0"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sticky footer */}
        <div className="flex-shrink-0 px-6 py-5 border-t border-uber-gray-100 bg-white space-y-3 sm:rounded-b-2xl">
          {hasBundle && (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-uber-gray-500">
                  Total · {selectedServices.length} services
                </p>
                <p className="text-[11px] text-uber-gray-400 mt-0.5">
                  You're saving {formatCurrency(savings)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-uber-gray-400 line-through">{formatCurrency(subtotal)}</p>
                <p className="text-2xl font-black text-black">{formatCurrency(total)}</p>
              </div>
            </div>
          )}

          <button
            onClick={onContinue}
            className="w-full h-14 bg-black text-white font-bold text-base rounded-xl flex items-center justify-center gap-2 hover:bg-uber-gray-800 transition-colors"
          >
            {hasBundle ? (
              <>
                Continue &amp; Save {formatCurrency(savings)}
                <Check className="w-4 h-4" strokeWidth={3} />
              </>
            ) : (
              'Continue to checkout'
            )}
          </button>

          {!hasBundle && (
            <button
              onClick={onContinue}
              className="w-full text-center text-sm text-uber-gray-400 hover:text-black transition-colors py-0.5"
            >
              No thanks, continue at full price
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
