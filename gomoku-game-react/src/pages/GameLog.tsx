import { useNavigate, useParams } from 'react-router-dom'
import { useLocalStorage } from '../hooks'
import { Board, Button } from '../components'
import type { GameData } from '../types'
import style from './GameLog.module.css'

export default function GameLog() {
  const { gameId = '' } = useParams()
  const navigate = useNavigate()
  const [games] = useLocalStorage<GameData[]>('games', [])
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
