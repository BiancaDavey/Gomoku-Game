import { useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { UserContext } from '../context'
import style from './Header.module.css'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useContext(UserContext)

  const getActions = () => {
    if (user) {
      return (
        <>
          <button className={style.action} onClick={() => navigate('/games')}>
            PREVIOUS GAMES
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
        <Link to="/">Gomoku</Link>
        <div className={style.actions}>{getActions()}</div>
      </div>
    </header>
  )
}

  /*
  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.title}>
          <Link to="/">Gomoku</Link>
        </div>
        <div className={style.actions}>
          <button className={style.action} onClick={() => navigate('/games')}>
            PREVIOUS GAMES
          </button>
          <button className={style.action} onClick={() => navigate('/login')}>
            LOGIN
          </button>
          <button className={style.action} onClick={() => navigate('/sign-up')}>
            SIGN UP
          </button>
        </div>
      </div>
    </header>
    */
