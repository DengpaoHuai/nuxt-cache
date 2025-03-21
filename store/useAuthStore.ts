import { defineStore } from "pinia";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: "admin" | "user";
  createdAt: string;
  bio: string;
  phoneNumber: string;
  location: string;
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => !!user.value);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Simuler la récupération des données utilisateur depuis une API
  const login = async (email: string, password: string) => {
    try {
      isLoading.value = true;
      error.value = null;

      // Dans un cas réel, ceci serait un appel API
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Vérification simple (à remplacer par une vraie API)
      if (email === "admin@example.com" && password === "password") {
        user.value = {
          id: "1",
          email: "admin@example.com",
          firstName: "Admin",
          lastName: "User",
          avatar:
            "https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff",
          role: "admin",
          createdAt: new Date().toISOString(),
          bio: "Administrateur système",
          phoneNumber: "+33 6 12 34 56 78",
          location: "Paris, France",
        };

        // Stocker dans le localStorage pour persistance
        localStorage.setItem("user", JSON.stringify(user.value));
        return true;
      } else if (email === "user@example.com" && password === "password") {
        user.value = {
          id: "2",
          email: "user@example.com",
          firstName: "Regular",
          lastName: "User",
          avatar:
            "https://ui-avatars.com/api/?name=Regular+User&background=0D8ABC&color=fff",
          role: "user",
          createdAt: new Date().toISOString(),
          bio: "Utilisateur standard",
          phoneNumber: "+33 6 98 76 54 32",
          location: "Lyon, France",
        };

        localStorage.setItem("user", JSON.stringify(user.value));
        return true;
      }

      error.value = "Identifiants invalides";
      return false;
    } catch (err) {
      error.value = "Une erreur est survenue pendant la connexion";
      console.error(err);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem("user");
    navigateTo("/login");
  };

  const updateProfile = (updatedUser: Partial<User>) => {
    if (user.value) {
      user.value = { ...user.value, ...updatedUser };
      localStorage.setItem("user", JSON.stringify(user.value));
    }
  };

  // Initialiser l'utilisateur à partir du localStorage (pour persistance)
  const initUser = () => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        user.value = JSON.parse(savedUser);
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
  };

  // Exécuter initUser au démarrage du store
  onMounted(() => {
    initUser();
  });

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    updateProfile,
  };
});
