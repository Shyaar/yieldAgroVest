import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("YieldModule", (m) => {
  const yieldContract = m.contract("YieldMvp",[],{

  });

  return { yieldContract };
});
