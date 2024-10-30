<script setup>
import { ref } from "vue";

import DashboardHeader from "./DashboardHeader.vue";
import PageLoader from "./PageLoader.vue";
import SuspenseFallback from "./SuspenseFallback.vue";
import useUserStore from "../store/useUserStore";

const userStore = useUserStore();

const asyncLoading = ref(false);
</script>

<template>
    <div class="flex w-full h-screen bg-white dark:bg-gray-800 ">
      <!-- Sidebar Header -->
      <header class="w-[16%] bg-plomoClaro dark:bg-gray-800 min-h-[80px] sticky h-full top-0 shadow-lg z-10 " >
        <DashboardHeader class="h-full container mx-auto flex flex-col max-w-[1172px] px-4 xl:px-0 gap-4 text-negroClaro dark:text-white"/>
      </header>

      <!-- Main Content -->
      <main class="flex-1 h-full relative bg-gray-100 dark:bg-gray-900 ">
        <div class="flex items-center justify-between p-4 bg-blancoPuro dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600 w-[95%] mx-auto rounded-lg">
          <!-- Left Section with "INTRANET" and "CEPRO HUANCANÉ" -->
          <div class="text-left dark:bg-gray-800 rounded-lg p-2">
            <p class="text-xs font-regular text-dark-fondo dark:text-white">INTRANET</p>
            <p class="text-xs font-semibold mt-1 text-dark-surface dark:text-gray-300">CEPRO HUANCANÉ</p>
          </div>

          <!-- Right Section with User Name, Role, and Image -->
          <div class="flex items-center space-x-4 dark:bg-gray-800 rounded-lg p-2">
            <div class="text-right">
              <p class="text-sm text-dark-fondo dark:text-white">
                {{ userStore.user?.name }} {{ userStore.user?.apellido_paterno }}
              </p>
              <p class="text-xs text-dark-surface dark:text-gray-300">{{ userStore.user.roles[0]?.name }}</p>
            </div>
            <img src="/path/to/image.jpg" alt="Rol Icono" class="w-8 h-8 rounded-full" />
          </div>
        </div>

        <PageLoader :loading="asyncLoading" />

        <div class="container mx-auto max-w-[1172px] px-4 lg:px-0 h-full">
          <RouterView v-slot="{ Component }">
            <template v-if="Component">
              <Suspense @pending="asyncLoading = true" @resolve="asyncLoading = false">
                <component :is="Component"></component>
                <template #fallback>
                  <SuspenseFallback />
                </template>
              </Suspense>
            </template>
          </RouterView>
        </div>
      </main>
    </div>
</template>
