import React, {
    forwardRef,
    ForwardRefRenderFunction,
    memo,
    useEffect,
    useImperativeHandle,
    useRef,
    useState
} from 'react'
import { Button } from 'antd'
export interface SmsProps {
    interval?: number

    onClick(): void
}

export interface SmsRef {
    start(): void

    stop(): void
}

const Sms: ForwardRefRenderFunction<SmsRef, SmsProps> = (
    { interval = 30, onClick },
    ref
) => {
    const [time, setTime] = useState(interval)
    const timeRef = useRef(time)
    const timer = useRef<number | null>(null)
    const [disabled, setDisabled] = useState(false)
    useEffect(() => {
        timeRef.current = time
    }, [time])
    const start = () => {
        setDisabled(true)
        timer.current = window.setInterval(() => {
            if (timeRef.current <= 1) {
                setTime(interval)
                clearInterval(timer.current!)
                setDisabled(false)
            } else {
                setTime(prev => --prev)
            }
        }, 1000)
    }
    const stop = () => {
        timer.current && clearInterval(timer.current)
        setDisabled(false)
        setTime(interval)
    }
    useImperativeHandle(ref, () => ({
        stop,
        start
    }))
    return (
        <Button
            onClick={onClick}
            block
            type="primary"
            disabled={disabled}
            size="large"
        >
            {!disabled ? '获取验证码' : `${time}S`}
        </Button>
    )
}

export default memo(forwardRef(Sms))
