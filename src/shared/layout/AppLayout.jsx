import { component, useRef, useState } from '@dark-engine/core'
import { styled, css } from '@dark-engine/styled'
import { useInView } from '@wareme/use-in-view'
import { SmoothScrollingProvider } from '@wareme/smooth-scrolling'
import { nisha } from '@wareme/utils'

import Header from './Header'
import Footer from './Footer'
import MobileMenu from './MobileMenu'

const StyledMain = styled.main`
  margin: ${props => `${props.theme.headerHeightMobile} 0 0`};
  ${props => css`
    @media (min-width: ${props.theme.sm}) {
      margin: ${props.theme.headerHeight} 0 0;
    }
  `}
`

const StyledSmoothScrollingProvider = styled(SmoothScrollingProvider)`
  position: absolute;
  inset: 0;
  overflow-y: auto;
  pointer-events: ${props => nisha(props.$mobileMenuIsOpen, 'none', 'auto')};
`

const AppLayout = component(({ slot }) => {
  const scrollRef = useRef(null)
  const { ref, inView } = useInView()

  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)
  const openMobileMenu = () => setMobileMenuIsOpen(true)
  const closeMobileMenu = () => setMobileMenuIsOpen(false)

  return (
    <>
      <Header scrollRef={scrollRef} footerInView={inView} openMobileMenu={openMobileMenu}>
        <MobileMenu isOpen={mobileMenuIsOpen} closeMobileMenu={closeMobileMenu} />
      </Header>
      <StyledSmoothScrollingProvider wrapperRef={scrollRef} $mobileMenuIsOpen={mobileMenuIsOpen}>
        <StyledMain>
          {slot}
        </StyledMain>
        <Footer inViewRef={ref} />
      </StyledSmoothScrollingProvider>
    </>
  )
})

export default AppLayout
