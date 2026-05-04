import { create } from "zustand";

type DateSelectorState = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
};

export const useDateSelectorStore = create<DateSelectorState>((set) => ({
  selectedDate: new Date(),
  setSelectedDate: (date) => set({ selectedDate: date }),
}));
