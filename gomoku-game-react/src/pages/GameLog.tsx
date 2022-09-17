import { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useLocalStorage } from '../hooks'
import { Board, Button } from '../components'
import { UserContext } from '../context'
import type { GameData } from '../types'
import style from './GameLog.module.css'
import { get } from '../utils/http'

  // TODO: 5.   "Loading" text for 3 seconds.
  // TODO: 6.    "View Game Board" button after 3 seconds.

export default function GameLog() {
  const { user } = useContext(UserContext)
  const { gameId = '' } = useParams()
  const navigate = useNavigate()
  const [games] = useLocalStorage<GameData[]>('games', [])
  const [gameById, setGameById] = useState<GameData[]>([])
  //  If user is not logged in, redirect to the login page.
  if (!user) return <Navigate to="/login" replace/>

  const getGameById = async () => {
    const getDetails = await get<GameData[]>('../api/games')
    for (var g = 0; g < getDetails.length; g++){
      if ((getDetails[g]._id === gameId) && (getDetails[g].date !== "")){
        gameById.push(getDetails[g])
      }
    }
    setGameById(gameById)  // Made no difference.
  }

  getGameById()
  const game = gameById.find(
    (g) => g._id === gameId
  )

  if (!game)
    return (
      <div>
        <p className={style.text}>
          Select an option:
        </p>
        <div className={style.button}>
          <Button onClick={() => navigate(`/game-log/${gameId}`)}>View Game Board</Button>
        </div>
        <div className={style.button}>
          <Button onClick={() => navigate('/games')}>Back</Button>
        </div>
      </div>
    )

  const { size, moves, result } = game

  return (
    <>
      <p className={style.message}>{result}</p>
      <Board size={size} moves={moves} readonly />
      <div className={style.button}>
        <Button onClick={() => navigate('/games')}>Back</Button>
      </div>
    </>
  )
}
