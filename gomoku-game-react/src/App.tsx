import { Routes, Route, Navigate } from 'react-router-dom'
import { Header, UserProvider } from './components'
import { Home, Game, Games, GameLog, Login, SignUp, Forum } from './pages'
import style from './App.module.css'

function App() {
  return (
    <UserProvider>
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
            <Route path="forum" element={<Forum/>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </UserProvider>
  )
}

export default App
