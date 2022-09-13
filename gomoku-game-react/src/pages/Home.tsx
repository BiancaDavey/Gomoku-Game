import { useState, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components'
import { AVAILABLE_GAME_SIZES, API_HOST } from '../constants'
//import { Game } from '../types'
import style from './Home.module.css'
import { post } from '../utils/http'

// 13/09 Added.
/*
const getWebSocketURL = () => {
  if (!API_HOST) return 'ws://localhost:8080'
  const hostURL = new URL(API_HOST)
  return `${hostURL.protocol === 'https:' ? `wss` : `ws`}://${hostURL.hostname}`
}
*/


export default function Home() {
  const navigate = useNavigate()
  const [size, setSize] = useState(10)
  // 13/09 Added.
  // const ws = useMemo(() => new WebSocket(getWebSocketURL()), [])
  // 13/09 Added.
  //const [gameDetails, setGameDetails] = useState<Game>()
  // Added 13/09
  // const { gameId } = useParams()

  // TODO: 13/09 post request to create a new game upon clicking start. OR should this be in Game?
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


  // 13/09 This works.
  /*
  const handleStartClick = () => {
    navigate(`game?size=${size}`)
  }
  */
  

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

//        <Button type="button" onClick={() => navigate(`game?size=${size}`)}>
