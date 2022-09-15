import { useContext, useCallback, useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../context'
import { useLocalStorage } from '../hooks'
import type { GameData } from '../types'
import style from './Games.module.css'
import { get } from '../utils/http'

// ! 14/09 TODO: Games is listing (I think) ALL games, as in not matching the user's id. Access only that user's games.

export default function Games() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [games] = useLocalStorage<GameData[]>('games', [])  // 11/09 WK9.6 Remove.
  const [pastGames, setGames] = useState<GameData[]>([])   //  11/09 WK9.6 Added.
  //  11/09 WK9.6 Added:
  const fetchGames = useCallback(async () => {
    try {
      const result = await get<GameData[]>('/api/games')
      setGames(result)
    } catch (error) {
      console.log((error as Error).message)
      navigate('/')
    }
  }, [navigate])
  //  If user is not logged in, redirect to the login page.
  if (!user) return <Navigate to="/login" replace/>

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

