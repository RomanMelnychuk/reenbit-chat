import { useState, useRef } from 'react'

export default function MessageInput({ onSend, connected, initialUser }) {
    const [user, setUser] = useState(initialUser || '')
    const [message, setMessage] = useState('')
    const textareaRef = useRef(null)

    const handleSend = () => {
        if (!user.trim() || !message.trim() || !connected) return
        onSend(user.trim(), message.trim())
        setMessage('')
        if (textareaRef.current) textareaRef.current.style.height = '42px'
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const inputStyle = {
        padding: '10px 10px',
        borderRadius: 12,
        border: '1.5px solid #e2e8f0',
        fontSize: 14,
        outline: 'none',
        fontFamily: 'Inter, sans-serif',
        background: '#fff',
        height: 42,
        minWidth: 0,
    }

    return (
        <div style={{
            padding: '10px 12px',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            gap: 6,
            background: '#fff',
            alignItems: 'flex-end',
        }}>
            <input
                style={{ ...inputStyle, width: 80, flexShrink: 0 }}
                placeholder="Name"
                value={user}
                onChange={e => setUser(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <textarea
                ref={textareaRef}
                style={{
                    ...inputStyle,
                    flex: 1,
                    resize: 'none',
                    minHeight: 42,
                    maxHeight: 120,
                    lineHeight: '1.5',
                    overflowY: 'auto',
                    scrollbarWidth: 'none',
                }}
                rows={1}
                placeholder="Type a message..."
                value={message}
                onChange={e => {
                    setMessage(e.target.value)
                    e.target.style.height = 'auto'
                    e.target.style.height = e.target.scrollHeight + 'px'
                }}
                onKeyDown={handleKeyDown}
            />
            <button
                onClick={handleSend}
                disabled={!connected}
                style={{
                    padding: '10px 12px',
                    borderRadius: 12,
                    border: 'none',
                    background: connected ? 'linear-gradient(135deg, #1e3a8a, #3b82f6)' : '#cbd5e1',
                    color: '#fff',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: connected ? 'pointer' : 'not-allowed',
                    fontFamily: 'Inter, sans-serif',
                    flexShrink: 0,
                    height: 42,
                    whiteSpace: 'nowrap',
                }}
            >
                Send ✈️
            </button>
        </div>
    )
}