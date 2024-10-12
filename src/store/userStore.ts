import { create } from "zustand";
import { supabase } from "../utils/supabaseClient";
import { UserStore } from "../types/types";

const useUserStore = create<UserStore>((set) => ({
  user: null,

  setUser: (user: unknown) => set({ user }),

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));

export const fetchUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

export default useUserStore;
