import modelpage from '@/pages/model/index.vue'
import workbench from '@/pages/workbench/index.vue'

import componentImageDialog from '@/components/imageDialog/index.vue'

export const ModelRouter = [{
    path: '/model',
    name: 'model',
    component: () => import('@/layout/index.vue'),
    redirect: '/model/detail',
    children: [
        {
            path: 'detail',
            components: {
                default: modelpage,
                componentWorkbench: workbench,
                componentImageDialog: componentImageDialog
            },
        },
    ],
}]