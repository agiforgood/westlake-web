'use client';

import React, {useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel,Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/mousewheel';
import { motion } from 'framer-motion';

export default function NewHomePage() {
    const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div
      className="absolute w-full h-screen overflow-hidden"
      style={{
        backgroundImage: 'url(/home_bg.png)',
        backgroundSize: 'cover',
        top:0,
        backgroundPosition: 'center',
      }}
    >
      <div className="flex items-center justify-center h-screen">
        <Swiper
          direction="vertical"
          slidesPerView={1}
          onSlideChange={swiper => setCurrentIndex(swiper.activeIndex)}
          mousewheel={{
            releaseOnEdges: true,
            thresholdDelta: 10,
            thresholdTime: 500,
          }}
          pagination={{
            clickable: true,
            type: "progressbar",
          }}
          modules={[Mousewheel, Pagination]}
          className="w-full h-screen flex items-center justify-center"
          style={{ maxWidth: 1000,padding:'0 25px' }}
        >
          <SwiperSlide style={{display:'flex'}}>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={currentIndex === 0 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center w-full">
                <span className="text-[#1a2341] text-3xl md:text-5xl font-semibold tracking-[.25em]">
                    智 能 向 善 社 会 创 新 网 络
                </span>
            </motion.div>
          </SwiperSlide>
          <SwiperSlide style={{display:'flex'}} className='items-center'>
            <div className="max-w-2xl mx-auto" style={{display:'flex',flexDirection:'column'}}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={currentIndex === 1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }} className="text-center text-2xl font-semibold text-[#1a2341] mb-6">
                以人为本，智能向善
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 40 }}
                animate={currentIndex === 1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }} className="text-base md:text-lg text-[#1a2341] leading-relaxed text-left">
                公益领域经验面临两大挑战：与前沿技术之间的现实鸿沟，以及缺乏系统的专业化创新服务。智能向善社会创新网络重在人本主义基础上的创新解决方案，致力帮助社会创新网络应对复杂挑战，推动社会正义和本体意义的兼容，协同性解决社会问题。
              </motion.div>
            </div>
          </SwiperSlide>
          <SwiperSlide style={{display:'flex'}} className='items-center'>
            <div className="max-w-2xl mx-auto" style={{display:'flex',flexDirection:'column'}}>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={currentIndex === 2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-center text-2xl font-semibold text-[#1a2341] mb-6">
                激活认知盈余，构建贡献、协作与声誉机制的社会创新网络
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={currentIndex === 2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="text-base md:text-lg text-[#1a2341] leading-relaxed text-left">
                {`正如Clay Shirky在《认知盈余》中所说:"在 digital era, people have a lot of unprecedented time and energy, if they are effectively organized, they will create huge social value." We are committed to activating "cognitive surplus" through social innovation networks, allowing the knowledge, experience, and expertise of professional volunteers to be better utilized.`}
              </motion.div>
            </div>
          </SwiperSlide>
          <SwiperSlide style={{display:'flex'}} className='items-center'>
            <div className="max-w-2xl mx-auto" style={{display:'flex',flexDirection:'column'}}>
              <div className="text-center text-2xl font-semibold text-[#1a2341] mb-6">
                共创意义的容器：超越生命的有限性
              </div>
              <div className="text-base md:text-lg text-[#1a2341] leading-relaxed text-left">
                {`坂本龙一曾说:"艺术不朽,人生短暂"。人生的短暂和脆弱无需讳言,但人生始终渴望超越。意义的共创容器,基于智能社会创新网络是这样一个让专业贡献成就他人生活、如何度量人类的幸福感、创造出超越个体的永久价值。`}
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <footer className="w-full absolute bottom-0 left-0 flex flex-col items-center pb-6 select-none">
        <div className="text-[#444] text-lg font-normal">© 2025 智能向善社会创新网络. 保留所有权利</div>
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#444] text-lg underline mt-1"
        >
          浙ICP备2025166409号-1
        </a>
      </footer>
    </div>
  );
}
