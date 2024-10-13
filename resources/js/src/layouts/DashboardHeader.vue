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

console.log("Victor ", userPermissions);

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
    permissions: ["users-all", "users-view"],
  },
  {
    name: "Matrícula",
    icon: "BookOpenIcon",
    route: "users",
    permissions: ["users-all", "users-view"],
  },
  {
    name: "Especialidades",
    icon: "BuildingOfficeIcon",
    route: "especialidades",
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
/*const hasPermission = (itemPermissions) => {
  
}; */
const hasPermission = (itemPermissions) =>
  itemPermissions.some((perm) => userPermissions.value.includes(perm));

//itemPermissions.some((perm) => userPermissions.includes(perm));
//['users-all', 'users-view'].some((perm) => userPermissions.includes(perm))
</script>

<template>
  <div class="flex flex-col h-full justify-center items-center text-center mt-5">
    <!-- menu links -->
    <div class="flex flex-col gap-8 lg:gap-1 flex-grow items-center w-full">
      <RouterLink
        v-for="item in menuItems"
        :key="item.name"
        v-show="hasPermission(item.permissions)"
        :to="{ name: item.route }"
        class="w-full flex pl-3 rounded hover:bg-gray-700"
      >
        <template v-slot="{ isActive }">
          <span
            class="lg:text-xs font-bold flex items-center justify-center p-2"
            :class="[isActive ? 'text-blue-400' : 'text-gray-400']"
          >
            <component :is="item.icon" class="w-5 h-5 mb-2 mr-2" />
            <p>{{ item.name }}</p>
          </span>
        </template>
      </RouterLink>

      <!-- Logout -->
      <span
        class="lg:text-lg font-bold hover:text-active-hover cursor-pointer text-red-200"
        @click="onLogout"
      >
        Logout
      </span>

      <!-- Display user information -->
      <div v-if="userStore.user?.id" class="text-xs text-emerald-300">
        {{ `${userStore.user?.name} (${userStore.user?.email})` }}
      </div>
    </div>

    <!-- Dark mode toggle -->
    <div class="flex items-center mt-auto">
      <span
        v-if="isDarkMode"
        class="hover:text-active-hover cursor-pointer"
        @click="updateDarkMode(false)"
      >
        <!-- Sun icon -->
        <svg
          viewBox="0 0 24 24"
          :width="windowWidth > 992 ? 24 : 18"
          :height="windowWidth > 992 ? 24 : 18"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="css-i6dzq1"
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
        class="hover:text-active-hover cursor-pointer"
        @click="updateDarkMode(true)"
      >
        <!-- Moon icon -->
        <svg
          viewBox="0 0 24 24"
          :width="windowWidth > 992 ? 24 : 18"
          :height="windowWidth > 992 ? 24 : 18"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="css-i6dzq1"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 A7 7 0 0 0 21 12.79z"></path>
        </svg>
      </span>
    </div>
  </div>
</template>
