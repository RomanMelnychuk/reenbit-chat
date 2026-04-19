import { useEffect, useRef, useState } from 'react'
import * as signalR from '@microsoft/signalr'
import Header from './components/Header'
import MessageList from './components/MessageList'
import MessageInput from './components/MessageInput'

const SENTIMENT_CONFIG = {
    positive: { emoji: '😊', bg: '#f0fdf4', border: '#22c55e', text: '#166534' },
    negative: { emoji: '😤', bg: '#fef2f2', border: '#ef4444', text: '#991b1b' },
    neutral: { emoji: '😐', bg: '#f8fafc', border: '#94a3b8', text: '#475569' },
    mixed: { emoji: '🤔', bg: '#fff7ed', border: '#f97316', text: '#9a3412' },
}

export default function App() {
    const [messages, setMessages] = useState([])
    const [connected, setConnected] = useState(false)
    const [currentUser, setCurrentUser] = useState(
        () => localStorage.getItem('chatUsername') || ''
    )
    const connectionRef = useRef(null)

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl('/chatHub')
            .withAutomaticReconnect()
            .build()

        connection.on('ReceiveMessage', (user, message, timestamp, sentiment) => {
            setMessages(prev => [...prev, { user, message, timestamp, sentiment }])
        })

        connection.onreconnecting(() => setConnected(false))
        connection.onreconnected(() => setConnected(true))

        connection.start()
            .then(() => setConnected(true))
            .catch(err => console.error('SignalR connection error:', err))

        connectionRef.current = connection

        return () => connection.stop()
    }, [])

    const sendMessage = (user, message) => {
        localStorage.setItem('chatUsername', user)
        setCurrentUser(user)
        connectionRef.current
            ?.invoke('SendMessage', user, message)
            .catch(err => console.error('Send error:', err))
    }

    return (
        <div style={{ width: '100vw', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
            <div className="chat-wrapper">
                <Header connected={connected} />
                <MessageList messages={messages} sentimentConfig={SENTIMENT_CONFIG} currentUser={currentUser} />
                <MessageInput onSend={sendMessage} connected={connected} initialUser={currentUser} />
            </div>
        </div>
    )
}