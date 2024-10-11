<script setup>
import { ref } from "vue";

import DashboardHeader from "./DashboardHeader.vue";
import PageLoader from "./PageLoader.vue";
import SuspenseFallback from "./SuspenseFallback.vue";

const asyncLoading = ref(false);
</script>

<template>
  <div class="flex w-full h-screen">
    <!-- Sidebar Header -->
    <header class="w-[16%] bg-cc-10 min-h-[80px] sticky h-full top-0 shadow-google z-10">
      <DashboardHeader
        class="h-full container mx-auto flex flex-col max-w-[1172px] px-4 xl:px-0 gap-4 text-dark-color"
      />
    </header>

    <!-- Main Content -->
    <main class="flex-1 h-full relative">
      <div class="flex justify-end p-4">
        <div class="text-right">
          <p class="text-sm">Nombre de Usuario</p>
          <p class="text-xs text-gray-500">correo@example.com</p>
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
