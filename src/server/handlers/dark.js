import { join } from 'bun:path'
import { renderToString } from '@dark-engine/platform-server'
import { ServerStyleSheet } from '@dark-engine/styled/server'
import { Translator } from '@wareme/translations'

import { getMessagesSync } from '../utils'
import { getLanguageFromPathname, getTitleFromPathname } from '../../shared/translations'
import { api } from '../api'
import App from '../../shared/components/App'
import Page from '../components/Page'

const renderApp = async (currentPath, translator) => {
  const sheet = new ServerStyleSheet()
  const app = await renderToString(sheet.collectStyles(
    <App
      currentPath={currentPath}
      translator={translator}
      api={api}
    />
  ))
  const styleTags = sheet.getStyleTags()
  sheet.seal()
  return { app, styleTags }
}

const renderPage = async (currentLanguage, title) => {
  return await renderToString(
    <Page
      currentLanguage={currentLanguage}
      title={title}
    />
  )
}

const darkResponse = async (elysiaContext) => {
  const currentPath = elysiaContext.path
  const currentLanguage = getLanguageFromPathname(currentPath)
  const messages = getMessagesSync(currentLanguage)
  const translator = new Translator(currentLanguage, messages)
  const title = getTitleFromPathname(currentPath)

  try {
    const { app, styleTags } = await renderApp(currentPath, translator)
    const page = await renderPage(currentPath, currentLanguage, title)
    const body = `<!DOCTYPE html>${page.replace('___app', app).replace('___styleTags', styleTags)}`

    elysiaContext.set.headers['Content-Type'] = 'text/html;charset=utf-8'
    return body
  } catch (err) {
    console.error(err)
  }
}

export function dark (elysiaContext) {
  if (process.env.BUN_ENV === 'production' || elysiaContext.path === '/') {
    return darkResponse(elysiaContext)
  }

  const absolutePath = join(process.cwd(), 'build/browser', elysiaContext.path)
  const file = Bun.file(absolutePath)
  if (file.size === 0) {
    return darkResponse(elysiaContext)
  }

  return file
}
