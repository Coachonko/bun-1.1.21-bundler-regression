import { component } from '@dark-engine/core'
import { useLocation } from '@dark-engine/web-router'
import { styled, css } from '@dark-engine/styled'
import { useTranslation } from '@wareme/translations'

import { config } from '../config'
import { getLanguageFromPathname } from '../translations'
import { getHomePath } from '../routes'
import Copyright from '../components/Copyright'
import NavigationLink from '../components/NavigationLink'

const StyledFooter = styled.footer`
  display: flex;
  padding: 0 4vw;
  height: ${props => props.theme.footerHeightMobile};
  ${props => css`
    @media (min-width: ${props.theme.sm}) {
      height: ${props.theme.footerHeight};
      padding: 0 2.5vw;
    }
  `}
`

const BrandColumn = styled.div`
  display: none;
  ${props => css`
    @media (min-width: ${props.theme.sm}) {
      flex: 1;
      display: flex;
      align-items: end;
      padding: 0 0 1vw 0;
    }
  `}
`

const InfoColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 0 0 1vw 0;
`

const InfoParagraph = styled.p`
  color: ${props => props.theme.foregroundSecondary};
`

const LinksList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const Footer = component(({ inViewRef }) => {
  const { t } = useTranslation('footer')
  const { pathname } = useLocation()
  const language = getLanguageFromPathname(pathname)
  const homePath = getHomePath(language)

  return (
    <StyledFooter ref={inViewRef}>
      <BrandColumn>
        <div>
          {/* TODO logo */}
          <svg />
        </div>
      </BrandColumn>

      <InfoColumn>
        <InfoParagraph>
          <Copyright name={config.name} /><br />
          {t('vat')}: {config.vatId}
        </InfoParagraph>

        <nav>
          <LinksList role='list'>
            <li><NavigationLink to={`${homePath}legal`}>Legal notice</NavigationLink></li>
            <li><NavigationLink to={`${homePath}privacy`}>Privacy policy</NavigationLink></li>
          </LinksList>
        </nav>
      </InfoColumn>
    </StyledFooter>
  )
})

export default Footer
