import { useState } from 'react';
import { Search, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { findCertificate } from '../data/certificates';
import { Certificate } from '../types/certificate';

export const VerifyPage = () => {
  const [searchId, setSearchId] = useState('');
  const [certificate, setCertificate] = useState<Certificate | null | undefined>(undefined);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      const found = findCertificate(searchId.trim());
      setCertificate(found || null);
      setIsSearching(false);
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-green-400 font-mono mb-2 tracking-wider">
          VERIFY CERTIFICATE
        </h2>
        <p className="text-gray-400 font-mono text-sm">
          Enter certificate ID to validate authenticity
        </p>
      </div>

      <Card className="p-8 mb-8">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="CERT-2024-XXX-XXXX"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="text-lg"
                aria-label="Certificate ID"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              disabled={isSearching || !searchId.trim()}
              className="px-8"
            >
              <Search className="w-5 h-5 inline-block mr-2" />
              {isSearching ? 'SEARCHING...' : 'VERIFY'}
            </Button>
          </div>
        </form>
      </Card>

      {certificate !== undefined && (
        <Card
          className="p-8"
          glowColor={certificate ? 'green' : 'red'}
        >
          {certificate ? (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-700">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <div>
                  <h3 className="text-2xl font-bold text-green-400 font-mono">
                    VALID CERTIFICATE
                  </h3>
                  <p className="text-gray-400 font-mono text-sm">
                    Certificate authenticated successfully
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-cyan-400 font-mono mb-1 tracking-widest">
                      CERTIFICATE ID
                    </p>
                    <p className="text-lg text-gray-100 font-mono font-bold">
                      {certificate.id}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-cyan-400 font-mono mb-1 tracking-widest">
                      PARTICIPANT NAME
                    </p>
                    <p className="text-lg text-gray-100 font-mono">
                      {certificate.participantName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-cyan-400 font-mono mb-1 tracking-widest">
                      EMAIL
                    </p>
                    <p className="text-lg text-gray-100 font-mono">
                      {certificate.email}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-cyan-400 font-mono mb-1 tracking-widest">
                      EVENT NAME
                    </p>
                    <p className="text-lg text-gray-100 font-mono">
                      {certificate.eventName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-cyan-400 font-mono mb-1 tracking-widest">
                      EVENT DATE
                    </p>
                    <p className="text-lg text-gray-100 font-mono">
                      {new Date(certificate.eventDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-cyan-400 font-mono mb-1 tracking-widest">
                      ISSUER
                    </p>
                    <p className="text-lg text-gray-100 font-mono">
                      {certificate.issuer}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-cyan-400 font-mono mb-1 tracking-widest">
                      STATUS
                    </p>
                    <p className="text-lg text-green-400 font-mono font-bold uppercase">
                      {certificate.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <XCircle className="w-8 h-8 text-red-400" />
              <div>
                <h3 className="text-2xl font-bold text-red-400 font-mono">
                  INVALID CERTIFICATE
                </h3>
                <p className="text-gray-400 font-mono text-sm">
                  No certificate found with ID: {searchId}
                </p>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
