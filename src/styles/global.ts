import { css } from '@emotion/react'
import { globalColor } from '../styles/color'
import { typography } from '../styles/typography'

export const global = css({
  '*, *::before, *::after': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },
  html: {
    fontFamily: '"Noto Sans JP", sans-serif',
    height: '100%',
  },
  body: [
    typography.body1,
    {
      backgroundColor: globalColor.gray100,
      color: globalColor.darkTextHighEmphasis,
      height: '100%',
    },
  ],
  '#__next': {
    display: 'contents',
  },
  '[data-whatinput="mouse"] *:focus, [data-whatinput="touch"] *:focus': {
    outline: 'none',
  },
  'h1, h2, h3, h4, h5, h6': {
    fontSize: 'inherit',
  },
})
