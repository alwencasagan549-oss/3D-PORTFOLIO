import CanvasCursor from '@/components/CanvasCursor';
import Header from '@/components/Header';
import { HomeSection } from '@/components/HomeSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <CanvasCursor />
      <Header />
      <HomeSection />
    </div>
  );
}
