import { Routes, Route, Navigate } from 'react-router-dom'
import { Header } from './components'
import { Home, Game, Games, GameLog, Login, SignUp } from './pages'
import style from './App.module.css'

function App() {
  return (
    <>
      <Header />
      <main className={style.main}>
        <div className={style.container}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="game" element={<Game />} />
            <Route path="games" element={<Games />} />
            <Route path="game-log/:gameId" element={<GameLog />} />
            <Route path="login" element={<Login/>} />
            <Route path="sign-up" element={<SignUp/>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </>
  )
}

export default App
