'use client'
import { useEffect, useState } from 'react'

const SUPA_URL = 'https://okaibdzoeteccckmgyvy.supabase.co'
const SUPA_KEY = 'sb_publishable_JjjwbGDtHqQs4f1cygvYAA_csqm9wxt'

export default function AdminPage() {
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'pending' | 'active'>('pending')

  useEffect(() => {
    loadProperties()
  }, [tab])

  async function loadProperties() {
    setLoading(true)
    const token = localStorage.getItem('sb_token')
    const res = await fetch(
      `${SUPA_URL}/rest/v1/properties?select=*,property_images(url),profiles(name,email,phone)&is_active=eq.${tab === 'active'}&order=created_at.desc`,
      { headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${token}` } }
    )
    const data = await res.json()
    setProperties(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  async function approve(id: string) {
    const token = localStorage.getItem('sb_token')
    await fetch(`${SUPA_URL}/rest/v1/properties?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPA_KEY,
        'Authorization': `Bearer ${token}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ is_active: true }),
    })
    loadProperties()
  }

  async function reject(id: string) {
    const token = localStorage.getItem('sb_token')
    await fetch(`${SUPA_URL}/rest/v1/properties?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPA_KEY,
        'Authorization': `Bearer ${token}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ is_active: false }),
    })
    loadProperties()
  }
  return (
    <main style={{ fontFamily: 'sans-serif', background: '#f9fafb', minHeight: '100vh' }}>
      <nav style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ fontSize: '20px', fontWeight: 600, textDecoration: 'none', color: '#111827' }}>
          Курорт<span style={{ color: '#059669' }}>рум</span>
        </a>
        <div style={{ fontSize: '14px', color: '#6b7280' }}>Админ-панель</div>
      </nav>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '24px' }}>Модерация объектов</h1>

        <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid #e5e7eb', marginBottom: '24px' }}>
          <button
            onClick={() => setTab('pending')}
            style={{ padding: '10px 20px', fontSize: '14px', border: 'none', background: 'none', cursor: 'pointer', borderBottom: tab === 'pending' ? '2px solid #059669' : '2px solid transparent', color: tab === 'pending' ? '#059669' : '#6b7280', fontWeight: tab === 'pending' ? 500 : 400 }}
          >
            Ожидают проверки
          </button>
          <button
            onClick={() => setTab('active')}
            style={{ padding: '10px 20px', fontSize: '14px', border: 'none', background: 'none', cursor: 'pointer', borderBottom: tab === 'active' ? '2px solid #059669' : '2px solid transparent', color: tab === 'active' ? '#059669' : '#6b7280', fontWeight: tab === 'active' ? 500 : 400 }}
          >
            Активные
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>Загружаем...</div>
        ) : properties.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>🏠</div>
            <div style={{ fontSize: '16px', fontWeight: 500 }}>Объектов нет</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {properties.map(p => (
              <div key={p.id} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: '16px', alignItems: 'start' }}>
                  <div style={{ width: '80px', height: '80px', background: '#d1fae5', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                    {p.property_images?.[0]?.url
                      ? <img src={p.property_images[0].url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : '🏠'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: '16px', marginBottom: '4px' }}>{p.title}</div>
                    <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>📍 {p.city} · {p.rooms} комн. · {p.price_per_night?.toLocaleString()} ₽/ночь</div>
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>
                      👤 {p.profiles?.name || 'Владелец'} · {p.profiles?.email}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {tab === 'pending' ? (
                      <>
                        <button
                          onClick={() => approve(p.id)}
                          style={{ background: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', whiteSpace: 'nowrap' }}
                        >
                          ✓ Одобрить
                        </button>
                        <button
                          onClick={() => reject(p.id)}
                          style={{ background: 'white', color: '#dc2626', border: '1px solid #fecaca', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', whiteSpace: 'nowrap' }}
                        >
                          ✗ Отклонить
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => reject(p.id)}
                        style={{ background: 'white', color: '#dc2626', border: '1px solid #fecaca', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', whiteSpace: 'nowrap' }}
                      >
                        Деактивировать
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}