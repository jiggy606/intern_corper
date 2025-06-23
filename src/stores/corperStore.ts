import { create } from "zustand";
import { User } from "@/types/User";

type State = {
  corpers: User[];
  addCorper: (corper: User) => void;
  deleteCorper: (id: number) => void;
};

export const corperStore = create<State>((set) => ({
  corpers: [],
  addCorper: (corper) =>
    set((state) => ({ corpers: [...state.corpers, corper] })),
  deleteCorper: (id) =>
    set((state) => ({
      corpers: state.corpers.filter((c) => c.id !== id),
    })),
}));