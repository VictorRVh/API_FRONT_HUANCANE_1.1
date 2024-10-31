// src/plugins/heroicons.js
import { defineAsyncComponent } from 'vue';

// Importa los íconos en estilo outline
const icons = {
<<<<<<< HEAD
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
  EyeIcon: defineAsyncComponent( () => import('@heroicons/vue/24/solid/EyeIcon')),
  PencilSquareIcon: defineAsyncComponent( () => import('@heroicons/vue/24/solid/PencilSquareIcon')),
  TrashIcon: defineAsyncComponent( () => import('@heroicons/vue/24/solid/TrashIcon')),
  CalendarIcon: defineAsyncComponent( () => import('@heroicons/vue/24/solid/CalendarIcon')),
  // Agrega más íconos aquí según sea necesario academic-
=======
  HomeIcon: defineAsyncComponent(() => import('@heroicons/vue/24/outline/HomeIcon')),
  BeakerIcon: defineAsyncComponent(() => import('@heroicons/vue/24/outline/BeakerIcon')),
  UserIcon: defineAsyncComponent(() => import('@heroicons/vue/24/outline/UserIcon')),
  AcademicCapIcon: defineAsyncComponent(() => import('@heroicons/vue/24/outline/AcademicCapIcon')),
  UsersIcon: defineAsyncComponent(() => import('@heroicons/vue/24/outline/UsersIcon')),
  BookOpenIcon: defineAsyncComponent(() => import('@heroicons/vue/24/outline/BookOpenIcon')),
  BuildingOfficeIcon: defineAsyncComponent(() => import('@heroicons/vue/24/outline/BuildingOfficeIcon')),
  PresentationChartLineIcon: defineAsyncComponent(() => import('@heroicons/vue/24/outline/PresentationChartLineIcon')),
  ChartBarIcon: defineAsyncComponent(() => import('@heroicons/vue/24/outline/ChartBarIcon')),
  FolderIcon: defineAsyncComponent(() => import('@heroicons/vue/24/outline/FolderIcon')),
  BookmarkIcon: defineAsyncComponent(() => import('@heroicons/vue/24/outline/BookmarkIcon')),
  BookmarkSquareIcon: defineAsyncComponent(() => import('@heroicons/vue/24/outline/BookmarkSquareIcon')),
  EyeIcon: defineAsyncComponent(() => import('@heroicons/vue/24/outline/EyeIcon')),
  PencilSquareIcon: defineAsyncComponent(() => import('@heroicons/vue/24/outline/PencilSquareIcon')),
  TrashIcon: defineAsyncComponent(() => import('@heroicons/vue/24/outline/TrashIcon')),
  // Agrega más íconos aquí según sea necesario
>>>>>>> ac338da583dccfaa4633c8be0af139d445e9e29c
};

// Registra los íconos como componentes globales
export function registerHeroIcons(app) {
  for (const [name, icon] of Object.entries(icons)) {
    app.component(name, icon);
  }
}
