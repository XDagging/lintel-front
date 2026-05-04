import { create } from 'zustand';
import type { ServiceType } from '../lib/api';

interface BookingStore {
  selectedServices: ServiceType[];
  address: string;
  confirmedAddress: string;
  coordinates: { lat: number; lng: number } | null;
  scheduledAt: string | null;
  notes: string;
  promoCode: string;
  currentJobId: string | null;
  quotes: Partial<Record<ServiceType, number>>;
  quotesReady: boolean;
  toggleService: (service: ServiceType) => void;
  setAddress: (address: string, confirmed?: boolean) => void;
  setCoordinates: (coords: { lat: number; lng: number }) => void;
  setScheduledAt: (date: string | null) => void;
  setNotes: (notes: string) => void;
  setPromoCode: (code: string) => void;
  setCurrentJobId: (id: string) => void;
  setQuotes: (quotes: Partial<Record<ServiceType, number>>) => void;
  setQuotesReady: (ready: boolean) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  selectedServices: [],
  address: '',
  confirmedAddress: '',
  coordinates: null,
  scheduledAt: null,
  notes: '',
  promoCode: '',
  currentJobId: null,
  quotes: {},
  quotesReady: false,
  toggleService: (service) =>
    set((state) => ({
      selectedServices: state.selectedServices.includes(service)
        ? state.selectedServices.filter((s) => s !== service)
        : [...state.selectedServices, service],
    })),
  setAddress: (address, confirmed) =>
    set({ address, confirmedAddress: confirmed ? address : '' }),
  setCoordinates: (coords) => set({ coordinates: coords }),
  setScheduledAt: (date) => set({ scheduledAt: date }),
  setNotes: (notes) => set({ notes }),
  setPromoCode: (code) => set({ promoCode: code }),
  setCurrentJobId: (id) => set({ currentJobId: id }),
  setQuotes: (quotes) => set({ quotes, quotesReady: true }),
  setQuotesReady: (ready) => set({ quotesReady: ready }),
  reset: () =>
    set({
      selectedServices: [],
      address: '',
      confirmedAddress: '',
      coordinates: null,
      scheduledAt: null,
      notes: '',
      promoCode: '',
      currentJobId: null,
      quotes: {},
      quotesReady: false,
    }),
}));
