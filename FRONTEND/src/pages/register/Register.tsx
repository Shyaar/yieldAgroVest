import { useState, useEffect, type FormEvent } from "react";
import { RoleSelectionModal } from "../../components/ui/modals/RoleSelectionModal";
import { Button } from "../../components/ui/Button";
import { toast } from "react-toastify";
import { useUserActions } from "../../hooks/user/useUserActions";
import LoadingModal from "../../components/ui/modals/LoadingModal";
import { useNavigate } from "react-router-dom";
import { Role } from "../../hooks/user/useUserRegistry";

export default function Register() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [role, setRole] = useState<Role | null>(null);
  const [displayRole, setDisplayRole] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  const { registerUser, isPending, isConfirming, isConfirmed, error } =
    useUserActions();
  const navigate = useNavigate();

  useEffect(() => {
    if (role === null) {
      setIsModalOpen(true);
    }
  }, [role]);

  useEffect(() => {
    if (isConfirmed) {
      toast.success("User registered successfully!");
      if (role === 0) {
        setTimeout(() => {
          setIsModalOpen(true);
        }, 2000);
        navigate("/farmers/dashboard");
      } else if (role === 1) {
        setTimeout(() => {
          setIsModalOpen(true);
        }, 2000);
        navigate("/investors/dashboard");
      }
    }
  }, [isConfirmed, role, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(`Registration failed: ${error.message}`);
    }
  }, [error]);

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    setIsModalOpen(false);
    toast.success(`Role selected: ${getRoleName(selectedRole)}`);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (role === null) {
      toast.error("Please select a role first.");
      return;
    }
    if (!firstName || !lastName) {
      toast.error("Please fill in all fields.");
      return;
    }
    setFirstName(firstName);
    setLastName(lastName);
    if (role === 0) {
      setDisplayRole("Investor");
    } else if (role === 1) {
      setDisplayRole("Farmer");
    }
    registerUser(firstName, lastName, role);
  };

  const getRoleName = (roleValue: number | null) => {
    switch (roleValue) {
      case 0:
        return "Farmer";
      case 1:
        return "Investor";
      default:
        return "Not Selected";
    }
  };

  const isSubmitting = isPending || isConfirming;

  const getLoadingMessage = () => {
    if (isPending) return "Waiting for wallet confirmation...";
    if (isConfirming) return "Confirming transaction...";
    if (isConfirmed)
      return `Registration complete ${firstName} ${lastName} ${displayRole}`;
    return "";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl space-y-8 bg-white p-10 rounded-xl shadow-lg z-10">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Register Your Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please fill in your details to create an account.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="firstName" className="sr-only">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="sr-only">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Selected Role
            </label>
            <div className="mt-1 flex items-center justify-between p-2 border border-gray-300 rounded-md shadow-sm bg-gray-50">
              <span className="text-gray-900 font-semibold">
                {getRoleName(role)}
              </span>
              {role === null && (
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  variant="secondary"
                >
                  Select Role
                </Button>
              )}
              {role !== null && (
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  variant="secondary"
                >
                  Change Role
                </Button>
              )}
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              disabled={role === null || isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </div>
        </form>
      </div>
      <RoleSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectRole={handleRoleSelect}
      />
      <LoadingModal show={isSubmitting} message={getLoadingMessage()} />
    </div>
  );
}
