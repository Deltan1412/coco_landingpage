import React from 'react';
import '@/styles/contact-panel.css';
import { CONTACT_EMAIL, WHATSAPP, OFFICE_HOURS } from '@/constants/contact';

interface ContactPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactPanel({ isOpen, onClose }: ContactPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="contact-overlay" onClick={onClose}>
      <div className="contact-panel" onClick={(e) => e.stopPropagation()}>
        <button className="contact-close" onClick={onClose}>&times;</button>
        <h3>Talk to us</h3>
        <p>Have questions about the cohort? We're here to help you decide if it's the right fit.</p>

        <div className="contact-info">
          <div className="contact-item">
            <strong>Email</strong>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
          <div className="contact-item">
            <strong>Office Hours</strong>
            <span>{OFFICE_HOURS}</span>
          </div>
          <div className="contact-item">
            <strong>WhatsApp</strong>
            <span>{WHATSAPP}</span>
          </div>
        </div>

        <button className="btn btn-primary" style={{ width: '100%', marginTop: 20 }} onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
}
