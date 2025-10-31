// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "./lib/events/UserRegistryEvents.sol";
import "./lib/errors/UserRegistryErrors.sol";

contract UserRegistry {
    enum Role {
        Investor,
        Farmer
    } // Investor = 0 (default), Farmer = 1

    struct User {
        string firstName;
        string lastName;
        string name;
        Role role;
        bool isRegistered;
    }

    mapping(address => User) public users;
    address[] public userAddresses;

    // ------------------- Registration -------------------
    function registerUser(
        string memory _firstName,
        string memory _lastName,
        uint8 _role
    ) external {
        if (users[msg.sender].isRegistered)
            revert UserRegistryErrors.UserAlreadyRegistered();

        Role roleEnum = Role(_role);

        users[msg.sender] = User({
            firstName: _firstName,
            lastName: _lastName,
            name: string.concat(_firstName, " ", _lastName),
            role: roleEnum,
            isRegistered: true
        });

        userAddresses.push(msg.sender);
        emit UserRegistryEvents.UserRegistered(
            msg.sender,
            _firstName,
            _lastName,
            _role
        );
    }

    // ------------------- Role Management -------------------
    function changeRole(uint8 _newRole) external {
        User storage user = users[msg.sender];
        if (!user.isRegistered) revert UserRegistryErrors.UserNotFound();

        Role newRoleEnum = Role(_newRole);

        require(user.role != newRoleEnum, "Already in this role");

        Role oldRole = user.role;
        user.role = newRoleEnum;

        emit UserRegistryEvents.RoleChanged(msg.sender, uint8(oldRole), _newRole);
    }

    // ------------------- Getters -------------------
    function getUser(address _user) external view returns (User memory) {
        if (!users[_user].isRegistered)
            revert UserRegistryErrors.UserNotFound();
        return users[_user];
    }

    function getUserRole(address _user) external view returns (Role) {
        if (!users[_user].isRegistered)
            revert UserRegistryErrors.UserNotFound();
        return users[_user].role;
    }

    function getAllUsers() external view returns (User[] memory) {
        uint256 len = userAddresses.length;
        User[] memory result = new User[](len);
        for (uint256 i = 0; i < len; i++) {
            result[i] = users[userAddresses[i]];
        }
        return result;
    }

    function getUserCount() external view returns (uint256) {
        return userAddresses.length;
    }
}