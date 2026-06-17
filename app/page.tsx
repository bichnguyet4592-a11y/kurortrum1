'use client'
import { useState } from 'react'

export default function HomePage() {
  const [city, setCity] = useState('')
  const [type, setType] = useState('')

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (city) params.set('city', city)
    if (type) params.set('type', type)
    window.location.href = `/catalog?${params.toString()}`
  }

  return (
    <main style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: '#f8f7f4', color: '#1a1a1a', margin: 0, padding: 0 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; }

        .nav-link {
          color: rgba(255,255,255,0.85);
          font-size: 15px;
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav-link:hover { color: white; }

        .nav-transparent {
          position: absolute;
          top: 0; left: 0; right: 0;
          z-index: 10;
          background: transparent;
          padding: 0 40px;
          height: 90px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .nav-logo img {
          height: 65px;
          width: auto;
          filter: brightness(0) invert(1);
        }

        .hero-section {
          position: relative;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background-image: url('/hero.jpg.webp');
          background-size: cover;
          background-position: center 40%;
          transform: scale(1.02);
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.25) 0%,
            rgba(0,0,0,0.50) 50%,
            rgba(0,0,0,0.62) 100%
          );
        }

        .hero-content {
          position: relative;
          z-index: 2;
          padding: 110px 24px 60px;
          max-width: 760px;
          margin: 0 auto;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(43,174,142,0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(43,174,142,0.4);
          color: #7ee8d0;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 7px 16px;
          border-radius: 100px;
          margin-bottom: 24px;
        }

        .hero-title {
          font-size: 52px;
          font-weight: 800;
          color: white;
          line-height: 1.12;
          margin: 0 0 16px;
          text-shadow: 0 2px 24px rgba(0,0,0,0.25);
          letter-spacing: -0.03em;
        }

        .hero-subtitle {
          font-size: 17px;
          color: rgba(255,255,255,0.78);
          margin: 0 0 40px;
          font-weight: 400;
          line-height: 1.6;
        }

        .search-panel {
          background: white;
          border-radius: 16px;
          padding: 8px 8px 8px 16px;
          display: flex;
          gap: 8px;
          align-items: center;
          max-width: 600px;
          margin: 0 auto;
          box-shadow: 0 24px 64px rgba(0,0,0,0.28);
        }

        .search-icon {
          color: #9ca3af;
          flex-shrink: 0;
        }

        .search-select {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 15px;
          color: #1a1a1a;
          outline: none;
          padding: 8px 4px;
          cursor: pointer;
          font-family: inherit;
        }

        .search-divider {
          width: 1px;
          height: 28px;
          background: #e5e7eb;
          flex-shrink: 0;
        }

        .search-btn {
          background: linear-gradient(135deg, #0F4C5C 0%, #12A387 100%);
          color: white;
          border: none;
          padding: 13px 26px;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s;
          font-family: inherit;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 15px rgba(18,163,135,0.35);
        }
        .search-btn:hover { 
          background: linear-gradient(135deg, #0a3d4a 0%, #0E8E76 100%);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(18,163,135,0.45);
        }
        .search-btn:active { transform: translateY(0); }

        .hero-stats {
          display: flex;
          gap: 0;
          justify-content: center;
          margin-top: 28px;
          border-top: 1px solid rgba(255,255,255,0.15);
          padding-top: 24px;
        }

        .hero-stat {
          color: rgba(255,255,255,0.75);
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 24px;
          border-right: 1px solid rgba(255,255,255,0.15);
        }
        .hero-stat:last-child { border-right: none; }

        .section-title {
          font-size: 28px;
          font-weight: 700;
          color: #0F4C5C;
          margin: 0 0 8px;
          letter-spacing: -0.02em;
        }

        .section-subtitle {
          font-size: 15px;
          color: #6b7280;
          margin: 0 0 32px;
        }

        .city-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 4/3;
          text-decoration: none;
          display: block;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .city-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.18); }

        .city-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .city-card:hover .city-card-img { transform: scale(1.06); }

        .city-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.0) 100%);
          transition: background 0.3s ease;
        }
        .city-card:hover .city-card-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0.05) 100%);
        }

        .city-card-label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 24px 20px 20px;
          color: white;
        }

        .city-card-name {
          font-size: 22px;
          font-weight: 800;
          display: block;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        .city-card-hint {
          font-size: 13px;
          color: rgba(255,255,255,0.75);
          margin-top: 4px;
          display: block;
          font-weight: 500;
        }

        .city-card-btn {
          display: inline-block;
          margin-top: 12px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.35);
          color: white;
          font-size: 12px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 100px;
          backdrop-filter: blur(8px);
          transition: background 0.2s;
        }
        .city-card:hover .city-card-btn {
          background: rgba(255,255,255,0.25);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .feature-card {
          background: white;
          border-radius: 16px;
          padding: 24px 20px;
          border: 1px solid #f0f0f0;
          transition: box-shadow 0.2s, transform 0.2s;
          text-align: center;
        }
        .feature-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.08); transform: translateY(-2px); }

        .feature-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: #e6f7f3;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 14px;
        }

        .feature-title {
          font-size: 15px;
          font-weight: 600;
          color: #0F4C5C;
          margin: 0 0 6px;
        }

        .feature-desc {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.5;
          margin: 0;
        }

        .owner-section {
          border-radius: 24px;
          background: linear-gradient(135deg, #0F4C5C 0%, #0a3d4a 50%, #083340 100%);
          padding: 56px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .owner-section::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: rgba(43,174,142,0.08);
        }

        .owner-section::after {
          content: '';
          position: absolute;
          bottom: -60px; left: -60px;
          width: 220px; height: 220px;
          border-radius: 50%;
          background: rgba(43,174,142,0.06);
        }

        .owner-badge {
          display: inline-block;
          background: rgba(43,174,142,0.15);
          border: 1px solid rgba(43,174,142,0.35);
          color: #7ee8d0;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 100px;
          margin-bottom: 20px;
        }

        .owner-title {
          font-size: 34px;
          font-weight: 800;
          color: white;
          margin: 0 0 12px;
          letter-spacing: -0.02em;
        }

        .owner-subtitle {
          color: rgba(255,255,255,0.50);
          font-size: 16px;
          margin: 0 0 32px;
        }

        .owner-perks {
          display: flex;
          gap: 24px;
          justify-content: center;
          margin-bottom: 36px;
          flex-wrap: wrap;
        }

        .owner-perk {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.60);
          font-size: 14px;
        }

        .perk-check {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: rgba(43,174,142,0.2);
          border: 1px solid #2BAE8E;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .owner-btns {
          display: flex;
          gap: 12px;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        .btn-outline-white {
          background: transparent;
          color: white;
          border: 1.5px solid rgba(255,255,255,0.35);
          padding: 13px 28px;
          border-radius: 14px;
          text-decoration: none;
          font-weight: 500;
          font-size: 15px;
          transition: all 0.2s;
        }
        .btn-outline-white:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.6); }

        .btn-accent {
          background: linear-gradient(135deg, #0F4C5C 0%, #12A387 100%);
          color: white;
          padding: 13px 28px;
          border-radius: 14px;
          text-decoration: none;
          font-weight: 700;
          font-size: 15px;
          transition: all 0.2s;
          box-shadow: 0 4px 15px rgba(18,163,135,0.35);
        }
        .btn-accent:hover { 
          background: linear-gradient(135deg, #0a3d4a 0%, #0E8E76 100%);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(18,163,135,0.45);
        }

        @media (max-width: 768px) {
          .nav-transparent { padding: 16px 20px; }
          .nav-desktop-links { display: none !important; }
          .nav-logo img { height: 36px; }
          .hero-title { font-size: 32px !important; }
          .hero-subtitle { font-size: 15px !important; }
          .hero-content { padding: 90px 20px 50px; }
          .search-panel { flex-direction: column; padding: 12px; gap: 8px; }
          .search-select { width: 100%; border-bottom: 1px solid #f0f0f0; padding-bottom: 12px; }
          .search-divider { display: none; }
          .search-btn { width: 100%; justify-content: center; padding: 13px; }
          .hero-stats { gap: 0; flex-wrap: wrap; padding-top: 16px; }
          .hero-stat { padding: 6px 12px; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); width: 100%; justify-content: center; }
          .cities-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .section-pad { padding: 40px 20px !important; }
          .owner-section { padding: 40px 20px; border-radius: 16px; }
          .owner-title { font-size: 26px; }
          .owner-btns { flex-direction: column; align-items: stretch; }
          .btn-accent, .btn-outline-white { text-align: center; }
          .owner-perks { gap: 12px; }
          .section-title { font-size: 22px; }
        }

        @media (max-width: 480px) {
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav-transparent">
        <a href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
          <span style={{ fontSize: '24px', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', fontFamily: 'inherit' }}>
            Курорт<span style={{ color: '#2BAE8E' }}>рум</span>
          </span>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.08em', fontFamily: 'inherit' }}>жильё на КМВ</span>
        </a>
        <div className="nav-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <a href="/catalog" className="nav-link">Жильё</a>
          <a href="/for-owners" className="nav-link">Владельцам</a>
          <a href="/auth/register" style={{
            background: 'transparent',
            color: 'white',
            padding: '9px 20px',
            borderRadius: '10px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 600,
            border: '1.5px solid rgba(255,255,255,0.7)',
            transition: 'all 0.2s',
          }}>
            Разместить объект
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-eyebrow">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
            Кавказские Минеральные Воды
          </span>
          <h1 className="hero-title">
            Посуточная аренда<br />жилья на КМВ
          </h1>
          <p className="hero-subtitle">
            Квартиры, дома и апартаменты для отдыха<br />напрямую от собственников
          </p>

          <div className="search-panel">
            <svg className="search-icon" width="18" height="18" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
            <select className="search-select" value={city} onChange={e => setCity(e.target.value)}>
              <option value="">Все города</option>
              <option>Кисловодск</option>
              <option>Пятигорск</option>
              <option>Ессентуки</option>
              <option>Железноводск</option>
            </select>
            <div className="search-divider" />
            <svg className="search-icon" width="18" height="18" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
            <select className="search-select" value={type} onChange={e => setType(e.target.value)}>
              <option value="">Тип жилья</option>
              <option>Квартира</option>
              <option>Дом</option>
              <option>Апартаменты</option>
            </select>
            <button className="search-btn" onClick={handleSearch}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              Найти жильё
            </button>
          </div>

          <div className="hero-stats">
            <span className="hero-stat">
              <svg width="14" height="14" fill="none" stroke="#2BAE8E" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Без комиссии
            </span>
            <span className="hero-stat">
              <svg width="14" height="14" fill="none" stroke="#2BAE8E" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 011 2.22 2 2 0 012.96 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6z"/></svg>
              Прямой контакт с хозяином
            </span>
            <span className="hero-stat">
              <svg width="14" height="14" fill="none" stroke="#2BAE8E" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Проверенные объявления
            </span>
          </div>
        </div>
      </section>

      {/* ГОРОДА */}
      <section className="section-pad" style={{ padding: '60px 40px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 className="section-title">Популярные города КМВ</h2>
        <p className="section-subtitle">Выберите город и найдите идеальное жильё для отдыха</p>
        <div className="cities-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {[
            { name: 'Кисловодск', hint: 'Курортный парк · Колоннада', img: '/kislovodsk.jpg.webp', price: 'от 1 500 ₽/сутки' },
            { name: 'Пятигорск', hint: 'Машук · Орёл', img: '/pyatigorsk.jpg.jpg', price: 'от 1 200 ₽/сутки' },
            { name: 'Ессентуки', hint: 'Грязелечебница · Парк', img: '/essentuki.jpg.jpg', price: 'от 1 100 ₽/сутки' },
            { name: 'Железноводск', hint: 'Галерея · Парк', img: '/zheleznovodsk.jpg.jpg', price: 'от 1 200 ₽/сутки' },
          ].map(city => (
            <a key={city.name} href={`/catalog?city=${city.name}`} className="city-card">
              <img src={city.img} alt={city.name} className="city-card-img" loading="lazy" />
              <div className="city-card-overlay" />
              <div className="city-card-label">
                <span className="city-card-name">{city.name}</span>
                <span className="city-card-hint">{city.price}</span>
                <span className="city-card-btn">Смотреть жильё</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ПРЕИМУЩЕСТВА */}
      <section className="section-pad" style={{ padding: '0 40px 60px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 className="section-title" style={{ marginBottom: '8px' }}>Почему выбирают Курортрум?</h2>
        <p className="section-subtitle">Простой и безопасный способ найти жильё на КМВ</p>
        <div className="features-grid">
          {[
            {
              title: 'Проверенные объявления',
              desc: 'Только реальные варианты от собственников',
              icon: <svg width="24" height="24" fill="none" stroke="#2BAE8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            },
            {
              title: 'Без комиссий',
              desc: 'Никаких скрытых платежей и наценок',
              icon: <svg width="24" height="24" fill="none" stroke="#2BAE8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M15 9H9m6 6H9m3-9v12"/></svg>
            },
            {
              title: 'Прямой контакт',
              desc: 'Общайтесь напрямую с хозяином жилья',
              icon: <svg width="24" height="24" fill="none" stroke="#2BAE8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 011 2.22 2 2 0 012.96 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6z"/></svg>
            },
            {
              title: 'Быстрое бронирование',
              desc: 'Удобно и безопасно для туристов',
              icon: <svg width="24" height="24" fill="none" stroke="#2BAE8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            },
          ].map(f => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <p className="feature-title">{f.title}</p>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA ВЛАДЕЛЬЦАМ */}
      <section style={{ padding: '0 40px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <div className="owner-section">
          <span className="owner-badge">Для владельцев жилья</span>
          <h2 className="owner-title">Сдаёте жильё на КМВ?</h2>
          <p className="owner-subtitle">Размещайте объявление и получайте прямые заявки от туристов</p>
          <div className="owner-perks">
            {['14 дней бесплатно', 'Без комиссии с бронирований', 'Прямые заявки от туристов', 'Простое размещение'].map(perk => (
              <div key={perk} className="owner-perk">
                <div className="perk-check">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="#2BAE8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                {perk}
              </div>
            ))}
          </div>
          <div className="owner-btns">
            <a href="/for-owners" className="btn-outline-white">Узнать подробнее</a>
            <a href="/auth/register" className="btn-accent">Разместить объект →</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #e9e9e9', padding: '28px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', background: 'white' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <img src="/logo-transparent.png" alt="Курортрум" style={{ height: '48px', width: 'auto' }} />
        </a>
        <span style={{ fontSize: '13px', color: '#9ca3af' }}>
          © 2026 · Жильё на Кавказских Минеральных Водах
        </span>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="/catalog" style={{ fontSize: '13px', color: '#6b7280', textDecoration: 'none' }}>Жильё</a>
          <a href="/for-owners" style={{ fontSize: '13px', color: '#6b7280', textDecoration: 'none' }}>Владельцам</a>
        </div>
      </footer>

    </main>
  )
}
