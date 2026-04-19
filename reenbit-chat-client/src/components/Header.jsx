export default function Header({ connected }) {
    return (
        <div style={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                <div style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16,
                    flexShrink: 0,
                }}>
                    💬
                </div>
                <div style={{ minWidth: 0 }}>
                    <h1 style={{ color: '#fff', fontSize: 16, fontWeight: 600, letterSpacing: '-0.3px', whiteSpace: 'nowrap' }}>
                        Reenbit Chat
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11, marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Real-time chat with sentiment analysis
                    </p>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, marginLeft: 8 }}>
                <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: connected ? '#4ade80' : '#f87171',
                    boxShadow: connected ? '0 0 0 3px rgba(74,222,128,0.3)' : '0 0 0 3px rgba(248,113,113,0.3)',
                }} />
                <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, whiteSpace: 'nowrap' }}>
                    {connected ? 'Connected' : 'Connecting...'}
                </span>
            </div>
        </div>
    )
}