import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components'
import { AVAILABLE_GAME_SIZES } from '../constants'
import style from './Home.module.css'

export default function Home() {
  const navigate = useNavigate()
  const [size, setSize] = useState(10)

  return (
    <>
      <label className={style.label}>
        Select a size for the game:
        <select
          className={style.select}
          value={size.toString()}
          onChange={(event) => setSize(parseInt(event.target.value))}
        >
          {AVAILABLE_GAME_SIZES.map((value) => (
            <option key={`size-${value}`} value={value.toString()}>
              {value}
            </option>
          ))}
        </select>
      </label>
      <Button type="button" onClick={() => navigate(`game?size=${size}`)}>
        Start Game
      </Button>
    </>
  )
}
