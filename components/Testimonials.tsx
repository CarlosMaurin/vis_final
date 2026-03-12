import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { TestimonialProps } from '../types';

type TestimonialItem = TestimonialProps & {
  logo?: string;
  logoAlt?: string;
};

type TestimonialCardProps = TestimonialItem;

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  company,
  quote,
  description,
  logo,
  logoAlt,
}) => {
  const cardStyle: React.CSSProperties = {
    background: 'rgba(217, 217, 217, 0.58)',
    border: '1px solid white',
    boxShadow: '12px 17px 51px rgba(0, 0, 0, 0.22)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    borderRadius: '17px',
  };

  const unifiedText = description ? `${quote} ${description}` : quote;

  return (
    <div
      style={cardStyle}
      data-testimonial-card
      className="
        flex-shrink-0
        w-[clamp(350px,90vw,525px)]
        min-h-[clamp(340px,56vh,400px)]
        p-[clamp(16px,2.2vw,28px)]
        flex flex-col justify-between
        transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer
      "
    >
      <div className="flex flex-col h-full">
        <div className="mb-5 h-[84px] flex items-center justify-start flex-shrink-0">
          <div className="h-[84px] w-[200px] flex items-center justify-start">
            {logo ? (
              <img
                src={logo}
                alt={logoAlt || `${company} logo`}
                loading="eager"
                decoding="async"
                className="block max-h-[64px] max-w-[180px] w-auto h-auto object-contain"
                draggable={false}
              />
            ) : (
              <div className="h-[64px] w-[180px] flex items-center justify-start">
                <span className="text-[20px] md:text-[24px] font-black uppercase tracking-tight text-primary/80 leading-none">
                  {company}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex items-start">
          <p
            className="text-[clamp(12.35px,1.12vw,15.2px)] text-primary leading-[1.55] break-words"
            style={{
              fontFamily: 'LemonMilk, sans-serif',
              fontStyle: 'normal',
              fontWeight: 400,
            }}
          >
            "{unifiedText}"
          </p>
        </div>
      </div>

      <div className="mt-5 pt-5 border-t border-black/5 flex items-center justify-between flex-shrink-0">
        <span className="text-[10px] font-black uppercase text-accent tracking-tighter">
          {company}
        </span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="w-1 h-1 rounded-full bg-accent/40" />
          ))}
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  // ── Refs ──────────────────────────────────────────────────────────────────
  const containerRef   = useRef<HTMLDivElement>(null);
  const trackRef       = useRef<HTMLDivElement>(null);       // desktop only
  const mobileTrackRef = useRef<HTMLDivElement>(null);       // mobile only

  // ── Desktop scroll-jacking state (unchanged) ──────────────────────────────
  const [startScrollToCenter, setStartScrollToCenter] = useState(0);
  const [maxScrollToCenter,   setMaxScrollToCenter]   = useState(0);
  const [sectionHeightPx,     setSectionHeightPx]     = useState<number | null>(null);
  const [logosReady,          setLogosReady]           = useState(false);

  // ── Mobile UI state ────────────────────────────────────────────────────────
  const [activeCard,   setActiveCard]   = useState(0);
  const [isMobileView, setIsMobileView] = useState<boolean>(
    () => typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  // ── Testimonials data (unchanged) ─────────────────────────────────────────
  const testimonials: TestimonialItem[] = [
    {
      author: 'Fairly',
      role: 'Client',
      company: 'Fairly',
      quote:
        'As the Market Manager for Fairly (rental management platform), I rely on expert local property caretakers to be the boots-on-the-ground contacts for homeowners and guests.',
      description:
        "I am so glad I partnered with VIS Home Services to represent our Aspen market! Florencia, Geremias are professional, responsive, reliable, and deeply knowledgeable local hosts. We're excited to continue partnering with them for our new rental homes, knowing they offer extensive services and have an outstanding local reputation - they know everyone in Aspen! VIS Home Services is an invaluable asset to any rental property in town.",
      avatar: '',
      logo: 'https://res.cloudinary.com/deit2ncmp/image/upload/v1773136153/fairly_yy3vvm.png',
      logoAlt: 'Fairly logo',
    },
    {
      author: 'Elevated Escapes',
      role: 'Client',
      company: 'Elevated Escapes',
      quote: 'VIS consistently delivers exceptional housekeeping and maintenance services.',
      description:
        'Every property is left absolutely spotless after each clean, which has helped us consistently earn 5-star reviews from our guests. Their inspectors are incredibly meticulous, carefully identifying even the smallest maintenance issues and ensuring they are addressed immediately. Their attention to detail and commitment to excellence truly set them apart.',
      avatar: '',
      logo: 'https://res.cloudinary.com/deit2ncmp/image/upload/v1773136155/elevated_fguh1b.png',
      logoAlt: 'Elevated Escapes logo',
    },
    {
      author: 'Aspen Business Services',
      role: 'Client',
      company: 'Aspen Business Services',
      quote:
        'Aspen Business Services highly recommends Village Integral Services (VIS) for their exceptional professionalism and technical competence.',
      description:
        'From routine maintenance to time-sensitive repairs, their team consistently delivers dependable results across our residential and commercial portfolios. They are a reliable partner that directly contributes to operational stability and tenant satisfaction.',
      avatar: '',
      logo: 'https://res.cloudinary.com/deit2ncmp/image/upload/v1773136153/aspen_business_services_hjrtfw.png',
      logoAlt: 'Aspen Business Services logo',
    },
    {
      author: 'Aspen Leisure',
      role: 'Client',
      company: 'Aspen Leisure Co',
      quote:
        'We have worked with VIS for many years, and they have been an essential part of our growth in the vacation rental space. As we expanded our portfolio, they did not just keep up - they partnered with us to make it possible.',
      description:
        "Their team is consistently reliable, detail-oriented, and professional, which is critical in the vacation rental business where every turnover matters. In a business and location where perfection matters, they are always listening and improving. We cannot recommend them enough!",
      avatar: '',
      logo: 'https://res.cloudinary.com/deit2ncmp/image/upload/v1773160653/aspen_leisure_gnql1s.png',
      logoAlt: 'Aspen Leisure logo',
    },
  ];

  // ── Logo preload (unchanged) ───────────────────────────────────────────────
  const logoUrls = useMemo(() => {
    return testimonials
      .map((item) => item.logo)
      .filter((logo): logo is string => Boolean(logo));
  }, [testimonials]);

  useEffect(() => {
    if (logoUrls.length === 0) { setLogosReady(true); return; }
    let isCancelled = false;
    const preloadLogos = async () => {
      try {
        await Promise.all(
          logoUrls.map(
            (src) => new Promise<void>((resolve) => {
              const img = new Image();
              img.onload = () => resolve();
              img.onerror = () => resolve();
              img.src = src;
            })
          )
        );
        if (!isCancelled) setLogosReady(true);
      } catch {
        if (!isCancelled) setLogosReady(true);
      }
    };
    preloadLogos();
    return () => { isCancelled = true; };
  }, [logoUrls]);

  // ── Track isMobileView on resize ──────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobileView(window.innerWidth < 768);
    window.addEventListener('resize', check);
    window.addEventListener('orientationchange', check);
    return () => {
      window.removeEventListener('resize', check);
      window.removeEventListener('orientationchange', check);
    };
  }, []);

  // ── calculateBounds: desktop unchanged, mobile = auto height ─────────────
  const calculateBounds = useCallback(() => {
    const viewportWidth  = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const isMobile       = viewportWidth < 768;

    if (isMobile) {
      // Mobile uses natural document flow — no fixed height needed
      setStartScrollToCenter(0);
      setMaxScrollToCenter(0);
      setSectionHeightPx(null);
      return;
    }

    // ── Desktop: original logic, completely unchanged ──
    if (!trackRef.current) return;

    const cards = Array.from(
      trackRef.current.querySelectorAll<HTMLElement>('[data-testimonial-card]')
    );

    if (cards.length === 0) {
      const fallbackMax = Math.max(0, trackRef.current.scrollWidth - viewportWidth);
      setStartScrollToCenter(0);
      setMaxScrollToCenter(fallbackMax);
      const intro      = viewportHeight * 0.9;
      const horizontal = fallbackMax * 1.35;
      const extra      = viewportHeight * 0.55;
      setSectionHeightPx(viewportHeight + intro + horizontal + extra);
      return;
    }

    const first = cards[0];
    const last  = cards[cards.length - 1];

    const centerOffset = (el: HTMLElement) => {
      const left  = el.offsetLeft;
      const width = el.offsetWidth;
      return left + width / 2 - viewportWidth / 2;
    };

    const start = Math.max(0, centerOffset(first));
    const end   = Math.max(start, centerOffset(last));

    setStartScrollToCenter(start);
    setMaxScrollToCenter(end);

    const intro      = viewportHeight * 0.9;
    const horizontal = (end - start) * 1.35;
    const extra      = viewportHeight * 0.55;
    setSectionHeightPx(viewportHeight + intro + horizontal + extra);
  }, []);

  useEffect(() => {
    if (!logosReady) return;
    calculateBounds();
    const t1 = setTimeout(calculateBounds, 120);
    const t2 = setTimeout(calculateBounds, 300);
    window.addEventListener('resize', calculateBounds);
    window.addEventListener('orientationchange', calculateBounds);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', calculateBounds);
      window.removeEventListener('orientationchange', calculateBounds);
    };
  }, [logosReady, calculateBounds]);

  // ── Desktop scroll transforms (all unchanged) ─────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 30,
    restDelta: 0.001,
  });

  const titleOpacity = useTransform(smoothProgress, [0, 0.06, 0.18, 0.3], [0, 1, 1, 0]);
  const titleScale   = useTransform(smoothProgress, [0.18, 0.3], [1, 0.7]);
  const titleY       = useTransform(smoothProgress, [0, 0.06], ['80px', '0px']);

  const desktopCardsY       = useTransform(smoothProgress, [0.12, 0.32], ['100vh', '0vh']);
  const desktopCardsOpacity = useTransform(smoothProgress, [0.18, 0.3],  [0, 1]);

  const desktopHorizontalX = useTransform(
    smoothProgress,
    [0, 0.34, 0.42, 0.90],
    [
      `-${startScrollToCenter}px`,
      `-${startScrollToCenter}px`,
      `-${startScrollToCenter}px`,
      `-${maxScrollToCenter}px`,
    ]
  );

  const holdAfterLastOpacity = useTransform(smoothProgress, [0.88, 0.90, 1], [1, 1, 0]);
  const scrollHintOpacity    = useTransform(
    smoothProgress,
    [0.28, 0.36, 0.86, 0.94],
    [0, 0.4, 0.4, 0]
  );

  // ── Section height: auto on mobile, calculated on desktop ─────────────────
  const sectionStyle = useMemo<React.CSSProperties>(() => {
    if (isMobileView) return {};
    return sectionHeightPx ? { height: `${sectionHeightPx}px` } : { height: '640vh' };
  }, [sectionHeightPx, isMobileView]);

  // ── Mobile: detect active card from scroll position ───────────────────────
  const handleMobileScroll = useCallback(() => {
    if (!mobileTrackRef.current) return;
    const container = mobileTrackRef.current;
    const snapCards = Array.from(
      container.querySelectorAll<HTMLElement>('[data-snap-card]')
    );
    if (snapCards.length === 0) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let closestDist  = Infinity;

    snapCards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - containerCenter);
      if (dist < closestDist) { closestDist = dist; closestIndex = i; }
    });

    setActiveCard(closestIndex);
  }, []);

  // ── Mobile: programmatic scroll to card ───────────────────────────────────
  const scrollToCard = useCallback((index: number) => {
    if (!mobileTrackRef.current) return;
    const clamped   = Math.max(0, Math.min(index, testimonials.length - 1));
    const snapCards = Array.from(
      mobileTrackRef.current.querySelectorAll<HTMLElement>('[data-snap-card]')
    );
    if (snapCards[clamped]) {
      snapCards[clamped].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [testimonials.length]);

  // ── Arrow colours ──────────────────────────────────────────────────────────
  const GREEN = '#16a34a';
  const GRAY  = 'rgba(0,0,0,0.18)';
  const leftColor  = activeCard > 0                        ? GREEN : GRAY;
  const rightColor = activeCard < testimonials.length - 1  ? GREEN : GRAY;

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="relative bg-cream"
      style={sectionStyle}
    >

      {/* ══════════════════════════════════════════════════════════════════
          DESKTOP — sticky scroll-jacking, 100% original, zero changes
      ══════════════════════════════════════════════════════════════════ */}
      <div className="sticky top-0 h-screen w-full hidden md:flex flex-col items-center justify-center overflow-hidden pt-[clamp(72px,10vh,120px)]">

        <motion.div
          style={{ opacity: titleOpacity, scale: titleScale, y: titleY }}
          className="absolute z-20 text-center pointer-events-none w-full"
        >
          <h3 className="text-8xl font-black text-primary tracking-[0.4em] uppercase mb-4 drop-shadow-sm pl-[0.4em]">
            TESTIMONIALS
          </h3>
          <motion.div
            className="h-1.5 bg-accent mx-auto rounded-full"
            style={{ width: '120px' }}
          />
        </motion.div>

        <div className="relative z-10 w-full">
          <motion.div style={{ y: desktopCardsY, opacity: desktopCardsOpacity }}>
            <motion.div
              ref={trackRef}
              style={{ x: desktopHorizontalX }}
              className="flex gap-[clamp(14px,3vw,40px)] px-[clamp(18px,10vw,25vw)] py-10 w-max"
            >
              {testimonials.map((t, i) => (
                <TestimonialCard key={i} {...t} />
              ))}
              <div className="flex-shrink-0 w-[5vw]" />
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-12 w-48 h-0.5 bg-dark/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
          />
        </div>

        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-16 text-[10px] font-black tracking-[0.5em] uppercase text-dark/30"
        >
          Keep scrolling to see all stories
        </motion.div>

        <motion.div
          style={{ opacity: holdAfterLastOpacity }}
          className="absolute top-6 right-6 text-[10px] font-black tracking-[0.25em] uppercase text-dark/20"
        >
          Scroll to continue
        </motion.div>
      </div>


      {/* ══════════════════════════════════════════════════════════════════
          MOBILE — normal document flow, native horizontal swipe
      ══════════════════════════════════════════════════════════════════ */}
      <div className="md:hidden w-full flex flex-col items-center pt-[clamp(72px,10vh,100px)] pb-16">

        {/* Title: fade + slide up on scroll into view */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center w-full mb-10 pointer-events-none"
        >
          <h3 className="text-[30px] font-black text-primary tracking-[0.4em] uppercase mb-4 drop-shadow-sm pl-[0.4em]">
            TESTIMONIALS
          </h3>
          <div className="h-1.5 bg-accent mx-auto rounded-full" style={{ width: '120px' }} />
        </motion.div>

        {/* Cards area: fade + slide up on scroll into view */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.15 }}
          className="w-full flex flex-col items-center"
        >

          {/* ── Arrow indicators ─────────────────────────────────────── */}
          <div className="flex items-center justify-center gap-10 mb-4">

            {/* Left arrow */}
            <button
              aria-label="Previous testimonial"
              onClick={() => scrollToCard(activeCard - 1)}
              disabled={activeCard === 0}
              style={{
                color:      leftColor,
                transition: 'color 0.35s ease',
                background: 'none',
                border:     'none',
                padding:    '6px 10px',
                cursor:     activeCard === 0 ? 'default' : 'pointer',
              }}
            >
              <svg width="28" height="14" viewBox="0 0 28 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="27" y1="7" x2="1" y2="7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                <polyline points="7,1 1,7 7,13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Right arrow */}
            <button
              aria-label="Next testimonial"
              onClick={() => scrollToCard(activeCard + 1)}
              disabled={activeCard === testimonials.length - 1}
              style={{
                color:      rightColor,
                transition: 'color 0.35s ease',
                background: 'none',
                border:     'none',
                padding:    '6px 10px',
                cursor:     activeCard === testimonials.length - 1 ? 'default' : 'pointer',
              }}
            >
              <svg width="28" height="14" viewBox="0 0 28 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="1" y1="7" x2="27" y2="7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                <polyline points="21,1 27,7 21,13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

          </div>

          {/* ── Horizontal scroll track ───────────────────────────────── */}
          <style>{`.vis-mobile-track::-webkit-scrollbar { display: none; }`}</style>
          <div
            ref={mobileTrackRef}
            onScroll={handleMobileScroll}
            className="vis-mobile-track flex gap-[16px] py-4 w-full"
            style={{
              overflowX: 'scroll',
              overflowY: 'hidden',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              paddingLeft:  'calc(50vw - 45vw)',
              paddingRight: 'calc(50vw - 45vw)',
            }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                data-snap-card
                style={{ scrollSnapAlign: 'center', flexShrink: 0 }}
              >
                <TestimonialCard {...t} />
              </div>
            ))}
            {/* trailing spacer so last card centres properly */}
            <div style={{ flexShrink: 0, width: '12vw' }} />
          </div>

          {/* ── Dot pagination ────────────────────────────────────────── */}
          <div className="flex items-center justify-center gap-[10px] mt-5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => scrollToCard(i)}
                style={{
                  width:        i === activeCard ? '22px' : '8px',
                  height:       '8px',
                  borderRadius: '4px',
                  background:   i === activeCard ? GREEN : GRAY,
                  border:       'none',
                  padding:      0,
                  cursor:       'pointer',
                  transition:   'width 0.3s ease, background 0.3s ease',
                  flexShrink:   0,
                }}
              />
            ))}
          </div>

        </motion.div>
      </div>

    </section>
  );
};

export default Testimonials;
