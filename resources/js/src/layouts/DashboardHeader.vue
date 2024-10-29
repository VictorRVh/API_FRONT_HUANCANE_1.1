<script setup>
import { inject, computed } from "vue";
import useHttpRequest from "../composables/useHttpRequest";
import useUserStore from "../store/useUserStore";
import useRoleStore from "../store/useRoleStore";
import usePermissionStore from "../store/usePermissionStore";
import useAppRouter from "../composables/useAppRouter";

// Injecting theme and other global properties
const { isDarkMode, updateDarkMode, windowWidth } = inject("theme");
const { index: logout } = useHttpRequest("/logout");
const { pushToRoute } = useAppRouter();

// Stores
const userStore = useUserStore();
const roleStore = useRoleStore();
const permissionStore = usePermissionStore();

// Get user permissions
const userPermissions = computed(
  () => userStore.user?.permissions.map((p) => p.name) || []
);

// Logout function
const onLogout = async () => {
  const isLoggedOut = await logout();
  if (isLoggedOut) {
    userStore.setUser(null);
    roleStore.roles = [];
    permissionStore.permissions = [];
    await pushToRoute({ name: "login" });
  }
};

// Function to create menu items dynamically
const menuItems = [
  {
    name: "Home",
    icon: "HomeIcon",
    route: "users",
    permissions: ["users-all", "users-view"],
  },
  {
    name: "Docente",
    icon: "UserIcon",
    route: "users",
    permissions: ["users-all", "users-view"],
  },
  {
    name: "Estudiante",
    icon: "AcademicCapIcon",
    route: "estudiantes",
    permissions: ["students-all", "students-view"],
  },
  {
    name: "Matrícula",
    icon: "BookOpenIcon",
    route: "users",
    permissions: ["users-all", "users-view"],
  },
  {
    name: "Especialidad",
    icon: "BuildingOfficeIcon",
    route: "especialidad",
    permissions: ["specialties-all", "specialties-view"],
  },
  {
    name: "Reportes",
    icon: "ChartBarIcon",
    route: "users",
    permissions: ["users-all", "users-view"],
  },
  {
    name: "Certificados",
    icon: "FolderIcon",
    route: "users",
    permissions: ["users-all", "users-view"],
  },
  {
    name: "Users",
    icon: "UsersIcon",
    route: "users",
    permissions: ["users-all", "users-view"],
  },
  {
    name: "Roles",
    icon: "BookmarkIcon",
    route: "roles",
    permissions: ["roles-all", "roles-view"],
  },
  {
    name: "Permissions",
    icon: "BookmarkSquareIcon",
    route: "permissions",
    permissions: ["permissions-all", "permissions-view"],
  },
];

// Helper function to check if user has permission for the route
const hasPermission = (itemPermissions) =>
  itemPermissions.some((perm) => userPermissions.value.includes(perm));
</script>

<template>
    <!-- Contenedor Principal del Dashboard con margen superior, bordes redondeados y sin sombra -->
    <div class="flex flex-col h-5/5 bg-blancoPuro dark:bg-dark-fondo text-granate dark:text-dark-text font-inter w-11/12 max-w-3xl ">

      <!-- Título "HERRAMIENTAS" posicionado a la izquierda y en la parte superior -->
      <h2 class="text-lg font-semibold text-negroClaro dark:text-dark-primary mt-4 mb-2 ml-4">HERRAMIENTAS</h2>

      <!-- Contenido del menú en la parte superior y alineado a la izquierda -->
      <div class="flex flex-col items-start w-full mt-2 space-y-2">
        <RouterLink
          v-for="item in menuItems"
          :key="item.name"
          v-show="hasPermission(item.permissions)"
          :to="{ name: item.route }"
          class="w-full flex items-center pl-6 py-2 rounded-md hover:bg-granate dark:hover:bg-dark-primary transition-all duration-200"
        >
          <template v-slot="{ isActive }">
            <span
              class="lg:text-xs font-normal flex items-center justify-start w-full h-full"
              :class="[
                isActive ? 'text-active dark:text-dark-primary' : 'text-granate dark:text-dark-text',
                'hover:text-blancoPuro dark:hover:text-dark-surface',
              ]"
            >
              <component :is="item.icon" class="w-5 h-5 mb-2 mr-2" />
              <p>{{ item.name }}</p>
            </span>
          </template>
        </RouterLink>
      </div>

      <!-- Logout y modo oscuro al final, utilizando los colores de modo oscuro -->
      <div class="flex flex-col items-start mb-4 space-y-2 mt-auto ml-4">
        <!-- Logout -->
        <span
          class="cursor-pointer text-dark-surface dark:text-dark-secondary hover:text-blancoPuro hover:bg-granate dark:hover:bg-dark-primary rounded-md px-4 py-1 transition-colors font-normal"
          @click="onLogout"
        >
          Logout
        </span>

        <!-- Modo oscuro toggle, debajo de Logout -->
        <span
          v-if="isDarkMode"
          class="cursor-pointer text-dark-surface dark:text-dark-secondary hover:text-blancoPuro hover:bg-granate dark:hover:bg-dark-primary rounded-md px-3 py-2 transition-colors"
          @click="updateDarkMode(false)"
        >
          <!-- Icono de Sol para Modo Claro -->
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        </span>
        <span
          v-else
          class="cursor-pointer text-dark-surface dark:text-dark-secondary hover:text-blancoPuro hover:bg-granate dark:hover:bg-dark-primary rounded-md px-3 py-2 transition-colors"
          @click="updateDarkMode(true)"
        >
          <!-- Icono de Luna para Modo Oscuro -->
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 A7 7 0 0 0 21 12.79z"></path>
          </svg>
        </span>
      </div>
    </div>
  </template>
