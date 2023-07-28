import Main from '@/pages/Main'
import PostPage from '@/pages/PostPage'
import About from '@/pages/About'
import Post from '@/pages/Post'
import PostPageWithStore from '@/pages/PostPageWithStore'
import PostPageCompositionApi from '@/pages/PostPageCompositionApi'
import { createRouter, createWebHistory } from "vue-router"

const routes = [
    { path: '/', component: Main },
    { path: '/posts', component: PostPage },
    { path: '/about', component: About },
    { path: '/posts/:id', component: Post },
    { path: '/store', component: PostPageWithStore },
    { path: '/compose', component: PostPageCompositionApi }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
})

export default router