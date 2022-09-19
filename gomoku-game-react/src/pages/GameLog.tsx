import { useContext, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Board, Button, Message } from '../components'
import { UserContext } from '../context'
import type { GameData } from '../types'
import style from './GameLog.module.css'
import { get } from '../utils/http'

export default function GameLog() {
  const { user } = useContext(UserContext)
  const { gameId = '' } = useParams()
  const navigate = useNavigate()
  const [gameById, setGameById] = useState<GameData[]>([])
  const [showMessage, setShowMessage] = useState(true)
  let message = "Please wait a few seconds for the game board to load..."
  //  If user is not logged in, redirect to the login page.
  if (!user) return <Navigate to="/login" replace/>

  //  Timeout to remove loading message after 3 seconds.
  setTimeout(() => {
    setShowMessage(false)
  }, 3000)

  //  Display a message informing the user that the game log is loading.
  const displayLoadingMessage = () => {
    if (showMessage){
      return (
        <>
          <Message variant="info" message={message}></Message>
        </>
      )
    }
    else {
      return (
        <>
          <Message variant="hidden" message={message}></Message>
        </>
      )
    }
  }

  const getGameById = async () => {
    const getDetails = await get<GameData[]>('../api/games')
    for (var g = 0; g < getDetails.length; g++){
      if ((getDetails[g]._id === gameId) && (getDetails[g].date !== "")){
        gameById.push(getDetails[g])
      }
    }
    setGameById(gameById)
  }

  getGameById()
  const game = gameById.find(
    (g) => g._id === gameId
  )

  if (!game)
    return (
      <div>
        {displayLoadingMessage()}
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