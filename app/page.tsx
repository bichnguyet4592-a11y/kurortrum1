export default function HomePage() {
  return (
    <main style={{ fontFamily: 'sans-serif' }}>
      <nav style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '20px', fontWeight: 600 }}>
          Курорт<span style={{ color: '#059669' }}>рум</span>
        </div>
        <a href="/auth/register" style={{ background: '#059669', color: 'white', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px' }}>
          Разместить объект
        </a>
      </nav>

      <section style={{ background: '#065f46', color: 'white', padding: '60px 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '12px' }}>
          Жильё на Кавказских Минеральных Водах
        </h1>
        <p style={{ color: '#6ee7b7', marginBottom: '32px' }}>
          Кисловодск · Пятигорск · Ессентуки · Железноводск
        </p>
        <a href="/catalog" style={{ background: '#059669', color: 'white', padding: '12px 32px', borderRadius: '8px', textDecoration: 'none', fontSize: '16px' }}>
          Найти жильё
        </a>
      </section>

      <section style={{ padding: '40px 24px', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '24px' }}>Выбери город</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {['Кисловодск', 'Пятигорск', 'Ессентуки', 'Железноводск'].map(city => (
            <a key={city} href={`/catalog?city=${city}`} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', textAlign: 'center', textDecoration: 'none', color: '#111827' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>🏔️</div>
              <div style={{ fontWeight: 500 }}>{city}</div>
            </a>
          ))}
        </div>
      </section>

      <section style={{ background: '#065f46', color: 'white', padding: '48px 24px', textAlign: 'center', marginTop: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 500, marginBottom: '12px' }}>Сдаёте жильё на КМВ?</h2>
        <p style={{ color: '#6ee7b7', marginBottom: '24px' }}>7 дней бесплатно · Прямые заявки · Без комиссии</p>
        <a href="/auth/register" style={{ background: 'white', color: '#065f46', padding: '12px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: 500 }}>
          Разместить объект →
        </a>
      </section>

      <footer style={{ background: 'white', borderTop: '1px solid #e5e7eb', padding: '24px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>
        © 2026 Курортрум · Жильё на Кавказских Минеральных Водах
      </footer>
    </main>
  )
}