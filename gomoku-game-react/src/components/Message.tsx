import style from './Message.module.css'

type MessageProps = {
    //  Variant determines the style of the message.
    variant: 'info' | 'success' | 'warning' | 'error'
    message: string
}

export default function Message({ variant, message }: MessageProps) {
    return <div className={`${style.message} ${style[variant]}`}>{message}</div>
}