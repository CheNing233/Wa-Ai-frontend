import postPage from '@/pages/post/index.vue'
import workbench from '@/pages/workbench/index.vue'

import componentImageDialog from '@/pages/image/index.vue'

export const PostRouter = [{
    path: '/post',
    name: 'post',
    component: () => import('@/layout/index.vue'),
    redirect: '/post/detail',
    children: [
        {
            path: 'detail',
            components: {
                default: postPage,
                componentWorkbench: workbench,
                componentImageDialog: componentImageDialog
            },
        },
    ],
}]