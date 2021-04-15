import { css } from '@emotion/react'
import { FC } from 'react'
import { aliasColor } from '../styles/color'
import { typography } from '../styles/typography'

type ButtonProps = JSX.IntrinsicElements['button']
type Props = ButtonProps & {
  color: 'main' | 'sub'
  variant: 'fill' | 'border'
  children: string
}

export const Button: FC<Props> = ({ children, variant, color, ...props }) => {
  const handleBorderColor = (color: Props['color']) => {
    switch (color) {
      case 'sub':
        return css({
          borderColor: aliasColor.textMediumEmphasis,
          color: aliasColor.textMediumEmphasis,
        })
      default:
        return css({
          borderColor: aliasColor.main,
          color: aliasColor.main,
        })
    }
  }
  const handleFillColor = (color: Props['color']) => {
    switch (color) {
      case 'sub':
        return css({
          backgroundColor: aliasColor.surface,
          color: aliasColor.textMediumEmphasis,
        })
      default:
        return css({
          backgroundColor: aliasColor.main,
          color: aliasColor.textOnMain,
        })
    }
  }
  const handleVariant = (variant: Props['variant'], color: Props['color']) => {
    switch (variant) {
      case 'border':
        return css(handleBorderColor(color), {
          backgroundColor: aliasColor.surface,
        })
      default:
        return css(handleFillColor(color), {
          borderColor: 'transparent',
        })
    }
  }
  return (
    <button css={[button, handleVariant(variant, color)]} {...props}>
      {children}
    </button>
  )
}

const button = css(typography.subhead1, {
  borderRadius: 12,
  borderStyle: 'solid',
  borderWidth: 2,
  fontWeight: 700,
  padding: '6px 22px',
  ':not(:disabled)': {
    boxShadow: '0px 2px 16px rgba(0, 0, 0, 0.12)',
  },
})
