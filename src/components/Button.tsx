import { css } from '@emotion/react'
import { forwardRef } from 'react'
import { globalColor } from '../styles/color'
import { typography } from '../styles/typography'

type ButtonProps = JSX.IntrinsicElements['button']
type Props = ButtonProps & {
  color: 'main' | 'sub'
  variant: 'fill' | 'border'
  children: string
}
export type Ref = HTMLButtonElement

export const Button = forwardRef<Ref, Props>(function Button(props, ref) {
  const { children, variant, color, ...buttonProps } = props
  const handleBorderColor = (color: Props['color']) => {
    switch (color) {
      case 'sub':
        return css({
          borderColor: globalColor.darkTextMediumEmphasis,
          color: globalColor.darkTextMediumEmphasis,
        })
      default:
        return css({
          borderColor: globalColor.brown700,
          color: globalColor.brown700,
        })
    }
  }
  const handleFillColor = (color: Props['color']) => {
    switch (color) {
      case 'sub':
        return css({
          backgroundColor: globalColor.darkTextDisabled,
          color: globalColor.darkTextHighEmphasis,
        })
      default:
        return css({
          backgroundColor: globalColor.brown700,
          color: globalColor.lightTextHighEmphasis,
        })
    }
  }
  const handleVariant = (variant: Props['variant'], color: Props['color']) => {
    switch (variant) {
      case 'border':
        return css(handleBorderColor(color), {
          backgroundColor: globalColor.gray0,
        })
      default:
        return css(handleFillColor(color), {
          borderColor: 'transparent',
        })
    }
  }
  return (
    <button
      css={[button, handleVariant(variant, color)]}
      ref={ref}
      {...buttonProps}
    >
      {children}
    </button>
  )
})

const button = css(typography.subhead1, {
  borderRadius: 12,
  borderStyle: 'solid',
  borderWidth: 2,
  fontWeight: 700,
  padding: '6px 22px',
  transition: 'opacity 200ms',
  ':not(:disabled)': {
    boxShadow: '0px 2px 16px rgba(0, 0, 0, 0.12)',
    cursor: 'pointer',
  },
  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
})
