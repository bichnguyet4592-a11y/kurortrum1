'use client'
import { useEffect, useState } from 'react'
import { supabase, Property } from '../../lib/supabase'

const CITIES = ['Все города', 'Кисловодск', 'Пятигорск', 'Ессентуки', 'Железноводск']
const AMENITIES = ['Wi-Fi', 'Парковка', 'Кондиционер', 'Кухня', 'Можно с животными', 'Трансфер']

export default function CatalogPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [city, setCity] = useState('Все города')
  const [maxPrice, setMaxPrice] = useState(10000)
  const [guests, setGuests] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProperties()
  }, [city, maxPrice, guests])

  async function loadProperties() {
    setLoading(true)
    let query = supabase
      .from('properties')
      .select('*, property_images(url)')
      .eq('is_active', true)
      .lte('price_per_night', maxPrice)
      .gte('guests', guests)

    if (city !== 'Все города') {
      query = query.eq('city', city)
    }

    const { data } = await query
    setProperties(data || [])
    setLoading(false)
  }

  return (
    <main style={{ fontFamily: 'sans-serif', background: '#f9fafb', minHeight: '100vh' }}>
      {/* Навигация */}
      <nav style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ fontSize: '20px', fontWeight: 600, textDecoration: 'none', color: '#111827' }}>
          Курорт<span style={{ color: '#059669' }}>рум</span>
        </a>
        <a href="/for-owners" style={{ background: '#059669', color: 'white', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px' }}>
          Разместить объект
        </a>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '24px' }}>Жильё на КМВ</h1>

        {/* Фильтры */}
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Город</div>
            <select
              value={city}
              onChange={e => setCity(e.target.value)}
              style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px 12px', fontSize: '14px' }}
            >
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Цена до: {maxPrice} ₽</div>
            <input
              type="range" min={500} max={10000} step={500}
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              style={{ width: '160px' }}
            />
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Гостей</div>
            <input
              type="number" min={1} max={20}
              value={guests}
              onChange={e => setGuests(Number(e.target.value))}
              style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px 12px', fontSize: '14px', width: '80px' }}
            />
          </div>
        </div>

        {/* Список объектов */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>Загружаем...</div>
        ) : properties.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>🏠</div>
            <div style={{ fontSize: '18px', fontWeight: 500, marginBottom: '8px' }}>Объектов пока нет</div>
            <div style={{ fontSize: '14px' }}>Попробуй изменить фильтры</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {properties.map(p => (
              <a key={p.id} href={`/property/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', transition: 'box-shadow 0.2s' }}>
                  <div style={{ height: '180px', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>
                    {p.property_images?.[0]?.url
                      ? <img src={p.property_images[0].url} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : '🏠'}
                  </div>
                  <div style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 500, fontSize: '15px', marginBottom: '4px' }}>{p.title}</div>
                    <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>📍 {p.city} · {p.rooms} комн. · {p.guests} гостей</div>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: '#059669' }}>
                      {p.price_per_night.toLocaleString()} ₽ <span style={{ fontSize: '13px', fontWeight: 400, color: '#6b7280' }}>/ ночь</span>
                    </div>
                    {p.amenities?.length > 0 && (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
                        {p.amenities.slice(0, 3).map(a => (
                          <span key={a} style={{ background: '#f3f4f6', padding: '2px 8px', borderRadius: '999px', fontSize: '11px', color: '#374151' }}>{a}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}