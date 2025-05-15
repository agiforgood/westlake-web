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
        backgroundImage: 'url(/home_bg.webp)',
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
                <span className="text-[#1a2341] text-center text-3xl md:text-5xl font-semibold tracking-[.25em]">
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
                公益领域始终面临两大挑战：与前沿技术之间的观念鸿沟，以及缺乏高效的专业志愿者网络。这导致许多社会问题虽有人关注，却难有创新性解决方案。智能向善社会创新网络正是为此而生：让公益插上AI技术的翅膀，创造性地解决社会问题。
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
                {`正如Clay Shirky在《认知盈余》中所说："在数字时代，人们拥有大量闲暇时间和认知能力，如果被有效组织，将创造巨大的社会价值。"这一洞察启发我们创造性地提出"得道易助"理念——从“得道多助”的道德感召走向“得道易助”的机制创新。我们不只追求让公益事业获得支持，更致力于创造让专业志愿者的"助人"体验变得轻松美好。`}
              </motion.div>
            </div>
          </SwiperSlide>
          <SwiperSlide style={{display:'flex'}} className='items-center'>
            <div className="max-w-2xl mx-auto" style={{display:'flex',flexDirection:'column'}}>
              <div className="text-center text-2xl font-semibold text-[#1a2341] mb-6">
              共创意义的容器：超越生命的有限性
              </div>
              <div className="text-base md:text-lg text-[#1a2341] leading-relaxed text-left">
                {`坂本龙一曾说"艺术千秋，人生朝露"，人生如朝露般短暂易逝，但人类始终渴望超越生命的有限性。智能向善社会创新网络正是这样一个让每份贡献都被看见、被记录、被放大的"意义容器"。志愿者能真切地看到自己如何改变他人生活、如何融入更大的智慧洪流，创造出超越个体的持久价值。`}
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
