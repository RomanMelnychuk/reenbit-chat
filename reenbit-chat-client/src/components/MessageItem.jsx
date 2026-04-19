export default function MessageItem({ msg, sentimentConfig, isOwn }) {
    const key = (msg.sentiment || 'neutral').toLowerCase()
    const config = sentimentConfig[key] || sentimentConfig.neutral

    const raw = msg.timestamp.endsWith('Z') ? msg.timestamp : msg.timestamp + 'Z'
    const date = new Date(raw)
    const now = new Date()
    const isToday = date.toDateString() === now.toDateString()

    const time = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    const dateStr = isToday
        ? `Today ${time}`
        : date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + ` ${time}`

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: isOwn ? 'flex-end' : 'flex-start',
            maxWidth: '80%',
            alignSelf: isOwn ? 'flex-end' : 'flex-start',
        }}>
            {!isOwn && (
                <span style={{ fontSize: 12, color: '#475569', fontWeight: 600, marginBottom: 4, marginLeft: 4 }}>
                    {msg.user}
                </span>
            )}
            <div style={{
                background: config.bg,
                borderLeft: isOwn ? 'none' : `4px solid ${config.border}`,
                borderRight: isOwn ? `4px solid ${config.border}` : 'none',
                borderRadius: isOwn ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                padding: '10px 14px',
                minWidth: 0,
                boxSizing: 'border-box',
            }}>
                <span style={{ fontSize: 16, marginBottom: 4, display: 'block' }}>
                    {config.emoji}
                </span>
                <p style={{
                    fontSize: 14,
                    color: '#1e293b',
                    margin: 0,
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                }}>
                    {msg.message}
                </p>
            </div>
            <span style={{ fontSize: 11, color: '#94a3b8', marginTop: 4, marginLeft: 4, marginRight: 4 }}>
                {dateStr}
            </span>
        </div>
    )
}