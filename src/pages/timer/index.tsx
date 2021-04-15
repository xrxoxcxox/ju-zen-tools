import { css } from '@emotion/react'
import Head from 'next/head'
import { FC, useState, useEffect } from 'react'
import { Button } from '../../components/Button'
import { aliasColor } from '../../styles/color'
import { typography } from '../../styles/typography'

const TimerPage: FC = () => {
  // Get a value from each input element.
  const [hour, setHour] = useState<number>(0)
  const [minute, setMinute] = useState<number>(0)
  const [second, setSecond] = useState<number>(0)

  // Convert the retrieved values to seconds and sum them for calculation.
  const timeAtInput = hour * 3600 + minute * 60 + second
  const [totalSecond, setTotalSecond] = useState<number>(0)
  useEffect(() => {
    setTotalSecond(timeAtInput)
  }, [timeAtInput])

  // Set the start or stop state.
  const [measurement, setMeasurement] = useState<boolean>(false)
  const [editable, setEditable] = useState<boolean>(true)

  // Minus 1 second from the current timer value.
  const countDown = () => {
    setTotalSecond((second) => second - 1)
  }

  // Continue minus one second repeatedly only when the timer has started and there are still seconds left.
  useEffect(() => {
    if (measurement && totalSecond > 0) {
      const repeatCountDown = setInterval(countDown, 1000)
      return () => clearInterval(repeatCountDown)
    }
  }, [measurement, totalSecond])

  // Display the calculated number of seconds again in h:m:s format.
  const displayHour = Math.floor(totalSecond / 3600)
  const displayMinute = Math.floor((totalSecond - displayHour * 3600) / 60)
  const displaySecond = totalSecond - displayHour * 3600 - displayMinute * 60

  // Reset the timer.
  const reset = () => {
    setTotalSecond(timeAtInput)
    setMeasurement(false)
  }

  return (
    <>
      <Head>
        <title>Timer</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div css={layoutStyle}>
        {editable ? (
          <>
            <div css={inputTimeStyle}>
              <div css={timerItemStyle}>
                <input
                  type="number"
                  min={0}
                  max={99}
                  onChange={(e): void => setHour(Number(e.target.value))}
                  value={hour}
                  css={inputStyle}
                />
                <span css={unitStyle}>時間</span>
              </div>
              <div css={timerItemStyle}>
                <input
                  type="number"
                  min={0}
                  max={59}
                  onChange={(e): void => setMinute(Number(e.target.value))}
                  value={minute}
                  css={inputStyle}
                />
                <span css={unitStyle}>分</span>
              </div>
              <div css={timerItemStyle}>
                <input
                  type="number"
                  min={0}
                  max={59}
                  onChange={(e): void => setSecond(Number(e.target.value))}
                  value={second}
                  css={inputStyle}
                />
                <span css={unitStyle}>秒</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div css={displayTimeStyle(measurement)}>
              <div css={timerItemStyle}>
                <span css={displayNumberStyle}>{displayHour}</span>
                <span css={unitStyle}>時間</span>
              </div>
              <div css={timerItemStyle}>
                <span css={displayNumberStyle}>{displayMinute}</span>
                <span css={unitStyle}>分</span>
              </div>
              <div css={timerItemStyle}>
                <span css={displayNumberStyle}>{displaySecond}</span>
                <span css={unitStyle}>秒</span>
              </div>
            </div>
          </>
        )}
        <div css={buttonWrapStyle}>
          {measurement ? (
            <>
              <Button
                onClick={() => setMeasurement(false)}
                variant="border"
                color="main"
                css={buttonStyle}
              >
                一時停止
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  setMeasurement(true)
                  setEditable(false)
                }}
                variant="fill"
                color="main"
                css={buttonStyle}
              >
                {editable ? 'スタート' : '再開'}
              </Button>
              {editable || (
                <Button
                  onClick={() => {
                    reset()
                    setEditable(true)
                  }}
                  variant="fill"
                  color="sub"
                  css={[buttonStyle, resetButtonStyle]}
                >
                  リセット
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

const layoutStyle = css({
  display: 'grid',
  gridTemplateRows: '1fr 1fr',
  height: '100%',
  placeItems: 'center',
})

const inputTimeStyle = css({
  alignSelf: 'flex-end',
  backgroundColor: aliasColor.surface,
  borderRadius: 20,
  display: 'flex',
  lineHeight: 1,
  padding: '24px 48px 28px',
})

const displayTimeStyle = (measurement: boolean) =>
  css({
    alignSelf: 'flex-end',
    display: 'flex',
    lineHeight: 1,
    padding: '24px 48px 28px',
    color: measurement ? 'inherit' : aliasColor.textDisabled,
  })

const timerItemStyle = css({
  display: 'flex',
  alignItems: 'baseline',
  '& + &': {
    marginLeft: 32,
  },
})

const inputStyle = css({
  backgroundColor: 'transparent',
  border: 'none',
  color: aliasColor.textOnSurface,
  fontFamily: '"Noto Serif", serif',
  fontSize: 96,
  height: '1em',
  textAlign: 'center',
  width: 108,
  MozAppearance: 'textfield',
  '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
  },
})

const displayNumberStyle = css({
  fontFamily: '"Noto Serif", serif',
  fontSize: 96,
  textAlign: 'center',
  width: 108,
})

const unitStyle = css(typography.subhead2, {
  marginLeft: 8,
})

const buttonWrapStyle = css({
  alignItems: 'center',
  alignSelf: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  paddingTop: 64,
  width: '100%',
})

const buttonStyle = css({
  width: 'min(400px, 100%)',
})

const resetButtonStyle = css({
  marginTop: 16,
})

export default TimerPage
