export default function ForOwnersPage() {
  return (
    <main style={{ fontFamily: 'sans-serif', background: '#f9fafb', minHeight: '100vh' }}>
      <style>{`
        @media (max-width: 768px) {
          .plans-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .hero-pad { padding: 40px 16px !important; }
          .section-pad { padding: 32px 16px !important; }
          .plan-popular { margin-top: 0 !important; }
        }
      `}</style>

      <nav style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ fontSize: '20px', fontWeight: 600, textDecoration: 'none', color: '#111827' }}>
          Курорт<span style={{ color: '#059669' }}>рум</span>
        </a>
        <a href="/auth/login" style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none' }}>Войти</a>
      </nav>

      <section className="hero-pad" style={{ background: '#065f46', color: 'white', padding: '60px 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 600, marginBottom: '12px' }}>Разместите жильё на КМВ</h1>
        <p style={{ color: '#6ee7b7', fontSize: '15px', marginBottom: '8px' }}>Прямые заявки от туристов · Без комиссии с бронирования</p>
        <p style={{ color: '#6ee7b7', fontSize: '14px' }}>14 дней бесплатно — начните прямо сейчас</p>
      </section>

      <section className="section-pad" style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 600, textAlign: 'center', marginBottom: '8px' }}>Тарифы</h2>
        <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '14px', marginBottom: '40px' }}>Выберите подходящий план</p>

        <div className="plans-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '28px' }}>
            <div style={{ fontSize: '14px', fontWeight: 500, color: '#6b7280', marginBottom: '8px' }}>Стартер</div>
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>990 ₽</div>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '24px' }}>в месяц</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              <div style={{ fontSize: '14px', color: '#374151' }}>✓ До 3 объектов</div>
              <div style={{ fontSize: '14px', color: '#374151' }}>✓ Прямые заявки</div>
              <div style={{ fontSize: '14px', color: '#374151' }}>✓ Фото объектов</div>
              <div style={{ fontSize: '14px', color: '#9ca3af' }}>✗ Продвижение</div>
              <div style={{ fontSize: '14px', color: '#9ca3af' }}>✗ Приоритет в поиске</div>
            </div>
            <a href="/auth/register" style={{ display: 'block', background: 'white', border: '1px solid #059669', color: '#059669', padding: '12px', borderRadius: '10px', textAlign: 'center', textDecoration: 'none', fontSize: '15px', fontWeight: 500 }}>
              Начать бесплатно
            </a>
          </div>

          <div className="plan-popular" style={{ background: 'white', border: '2px solid #059669', borderRadius: '16px', padding: '28px', position: 'relative', marginTop: '-8px' }}>
            <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#059669', color: 'white', padding: '4px 16px', borderRadius: '999px', fontSize: '12px', fontWeight: 500, whiteSpace: 'nowrap' }}>
              Популярный
            </div>
            <div style={{ fontSize: '14px', fontWeight: 500, color: '#6b7280', marginBottom: '8px' }}>Про</div>
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>1 990 ₽</div>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '24px' }}>в месяц</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              <div style={{ fontSize: '14px', color: '#374151' }}>✓ До 10 объектов</div>
              <div style={{ fontSize: '14px', color: '#374151' }}>✓ Прямые заявки</div>
              <div style={{ fontSize: '14px', color: '#374151' }}>✓ Фото объектов</div>
              <div style={{ fontSize: '14px', color: '#374151' }}>✓ Продвижение</div>
              <div style={{ fontSize: '14px', color: '#9ca3af' }}>✗ Приоритет в поиске</div>
            </div>
            <a href="/auth/register" style={{ display: 'block', background: '#059669', color: 'white', padding: '12px', borderRadius: '10px', textAlign: 'center', textDecoration: 'none', fontSize: '15px', fontWeight: 500 }}>
              Начать бесплатно
            </a>
          </div>

          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '28px' }}>
            <div style={{ fontSize: '14px', fontWeight: 500, color: '#6b7280', marginBottom: '8px' }}>Агентство</div>
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>4 990 ₽</div>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '24px' }}>в месяц</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              <div style={{ fontSize: '14px', color: '#374151' }}>✓ Безлимит объектов</div>
              <div style={{ fontSize: '14px', color: '#374151' }}>✓ Прямые заявки</div>
              <div style={{ fontSize: '14px', color: '#374151' }}>✓ Фото объектов</div>
              <div style={{ fontSize: '14px', color: '#374151' }}>✓ Продвижение</div>
              <div style={{ fontSize: '14px', color: '#374151' }}>✓ Приоритет в поиске</div>
            </div>
            <a href="/auth/register" style={{ display: 'block', background: 'white', border: '1px solid #059669', color: '#059669', padding: '12px', borderRadius: '10px', textAlign: 'center', textDecoration: 'none', fontSize: '15px', fontWeight: 500 }}>
              Начать бесплатно
            </a>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '14px', color: '#6b7280' }}>
          Все тарифы включают 14 дней бесплатного пробного периода
        </div>
      </section>

      <section style={{ background: 'white', padding: '48px 24px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, textAlign: 'center', marginBottom: '32px' }}>Как это работает</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { n: '1', title: 'Зарегистрируйтесь', text: 'Создайте аккаунт за 2 минуты — 14 дней бесплатно' },
              { n: '2', title: 'Добавьте объект', text: 'Заполните описание, загрузите фото и укажите цену' },
              { n: '3', title: 'Получайте заявки', text: 'Туристы находят ваш объект и связываются напрямую' },
            ].map(s => (
              <div key={s.n} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, flexShrink: 0 }}>{s.n}</div>
                <div>
                  <div style={{ fontWeight: 500, marginBottom: '4px' }}>{s.title}</div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>{s.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ background: 'white', borderTop: '1px solid #e5e7eb', padding: '24px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>
        © 2026 Курортрум · Жильё на Кавказских Минеральных Водах
      </footer>
    </main>
  )
}
