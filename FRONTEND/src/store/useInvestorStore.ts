import { create } from "zustand";

interface Investor {
  firstName: string;
  lastName: string;
  name: string;
  country: string;
  isRegistered: boolean;
  address: string; // Assuming we'll store the investor's wallet address
}

interface InvestorState {
  investor: Investor | null;
  setInvestor: (investor: Investor | null) => void;
  clearInvestor: () => void;
}

const useInvestorStore = create<InvestorState>((set) => ({
  investor: null,
  setInvestor: (investor) => set({ investor }),
  clearInvestor: () => set({ investor: null }),
}));

export default useInvestorStore;
