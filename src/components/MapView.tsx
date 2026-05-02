import { MapPin } from 'lucide-react';

interface MapViewProps {
  coordinates: { lat: number; lng: number } | null;
}

export function MapView({ coordinates }: MapViewProps) {
  const token = import.meta.env.VITE_MAPBOX_TOKEN as string | undefined;

  if (!coordinates || !token) {
    return (
      <div className="w-full h-full bg-uber-gray-100 flex flex-col items-center justify-center gap-3">
        <MapPin className="w-8 h-8 text-uber-gray-300" />
        <p className="text-sm text-uber-gray-400 font-medium">Enter your address to see your property</p>
      </div>
    );
  }

  const { lng, lat } = coordinates;
  const src = `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/pin-l+000(${lng},${lat})/${lng},${lat},18,0/1200x900@2x?access_token=${token}`;

  return (
    <div className="w-full h-full relative overflow-hidden bg-uber-gray-100">
      <img
        key={src}
        src={src}
        alt="Property satellite view"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
