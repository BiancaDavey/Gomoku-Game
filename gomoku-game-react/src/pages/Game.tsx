import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useLocalStorage } from '../hooks'
import { Board, Button } from '../components'
import { isGameEnded } from '../utils'
import { AVAILABLE_GAME_SIZES, GAME_STATUS } from '../constants'
import type { Position, GameData } from '../types'
import style from './Game.module.css'

const isGameOver = (gameStatus: GAME_STATUS) =>
  [GAME_STATUS.DRAW, GAME_STATUS.BLACK_WIN, GAME_STATUS.WHITE_WIN].includes(
    gameStatus
  )

export default function Game() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [games, setGames] = useLocalStorage<GameData[]>('games', [])
  const size = parseInt(searchParams.get('size') || '0')
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.BLACK_MOVE)
  const [moves, setMoves] = useState<Position[]>([])

  if (!AVAILABLE_GAME_SIZES.includes(size)) {
    return (
      <p className={style.message}>
        Invalid game size. Return to home page and start again.
      </p>
    )
  }

  const updateGameStatus = (move: Position) => {
    if (isGameOver(gameStatus)) return
    const updatedMoves = [...moves, move]
    if (isGameEnded(size, updatedMoves)) {
      if (updatedMoves.length === size * size) {
        setGameStatus(GAME_STATUS.DRAW)
      } else if (updatedMoves.length % 2) {
        setGameStatus(GAME_STATUS.BLACK_WIN)
      } else {
        setGameStatus(GAME_STATUS.WHITE_WIN)
      }
    } else {
      setGameStatus(
        updatedMoves.length % 2
          ? GAME_STATUS.WHITE_MOVE
          : GAME_STATUS.BLACK_MOVE
      )
    }
    setMoves(updatedMoves)
  }

  const restart = () => {
    if (
      !isGameOver(gameStatus) &&
      !window.confirm('The game is still in progress. Are you sure to restart?')
    )
      return
    setMoves([])
    setGameStatus(GAME_STATUS.BLACK_MOVE)
  }

  const leave = () => {
    if (
      !isGameOver(gameStatus) &&
      !window.confirm('The game is still in progress. Are you sure to leave?')
    )
      return
    if (isGameOver(gameStatus)) {
      setGames([
        ...games,
        { size, moves, date: new Date().toString(), result: gameStatus },
      ])
      navigate('/games')
    } else {
      navigate('/')
    }
  }

  return (
    <>
      <p className={style.message}>{gameStatus}</p>
      <Board
        size={size}
        updateGameStatus={updateGameStatus}
        moves={moves}
        readonly={isGameOver(gameStatus)}
      />
      <div className={style.buttons}>
        <Button type="button" onClick={restart}>
          Restart
        </Button>
        <Button type="button" onClick={leave}>
          Leave
        </Button>
      </div>
    </>
  )
}
