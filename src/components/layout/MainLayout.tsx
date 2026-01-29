import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import ParticlesBackground from '../ui/ParticlesBackground';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <ParticlesBackground />
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
