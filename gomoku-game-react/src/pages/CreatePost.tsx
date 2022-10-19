import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components'
import { get, put, del } from '../utils/http'
import style from './CreatePost.module.css'

export default function CreatePost() {
    const navigate = useNavigate() 
    const [postTitle, setPostTitle] = useState('')
    const [postContent, setPostContent] = useState('')

    //  TODO: Implement function.
    const createNewPost = () => {
        console.log('createNewPost')
    }

    return (
        <>
            <h1 className={style.header}>Create New Post</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    createNewPost()
                }}
                >
                <input
                    className={style.textFieldTitle}
                    type="text"
                    placeholder="Title"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <textarea
                    className={style.textFieldContents}
                    cols={60}
                    rows={12}
                    placeholder="Contents"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                />
                <div className={style.buttons}>
                    <Button type="submit" disabled={!postTitle || !postContent}>
                        SAVE
                    </Button>
                    <Button type="button" onClick={()  => navigate('/forum')}>
                        CANCEL
                    </Button>
                </div>
            </form>
        </>
    )
}