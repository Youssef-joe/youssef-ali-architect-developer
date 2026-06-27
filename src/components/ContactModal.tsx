import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const t = {
  ar: { title: 'تواصل', nameLabel: 'اسمك (اختياري)', namePlaceholder: 'مجهول', messageLabel: 'رسالتك', messagePlaceholder: 'اكتب ما تريد قوله...', cancel: 'إلغاء', send: 'إرسال بريد' },
  en: { title: 'Contact', nameLabel: 'Your name (optional)', namePlaceholder: 'Anonymous', messageLabel: 'Your message', messagePlaceholder: 'Write what you want to say...', cancel: 'Cancel', send: 'Send Email' },
};

const email = 'youssef.ali9966@gmail.com';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { language } = useLanguage();
  const s = t[language];
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    const subject = name.trim() ? `Message from ${name.trim()}` : 'Portfolio Contact';
    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message.trim())}`);
    setName(''); setMessage('');
    onClose();
  };

  if (!isOpen) return null;

  const inputStyle = {
    width: '100%', background: 'transparent', border: '1px solid var(--text-grey)',
    borderRadius: '2px', padding: '10px 12px', fontSize: '12px', color: '#FFFFFF',
    fontFamily: "'Space Mono', monospace", outline: 'none',
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 100, backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="w-full max-w-md mx-4" style={{ backgroundColor: '#1A1A1A', borderRadius: '4px', padding: '24px' }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '0.05em', color: '#FFFFFF', flex: 1 }}>{s.title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FFFFFF', fontSize: '18px', padding: 0 }}>&times;</button>
        </div>

        <div className="space-y-4">
          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-grey)', display: 'block', marginBottom: '6px' }}>{s.nameLabel}</label>
            <input type="text" placeholder={s.namePlaceholder} value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-grey)', display: 'block', marginBottom: '6px' }}>{s.messageLabel}</label>
            <textarea rows={6} placeholder={s.messagePlaceholder} value={message} onChange={(e) => setMessage(e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} style={{ flex: 1, padding: '10px 16px', fontSize: '12px', fontFamily: "'Space Mono', monospace", color: '#FFFFFF', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {s.cancel}
          </button>
          <button onClick={handleSend} style={{ flex: 1, padding: '10px 16px', fontSize: '12px', fontFamily: "'Space Mono', monospace", color: '#1A1A1A', background: '#FFFFFF', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {s.send}
          </button>
        </div>
      </div>
    </div>
  );
}
