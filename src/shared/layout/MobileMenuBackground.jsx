import { component, useEffect, detectIsNumber } from '@dark-engine/core'
import { styled } from '@dark-engine/styled'
import { Animated, useSpring, preset } from '@dark-engine/animations'
import { nisha } from '@wareme/utils'

import { getPrefersReducedMotion } from '../utils/animations'

const MobileMenuBackground = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${props => props.theme.backgroundSecondary};
  z-index: ${props => props.theme.zMobileMenuBackground};
`

const styleFn = (e, v) => e.style.setProperty('transform', `translateY(-${v.transform}%)`)

const MobileMenuBackgroundTransition = component(({ slot, isLeaving, closeMobileMenu, leaveDelay }) => {
  const prefersReducedMotion = getPrefersReducedMotion()
  const enteringStyles = {
    from: { transform: 100 },
    to: { transform: 0 }
  }
  const leavingStyles = {
    from: { transform: 0 },
    to: { transform: 100 }
  }

  const [spring, api] = useSpring({
    ...nisha(isLeaving, leavingStyles, enteringStyles),
    config: () => preset('slow'),
    immediate: () => prefersReducedMotion
  }, [isLeaving])

  const delay = nisha(isLeaving, leaveDelay, 0)
  if (detectIsNumber(delay)) {
    api.delay(delay)
  } else {
    api.delay(0)
  }

  useEffect(() => {
    const itemEndOff = api.on('item-end', () => {
      if (isLeaving) {
        closeMobileMenu()
      }
    })

    return () => {
      itemEndOff()
    }
  }, [isLeaving])

  return (
    <Animated spring={spring} fn={styleFn}>
      <MobileMenuBackground>
        {slot}
      </MobileMenuBackground>
    </Animated>
  )
})

export default MobileMenuBackgroundTransition
