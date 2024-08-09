import { component, useState } from '@dark-engine/core'
import { Link, useLocation } from '@dark-engine/web-router'
import { styled } from '@dark-engine/styled'
import { useTranslation } from '@wareme/translations'
import { nisha } from '@wareme/utils'

import { config } from '../config'
import { getHomePath } from '../routes'
import { getLanguageFromPathname } from '../translations'
import LanguageSelector from '../components/LanguageSelector'
import MobileMenuBackground from './MobileMenuBackground'
import MobileMenuForegroundTransition from './MobileMenuForegroundTransition'

const MobileMenuForeground = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${props => props.theme.zMobileMenuForeground};
`

const MobileMenuTop = styled.div`
  height: ${props => props.theme.headerHeightMobile};
  display: flex;
  padding: 0 4vw;
  justify-content: space-between;
  align-items: center;
`

const MobileMenuButtonWrapper = styled.div`
  overflow: hidden;
`

// TODO make it seem like the logo is not transitioning, somehow
// This means that state must sync with HeaderNav $isVisible etc. Seems difficult.
// Maybe make the logo underneath be visible on top, somehow? Play with z-index
const Logo = styled.div`
  opacity: ${props => nisha(props.$isLeaving, '0', '1')};
  transition: ${props => nisha(props.$delay, `opacity .5s ${props.$delay}`, 'opacity .15s')};
`

const MobileMenuButton = styled.button`
  display: block;
  border: none;
  padding: 0;
  margin: 0;
  color: ${props => props.theme.foregroundPrimary};
  text-transform: uppercase;
  background-color: transparent;
`

const MobileMenuContent = styled.nav`
  height: ${props => `calc(100svh - ${props.theme.headerHeightMobile} - 3rem)`};
  flex-direction: column;
  justify-content: center;
  padding: 0 4vw;
`

const LinksListWrapper = styled.div`
  padding: 8rem 0;
`

const LinksList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const MobileMenuLink = styled(Link)`
  text-decoration: none;
  color: ${props => nisha(props.$active, props.theme.foregroundTertiary, props.theme.foregroundPrimary)};
  text-transform: uppercase;
  font-size: 350%;
  line-height: 1.1;
`

const MobileMenuBottom = styled.div`
  height: 3rem;
  padding: 0 4vw;
`

const Tagline = styled.span`
`

const MobileMenuLinks = component(({ links, isOpen, isLeaving, pathname }) => {
  const firstLeaveDelay = 100
  const delayIncrement = 50
  const firstEnterDelay = 100

  const res = []
  for (let i = 0, len = links.length; i < len; i++) {
    const link = links[i]
    const enterDelay = firstEnterDelay + delayIncrement * (i + 1)
    const leaveDelay = firstLeaveDelay + delayIncrement * (len - i - 1)
    res.push(
      <li key={links.path}>
        <MobileMenuForegroundTransition
          isOpen={isOpen}
          isLeaving={isLeaving}
          enterDelay={enterDelay}
          leaveDelay={leaveDelay}
        >
          <MobileMenuLink $active={pathname === link.path} to={link.path}>{link.name}</MobileMenuLink>
        </MobileMenuForegroundTransition>
      </li>
    )
  }

  return <LinksList role='list'>{res}</LinksList>
})

// When MobileMenuButton is pressed:
// 1. transition is triggered.
// 2. closeMobileMenu is triggered, this changes isOpen to false
// 3. the component returns null, this resets isLeaving to false
const MobileMenu = component(({ isOpen, closeMobileMenu }) => {
  const [isLeaving, setIsLeaving] = useState(false)
  const handleLeave = () => {
    setIsLeaving(true)
  }

  if (isOpen === false) {
    if (isLeaving === true) {
      setIsLeaving(false)
    }
    return null
  }

  const { t } = useTranslation('mobileMenu')
  const { pathname } = useLocation()
  const currentLanguage = getLanguageFromPathname(pathname)
  const homePath = getHomePath(currentLanguage)

  const links = [
    {
      path: homePath,
      name: t('home')
    }
  ]

  return (
    <>
      <MobileMenuBackground
        isLeaving={isLeaving}
        closeMobileMenu={closeMobileMenu}
        leaveDelay={100}
      />

      <MobileMenuForeground>
        <MobileMenuTop>
          <Logo $isLeaving={isLeaving} $delay='.30s'>
            <Link to={homePath}>{config.name}</Link>
          </Logo>
          <MobileMenuButtonWrapper>
            <MobileMenuForegroundTransition isOpen={isOpen} isLeaving={isLeaving} leaveDelay={400}>
              <MobileMenuButton onClick={handleLeave}>
                {t('closeMenu')}
              </MobileMenuButton>
            </MobileMenuForegroundTransition>
          </MobileMenuButtonWrapper>
        </MobileMenuTop>

        <MobileMenuContent>
          <LinksListWrapper>
            <MobileMenuLinks
              links={links}
              isOpen={isOpen}
              isLeaving={isLeaving}
              pathname={pathname}
            />
          </LinksListWrapper>

          <MobileMenuForegroundTransition
            isOpen={isOpen}
            isLeaving={isLeaving}
            enterDelay={400}
            leaveDelay={50}
          >
            <LanguageSelector />
          </MobileMenuForegroundTransition>
        </MobileMenuContent>

        <MobileMenuBottom>
          <MobileMenuForegroundTransition
            isOpen={isOpen}
            isLeaving={isLeaving}
            enterDelay={500}
          >
            <Tagline>{config.tagline}</Tagline>
          </MobileMenuForegroundTransition>
        </MobileMenuBottom>
      </MobileMenuForeground>
    </>
  )
})

export default MobileMenu
