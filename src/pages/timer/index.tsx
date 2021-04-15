import { css } from '@emotion/react'
import Head from 'next/head'
import { FC, useState, useEffect } from 'react'
import { Button } from '../../components/Button'
import { aliasColor } from '../../styles/color'
import { fontSize } from '../../styles/typography'

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
                  value={hour === 0 ? '' : hour}
                  css={inputStyle}
                  placeholder="0"
                />
                <span css={unitStyle}>時間</span>
              </div>
              <div css={timerItemStyle}>
                <input
                  type="number"
                  min={0}
                  max={59}
                  onChange={(e): void => setMinute(Number(e.target.value))}
                  value={minute === 0 ? '' : minute}
                  css={inputStyle}
                  placeholder="0"
                />
                <span css={unitStyle}>分</span>
              </div>
              <div css={timerItemStyle}>
                <input
                  type="number"
                  min={0}
                  max={59}
                  onChange={(e): void => setSecond(Number(e.target.value))}
                  value={second === 0 ? '' : second}
                  css={inputStyle}
                  placeholder="0"
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
        <div css={graphWrapStyle}>
          <div css={graphStyle(totalSecond, timeAtInput)}></div>
        </div>
        <div css={buttonWrapStyle}>
          {measurement ? (
            <>
              {totalSecond > 0 ? (
                <Button
                  onClick={() => setMeasurement(false)}
                  variant="border"
                  color="main"
                  css={buttonStyle}
                >
                  一時停止
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    reset()
                    setEditable(true)
                  }}
                  variant="fill"
                  color="sub"
                  css={buttonStyle}
                >
                  リセット
                </Button>
              )}
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
                disabled={timeAtInput === 0}
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
  gridTemplateColumns:
    'minmax(16px, 1fr) minmax(auto, 608px) minmax(16px, 1fr)',
  gridTemplateRows: '1fr 64px 1fr',
  height: '100%',
  placeItems: 'center',
})

const inputTimeStyle = css({
  alignSelf: 'flex-end',
  backgroundColor: aliasColor.surface,
  borderRadius: 20,
  display: 'flex',
  gridColumn: '2 / 3',
  justifyContent: 'center',
  lineHeight: 1,
  padding: '24px min(3.75vw, 24px) 28px',
  width: '100%',
})

const displayTimeStyle = (measurement: boolean) =>
  css({
    alignSelf: 'flex-end',
    color: measurement ? 'inherit' : aliasColor.textDisabled,
    display: 'flex',
    gridColumn: '2 / 3',
    justifyContent: 'center',
    lineHeight: 1,
    padding: '24px min(3.75vw, 24px) 28px',
    width: '100%',
  })

const timerItemStyle = css({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  '& + &': {
    marginLeft: 'min(6.25vw, 40px)',
  },
})

const inputStyle = css({
  backgroundColor: 'transparent',
  border: 'none',
  color: aliasColor.textOnSurface,
  fontFamily: '"Noto Serif", serif',
  fontSize: 'min(18.75vw, 120px)',
  height: '1em',
  textAlign: 'center',
  width: 'min(22.5vw, 144px)',
  MozAppearance: 'textfield',
  '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
  },
})

const displayNumberStyle = css({
  fontFamily: '"Noto Serif", serif',
  fontSize: 'min(18.75vw, 120px)',
  textAlign: 'center',
  width: 'min(22.5vw, 144px)',
})

const unitStyle = css({
  fontSize: `clamp(${fontSize.body1}, 2.8125vw, ${fontSize.subhead2})`,
  marginTop: 4,
})

const graphWrapStyle = css({
  backgroundColor: aliasColor.surface,
  borderRadius: 3,
  gridColumn: '2 / 3',
  height: 6,
  width: '100%',
})

const graphStyle = (totalSecond: number, timeAtInput: number) =>
  css({
    backgroundColor: aliasColor.main,
    borderRadius: 3,
    height: '100%',
    justifySelf: 'flex-start',
    transition: `width ${
      totalSecond === timeAtInput ? '250ms ease-out' : '1000ms linear'
    }`,
    width: `calc(${totalSecond} / ${timeAtInput} * 100%)`,
  })

const buttonWrapStyle = css({
  alignItems: 'center',
  alignSelf: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  gridColumn: '2 / 3',
  gridRow: '3 / 4',
  paddingTop: 16,
  width: '100%',
})

const buttonStyle = css({
  width: 'min(400px, 100%)',
})

const resetButtonStyle = css({
  marginTop: 16,
})

export default TimerPage
