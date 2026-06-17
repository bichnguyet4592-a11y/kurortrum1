'use client'
import { useEffect, useState } from 'react'

const CITIES = ['Все города', 'Кисловодск', 'Пятигорск', 'Ессентуки', 'Железноводск']
const SUPA_URL = 'https://okaibdzoeteccckmgyvy.supabase.co'
const SUPA_KEY = 'sb_publishable_JjjwbGDtHqQs4f1cygvYAA_csqm9wxt'

const LOGO_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" height="52" viewBox="0 0 720 670" style={{ flexShrink: 0 }}>
    <path d="M 65.67 363.68 C62.99,365.88 62.07,366.00 47.42,366.00 C38.94,366.00 32.00,365.62 32.00,365.15 C32.00,364.69 58.52,344.40 90.94,320.06 L 149.88 275.82 L 163.19 285.43 C170.51,290.71 177.18,294.85 178.00,294.64 C178.82,294.42 191.43,285.30 206.00,274.36 C238.62,249.88 256.50,237.00 257.88,237.00 C258.46,237.00 263.79,240.52 269.72,244.83 C275.65,249.13 286.19,256.78 293.14,261.83 C300.09,266.87 306.10,271.00 306.50,271.00 C306.90,271.00 314.94,265.28 324.36,258.29 C367.65,226.17 408.45,196.96 409.47,197.35 C410.09,197.59 420.25,204.88 432.05,213.56 C457.90,232.58 526.92,282.81 536.00,289.22 L 542.50 293.80 L 554.44 285.40 C561.01,280.78 566.92,277.00 567.57,277.00 C568.21,277.00 574.31,281.21 581.12,286.36 C587.93,291.50 614.09,311.06 639.25,329.83 C664.41,348.59 685.00,364.18 685.00,364.47 C685.00,364.76 677.87,365.00 669.15,365.00 L 653.31 365.00 L 640.90 356.18 C634.08,351.33 619.05,340.66 607.50,332.47 C595.95,324.28 582.31,314.50 577.18,310.73 L 567.86 303.88 L 560.68 308.38 C556.73,310.85 552.70,313.47 551.72,314.19 C550.10,315.39 551.57,317.13 567.78,333.26 C577.60,343.02 585.19,351.00 584.65,351.00 C584.11,351.00 579.13,348.60 573.59,345.66 C553.28,334.90 524.59,315.77 432.82,251.81 C420.34,243.11 409.60,236.00 408.96,236.00 C408.31,236.00 405.02,238.18 401.64,240.85 C398.26,243.52 384.70,253.79 371.50,263.67 C320.10,302.15 276.00,332.48 276.00,329.34 C276.00,328.87 280.26,322.98 285.47,316.24 C290.68,309.51 294.67,304.00 294.33,304.00 C293.47,304.00 255.70,323.99 231.00,337.52 C219.73,343.70 203.17,352.63 194.22,357.37 L 177.94 366.00 L 168.97 366.00 C164.04,366.00 160.00,365.60 160.00,365.12 C160.00,364.24 181.16,349.29 194.50,340.75 C198.35,338.29 217.02,327.14 236.00,315.97 C274.79,293.15 292.42,281.98 291.27,280.94 C290.85,280.56 283.40,275.68 274.73,270.10 L 258.96 259.96 L 230.23 279.80 C214.43,290.71 199.30,301.14 196.61,302.97 L 191.72 306.29 L 198.02 311.94 L 204.32 317.60 L 193.85 321.95 L 186.88 318.00 L 179.90 314.05 L 168.20 320.73 C156.82,327.23 142.02,333.95 139.01,333.98 C138.20,333.99 143.13,328.39 149.97,321.53 C156.81,314.68 162.20,308.90 161.95,308.70 C159.64,306.79 151.93,302.00 151.17,302.00 C150.64,302.00 143.52,306.87 135.35,312.83 C127.18,318.78 108.80,332.14 94.50,342.51 C80.20,352.88 67.23,362.41 65.67,363.68 ZM 404.00 292.00 L 404.00 315.00 L 381.00 315.00 L 381.00 292.00 ZM 437.00 292.00 L 437.00 315.00 L 414.00 315.00 L 414.00 292.00 ZM 437.00 325.00 L 437.00 348.00 L 414.00 348.00 L 414.00 325.00 ZM 404.00 325.00 L 404.00 348.00 L 393.17 348.00 C387.21,348.00 382.03,347.70 381.67,347.33 C381.30,346.97 381.00,341.79 381.00,335.83 L 381.00 325.00 Z" fill="#0F4C5C"/>
    <path d="M 32 420 Q 180 480 360 450 Q 540 420 690 460" stroke="#2BAE8E" strokeWidth="28" fill="none" strokeLinecap="round"/>
  </svg>
)

