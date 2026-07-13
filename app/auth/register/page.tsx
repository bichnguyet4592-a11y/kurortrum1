'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  'https://okaibdzoeteccckmgyvy.supabase.co',
  'sb_publishable_JjjwbGDtHqQs4f1cygvYAA_csqm9wxt'
)

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleRegister() {
    if (!name || !email || !password) {
      setError('Заполните все поля')
      return
    }
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, phone } }
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
    setLoading(false)
  }

  if (success) return (
    <main style={{ fontFamily: 'sans-serif', minHeight: '100vh', background: '#f8f7f4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '40px', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Почти готово!</h2>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>
          Мы отправили письмо на {email}. Подтвердите почту и войдите в личный кабинет.
        </p>
        <a href="/auth/login" style={{ background: '#2BAE8E', color: 'white', padding: '12px 24px', borderRadius: '10px', textDecoration: 'none', fontSize: '15px' }}>
          Войти
        </a>
      </div>
    </main>
  )

  return (
    <main style={{ fontFamily: 'sans-serif', minHeight: '100vh', background: '#f8f7f4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '40px', maxWidth: '400px', width: '100%' }}>
        <a href="/" style={{ fontSize: '20px', fontWeight: 600, textDecoration: 'none', color: '#1a1a1a', display: 'block', marginBottom: '24px' }}>
          Курорт<span style={{ color: '#2BAE8E' }}>рум</span>
        </a>
        <h1 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '6px' }}>Регистрация владельца</h1>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>7 дней бесплатно · Без комиссии</p>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px', fontSize: '14px', color: '#dc2626', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            placeholder="Ваше имя"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px', fontSize: '14px' }}
          />
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px', fontSize: '14px' }}
          />
          <input
            placeholder="Телефон"
            value={phone}
            onChange={e => setPhone(e.target.value)}
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
            onClick={handleRegister}
            disabled={loading}
            style={{ background: '#2BAE8E', color: 'white', border: 'none', padding: '13px', borderRadius: '10px', fontSize: '15px', fontWeight: 500, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Регистрируем...' : 'Зарегистрироваться'}
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#6b7280' }}>
          Уже есть аккаунт?{' '}
          <a href="/auth/login" style={{ color: '#2BAE8E', textDecoration: 'none' }}>Войти</a>
        </div>
      </div>
    </main>
  )
}
