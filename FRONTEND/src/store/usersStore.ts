import { create } from "zustand";

export interface User {
  walletAddress: string;
  role: "farmer" | "investor" | null;
  isRegistered: boolean;
  firstName: string;
  lastName: string;
}

interface UsersState {
  users: User[];
  currentUser: User | null;
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  removeUser: (walletAddress: string) => void;
  setCurrentUser: (user: User | null) => void;
  clearUsers: () => void;
}

const useUsersStore = create<UsersState>((set) => ({
  users: [],
  currentUser: null,
  setUsers: (users) => set({ users }),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  removeUser: (walletAddress) =>
    set((state) => ({
      users: state.users.filter((user) => user.walletAddress !== walletAddress),
    })),
  setCurrentUser: (user) => set({ currentUser: user }),
  clearUsers: () => set({ users: [], currentUser: null }),
}));

export default useUsersStore;