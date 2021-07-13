import router from '../../router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/common/js/auth'

NProgress.configure({ showSpinner: false })

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      NProgress.done()
      next('/home')
    } else {
      NProgress.done()
      next()
    }
  } else {
    if (to.path === '/login') {
      NProgress.done()
      next()
    } else {
      NProgress.done()
      next('/login')
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
