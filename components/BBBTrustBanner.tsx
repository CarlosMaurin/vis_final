import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, ShieldCheck, Eye, MessageSquareReply, ArrowUpRight } from 'lucide-react';

const trustPillars = [
  { icon: ShieldCheck, label: 'Honesty' },
  { icon: Eye, label: 'Transparency' },
  { icon: MessageSquareReply, label: 'Responsiveness' },
];

const BBBTrustBanner: React.FC = () => {
  return (
    <section className="relative px-6 py-8 md:py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative isolate overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-primary/12 bg-gradient-to-br from-white via-[#F7FBFA] to-[#EEF6F3] shadow-[0_18px_60px_rgba(49,103,101,0.08)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,168,122,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(49,103,101,0.10),transparent_28%)]" />
          <div
            className="absolute inset-0 opacity-[0.045] mix-blend-multiply"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'180\' height=\'180\' viewBox=\'0 0 180 180\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'180\' height=\'180\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
            }}
          />

          <div className="relative z-10 grid items-center gap-7 px-5 py-6 sm:px-7 md:grid-cols-[auto,1fr] md:gap-8 md:px-10 md:py-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: -16 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto md:mx-0"
            >
              <div className="relative rounded-[1.6rem] border border-primary/10 bg-white/80 backdrop-blur-md shadow-[0_14px_40px_rgba(46,45,58,0.08)] px-5 py-4 sm:px-6 sm:py-5">
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 md:left-5 md:translate-x-0 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-3 py-1.5 shadow-sm">
                  <BadgeCheck className="w-3.5 h-3.5 text-primary" />
                  <span className="font-lemonmilk text-[9px] sm:text-[10px] tracking-[0.24em] text-primary uppercase whitespace-nowrap">
                    Trusted Standard
                  </span>
                </div>

                <img
                  src="https://res.cloudinary.com/deit2ncmp/image/upload/v1773229394/BBB_pdeeby.png"
                  alt="Better Business Bureau Accreditation"
                  className="h-[82px] w-auto sm:h-[94px] md:h-[108px] object-contain mt-3"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-center md:text-left"
            >
              <p className="font-lemonmilk text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-primary/85 mb-3">
                Better Business Bureau Accreditation
              </p>

              <h3 className="font-lemonmilk text-dark leading-[1.1] tracking-[0.06em] uppercase text-[clamp(1rem,1.3vw,1.5rem)] max-w-3xl mx-auto md:mx-0">
                A Commitment to Integrity Our Clients Can Feel at Every Step
              </h3>

              <p className="mt-3.5 text-dark/72 font-body text-[clamp(0.9rem,1vw,1rem)] leading-[1.72] max-w-3xl mx-auto md:mx-0">
                Being BBB Accredited reflects a proven commitment to honest communication, transparent business practices, and responsive service. For our clients, it is an added signal that they are working with a team that values trust, protects sensitive information, and follows through on every promise with professionalism and care.
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3">
                {trustPillars.map(({ icon: Icon, label }, index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.45, delay: 0.16 + index * 0.08 }}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/12 bg-white/70 px-3.5 py-2 text-dark/88 shadow-[0_10px_24px_rgba(46,45,58,0.04)] backdrop-blur-sm"
                  >
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="font-lemonmilk text-[10px] sm:text-[10.5px] tracking-[0.18em] uppercase">
                      {label}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 inline-flex items-center gap-2 text-primary/80">
                <ArrowUpRight className="w-4 h-4" />
                <span className="font-body text-[0.86rem] tracking-[0.02em]">
                  A visible standard of trust, accountability, and client care.
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BBBTrustBanner;
