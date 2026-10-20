'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { canOptimizeImage } from '@/lib/image'
import { getBanners } from '@/lib/supabase'

export type SlideData = {
  id: string
  tag?: string
  title: string
  subtitle: string
  price?: number
  oldPrice?: number
  btnText: string
  link: string
  image: string
  bgClass: string
  textClass: string
}

// Shown only while no banners are configured in the admin panel
const DEFAULT_SLIDES: SlideData[] = [
  {
    id: 's1',
    tag: '13% OFF',
    title: 'Resma Boreal A4',
    subtitle: '75 gr, 210 x 297 mm, 500 hojas',
    price: 8750,
    oldPrice: 10100,
    btnText: 'Comprar ahora',
    link: '/productos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ10Ct4tw9XL2fw_yIOyGvFLphaVTcmLkO7hIeSB_9b3HLCEse6D_sfo55z9a2nTKgh6In-qoE87v38W7h2KvvebNdWwpXKo9dOmBRR2kVfs7mqKgGzdKCsZf-0iXu9MPBnf83SslHZtXoEZK_wlCTbrns_Am7e_oDt3rgQFozF2aRfBSkRtwsej4fD2gDe33OKliJNAZCQ-BSl8qqp6AV_Kbj4-H5313tb8DpbN0Z_neRhbC4VelSzA',
    bgClass: 'bg-gradient-to-r from-primary to-[#5a1030]',
    textClass: 'text-on-primary'
  },
  {
    id: 's2',
    tag: '15% OFF',
    title: 'Cartulinas Color',
    subtitle: '180 gr, 50 x 70 cm, pack x 10',
    price: 11900,
    oldPrice: 14000,
    btnText: 'Comprar ahora',
    link: '/productos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMVTu4NDQxqzxdPlq6F3L7XQgQLuz4wATeLc48Gbl9AUaDWpt_HypAm6bT4SujZ9aCoGZbEwqwUEzA4xVwMs9qSgae1NHEgN2JJookL4GXt_XzY15m-iBcRyk5ByybFpAJd6TxOV3rif1CzJVr1m5kdPSx7ItNoiq0HQA7013yAvk-cFVLFYRhO7jdcSQpAyK-r4YBkXhzD0zMRlUV6__UNIwKCpV_eZHWtqHJryRB_BG0MWP1xpVChw',
    bgClass: 'bg-gradient-to-r from-[#D9A05B] to-[#b37a34]',
    textClass: 'text-white'
  },
  {
    id: 's3',
    title: 'Todo el papel que tu negocio necesita.',
    subtitle: 'Distribución mayorista y minorista. Más de 40 años acompañando tus proyectos.',
    btnText: 'Ver catálogo',
    link: '/productos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBs7jy4gjWk1I3alH-cllWekfACwT6aE-h2LvQ_15uvX3d5WYGFdi86vsp_Iqkpb0nGT2CP__a_TIti-v51JqyqU20t_2zxUYa-xzbZZvO4BPb-PCo0fqeTvSiKGPq44GYPpCzt2W9DBp7qITVGsZ2ftf0DRVY4jhZylwPJW4FiyAVX8WRUrAILSZf1dkthyP0egLlCWrHlVk15Tb1uBhpwzCiMgfLLoCBkv2XN-PP7',
    bgClass: 'bg-gradient-to-r from-surface-container-high to-surface-container-highest',
    textClass: 'text-on-surface'
  }
]

const BG_PRESETS = [
  { bgClass: 'bg-gradient-to-r from-primary to-[#5a1030]', textClass: 'text-on-primary' },
  { bgClass: 'bg-gradient-to-r from-[#D9A05B] to-[#b37a34]', textClass: 'text-white' },
  { bgClass: 'bg-gradient-to-r from-surface-container-high to-surface-container-highest', textClass: 'text-on-surface' },
]

