// src/plugins/heroicons.js
import { BookmarkIcon, BuildingOfficeIcon, ChartBarIcon, FolderIcon } from '@heroicons/vue/16/solid';
import { defineAsyncComponent } from 'vue';

// Importa los íconos que deseas usar
const icons = {
  HomeIcon: defineAsyncComponent(() => import('@heroicons/vue/24/solid/HomeIcon')),
  BeakerIcon: defineAsyncComponent(() => import('@heroicons/vue/24/solid/BeakerIcon')),
  UserIcon: defineAsyncComponent(() => import('@heroicons/vue/24/solid/UserIcon')),
  AcademicCapIcon: defineAsyncComponent(() => import('@heroicons/vue/24/solid/AcademicCapIcon')), 
  UsersIcon: defineAsyncComponent(() => import('@heroicons/vue/24/solid/UsersIcon')),
  BookOpenIcon: defineAsyncComponent(() => import('@heroicons/vue/24/solid/BookOpenIcon')),
  BuildingOfficeIcon: defineAsyncComponent(() => import('@heroicons/vue/24/solid/BuildingOfficeIcon')), 
  PresentationChartLineIcon: defineAsyncComponent(() => import('@heroicons/vue/24/solid/PresentationChartLineIcon')), 
  ChartBarIcon: defineAsyncComponent(() => import('@heroicons/vue/24/solid/ChartBarIcon')), 
  FolderIcon: defineAsyncComponent(() => import('@heroicons/vue/24/solid/FolderIcon')), 
  BookmarkIcon: defineAsyncComponent(() => import('@heroicons/vue/24/solid/BookmarkIcon')), 
  BookmarkSquareIcon: defineAsyncComponent(() => import('@heroicons/vue/24/solid/BookmarkSquareIcon')), 
  // Agrega más íconos aquí según sea necesario academic-
};

// Registra los íconos como componentes globales
export function registerHeroIcons(app) {
  for (const [name, icon] of Object.entries(icons)) {
    app.component(name, icon);
  }
}
