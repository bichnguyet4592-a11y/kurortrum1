'use client'
import { useState } from 'react'

const CITIES = ['Кисловодск', 'Пятигорск', 'Ессентуки', 'Железноводск']
const AMENITIES = ['Wi-Fi', 'Парковка', 'Кондиционер', 'Кухня', 'Можно с животными', 'Трансфер']
const SUPA_URL = 'https://okaibdzoeteccckmgyvy.supabase.co'
const SUPA_KEY = 'sb_publishable_JjjwbGDtHqQs4f1cygvYAA_csqm9wxt'

export default function PropertiesPage() {
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [city, setCity] = useState('Кисловодск')
  const [address, setAddress] = useState('')
  const [price, setPrice] = useState('')
  const [guests, setGuests] = useState('2')
  const [rooms, setRooms] = useState('1')
  const [type, setType] = useState('apartment')
  const [amenities, setAmenities] = useState<string[]>([])
  const [phone, setPhone] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])

  function toggleAmenity(a: string) {
    setAmenities(prev =>
      prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]
    )
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
      setError('Заполните обязательные поля')
      return
    }
    setLoading(true)
    setError('')
    const token = localStorage.getItem('sb_token')
    const userRes = await fetch(`${SUPA_URL}/auth/v1/user`, {
      headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${token}` },
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
        type, amenities,
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
            {
              method: 'POST',
              headers: {
                'apikey': SUPA_KEY,
                'Authorization': `Bearer ${token}`,
                'Content-Type': file.type,
              },
              body: file,
            }
          )
          if (uploadRes.ok) {
            const imgUrl = `${SUPA_URL}/storage/v1/object/public/property-images/${fileName}`
            await fetch(`${SUPA_URL}/rest/v1/property_images`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'apikey': SUPA_KEY,
                'Authorization': `Bearer ${token}`,
                'Prefer': 'return=minimal',
              },
              body: JSON.stringify({ property_id: propertyId, url: imgUrl }),
            })
          }
        }
      }
      setSuccess(true)
      setShowForm(false)
    } else {
      const errData = await res.json()
      setError('Ошибка: ' + JSON.stringify(errData))
    }
    setLoading(false)
  }
  return (
    <main style={{ fontFamily: 'sans-serif', background: '#f9fafb', minHeight: '100vh' }}>
      <nav style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ fontSize: '20px', fontWeight: 600, textDecoration: 'none', color: '#111827' }}>
          Курорт<span style={{ color: '#059669' }}>рум</span>
        </a>
        <a href="/dashboard" style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none' }}>← Личный кабинет</a>
      </nav>
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 600 }}>Мои объекты</h1>
          <button onClick={() => setShowForm(!showForm)} style={{ background: '#059669', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}>
            + Добавить объект
          </button>
        </div>
        {success && (
          <div style={{ background: '#ecfdf5', border: '1px solid #6ee7b7', borderRadius: '10px', padding: '16px', marginBottom: '24px', color: '#065f46' }}>
            ✅ Объект добавлен! После проверки модератором он появится в каталоге.
          </div>
        )}
        {showForm && (
          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>Новый объект</h2>
            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px', fontSize: '14px', color: '#dc2626', marginBottom: '16px' }}>
                {error}
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '13px', color: '#374151', display: 'block', marginBottom: '6px' }}>Название *</label>
                <input placeholder="Уютная квартира у парка" value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px 12px', fontSize: '14px' }} />
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#374151', display: 'block', marginBottom: '6px' }}>Город *</label>
                <select value={city} onChange={e => setCity(e.target.value)} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px 12px', fontSize: '14px' }}>
                  {CITIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#374151', display: 'block', marginBottom: '6px' }}>Адрес</label>
                <input placeholder="Улица, дом" value={address} onChange={e => setAddress(e.target.value)} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px 12px', fontSize: '14px' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '13px', color: '#374151', display: 'block', marginBottom: '6px' }}>Цена ₽ *</label>
                  <input type="number" placeholder="2500" value={price} onChange={e => setPrice(e.target.value)} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px 12px', fontSize: '14px' }} />
                </div>
                <div>
                  <label style={{ fontSize: '13px', color: '#374151', display: 'block', marginBottom: '6px' }}>Гостей</label>
                  <input type="number" value={guests} onChange={e => setGuests(e.target.value)} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px 12px', fontSize: '14px' }} />
                </div>
                <div>
                  <label style={{ fontSize: '13px', color: '#374151', display: 'block', marginBottom: '6px' }}>Комнат</label>
                  <input type="number" value={rooms} onChange={e => setRooms(e.target.value)} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px 12px', fontSize: '14px' }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#374151', display: 'block', marginBottom: '6px' }}>Тип жилья</label>
                <select value={type} onChange={e => setType(e.target.value)} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px 12px', fontSize: '14px' }}>
                  <option value="apartment">Квартира</option>
                  <option value="house">Дом</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#374151', display: 'block', marginBottom: '8px' }}>Удобства</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {AMENITIES.map(a => (
                    <button key={a} onClick={() => toggleAmenity(a)} style={{ padding: '6px 14px', borderRadius: '999px', fontSize: '13px', cursor: 'pointer', border: amenities.includes(a) ? '1px solid #059669' : '1px solid #e5e7eb', background: amenities.includes(a) ? '#ecfdf5' : 'white', color: amenities.includes(a) ? '#065f46' : '#374151' }}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#374151', display: 'block', marginBottom: '6px' }}>Описание</label>
                <textarea placeholder="Расскажите об объекте..." value={description} onChange={e => setDescription(e.target.value)} rows={4} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px 12px', fontSize: '14px', resize: 'vertical' }} />
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#374151', display: 'block', marginBottom: '6px' }}>Телефон *</label>
                <input placeholder="+7 900 000 00 00" value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px 12px', fontSize: '14px' }} />
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#374151', display: 'block', marginBottom: '6px' }}>Фотографии</label>
                <input type="file" accept="image/*" multiple onChange={handleImageChange} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px 12px', fontSize: '14px', background: 'white' }} />
                {previews.length > 0 && (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                    {previews.map((src, i) => (
                      <img key={i} src={src} alt="" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                    ))}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button onClick={handleSubmit} disabled={loading} style={{ flex: 1, background: '#059669', color: 'white', border: 'none', padding: '13px', borderRadius: '10px', fontSize: '15px', fontWeight: 500, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
                  {loading ? 'Сохраняем...' : 'Сохранить объект'}
                </button>
                <button onClick={() => setShowForm(false)} style={{ padding: '13px 20px', background: 'white', border: '1px solid #e5e7eb', borderRadius: '10px', fontSize: '15px', cursor: 'pointer', color: '#374151' }}>
                  Отмена
                </button>
              </div>
            </div>
          </div>
        )}
        {!showForm && !success && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏠</div>
            <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px' }}>Объектов пока нет</div>
            <div style={{ fontSize: '14px' }}>Нажмите "+ Добавить объект" чтобы начать</div>
          </div>
        )}
      </div>
    </main>
  )
}