import { useState } from 'react';
import { Logo } from './components/Logo';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/home';
import { VerifyPage } from './pages/verify';
import { IssuePage } from './pages/issue';

type Page = 'home' | 'verify' | 'issue';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'verify':
        return <VerifyPage />;
      case 'issue':
        return <IssuePage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAxYy0yLjc2MSAwLTUgMi4yMzktNSA1czIuMjM5IDUgNSA1IDUtMi4yMzkgNS01LTIuMjM5LTUtNS01eiIgZmlsbD0iIzBmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      <div className="relative z-10">
        <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <Logo />
              <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          {renderPage()}
        </main>

        <footer className="border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm mt-20">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-center md:text-left">
              <p className="text-gray-500 font-mono text-sm">
                &copy; 2024 0x0 PIR4T3S. All rights reserved.
              </p>
              <p className="text-gray-600 font-mono text-xs">
                SECURE // DECENTRALIZED // VERIFIED
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
