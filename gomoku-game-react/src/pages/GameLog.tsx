import { useContext } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useLocalStorage } from '../hooks'
import { Board, Button } from '../components'
import { UserContext } from '../context'
import type { GameData } from '../types'
import style from './GameLog.module.css'

export default function GameLog() {
  const { user } = useContext(UserContext)
  const { gameId = '' } = useParams()
  const navigate = useNavigate()
  const [games] = useLocalStorage<GameData[]>('games', [])
    //  If user is not logged in, redirect to the login page.
    if (!user) return <Navigate to="/login" replace/>
  const game = games.find(
    (g) => new Date(g.date).getTime() === parseInt(gameId)
  )
  if (!game)
    return (
      <p className={style.message}>
        Cannot find the game log, please go back to the home page
      </p>
    )

  const { size, moves, result } = game
  console.log(`Moves: ${moves}`)

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
