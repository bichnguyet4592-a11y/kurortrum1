'use client'
import { useEffect, useState } from 'react'

const SUPA_URL = 'https://okaibdzoeteccckmgyvy.supabase.co'
const SUPA_KEY = 'sb_publishable_JjjwbGDtHqQs4f1cygvYAA_csqm9wxt'

export default function PropertyPage({ params }: { params: { id: string } }) {
  const [property, setProperty] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [needTransfer, setNeedTransfer] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    loadProperty()
  }, [])

  async function loadProperty() {
    const res = await fetch(
      `${SUPA_URL}/rest/v1/properties?select=*,property_images(url)&id=eq.${params.id}`,
      { headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${SUPA_KEY}` } }
    )
    const data = await res.json()
    setProperty(data[0] || null)
    setLoading(false)
  }

  async function sendLead() {
    if (!name || !phone) return
    await fetch(`${SUPA_URL}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPA_KEY,
        'Authorization': `Bearer ${SUPA_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        property_id: params.id,
        name, phone, message,
        need_transfer: needTransfer,
      }),
    })
    setSent(true)
  }

  if (loading) return <div style={{ fontFamily: 'sans-serif', textAlign: 'center', padding: '80px', color: '#6b7280' }}>Загружаем...</div>
  if (!property) return <div style={{ fontFamily: 'sans-serif', textAlign: 'center', padding: '80px', color: '#6b7280' }}>Объект не найден</div>

  return (
    <main style={{ fontFamily: 'sans-serif', background: '#f9fafb', minHeight: '100vh' }}>
      <nav style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ fontSize: '20px', fontWeight: 600, textDecoration: 'none', color: '#111827' }}>
          Курорт<span style={{ color: '#059669' }}>рум</span>
        </a>
        <a href="/catalog" style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none' }}>← Назад к каталогу</a>
      </nav>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px' }}>
          <div>
            <div style={{ height: '320px', background: '#d1fae5', borderRadius: '16px', overflow: 'hidden', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px' }}>
              {property.property_images?.[0]?.url
                ? <img src={property.property_images[0].url} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : '🏠'}
            </div>
            <h1 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '8px' }}>{property.title}</h1>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>📍 {property.city}, {property.address}</div>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <span style={{ background: '#f3f4f6', padding: '6px 14px', borderRadius: '999px', fontSize: '13px' }}>🛏 {property.rooms} комн.</span>
              <span style={{ background: '#f3f4f6', padding: '6px 14px', borderRadius: '999px', fontSize: '13px' }}>👥 до {property.guests} гостей</span>
              <span style={{ background: '#f3f4f6', padding: '6px 14px', borderRadius: '999px', fontSize: '13px' }}>{property.type === 'apartment' ? '🏢 Квартира' : '🏠 Дом'}</span>
            </div>
            {property.description && (
              <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 500, marginBottom: '12px' }}>Описание</h2>
                <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.7' }}>{property.description}</p>
              </div>
            )}
            {property.amenities?.length > 0 && (
              <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 500, marginBottom: '12px' }}>Удобства</h2>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {property.amenities.map((a: string) => (
                    <span key={a} style={{ background: '#ecfdf5', color: '#065f46', padding: '6px 14px', borderRadius: '999px', fontSize: '13px' }}>✓ {a}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '24px' }}>
              <div style={{ fontSize: '28px', fontWeight: 600, color: '#059669', marginBottom: '4px' }}>{property.price_per_night?.toLocaleString()} ₽</div>
              <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '20px' }}>за ночь</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <a href={`tel:${property.phone}`} style={{ background: '#059669', color: 'white', padding: '12px', borderRadius: '10px', textAlign: 'center', textDecoration: 'none', fontSize: '15px', fontWeight: 500 }}>📞 Позвонить</a>
                <a href={`https://wa.me/?text=Здравствуйте, интересует: ${property.title}`} target="_blank" style={{ background: '#25D366', color: 'white', padding: '12px', borderRadius: '10px', textAlign: 'center', textDecoration: 'none', fontSize: '15px', fontWeight: 500 }}>💬 WhatsApp</a>
                <a href={`https://t.me/share/url?url=${property.title}`} target="_blank" style={{ background: '#2AABEE', color: 'white', padding: '12px', borderRadius: '10px', textAlign: 'center', textDecoration: 'none', fontSize: '15px', fontWeight: 500 }}>✈️ Telegram</a>
              </div>
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 500, marginBottom: '16px' }}>Оставить заявку</h3>
                {sent ? (
                  <div style={{ background: '#ecfdf5', border: '1px solid #6ee7b7', borderRadius: '10px', padding: '16px', textAlign: 'center', color: '#065f46' }}>
                    ✅ Заявка отправлена!
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input placeholder="Ваше имя" value={name} onChange={e => setName(e.target.value)} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px 12px', fontSize: '14px' }} />
                    <input placeholder="Телефон" value={phone} onChange={e => setPhone(e.target.value)} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px 12px', fontSize: '14px' }} />
                    <textarea placeholder="Сообщение" value={message} onChange={e => setMessage(e.target.value)} rows={3} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px 12px', fontSize: '14px', resize: 'none' }} />
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                      <input type="checkbox" checked={needTransfer} onChange={e => setNeedTransfer(e.target.checked)} />
                      Нужен трансфер
                    </label>
                    <button onClick={sendLead} style={{ background: '#059669', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontSize: '15px', fontWeight: 500, cursor: 'pointer' }}>
                      Отправить заявку
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}