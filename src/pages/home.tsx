import { Shield, Search, FileCheck, Lock } from 'lucide-react';
import { Card } from '../components/Card';

interface HomePageProps {
  onNavigate: (page: 'verify' | 'issue' | 'admin') => void;
}

export const HomePage = ({ onNavigate }: HomePageProps) => {
  const features = [
    {
      icon: Search,
      title: 'Verify Certificates',
      description: 'Instantly validate certificate authenticity using unique IDs',
      action: () => onNavigate('verify'),
      color: 'cyan' as const,
    },
    {
      icon: FileCheck,
      title: 'Issue Certificates',
      description: 'Generate secure certificates for event participants',
      action: () => onNavigate('issue'),
      color: 'green' as const,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Shield className="w-20 h-20 text-cyan-400" strokeWidth={1.5} />
            <div className="absolute inset-0 bg-cyan-400 blur-2xl opacity-20"></div>
          </div>
        </div>

        <h1 className="text-5xl font-bold text-green-400 font-mono mb-4 tracking-wider">
          0x0 PIR4T3S
        </h1>
        <h2 className="text-2xl text-cyan-400 font-mono mb-4 tracking-widest">
          CERTIFICATE MANAGEMENT SYSTEM
        </h2>
        <p className="text-gray-400 font-mono max-w-2xl mx-auto">
          Secure, decentralized certificate issuance and verification platform
          for the digital age
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="p-8 hover:scale-105 transition-transform duration-300" glowColor={feature.color}>
              <button
                onClick={feature.action}
                className="w-full text-left space-y-4 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${
                    feature.color === 'cyan'
                      ? 'bg-cyan-400/20 text-cyan-400'
                      : 'bg-green-400/20 text-green-400'
                  }`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-100 font-mono">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-400 font-mono text-sm leading-relaxed">
                  {feature.description}
                </p>
              </button>
            </Card>
          );
        })}
      </div>

      <Card className="p-8">
        <div className="flex items-start gap-4">
          <Lock className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-green-400 font-mono mb-2">
              SECURITY FIRST
            </h3>
            <p className="text-gray-400 font-mono text-sm leading-relaxed">
              All certificates are cryptographically secured with unique identifiers.
              Our system ensures tamper-proof verification and maintains the integrity
              of all issued credentials. Built with modern security practices and
              cybersecurity standards in mind.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
