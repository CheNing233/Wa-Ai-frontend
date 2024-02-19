import VueRouter from 'vue-router';

import wawa from '@/pages/wawa/index.vue'
import workbench from '@/pages/workbench/index.vue'
import login from '@/pages/login/index.vue'

import componentImageDialog from '@/components/imageDialog/index.vue'

import { UserRouter } from './modules/user.js';

// 动态路由
export const asyncRouterList = [...UserRouter];

// 固定路由
const defaultRouterList = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: '',
                components: {
                    default: login,
                    componentWorkbench: workbench,
                    componentImageDialog: componentImageDialog
                },
            },
        ]
    },
    {
        path: '/portal',
        name: 'portal',
        component: () => import('@/layout/index.vue'),
        redirect: '/portal/wawa',
        children: [
            {
                path: 'wawa',
                components: {
                    default: wawa,
                    componentWorkbench: workbench,
                    componentImageDialog: componentImageDialog
                },
            },
            {
                path: 'about',
                components: {
                    default: wawa,
                    componentWorkbench: workbench,
                    componentImageDialog: componentImageDialog
                },
            },
        ],
    },
    {
        path: '*',
        redirect: 'portal/wawa',
    },
    ...asyncRouterList,
];

const createRouter = () =>
    new VueRouter({
        mode: 'history',
        routes: defaultRouterList,
        scrollBehavior() {
            return { x: 0, y: 0 };
        },
    });

const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
