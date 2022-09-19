import { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Message } from '../components'
import { UserContext } from '../context'
import type { GameData } from '../types'
import style from './Games.module.css'
import { get } from '../utils/http'

export default function Games() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [userGames, setUserGames] = useState<GameData[]>([])
  const [showMessage, setShowMessage] = useState(true)
  let message = "Please wait a few seconds for your past games to load..."

  //  Timeout to remove loading message after 5 seconds.
  setTimeout(() => {
    setShowMessage(false)
  }, 5000)

  //  Display a message informing the user that the past games list is loading.
  const displayLoadingMessage = () => {
    if (showMessage)
    return (
      <>
        <Message variant="info" message={message}></Message>
      </>
    )
  }

  const getUserGames = async () => {
    //  GET request to get game details.
    const getDetails = await get<GameData[]>('api/games')
    const thisUser = user?._id
    for (var g = 0; g < getDetails.length; g++){
      if ((getDetails[g].userId === thisUser) && (getDetails[g].date !== "")){
        userGames.push(getDetails[g])
      }
    }
    setUserGames(userGames)
  }

  //  If user is not logged in, redirect to the login page.
  if (!user) return <Navigate to="/login" replace/>
  getUserGames()

  if (!userGames){
    return (
      <div className={style.title}>
        {displayLoadingMessage()}
      </div> 
    )
  }

  return (
    <>
      <h1 className={style.header}>Past Games</h1>
      {displayLoadingMessage()}
      {userGames.map(({ date, result, _id }, index) => {
        const d = new Date(date)
        return (
          <div className={style.list} key={`userGame-${index}`}>
            <p className={style.title}>
              Game #{index + 1} @{d.toLocaleDateString()} - {result}
            </p>
            <button
              className={style.button}
              onClick={() => navigate(`/game-log/${_id}`)}
            >
              View Game Log
            </button>
          </div>
        )
      })}
    </>
  )
}