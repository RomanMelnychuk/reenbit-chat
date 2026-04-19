import { useEffect, useRef } from 'react'
import MessageItem from './MessageItem'

export default function MessageList({ messages, sentimentConfig, currentUser }) {
    const bottomRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <div className="messages-list" style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            background: '#f8fafc',
        }}>
            {messages.length === 0 && (
                <div style={{
                    margin: 'auto',
                    textAlign: 'center',
                    color: '#94a3b8',
                    fontSize: 14,
                }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
                    No messages yet. Say hello!
                </div>
            )}
            {messages.map((msg, i) => (
                <MessageItem
                    key={i}
                    msg={msg}
                    sentimentConfig={sentimentConfig}
                    isOwn={msg.user === currentUser}
                />
            ))}
            <div ref={bottomRef} />
        </div>
    )
}