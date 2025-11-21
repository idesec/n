import { useState, FormEvent } from 'react';
import { Shield, LogIn } from 'lucide-react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAdmin } from '../contexts/AdminContext';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
}

export const AdminLoginPage = ({ onLoginSuccess }: AdminLoginPageProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAdmin();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    const success = login(username, password);
    if (success) {
      onLoginSuccess();
    } else {
      setError('Invalid credentials');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAxYy0yLjc2MSAwLTUgMi4yMzktNSA1czIuMjM5IDUgNSA1IDUtMi4yMzkgNS01LTIuMjM5LTUtNS01eiIgZmlsbD0iIzBmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Shield className="w-16 h-16 text-cyan-400" strokeWidth={1.5} />
              <div className="absolute inset-0 bg-cyan-400 blur-2xl opacity-30"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-green-400 font-mono mb-2 tracking-wider">
            ADMIN ACCESS
          </h1>
          <p className="text-gray-400 font-mono text-sm">
            Secure authentication required
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            {error && (
              <div className="bg-red-400/10 border border-red-400/30 rounded-lg p-3">
                <p className="text-red-400 text-sm font-mono">{error}</p>
              </div>
            )}

            <Button type="submit" variant="primary" className="w-full">
              <LogIn className="w-5 h-5 inline-block mr-2" />
              LOGIN
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
