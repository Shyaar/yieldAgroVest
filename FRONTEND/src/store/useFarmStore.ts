import { create } from "zustand";

interface Farm {
  id: number;
  farmer: string;
  budget: number;
  farmSize: number;
  insuranceAmount: number;
  totalShares: number;
  sharePrice: number;
  totalInvested: number;
  description: string;
  isFunded: boolean;
  escrowBalance: number;
  farmDurationDays: number;
  startTime: number;
  milestoneCount: number;
  periodSeconds: number;
  milestonesReleased: number;
  investors: string[];
  // investments: Map<string, number>; // Zustand doesn't handle Maps well directly, might need to flatten or use a different approach if needed
}

interface FarmState {
  farms: Farm[];
  setFarms: (farms: Farm[]) => void;
  addFarm: (farm: Farm) => void;
  updateFarm: (farmId: number, updatedFarm: Partial<Farm>) => void;
  clearFarms: () => void;
}

const useFarmStore = create<FarmState>((set) => ({
  farms: [],
  setFarms: (farms) => set({ farms }),
  addFarm: (farm) => set((state) => ({ farms: [...state.farms, farm] })),
  updateFarm: (farmId, updatedFarm) =>
    set((state) => ({
      farms: state.farms.map((farm) =>
        farm.id === farmId ? { ...farm, ...updatedFarm } : farm
      ),
    })),
  clearFarms: () => set({ farms: [] }),
}));

export default useFarmStore;
