import router from '../../router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/common/js/auth'

NProgress.configure({ showSpinner: false })

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/home') {
      next()
    } else {
      next('/home')
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
  next()
  // const hasToken = getToken()
})

router.afterEach(() => {
  NProgress.done()
})
