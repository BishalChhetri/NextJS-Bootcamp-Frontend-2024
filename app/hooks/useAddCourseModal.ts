import { create } from "zustand";

interface AddCourseModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddCourseModal = create<AddCourseModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddCourseModal;
