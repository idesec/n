import { Certificate } from '../types/certificate';

export let certificates: Certificate[] = [
  {
    id: 'CERT-2024-001-XK9P',
    participantName: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    eventName: 'Advanced Cybersecurity Workshop 2024',
    eventDate: '2024-03-15',
    issuer: '0x0 PIR4T3S Team',
    issuedDate: '2024-03-16',
    status: 'valid',
  },
  {
    id: 'CERT-2024-002-LM4T',
    participantName: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    eventName: 'Ethical Hacking Bootcamp',
    eventDate: '2024-02-20',
    issuer: '0x0 PIR4T3S Team',
    issuedDate: '2024-02-21',
    status: 'valid',
  },
  {
    id: 'CERT-2024-003-QW7R',
    participantName: 'Marcus Rodriguez',
    email: 'marcus.r@example.com',
    eventName: 'Web3 Security Summit',
    eventDate: '2024-01-10',
    issuer: '0x0 PIR4T3S Team',
    issuedDate: '2024-01-11',
    status: 'valid',
  },
];

export const addCertificate = (certificate: Certificate): void => {
  certificates.push(certificate);
};

export const findCertificate = (id: string): Certificate | undefined => {
  return certificates.find(cert => cert.id.toLowerCase() === id.toLowerCase());
};

export const generateCertificateId = (): string => {
  const year = new Date().getFullYear();
  const count = String(certificates.length + 1).padStart(3, '0');
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CERT-${year}-${count}-${random}`;
};
