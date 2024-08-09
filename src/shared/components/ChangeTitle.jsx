import { component, useEffect, detectIsString } from '@dark-engine/core'
import { useLocation, useParams } from '@dark-engine/web-router'

import { config } from '../config'
import { getTitleFromPathname } from '../translations'

const SetTitle = component(({ title }) => {
  const getTitleWithPostfix = () => {
    return `${title} | ${config.name}`
  }

  useEffect(() => {
    document.title = getTitleWithPostfix()
  }, [title])
  return null
})

const StaticPageTitle = component(() => {
  const { pathname } = useLocation()
  const title = getTitleFromPathname(pathname)
  return <SetTitle title={title} />
})

const ChangeTitle = component(() => {
  const params = useParams()
  const slug = params.get('slug')
  if (detectIsString(slug)) {
    return null
  }
  return <StaticPageTitle />
})

export default ChangeTitle
