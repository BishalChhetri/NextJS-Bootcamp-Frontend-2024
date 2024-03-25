import { create } from "zustand";

interface AddBootCampModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddBootCampModal = create<AddBootCampModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddBootCampModal;
