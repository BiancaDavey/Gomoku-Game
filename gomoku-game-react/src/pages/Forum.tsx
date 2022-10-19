import { useContext } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Button } from '../components'
import { UserContext } from '../context'
import style from './Forum.module.css'

export default function Forum() {
    const { user } = useContext(UserContext)
    const navigate = useNavigate() 
    //  If user is not logged in, redirect to the login page.
    if (!user) return <Navigate to="/login" replace/>

    return (
        <>
            <div className={style.menu}>
                <h1 className={style.header}>Forum</h1>
                <Button type="button" onClick={() => navigate('/create-post')}>
                    +
                </Button>
            </div>
        </>
    )
}