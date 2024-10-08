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
        path: '/products',
        name: 'products',
        component: () => import('../pages/Products.vue'),
        meta: {
            layout: 'dashboard',
            permissions: ['products-all', 'products-view'],
        },
    },
    {
        path: '/products/create',
        name: 'products-create',
        component: () => import('../pages/Products.vue'),
        meta: {
            layout: 'dashboard',
            permissions: ['products-all', 'products-create'],
        },
    },
    {
        path: '/products/:id/edit',
        name: 'products-edit',
        component: () => import('../pages/Products.vue'),
        meta: {
            layout: 'dashboard',
            permissions: ['products-all', 'products-edit'],
        },
    },
];
