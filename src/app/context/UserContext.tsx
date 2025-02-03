import React, { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "../types/types.ts";

export interface UserContextType {
  user: User | null;
  saveUser: (userData: User) => void;
  clearUser: () => void;
  logout: () => void;
  getUsers: () => User[];
  addUser: (user: User) => void;
  login: (email: string) => void;
  editUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user]);

  const getUsers = () => users;

  const saveUsers = (users: User[]) => {
    localStorage.setItem("users", JSON.stringify(users));
    setUsers(users);
  };

  const saveUser = (userData: User) => {
    const existingUsers = users.map((u) =>
      u.id === userData.id ? userData : u,
    );
    saveUsers(existingUsers);
    setUser(userData);
  };

  const login = (email: string) => {
    const foundUser = users.find((u) => u.email === email);
    if (foundUser) {
      setUser(foundUser);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const clearUser = () => {
    if (user) {
      const updatedUsers = users.filter((u) => u.email !== user.email);
      saveUsers(updatedUsers);
      setUser(null);
      localStorage.removeItem("currentUser");
    }
  };

  const isUserUnique = (newUser: User) => {
    return !users.some(
      (existingUser) =>
        existingUser.email === newUser.email || existingUser.id === newUser.id
    );
  };

  const addUser = (newUser: User) => {
    if (isUserUnique(newUser)) {
      const updatedUsers = [...users, newUser];
      saveUsers(updatedUsers);
      setUser(newUser);
    }
  };

  const editUser = (updatedUser: User) => {
    const editedUserIndex = users.findIndex((u) => u.id === updatedUser.id);
    if (editedUserIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers[editedUserIndex] = updatedUser;
      saveUsers(updatedUsers);
      setUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
  };

  return (
    <UserContext.Provider
      value={{ user, saveUser, clearUser, editUser, getUsers, addUser, logout, login }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
