import { component } from '@dark-engine/core'
import { Link, useLocation } from '@dark-engine/web-router'
import { styled } from '@dark-engine/styled'
import { useTranslation } from '@wareme/translations'
import { nisha } from '@wareme/utils'

import { getAlternatePaths } from '../routes'
import { dynamicMessagesLoading } from '../translations'

const LangaugesList = styled.ul`
  display: inline;
  list-style: none;
  margin: 0;
  padding: 0;
`

const LanguagesListItem = styled.li`
  display: inline;
`

const LanguageLink = styled(Link)`
  text-decoration: none;
  text-transform: uppercase;
  color: ${props => nisha(props.$active, props.theme.foregroundPrimary, props.theme.foregroundTertiary)};
`

const Separator = styled.span`
  margin: 0 .5rem;
  color: ${props => props.theme.foregroundTertiary};
`

const iterationSeparator = (iterationIndex, arrayLength) => {
  if (iterationIndex !== arrayLength - 1) {
    return <Separator>/</Separator>
  }
  return null
}

const LanguageSelectorLinks = component(({ alternatePaths }) => {
  const { pathname } = useLocation()
  const { translator } = useTranslation()
  const handleLanguageChange = (event) => {
    const newLanguage = event.target.name
    dynamicMessagesLoading(translator, newLanguage)
  }

  const languages = Object.keys(alternatePaths)
  const result = []

  for (let i = 0, len = languages.length; i < len; i++) {
    const language = languages[i]
    const to = alternatePaths[language]
    result.push(
      <LanguagesListItem>
        <LanguageLink
          to={to}
          name={language}
          onClick={handleLanguageChange}
          $active={pathname === to}
        >{language}
        </LanguageLink>
        {iterationSeparator(i, len)}
      </LanguagesListItem>
    )
  }

  return <LangaugesList>{result}</LangaugesList>
})

const LanguageSelector = component(() => {
  const { pathname } = useLocation()
  const alternatePaths = getAlternatePaths(pathname)
  return <LanguageSelectorLinks alternatePaths={alternatePaths} />
})

export default LanguageSelector
