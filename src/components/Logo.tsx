import { Shield } from 'lucide-react';

export const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Shield className="w-10 h-10 text-cyan-400" strokeWidth={1.5} />
        <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-30"></div>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-green-400 tracking-wider font-mono">
          0x0 PIR4T3S
        </h1>
        <p className="text-xs text-cyan-400 tracking-widest font-mono">CERTIFICATE SYSTEM</p>
      </div>
    </div>
  );
};
