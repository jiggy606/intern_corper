import { create } from "zustand";
import { User } from "@/types/User";

type State = {
  interns: User[];
  addIntern: (intern: User) => void;
  deleteIntern: (id: number) => void;
};

export const internStore = create<State>((set) => ({
  interns: [],
  addIntern: (intern) =>
    set((s) => ({ interns: [...s.interns, intern] })),
  deleteIntern: (id) =>
    set((s) => ({ interns: s.interns.filter((i) => i.id !== id) })),
}));
