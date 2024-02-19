import userCenter from '@/pages/user/index.vue'
import workbench from '@/pages/workbench/index.vue'

import componentImageDialog from '@/components/imageDialog/index.vue'

export const UserRouter = [{
    path: '/user',
    name: 'user',
    component: () => import('@/layout/index.vue'),
    redirect: '/user/center',
    children: [
        {
            path: 'center',
            components: {
                default: userCenter,
                componentWorkbench: workbench,
                componentImageDialog: componentImageDialog
            },
        },
    ],
}]