import { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Message, Button } from '../components'
import users from '../users.json'
import { UserContext } from '../context'
import style from './Login.module.css'

export default function Login() {
    const { login } = useContext(UserContext)
    //  Initial value null. Need to tell useRef what kind of value to expect. null or HTMLInputElement.
    const usernameInput = useRef<HTMLInputElement | null>(null)
    const navigate = useNavigate()
    //  Returns current value & function for updating the state
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    //  To validate credential, false by default.
    const [isCredentialInvalid, setIsCredentialInvalid] = useState(false)
  
    const handleLogin = () => {
        const user = users.find(
            (u) => u.username === username && u.password === password
        )
        if (!user) {
            setIsCredentialInvalid(true)
        }
        else {
            // TODO: login is not a function.
            login(username)
            //  Navigate to home page upon successful login.
            navigate('/')
        }
    }
  
  //  Current ref will be the input reference.
      useEffect(() => {
          if (usernameInput.current){
              usernameInput.current.focus()
          }
      }, [])
  
      return (
          <form className={style.container} onSubmit={(e) => {
              e.preventDefault()
              handleLogin()
          }}>
              {isCredentialInvalid && 
                  (<Message variant="error" message="Invalid username or password." />
                  )}
              <Input 
                  ref={usernameInput}
                  name="username" 
                  placeholder="Username" 
                  value={username} 
                  onChange={(e) => { 
                      setUsername(e.target.value)
                      setIsCredentialInvalid(false)
                  }} 
              />
              <Input 
                  name="password"
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => {
                      setPassword(e.target.value)
                      setIsCredentialInvalid(false)
                  }} 
              />
              <Button type="submit">Login</Button>
          </form>
      )
  }