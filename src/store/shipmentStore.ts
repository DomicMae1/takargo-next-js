import { create } from "zustand";

interface Contact {
  nama: string;
  telepon: string;
  alamat: string;
}

type Step = "kontak" | "muatan" | "konfirmasi";

interface ShipmentState {
  // Kontak
  pengirim: Contact;
  penerima: Contact;
  setPengirim: (data: Partial<Contact>) => void;
  setPenerima: (data: Partial<Contact>) => void;

  // Step
  step: Step;
  setStep: (step: Step) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const steps: Step[] = ["kontak", "muatan", "konfirmasi"];

export const useShipmentStore = create<ShipmentState>((set, get) => ({
  // Step
  step: "kontak",
  setStep: (step) => set({ step }),
  nextStep: () => {
    const current = get().step;
    const currentIndex = steps.indexOf(current);
    if (currentIndex < steps.length - 1) {
      set({ step: steps[currentIndex + 1] });
    }
  },
  prevStep: () => {
    const current = get().step;
    const currentIndex = steps.indexOf(current);
    if (currentIndex > 0) {
      set({ step: steps[currentIndex - 1] });
    }
  },

  // Kontak
  pengirim: {
    nama: "Budi Santoso",
    telepon: "0812-3456-7890",
    alamat: "Jl. Merdeka No. 10, Jakarta",
  },
  penerima: {
    nama: "Andi Wijaya",
    telepon: "0813-9876-5432",
    alamat: "Jl. Pahlawan No. 20, Surabaya",
  },
  setPengirim: (data) =>
    set((state) => ({ pengirim: { ...state.pengirim, ...data } })),
  setPenerima: (data) =>
    set((state) => ({ penerima: { ...state.penerima, ...data } })),
}));
