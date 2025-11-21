import { useState } from 'react';
import { FileCheck, CheckCircle, Copy } from 'lucide-react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { addCertificate, generateCertificateId } from '../data/certificates';
import { Certificate } from '../types/certificate';

interface FormData {
  participantName: string;
  email: string;
  eventName: string;
  eventDate: string;
  issuer: string;
}

interface FormErrors {
  participantName?: string;
  email?: string;
  eventName?: string;
  eventDate?: string;
}

export const IssuePage = () => {
  const [formData, setFormData] = useState<FormData>({
    participantName: '',
    email: '',
    eventName: '',
    eventDate: '',
    issuer: '0x0 PIR4T3S Team',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [issuedCertificate, setIssuedCertificate] = useState<Certificate | null>(null);
  const [copied, setCopied] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.participantName.trim()) {
      newErrors.participantName = 'Participant name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.eventName.trim()) {
      newErrors.eventName = 'Event name is required';
    }

    if (!formData.eventDate) {
      newErrors.eventDate = 'Event date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newCertificate: Certificate = {
      id: generateCertificateId(),
      participantName: formData.participantName.trim(),
      email: formData.email.trim(),
      eventName: formData.eventName.trim(),
      eventDate: formData.eventDate,
      issuer: formData.issuer,
      issuedDate: new Date().toISOString().split('T')[0],
      status: 'valid',
    };

    addCertificate(newCertificate);
    setIssuedCertificate(newCertificate);

    setFormData({
      participantName: '',
      email: '',
      eventName: '',
      eventDate: '',
      issuer: '0x0 PIR4T3S Team',
    });
    setErrors({});
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCopy = () => {
    if (issuedCertificate) {
      navigator.clipboard.writeText(issuedCertificate.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNewCertificate = () => {
    setIssuedCertificate(null);
  };

  if (issuedCertificate) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-8" glowColor="green">
          <div className="text-center space-y-6">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />

            <div>
              <h2 className="text-3xl font-bold text-green-400 font-mono mb-2">
                CERTIFICATE ISSUED
              </h2>
              <p className="text-gray-400 font-mono">
                Certificate has been successfully generated
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-6 border border-green-400/30">
              <p className="text-xs text-cyan-400 font-mono mb-2 tracking-widest">
                CERTIFICATE ID
              </p>
              <div className="flex items-center justify-center gap-3">
                <p className="text-2xl font-bold text-gray-100 font-mono">
                  {issuedCertificate.id}
                </p>
                <button
                  onClick={handleCopy}
                  className="p-2 hover:bg-gray-700 rounded transition-colors"
                  aria-label="Copy certificate ID"
                >
                  <Copy className={`w-5 h-5 ${copied ? 'text-green-400' : 'text-gray-400'}`} />
                </button>
              </div>
              {copied && (
                <p className="text-green-400 text-sm font-mono mt-2">Copied to clipboard!</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <p className="text-xs text-cyan-400 font-mono mb-1 tracking-widest">
                  PARTICIPANT
                </p>
                <p className="text-lg text-gray-100 font-mono">
                  {issuedCertificate.participantName}
                </p>
              </div>

              <div>
                <p className="text-xs text-cyan-400 font-mono mb-1 tracking-widest">
                  EMAIL
                </p>
                <p className="text-lg text-gray-100 font-mono">
                  {issuedCertificate.email}
                </p>
              </div>

              <div>
                <p className="text-xs text-cyan-400 font-mono mb-1 tracking-widest">
                  EVENT
                </p>
                <p className="text-lg text-gray-100 font-mono">
                  {issuedCertificate.eventName}
                </p>
              </div>

              <div>
                <p className="text-xs text-cyan-400 font-mono mb-1 tracking-widest">
                  DATE
                </p>
                <p className="text-lg text-gray-100 font-mono">
                  {new Date(issuedCertificate.eventDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <Button onClick={handleNewCertificate} variant="primary" className="mt-4">
              ISSUE ANOTHER CERTIFICATE
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-green-400 font-mono mb-2 tracking-wider">
          ISSUE CERTIFICATE
        </h2>
        <p className="text-gray-400 font-mono text-sm">
          Generate a new certificate for event participants
        </p>
      </div>

      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Participant Name"
              type="text"
              placeholder="Enter full name"
              value={formData.participantName}
              onChange={(e) => handleInputChange('participantName', e.target.value)}
              error={errors.participantName}
              required
              aria-required="true"
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="participant@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={errors.email}
              required
              aria-required="true"
            />
          </div>

          <Input
            label="Event Name"
            type="text"
            placeholder="Enter event name"
            value={formData.eventName}
            onChange={(e) => handleInputChange('eventName', e.target.value)}
            error={errors.eventName}
            required
            aria-required="true"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Event Date"
              type="date"
              value={formData.eventDate}
              onChange={(e) => handleInputChange('eventDate', e.target.value)}
              error={errors.eventDate}
              required
              aria-required="true"
            />

            <Input
              label="Issuer"
              type="text"
              value={formData.issuer}
              onChange={(e) => handleInputChange('issuer', e.target.value)}
              disabled
              className="opacity-75"
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" variant="primary" className="px-8">
              <FileCheck className="w-5 h-5 inline-block mr-2" />
              GENERATE CERTIFICATE
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
