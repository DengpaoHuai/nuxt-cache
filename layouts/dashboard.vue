<script setup lang="ts">
import { useAuthStore } from '~/store/useAuthStore';

// Vérifier l'authentification
const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);

// Rediriger vers la page de login si non connecté
onMounted(() => {
  if (!isAuthenticated.value) {
    navigateTo('/login');
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="flex">
      <DashboardSidebar />
      
      <div class="flex-1 flex flex-col min-h-screen">
        <main class="flex-1 p-4 lg:p-8 overflow-auto">
          <slot />
        </main>
        
        <footer class="bg-white p-4 border-t border-gray-200 text-center text-gray-500 text-sm">
          © {{ new Date().getFullYear() }} Votre Entreprise. Tous droits réservés.
        </footer>
      </div>
    </div>
  </div>
</template> 