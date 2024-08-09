import it from '../shared/translations/messages/it'
import en from '../shared/translations/messages/en'
import nl from '../shared/translations/messages/nl'

export const getMessagesSync = (lang) => {
  if (lang === 'it') {
    return it
  }
  if (lang === 'nl') {
    return nl
  }

  // fallback language
  return en
}
