import { useEffect, useRef, useState } from "react";
import { ArrowRight, Lightbulb } from "lucide-react";
import { toast } from "react-toastify";
import { Badge } from "../ui/Badge";
import { ImageCard } from "../ui/ImageCard";
import { useAccount, useConnect } from "wagmi";
import useUsersStore, { type User } from "../../store/usersStore";
import LoadingModal from "../ui/modals/LoadingModal";
import { useSingleUser } from "../../hooks/user/useUserRegistry";
import { useNavigate } from "react-router-dom";

export const HeroSection: React.FC = () => {


const [isModalOpenLoading, setIsModalOpenLoading] = useState(false);
const [modalMessage, setModalMessage] = useState("");

const navigate = useNavigate();
const { connectAsync, connectors } = useConnect();
const { address, isConnected } = useAccount();
const { setCurrentUser } = useUsersStore();

const { refetchUser } = useSingleUser(address);
const hasInitialized = useRef(false);

// 🔹 Safe wrapper to catch UserNotFound revert
async function safeRefetchUser(): Promise<User | null> {
  try {
    const result = await refetchUser(); // async function from the hook
    return result.data as User | null;
  } catch (err: any) {
    if (
      err?.cause?.name === "ContractFunctionRevertedError" &&
      err.cause?.error?.message?.includes("UserNotFound")
    ) {
      return null; // user does not exist
    }
    throw err; // any other error
  }
}

async function initializeUser() {
  if (!isConnected || !address) {
    toast.info("Please connect your wallet first.");
    try {
      const injected = connectors.find((c) => c.id === "injected");
      if (!injected) throw new Error("No wallet found");
      const { accounts } = await connectAsync({ connector: injected });
      toast.success(`Connected: ${accounts[0].slice(0, 6)}...`);
    } catch {
      toast.error("Wallet connection failed");
    }
    return;
  }

  setIsModalOpenLoading(true);
  setModalMessage("Fetching your profile...");

  try {
    const userData = await safeRefetchUser(); // use safe wrapper

    if (!userData) {
      // User does not exist
      navigate("./register/Register")
      return;
    }

    // User exists
    const { firstName, lastName, role, isRegistered } = userData;
    const formattedRole = role === "investor" ? "investor" : "farmer";

    setCurrentUser({
      walletAddress: address,
      firstName,
      lastName,
      role: formattedRole,
      isRegistered,
    });

    toast.success(`Welcome back, ${firstName || "user"}!`);
    navigate(formattedRole === "farmer" ? "farmers/dashboard" : "/investors/browse");
  } catch (err: unknown) {
    console.error("⚠️ Unexpected error:", err);
    toast.error("Something went wrong while fetching your data.");
  } finally {
    setIsModalOpenLoading(false);
  }
}

useEffect(() => {
  if (isConnected && !hasInitialized.current) {
    hasInitialized.current = true;
    initializeUser();
  }
}, [isConnected, address]);


  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 via-green-100 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* LEFT SIDE */}
        <div className="space-y-8">
          <Badge variant="success">Empowering Modern Agriculture</Badge>

          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Empowering farmers with easy financing
            </h1>
            <p>
              Connect verified farmers with investors, ensure milestone-based
              funding, and build trust through transparent progress tracking.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={initializeUser}
              className="relative overflow-hidden bg-green-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all"
            >
              <span className="font-semibold tracking-wide">
                Get Started Today
              </span>
              <ArrowRight size={22} className="inline ml-2" />
            </button>

            <button className="group flex items-center py-3 px-6 rounded-full bg-green-600/10 hover:bg-green-600/20 transition-all shadow-md">
              <Lightbulb size={20} className="text-green-600" />
              <span className="ml-3 font-medium text-green-800">
                How it works
              </span>
            </button>
          </div>
        </div>

        {/* RIGHT SIDE IMAGES */}
        <div className="grid grid-cols-2 gap-4 h-[600px]">
          <ImageCard
            src="https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Farmland"
            className="col-span-2 h-2/3"
          />
          <ImageCard
            src="https://images.pexels.com/photos/2889441/pexels-photo-2889441.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Community of farmers"
          />
          <ImageCard
            src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Farmer working in field"
          />
        </div>
      </div>

      {/* Modals */}
      
      <LoadingModal show={isModalOpenLoading} message={modalMessage} />
    </section>
  );
};
