import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { profile } from '../data.js';
import { Magnetic, Reveal, SheetHead } from './motion.jsx';

// Set these in a ".env" file (see .env.example)
const EMAILJS = {
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
};
const configured = Boolean(EMAILJS.publicKey && EMAILJS.serviceId && EMAILJS.templateId);

export default function Contact() {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // { ok: boolean, text: string }
  const [copied, setCopied] = useState(false);
  const reqId = useMemo(() => `REQ-${String(Math.floor(1000 + Math.random() * 9000))}`, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const invalid = [...form.elements].find((el) => el.willValidate && !el.checkValidity());
    if (invalid) {
      const label = form.querySelector(`label[for="${invalid.id}"]`)?.textContent || 'This field';
      setStatus({
        ok: false,
        text: invalid.type === 'email' && invalid.value ? 'Please enter a valid email address.' : `${label} is required.`,
      });
      invalid.focus();
      return;
    }
    if (!configured) {
      // No EmailJS keys: fall back to the visitor's mail app, pre-filled with what they typed
      const d = new FormData(form);
      const body = `${d.get('message')}

— ${d.get('name')} (${d.get('email')})`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(d.get('subject'))}&body=${encodeURIComponent(body)}`;
      setStatus({ ok: true, text: 'Opening your email app to send the message…' });
      return;
    }

    setSending(true);
    setStatus(null);
    try {
      await emailjs.sendForm(EMAILJS.serviceId, EMAILJS.templateId, form, { publicKey: EMAILJS.publicKey });
      setStatus({ ok: true, text: "Thanks! Your message has been sent. I'll get back to you soon." });
      form.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus({ ok: false, text: 'Sorry, the message could not be sent. Please email me directly.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="wrap">
        <SheetHead no="05" title="Contact · New request" />

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <Reveal as="h2" className="text-3xl md:text-5xl font-bold leading-[1.05] mb-6">
              Let's build something <span className="text-acid">together</span>.
            </Reveal>
            <Reveal as="p" delay={0.1} className="text-gray-400 mb-10">
              Have a Teamcenter role, a web project or just a question? Send a message and I'll reply as soon as I can.
            </Reveal>

            <Reveal delay={0.15} className="tile flex items-center justify-between gap-4 mb-4">
              <div className="min-w-0">
                <p className="case-label mb-1">Email</p>
                <a href={`mailto:${profile.email}`} className="text-white hover:text-acid transition-colors break-all">{profile.email}</a>
              </div>
              <button id="copyEmail" type="button" onClick={copyEmail} className="social shrink-0" aria-label={copied ? 'Email address copied' : 'Copy email address'}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.i
                    key={copied ? 'check' : 'copy'}
                    className={`fas ${copied ? 'fa-check text-acid' : 'fa-copy'}`}
                    aria-hidden="true"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 45 }}
                    transition={{ duration: 0.18 }}
                  />
                </AnimatePresence>
              </button>
            </Reveal>

            <Reveal delay={0.2} className="tile mb-8">
              <p className="case-label mb-1">Location</p>
              <p className="text-white">{profile.location}</p>
            </Reveal>

            <Reveal delay={0.25} className="flex items-center gap-3">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social" aria-label="GitHub"><i className="fab fa-github" aria-hidden="true" /></a>
              {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="social" aria-label="LinkedIn"><i className="fab fa-linkedin-in" aria-hidden="true" /></a>}
              <a href={profile.leetcode} target="_blank" rel="noopener noreferrer" className="social" aria-label="LeetCode"><i className="fas fa-code" aria-hidden="true" /></a>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-3">
            <form id="contactForm" ref={formRef} onSubmit={onSubmit} noValidate className="tile frame !p-0">
              <div className="flex items-center justify-between gap-3 px-6 md:px-8 py-3 border-b border-lav/10 label">
                <span>New message · {reqId}</span>
                <span className="status status-rel">Draft</span>
              </div>
              <div className="p-6 md:p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm text-gray-400 mb-2">Name</label>
                    <input type="text" id="name" name="name" required autoComplete="name" placeholder="Your name" className="field" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-400 mb-2">Email</label>
                    <input type="email" id="email" name="email" required autoComplete="email" placeholder="you@example.com" className="field" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm text-gray-400 mb-2">Subject</label>
                  <input type="text" id="subject" name="subject" required placeholder="What's it about?" className="field" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-gray-400 mb-2">Message</label>
                  <textarea id="message" name="message" rows={6} required placeholder="Tell me a bit more…" className="field resize-y" />
                </div>
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <Magnetic>
                    <button type="submit" id="sendBtn" disabled={sending} className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
                      <motion.i
                        className="fas fa-paper-plane text-xs"
                        aria-hidden="true"
                        animate={sending ? { x: [0, 6, 0], y: [0, -4, 0] } : { x: 0, y: 0 }}
                        transition={sending ? { duration: 0.8, repeat: Infinity } : {}}
                      />
                      <span>{sending ? 'Sending…' : 'Send message'}</span>
                    </button>
                  </Magnetic>
                  <p id="formStatus" role="status" aria-live="polite" className={`text-sm ${status?.ok ? 'text-acid' : 'text-ver'}`}>
                    <AnimatePresence mode="wait">
                      {status && (
                        <motion.span
                          key={status.text}
                          className="inline-block"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          {status.text}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </p>
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
