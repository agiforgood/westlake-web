import Stats from '@/components/Stats';
import Features from '@/components/Features';
import About from '@/components/About';
import Footer from '@/components/Footer';
import ScrollButton from '@/components/ScrollButton';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative pt-16">
        {/* Background pattern layer */}
        <div className="absolute inset-0 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50 opacity-70"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
              西湖区智能向善社会创新网络中心
            </h1>
            <p className="text-xl mb-12 leading-relaxed max-w-3xl mx-auto text-gray-700">
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
