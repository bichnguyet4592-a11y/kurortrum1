'use client'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin() {
    if (!email || !password) {
      setError('Заполните все поля')
      return
    }
    setLoading(true)
    setError('')

    const res = await fetch(
      'https://okaibdzoeteccckmgyvy.supabase.co/auth/v1/token?grant_type=password',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'sb_publishable_JjjwbGDtHqQs4f1cygvYAA_csqm9wxt',
        },
        body: JSON.stringify({ email, password }),
      }
    )

    const data = await res.json()

    if (data.error) {
      setError('Неверный email или пароль')
    } else {
      localStorage.setItem('sb_token', data.access_token)
      window.location.href = '/dashboard'
    }
    setLoading(false)
  }

  return (
    <main style={{ fontFamily: 'sans-serif', minHeight: '100vh', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '40px', maxWidth: '400px', width: '100%' }}>
        <a href="/" style={{ fontSize: '20px', fontWeight: 600, textDecoration: 'none', color: '#111827', display: 'block', marginBottom: '24px' }}>
          Курорт<span style={{ color: '#059669' }}>рум</span>
        </a>
        <h1 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '6px' }}>Вход</h1>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>Личный кабинет владельца</p>
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px', fontSize: '14px', color: '#dc2626', marginBottom: '16px' }}>
            {error}
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px', fontSize: '14px' }}
          />
          <input
            placeholder="Пароль"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px', fontSize: '14px' }}
          />
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{ background: '#059669', color: 'white', border: 'none', padding: '13px', borderRadius: '10px', fontSize: '15px', fontWeight: 500, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Входим...' : 'Войти'}
          </button>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#6b7280' }}>
          Нет аккаунта?{' '}
          <a href="/auth/register" style={{ color: '#059669', textDecoration: 'none' }}>Зарегистрироваться</a>
        </div>
      </div>
    </main>
  )
}