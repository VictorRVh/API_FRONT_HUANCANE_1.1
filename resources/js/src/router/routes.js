export default [
    {
        path: '/',
        name: 'login',
        component: () => import('../pages/Login.vue'),
        meta: {
            layout: 'full',
            permissions: [],
        },
    },

    {
        path: '/users',
        name: 'users',
        component: () => import('../pages/Users.vue'),
        meta: {
            layout: 'dashboard',
            permissions: ['users-all', 'users-view'],
        },
    },

    {
        path: '/roles',
        name: 'roles',
        component: () => import('../pages/Roles.vue'),
        meta: {
            layout: 'dashboard',
            permissions: ['roles-all', 'roles-view'],
        },
    },

    {
        path: '/permissions',
        name: 'permissions',
        component: () => import('../pages/Permissions.vue'),
        meta: {
            layout: 'dashboard',
            permissions: ['permissions-all', 'permissions-view'],
        },
    },

    {
        path: '/especialidad',
        name: 'especialidad',
        component: () => import('../pages/Especialidad/Especialidades.vue'),
        meta: {
            layout: 'dashboard',
            permissions: ['specialties-all', 'specialties-view'],
        },
    },

    {
        path: '/especialidad/:idEspecialidad/planes',
        name: 'PlanesFormativos',
        component: ()=>import('../pages/Especialidad/PlanFormativo.vue'),
        props: true, // Esto pasa los parámetros de ruta como props al componente
        meta: {
            layout: 'dashboard',
           // permissions: ['plan-all', 'plan-view'],
        }
    },

    {
        path: '/estudiantes',
        name: 'estudiantes',
        component: () => import('../pages/Estudiante/Estudiante.vue'),
        meta: {
            layout: 'dashboard',
            permissions: ['students-all', 'students-view'],
        },
    }

    /* todlos que se aumento */
];
