import { useContext, useCallback, useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button } from '../components'
import { UserContext } from '../context'
import { useLocalStorage } from '../hooks'
import type { GameData } from '../types'
import style from './Games.module.css'
import { get } from '../utils/http'

  // TODO: 2.   Hide "View Past Games" button once clicked.
  // TODO: 3.   "Loading" text for 3 seconds.
  // TODO: 4.    "View Past Games" button after 3 seconds.

export default function Games() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [games] = useLocalStorage<GameData[]>('games', [])
  const [userGames, setUserGames] = useState<GameData[]>([])
  let buttonHidden = false

  const pastGamesButton = () => {
    navigate('/games')
    buttonHidden = true
    return buttonHidden
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
      <div className={style.viewButton}>
        <Button onClick={() => 
          navigate('/games')
        }
        >
          View Past Games
        </Button>
      </div> 
    )
  }

  return (
    <>
      <h1 className={style.header}>Past Games</h1>
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
      <div className={style.title}>
        <Button disabled={buttonHidden} onClick={() => 
            navigate('/games')
          }
        >
          View Past Games
        </Button>
      </div> 
    </>
  )
}