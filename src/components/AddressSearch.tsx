import { useState, useRef, useEffect } from 'react';
import { MapPin, Navigation, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface Prediction {
  place_id: string;
  description: string;
  structured_formatting: { main_text: string; secondary_text: string };
}

interface AddressSearchProps {
  value: string;
  onChange: (address: string) => void;
  onConfirm: (address: string) => void;
  placeholder?: string;
  className?: string;
}

export function AddressSearch({ value, onChange, onConfirm, placeholder, className }: AddressSearchProps) {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [geoLoading, setGeoLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const containerRef = useRef<HTMLDivElement>(null);

  const url = window.location.href.includes("localhost") ? "http://localhost:3001" : "https://api.uselintel.pro"

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const fetchPredictions = async (input: string) => {
    if (!input.trim() || input.length < 3) { setPredictions([]); return; }
    try {
      const res = await fetch(url+ `/api/places/autocomplete?input=${encodeURIComponent(input)}`);
      const data = await res.json();
      setPredictions(data.predictions ?? []);
      setOpen(true);
    } catch { setPredictions([]); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchPredictions(e.target.value), 300);
  };

  const handleSelect = (p: Prediction) => {
    onChange(p.description);
    onConfirm(p.description);
    setOpen(false);
    setPredictions([]);
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) return;
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude: lat, longitude: lng } }) => {
        try {
          const res = await fetch(url + `/api/places/geocode?latlng=${lat},${lng}`);
          const data = await res.json();
          const addr = data.address ?? '';
          onChange(addr);
          onConfirm(addr);
        } finally { setGeoLoading(false); }
      },
      () => setGeoLoading(false)
    );
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div className="relative flex items-center bg-uber-gray-50 rounded-lg transition-colors focus-within:bg-uber-gray-100">
        <MapPin className="absolute left-3 w-4 h-4 text-uber-gray-400 pointer-events-none" />
        <input
          value={value}
          onChange={handleChange}
          placeholder={placeholder ?? 'Enter your address'}
          onFocus={() => predictions.length > 0 && setOpen(true)}
          className="w-full bg-transparent pl-10 pr-10 h-12 text-sm text-black placeholder-uber-gray-400 outline-none"
        />
        <button
          type="button"
          onClick={handleGeolocate}
          className="absolute right-3 text-uber-gray-400 hover:text-black transition-colors"
          title="Use my location"
        >
          {geoLoading
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : <Navigation className="w-4 h-4" />}
        </button>
      </div>

      {open && predictions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-uber-gray-200 rounded-xl overflow-hidden shadow-lg">
          {predictions.map((p) => (
            <button
              key={p.place_id}
              type="button"
              className="w-full flex items-start gap-3 px-4 py-3 hover:bg-uber-gray-50 text-left transition-colors border-b border-uber-gray-100 last:border-0"
              onClick={() => handleSelect(p)}
            >
              <MapPin className="w-4 h-4 text-uber-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-black">{p.structured_formatting.main_text}</p>
                <p className="text-xs text-uber-gray-500">{p.structured_formatting.secondary_text}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
