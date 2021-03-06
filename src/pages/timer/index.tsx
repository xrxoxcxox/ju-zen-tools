import { css } from '@emotion/react'
import Head from 'next/head'
import { FC, useState, useEffect, useRef } from 'react'
import { Button } from '../../components/Button'
import { globalColor } from '../../styles/color'
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
    startButtonRef.current?.focus()
  }

  const startButtonRef = useRef<HTMLButtonElement>(null)

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
                <span css={unitStyle(editable, measurement)}>??????</span>
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
                <span css={unitStyle(editable, measurement)}>???</span>
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
                <span css={unitStyle(editable, measurement)}>???</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div css={displayTimeStyle(measurement)}>
              <div css={timerItemStyle}>
                <span css={displayNumberStyle}>{displayHour}</span>
                <span css={unitStyle(editable, measurement)}>??????</span>
              </div>
              <div css={timerItemStyle}>
                <span css={displayNumberStyle}>{displayMinute}</span>
                <span css={unitStyle(editable, measurement)}>???</span>
              </div>
              <div css={timerItemStyle}>
                <span css={displayNumberStyle}>{displaySecond}</span>
                <span css={unitStyle(editable, measurement)}>???</span>
              </div>
            </div>
          </>
        )}
        <div css={graphWrapStyle}>
          <div css={graphBackgroundStyle}>
            <div css={graphStyle(totalSecond, timeAtInput)}></div>
          </div>
        </div>
        <div css={buttonWrapStyle}>
          {measurement ? (
            <Button
              onClick={() => setMeasurement(false)}
              variant="border"
              color="main"
              css={buttonStyle}
            >
              ????????????
            </Button>
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
                ref={startButtonRef}
              >
                {editable ? '??????' : '??????'}
              </Button>
              {editable || (
                <Button
                  onClick={() => {
                    reset()
                    setEditable(true)
                  }}
                  variant="border"
                  color="sub"
                  css={[buttonStyle, resetButtonStyle]}
                >
                  ???????????????
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

const gutter = 16
const contentWidth = 800

const layoutStyle = css({
  display: 'grid',
  gridTemplateColumns: `minmax(${gutter}px, 1fr) minmax(auto, calc(${contentWidth}px - ${gutter}px - ${gutter}px)) minmax(${gutter}px, 1fr)`,
  gridTemplateRows: '1fr auto 1fr',
  height: '100%',
  placeItems: 'center',
})

const timeStyle = css({
  alignSelf: 'flex-end',
  display: 'flex',
  gridColumn: '2 / 3',
  justifyContent: 'center',
  padding: `min((8 / ${contentWidth} * 100vw), 8px) min((24 / ${contentWidth} * 100vw), 24px) min((40 / ${contentWidth} * 100vw), 40px)`,
  width: '100%',
})

const inputTimeStyle = css(timeStyle, {
  backgroundColor: globalColor.gray0,
  borderRadius: 20,
})

const displayTimeStyle = (measurement: boolean) =>
  css(timeStyle, {
    color: measurement ? 'inherit' : globalColor.darkTextDisabled,
  })

const timerItemStyle = css({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  '& + &': {
    marginLeft: `min((24 / ${contentWidth} * 100vw), 24px)`,
  },
})

const displayNumberStyle = css({
  fontFamily: '"Noto Serif", serif',
  fontSize: `clamp(72px, (160 / ${contentWidth} * 100vw), 160px)`,
  lineHeight: 'normal',
  marginBottom: '-0.15em',
  textAlign: 'center',
  width: `min((192 / ${contentWidth} * 100vw), 192px)`,
})

const inputStyle = css(displayNumberStyle, {
  backgroundColor: 'transparent',
  border: 'none',
  MozAppearance: 'textfield',
  '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
  },
})

const unitStyle = (editable: boolean, measurement: boolean) =>
  css({
    color:
      editable || measurement
        ? globalColor.darkTextMediumEmphasis
        : globalColor.darkTextDisabled,
    fontSize: `clamp(${fontSize.body1}, (18 / ${contentWidth} * 100vw), ${fontSize.subhead2})`,
  })

const graphWrapStyle = css({
  gridColumn: '2 / 3',
  paddingBottom: 64,
  paddingTop: 32,
  width: '100%',
})

const graphBackgroundStyle = css({
  backgroundColor: globalColor.gray0,
  borderRadius: 3,
  height: 6,
  width: '100%',
})

const graphStyle = (totalSecond: number, timeAtInput: number) =>
  css({
    backgroundColor: globalColor.brown700,
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
  width: '100%',
})

const buttonStyle = css({
  width: 'min(400px, 100%)',
})

const resetButtonStyle = css({
  marginTop: 16,
})

export default TimerPage