export function BannerCarousel() {
  const [slides, setSlides] = useState<SlideData[]>(DEFAULT_SLIDES)

  useEffect(() => {
    getBanners().then((rows) => {
      if (!rows.length) return
      setSlides(
        rows.map((b, i) => ({
          id: b.id,
          tag: b.badge || undefined,
          title: b.title,
          subtitle: b.subtitle || '',
          btnText: 'Ver más',
          link: b.link_url || '/productos',
          image: b.image_url,
          ...BG_PRESETS[i % BG_PRESETS.length],
        }))
      )
      setCurrentIndex(0)
    })
  }, [])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount)

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [])

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return

    if (!isHovered) {
      const timer = setInterval(goToNext, 5000)
      return () => clearInterval(timer)
    }
  }, [isHovered, goToNext])

  return (
    <section 
      className="relative w-full h-[280px] md:h-[380px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-roledescription="carousel"
    >
      <div 
        className="flex w-full h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`w-full h-full shrink-0 ${slide.bgClass} flex items-center justify-center relative overflow-hidden`}
            aria-hidden={currentIndex !== index}
          >
            {/* Decal background effect for extra punch */}
            <div className="absolute -right-20 -bottom-20 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-[1280px] w-full mx-auto px-4 md:px-12 h-full flex items-center justify-between gap-3 relative z-10">
              
              {/* Content Left */}
              <div className="flex-[1.3] md:flex-1 min-w-0 flex flex-col items-start pb-6 md:pb-0 md:pt-0 max-w-lg">
                {slide.tag && (
                  <span className="bg-secondary text-on-secondary font-label-md text-label-lg font-bold px-3 md:px-4 py-1 md:py-1.5 rounded-full uppercase tracking-widest mb-2 md:mb-4 shadow-lg animate-fade-in">
                    {slide.tag}
                  </span>
                )}
                
                <h2 className={`font-headline-lg md:font-headline-xl text-2xl sm:text-3xl md:text-[54px] leading-tight font-extrabold mb-1 md:mb-2 tracking-tight ${slide.textClass}`}>
                  {slide.title}
                </h2>
                
                <p className={`font-body-md text-sm md:text-lg mb-3 md:mb-6 opacity-90 line-clamp-3 ${slide.textClass}`}>
                  {slide.subtitle}
                </p>

                {slide.price && slide.oldPrice && (
                  <div className={`flex items-end gap-2 md:gap-3 mb-3 md:mb-6 ${slide.textClass}`}>
                    <span className="text-2xl md:text-[42px] font-bold leading-none tracking-tighter">
                      {formatMoney(slide.price)}
                    </span>
                    <span className="text-sm md:text-xl line-through opacity-70 mb-0.5">
                      {formatMoney(slide.oldPrice)}
                    </span>
                  </div>
                )}

                <Link 
                  href={slide.link}
                  className={`bg-surface-container-lowest text-on-surface hover:scale-105 hover:shadow-xl px-5 py-2 md:px-8 md:py-3 rounded-full font-label-md text-label-lg font-bold transition-all shadow-md`}
                  tabIndex={currentIndex === index ? 0 : -1}
                >
                  {slide.btnText}
                </Link>
              </div>

              {/* Image Right */}
              <div className="flex flex-[0.9] md:flex-1 relative h-full justify-end items-center md:mr-8 pb-6 md:pb-0">
                {slide.price ? (
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="object-contain h-[70%] md:h-[85%] w-auto max-w-[100%] rounded-xl md:rounded-2xl mix-blend-multiply drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-[100%] h-[70%] md:h-[85%] right-0 absolute rounded-xl md:rounded-2xl overflow-hidden shadow-2xl bg-black/10">
                    {/* Blurred backdrop only needs a tiny version of the image */}
                    <Image
                      fill
                      src={slide.image}
                      alt=""
                      aria-hidden="true"
                      sizes="64px"
                      unoptimized={!canOptimizeImage(slide.image)}
                      className="object-cover scale-110 blur-2xl opacity-60"
                    />
                    <Image
                      fill
                      src={slide.image}
                      alt={slide.title}
                      priority={index === 0}
                      sizes="(max-width: 768px) 45vw, 600px"
                      unoptimized={!canOptimizeImage(slide.image)}
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={goToPrev}
        aria-label="Slide anterior"
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white text-white hover:text-black backdrop-blur-md rounded-full shadow-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 md:opacity-100 z-20"
      >
        <span className="material-symbols-outlined text-[24px]">chevron_left</span>
      </button>
      
      <button 
        onClick={goToNext}
        aria-label="Siguiente slide"
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white text-white hover:text-black backdrop-blur-md rounded-full shadow-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 md:opacity-100 z-20"
      >
        <span className="material-symbols-outlined text-[24px]">chevron_right</span>
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
        {slides.map((slide, index) => (
          <button
            key={`dot-${slide.id}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir al slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${
              currentIndex === index 
                ? 'bg-white w-8' 
                : 'bg-white/40 w-2.5 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
