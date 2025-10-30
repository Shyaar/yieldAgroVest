// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

library LockErrors {
    error UnlockTimeInPast();
    error WithdrawTooEarly();
    error NotOwner();
}
