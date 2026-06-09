'use client'
import { useState, useEffect } from 'react'

export default function DashboardPage() {
  const [token, setToken] = useState('')

  useEffect(() => {
    const t = localStorage.getItem('sb_token')
    if (!t) {
      window.location.href = '/auth/login'
    } else {
      setToken(t)
    }
  }, [])

  function handleLogout() {
    localStorage.removeItem('sb_token')
    window.location.href = '/'
  }

  return (
    <main style={{ fontFamily: 'sans-serif', background: '#f9fafb', minHeight: '100vh' }}>
      <nav style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ fontSize: '20px', fontWeight: 600, textDecoration: 'none', color: '#111827' }}>
          Курорт<span style={{ color: '#059669' }}>рум</span>
        </a>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', color: '#6b7280' }}>Личный кабинет</span>
          <button onClick={handleLogout} style={{ background: 'none', border: '1px solid #e5e7eb', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', color: '#374151' }}>
            Выйти
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '8px' }}>Добро пожаловать! 👋</h1>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '32px' }}>Управляйте своими объектами и заявками</p>

        {/* Карточки статистики */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>Мои объекты</div>
            <div style={{ fontSize: '28px', fontWeight: 600, color: '#111827' }}>0</div>
          </div>
          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>Заявки</div>
            <div style={{ fontSize: '28px', fontWeight: 600, color: '#111827' }}>0</div>
          </div>
          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>Подписка</div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#059669' }}>Пробный период</div>
          </div>
        </div>

        {/* Меню */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <a href="/dashboard/properties" style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', textDecoration: 'none', color: '#111827', display: 'block' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🏠</div>
            <div style={{ fontWeight: 500, fontSize: '16px', marginBottom: '4px' }}>Мои объекты</div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>Добавить и управлять жильём</div>
          </a>
          <a href="/dashboard/leads" style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', textDecoration: 'none', color: '#111827', display: 'block' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📩</div>
            <div style={{ fontWeight: 500, fontSize: '16px', marginBottom: '4px' }}>Заявки</div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>Заявки от туристов</div>
          </a>
          <a href="/dashboard/subscription" style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', textDecoration: 'none', color: '#111827', display: 'block' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>💳</div>
            <div style={{ fontWeight: 500, fontSize: '16px', marginBottom: '4px' }}>Подписка</div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>Тарифы и оплата</div>
          </a>
          <a href="/dashboard/stats" style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', textDecoration: 'none', color: '#111827', display: 'block' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📊</div>
            <div style={{ fontWeight: 500, fontSize: '16px', marginBottom: '4px' }}>Статистика</div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>Просмотры и активность</div>
          </a>
        </div>
      </div>
    </main>
  )
}