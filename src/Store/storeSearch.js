import { create } from "zustand";

export const useItemStore = create((set) => ({
  arrayItems: [],
  searchItem: (item) =>
    set((state) => ({
      ...state,
      arrayItems: [...item],
    })),
}));
