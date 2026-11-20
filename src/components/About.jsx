import { motion } from 'framer-motion';
import { profile } from '../data.js';
import { CountUp, EASE, Magnetic, Reveal, SheetHead } from './motion.jsx';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <SheetHead no="01" title="About · Profile" />
        <Reveal as="h2" className="section-title">
          PLM engineer by trade, <span className="text-lav">full stack developer</span> at heart.
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">

          {/* Bio */}
          <Reveal className="tile frame md:col-span-2 lg:row-span-2 flex flex-col justify-between gap-8 p-8">
            <div>
              <p className="label mb-5">Fig. 01 — Profile</p>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  I'm a <strong className="text-white font-semibold">PLM Teamcenter Solution Developer</strong> with {profile.experience}
                  years of hands-on experience across Teamcenter development, administration and version upgrades. That
                  includes taking Teamcenter from <span className="text-acid font-mono text-sm">11.4</span> to{' '}
                  <span className="text-acid font-mono text-sm">2506</span> on Linux for the client Tata Hitachi.
                </p>
                <p>
                  I started in PLM in 2024 as a trainee at FaithPLM. Today, at {profile.employer}, I build and run Teamcenter solutions for the client ACGL, Goa. Outside PLM, I build full-stack web apps with
                  React, Django and Python, and solve DSA problems in C++ to keep my problem-solving sharp.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Magnetic>
                <a href={profile.resume} download className="btn-primary">
                  <i className="fas fa-download text-xs" aria-hidden="true" /> Resume
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" className="btn-ghost">Get in touch</a>
              </Magnetic>
            </div>
          </Reveal>

          {/* Photo */}
          <Reveal delay={0.1} className="relative lg:row-span-2 rounded-lg overflow-hidden border border-lav/10 bg-panel group">
            <motion.img
              src="Images/profile.png"
              alt="Portrait of Devashish Deshmukh"
              className="w-full h-full object-cover aspect-[4/5] lg:aspect-auto"
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: EASE }}
            />
            {/* Crosshair frame */}
            <span className="pointer-events-none absolute inset-3 border border-acid/0 group-hover:border-acid/40 transition-colors duration-500" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-ink/90 to-transparent">
              <p className="label !text-gray-300">Fig. 02 — D. Deshmukh</p>
            </div>
          </Reveal>

          {/* LeetCode */}
          <Reveal as="a" delay={0.15} href={profile.leetcode} target="_blank" rel="noopener noreferrer" className="tile group block">
            <p className="font-display text-5xl font-bold text-acid mb-2"><CountUp to={400} suffix="+" /></p>
            <p className="text-sm text-gray-400">problems solved on LeetCode</p>
            <p className="mt-4 font-mono text-xs text-lav group-hover:text-acid transition-colors">
              View profile <i className="fas fa-arrow-up-right-from-square text-[10px]" aria-hidden="true" />
            </p>
          </Reveal>

          {/* CGPA */}
          <Reveal delay={0.2} className="tile">
            <p className="font-display text-5xl font-bold text-lav mb-2"><CountUp to={8.14} decimals={2} /></p>
            <p className="text-sm text-gray-400">CGPA · B.E. Information Technology</p>
            <p className="mt-4 font-mono text-xs text-gray-500">PRMITR, Badnera · 2020–2024</p>
          </Reveal>

          {/* Location */}
          <Reveal delay={0.1} className="tile">
            <i className="fas fa-location-dot text-ver text-xl mb-4" aria-hidden="true" />
            <p className="font-display text-xl font-semibold text-white">{profile.location}</p>
            <p className="text-sm text-gray-400 mt-1">Client project in Goa</p>
          </Reveal>

          {/* Currently */}
          <Reveal delay={0.15} className="tile">
            <p className="case-label mb-2">Currently</p>
            <p className="text-gray-300 leading-relaxed">
              Teamcenter Solution Developer at <span className="text-acid">{profile.employer}</span>, supporting the client ACGL, Goa on development and admin.
            </p>
          </Reveal>

          {/* Certifications */}
          <Reveal delay={0.2} className="tile md:col-span-2">
            <p className="case-label mb-3">Certifications</p>
            <ul className="divide-y divide-lav/10">
              {[
                ['Django Essentials', 'LinkedIn Learning', 'https://www.linkedin.com/learning/certificates/8a4c6c0710751a32195051cc20ecdd724859fe2cfa0fef91fb922db0ab693343'],
                ['C++ Fundamentals', 'Coding Ninjas', 'https://files.codingninjas.in/certificate-326952-8c97b5b59d376291f5e6f249d5f8f36f.pdf'],
              ].map(([name, by, href]) => (
                <li key={name}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 py-3 group">
                    <span><span className="text-white font-medium">{name}</span> <span className="text-sm text-gray-500">· {by}</span></span>
                    <i className="fas fa-arrow-up-right-from-square text-xs text-lav group-hover:text-acid group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
