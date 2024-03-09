import VueRouter from 'vue-router';

import wawa from '@/pages/wawa/index.vue'
import workbench from '@/pages/workbench/index.vue'
import imagedialog from '@/pages/image/index.vue'
import login from '@/pages/login/index.vue'

import {UserRouter} from './modules/user.js';
import {ModelRouter} from './modules/model.js';

import eventBus from '@/eventbus'

// 动态路由
export const asyncRouterList = [...UserRouter, ...ModelRouter];

// 固定路由
const defaultRouterList = [
    {
        path: '/login',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: '',
                name: 'login',
                components: {
                    default: login,
                    componentWorkbench: workbench,
                    componentImageDialog: imagedialog
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
                    componentImageDialog: imagedialog
                },
            },
            {
                path: 'about',
                components: {
                    default: wawa,
                    componentWorkbench: workbench,
                    componentImageDialog: imagedialog
                },
            },
        ],
        meta: {
            keepAlive: true,
        },
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
        scrollBehavior(to, from, savedPosition) {
            if (savedPosition) {
                eventBus.$emit('savedPositionEvent', savedPosition);
            } else {
                return {x: 0, y: 0}
            }
        }
    });

const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
