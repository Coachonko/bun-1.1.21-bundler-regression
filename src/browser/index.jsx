import { createRoot } from '@dark-engine/platform-browser'
import { Translator } from '@wareme/translations'

import { getMessages } from '../shared/translations'
import App from '../shared/components/App'
import { api } from './api'

const currentLanguage = document.documentElement.lang
const messages = await getMessages(currentLanguage)
const translator = new Translator(currentLanguage, messages)

createRoot(document.getElementById('dark-root'), <App translator={translator} api={api} />)
