'use client'
import { useState } from 'react'

const HERO_IMAGE = '/hero.jpg.webp'

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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

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
          background: linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 100%);
          padding: 20px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .hero-section {
          position: relative;
          min-height: 580px;
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
            rgba(0,0,0,0.30) 0%,
            rgba(0,0,0,0.55) 50%,
            rgba(0,0,0,0.65) 100%
          );
        }

        .hero-content {
          position: relative;
          z-index: 2;
          padding: 100px 24px 60px;
          max-width: 720px;
          margin: 0 auto;
        }

        .hero-eyebrow {
          display: inline-block;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.25);
          color: white;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 20px;
        }

        .hero-title {
          font-size: 48px;
          font-weight: 700;
          color: white;
          line-height: 1.15;
          margin: 0 0 12px;
          text-shadow: 0 2px 20px rgba(0,0,0,0.3);
          letter-spacing: -0.02em;
        }

        .hero-subtitle {
          font-size: 17px;
          color: rgba(255,255,255,0.80);
          margin: 0 0 36px;
          font-weight: 400;
        }

        .search-panel {
          background: white;
          border-radius: 16px;
          padding: 8px 8px 8px 16px;
          display: flex;
          gap: 8px;
          align-items: center;
          max-width: 580px;
          margin: 0 auto;
          box-shadow: 0 20px 60px rgba(0,0,0,0.25);
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
          background: #059669;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s, transform 0.1s;
          font-family: inherit;
        }
        .search-btn:hover { background: #047857; transform: translateY(-1px); }
        .search-btn:active { transform: translateY(0); }

        .hero-stats {
          display: flex;
          gap: 32px;
          justify-content: center;
          margin-top: 28px;
        }

        .hero-stat {
          color: rgba(255,255,255,0.75);
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .hero-stat-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #34d399;
          flex-shrink: 0;
        }

        .section-title {
          font-size: 26px;
          font-weight: 700;
          color: #111827;
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
          background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.05) 60%);
        }

        .city-card-label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px 16px 16px;
          color: white;
        }

        .city-card-name {
          font-size: 18px;
          font-weight: 700;
          display: block;
          letter-spacing: -0.01em;
        }

        .city-card-hint {
          font-size: 12px;
          color: rgba(255,255,255,0.70);
          margin-top: 2px;
          display: block;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .feature-card {
          background: white;
          border-radius: 16px;
          padding: 28px 24px;
          border: 1px solid #f0f0f0;
          transition: box-shadow 0.2s;
        }
        .feature-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.08); }

        .feature-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: #ecfdf5;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .feature-title {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 6px;
        }

        .feature-desc {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.5;
          margin: 0;
        }

        .owner-section {
          border-radius: 24px;
          background: linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%);
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
          background: rgba(255,255,255,0.04);
        }

        .owner-section::after {
          content: '';
          position: absolute;
          bottom: -60px; left: -60px;
          width: 220px; height: 220px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
        }

        .owner-badge {
          display: inline-block;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          color: #6ee7b7;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 100px;
          margin-bottom: 20px;
        }

        .owner-title {
          font-size: 32px;
          font-weight: 700;
          color: white;
          margin: 0 0 12px;
          letter-spacing: -0.02em;
        }

        .owner-subtitle {
          color: rgba(255,255,255,0.65);
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
          color: rgba(255,255,255,0.80);
          font-size: 14px;
        }

        .perk-check {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: rgba(52,211,153,0.2);
          border: 1px solid #34d399;
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
          border: 1.5px solid rgba(255,255,255,0.4);
          padding: 13px 28px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 500;
          font-size: 15px;
          transition: all 0.2s;
        }
        .btn-outline-white:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.7); }

        .btn-white {
          background: white;
          color: #065f46;
          padding: 13px 28px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 700;
          font-size: 15px;
          transition: all 0.2s;
        }
        .btn-white:hover { background: #f0fdf4; transform: translateY(-1px); }

        @media (max-width: 768px) {
          .nav-transparent { padding: 16px 20px; }
          .nav-desktop-links { display: none !important; }
          .hero-title { font-size: 30px !important; }
          .hero-subtitle { font-size: 15px !important; }
          .hero-content { padding: 90px 20px 50px; }
          .search-panel { flex-direction: column; padding: 12px; gap: 8px; }
          .search-select { width: 100%; border-bottom: 1px solid #f0f0f0; padding-bottom: 12px; }
          .search-divider { display: none; }
          .search-btn { width: 100%; text-align: center; padding: 13px; }
          .hero-stats { gap: 16px; flex-wrap: wrap; }
          .cities-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .section-pad { padding: 40px 20px !important; }
          .owner-section { padding: 40px 20px; border-radius: 16px; }
          .owner-title { font-size: 24px; }
          .owner-btns { flex-direction: column; align-items: stretch; }
          .btn-white, .btn-outline-white { text-align: center; }
          .owner-perks { gap: 12px; }
          .section-title { font-size: 22px; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav-transparent">
        <a href="/" style={{ fontSize: '20px', fontWeight: 700, textDecoration: 'none', color: 'white', letterSpacing: '-0.02em' }}>
          Курорт<span style={{ color: '#34d399' }}>рум</span>
        </a>
        <div className="nav-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <a href="/catalog" className="nav-link">Жильё</a>
          <a href="/for-owners" className="nav-link">Владельцам</a>
          <a href="/auth/register" style={{
            background: 'white',
            color: '#065f46',
            padding: '9px 20px',
            borderRadius: '10px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 600,
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
          <span className="hero-eyebrow">Кавказские Минеральные Воды</span>
          <h1 className="hero-title">
            Жильё для отдыха<br />на КМВ
          </h1>
          <p className="hero-subtitle">
            Квартиры, дома и апартаменты в Кисловодске, Пятигорске,<br />Ессентуках и Железноводске — напрямую от хозяев
          </p>

          <div className="search-panel">
            <select
              className="search-select"
              value={city}
              onChange={e => setCity(e.target.value)}
            >
              <option value="">Все города</option>
              <option>Кисловодск</option>
              <option>Пятигорск</option>
              <option>Ессентуки</option>
              <option>Железноводск</option>
            </select>
            <div className="search-divider" />
            <select
              className="search-select"
              value={type}
              onChange={e => setType(e.target.value)}
            >
              <option value="">Любой тип</option>
              <option>Квартира</option>
              <option>Дом</option>
              <option>Апартаменты</option>
            </select>
            <button className="search-btn" onClick={handleSearch}>
              Найти жильё
            </button>
          </div>

          <div className="hero-stats">
            <span className="hero-stat"><span className="hero-stat-dot" />Без комиссии</span>
            <span className="hero-stat"><span className="hero-stat-dot" />Прямой контакт</span>
            <span className="hero-stat"><span className="hero-stat-dot" />Только КМВ</span>
          </div>
        </div>
      </section>

      {/* ГОРОДА */}
      <section className="section-pad" style={{ padding: '56px 40px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 className="section-title">Выберите город</h2>
        <p className="section-subtitle">4 курортных города Кавказских Минеральных Вод</p>
        <div className="cities-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {[
            { name: 'Кисловодск', hint: 'Курортный парк · Колоннада', img: '/kislovodsk.jpg.webp' },
            { name: 'Пятигорск', hint: 'Машук · Орёл', img: '/pyatigorsk.jpg.jpg' },
            { name: 'Ессентуки', hint: 'Грязелечебница · Парк', img: '/essentuki.jpg.jpg' },
            { name: 'Железноводск', hint: 'Галерея · Парк', img: '/zheleznovodsk.jpg.jpg' },
          ].map(city => (
            <a key={city.name} href={`/catalog?city=${city.name}`} className="city-card">
              <img src={city.img} alt={city.name} className="city-card-img" loading="lazy" />
              <div className="city-card-overlay" />
              <div className="city-card-label">
                <span className="city-card-name">{city.name}</span>
                <span className="city-card-hint">{city.hint}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ПРЕИМУЩЕСТВА */}
      <section className="section-pad" style={{ padding: '0 40px 56px', maxWidth: '1100px', margin: '0 auto' }}>
        <div className="features-grid">
          {[
            {
              title: 'Только КМВ',
              desc: 'Никаких посторонних городов — только Кисловодск, Пятигорск, Ессентуки и Железноводск.',
              icon: (
                <svg width="22" height="22" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
              )
            },
            {
              title: 'Прямая связь с владельцем',
              desc: 'Никаких посредников. Вы общаетесь напрямую с хозяином и договариваетесь об условиях.',
              icon: (
                <svg width="22" height="22" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 011 2.22 2 2 0 012.96 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              )
            },
            {
              title: 'Для туристов бесплатно',
              desc: 'Поиск и просмотр объявлений полностью бесплатны. Платит только владелец за размещение.',
              icon: (
                <svg width="22" height="22" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              )
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
                    <path d="M2 5l2.5 2.5L8 3" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                {perk}
              </div>
            ))}
          </div>
          <div className="owner-btns">
            <a href="/for-owners" className="btn-outline-white">Узнать подробнее</a>
            <a href="/auth/register" className="btn-white">Разместить объект →</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #e9e9e9', padding: '28px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', background: 'white' }}>
        <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>
          Курорт<span style={{ color: '#059669' }}>рум</span>
        </span>
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
