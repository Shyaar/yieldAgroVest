// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

library UserRegistryEvents {
    
    event UserRegistered(address indexed user, string firstName, string lastName, uint8 role);
    event RoleChanged(address indexed user, uint8 oldRole, uint8 newRole);
}