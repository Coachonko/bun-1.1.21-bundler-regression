import { css } from '@dark-engine/styled'
import { nisha } from '@wareme/utils'

export const fragmentContainerPadding = (props) => css`
  padding: 0 4vw;

  @media (min-width: ${props.theme.sm}) {
    && {padding: 0 2.5vw;} // https://github.com/atellmer/dark/issues/72#issuecomment-2135525554
  }
`

export const fragmentDisplay = (props) => css`
  font-size: ${nisha(props.$fragmentDisplaySize === 'smaller', '300%', '400%')};
  line-height: .9;

  @media (min-width: ${props.theme.sm}) {
    font-size: ${nisha(props.$fragmentDisplaySize === 'smaller', '500%', '600%')};
  }
  @media (min-width: ${props.theme.xl}) {
    font-size: ${nisha(props.$fragmentDisplaySize === 'smaller', '700%', '800%')};
  }
  @media (min-width: ${props.theme.xxxl}) {
    font-size: ${nisha(props.$fragmentDisplaySize === 'smaller', '900%', '1000%')};
  }
`

export const fragmentTitle = (props) => css`
  text-transform: uppercase;
  font-size: ${nisha(props.$fragmentTitleSize === 'smaller', '110%', '130%')};
`

export const fragmentTextPadding = (props) => css`
  padding: 0 0 1rem;

  @media (min-width: ${props.theme.sm}) {
    padding: 0 0 2rem;
  }
`

export const fragmentParagraph = (props) => css`
  @media (min-width: ${props.theme.xl}) {
    font-size: ${nisha(props.$fragmentParagraphSize === 'larger', '130%', '110%')};
  }
  @media (min-width: ${props.theme.xxxl}) {
    font-size: ${nisha(props.$fragmentParagraphSize === 'larger', '150%', '130%')};
  }
`
