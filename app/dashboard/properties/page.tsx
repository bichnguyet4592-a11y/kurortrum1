'use client'
import { useState, useEffect } from 'react'

const CITIES = ['Кисловодск', 'Пятигорск', 'Ессентуки', 'Железноводск']
const AMENITIES_LIST = ['Wi-Fi', 'Кондиционер', 'Кухня', 'Стиральная машина', 'Телевизор', 'Холодильник', 'Фен', 'Утюг', 'Трансфер']
const SUPA_URL = 'https://okaibdzoeteccckmgyvy.supabase.co'
const SUPA_KEY = 'sb_publishable_JjjwbGDtHqQs4f1cygvYAA_csqm9wxt'
const YANDEX_KEY = '889183a7-1d4c-49c5-81c0-228c39534bf4'

const LOGO_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 720 670" style={{ flexShrink: 0 }}>
    <path d="M 65.67 363.68 C62.99,365.88 62.07,366.00 47.42,366.00 C38.94,366.00 32.00,365.62 32.00,365.15 C32.00,364.69 58.52,344.40 90.94,320.06 L 149.88 275.82 L 163.19 285.43 C170.51,290.71 177.18,294.85 178.00,294.64 C178.82,294.42 191.43,285.30 206.00,274.36 C238.62,249.88 256.50,237.00 257.88,237.00 C258.46,237.00 263.79,240.52 269.72,244.83 C275.65,249.13 286.19,256.78 293.14,261.83 C300.09,266.87 306.10,271.00 306.50,271.00 C306.90,271.00 314.94,265.28 324.36,258.29 C367.65,226.17 408.45,196.96 409.47,197.35 C410.09,197.59 420.25,204.88 432.05,213.56 C457.90,232.58 526.92,282.81 536.00,289.22 L 542.50 293.80 L 554.44 285.40 C561.01,280.78 566.92,277.00 567.57,277.00 C568.21,277.00 574.31,281.21 581.12,286.36 C587.93,291.50 614.09,311.06 639.25,329.83 C664.41,348.59 685.00,364.18 685.00,364.47 C685.00,364.76 677.87,365.00 669.15,365.00 L 653.31 365.00 L 640.90 356.18 C634.08,351.33 619.05,340.66 607.50,332.47 C595.95,324.28 582.31,314.50 577.18,310.73 L 567.86 303.88 L 560.68 308.38 C556.73,310.85 552.70,313.47 551.72,314.19 C550.10,315.39 551.57,317.13 567.78,333.26 C577.60,343.02 585.19,351.00 584.65,351.00 C584.11,351.00 579.13,348.60 573.59,345.66 C553.28,334.90 524.59,315.77 432.82,251.81 C420.34,243.11 409.60,236.00 408.96,236.00 C408.31,236.00 405.02,238.18 401.64,240.85 C398.26,243.52 384.70,253.79 371.50,263.67 C320.10,302.15 276.00,332.48 276.00,329.34 C276.00,328.87 280.26,322.98 285.47,316.24 C290.68,309.51 294.67,304.00 294.33,304.00 C293.47,304.00 255.70,323.99 231.00,337.52 C219.73,343.70 203.17,352.63 194.22,357.37 L 177.94 366.00 L 168.97 366.00 C164.04,366.00 160.00,365.60 160.00,365.12 C160.00,364.24 181.16,349.29 194.50,340.75 C198.35,338.29 217.02,327.14 236.00,315.97 C274.79,293.15 292.42,281.98 291.27,280.94 C290.85,280.56 283.40,275.68 274.73,270.10 L 258.96 259.96 L 230.23 279.80 C214.43,290.71 199.30,301.14 196.61,302.97 L 191.72 306.29 L 198.02 311.94 L 204.32 317.60 L 193.85 321.95 L 186.88 318.00 L 179.90 314.05 L 168.20 320.73 C156.82,327.23 142.02,333.95 139.01,333.98 C138.20,333.99 143.13,328.39 149.97,321.53 C156.81,314.68 162.20,308.90 161.95,308.70 C159.64,306.79 151.93,302.00 151.17,302.00 C150.64,302.00 143.52,306.87 135.35,312.83 C127.18,318.78 108.80,332.14 94.50,342.51 C80.20,352.88 67.23,362.41 65.67,363.68 ZM 404.00 292.00 L 404.00 315.00 L 381.00 315.00 L 381.00 292.00 ZM 437.00 292.00 L 437.00 315.00 L 414.00 315.00 L 414.00 292.00 ZM 437.00 325.00 L 437.00 348.00 L 414.00 348.00 L 414.00 325.00 ZM 404.00 325.00 L 404.00 348.00 L 393.17 348.00 C387.21,348.00 382.03,347.70 381.67,347.33 C381.30,346.97 381.00,341.79 381.00,335.83 L 381.00 325.00 Z" fill="#0F4C5C"/>
    <path d="M 32 420 Q 180 480 360 450 Q 540 420 690 460" stroke="#2BAE8E" strokeWidth="28" fill="none" strokeLinecap="round"/>
  </svg>
)

