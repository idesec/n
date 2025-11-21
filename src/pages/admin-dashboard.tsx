import { useState } from 'react';
import { FileCheck, LogOut, Eye, Calendar, Mail, User } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useAdmin } from '../contexts/AdminContext';
import { certificates } from '../data/certificates';
import { Certificate } from '../types/certificate';

interface AdminDashboardPageProps {
  onNavigateToIssue: () => void;
  onLogout: () => void;
}

export const AdminDashboardPage = ({ onNavigateToIssue, onLogout }: AdminDashboardPageProps) => {
  const { logout } = useAdmin();
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const handleViewDetails = (cert: Certificate) => {
    setSelectedCertificate(cert);
  };

  const handleCloseDetails = () => {
    setSelectedCertificate(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAxYy0yLjc2MSAwLTUgMi4yMzktNSA1czIuMjM5IDUgNSA1IDUtMi4yMzkgNS01LTIuMjM5LTUtNS01eiIgZmlsbD0iIzBmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      <div className="relative z-10">
        <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-green-400 font-mono tracking-wider">
                  ADMIN DASHBOARD
                </h1>
                <p className="text-gray-400 font-mono text-sm mt-1">
                  Certificate Management System
                </p>
              </div>
              <div className="flex gap-3">
                <Button onClick={onNavigateToIssue} variant="primary">
                  <FileCheck className="w-4 h-4 inline-block mr-2" />
                  ISSUE NEW CERTIFICATE
                </Button>
                <Button onClick={handleLogout} variant="danger">
                  <LogOut className="w-4 h-4 inline-block mr-2" />
                  LOGOUT
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-cyan-400 font-mono mb-2">
                ALL CERTIFICATES
              </h2>
              <p className="text-gray-400 font-mono text-sm">
                Total: {certificates.length} certificate{certificates.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-cyan-400 font-mono text-sm font-semibold">
                      CERTIFICATE ID
                    </th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-mono text-sm font-semibold">
                      PARTICIPANT
                    </th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-mono text-sm font-semibold">
                      EVENT
                    </th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-mono text-sm font-semibold">
                      DATE
                    </th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-mono text-sm font-semibold">
                      STATUS
                    </th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-mono text-sm font-semibold">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.map((cert) => (
                    <tr
                      key={cert.id}
                      className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="py-4 px-4 text-gray-300 font-mono text-sm">
                        {cert.id}
                      </td>
                      <td className="py-4 px-4 text-gray-300 font-mono text-sm">
                        {cert.participantName}
                      </td>
                      <td className="py-4 px-4 text-gray-300 font-mono text-sm">
                        {cert.eventName}
                      </td>
                      <td className="py-4 px-4 text-gray-300 font-mono text-sm">
                        {new Date(cert.eventDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`
                            px-2 py-1 rounded text-xs font-mono font-semibold uppercase
                            ${cert.status === 'valid'
                              ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                              : 'bg-red-400/20 text-red-400 border border-red-400/30'
                            }
                          `}
                        >
                          {cert.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleViewDetails(cert)}
                          className="flex items-center gap-2 px-3 py-1 bg-cyan-400/20 text-cyan-400 border border-cyan-400/50 rounded font-mono text-sm hover:bg-cyan-400/30 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          VIEW
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      </div>

      {selectedCertificate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full p-8" glowColor="cyan">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-cyan-400 font-mono">
                CERTIFICATE DETAILS
              </h3>
              <button
                onClick={handleCloseDetails}
                className="text-gray-400 hover:text-gray-300 font-mono text-xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/50 rounded-lg p-4 border border-cyan-400/30">
                <p className="text-xs text-cyan-400 font-mono mb-2 tracking-widest">
                  CERTIFICATE ID
                </p>
                <p className="text-xl font-bold text-gray-100 font-mono">
                  {selectedCertificate.id}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-cyan-400" />
                    <p className="text-xs text-cyan-400 font-mono tracking-widest">
                      PARTICIPANT
                    </p>
                  </div>
                  <p className="text-lg text-gray-100 font-mono">
                    {selectedCertificate.participantName}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <p className="text-xs text-cyan-400 font-mono tracking-widest">
                      EMAIL
                    </p>
                  </div>
                  <p className="text-lg text-gray-100 font-mono">
                    {selectedCertificate.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-cyan-400 font-mono mb-2 tracking-widest">
                    EVENT NAME
                  </p>
                  <p className="text-lg text-gray-100 font-mono">
                    {selectedCertificate.eventName}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <p className="text-xs text-cyan-400 font-mono tracking-widest">
                      EVENT DATE
                    </p>
                  </div>
                  <p className="text-lg text-gray-100 font-mono">
                    {new Date(selectedCertificate.eventDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-cyan-400 font-mono mb-2 tracking-widest">
                    ISSUER
                  </p>
                  <p className="text-lg text-gray-100 font-mono">
                    {selectedCertificate.issuer}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-cyan-400 font-mono mb-2 tracking-widest">
                    ISSUED DATE
                  </p>
                  <p className="text-lg text-gray-100 font-mono">
                    {new Date(selectedCertificate.issuedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-cyan-400 font-mono mb-2 tracking-widest">
                    STATUS
                  </p>
                  <span
                    className={`
                      inline-block px-3 py-1 rounded text-sm font-mono font-semibold uppercase
                      ${selectedCertificate.status === 'valid'
                        ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                        : 'bg-red-400/20 text-red-400 border border-red-400/30'
                      }
                    `}
                  >
                    {selectedCertificate.status}
                  </span>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleCloseDetails} variant="secondary">
                  CLOSE
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
