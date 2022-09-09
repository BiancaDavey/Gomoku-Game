import { Link, useNavigate } from 'react-router-dom'

import style from './Header.module.css'

export default function Header() {
  const navigate = useNavigate()
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
  )
}
