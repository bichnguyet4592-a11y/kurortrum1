'use client'
import { useEffect, useState } from 'react'

const CITIES = ['Все города', 'Кисловодск', 'Пятигорск', 'Ессентуки', 'Железноводск']
const SUPA_URL = 'https://okaibdzoeteccckmgyvy.supabase.co'
const SUPA_KEY = 'sb_publishable_JjjwbGDtHqQs4f1cygvYAA_csqm9wxt'
const YANDEX_KEY = '889183a7-1d4c-49c5-81c0-228c39534bf4'

const CITY_COORDS: Record<string, [number, number]> = {
  'Кисловодск': [43.9057, 42.7186],
  'Пятигорск': [44.0397, 43.0597],
  'Ессентуки': [44.0468, 42.8605],
  'Железноводск': [44.1296, 43.0340],
}

const LOGO_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" height="52" viewBox="0 0 720 670" style={{ flexShrink: 0 }}>
    <path d="M 65.67 363.68 C62.99,365.88 62.07,366.00 47.42,366.00 C38.94,366.00 32.00,365.62 32.00,365.15 C32.00,364.69 58.52,344.40 90.94,320.06 L 149.88 275.82 L 163.19 285.43 C170.51,290.71 177.18,294.85 178.00,294.64 C178.82,294.42 191.43,285.30 206.00,274.36 C238.62,249.88 256.50,237.00 257.88,237.00 C258.46,237.00 263.79,240.52 269.72,244.83 C275.65,249.13 286.19,256.78 293.14,261.83 C300.09,266.87 306.10,271.00 306.50,271.00 C306.90,271.00 314.94,265.28 324.36,258.29 C367.65,226.17 408.45,196.96 409.47,197.35 C410.09,197.59 420.25,204.88 432.05,213.56 C457.90,232.58 526.92,282.81 536.00,289.22 L 542.50 293.80 L 554.44 285.40 C561.01,280.78 566.92,277.00 567.57,277.00 C568.21,277.00 574.31,281.21 581.12,286.36 C587.93,291.50 614.09,311.06 639.25,329.83 C664.41,348.59 685.00,364.18 685.00,364.47 C685.00,364.76 677.87,365.00 669.15,365.00 L 653.31 365.00 L 640.90 356.18 C634.08,351.33 619.05,340.66 607.50,332.47 C595.95,324.28 582.31,314.50 577.18,310.73 L 567.86 303.88 L 560.68 308.38 C556.73,310.85 552.70,313.47 551.72,314.19 C550.10,315.39 551.57,317.13 567.78,333.26 C577.60,343.02 585.19,351.00 584.65,351.00 C584.11,351.00 579.13,348.60 573.59,345.66 C553.28,334.90 524.59,315.77 432.82,251.81 C420.34,243.11 409.60,236.00 408.96,236.00 C408.31,236.00 405.02,238.18 401.64,240.85 C398.26,243.52 384.70,253.79 371.50,263.67 C320.10,302.15 276.00,332.48 276.00,329.34 C276.00,328.87 280.26,322.98 285.47,316.24 C290.68,309.51 294.67,304.00 294.33,304.00 C293.47,304.00 255.70,323.99 231.00,337.52 C219.73,343.70 203.17,352.63 194.22,357.37 L 177.94 366.00 L 168.97 366.00 C164.04,366.00 160.00,365.60 160.00,365.12 C160.00,364.24 181.16,349.29 194.50,340.75 C198.35,338.29 217.02,327.14 236.00,315.97 C274.79,293.15 292.42,281.98 291.27,280.94 C290.85,280.56 283.40,275.68 274.73,270.10 L 258.96 259.96 L 230.23 279.80 C214.43,290.71 199.30,301.14 196.61,302.97 L 191.72 306.29 L 198.02 311.94 L 204.32 317.60 L 193.85 321.95 L 186.88 318.00 L 179.90 314.05 L 168.20 320.73 C156.82,327.23 142.02,333.95 139.01,333.98 C138.20,333.99 143.13,328.39 149.97,321.53 C156.81,314.68 162.20,308.90 161.95,308.70 C159.64,306.79 151.93,302.00 151.17,302.00 C150.64,302.00 143.52,306.87 135.35,312.83 C127.18,318.78 108.80,332.14 94.50,342.51 C80.20,352.88 67.23,362.41 65.67,363.68 ZM 404.00 292.00 L 404.00 315.00 L 381.00 315.00 L 381.00 292.00 ZM 437.00 292.00 L 437.00 315.00 L 414.00 315.00 L 414.00 292.00 ZM 437.00 325.00 L 437.00 348.00 L 414.00 348.00 L 414.00 325.00 ZM 404.00 325.00 L 404.00 348.00 L 393.17 348.00 C387.21,348.00 382.03,347.70 381.67,347.33 C381.30,346.97 381.00,341.79 381.00,335.83 L 381.00 325.00 Z" fill="#0F4C5C"/>
    <path d="M 32 420 Q 180 480 360 450 Q 540 420 690 460" stroke="#2BAE8E" strokeWidth="28" fill="none" strokeLinecap="round"/>
  </svg>
)

