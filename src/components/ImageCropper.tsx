import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop';
import { X, Check } from 'lucide-react';

interface ImageCropperProps {
  file: File;
  onCrop: (blob: Blob) => void;
  onCancel: () => void;
}

function getCroppedBlob(imageSrc: string, cropArea: Area): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 320;
      canvas.height = 320;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(
        image,
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height,
        0,
        0,
        320,
        320,
      );
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Canvas toBlob returned null'));
        },
        'image/jpeg',
        0.9,
      );
    };
    image.onerror = reject;
    image.src = imageSrc;
  });
}

export function ImageCropper({ file, onCrop, onCancel }: ImageCropperProps) {
  const imageSrc = URL.createObjectURL(file);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;
    const blob = await getCroppedBlob(imageSrc, croppedAreaPixels);
    URL.revokeObjectURL(imageSrc);
    onCrop(blob);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white rounded-2xl overflow-hidden w-full max-w-sm mx-4 shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-uber-gray-100">
          <h2 className="text-sm font-bold text-black">Crop photo</h2>
          <button
            onClick={onCancel}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-uber-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-uber-gray-500" />
          </button>
        </div>

        <div className="relative h-72 bg-uber-gray-900">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="px-5 py-3 border-t border-uber-gray-100">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-uber-gray-400 mb-1.5">Zoom</label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full accent-black"
          />
        </div>

        <div className="flex gap-3 px-5 pb-5">
          <button
            onClick={onCancel}
            className="flex-1 h-10 border border-uber-gray-200 rounded-lg text-sm font-semibold text-uber-gray-600 hover:border-uber-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 h-10 bg-black text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-uber-gray-800 transition-colors"
          >
            <Check className="w-4 h-4" />
            Use photo
          </button>
        </div>
      </div>
    </div>
  );
}
