import { component } from '@dark-engine/core'
import { Link, useLocation } from '@dark-engine/web-router'
import { styled, css } from '@dark-engine/styled'
import { useTranslation } from '@wareme/translations'

import { getHomePath } from '../routes'
import { getLanguageFromPathname } from '../translations'
import NavigationLink from '../components/NavigationLink'
import LanguageSelector from '../components/LanguageSelector'
import { config } from '../config'

const Nav = styled.nav`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 4vw;
  text-transform: uppercase;
  ${props => css`
    @media (min-width: ${props.theme.sm}) {
      padding: 0 2.5vw;
    }
  `}
`

const Logo = styled.div`
`

const LinksList = styled.ul`
  display: inline;
  list-style: none;
  padding: 0;
  margin: 0 10vw 0 0;
`

const LinksListItem = styled.li`
  display: inline;
  margin: 0 5vw 0 0;
`

const LinksWrapper = styled.div`
  display: none;
  ${props => css`
    @media (min-width: ${props.theme.sm}) {
      display: block;
    }
  `}
`

const MobileMenuButton = styled.button`
  display: block;
  border: none;
  padding: 0;
  margin: 0;
  color: ${props => props.theme.foregroundPrimary};
  text-transform: uppercase;
  background-color: transparent;
  ${props => css`
    @media (min-width: ${props.theme.sm}) {
      display: none;
    }
  `}
`

const HeaderNav = component(({ openMobileMenu }) => {
  const { t } = useTranslation('headerNav')
  const { pathname } = useLocation()
  const currentLanguage = getLanguageFromPathname(pathname)
  const homePath = getHomePath(currentLanguage)

  return (
    <Nav>
      <Logo>
        <Link to={homePath}>{config.name}</Link>
      </Logo>

      <LinksWrapper>
        <LinksList role='list'>
          <LinksListItem>
            <NavigationLink to={`${homePath}shop`}>{t('shop')}</NavigationLink>
          </LinksListItem>
          <LinksListItem>
            <NavigationLink to={`${homePath}contact`}>{t('contact')}</NavigationLink>
          </LinksListItem>
        </LinksList>
        <LanguageSelector hasWhiteBackground />
      </LinksWrapper>
      <MobileMenuButton type='button' onClick={openMobileMenu}>{t('openMenu')} +</MobileMenuButton>
    </Nav>
  )
})

export default HeaderNav
