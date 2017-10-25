import Vue from 'vue'
import Router from 'vue-router'

const pages = {
  Index: () => import('@/pages/Index'),
  Works: () => import('@/pages/Works'),
  Work: () => import('@/pages/Work'),
  Post: () => import('@/pages/Post')
}

Vue.use(Router)

const router = new Router({
  mode: 'history',

  routes: [
    { path: '/', name: 'index', component: pages.Index },
    { path: '/works', name: 'works', component: pages.Works },
    { path: '/works/:slug', name: 'work', component: pages.Work },
    { path: '/posts/:slug', name: 'post', component: pages.Post }
  ],

  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    return new Promise((resolve, reject) => {
      let scrollDuration = 500,
          cosParameter = window.scrollY / 2,
          oldTimestamp = performance.now(),
          scrollCount = 0

      function step (newTimestamp) {
        scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp))

        if (scrollCount >= Math.PI) {
          window.scrollTo(0, 0)
        }

        if (window.scrollY === 0) {
          resolve({ x: 0, y: 0 })

          return
        }

        window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)))

        oldTimestamp = newTimestamp

        window.requestAnimationFrame(step)
      }

      window.requestAnimationFrame(step);
    })
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.progress !== undefined) {
    let meta = to.meta.progress

    router.app.$Progress.parseMeta(meta)
  }

  router.app.$Progress.start()
  next()
})

router.afterEach((to, from) => {
  router.app.$Progress.finish()
})

export default router
