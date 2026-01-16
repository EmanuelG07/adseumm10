import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export function EmailTemplate({ name, email, message }: EmailTemplateProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#000', color: '#fff', padding: '20px', marginBottom: '20px' }}>
        <h1 style={{ margin: '0', fontSize: '24px' }}>ADseum — Nieuw Contact Bericht</h1>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderLeft: '4px solid #3b82f6' }}>
        <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
          <strong>Naam:</strong> {name}
        </p>
        <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
          <strong>E-mail:</strong> <a href={`mailto:${email}`} style={{ color: '#3b82f6' }}>{email}</a>
        </p>
        <p style={{ margin: '0 0 20px 0', fontSize: '14px' }}>
          <strong>Bericht:</strong>
        </p>
        <p style={{ margin: '0', whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '14px' }}>
          {message}
        </p>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#e5e7eb', marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <p style={{ margin: '0' }}>Dit bericht is verzonden via het contact formulier op ADseum.nl</p>
      </div>
    </div>
  );
}