async function geocodeAddress(address: string, city: string): Promise<{lat: number, lng: number} | null> {
  try {
    const query = encodeURIComponent(`${city}, ${address}`)
    const res = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${YANDEX_KEY}&geocode=${query}&format=json&results=1`)
    const data = await res.json()
    const pos = data?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject?.Point?.pos
    if (!pos) return null
    const [lng, lat] = pos.split(' ').map(Number)
    return { lat, lng }
  } catch {
    return null
  }
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingProps, setLoadingProps] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [geocoding, setGeocoding] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [city, setCity] = useState('Кисловодск')
  const [address, setAddress] = useState('')
  const [price, setPrice] = useState('')
  const [guests, setGuests] = useState('2')
  const [rooms, setRooms] = useState('1')
  const [beds, setBeds] = useState('1')
  const [type, setType] = useState('apartment')
  const [amenities, setAmenities] = useState<string[]>([])
  const [parking, setParking] = useState(false)
  const [pets, setPets] = useState(false)
  const [phone, setPhone] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])

  useEffect(() => {
    const t = localStorage.getItem('sb_token')
    if (!t) { window.location.href = '/auth/login'; return }
    loadProperties()
  }, [])

  async function loadProperties() {
    setLoadingProps(true)
    const token = localStorage.getItem('sb_token')
    const userRes = await fetch(`${SUPA_URL}/auth/v1/user`, {
      headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${token}` }
    })
    const userData = await userRes.json()
    const res = await fetch(
      `${SUPA_URL}/rest/v1/properties?select=*,property_images(url)&owner_id=eq.${userData.id}&order=created_at.desc`,
      { headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${token}` } }
    )
    const data = await res.json()
    setProperties(Array.isArray(data) ? data : [])
    setLoadingProps(false)
  }

  function toggleAmenity(a: string) {
    setAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a])
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setImages(files)
      setPreviews(files.map(f => window.URL.createObjectURL(f)))
    }
  }

  async function handleSubmit() {
    if (!title || !city || !price || !phone) {
      setError('Заполните обязательные поля: название, цена, телефон')
      return
    }
    setLoading(true)
    setError('')

    let lat = null, lng = null
    if (address) {
      setGeocoding(true)
      const coords = await geocodeAddress(address, city)
      if (coords) { lat = coords.lat; lng = coords.lng }
      setGeocoding(false)
    }

    const token = localStorage.getItem('sb_token')
    const userRes = await fetch(`${SUPA_URL}/auth/v1/user`, {
      headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${token}` }
    })
    const userData = await userRes.json()
    const userId = userData.id

    const res = await fetch(`${SUPA_URL}/rest/v1/properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPA_KEY,
        'Authorization': `Bearer ${token}`,
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({
        owner_id: userId,
        title, description, city, address,
        price_per_night: parseInt(price),
        guests: parseInt(guests),
        rooms: parseInt(rooms),
        beds: parseInt(beds),
        type, amenities,
        parking, pets,
        lat, lng,
        phone,
        is_active: false,
      }),
    })

    if (res.ok) {
      const propData = await res.json()
      const propertyId = propData[0]?.id
      if (propertyId && images.length > 0) {
        for (const file of images) {
          const fileName = `${userId}/${Date.now()}-${file.name}`
          const uploadRes = await fetch(
            `${SUPA_URL}/storage/v1/object/property-images/${fileName}`,
            { method: 'POST', headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${token}`, 'Content-Type': file.type }, body: file }
          )
          if (uploadRes.ok) {
            const imgUrl = `${SUPA_URL}/storage/v1/object/public/property-images/${fileName}`
            await fetch(`${SUPA_URL}/rest/v1/property_images`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'apikey': SUPA_KEY, 'Authorization': `Bearer ${token}`, 'Prefer': 'return=minimal' },
              body: JSON.stringify({ property_id: propertyId, url: imgUrl }),
            })
          }
        }
      }
      setSuccess(true)
      setShowForm(false)
      resetForm()
      loadProperties()
    } else {
      const errData = await res.json()
      setError('Ошибка: ' + (errData.message || JSON.stringify(errData)))
    }
    setLoading(false)
  }

  function resetForm() {
    setTitle(''); setDescription(''); setCity('Кисловодск'); setAddress('')
    setPrice(''); setGuests('2'); setRooms('1'); setBeds('1'); setType('apartment')
    setAmenities([]); setParking(false); setPets(false); setPhone('')
    setImages([]); setPreviews([])
  }

  return (
    <main style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: '#f8f7f4', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        .field-input { width: 100%; border: 1.5px solid #e5e7eb; border-radius: 10px; padding: 11px 14px; font-size: 14px; outline: none; font-family: inherit; transition: border-color 0.2s; background: white; color: #1a1a1a; }
        .field-input:focus { border-color: #2BAE8E; }
        .field-label { font-size: 13px; font-weight: 600; color: #374151; display: block; margin-bottom: 6px; }
        .field-label span { color: #ef4444; }
        .amenity-btn { padding: 6px 14px; border-radius: 100px; font-size: 13px; cursor: pointer; border: 1.5px solid #e5e7eb; background: white; color: #374151; transition: all 0.2s; font-family: inherit; }
        .amenity-btn.on { border-color: #2BAE8E; background: #e6f7f3; color: #0F4C5C; font-weight: 600; }
        .toggle-row { display: flex; align-items: center; gap: 10px; padding: 12px 14px; border-radius: 10px; border: 1.5px solid #e5e7eb; background: white; cursor: pointer; font-family: inherit; font-size: 14px; color: #374151; transition: all 0.2s; }
        .toggle-row.on { border-color: #2BAE8E; background: #e6f7f3; color: #0F4C5C; font-weight: 600; }
        .prop-card { background: white; border-radius: 14px; border: 1px solid #f0f0f0; overflow: hidden; display: flex; gap: 0; transition: box-shadow 0.2s; }
        .prop-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
        .status-badge { display: inline-block; padding: 3px 10px; border-radius: 100px; font-size: 12px; font-weight: 600; }
        .status-pending { background: #fef3c7; color: #92400e; }
        .status-active { background: #d1fae5; color: #065f46; }
      `}</style>

      {/* NAV */}
      <nav style={{ background: 'white', borderBottom: '1px solid #f0f0f0', padding: '0 32px', height: '72px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          {LOGO_SVG}
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#0F4C5C', letterSpacing: '-0.03em' }}>Курорт<span style={{ color: '#2BAE8E' }}>рум</span></span>
            <span style={{ fontSize: '10px', color: '#9ca3af', letterSpacing: '0.08em' }}>жильё на КМВ</span>
          </div>
        </a>
        <a href="/dashboard" style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
          ← Личный кабинет
        </a>
      </nav>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '36px 24px' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0F4C5C', margin: '0 0 4px', letterSpacing: '-0.02em' }}>Мои объекты</h1>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Управляйте своими объявлениями</p>
          </div>
          <button onClick={() => { setShowForm(!showForm); setSuccess(false) }} style={{ background: 'linear-gradient(135deg, #0F4C5C 0%, #12A387 100%)', color: 'white', border: 'none', padding: '11px 22px', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 12px rgba(18,163,135,0.3)' }}>
            + Добавить объект
          </button>
        </div>

        {success && (
          <div style={{ background: '#e6f7f3', border: '1px solid #2BAE8E', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', color: '#0F4C5C', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>✅</span>
            <div>
              <div style={{ fontWeight: 700, marginBottom: '2px' }}>Объект добавлен!</div>
              <div style={{ fontSize: '13px', opacity: 0.8 }}>После проверки модератором он появится в каталоге и на карте.</div>
            </div>
          </div>
        )}

        {/* ФОРМА */}
        {showForm && (
          <div style={{ background: 'white', border: '1px solid #f0f0f0', borderRadius: '20px', padding: '28px', marginBottom: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F4C5C', margin: '0 0 24px', letterSpacing: '-0.02em' }}>Новый объект</h2>

            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '12px 16px', fontSize: '14px', color: '#dc2626', marginBottom: '20px' }}>
                {error}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

              {/* Название */}
              <div>
                <label className="field-label">Название <span>*</span></label>
                <input className="field-input" placeholder="Уютная квартира у Курортного парка" value={title} onChange={e => setTitle(e.target.value)} />
              </div>

              {/* Город + Тип */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="field-label">Город <span>*</span></label>
                  <select className="field-input" value={city} onChange={e => setCity(e.target.value)}>
                    {CITIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="field-label">Тип жилья</label>
                  <select className="field-input" value={type} onChange={e => setType(e.target.value)}>
                    <option value="apartment">Квартира</option>
                    <option value="house">Дом</option>
                    <option value="studio">Студия</option>
                    <option value="room">Комната</option>
                    <option value="cottage">Коттедж</option>
                  </select>
                </div>
              </div>

              {/* Адрес */}
              <div>
                <label className="field-label">
                  Адрес
                  <span style={{ fontWeight: 400, color: '#9ca3af', marginLeft: '6px', fontSize: '12px' }}>— по нему объект появится на карте автоматически</span>
                </label>
                <input className="field-input" placeholder="ул. Красноармейская, 23" value={address} onChange={e => setAddress(e.target.value)} />
                {geocoding && <div style={{ fontSize: '12px', color: '#2BAE8E', marginTop: '4px' }}>📍 Определяем координаты...</div>}
              </div>

              {/* Цена / Гости / Комнаты / Кровати */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="field-label">Цена ₽/ночь <span>*</span></label>
                  <input className="field-input" type="number" placeholder="2500" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div>
                  <label className="field-label">Гостей макс.</label>
                  <input className="field-input" type="number" min="1" max="20" value={guests} onChange={e => setGuests(e.target.value)} />
                </div>
                <div>
                  <label className="field-label">Комнат</label>
                  <input className="field-input" type="number" min="1" max="10" value={rooms} onChange={e => setRooms(e.target.value)} />
                </div>
                <div>
                  <label className="field-label">Спальных мест</label>
                  <input className="field-input" type="number" min="1" max="20" value={beds} onChange={e => setBeds(e.target.value)} />
                </div>
              </div>

              {/* Парковка + Животные */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button className={`toggle-row${parking ? ' on' : ''}`} onClick={() => setParking(!parking)}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: `2px solid ${parking ? '#2BAE8E' : '#d1d5db'}`, background: parking ? '#2BAE8E' : 'white', flexShrink: 0, transition: 'all 0.2s' }} />
                  🚗 Есть парковка
                </button>
                <button className={`toggle-row${pets ? ' on' : ''}`} onClick={() => setPets(!pets)}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: `2px solid ${pets ? '#2BAE8E' : '#d1d5db'}`, background: pets ? '#2BAE8E' : 'white', flexShrink: 0, transition: 'all 0.2s' }} />
                  🐾 Можно с животными
                </button>
              </div>

              {/* Удобства */}
              <div>
                <label className="field-label">Удобства</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {AMENITIES_LIST.map(a => (
                    <button key={a} className={`amenity-btn${amenities.includes(a) ? ' on' : ''}`} onClick={() => toggleAmenity(a)}>{a}</button>
                  ))}
                </div>
              </div>

              {/* Описание */}
              <div>
                <label className="field-label">Описание</label>
                <textarea className="field-input" placeholder="Расскажите об объекте, особенностях, близости к достопримечательностям..." value={description} onChange={e => setDescription(e.target.value)} rows={4} style={{ resize: 'vertical' }} />
              </div>

              {/* Телефон */}
              <div>
                <label className="field-label">Телефон для связи <span>*</span></label>
                <input className="field-input" placeholder="+7 900 000 00 00" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>

              {/* Фото */}
              <div>
                <label className="field-label">Фотографии</label>
                <div style={{ border: '2px dashed #e5e7eb', borderRadius: '12px', padding: '20px', textAlign: 'center', background: '#fafafa', cursor: 'pointer' }}
                  onClick={() => document.getElementById('fileInput')?.click()}>
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>📷</div>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Нажмите чтобы выбрать фото</div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>JPG, PNG до 10MB каждый</div>
                  <input id="fileInput" type="file" accept="image/*" multiple onChange={handleImageChange} style={{ display: 'none' }} />
                </div>
                {previews.length > 0 && (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                    {previews.map((src, i) => (
                      <img key={i} src={src} alt="" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #e5e7eb' }} />
                    ))}
                  </div>
                )}
              </div>

              {/* Кнопки */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button onClick={handleSubmit} disabled={loading} style={{ flex: 1, background: 'linear-gradient(135deg, #0F4C5C 0%, #12A387 100%)', color: 'white', border: 'none', padding: '14px', borderRadius: '12px', fontSize: '15px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, fontFamily: 'inherit', boxShadow: '0 4px 12px rgba(18,163,135,0.3)' }}>
                  {loading ? (geocoding ? '📍 Определяем адрес...' : '⏳ Сохраняем...') : '✓ Сохранить объект'}
                </button>
                <button onClick={() => { setShowForm(false); resetForm(); setError('') }} style={{ padding: '14px 20px', background: 'white', border: '1.5px solid #e5e7eb', borderRadius: '12px', fontSize: '15px', cursor: 'pointer', color: '#374151', fontFamily: 'inherit' }}>
                  Отмена
                </button>
              </div>

            </div>
          </div>
        )}

        {/* СПИСОК ОБЪЕКТОВ */}
        {loadingProps ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#9ca3af' }}>Загружаем...</div>
        ) : properties.length === 0 && !showForm ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#9ca3af', background: 'white', borderRadius: '16px', border: '1px solid #f0f0f0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏠</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>Объектов пока нет</div>
            <div style={{ fontSize: '14px' }}>Нажмите "+ Добавить объект" чтобы начать</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {properties.map(p => (
              <div key={p.id} className="prop-card">
                <div style={{ width: '100px', flexShrink: 0, background: '#e6f7f3', overflow: 'hidden' }}>
                  {p.property_images?.[0]?.url
                    ? <img src={p.property_images[0].url} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', minHeight: '90px' }}>🏠</div>}
                </div>
                <div style={{ padding: '14px 16px', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                    <div style={{ fontWeight: 700, fontSize: '15px', color: '#0F4C5C' }}>{p.title}</div>
                    <span className={`status-badge ${p.is_active ? 'status-active' : 'status-pending'}`}>
                      {p.is_active ? '✓ Активен' : '⏳ На проверке'}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#6b7280', margin: '6px 0', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <span>📍 {p.city}</span>
                    <span>🛏 {p.beds || p.rooms} сп.</span>
                    <span>👥 до {p.guests}</span>
                    {p.parking && <span>🚗</span>}
                    {p.pets && <span>🐾</span>}
                    {p.lat && <span style={{ color: '#2BAE8E' }}>📌 На карте</span>}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '16px', color: '#0F4C5C' }}>
                    {p.price_per_night?.toLocaleString()} ₽/ночь
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #f0f0f0', padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', marginTop: '40px' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <img src="/logo.svg" alt="Курортрум" style={{ height: '70px', width: 'auto' }} />
        </a>
        <span style={{ fontSize: '13px', color: '#9ca3af' }}>© 2026 · Курортрум</span>
      </footer>
    </main>
  )
}
