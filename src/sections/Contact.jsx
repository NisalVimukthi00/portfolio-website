import { useState } from "react";
import siteConfig from "../data/site.js";
import { activeSocialLinks } from "../data/socialLinks.js";
import Reveal from "../components/Reveal.jsx";
import Icon from "../components/Icon.jsx";
import ResumeButton from "../components/ResumeButton.jsx";

/**
 * Contact — no backend, by design.
 * The optional form composes a mailto: message in the visitor's own mail client,
 * which keeps the site fully static and GitHub Pages compatible.
 */
export default function Contact() {
  const { contact } = siteConfig;
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry — ${form.name || "Hello"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  const update = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal className="contact__panel">
          <div className="contact__grid">
            <div>
              <p className="eyebrow">{contact.heading}</p>
              <h2 className="contact__title">{contact.title}</h2>
              <p className="contact__sub">{contact.subtitle}</p>
              <p className="contact__note">{contact.note}</p>

              <a className="contact__email" href={`mailto:${siteConfig.email}`}>
                <Icon name="mail" size={20} />
                {siteConfig.email}
              </a>

              <div className="contact__cta">
                {/* Renders only when the resume file exists — no dead links */}
                <ResumeButton variant="ghost" />
              </div>

              <div className="contact__socials">
                {activeSocialLinks.map((link) => (
                  <a
                    key={link.id}
                    className="social-row"
                    href={link.url}
                    target={link.url.startsWith("http") ? "_blank" : undefined}
                    rel={link.url.startsWith("http") ? "noreferrer noopener" : undefined}
                  >
                    <span className="social-row__left">
                      <Icon name={link.id === "email" ? "mail" : link.id} />
                      {link.label}
                    </span>
                    <span className="social-row__handle">{link.handle}</span>
                  </a>
                ))}
              </div>
            </div>

            {contact.form?.enabled && (
              <form className="form" onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Your name"
                  />
                </div>

                <div className="field">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@example.com"
                  />
                </div>

                <div className="field">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Tell me about the project, role or idea…"
                  />
                </div>

                <button className="btn btn--primary" type="submit">
                  {contact.form.submitLabel}
                  <Icon name="arrowUpRight" className="btn__icon" />
                </button>

                <p className="form__note">
                  This form opens your email client with the message pre-filled — the site stays
                  fully static, with no server or third-party service involved.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
