'use client'
import { useState } from 'react'

export default function QuickSelect() {
  const [open, setOpen] = useState(false)
  const [phone, setPhone] = useState('')
  const [wish, setWish] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [success, setSuccess] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [agreeError, setAgreeError] = useState(false)

  function submit() {
    if (!phone || phone.length < 5) { setPhoneError(true); return }
    if (!agreed) { setAgreeError(true); return }
    setSuccess(true)
    setTimeout(() => {
      setOpen(false)
      setSuccess(false)
      setPhone('')
      setWish('')
      setAgreed(false)
      setPhoneError(false)
      setAgreeError(false)
    }, 3000)
  }

  return (
    <>
      <style>{`
        .quick-btn {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 999;
          background: linear-gradient(135deg, #0F4C5C 0%, #12A387 100%);
          color: white;
          border: none;
          padding: 14px 22px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 4px 24px rgba(18,163,135,0.45);
          transition: all 0.2s;
          font-family: inherit;
          white-space: nowrap;
        }
        .quick-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(18,163,135,0.55); }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.55);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .modal-box {
          background: white;
          border-radius: 20px;
          padding: 36px;
          max-width: 500px;
          width: 100%;
          position: relative;
        }
        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: #f3f4f6;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 20px;
          cursor: pointer;
          color: #6b7280;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-close:hover { background: #e5e7eb; }
        .modal-input {
          width: 100%;
          border: 1.5px solid #e5e7eb;
          border-radius: 12px;
          padding: 13px 16px;
          font-size: 15px;
          margin-bottom: 18px;
          outline: none;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .modal-input:focus { border-color: #2BAE8E; }
        .modal-input.error { border-color: #ef4444; }
        .modal-textarea {
          width: 100%;
          border: 1.5px solid #e5e7eb;
          border-radius: 12px;
          padding: 13px 16px;
          font-size: 14px;
          height: 110px;
          resize: none;
          margin-bottom: 18px;
          outline: none;
          box-sizing: border-box;
          font-family: inherit;
          line-height: 1.5;
          transition: border-color 0.2s;
        }
        .modal-textarea:focus { border-color: #2BAE8E; }
        .modal-submit {
          width: 100%;
          background: linear-gradient(135deg, #0F4C5C 0%, #12A387 100%);
          color: white;
          border: none;
          padding: 15px;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s;
          box-shadow: 0 4px 15px rgba(18,163,135,0.35);
        }
        .modal-submit:hover { box-shadow: 0 6px 20px rgba(18,163,135,0.45); transform: translateY(-1px); }
        @media (max-width: 768px) {
          .quick-btn { bottom: 20px; right: 16px; padding: 12px 18px; font-size: 14px; }
          .modal-box { padding: 28px 20px; border-radius: 16px; }
        }
      `}</style>

      <button className="quick-btn" onClick={() => setOpen(true)}>
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 011 2.22 2 2 0 012.96 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6z"/>
        </svg>
        Быстрый подбор жилья
      </button>

      {open && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}>
          <div className="modal-box">
            <button className="modal-close" onClick={() => setOpen(false)}>×</button>

            {success ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#0F4C5C', margin: '0 0 8px' }}>Заявка принята!</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: 1.6 }}>Мы свяжемся с вами в ближайшее время и подберём подходящие варианты.</p>
              </div>
            ) : (
              <>
                <p style={{ fontSize: '12px', color: '#2BAE8E', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px' }}>Бесплатный подбор жилья</p>
                <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#0F4C5C', margin: '0 0 8px', letterSpacing: '-0.02em' }}>Заявка на подбор</h2>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 24px', lineHeight: 1.6 }}>Оставьте телефон, а если хотите — коротко напишите, что для вас важно.</p>

                <label style={{ fontSize: '14px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '8px' }}>Введите ваш телефон</label>
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  className={`modal-input${phoneError ? ' error' : ''}`}
                  value={phone}
                  onChange={e => { setPhone(e.target.value); setPhoneError(false) }}
                />
                {phoneError && <p style={{ color: '#ef4444', fontSize: '13px', margin: '-12px 0 16px' }}>Введите телефон полностью</p>}

                <label style={{ fontSize: '14px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '8px' }}>
                  Пожелания <span style={{ fontWeight: 400, color: '#9ca3af' }}>(необязательно)</span>
                </label>
                <textarea
                  placeholder="Например: рядом с парком, с парковкой, до 5000 ₽, на ближайшие даты"
                  className="modal-textarea"
                  value={wish}
                  onChange={e => setWish(e.target.value)}
                />

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '24px' }}>
                  <input
                    type="checkbox"
                    id="modalAgree"
                    checked={agreed}
                    onChange={e => { setAgreed(e.target.checked); setAgreeError(false) }}
                    style={{ marginTop: '2px', flexShrink: 0, width: '16px', height: '16px', accentColor: '#2BAE8E', outline: agreeError ? '2px solid #ef4444' : 'none' }}
                  />
                  <label htmlFor="modalAgree" style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.5 }}>
                    Я даю согласие на обработку персональных данных
                  </label>
                </div>
                {agreeError && <p style={{ color: '#ef4444', fontSize: '13px', margin: '-18px 0 16px' }}>Нужно дать согласие на обработку данных</p>}

                <button className="modal-submit" onClick={submit}>Получить варианты жилья</button>
                <p style={{ textAlign: 'center', fontSize: '13px', color: '#9ca3af', margin: '12px 0 0' }}>Уточним детали уже в сообщении или звонке</p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
