import { useState } from 'react';
import SiteHeader from '../components/SiteHeader';
import { useReveal } from '../components/useReveal';
import { useLanguage } from '../contexts/LanguageContext';

export default function EditorPage() {
  useReveal();
  const { language } = useLanguage();

  const [formData, setFormData] = useState({
    password: '',
    title: '',
    slug: '',
    description: '',
    tags: '',
    lang: 'en',
    body: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Auto-generate slug from title if slug hasn't been manually touched
      ...(name === 'title' && !prev.slug ? { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') } : {})
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);

    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          tags: tagsArray
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to publish');
      }

      setStatus('success');
      // Reset form fields except password
      setFormData(prev => ({
        ...prev,
        title: '',
        slug: '',
        description: '',
        tags: '',
        body: ''
      }));
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message);
    }
  };

  const inputClass = "w-full bg-transparent border border-border-strong p-3 text-text-charcoal focus:outline-none focus:border-accent-teal font-sans";
  const labelClass = "label block mb-2 text-text-grey";

  return (
    <div style={{ backgroundColor: 'var(--bg-warm-white)', minHeight: '100vh' }}>
      <SiteHeader />

      <main className="shell" style={{ paddingTop: 'clamp(7rem, 14vh, 11rem)', paddingBottom: 'var(--section-gap)' }}>
        <p className="label" style={{ marginBottom: '1rem' }}>Admin</p>
        <h1 className="display" style={{ marginBottom: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
          Write Article
        </h1>

        <form onSubmit={handleSubmit} className="max-w-3xl flex flex-col gap-6 reveal">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass} htmlFor="title">Title</label>
              <input required type="text" id="title" name="title" value={formData.title} onChange={handleChange} className={inputClass} placeholder="A deep dive into..." />
            </div>
            <div>
              <label className={labelClass} htmlFor="slug">URL Slug</label>
              <input required type="text" id="slug" name="slug" value={formData.slug} onChange={handleChange} className={inputClass} placeholder="a-deep-dive-into" />
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="description">Description (optional)</label>
            <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} className={inputClass} placeholder="Brief summary of the article..." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass} htmlFor="tags">Tags (comma separated)</label>
              <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} className={inputClass} placeholder="systems, design, os" />
            </div>
            <div>
              <label className={labelClass} htmlFor="lang">Language</label>
              <select id="lang" name="lang" value={formData.lang} onChange={handleChange} className={inputClass}>
                <option value="en">English</option>
                <option value="ar">Arabic</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="body">Markdown Content</label>
            <textarea 
              required 
              id="body" 
              name="body" 
              value={formData.body} 
              onChange={handleChange} 
              className={`${inputClass} font-mono text-sm`} 
              rows={20} 
              placeholder="Write your article here..." 
            />
          </div>

          <div className="border-t border-border-light pt-6 mt-4">
            <label className={labelClass} htmlFor="password">Admin Password</label>
            <input required type="password" id="password" name="password" value={formData.password} onChange={handleChange} className={`${inputClass} max-w-sm`} placeholder="Enter secret password to publish" />
          </div>

          <div className="flex items-center gap-4 mt-4">
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="bg-text-charcoal text-bg-warm-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-accent-teal transition-colors duration-300 disabled:opacity-50"
            >
              {status === 'loading' ? 'Publishing...' : 'Publish Article'}
            </button>

            {status === 'success' && <span className="text-accent-teal text-sm font-bold">Published successfully! It will be live in ~30s.</span>}
            {status === 'error' && <span className="text-red-500 text-sm">{errorMessage}</span>}
          </div>

        </form>
      </main>
    </div>
  );
}
