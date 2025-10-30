
import React from 'react';
import { X, Tractor, Briefcase } from 'lucide-react';

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full transform transition-all duration-300 scale-95 hover:scale-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Choose Your Role</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors">
            <X size={28} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Farmer Card */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
            <Tractor size={48} className="text-green-600 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">I am a Farmer</h3>
            <p className="text-gray-600 mb-4 text-[14px]">
              Access funding for your agricultural projects, connect with investors, and grow your farm with our support.
            </p>
          </div>
          {/* Investor Card */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
            <Briefcase size={48} className="text-blue-600 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Investor</h3>
            <p className="text-gray-600 mb-4 text-[14px]">
              Discover promising agricultural projects, support sustainable farming, and earn returns on your investment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