export default function CatalogPage() {
  const [properties, setProperties] = useState<any[]>([])
  const [city, setCity] = useState('Все города')
  const [maxPrice, setMaxPrice] = useState(0)
  const [minPrice, setMinPrice] = useState(0)
  const [guests, setGuests] = useState(1)
  const [beds, setBeds] = useState(0)
  const [parking, setParking] = useState(false)
  const [pets, setPets] = useState(false)
  const [loading, setLoading] = useState(true)
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list')
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const c = params.get('city')
    if (c) setCity(c)
  }, [])

  useEffect(() => { loadProperties() }, [city, maxPrice, minPrice, guests, beds, parking, pets])

  useEffect(() => {
    if (!(window as any).ymaps) {
      const script = document.createElement('script')
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_KEY}&lang=ru_RU`
      script.onload = () => {
        (window as any).ymaps.ready(() => setMapReady(true))
      }
      document.head.appendChild(script)
    } else if ((window as any).ymaps) {
      (window as any).ymaps.ready(() => setMapReady(true))
    }
  }, [])

  useEffect(() => {
    if (!mapReady || properties.length === 0) return
    const ymaps = (window as any).ymaps
    const container = document.getElementById('ymap')
    if (!container) return

    const centerCity = city !== 'Все города' ? CITY_COORDS[city] : [44.0, 42.9]
    const zoom = city !== 'Все города' ? 13 : 10

    if ((window as any)._ymap) {
      (window as any)._ymap.destroy()
    }

    const map = new ymaps.Map('ymap', {
      center: centerCity,
      zoom,
      controls: ['zoomControl'],
    })
    ;(window as any)._ymap = map

    properties.forEach(p => {
      if (!p.lat || !p.lng) return
      const isActive = activeId === p.id
      const bg = isActive ? '#2BAE8E' : '#0F4C5C'
      const price = p.price_per_night?.toLocaleString() + ' ₽'

      const MyLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="' +
          'background:' + bg + ';' +
          'color:white;' +
          'padding:8px 18px;' +
          'border-radius:100px;' +
          'font-size:13px;' +
          'font-weight:800;' +
          'white-space:nowrap;' +
          'box-shadow:0 4px 14px rgba(0,0,0,0.35);' +
          'border:2.5px solid white;' +
          'cursor:pointer;' +
          'font-family:-apple-system,BlinkMacSystemFont,sans-serif;' +
          'letter-spacing:0;' +
          'user-select:none;' +
          'min-width:80px;' +
          'text-align:center;' +
          'display:inline-block;' +
        '">' + price + '</div>'
      )

      const placemark = new ymaps.Placemark(
        [p.lat, p.lng],
        {
          balloonContentHeader: '<b style="color:#0F4C5C">' + p.title + '</b>',
          balloonContentBody: p.price_per_night?.toLocaleString() + ' ₽/ночь · ' + p.city,
          balloonContentFooter: '<a href="/property/' + p.id + '" style="color:#2BAE8E;font-weight:600;">Смотреть объект →</a>',
        },
        {
          iconLayout: MyLayout,
          iconShape: { type: 'Rectangle', coordinates: [[-70, -22], [70, 22]] },
          hideIconOnBalloonOpen: false,
        }
      )
      placemark.events.add('click', () => {
        setActiveId(p.id)
      })
      map.geoObjects.add(placemark)
    })
  }, [mapReady, properties, activeId, city])

  async function loadProperties() {
    setLoading(true)
    let url = `${SUPA_URL}/rest/v1/properties?select=*,property_images(url)&is_active=eq.true&guests=gte.${guests}`
    if (maxPrice > 0) url += `&price_per_night=lte.${maxPrice}`
    if (minPrice > 0) url += `&price_per_night=gte.${minPrice}`
    if (city !== 'Все города') url += `&city=eq.${encodeURIComponent(city)}`
    if (beds > 0) url += `&beds=gte.${beds}`
    if (parking) url += `&parking=eq.true`
    if (pets) url += `&pets=eq.true`
    const res = await fetch(url, { headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${SUPA_KEY}` } })
    const data = await res.json()
    setProperties(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  const activeFiltersCount = [city !== 'Все города', maxPrice > 0, minPrice > 0, guests > 1, beds > 0, parking, pets].filter(Boolean).length

  function resetFilters() {
    setCity('Все города'); setMaxPrice(0); setMinPrice(0); setGuests(1); setBeds(0); setParking(false); setPets(false)
  }

  return (
    <main style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: '#f8f7f4', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        .filter-select, .filter-input { width: 100%; border: 1.5px solid #e5e7eb; border-radius: 10px; padding: 9px 12px; font-size: 13px; outline: none; font-family: inherit; color: #1a1a1a; transition: border-color 0.2s; background: white; }
        .filter-select:focus, .filter-input:focus { border-color: #2BAE8E; }
        .filter-label { font-size: 11px; color: #6b7280; font-weight: 600; margin-bottom: 5px; letter-spacing: 0.06em; text-transform: uppercase; display: block; }
        .toggle-btn { display: flex; align-items: center; gap: 8px; padding: 9px 12px; border-radius: 10px; border: 1.5px solid #e5e7eb; background: white; cursor: pointer; font-family: inherit; font-size: 13px; color: #374151; transition: all 0.2s; width: 100%; }
        .toggle-btn.active { border-color: #2BAE8E; background: #e6f7f3; color: #0F4C5C; font-weight: 600; }
        .toggle-dot { width: 16px; height: 16px; border-radius: 50%; border: 2px solid #d1d5db; transition: all 0.2s; flex-shrink: 0; }
        .toggle-btn.active .toggle-dot { background: #2BAE8E; border-color: #2BAE8E; }
        .mobile-toggle { display: none; }
        @media (max-width: 900px) { .mobile-toggle { display: flex !important; } }
        .prop-card { background: white; border-radius: 12px; overflow: hidden; border: 1.5px solid #f0f0f0; transition: all 0.2s; text-decoration: none; color: inherit; display: flex; gap: 0; cursor: pointer; }
        .prop-card:hover, .prop-card.active { border-color: #2BAE8E; box-shadow: 0 4px 16px rgba(43,174,142,0.15); }
        .prop-card.active { background: #f0fdf9; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
          .catalog-layout { flex-direction: column !important; height: auto !important; }
          .map-panel { height: 400px !important; display: block !important; }
          .list-panel { width: 100% !important; max-width: 100% !important; height: auto !important; overflow: visible !important; }
          .map-panel.hidden { display: none !important; }
          .list-panel.hidden { display: none !important; }
        }
        @media (max-width: 768px) {
          .catalog-nav { padding: 0 16px !important; }
          .catalog-filters { padding: 12px 16px !important; }
          .filters-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .filters-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* NAV */}
      <nav className="catalog-nav" style={{ background: 'white', borderBottom: '1px solid #f0f0f0', padding: '0 32px', height: '72px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 8px rgba(0,0,0,0.04)', flexShrink: 0 }}>
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          {LOGO_SVG}
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#0F4C5C', letterSpacing: '-0.03em' }}>Курорт<span style={{ color: '#2BAE8E' }}>рум</span></span>
            <span style={{ fontSize: '10px', color: '#9ca3af', letterSpacing: '0.08em' }}>жильё на КМВ</span>
          </div>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="/catalog" style={{ color: '#0F4C5C', fontSize: '14px', textDecoration: 'none', fontWeight: 600 }}>Жильё</a>
          <a href="/for-owners" style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none' }}>Владельцам</a>
          <a href="/auth/register" style={{ background: 'linear-gradient(135deg, #0F4C5C 0%, #12A387 100%)', color: 'white', padding: '8px 18px', borderRadius: '10px', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>
            Разместить объект
          </a>
        </div>
      </nav>

      {/* ФИЛЬТРЫ */}
      <div className="catalog-filters" style={{ background: 'white', borderBottom: '1px solid #f0f0f0', padding: '14px 32px' }}>
        <div className="filters-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px', alignItems: 'end' }}>
          <div>
            <label className="filter-label">Город</label>
            <select className="filter-select" value={city} onChange={e => setCity(e.target.value)}>
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="filter-label">Гостей</label>
            <input type="number" min={1} max={20} value={guests} onChange={e => setGuests(Number(e.target.value))} className="filter-input" />
          </div>
          <div>
            <label className="filter-label">Спальных мест</label>
            <input type="number" min={0} max={10} value={beds || ''} onChange={e => setBeds(Number(e.target.value))} className="filter-input" placeholder="Любое" />
          </div>
          <div style={{ gridColumn: 'span 1' }}>
            <label className="filter-label">Цена ₽/ночь</label>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <input
                type="number"
                min={0}
                max={10000}
                step={100}
                value={minPrice || ''}
                onChange={e => setMinPrice(Number(e.target.value))}
                className="filter-input"
                placeholder="от"
                style={{ textAlign: 'center' }}
              />
              <span style={{ color: '#9ca3af', flexShrink: 0, fontSize: '13px' }}>—</span>
              <input
                type="number"
                min={0}
                max={50000}
                step={100}
                value={maxPrice || ''}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="filter-input"
                placeholder="до"
                style={{ textAlign: 'center' }}
              />
            </div>
          </div>
          <button className={`toggle-btn${parking ? ' active' : ''}`} onClick={() => setParking(!parking)} style={{ marginTop: '18px' }}>
            <div className="toggle-dot" />🚗 Парковка
          </button>
          <button className={`toggle-btn${pets ? ' active' : ''}`} onClick={() => setPets(!pets)} style={{ marginTop: '18px' }}>
            <div className="toggle-dot" />🐾 Животные
          </button>
        </div>
        {activeFiltersCount > 0 && (
          <button onClick={resetFilters} style={{ marginTop: '10px', background: 'none', border: 'none', color: '#2BAE8E', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', padding: 0, fontWeight: 500 }}>
            × Сбросить фильтры ({activeFiltersCount})
          </button>
        )}
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }} className="mobile-toggle">
          <button
            onClick={() => setMobileView('list')}
            style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1.5px solid', borderColor: mobileView === 'list' ? '#2BAE8E' : '#e5e7eb', background: mobileView === 'list' ? '#e6f7f3' : 'white', color: mobileView === 'list' ? '#0F4C5C' : '#6b7280', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            ☰ Список
          </button>
          <button
            onClick={() => setMobileView('map')}
            style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1.5px solid', borderColor: mobileView === 'map' ? '#2BAE8E' : '#e5e7eb', background: mobileView === 'map' ? '#e6f7f3' : 'white', color: mobileView === 'map' ? '#0F4C5C' : '#6b7280', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            🗺 Карта
          </button>
        </div>
      </div>

      {/* ОСНОВНОЙ LAYOUT */}
      <div className="catalog-layout" style={{ display: 'flex', flex: 1, overflow: 'hidden', height: 'calc(100vh - 72px - 80px)' }}>

        {/* СПИСОК */}
        <div className={`list-panel${mobileView === 'map' ? ' hidden' : ''}`} style={{ width: '420px', flexShrink: 0, overflowY: 'auto', padding: '20px 16px 20px 32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {!loading && (
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>
              Найдено: <strong style={{ color: '#0F4C5C' }}>{properties.length}</strong> объектов
            </div>
          )}

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
              <div style={{ width: '40px', height: '40px', border: '3px solid #e5e7eb', borderTopColor: '#2BAE8E', borderRadius: '50%', margin: '0 auto 12px', animation: 'spin 0.8s linear infinite' }}></div>
              Загружаем...
            </div>
          ) : properties.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🏠</div>
              <div style={{ fontWeight: 700, color: '#374151', marginBottom: '8px' }}>Ничего не найдено</div>
              <button onClick={resetFilters} style={{ background: 'linear-gradient(135deg, #0F4C5C, #12A387)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>
                Сбросить фильтры
              </button>
            </div>
          ) : properties.map(p => (
            <a
              key={p.id}
              href={`/property/${p.id}`}
              className={`prop-card${activeId === p.id ? ' active' : ''}`}
              onMouseEnter={() => setActiveId(p.id)}
              onMouseLeave={() => setActiveId(null)}
            >
              <div style={{ width: '110px', flexShrink: 0, background: '#e6f7f3', overflow: 'hidden' }}>
                {p.property_images?.[0]?.url
                  ? <img src={p.property_images[0].url} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🏠</div>}
              </div>
              <div style={{ padding: '12px 14px', flex: 1 }}>
                <div style={{ fontSize: '12px', color: '#2BAE8E', fontWeight: 600, marginBottom: '3px' }}>{p.city}</div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#0F4C5C', marginBottom: '6px', lineHeight: 1.3 }}>{p.title}</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px', display: 'flex', gap: '8px' }}>
                  <span>🛏 {p.beds || p.rooms} сп.</span>
                  <span>👥 до {p.guests}</span>
                  {p.parking && <span>🚗</span>}
                  {p.pets && <span>🐾</span>}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '18px', fontWeight: 800, color: '#0F4C5C' }}>{p.price_per_night?.toLocaleString()}</span>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}> ₽/ночь</span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#2BAE8E', fontWeight: 600 }}>→</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* КАРТА */}
        <div className={`map-panel${mobileView === 'list' ? ' hidden' : ''}`} style={{ flex: 1, position: 'relative' }}>
          <div id="ymap" style={{ width: '100%', height: '100%' }} />
          {!mapReady && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e6f7f3', flexDirection: 'column', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', border: '3px solid #a7d7ce', borderTopColor: '#2BAE8E', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>Загружаем карту...</span>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #f0f0f0', padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', flexShrink: 0 }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <img src="/logo.svg" alt="Курортрум" style={{ height: '70px', width: 'auto' }} />
        </a>
        <span style={{ fontSize: '13px', color: '#9ca3af' }}>© 2026 · Жильё на Кавказских Минеральных Водах</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="/catalog" style={{ fontSize: '13px', color: '#6b7280', textDecoration: 'none' }}>Жильё</a>
          <a href="/for-owners" style={{ fontSize: '13px', color: '#6b7280', textDecoration: 'none' }}>Владельцам</a>
        </div>
      </footer>
    </main>
  )
}
