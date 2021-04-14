import { css } from '@emotion/react'
import { FC, useState, useEffect } from 'react'

const TimerPage: FC = () => {
  // Get a value from each input element.
  const [hour, setHour] = useState<number>(0)
  const [minute, setMinute] = useState<number>(0)
  const [second, setSecond] = useState<number>(0)

  // Convert the retrieved values to seconds and sum them for calculation.
  const [totalSecond, setTotalSecond] = useState<number>(0)
  useEffect(() => {
    setTotalSecond(hour * 3600 + minute * 60 + second)
  }, [hour, minute, second])

  // Set the start or stop state.
  const [measurement, setMeasurement] = useState<boolean>(false)

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
    setHour(0)
    setMinute(0)
    setSecond(0)
  }

  return (
    <div css={style}>
      <h1>タイマーのページです</h1>
      <input
        type="number"
        min={0}
        max={99}
        css={style}
        onChange={(e): void => setHour(Number(e.target.value))}
        value={hour}
      />
      <input
        type="number"
        min={0}
        max={59}
        css={style}
        onChange={(e): void => setMinute(Number(e.target.value))}
        value={minute}
      />
      <input
        type="number"
        min={0}
        max={59}
        css={style}
        onChange={(e): void => setSecond(Number(e.target.value))}
        value={second}
      />
      <button css={style} onClick={() => setMeasurement(true)}>
        スタート
      </button>
      <button css={style} onClick={() => setMeasurement(false)}>
        一時停止
      </button>
      <button css={style} onClick={reset}>
        リセット
      </button>
      <p>
        {displayHour}時間{displayMinute}分{displaySecond}秒
      </p>
    </div>
  )
}

const style = css({
  fontSize: 50,
  lineHeight: 1.5,
})

export default TimerPage
