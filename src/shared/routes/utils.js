import { detectIsString } from '@dark-engine/core'
import { invariant } from '@wareme/utils'

import { languages, defaultLanguage, isAlternateLanguage } from '../translations'

// getBasePathname removes the language prefix from a pathname if it is present.
// It also handles the pathname of homepages, in which the prefix is the whole pathname.
export const getBasePathname = (pathname) => {
  for (let i = 1, len = languages.length; i < len; i++) {
    const language = languages[i]

    // handle pathname from a homepage
    // homepage path in the default language is /
    // in alternate language it does not have a trailing slash
    const homePath = `/${language}`
    if (pathname === '/' || pathname === homePath) {
      return '/'
    }

    const pathPrefix = `${homePath}/`
    if (pathname.startsWith(pathPrefix)) {
      return pathname.substring(pathPrefix.length - 1)
    }
  }
  return pathname
}

// getHomePath returns the home path for the given language
// Returns `/${language}/` for alternate languages.
// Returns `/` for defaultLanguage and unsupported languages.
export const getHomePath = (language) => {
  invariant(detectIsString(language), 'language must be a string')

  if (isAlternateLanguage(language)) {
    return `/${language}/`
  }

  return '/'
}

// getAlternatePaths returns all paths for a translated route.
// Paths returned are absolute.
export const getAlternatePaths = (pathname) => {
  const result = {}
  const basePathname = getBasePathname(pathname)
  result[defaultLanguage] = basePathname
  if (basePathname === '/') {
    for (let i = 1, len = languages.length; i < len; i++) {
      const language = languages[i]
      result[language] = `/${language}`
    }
  } else {
    for (let i = 1, len = languages.length; i < len; i++) {
      const language = languages[i]
      result[language] = `/${language}${basePathname}`
    }
  }
  return result
}

export const isAlternatePath = (pathnameOne, pathnameTwo) => {
  const alternatesOfOne = getAlternatePaths(pathnameOne)
  for (const lang in alternatesOfOne) {
    if (pathnameTwo === alternatesOfOne[lang]) {
      return true
    }
  }
  return false
}

export const isHomePath = (pathname) => {
  if (pathname === '/') {
    return true
  }

  const alternatePaths = getAlternatePaths(pathname)
  for (const lang in alternatePaths) {
    if (alternatePaths[lang] === '/') {
      return true
    }
  }
  return false
}
