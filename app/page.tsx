'use client'
import { useState } from 'react'

const SUPA_URL = 'https://okaibdzoeteccckmgyvy.supabase.co'
const SUPA_KEY = 'sb_publishable_JjjwbGDtHqQs4f1cygvYAA_csqm9wxt'

export default function HomePage() {
  const [showModal, setShowModal] = useState(false)
  const [phone, setPhone] = useState('')
  const [wishes, setWishes] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!phone) return
    setLoading(true)
    await fetch(`${SUPA_URL}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPA_KEY,
        'Authorization': `Bearer ${SUPA_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        name: 'Подбор жилья',
        phone,
        message: wishes,
        need_transfer: false,
      }),
    })
    setSent(true)
    setLoading(false)
  }

  return (
    <main style={{ fontFamily: 'sans-serif', background: '#f9fafb' }}>
      <style>{`
        @media (max-width: 768px) {
          .cities-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .hero-title { font-size: 22px !important; }
          .hero-subtitle { font-size: 14px !important; }
          .search-box { flex-direction: column !important; }
          .nav-link { display: none !important; }
          .hero-section { padding: 40px 16px !important; }
          .section-pad { padding: 24px 16px !important; }
          .owner-section { padding: 32px 16px !important; }
          .owner-buttons { flex-direction: column !important; align-items: center !important; }
          .hero-buttons { flex-direction: column !important; align-items: center !important; }
          .modal-box { margin: 16px !important; padding: 24px !important; }
          .nav-selection-btn { font-size: 12px !important; padding: 6px 10px !important; }
        }
      `}</style>

      {/* Модальное окно */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div className="modal-box" style={{ background: 'white', borderRadius: '16px', padding: '32px', maxWidth: '480px', width: '100%', position: 'relative' }}>
            <button onClick={() => { setShowModal(false); setSent(false) }} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#6b7280' }}>✕</button>
            
            {sent ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Заявка принята!</h2>
                <p style={{ color: '#6b7280', fontSize: '14px' }}>Мы свяжемся с вами в ближайшее время и подберём лучшие варианты.</p>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>Бесплатный подбор жилья</h2>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>Оставьте телефон — мы подберём лучшие варианты и перезвоним.</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '6px' }}>Ваш телефон *</label>
                    <input
                      placeholder="+7 900 000 00 00"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px', fontSize: '14px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '6px' }}>Пожелания <span style={{ color: '#9ca3af', fontWeight: 400 }}>(необязательно)</span></label>
                    <textarea
                      placeholder="Например: рядом с парком, с парковкой, до 5000 ₽"
                      value={wishes}
                      onChange={e => setWishes(e.target.value)}
                      rows={3}
                      style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px', fontSize: '14px', resize: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !phone}
                    style={{ background: '#059669', color: 'white', border: 'none', padding: '14px', borderRadius: '10px', fontSize: '15px', fontWeight: 500, cursor: 'pointer', opacity: loading || !phone ? 0.7 : 1 }}
                  >
                    {loading ? 'Отправляем...' : 'Получить варианты жилья'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <nav style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ fontSize: '20px', fontWeight: 600, textDecoration: 'none', color: '#111827' }}>
          Курорт<span style={{ color: '#059669' }}>рум</span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="/catalog" className="nav-link" style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none' }}>Жильё</a>
          <a href="/for-owners" className="nav-link" style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none' }}>Владельцам</a>
          <button
            onClick={() => setShowModal(true)}
            className="nav-selection-btn"
            style={{ background: '#ecfdf5', color: '#059669', border: '1px solid #6ee7b7', padding: '8px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            Подбор жилья
          </button>
          <a href="/auth/register" style={{ background: '#059669', color: 'white', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', whiteSpace: 'nowrap' }}>
            Разместить объект
          </a>
        </div>
      </nav>

      <section className="hero-section" style={{ background: '#065f46', color: 'white', padding: '60px 24px', textAlign: 'center' }}>
        <h1 className="hero-title" style={{ fontSize: '28px', fontWeight: 600, marginBottom: '12px' }}>
          Жильё на Кавказских Минеральных Водах
        </h1>
        <p className="hero-subtitle" style={{ color: '#6ee7b7', marginBottom: '32px', fontSize: '16px' }}>
          Кисловодск · Пятигорск · Ессентуки · Железноводск
        </p>
        <div className="search-box" style={{ background: 'white', borderRadius: '12px', padding: '12px 16px', maxWidth: '560px', margin: '0 auto 20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <select style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '14px', color: '#374151', outline: 'none', padding: '4px' }}>
            <option>Все города</option>
            <option>Кисловодск</option>
            <option>Пятигорск</option>
            <option>Ессентуки</option>
            <option>Железноводск</option>
          </select>
          <a href="/catalog" style={{ background: '#059669', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', whiteSpace: 'nowrap' }}>
            Найти жильё
          </a>
        </div>
        <div className="hero-buttons" style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={() => setShowModal(true)}
            style={{ background: 'white', color: '#065f46', border: 'none', padding: '12px 28px', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}
          >
            🏠 Бесплатный подбор жилья
          </button>
        </div>
      </section>

      <section className="section-pad" style={{ padding: '40px 24px', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '24px' }}>Выбери город</h2>
        <div className="cities-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {['Кисловодск', 'Пятигорск', 'Ессентуки', 'Железноводск'].map(city => (
            <a key={city} href={`/catalog?city=${city}`} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', textAlign: 'center', textDecoration: 'none', color: '#111827', display: 'block' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>🏔️</div>
              <div style={{ fontWeight: 500, fontSize: '14px' }}>{city}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="section-pad" style={{ padding: '0 24px 40px', maxWidth: '900px', margin: '0 auto' }}>
        <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {[
            { icon: '📍', text: 'Только КМВ — никакого лишнего' },
            { icon: '📞', text: 'Прямая связь с владельцем' },
            { icon: '🆓', text: 'Для туристов — бесплатно' },
          ].map(f => (
            <div key={f.text} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{f.icon}</div>
              <div style={{ fontSize: '14px', color: '#374151', fontWeight: 500 }}>{f.text}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="owner-section" style={{ background: '#065f46', color: 'white', padding: '48px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 500, marginBottom: '12px' }}>Сдаёте жильё на КМВ?</h2>
        <p style={{ color: '#6ee7b7', marginBottom: '24px', fontSize: '14px' }}>
          14 дней бесплатно · Прямые заявки · Без комиссии
        </p>
        <div className="owner-buttons" style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <a href="/for-owners" style={{ background: 'white', color: '#065f46', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 500, fontSize: '14px' }}>
            Узнать подробнее
          </a>
          <a href="/auth/register" style={{ background: '#059669', color: 'white', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 500, fontSize: '14px', border: '1px solid #6ee7b7' }}>
            Разместить объект →
          </a>
        </div>
      </section>

      <footer style={{ background: 'white', borderTop: '1px solid #e5e7eb', padding: '24px', textAlign: 'center', fontSize: '13px', color: '#6b7280' }}>
        © 2026 Курортрум · Жильё на Кавказских Минеральных Водах
      </footer>
    </main>
  )
}
