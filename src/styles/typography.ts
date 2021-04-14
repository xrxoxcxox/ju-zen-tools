import { css } from '@emotion/react'

export const fontSize = {
  title: 'var(--font-size-title)',
  headline1: 'var(--font-size-headline1)',
  headline2: 'var(--font-size-headline2)',
  subhead1: 'var(--font-size-subhead1)',
  subhead2: 'var(--font-size-subhead2)',
  body1: 'var(--font-size-body1)',
  body2: 'var(--font-size-body2)',
  body3: 'var(--font-size-body3)',
}

export const lineHeight = {
  title: 'var(--line-height-title)',
  headline1: 'var(--line-height-headline1)',
  headline2: 'var(--line-height-headline2)',
  subhead1: 'var(--line-height-subhead1)',
  subhead2: 'var(--line-height-subhead2)',
  body1: 'var(--line-height-body1)',
  body2: 'var(--line-height-body2)',
  body3: 'var(--line-height-body3)',
}

const title = css({
  fontSize: fontSize.title,
  lineHeight: lineHeight.title,
})

const headline1 = css({
  fontSize: fontSize.headline1,
  lineHeight: lineHeight.headline1,
})

const headline2 = css({
  fontSize: fontSize.headline2,
  lineHeight: lineHeight.headline2,
})

const subhead1 = css({
  fontSize: fontSize.subhead1,
  lineHeight: lineHeight.subhead1,
})

const subhead2 = css({
  fontSize: fontSize.subhead2,
  lineHeight: lineHeight.subhead2,
})

const body1 = css({
  fontSize: fontSize.body1,
  lineHeight: lineHeight.body1,
})

const body2 = css({
  fontSize: fontSize.body2,
  lineHeight: lineHeight.body2,
})

const body3 = css({
  fontSize: fontSize.body3,
  lineHeight: lineHeight.body3,
})

export const typography = {
  title: title,
  headline1: headline1,
  headline2: headline2,
  subhead1: subhead1,
  subhead2: subhead2,
  body1: body1,
  body2: body2,
  body3: body3,
}