const NAV = (
  <nav style={{ background: 'white', borderBottom: '1px solid #f0f0f0', padding: '0 40px', height: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
    <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
      {LOGO_ICON}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
        <span style={{ fontSize: '20px', fontWeight: 800, color: '#0F4C5C', letterSpacing: '-0.03em' }}>
          Курорт<span style={{ color: '#2BAE8E' }}>рум</span>
        </span>
        <span style={{ fontSize: '10px', color: '#9ca3af', letterSpacing: '0.08em' }}>жильё на КМВ</span>
      </div>
    </a>
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <a href="/catalog" style={{ color: '#0F4C5C', fontSize: '14px', textDecoration: 'none', fontWeight: 500 }}>Жильё</a>
      <a href="/for-owners" style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none' }}>Владельцам</a>
      <a href="/auth/register" style={{ background: 'linear-gradient(135deg, #0F4C5C 0%, #12A387 100%)', color: 'white', padding: '9px 20px', borderRadius: '10px', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
        Разместить объект
      </a>
    </div>
  </nav>
)

const FOOTER = (
  <footer style={{ borderTop: '1px solid #f0f0f0', padding: '28px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', background: 'white', marginTop: '40px' }}>
    <a href="/" style={{ textDecoration: 'none' }}>
      <img src="/logo.svg" alt="Курортрум" style={{ height: '70px', width: 'auto' }} />
    </a>
    <span style={{ fontSize: '13px', color: '#9ca3af' }}>© 2026 · Жильё на Кавказских Минеральных Водах</span>
    <div style={{ display: 'flex', gap: '20px' }}>
      <a href="/catalog" style={{ fontSize: '13px', color: '#6b7280', textDecoration: 'none' }}>Жильё</a>
      <a href="/for-owners" style={{ fontSize: '13px', color: '#6b7280', textDecoration: 'none' }}>Владельцам</a>
    </div>
  </footer>
)

export default function CatalogPage() {
  const [properties, setProperties] = useState<any[]>([])
  const [city, setCity] = useState('Все города')
  const [maxPrice, setMaxPrice] = useState(10000)
  const [guests, setGuests] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadProperties() }, [city, maxPrice, guests])

  async function loadProperties() {
    setLoading(true)
    let url = `${SUPA_URL}/rest/v1/properties?select=*,property_images(url)&is_active=eq.true&price_per_night=lte.${maxPrice}&guests=gte.${guests}`
    if (city !== 'Все города') url += `&city=eq.${encodeURIComponent(city)}`
    const res = await fetch(url, { headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${SUPA_KEY}` } })
    const data = await res.json()
    setProperties(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  return (
    <main style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: '#f8f7f4', minHeight: '100vh' }}>
      <style>{`
        @media (max-width: 768px) {
          .catalog-grid { grid-template-columns: 1fr !important; }
          .filters-row { flex-direction: column !important; }
          .catalog-nav { padding: 0 20px !important; }
          .catalog-pad { padding: 20px !important; }
        }
        .prop-card { background: white; border-radius: 16px; overflow: hidden; border: 1px solid #f0f0f0; transition: transform 0.2s, box-shadow 0.2s; text-decoration: none; color: inherit; display: block; }
        .prop-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.10); }
        .prop-img { width: 100%; height: 200px; object-fit: cover; display: block; }
        .filter-select { width: 100%; border: 1.5px solid #e5e7eb; border-radius: 10px; padding: 10px 12px; font-size: 14px; outline: none; font-family: inherit; color: #1a1a1a; transition: border-color 0.2s; }
        .filter-select:focus { border-color: #2BAE8E; }
        .filter-input { width: 100%; border: 1.5px solid #e5e7eb; border-radius: 10px; padding: 10px 12px; font-size: 14px; outline: none; font-family: inherit; transition: border-color 0.2s; }
        .filter-input:focus { border-color: #2BAE8E; }
        input[type=range] { accent-color: #2BAE8E; }
      `}</style>

      {NAV}

      <div className="catalog-pad" style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>

        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0F4C5C', margin: '0 0 6px', letterSpacing: '-0.02em' }}>Жильё на КМВ</h1>
          <p style={{ fontSize: '15px', color: '#6b7280', margin: 0 }}>Квартиры, дома и апартаменты напрямую от хозяев</p>
        </div>

        <div className="filters-row" style={{ background: 'white', border: '1px solid #f0f0f0', borderRadius: '16px', padding: '20px 24px', marginBottom: '28px', display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-end', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ flex: 1, minWidth: '140px' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 500, marginBottom: '6px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Город</div>
            <select className="filter-select" value={city} onChange={e => setCity(e.target.value)}>
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ flex: 2, minWidth: '200px' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 500, marginBottom: '6px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Цена до: <span style={{ color: '#0F4C5C', fontWeight: 700 }}>{maxPrice.toLocaleString()} ₽</span>
            </div>
            <input type="range" min={500} max={10000} step={500} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} style={{ width: '100%' }} />
          </div>
          <div style={{ minWidth: '100px' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 500, marginBottom: '6px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Гостей</div>
            <input type="number" min={1} max={20} value={guests} onChange={e => setGuests(Number(e.target.value))} className="filter-input" />
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: '#9ca3af' }}>
            <div style={{ width: '48px', height: '48px', border: '3px solid #e5e7eb', borderTopColor: '#2BAE8E', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }}></div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <div style={{ fontSize: '15px' }}>Загружаем объекты...</div>
          </div>
        ) : properties.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', color: '#9ca3af' }}>
            <div style={{ width: '72px', height: '72px', background: '#e6f7f3', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '32px' }}>🏠</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>Объектов пока нет</div>
            <div style={{ fontSize: '14px' }}>Попробуйте изменить фильтры</div>
          </div>
        ) : (
          <>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px' }}>
              Найдено: <strong style={{ color: '#0F4C5C' }}>{properties.length}</strong> объектов
            </div>
            <div className="catalog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {properties.map(p => (
                <a key={p.id} href={`/property/${p.id}`} className="prop-card">
                  <div style={{ height: '200px', background: '#e6f7f3', overflow: 'hidden', position: 'relative' }}>
                    {p.property_images?.[0]?.url
                      ? <img src={p.property_images[0].url} alt={p.title} className="prop-img" />
                      : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>🏠</div>}
                    <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'white', borderRadius: '8px', padding: '4px 10px', fontSize: '13px', fontWeight: 700, color: '#0F4C5C' }}>
                      {p.city}
                    </div>
                  </div>
                  <div style={{ padding: '16px 20px 20px' }}>
                    <div style={{ fontWeight: 700, fontSize: '16px', color: '#0F4C5C', marginBottom: '6px', lineHeight: 1.3 }}>{p.title}</div>
                    <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
                      {p.rooms} комн. · {p.guests} гостей
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                      <div>
                        <span style={{ fontSize: '22px', fontWeight: 800, color: '#0F4C5C' }}>{p.price_per_night?.toLocaleString()}</span>
                        <span style={{ fontSize: '13px', color: '#6b7280' }}> ₽/ночь</span>
                      </div>
                      <span style={{ fontSize: '13px', color: '#2BAE8E', fontWeight: 600 }}>Подробнее →</span>
                    </div>
                    {p.amenities?.length > 0 && (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px' }}>
                        {p.amenities.slice(0, 3).map((a: string) => (
                          <span key={a} style={{ background: '#e6f7f3', padding: '3px 10px', borderRadius: '100px', fontSize: '11px', color: '#0F4C5C', fontWeight: 500 }}>{a}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </div>

      {FOOTER}
    </main>
  )
}
