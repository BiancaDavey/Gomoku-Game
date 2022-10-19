import { useNavigate } from 'react-router-dom'
import { Button } from '../components'
import style from './CreatePost.module.css'

export default function CreatePost() {
    const navigate = useNavigate() 

    return (
        <>
            <h1 className={style.header}>New Post</h1>
            <div className={style.buttons}>
                <Button type="button" onClick={() => navigate('/forum')}>
                    POST
                </Button>
                <Button type="button" onClick={() => navigate('/forum')}>
                    CANCEL
                </Button>
            </div>
        </>
    )
}