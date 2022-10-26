import { useContext, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { UserContext } from '../context'
import { ThemeContext } from '../context'
import style from './Header.module.css'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useContext(UserContext)
  const { updateTheme } = useContext(ThemeContext)
  const [themeApplied, setThemeNumber] = useState("")

  const setThemeSynthwave = () => {
    console.log('TODO: Set synthwave theme.')
    setThemeNumber("0")
    updateTheme(themeApplied)
  }

  const setThemeMatrix = () => {
    console.log('TODO: Set matrix theme.')
    setThemeNumber("1")
    updateTheme(themeApplied)
  }

  const getActions = () => {
    if (user) {
      return (
        <>
          <button className={style.action} onClick={() => navigate('/games')}>
            PAST GAMES
          </button>
          <button className={style.action} onClick={() => navigate('/forum')}>
            FORUM
          </button>
          <button 
            className={style.action} 
            onClick={() => {
              logout()
              navigate('/')
            }}
          >
            LOGOUT
          </button>
          <button className={style.themeButton} onClick={setThemeSynthwave}>
          </button>
          <button className={style.themeButton1} onClick={setThemeMatrix}>
          </button>
        </>
      )
    }
    else {
      return location.pathname !== '/login' ? (
        <button className={style.action} onClick={() => navigate('/login')}>
          LOGIN
        </button>      
      ) : (
        <button className={style.action} onClick={() => navigate('/sign-up')}>
          SIGN UP
        </button>
      )
    }
  }

  return (
    <header className={style.header}>
      <div className={style.container}>
        <Link className={style.title} to="/">Gomoku</Link>
        <div className={style.actions}>{getActions()}</div>
      </div>
    </header>
  )
}
