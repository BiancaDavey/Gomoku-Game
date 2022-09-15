import { useContext, useCallback, useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../context'
import { useLocalStorage } from '../hooks'
import type { GameData } from '../types'
import style from './Games.module.css'
import { get } from '../utils/http'

// TODO: 14/09 Games uses Date as id to nav to GameLog.

export default function Games() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [games] = useLocalStorage<GameData[]>('games', [])  // 11/09 WK9.6 Remove.
  const [userGames, setUserGames] = useState<GameData[]>([])   //  11/09 WK9.6 Added.

  const getUserGames = async () => {
    //  GET request to get game details.
    const getDetails = await get<GameData[]>('api/games')
    console.log(`getDetails: ${getDetails}`)  // All games.
    const thisUser = user?._id
    console.log(`thisUser: ${thisUser}`)
    for (var g = 0; g < getDetails.length; g++){
      if (getDetails[g].userId === thisUser){
        userGames.push(getDetails[g])
      }
    }
    setUserGames(userGames)
    console.log(`userGames: ${userGames}`)
    console.log(`userGames[0]._id: ${userGames[0]._id}`)
    for (var i = 0; i < userGames.length; i++){
      console.log(`userGames[i]._id: ${userGames[i]._id}`)
      return(<>{userGames[i]._id}</>)
    }
  }

  //  If user is not logged in, redirect to the login page.
  if (!user) return <Navigate to="/login" replace/>
  getUserGames()

  // TODO: display/map userGames only.
  return (
    <>
      <h1 className={style.header}>Previous Games</h1>
      {games.map(({ date, result }, index) => {
        const d = new Date(date)
        return (
          <div className={style.list} key={`game-${index}`}>
            <p className={style.title}>
              Game #{index + 1} @{d.toLocaleDateString()} - {result}
            </p>
            <button
              className={style.button}
              onClick={() => navigate(`/game-log/${d.getTime()}`)}  // Use timestamp as id.
            >
              View Game Log
            </button>
          </div>
        )
      })}
    </>
  )
}

/*
  return (
    <>
      <h1 className={style.header}>Previous Games</h1>
      {games.map(({ date, result }, index) => {
        const d = new Date(date)
        return (
          <div className={style.list} key={`game-${index}`}>
            <p className={style.title}>
              Game #{index + 1} @{d.toLocaleDateString()} - {result}
            </p>
            <button
              className={style.button}
              onClick={() => navigate(`/game-log/${d.getTime()}`)}  // Use timestamp as id.
            >
              View Game Log
            </button>
          </div>
        )
      })}
    </>
  )
}
*/

