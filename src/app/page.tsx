import Stats from '@/components/Stats';
import Features from '@/components/Features';
import About from '@/components/About';
import Footer from '@/components/Footer';
import ScrollButton from '@/components/ScrollButton';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-white text-black relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-8 leading-tight">
              西湖区智能向善社会创新网络中心
            </h1>
            <p className="text-xl mb-12 leading-relaxed max-w-3xl mx-auto">
              我们是一个以技术为驱动的非营利组织，致力于通过技术手段动员志愿者，解决重大社会问题。我们相信，正如 Clay Shirky 在《认知盈余》中所说，当人们能够自由地贡献自己的时间和才能时，将会产生巨大的社会价值。
            </p>
            <ScrollButton />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div id="stats">
        <Stats />
      </div>

      {/* Features Section */}
      <Features />

      {/* About Section */}
      <About />

      {/* Footer */}
      <Footer />
    </div>
  );
}
