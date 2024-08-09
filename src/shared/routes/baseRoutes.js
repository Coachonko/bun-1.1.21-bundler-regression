import { lazy } from '@dark-engine/core'

// These paths are nested in the generation step, paths must not be absolute.
export const baseRoutes = [
  {
    path: '',
    component: lazy(() => import('../pages/Home'))
  },
  {
    path: 'not-found',
    component: lazy(() => import('../pages/NotFound'))
  }
]
