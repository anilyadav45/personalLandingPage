import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Mail, Phone, MapPin, Github, Linkedin,
  Instagram, Youtube, Twitter, Send, CheckCircle,
} from 'lucide-react';
import { personalInfo } from '../data';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

function SocialLink({ href, icon: Icon, label, color }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors"
      style={{
        background: 'var(--bg-panel)',
        border: '1px solid var(--border-color)',
        color: 'var(--text-muted)',
      }}
      whileHover={{
        borderColor: color,
        color: color,
        y: -3,
        boxShadow: `0 8px 24px ${color}30`,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.9 }}
    >
      <Icon size={17} />
    </motion.a>
  );
}

function InputField({ label, name, type = 'text', placeholder, value, onChange, required }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <motion.label
        className="block text-xs font-mono mb-2"
        style={{
          color: focused ? 'var(--accent)' : 'var(--text-muted)',
          fontFamily: 'JetBrains Mono, monospace',
          transition: 'color 0.2s',
        }}
      >
        {label}{required && <span style={{ color: 'var(--accent)' }}>*</span>}
      </motion.label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
        style={{
          background: 'var(--bg-secondary)',
          border: `1px solid ${focused ? 'var(--accent)' : 'var(--border-color)'}`,
          color: 'var(--text-primary)',
          fontFamily: 'DM Sans, sans-serif',
          boxShadow: focused ? '0 0 0 3px var(--glow-color)' : 'none',
        }}
      />
    </div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSending(true);
  try {
    const data = new FormData();
    data.append('name', form.name);
    data.append('email', form.email);
    data.append('subject', form.subject);
    data.append('message', form.message);
    data.append('_captcha', 'false');
    data.append('_subject', 'New message from your portfolio!');

    await fetch('https://formsubmit.co/anilyadav77745@gmail.com', {
      method: 'POST',
      body: data,
    });
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  } catch (err) {
    console.error(err);
  } finally {
    setSending(false);
  }
};

  const contactItems = [
    { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: Phone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: MapPin, label: 'Location', value: personalInfo.location, href: '#' },
  ];

  const socials = [
    { icon: Github, href: personalInfo.github, label: 'GitHub', color: '#f0f4ff' },
    { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn', color: '#0a66c2' },
    { icon: Instagram, href: personalInfo.instagram, label: 'Instagram', color: '#e1306c' },
    { icon: Youtube, href: personalInfo.youtube, label: 'YouTube', color: '#ff0000' },
    { icon: Twitter, href: personalInfo.twitter, label: 'Twitter', color: '#1da1f2' },
  ];

  return (
    <section
      id="contact"
      className="py-32 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,245,212,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        <motion.div
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-20">
            <div className="section-label mb-4">04 — Contact</div>
            <h2
              className="font-display font-bold leading-tight"
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                color: 'var(--text-primary)',
              }}
            >
              Let's build
              <br />
              <span className="text-gradient">something together</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left info panel — 2/5 */}
            <motion.div variants={fadeUp} className="lg:col-span-2 space-y-6">
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Feel free to reach out for collaborations, projects, or just to say hi. I'll get back to you as soon as possible.
              </p>

              {/* Contact cards */}
              <div className="space-y-3">
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    className="flex items-center gap-4 rounded-xl p-4 group"
                    style={{
                      background: 'var(--bg-panel)',
                      border: '1px solid var(--border-color)',
                    }}
                    whileHover={{
                      borderColor: 'rgba(0,245,212,0.4)',
                      x: 4,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(0,245,212,0.08)' }}
                    >
                      <Icon size={16} style={{ color: 'var(--accent)' }} />
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</p>
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social links */}
              <div>
                <p
                  className="text-xs font-mono mb-4 tracking-[0.2em] uppercase"
                  style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Social
                </p>
                <div className="flex gap-3">
                  {socials.map((s) => (
                    <SocialLink key={s.label} {...s} />
                  ))}
                </div>
              </div>

              {/* Availability banner */}
              <div
                className="rounded-xl p-4 flex items-center gap-3"
                style={{
                  background: 'rgba(0,245,212,0.05)',
                  border: '1px solid rgba(0,245,212,0.2)',
                }}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0 animate-pulse"
                  style={{ background: '#00f5d4' }}
                />
                <div>
                  <p className="text-xs font-medium" style={{ color: '#00f5d4' }}>Available for Work</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    Open to internships & collaborations
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right form — 3/5 */}
            <motion.div variants={fadeUp} className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl p-8 space-y-5"
                style={{
                  background: 'var(--bg-panel)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <InputField
                    label="Name"
                    name="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <InputField
                  label="Subject"
                  name="subject"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />

                {/* Textarea */}
                <div>
                  <label
                    className="block text-xs font-mono mb-2"
                    style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    Message<span style={{ color: 'var(--accent)' }}>*</span>
                  </label>
                  <textarea
                    name="message"
                    placeholder="Write your message..."
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontFamily: 'DM Sans, sans-serif',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--accent)';
                      e.target.style.boxShadow = '0 0 0 3px var(--glow-color)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--border-color)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={sending || sent}
                  className="w-full py-3.5 rounded-xl font-display font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300"
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    background: sent
                      ? 'rgba(0,245,212,0.15)'
                      : 'linear-gradient(135deg, #00f5d4, #7c3aed)',
                    color: sent ? '#00f5d4' : '#020308',
                    border: sent ? '1px solid rgba(0,245,212,0.4)' : 'none',
                    cursor: sending ? 'wait' : 'pointer',
                    opacity: sending ? 0.7 : 1,
                  }}
                  whileHover={!sent && !sending ? { scale: 1.01, y: -1 } : {}}
                  whileTap={!sent && !sending ? { scale: 0.98 } : {}}
                >
                  <AnimatePresence mode="wait">
                    {sent ? (
                      <motion.span
                        key="sent"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                      >
                        <CheckCircle size={16} />
                        Message Sent!
                      </motion.span>
                    ) : sending ? (
                      <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        Sending...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <Send size={15} />
                        Send Message
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
