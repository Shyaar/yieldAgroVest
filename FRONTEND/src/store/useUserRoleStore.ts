import { create } from "zustand";

type UserRole = "farmer" | "investor" | null;

interface UserRoleState {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const useUserRoleStore = create<UserRoleState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
}));

export default useUserRoleStore;
