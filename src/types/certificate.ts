export interface Certificate {
  id: string;
  participantName: string;
  email: string;
  eventName: string;
  eventDate: string;
  issuer: string;
  issuedDate: string;
  status: 'valid' | 'revoked';
}
