import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Курортрум — посуточная аренда жилья на КМВ',
  description: 'Квартиры, дома и апартаменты в Кисловодске, Пятигорске, Ессентуках и Железноводске — напрямую от хозяев. Без комиссии.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {children}

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
          .quick-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 32px rgba(18,163,135,0.55);
          }

          .modal-overlay {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.55);
            z-index: 1000;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          .modal-overlay.open { display: flex; }

          .modal-box {
            background: white;
            border-radius: 20px;
            padding: 36px;
            max-width: 500px;
            width: 100%;
            position: relative;
            animation: modalIn 0.2s ease;
          }

          @keyframes modalIn {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
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
            line-height: 1;
          }
          .modal-close:hover { background: #e5e7eb; }

          .modal-tag {
            font-size: 12px;
            color: #2BAE8E;
            font-weight: 600;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            margin-bottom: 4px;
          }

          .modal-title {
            font-size: 26px;
            font-weight: 700;
            color: #0F4C5C;
            margin: 0 0 8px;
            letter-spacing: -0.02em;
          }

          .modal-desc {
            font-size: 14px;
            color: #6b7280;
            margin: 0 0 24px;
            line-height: 1.6;
          }

          .modal-label {
            font-size: 14px;
            font-weight: 600;
            color: #374151;
            display: block;
            margin-bottom: 8px;
          }

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

          .modal-agree {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 24px;
          }

          .modal-agree input { margin-top: 2px; flex-shrink: 0; width: 16px; height: 16px; accent-color: #2BAE8E; }
          .modal-agree label { font-size: 13px; color: #6b7280; line-height: 1.5; }

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
          .modal-submit:hover {
            box-shadow: 0 6px 20px rgba(18,163,135,0.45);
            transform: translateY(-1px);
          }

          .modal-hint {
            text-align: center;
            font-size: 13px;
            color: #9ca3af;
            margin: 12px 0 0;
          }

          .modal-success {
            text-align: center;
            padding: 20px 0;
          }

          @media (max-width: 768px) {
            .quick-btn { bottom: 20px; right: 16px; padding: 12px 18px; font-size: 14px; }
            .modal-box { padding: 28px 20px; border-radius: 16px; }
            .modal-title { font-size: 22px; }
          }
        `}</style>

        <button className="quick-btn" onclick="document.getElementById('quickModal').classList.add('open')">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 011 2.22 2 2 0 012.96 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6z"/>
          </svg>
          Быстрый подбор жилья
        </button>

        <div id="quickModal" className="modal-overlay" onclick="if(event.target===this)this.classList.remove('open')">
          <div className="modal-box">
            <button className="modal-close" onclick="document.getElementById('quickModal').classList.remove('open')">×</button>

            <div id="modalForm">
              <p className="modal-tag">Бесплатный подбор жилья</p>
              <h2 className="modal-title">Заявка на подбор</h2>
              <p className="modal-desc">Оставьте телефон, а если хотите — коротко напишите, что для вас важно.</p>

              <label className="modal-label">Введите ваш телефон</label>
              <input id="modalPhone" type="tel" placeholder="+7 (___) ___-__-__" className="modal-input" />

              <label className="modal-label">
                Пожелания <span style={{fontWeight: 400, color: '#9ca3af'}}>(необязательно)</span>
              </label>
              <textarea id="modalWish" placeholder="Например: рядом с парком, с парковкой, до 5000 ₽, на ближайшие даты" className="modal-textarea"></textarea>

              <div className="modal-agree">
                <input type="checkbox" id="modalAgree" />
                <label htmlFor="modalAgree">Я даю согласие на обработку персональных данных</label>
              </div>

              <button className="modal-submit" onclick="submitQuickForm()">Получить варианты жилья</button>
              <p className="modal-hint">Уточним детали уже в сообщении или звонке</p>
            </div>

            <div id="modalSuccess" style={{display: 'none'}} className="modal-success">
              <div style={{fontSize: '48px', marginBottom: '16px'}}>✅</div>
              <h3 style={{fontSize: '20px', fontWeight: 700, color: '#0F4C5C', margin: '0 0 8px'}}>Заявка принята!</h3>
              <p style={{fontSize: '14px', color: '#6b7280', margin: 0}}>Мы свяжемся с вами в ближайшее время и подберём подходящие варианты.</p>
            </div>
          </div>
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
          function submitQuickForm() {
            const phone = document.getElementById('modalPhone').value;
            const agree = document.getElementById('modalAgree').checked;
            if (!phone || phone.length < 5) {
              document.getElementById('modalPhone').style.borderColor = '#ef4444';
              return;
            }
            if (!agree) {
              document.getElementById('modalAgree').style.outline = '2px solid #ef4444';
              return;
            }
            document.getElementById('modalForm').style.display = 'none';
            document.getElementById('modalSuccess').style.display = 'block';
            setTimeout(() => {
              document.getElementById('quickModal').classList.remove('open');
              document.getElementById('modalForm').style.display = 'block';
              document.getElementById('modalSuccess').style.display = 'none';
              document.getElementById('modalPhone').value = '';
              document.getElementById('modalWish').value = '';
              document.getElementById('modalAgree').checked = false;
            }, 3000);
          }
        `}} />
      </body>
    </html>
  );
}
