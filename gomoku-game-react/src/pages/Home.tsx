import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components'
import { AVAILABLE_GAME_SIZES, API_HOST } from '../constants'
import style from './Home.module.css'
import { post } from '../utils/http'

export default function Home() {
  const navigate = useNavigate()
  const [size, setSize] = useState(10)

  //  POST request to create a new game.
  const handleStartClick = async () => {
    await post(`${API_HOST}/api/games`, {
      userId: "",
      size: size,
      moves: [0],
      date: "",
      result: "",
    })
    navigate(`game?size=${size}`)
  }

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
      <Button type="button" onClick={handleStartClick}>
        Start Game
      </Button>
    </>
  )
}
