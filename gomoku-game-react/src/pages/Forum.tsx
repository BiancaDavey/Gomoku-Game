import { useNavigate } from 'react-router-dom'
import { Button } from '../components'
import style from './Forum.module.css'

export default function Forum() {
    const navigate = useNavigate() 

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