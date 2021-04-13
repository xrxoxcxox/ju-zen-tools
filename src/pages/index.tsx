import { css } from '@emotion/react'
import { FC } from 'react'

const IndexPage: FC = () => (
  <>
    <h1 css={title}>
      Hello Next.js{' '}
      <span role="img" aria-label="hand">
        👋
      </span>
    </h1>
  </>
)

const title = css({
  color: '#f00',
})

export default IndexPage
