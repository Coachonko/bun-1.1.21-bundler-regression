import { component } from '@dark-engine/core'
import { Link, useLocation } from '@dark-engine/web-router'
import { styled } from '@dark-engine/styled'
import { nisha } from '@wareme/utils'

export const StyledLink = styled(Link)`
  text-decoration: none;
  background-image: ${props => `linear-gradient(${props.theme.foregroundPrimary}, ${props.theme.foregroundPrimary})`};
  background-repeat: no-repeat;
  transition: background-size .3s;

  background-position: ${props => nisha(props.$active, '0 100%', '100% 100%')};
  background-size: ${props => nisha(props.$active, '100% 1px', '0 1px')};

  &:hover {
    background-position: ${props => nisha(props.$active, '100% 100%', '0 100%')};
    background-size: ${props => nisha(props.$active, '0 1px', '100% 1px')};
  }

  &:visited,
  &:link {
    color: unset;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const NavigationLink = component(({ to, slot, ...rest }) => {
  const { pathname } = useLocation()
  return <StyledLink $active={pathname === to} to={to} {...rest}>{slot}</StyledLink>
})

export default NavigationLink
