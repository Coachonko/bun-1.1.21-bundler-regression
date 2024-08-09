import { component, detectIsNumber } from '@dark-engine/core'
import { styled } from '@dark-engine/styled'
import { Animated, useSpring } from '@dark-engine/animations'
import { nisha } from '@wareme/utils'

import { getPrefersReducedMotion } from '../utils/animations'

const Wrapper = styled.div`
  overflow: hidden;
`

const styleFn = (e, v) => e.style.setProperty('transform', `translateY(-${v.transform}%)`)

const MobileMenuForeground = component(({ slot, isOpen, isLeaving, enterDelay, leaveDelay }) => {
  const prefersReducedMotion = getPrefersReducedMotion()
  const leavingConfig = {
    from: { transform: 0 },
    to: { transform: 100 }
  }
  const enteringConfig = {
    from: { transform: 100 },
    to: { transform: 0 }
  }
  const leaving = isOpen === true && isLeaving === true

  const [spring, api] = useSpring({
    ...nisha(isOpen === true && isLeaving === true, leavingConfig, enteringConfig),
    immediate: () => prefersReducedMotion
  }, [leaving])

  const delay = nisha(leaving === true, leaveDelay, enterDelay)
  if (detectIsNumber(delay)) {
    api.delay(delay)
  } else {
    api.delay(0) // api.delay persists across rerenders, must be reset manually
  }

  return (
    <Wrapper>
      <Animated spring={spring} fn={styleFn}>
        <div>
          {slot}
        </div>
      </Animated>
    </Wrapper>
  )
})

export default MobileMenuForeground
