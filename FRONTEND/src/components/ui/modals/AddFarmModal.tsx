import { useState, type ChangeEvent, type FormEvent, type FC } from "react";
import { Button } from "../Button";
import { useYieldMvpActions } from "../../../hooks/yieldmvp/useYieldMvpActions";
import LoadingModal from "./LoadingModal/index";
import generateAvatarFromAddress from "../../../lib/generateAvatar";
import { useAccount } from "wagmi";

interface AddFarmModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetchFarms: () => void;
}

const AddFarmModal: FC<AddFarmModalProps> = ({ isOpen, onClose, refetchFarms }) => {
  const { address } = useAccount();
  const { createFarm } = useYieldMvpActions();
  const [formState, setFormState] = useState({
    budget: "",
    farmSize: "",
    totalShares: "",
    durationDays: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!address) {
      alert("Please connect your wallet first.");
      return;
    }

    setIsLoading(true);
    setLoadingMessage("Generating farm metadata...");

    try {
      const imageUrl = generateAvatarFromAddress(address);

      // const farmDetails = {
      //   farmSize: Number(formState.farmSize),
      //   budget: Number(formState.budget),
      //   duration: Number(formState.durationDays),
      // };

      // const tokenUri = await generateFarmMetadata(
      //   `Farm - ${formState.description.slice(0, 20)}`,
      //   formState.description,
      //   imageUrl, // Using the generated URL
      //   farmDetails
      // );
      setLoadingMessage("Creating farm on the blockchain...");

      await createFarm(
        BigInt(formState.budget),
        BigInt(formState.farmSize),
        BigInt(formState.totalShares),
        BigInt(formState.durationDays),
        formState.description,
        imageUrl
      );

      setTimeout(() => {
        refetchFarms();
        setIsLoading(false);
        onClose();
      }, 3000); 

    } catch (error) {
      console.error("Failed to create farm:", error);
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <LoadingModal show={isLoading} message={loadingMessage} />
      <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Create a New Farm</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                Budget
              </label>
              <input
                type="number"
                name="budget"
                id="budget"
                value={formState.budget}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="farmSize" className="block text-sm font-medium text-gray-700">
                Farm Size (in acres)
              </label>
              <input
                type="number"
                name="farmSize"
                id="farmSize"
                value={formState.farmSize}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="totalShares" className="block text-sm font-medium text-gray-700">
                Total Shares
              </label>
              <input
                type="number"
                name="totalShares"
                id="totalShares"
                value={formState.totalShares}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="durationDays" className="block text-sm font-medium text-gray-700">
                Duration (in days)
              </label>
              <input
                type="number"
                name="durationDays"
                id="durationDays"
                value={formState.durationDays}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formState.description}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" onClick={onClose} variant="secondary">
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Farm"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddFarmModal;
