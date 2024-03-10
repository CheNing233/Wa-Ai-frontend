import postCreatePage from '@/pages/post/create.vue'

import workbench from '@/pages/workbench/index.vue'
import componentImageDialog from '@/pages/image/index.vue'

export const CreateRouter = [{
    path: '/create',
    name: 'create',
    component: () => import('@/layout/shrink.vue'),
    children: [
        {
            path: 'post',
            components: {
                default: postCreatePage,
                componentWorkbench: workbench,
                componentImageDialog: componentImageDialog
            },
        },
    ],
}]