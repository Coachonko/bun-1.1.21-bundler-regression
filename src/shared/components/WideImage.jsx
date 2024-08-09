import { component } from '@dark-engine/core'
import { styled } from '@dark-engine/styled'

import { fragmentContainerPadding } from '../styles/fragments'

const Container = styled.div`
  ${props => fragmentContainerPadding(props)}
`

const ImageContainer = styled.div`
  height: 60svh;
  padding: 2rem 0;
`

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`

const WideImage = component(({ ...props }) => {
  return (
    <Container>
      <ImageContainer>
        <Image {...props} />
      </ImageContainer>
    </Container>
  )
})

export default WideImage
