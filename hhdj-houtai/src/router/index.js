import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      redirect:"/news",
      component: () => import('@/view/layout/index'),
      children: [{
        path: '/news',
        name: '新闻列表页',
        component: () => import ('@/view/news/list'),
      },
        {
          path: '/news/add',
          name: '新闻添加页',
          component: () => import ('@/view/news/add'),
        },
        {
          path: '/news/editor',
          name: '新闻编辑页',
          component: () => import ('@/view/news/add'),
        },
        {
          path: '/user',
          name: '用户管理',
          component: () => import ('@/view/user/list'),
        },
        {
          path: '/user/add',
          name: '用户添加页',
          component: () =>
            import ('@/view/user/add'),
        },
        {
          path: '/newsType',
          name: '视频分类列表页',
          component: () => import ('@/view/newsType/list'),
        },
        {
          path: '/newsType/add',
          name: '视频分类添加页',
          component: () => import ('@/view/newsType/add'),
        },
        {
          path: '/newsType/editor',
          name: '视频分类编辑页',
          component: () => import ('@/view/newsType/add'),
        },
        {
          path: '/blong',
          name: '党支部列表页',
          component: () => import ('@/view/blong/list'),
        },
        {
          path: '/blong/add',
          name: '党支部添加页',
          component: () => import ('@/view/blong/add'),
        },
        {
          path: '/blong/editor',
          name: '党支部编辑页',
          component: () => import ('@/view/blong/add'),
        },
        {
          path: '/lunbo',
          name: '轮播图管理',
          component: () => import ('@/view/lunbo/list'),
        },
        {
          path: '/card',
          name: '发帖列表',
          component: () => import ('@/view/card/list'),
        },
        {
          path: '/summarizes',
          name: '心得总结列表',
          component: () => import ('@/view/summarizes/list'),
        },
      ]
    }
  ]
})
