import { Routes, Route } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Home from "./pages/Home";
import FarmerRegister from "./pages/register/Register"; // Uncommented and added
import InvestorBrowse from "./pages/investors/Browse";
// import FarmerKyc from "./pages/farmers/FarmerKyc";
import InvestorKyc from "./pages/investors/InvestorKyc";
import Footer from "./components/layout/Footer";
import FarmerDashboard from "./pages/farmers/FarmerDashboard";
import InvestorDashboard from "./pages/investors/InvestorDashboard";
// import AddFarm from "./pages/farmers/AddFarm"; // Uncommented and added
// import ListFarm from "./pages/farmers/ListFarm"; // Added
// // import FarmDetails from "./pages/farmers/FarmDetails";


import "./App.css";
import Register from "./pages/register/Register";


function App() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/farmers/register" element={<FarmerRegister />} />
        <Route path="/register/Register" element={<Register />} /> 
        <Route path="/investors/browse" element={<InvestorBrowse />} />
        {/* <Route path="/farmers/add-farm" element={<AddFarm />} />  */}
        {/* <Route path="/farmers/list-farm" element={<ListFarm />} />  */}
        {/* <Route path="/farmers/kyc" element={<FarmerKyc />} /> */}
        <Route path="/investors/kyc" element={<InvestorKyc />} />
        <Route path="/farmers/dashboard" element={<FarmerDashboard />} />
        <Route path="/investors/dashboard" element={<InvestorDashboard />} />
        {/* <Route path="/farm/:farmId" element={<FarmDetails />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
