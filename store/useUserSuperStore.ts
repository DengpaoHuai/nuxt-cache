import { defineStore } from "pinia";

type User = {
  name: string;
  age: number;
};

type Filters = {
  accountType: string;
  status: string;
  role: string;
  hasNotification: boolean;
};

export const useUserSuperStore = defineStore("useUserSuperStore", () => {
  const user = reactive<
    {
      filters: Filters;
    } & User
  >({
    name: "John Doe",
    age: 30,
    filters: {
      accountType: "admin",
      status: "active",
      role: "super",
      hasNotification: true,
    },
  });

  const setUser = (newUser: User) => {
    user.name = newUser.name;
    user.age = newUser.age;
  };

  const setFilters = (newFilters: Filters) => {
    user.filters.accountType = newFilters.accountType;
    user.filters.status = newFilters.status;
    user.filters.role = newFilters.role;
    user.filters.hasNotification = newFilters.hasNotification;
  };

  return {
    user,
    setUser,
    setFilters,
  };
});
