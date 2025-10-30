import { create } from "zustand";

interface Farmer {
  firstName: string;
  lastName: string;
  name: string;
  location: string;
  isRegistered: boolean;
  address: string; // Assuming we'll store the farmer's wallet address
}

interface FarmerState {
  farmer: Farmer | null;
  setFarmer: (farmer: Farmer | null) => void;
  clearFarmer: () => void;
}

const useFarmerStore = create<FarmerState>((set) => ({
  farmer: null,
  setFarmer: (farmer) => set({ farmer }),
  clearFarmer: () => set({ farmer: null }),
}));

export default useFarmerStore;
