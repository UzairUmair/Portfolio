import { useState } from 'react';
import { ArrowUpRight, LoaderCircle } from 'lucide-react';
import { profile } from '../data/profile';

export default function ContactForm() {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const next = {};
    for (const field of ['name', 'email', 'subject', 'message']) if (!values[field].trim()) next[field] = `Please enter your ${field}.`;
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Please enter a valid email address.';
    setErrors(next);
    if (Object.keys(next).length) { form.elements[Object.keys(next)[0]].focus(); return; }
    if (values.website) return;
    if (!endpoint) {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(`From: ${values.name} <${values.email}>\n\n${values.message}`)}`;
      setStatus('draft'); return;
    }
    setStatus('sending');
    try {
      const response = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('Delivery failed');
      setStatus('sent'); form.reset();
    } catch { setStatus('error'); }
  }
  return <form className="contact-form" onSubmit={submit} noValidate><div className="form-row">{['name', 'email'].map(field => <label key={field} htmlFor={`contact-${field}`}>{field === 'name' ? 'Your name' : 'Email address'}<input id={`contact-${field}`} name={field} type={field === 'email' ? 'email' : 'text'} autoComplete={field} placeholder={field === 'name' ? 'Your name' : 'you@example.com'} maxLength={150} required aria-invalid={Boolean(errors[field])} aria-describedby={errors[field] ? `${field}-error` : undefined} />{errors[field] && <span className="field-error" id={`${field}-error`}>{errors[field]}</span>}</label>)}</div>
    <label htmlFor="contact-subject">Subject<input id="contact-subject" name="subject" placeholder="An opportunity, a project, or a hello" maxLength={200} required aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? 'subject-error' : undefined} />{errors.subject && <span className="field-error" id="subject-error">{errors.subject}</span>}</label>
    <label htmlFor="contact-message">Your message<textarea id="contact-message" name="message" placeholder="Tell me a little about what you have in mind…" rows="5" maxLength={5000} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />{errors.message && <span className="field-error" id="message-error">{errors.message}</span>}</label>
    <div hidden><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="form-bottom"><p>{endpoint ? 'Your message goes directly to my inbox.' : 'Opens a draft in your email app for you to send.'}</p><button className="button primary" disabled={status === 'sending'}>{status === 'sending' ? <><LoaderCircle size={18} className="spin" />Sending…</> : <>{endpoint ? 'Send message' : 'Open email draft'}<ArrowUpRight size={17} /></>}</button></div>
    <p role="status" className={`form-status ${status === 'error' ? 'field-error' : ''}`}>{status === 'sent' ? 'Thank you. Your message has been sent.' : status === 'draft' ? `Your email app was requested. If it did not open, email ${profile.email} directly. Nothing has been sent from this website.` : status === 'error' ? `The message could not be sent. Please try again or email ${profile.email}.` : ''}</p>
  </form>;
}
