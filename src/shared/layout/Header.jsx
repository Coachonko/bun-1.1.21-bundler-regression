import { component, useState, useRef, useEffect, detectIsEmpty } from '@dark-engine/core'
import { styled, css } from '@dark-engine/styled'
import { useScrollbarWidth } from '@wareme/use-scrollbar-width'
import { invariant, nisha } from '@wareme/utils'

import HeaderNav from './HeaderNav'

const StyledHeader = styled.header`
  position: absolute;
  transition: height .6s, background-color .6s;
  height: ${props => nisha(props.$isVisible, props.theme.headerHeightMobile, '0')};
  background-color: ${props => nisha(props.$isVisible, props.theme.backgroundPrimary, 'transparent')};
  inset: ${props => nisha(props.$scrollbarWidth === 0, '0 0 auto', `0 ${props.$scrollbarWidth}px auto 0`)};
  z-index: ${props => props.theme.zHeader};
  
  ${props => {
    if (props.$isVisible === true) {
      return css`
        @media (min-width: ${props.theme.sm}) {
          height: ${props.theme.headerHeight};
        }
      `
    }
  }};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const HeaderNavWrapper = styled.div`
  transition: transform .6s;
  transform: ${props => nisha(props.$isVisible, 'translateY(0)', 'translateY(-100%)')};
  height: ${props => props.theme.headerHeightMobile};
  ${props => css`
    @media (min-width: ${props.theme.sm}) {
      && { height: ${props.theme.headerHeight}; } // https://github.com/atellmer/dark/issues/72
    }
  `}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Header = component(({ scrollRef, footerInView, openMobileMenu, slot }) => {
  invariant(!detectIsEmpty(scrollRef), 'Header did not receive required scrollRef')

  const scrollbarWidth = useScrollbarWidth()
  const previousScrollPosition = useRef(0)
  const [currentScrollPosition, setCurrentScrollPosition] = useState(0)
  const [isAtTop, setIsAtTop] = useState(true)
  const [hasScrolledUp, setHasScrolledUp] = useState(false)

  useEffect(() => {
    const updateScrollPosition = () => {
      setCurrentScrollPosition(scrollRef.current.scrollTop)
    }
    scrollRef.current.addEventListener('scroll', updateScrollPosition)
    return () => {
      scrollRef.current.removeEventListener('scroll', updateScrollPosition)
    }
  }, [])

  useEffect(() => {
    setIsAtTop(currentScrollPosition === 0)
    setHasScrolledUp(previousScrollPosition.current > currentScrollPosition)
    // update previousScrollPosition after evaluation
    previousScrollPosition.current = currentScrollPosition
  }, [currentScrollPosition])

  const isVisible = isAtTop === true || hasScrolledUp === true || footerInView === true

  return (
    <StyledHeader $isVisible={isVisible} $scrollbarWidth={scrollbarWidth}>
      <HeaderNavWrapper $isVisible={isVisible}>
        <HeaderNav openMobileMenu={openMobileMenu} />
      </HeaderNavWrapper>
      {slot}
    </StyledHeader>
  )
})

export default Header
