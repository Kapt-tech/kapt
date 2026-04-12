"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const cards = [
  {
    title: "Descoberta",
    copy: "Fotos encontradas com precisão. Atletas chegam direto ao seu trabalho.",
  },
  {
    title: "Venda",
    copy: "Checkout direto. Experiência premium. Conversão sem ruído.",
  },
  {
    title: "Vitrine",
    copy: "Seu portfólio aparece onde o atleta já está: a cobertura.",
  },
];

const flow = ["Capture", "Kapt AI", "Publicação", "Venda"];

const gallery = [
  { src: "/images/sobre/running.jpg" },
  { src: "/images/sobre/crossfit.jpg" },
  { src: "/images/sobre/beach-tennis.jpg" },
];

const sections = ["Início", "Manifesto", "Kapt", "Visual", "Fluxo", "Cadastro"];

function SectionHeadline({
  text,
  tone = "white",
}: {
  text: string;
  tone?: "white" | "volt";
}) {
  if (tone === "volt") {
    return (
      <span className="kapt-headline-stack kapt-headline-stack-volt">
        <span className="kapt-headline-base kapt-headline-base-volt-gradient">{text}</span>
      </span>
    );
  }

  return (
    <span className="kapt-headline-stack">
      <span className="kapt-headline-base kapt-headline-base-soft-gradient">{text}</span>
      <span aria-hidden="true" className="kapt-headline-scan">
        {text}
      </span>
    </span>
  );
}

