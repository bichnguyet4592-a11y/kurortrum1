'use client'
import { useEffect, useState } from 'react'

const SUPA_URL = 'https://okaibdzoeteccckmgyvy.supabase.co'
const SUPA_KEY = 'sb_publishable_JjjwbGDtHqQs4f1cygvYAA_csqm9wxt'

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLeads()
  }, [])

  async function loadLeads() {
    const token = localStorage.getItem('sb_token')
    const userRes = await fetch(`${SUPA_URL}/auth/v1/user`, {
      headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${token}` },
    })
    const userData = await userRes.json()
    const userId = userData.id

    const propsRes = await fetch(
      `${SUPA_URL}/rest/v1/properties?select=id,title&owner_id=eq.${userId}`,
      { headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${token}` } }
    )
    const props = await propsRes.json()

    if (!props || props.length === 0) {
      setLoading(false)
      return
    }

    const ids = props.map((p: any) => p.id).join(',')
    const leadsRes = await fetch(
      `${SUPA_URL}/rest/v1/leads?select=*,properties(title)&property_id=in.(${ids})&order=created_at.desc`,
      { headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${token}` } }
    )
    const data = await leadsRes.json()
    setLeads(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  return (
    <main style={{ fontFamily: 'sans-serif', background: '#f9fafb', minHeight: '100vh' }}>
      <nav style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ fontSize: '20px', fontWeight: 600, textDecoration: 'none', color: '#111827' }}>
          Курорт<span style={{ color: '#059669' }}>рум</span>
        </a>
        <a href="/dashboard" style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none' }}>← Личный кабинет</a>
      </nav>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '24px' }}>Заявки от туристов</h1>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>Загружаем...</div>
        ) : leads.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📩</div>
            <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px' }}>Заявок пока нет</div>
            <div style={{ fontSize: '14px' }}>Как только турист оставит заявку — она появится здесь</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {leads.map(lead => (
              <div key={lead.id} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: '16px', marginBottom: '4px' }}>{lead.name}</div>
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>
                      {lead.properties?.title || 'Объект'}
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                    {new Date(lead.created_at).toLocaleDateString('ru-RU')}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a href={`tel:${lead.phone}`} style={{ background: '#059669', color: 'white', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px' }}>
                    📞 {lead.phone}
                  </a>
                  <a href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} target="_blank" style={{ background: '#25D366', color: 'white', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px' }}>
                    💬 WhatsApp
                  </a>
                </div>
                {lead.message && (
                  <div style={{ marginTop: '12px', padding: '12px', background: '#f9fafb', borderRadius: '8px', fontSize: '14px', color: '#374151' }}>
                    {lead.message}
                  </div>
                )}
                {lead.need_transfer && (
                  <div style={{ marginTop: '8px', fontSize: '13px', color: '#059669' }}>🚕 Нужен трансфер</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}