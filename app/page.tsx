import { HomeSection } from '@/components/HomeSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* AC Logo */}
          <div className="text-2xl font-bold font-mono text-cyan-400 glow-cyan">AC</div>
          
          {/* Navigation Links */}
          <div className="flex gap-8">
            <a href="#home" className="text-gray-400 font-mono text-sm">Home</a>
          </div>
        </div>
      </nav>

      {/* Home Section */}
      <HomeSection />
    </div>
  );
}