export default function SobreClient() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [isFastScroll, setIsFastScroll] = useState(false);
  const lastScrollRef = useRef({ top: 0, time: 0 });
  const fastTimeoutRef = useRef<number | null>(null);
  const activeSectionRef = useRef(0);

  useEffect(() => {
    const container = scrollerRef.current;
    if (container == null) return;

    const revealTargets = Array.from(container.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting === false) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    revealTargets.forEach((el) => observer.observe(el));

    const parallaxTargets = Array.from(container.querySelectorAll<HTMLElement>("[data-parallax]"));
    const sectionTargets = Array.from(container.querySelectorAll<HTMLElement>("[data-section]"));

    let raf = 0;
    const onScroll = () => {
      if (raf > 0) return;
      raf = window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const now = performance.now();
        const last = lastScrollRef.current;
        const delta = Math.abs(scrollTop - last.top);
        const dt = now - (last.time || now);
        const velocity = dt > 0 ? delta / dt : 0;
        if (velocity > 1.2) {
          setIsFastScroll(true);
          if (fastTimeoutRef.current) {
            window.clearTimeout(fastTimeoutRef.current);
          }
          fastTimeoutRef.current = window.setTimeout(() => {
            setIsFastScroll(false);
          }, 180);
        }
        lastScrollRef.current = { top: scrollTop, time: now };

        const viewportHeight = window.innerHeight;
        const containerRect = container.getBoundingClientRect();
        const containerTop = scrollTop + containerRect.top;
        const maxScroll = Math.max(container.offsetHeight - viewportHeight, 1);
        const relativeScroll = Math.min(Math.max(scrollTop - containerTop, 0), maxScroll);
        const progress = Math.min(relativeScroll / maxScroll, 1);
        container.style.setProperty("--scroll-progress", progress.toString());

        revealTargets.forEach((el) => {
          if (el.classList.contains("is-visible")) return;
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportHeight * 0.88 && rect.bottom >= viewportHeight * 0.08) {
            el.classList.add("is-visible");
            observer.unobserve(el);
          }
        });

        parallaxTargets.forEach((el) => {
          const speed = Number(el.dataset.parallax ?? "0.2");
          const rect = el.getBoundingClientRect();
          const distanceFromCenter = rect.top + rect.height / 2 - viewportHeight / 2;
          el.style.transform = `translate3d(0, ${distanceFromCenter * speed * -0.18}px, 0)`;
        });

        let nextSection = activeSectionRef.current;
        let closestDistance = Number.POSITIVE_INFINITY;
        sectionTargets.forEach((section) => {
          const index = Number(section.getAttribute("data-section"));
          if (Number.isNaN(index)) return;
          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top + rect.height / 2 - viewportHeight / 2);
          if (distance < closestDistance) {
            closestDistance = distance;
            nextSection = index;
          }
        });

        if (nextSection !== activeSectionRef.current) {
          activeSectionRef.current = nextSection;
          setActiveSection(nextSection);
        }

        raf = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf > 0) window.cancelAnimationFrame(raf);
      if (fastTimeoutRef.current) {
        window.clearTimeout(fastTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={scrollerRef}
      className={`relative overflow-x-hidden ${
        isFastScroll ? "kapt-fast" : ""
      }`}
    >
      <div className="pointer-events-none fixed left-0 top-0 z-30 h-[2px] w-full bg-white/10">
        <div
          className="h-full w-full origin-left bg-actionVolt/80 transition-transform duration-150"
          style={{ transform: "scaleX(var(--scroll-progress))" }}
        />
      </div>

      <div className="pointer-events-none fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-4 md:flex">
        {sections.map((label, index) => (
          <div key={label} className="flex items-center gap-3">
            <span
              className="h-[2px] transition-all"
              style={{
                width: "52px",
                backgroundColor: activeSection === index ? "#ceff00" : "rgba(255,255,255,0.34)",
              }}
            />
            <span
              className={`text-[10px] font-mono uppercase tracking-[0.4em] ${
                activeSection === index ? "text-actionVolt" : "text-white/35"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <section
        className="relative min-h-[100vh] snap-start overflow-hidden bg-[#050505]"
        data-section="0"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,_rgba(206,255,0,0.16),_transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,_rgba(255,255,255,0.08),_transparent_55%)]" />
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-45 motion-reduce:hidden"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/sobre/running.jpg"
            aria-hidden="true"
          >
            <source src="/videos/sobre/runner-park-720.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-0 bg-[url('/images/sobre/running.jpg')] bg-cover bg-center opacity-45"
            data-parallax="0.35"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0.15)_0%,_rgba(0,0,0,0.75)_65%,_rgba(0,0,0,0.95)_100%)]" />
        </div>
        <div
          className="absolute right-[-5%] top-16 text-[14vw] font-black uppercase tracking-[0.08em] text-white/5"
          data-parallax="0.12"
        >
          KAPT
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 pt-8 md:pt-10 pb-12">
          <div className="max-w-2xl space-y-6">
            <p className="pt-8 text-[11px] font-mono uppercase tracking-[0.45em] text-actionVolt/90">
              Pré-lançamento para fotógrafos
            </p>
            <h2
              className="kapt-reveal kapt-shock text-4xl md:text-6xl font-black tracking-[0.18em] uppercase text-white"
              data-reveal
            >
              <SectionHeadline text="Fotografia esportiva com presença." />
            </h2>
            <p className="kapt-reveal text-base md:text-lg text-white/80" data-reveal>
              Kapt é a vitrine premium da cobertura esportiva. Clareza, velocidade e uma estética
              que valoriza seu trabalho.
            </p>
            <div className="kapt-reveal flex flex-wrap items-center gap-4" data-reveal>
              <Link
                href="/fotografar"
                className="relative inline-flex items-center justify-center rounded-md bg-actionVolt px-11 py-4 text-[12px] md:text-sm font-black uppercase tracking-[0.3em] text-black shadow-[0_0_42px_rgba(206,255,0,0.7)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_0_65px_rgba(206,255,0,0.95)] [animation:kapt-glow_3.2s_ease-in-out_infinite] hover:[animation-play-state:paused]"
              >
                <span className="relative z-10">Quero fotografar</span>
                <span className="pointer-events-none absolute inset-0 rounded-md bg-white/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="pointer-events-none absolute inset-0 rounded-md border border-black/10" />
              </Link>
              <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-white/70">
                Cadastro prioritário
              </span>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.5em] text-white/60">
            <span className="h-px" style={{ width: "88px", backgroundColor: "rgba(255,255,255,0.42)" }} />
            Role para explorar
            <span className="h-4 w-4 rounded-full border border-white/35 [animation:kapt-scroll-cue_1.6s_ease-in-out_infinite] motion-reduce:animate-none" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-white/20 bg-[#0a0a0a]">
          <div className="kapt-marquee flex w-[220%] items-center gap-10 py-4 text-[11px] font-mono uppercase tracking-[0.45em] text-white/55">
            {Array.from({ length: 14 }).map((_, index) => (
              <span key={index} className="whitespace-nowrap">
                Fotógrafos no centro da cobertura
              </span>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative min-h-[100vh] snap-start bg-asphaltBlack"
        data-section="1"
      >
        <div className="absolute inset-0">
          <video
            className={`absolute inset-0 h-full w-full object-cover motion-reduce:hidden kapt-backdrop ${
              activeSection === 1 ? "is-active" : ""
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/sobre/crossfit.jpg"
            aria-hidden="true"
          >
            <source src="/videos/sobre/cardio-bridge-720.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0.2)_0%,_rgba(0,0,0,0.58)_68%,_rgba(0,0,0,0.78)_100%)]" />
        </div>
        <div
          className="absolute left-[-4%] top-10 text-[12vw] font-black uppercase tracking-[0.08em] text-white/5"
          data-parallax="0.1"
        >
          MANIFESTO
        </div>
        <div className="min-h-[100vh] max-w-[1440px] mx-auto px-6 md:px-12 pt-8 md:pt-10 pb-12">
          <div className="border-t border-white/25" />
          <div className="grid gap-10 pt-8 md:grid-cols-[1.2fr_1fr]">
            <div className="space-y-6">
              <p className="text-[12px] font-mono uppercase tracking-[0.5em] text-white/90">
                Manifesto
              </p>
              <h3
                className="kapt-reveal kapt-reveal-slow kapt-section-headline"
                data-reveal
              >
                <SectionHeadline text="Seu olhar precisa de palco." tone="volt" />
              </h3>
              <div
                className="kapt-reveal kapt-reveal-slow kapt-reveal-slow-delay rounded-2xl border border-white/20 bg-black/70 p-6 text-white/95 shadow-[0_0_40px_rgba(0,0,0,0.6)]"
                data-reveal
              >
                <p className="text-sm leading-relaxed">
                  A fotografia esportiva precisa de fluxo, narrativa e contexto técnico. Iluminação,
                  tempo, enquadramento e consistência definem o valor percebido — e isso é trabalho
                  de fotógrafo, não de plataforma.
                </p>
                <p className="mt-4 text-sm leading-relaxed">
                  Existe um impulso real dos atletas amadores por compartilhar performance e
                  conquista em forma de imagem — é Instagram, é TikTok, é identidade pública do
                  esforço. Quando a foto encontra o atleta no momento certo, o compartilhamento
                  acontece e a história se espalha.
                </p>
                <p className="mt-4 text-sm leading-relaxed">
                  Kapt existe para entregar distribuição, descoberta e venda com mínima fricção,
                  mantendo seu portfólio em destaque e sua entrega valorizada, enquanto o atleta
                  recebe o registro que quer mostrar.
                </p>
              </div>
            </div>
            <div className="grid gap-4">
              {[
                "Presença",
                "Velocidade",
                "Valor",
                "Curadoria",
                "Entrega",
                "Marca",
              ].map((item) => (
                <div
                  key={item}
                  className="kapt-reveal rounded-xl border border-white/15 bg-[#0b0b0b] px-5 py-4 text-[12px] font-mono uppercase tracking-[0.35em] text-white/95"
                  data-reveal
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative min-h-[85vh] snap-start bg-[#050505]"
        data-section="2"
      >
        <div className="min-h-[85vh] max-w-[1440px] mx-auto px-6 md:px-12 pt-8 md:pt-10 pb-12">
          <div className="border-t border-white/25" />
          <div className="w-full pt-8">
            <div className="flex items-center justify-between py-3">
              <p className="text-[12px] font-mono uppercase tracking-[0.5em] text-white/90">
                O que é o Kapt
              </p>
              <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-actionVolt/80">
                Para fotógrafos
              </span>
            </div>
            <h3
              className="kapt-reveal kapt-reveal-slow kapt-section-headline mt-4"
              data-reveal
            >
              <SectionHeadline text="Plataforma para quem entrega imagem." />
            </h3>
            <p
              className="kapt-reveal kapt-reveal-slow kapt-reveal-slow-delay mt-3 max-w-2xl text-white/80"
              data-reveal
            >
              Ferramentas e jornada desenhadas para o fotógrafo: entrega rápida, vitrine clara e
              compra direta do atleta.
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {cards.map((card) => (
                <div
                  key={card.title}
                  className="kapt-reveal group rounded-2xl border border-white/15 bg-[#0b0b0b] p-6 transition-transform duration-200 hover:-translate-y-2"
                  data-reveal
                >
                  <h4 className="text-xl font-black uppercase tracking-[0.2em] text-actionVolt">
                    {card.title}
                  </h4>
                  <p className="mt-4 text-sm text-white/85 leading-relaxed">{card.copy}</p>
                  <div
                    className="mt-6 h-[2px] [animation:kapt-glow_3s_ease-in-out_infinite] motion-reduce:animate-none"
                    style={{ width: "88px", backgroundColor: "rgba(206,255,0,0.84)" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative min-h-[85vh] snap-start bg-asphaltBlack"
        data-section="3"
      >
        <div className="absolute inset-0">
          <video
            className={`absolute inset-0 h-full w-full object-cover motion-reduce:hidden kapt-backdrop ${
              activeSection === 3 ? "is-active" : ""
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/sobre/beach-tennis.jpg"
            aria-hidden="true"
          >
            <source src="/videos/sobre/tennis-court-720.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0.22)_0%,_rgba(0,0,0,0.56)_68%,_rgba(0,0,0,0.78)_100%)]" />
        </div>
        <div
          className="absolute right-[-6%] top-12 text-[12vw] font-black uppercase tracking-[0.08em] text-white/5"
          data-parallax="0.1"
        >
          VISUAL
        </div>
        <div className="min-h-[85vh] max-w-[1440px] mx-auto px-6 md:px-12 pt-8 md:pt-10 pb-12">
          <div className="border-t border-white/25" />
          <div className="w-full pt-8">
            <div className="flex items-center justify-between py-3">
              <p className="text-[12px] font-mono uppercase tracking-[0.5em] text-white/90">
                Linguagem visual
              </p>
              <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-actionVolt/80">
                Multiesportes
              </span>
            </div>
            <h3
              className="kapt-reveal kapt-reveal-slow kapt-section-headline mt-4"
              data-reveal
            >
              <SectionHeadline text="Imagens que fazem o atleta voltar." />
            </h3>
            <p
              className="kapt-reveal kapt-reveal-slow kapt-reveal-slow-delay mt-3 max-w-2xl text-white/80"
              data-reveal
            >
              Curadoria com impacto, mantendo sua assinatura visual em diferentes modalidades.
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {gallery.map((item, index) => (
                <div
                  key={`${item.src}-${index}`}
                  className="kapt-reveal group relative min-h-[260px] overflow-hidden rounded-2xl border border-white/15"
                  data-reveal
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${item.src})` }}
                    data-parallax="0.25"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative min-h-[85vh] snap-start bg-[#050505]"
        data-section="4"
      >
        <div className="min-h-[85vh] max-w-[1440px] mx-auto px-6 md:px-12 pt-8 md:pt-10 pb-12">
          <div className="border-t border-white/25" />
          <div className="w-full pt-8">
            <div className="flex items-center justify-between py-3">
              <p className="text-[12px] font-mono uppercase tracking-[0.5em] text-white/90">
                Fluxo
              </p>
              <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-actionVolt/80">
                Simples e direto
              </span>
            </div>
            <h3
              className="kapt-reveal kapt-reveal-slow kapt-section-headline mt-4"
              data-reveal
            >
              <SectionHeadline text="Fluxo de entrega sem atrito." />
            </h3>
            <p
              className="kapt-reveal kapt-reveal-slow kapt-reveal-slow-delay mt-3 max-w-2xl text-white/80"
              data-reveal
            >
              Da captura à venda com consistência, sem etapas que travem sua entrega.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {flow.map((step, index) => (
                <div
                  key={step}
                  className="kapt-reveal relative rounded-2xl border border-white/15 bg-[#0b0b0b] px-6 py-8"
                  data-reveal
                >
                  <span className="absolute right-6 top-6 text-[11px] font-mono uppercase tracking-[0.35em] text-white/70">
                    0{index + 1}
                  </span>
                  <h4 className="text-lg md:text-xl font-black uppercase tracking-[0.2em] text-white">
                    {step}
                  </h4>
                  <div
                    className="mt-5 h-[2px]"
                    style={{ width: "88px", backgroundColor: "rgba(206,255,0,0.84)" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-[75vh] snap-start bg-asphaltBlack" data-section="5">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-8 md:pt-10 pb-16 md:pb-20">
          <div className="mb-8 border-t border-white/25" />
          <div className="kapt-reveal rounded-3xl border border-actionVolt/50 bg-[#0a0a0a] px-8 py-12 text-center shadow-[0_0_40px_rgba(206,255,0,0.2)]" data-reveal>
            <p className="text-[12px] font-mono uppercase tracking-[0.5em] text-actionVolt/80">
              Pré-lançamento
            </p>
            <h3 className="mt-6 text-3xl md:text-5xl font-black uppercase tracking-[0.2em] text-white">
              Seja parceiro Kapt.
            </h3>
            <p className="mt-4 text-white/70">
              Cadastro aberto para fotógrafos.
            </p>
            <div className="mt-8 flex items-center justify-center">
              <Link
                href="/fotografar"
                className="inline-flex items-center justify-center rounded-md bg-actionVolt px-10 py-4 text-[11px] font-black uppercase tracking-[0.3em] text-black shadow-[0_0_24px_rgba(206,255,0,0.6)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_36px_rgba(206,255,0,0.8)]"
              >
                Quero fotografar
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
