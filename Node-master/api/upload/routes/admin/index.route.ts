import adminUserRouter from './admin-user.route'
import adminAuthRouter from './admin-auth.route'
import adminCategoryRouter from './admin-category.route'
import adminProductRouter from './admin-product.route'
import adminStatsRouter from './admin-stats.route'

const adminRoutes = {
  prefix: '/admin/',
  routes: [
    {
      path: 'users',
      route: adminUserRouter,
    },
    {
      path: 'products',
      route: adminProductRouter,
    },
    {
      path: 'categories',
      route: adminCategoryRouter,
    },
    {
      path: 'stats',
      route: adminStatsRouter,
    },

    {
      path: '',
      route: adminAuthRouter,
    },
  ],
}

export default adminRoutes
