import { useState, useEffect, useRef } from "react";
import {
  BarChart2, Workflow, Bot, Monitor, Mail, Target, Layout,
  Palette, Code2, FileText, Award, Zap, Cpu,
  Phone, Linkedin, MapPin, Eye, Download, ChevronRight,
  ChevronDown, Copy, Check, X, PenTool, Layers
} from "lucide-react";

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#060610;color:#e2e8f0;font-family:'Sora',sans-serif;overflow-x:hidden;cursor:none}
*{cursor:none!important}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:#060610}
::-webkit-scrollbar-thumb{background:linear-gradient(#3b82f6,#8b5cf6);border-radius:2px}

/* CURSOR */
.cur-dot{width:8px;height:8px;background:#3b82f6;border-radius:50%;position:fixed;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);mix-blend-mode:screen;transition:transform .05s}
.cur-ring{width:34px;height:34px;border:1.5px solid rgba(59,130,246,.55);border-radius:50%;position:fixed;pointer-events:none;z-index:99998;transform:translate(-50%,-50%);transition:all .12s ease}
.cur-ring.h{width:52px;height:52px;border-color:rgba(6,182,212,.8);background:rgba(6,182,212,.04)}

/* SCROLL BAR */
.spx{position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,#3b82f6,#06b6d4,#8b5cf6);z-index:9999;box-shadow:0 0 10px rgba(59,130,246,.7);transition:width .05s}

/* KEYFRAMES */
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes glowPulse{0%,100%{box-shadow:0 0 20px rgba(59,130,246,.4),0 0 40px rgba(59,130,246,.15)}50%{box-shadow:0 0 40px rgba(59,130,246,.7),0 0 80px rgba(59,130,246,.3),0 0 120px rgba(6,182,212,.2)}}
@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes gridFade{0%,100%{opacity:.04}50%{opacity:.08}}
@keyframes scaleIn{from{transform:scale(.8) translateY(10px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}
@keyframes fadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
@keyframes orb{0%,100%{transform:scale(1);opacity:.6}50%{transform:scale(1.15);opacity:1}}
@keyframes loadProg{from{width:0}to{width:100%}}

/* REVEAL */
.rv{opacity:0;transform:translateY(50px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)}
.rv.on{opacity:1;transform:translateY(0)}
.rl{opacity:0;transform:translateX(-50px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)}
.rl.on{opacity:1;transform:translateX(0)}
.rr{opacity:0;transform:translateX(50px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)}
.rr.on{opacity:1;transform:translateX(0)}

/* GLASS */
.glass{background:rgba(255,255,255,.028);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.07)}
.gh{transition:all .3s ease}
.gh:hover{background:rgba(255,255,255,.055);border-color:rgba(59,130,246,.28);transform:translateY(-4px);box-shadow:0 20px 60px rgba(0,0,0,.4),0 0 30px rgba(59,130,246,.07)}

/* SHIMMER TEXT */
.sht{background:linear-gradient(90deg,#3b82f6,#06b6d4,#8b5cf6,#3b82f6);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 4s linear infinite}

/* GLOW BTN */
.gbtn{position:relative;overflow:hidden;transition:all .3s ease}
.gbtn::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent);transform:translateX(-100%);transition:transform .5s ease}
.gbtn:hover::after{transform:translateX(100%)}

/* MISC */
.float{animation:float 4s ease-in-out infinite}
.pglow{animation:glowPulse 3s ease-in-out infinite}
.tc{animation:blink 1s ease infinite}

/* NAV */
.nl{position:relative;transition:color .2s}
.nl::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1px;background:linear-gradient(90deg,#3b82f6,#06b6d4);transition:width .3s}
.nl:hover::after{width:100%}

/* SKILL */
.stag{transition:all .2s}
.stag:hover{background:rgba(59,130,246,.18)!important;border-color:rgba(59,130,246,.5)!important;color:#3b82f6!important;transform:translateY(-2px)}

/* CARDS */
.pc{transition:all .4s cubic-bezier(.16,1,.3,1)}
.pc:hover{transform:translateY(-8px);box-shadow:0 30px 80px rgba(0,0,0,.5),0 0 40px rgba(59,130,246,.1);border-color:rgba(59,130,246,.35)!important}
.cb{transition:all .3s}
.cb:hover{transform:translateY(-6px) rotate(1deg);border-color:rgba(59,130,246,.45)!important;box-shadow:0 10px 40px rgba(59,130,246,.13)}
.cc{transition:all .3s}
.cc:hover{transform:translateY(-6px);border-color:rgba(59,130,246,.35)!important;box-shadow:0 20px 60px rgba(0,0,0,.4),0 0 30px rgba(59,130,246,.1)}
.ec{transition:all .3s}
.ec:hover{border-color:rgba(59,130,246,.25)!important;box-shadow:0 0 30px rgba(59,130,246,.06)}

/* ACHIEVEMENT */
.ach::before{content:'';position:absolute;inset:-1px;border-radius:21px;padding:1px;background:linear-gradient(135deg,#3b82f6,#06b6d4,#8b5cf6,#3b82f6);background-size:200% 200%;animation:shimmer 3s linear infinite;-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}

/* MODAL */
.modal{animation:scaleIn .3s cubic-bezier(.16,1,.3,1)}

/* RESPONSIVE */
@media(max-width:768px){
  .nd{display:none}
  .hg{font-size:clamp(36px,10vw,64px)!important}
  .sg{grid-template-columns:1fr 1fr!important}
}
@media(max-width:500px){
  .sg{grid-template-columns:1fr!important}
}
`;

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useScrollReveal(ready) {
  useEffect(() => {
    if (!ready) return;
    const els = document.querySelectorAll('.rv,.rl,.rr');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const d = Number(e.target.dataset.delay || 0);
          setTimeout(() => e.target.classList.add('on'), d);
        }
      });
    }, { threshold: 0.08 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [ready]);
}

function useTyping(texts, spd = 75) {
  const [disp, setDisp] = useState('');
  const st = useRef({ i: 0, c: 0, del: false });
  useEffect(() => {
    let t;
    const tick = () => {
      const s = st.current, cur = texts[s.i];
      if (!s.del) {
        if (s.c < cur.length) { s.c++; setDisp(cur.slice(0, s.c)); t = setTimeout(tick, spd); }
        else t = setTimeout(() => { s.del = true; tick(); }, 2600);
      } else {
        if (s.c > 0) { s.c--; setDisp(cur.slice(0, s.c)); t = setTimeout(tick, spd / 2); }
        else { s.del = false; s.i = (s.i + 1) % texts.length; t = setTimeout(tick, 400); }
      }
    };
    t = setTimeout(tick, 900);
    return () => clearTimeout(t);
  }, []);
  return disp;
}

function useCounter(tgt, dur = 2000, go = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!go) return;
    let start = null, id;
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setV(Math.round((1 - Math.pow(1 - p, 3)) * tgt));
      if (p < 1) id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [go, tgt, dur]);
  return v;
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────
function Loading({ onDone }) {
  const [prog, setProg] = useState(0);
  const [fade, setFade] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => {
      setProg(p => {
        const np = p + 1.4;
        if (np >= 100) {
          clearInterval(iv);
          setTimeout(() => { setFade(true); setTimeout(onDone, 600); }, 350);
          return 100;
        }
        return np;
      });
    }, 22);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#060610', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 99999, opacity: fade ? 0 : 1, transition: 'opacity .6s ease', gap: 32 }}>
      <div style={{ position: 'relative', width: 88, height: 88 }}>
        <div style={{ position: 'absolute', inset: 0, border: '1.5px solid rgba(59,130,246,.25)', borderRadius: '50%', animation: 'spin 4s linear infinite' }} />
        <div style={{ position: 'absolute', inset: 10, border: '1.5px solid rgba(6,182,212,.5)', borderTop: '1.5px solid #06b6d4', borderRadius: '50%', animation: 'spin 2.5s linear infinite reverse' }} />
        <div style={{ position: 'absolute', inset: 22, border: '1px solid rgba(139,92,246,.4)', borderRadius: '50%', animation: 'spin 3s linear infinite' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Mono, monospace', fontSize: 18, fontWeight: 500, color: '#3b82f6' }}>RA</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: '#475569', fontFamily: 'DM Mono, monospace', letterSpacing: '.12em', marginBottom: 6 }}>INITIALIZING PORTFOLIO</div>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-1px', color: '#f1f5f9' }}>Riono Asnan</div>
      </div>
      <div style={{ width: 240 }}>
        <div style={{ height: 2, background: 'rgba(255,255,255,.06)', borderRadius: 4, overflow: 'hidden', marginBottom: 8 }}>
          <div style={{ height: '100%', width: `${Math.min(prog, 100)}%`, background: 'linear-gradient(90deg,#3b82f6,#06b6d4)', borderRadius: 4, boxShadow: '0 0 10px rgba(59,130,246,.6)', transition: 'width .1s linear' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#334155', fontFamily: 'DM Mono, monospace' }}>
          <span>Loading assets...</span><span>{Math.min(Math.round(prog), 100)}%</span>
        </div>
      </div>
    </div>
  );
}

function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const cols = ['#3b82f6', '#06b6d4', '#8b5cf6'];
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - .5) * .45, vy: (Math.random() - .5) * .45,
      r: Math.random() * 1.4 + .5, op: Math.random() * .45 + .18,
      col: cols[Math.floor(Math.random() * 3)]
    }));
    let id;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.col; ctx.globalAlpha = p.op; ctx.fill();
      });
      pts.forEach((a, i) => pts.slice(i + 1).forEach(b => {
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 110) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = '#3b82f6'; ctx.globalAlpha = (1 - d / 110) * .1; ctx.lineWidth = .5; ctx.stroke(); }
      }));
      id = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}

function StatCard({ value, suffix, label, go }) {
  const n = useCounter(value, 2000, go);
  return (
    <div className="glass" style={{ padding: '18px 22px', borderRadius: 14, textAlign: 'center', minWidth: 120 }}>
      <div style={{ fontSize: 26, fontWeight: 800, background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'DM Mono, monospace' }}>
        {n}{suffix}
      </div>
      <div style={{ fontSize: 10, color: '#475569', marginTop: 4, letterSpacing: '.06em' }}>{label}</div>
    </div>
  );
}

function SkillBar({ name, pct, delay = 0, vis }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13, color: '#94a3b8' }}>
        <span>{name}</span>
        <span style={{ color: '#3b82f6', fontFamily: 'DM Mono, monospace' }}>{pct}%</span>
      </div>
      <div style={{ height: 4, background: 'rgba(255,255,255,.06)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(90deg,#3b82f6,#06b6d4)', boxShadow: '0 0 10px rgba(59,130,246,.4)', width: vis ? `${pct}%` : '0%', transition: `width 1.5s cubic-bezier(.16,1,.3,1) ${delay}ms` }} />
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [cur, setCur] = useState({ x: -100, y: -100 });
  const [curHov, setCurHov] = useState(false);
  const [heroGo, setHeroGo] = useState(false);
  const [skillVis, setSkillVis] = useState(false);
  const [expOpen, setExpOpen] = useState(null);
  const [copied, setCopied] = useState(null);
  const [modal, setModal] = useState(null);
  const [skillTab, setSkillTab] = useState('Design');
  const typed = useTyping(['Operational Excellence', 'Digital Transformation', 'UI/UX Enthusiast', 'Automation & Product']);

  useScrollReveal(ready);

  useEffect(() => {
    if (loading) return;
    const t = setTimeout(() => { setReady(true); setHeroGo(true); }, 200);
    return () => clearTimeout(t);
  }, [loading]);

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      setScrollY(sy);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(max > 0 ? (sy / max) * 100 : 0);
      const el = document.getElementById('skills');
      if (el && el.getBoundingClientRect().top < window.innerHeight * .75) setSkillVis(true);
    };
    const onMove = e => {
      setCur({ x: e.clientX, y: e.clientY });
      setCurHov(!!e.target.closest('a,button,[data-h]'));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('mousemove', onMove); };
  }, []);

  const copy = (txt, k) => { navigator.clipboard.writeText(txt).catch(() => {}); setCopied(k); setTimeout(() => setCopied(null), 2000); };
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const skillCats = {
    Design: [{ n: 'Canva', p: 90 }, { n: 'Figma', p: 82 }, { n: 'Photoshop', p: 75 }, { n: 'Illustrator', p: 72 }, { n: 'CorelDraw', p: 68 }],
    Development: [{ n: 'HTML', p: 75 }, { n: 'CSS', p: 72 }, { n: 'JavaScript', p: 62 }, { n: 'Google Apps Script', p: 68 }],
    Productivity: [{ n: 'Microsoft 365', p: 92 }, { n: 'AI Tools', p: 88 }, { n: 'Product Management', p: 78 }],
    Creative: [{ n: 'UI/UX Design', p: 82 }, { n: 'Video Editing', p: 78 }, { n: 'Motion Graphics', p: 71 }]
  };

  const experiences = [
    {
      co: 'PT Bank Rakyat Indonesia', role: 'Assistant, Operational Excellence Group',
      period: '2024 – Present', col: '#3b82f6',
      pts: ['Implementasi & sosialisasi aplikasi internal BRI (BRISPOT, NDS, BRIMEN, BRISURF)', 'Pembuatan video, banner, infografis & materi pembelajaran digital', 'Evaluasi aplikasi internal & peningkatan usability', 'User Acceptance Testing (UAT)', 'Monitoring adopsi aplikasi & penyusunan SOP', 'Mendukung transformasi digital perusahaan']
    },
    {
      co: 'PT Raikarya Inovasi Indonesia', role: 'Staf Administrasi & Graphic Designer',
      period: '2023 – 2024', col: '#06b6d4',
      pts: ['Mengelola administrasi operasional perusahaan', 'Merancang materi grafis untuk kebutuhan pemasaran', 'Produksi konten visual & branding berkualitas tinggi']
    },
    {
      co: 'Universitas Darussalam Gontor', role: 'Staff Administrasi Fakultas Ekonomi & Manajemen',
      period: '2022 – 2023', col: '#8b5cf6',
      pts: ['Pengelolaan data administrasi akademik', 'Koordinasi kegiatan dan agenda fakultas', 'Dukungan operasional harian & dokumentasi']
    }
  ];

  const projects = [
    {
      title: 'Performance Dashboard Monitoring System',
      desc: 'Sistem monitoring KPI real-time dengan analytics beban kerja tim dan complaint tracking terintegrasi.',
      features: ['KPI Monitoring', 'Team Workload', 'Complaint Monitoring'],
      tech: ['Google Sheets', 'Apps Script', 'Data Studio'],
      col: '#3b82f6', Icon: BarChart2,
      stats: [{ k: 'Users', v: '50+' }, { k: 'Uptime', v: '99.9%' }, { k: 'Metrics', v: '20+' }]
    },
    {
      title: 'Automation Data App',
      desc: 'Sistem otomasi cerdas untuk deployment recap dan pemrosesan alur data operasional secara efisien.',
      features: ['Automated Deployment Recap', 'Automated Data Recap', 'Report Generation'],
      tech: ['Google Apps Script', 'Sheets API', 'Automation'],
      col: '#06b6d4', Icon: Workflow,
      stats: [{ k: 'Efficiency', v: '80%' }, { k: 'Hours/mo', v: '40h' }, { k: 'Accuracy', v: '99%' }]
    },
    {
      title: 'AI Based Transcriptor',
      desc: 'Sistem berbasis AI untuk konversi speech-to-text dengan otomasi dokumentasi dan manajemen transkrip.',
      features: ['AI Speech to Text', 'Transcript Automation', 'Smart Documentation'],
      tech: ['AI/ML', 'Google AI', 'Automation'],
      col: '#8b5cf6', Icon: Bot,
      stats: [{ k: 'Accuracy', v: '95%' }, { k: 'Languages', v: '3+' }, { k: 'Docs', v: '200+' }]
    }
  ];

  const certs = [
    { n: 'Microsoft 365', Icon: Monitor, col: '#0078d4' },
    { n: 'Microsoft Mail Flow', Icon: Mail, col: '#0078d4' },
    { n: 'Google Ads Creative', Icon: Target, col: '#fbbc04' },
    { n: 'MySkill UI Design', Icon: Layout, col: '#8b5cf6' },
    { n: 'MySkill Graphic Design', Icon: Palette, col: '#ec4899' },
    { n: 'Javascript', Icon: Code2, col: '#f59e0b' },
    { n: 'Excel Certification', Icon: FileText, col: '#217346' },
    { n: 'Copywriting', Icon: PenTool, col: '#06b6d4' }
  ];

  const allSkills = ['Microsoft 365', 'Canva', 'Figma', 'Photoshop', 'Illustrator', 'CorelDraw', 'HTML', 'CSS', 'JavaScript', 'Google Apps Script', 'AI Tools', 'Video Editing', 'UI/UX Design', 'Motion Graphics', 'Product Management'];

  const contacts = [
    { Icon: Mail, label: 'Email', display: 'rionoasnan2001@gmail.com', col: '#3b82f6', k: 'email', action: () => copy('rionoasnan2001@gmail.com', 'email') },
    { Icon: Phone, label: 'Phone', display: '+62 815-1563-1014', col: '#22c55e', k: 'phone', action: () => copy('+62815156314', 'phone') },
    { Icon: Linkedin, label: 'LinkedIn', display: 'riono-asnan', col: '#0a66c2', k: 'ln', action: () => window.open('https://id.linkedin.com/in/riono-asnan-b6296120a', '_blank') },
    { Icon: MapPin, label: 'Location', display: 'Bekasi, Jawa Barat', col: '#ec4899', k: 'loc', action: () => copy('Bekasi, Jawa Barat', 'loc') }
  ];

  const navLinks = ['about', 'experience', 'skills', 'projects', 'certifications', 'contact'];

  if (loading) return <><style dangerouslySetInnerHTML={{ __html: CSS }} /><Loading onDone={() => setLoading(false)} /></>;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* CURSOR */}
      <div className="cur-dot" style={{ left: cur.x, top: cur.y }} />
      <div className={`cur-ring${curHov ? ' h' : ''}`} style={{ left: cur.x, top: cur.y }} />

      {/* SCROLL PROGRESS */}
      <div className="spx" style={{ width: `${scrollPct}%` }} />

      {/* NAVBAR */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, padding: '0 36px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: scrollY > 60 ? 'rgba(6,6,16,.88)' : 'transparent', backdropFilter: scrollY > 60 ? 'blur(24px)' : 'none', borderBottom: scrollY > 60 ? '1px solid rgba(255,255,255,.06)' : 'none', transition: 'all .3s ease' }}>
        <button data-h onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ fontFamily: 'DM Mono, monospace', fontSize: 17, fontWeight: 500, color: '#3b82f6', background: 'none', border: 'none', letterSpacing: '.04em' }}>
          RA<span style={{ color: '#06b6d4' }}>.</span>
        </button>
        <div className="nd" style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
          {navLinks.map(l => (
            <button key={l} data-h onClick={() => go(l)} className="nl"
              style={{ background: 'none', border: 'none', color: '#64748b', fontSize: 13, textTransform: 'capitalize', letterSpacing: '.04em', fontFamily: 'Sora, sans-serif' }}>
              {l}
            </button>
          ))}
        </div>
        <button data-h onClick={() => go('contact')} className="gbtn"
          style={{ padding: '8px 20px', background: 'rgba(59,130,246,.1)', border: '1px solid rgba(59,130,246,.35)', borderRadius: 8, color: '#3b82f6', fontSize: 13, fontFamily: 'Sora, sans-serif' }}>
          Hire Me
        </button>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section id="hero" style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '100px 32px 80px' }}>
        <Particles />
        {/* Grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(59,130,246,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,.05) 1px,transparent 1px)', backgroundSize: '60px 60px', animation: 'gridFade 5s ease-in-out infinite' }} />
        {/* Orbs */}
        <div style={{ position: 'absolute', top: '18%', left: '8%', width: 420, height: 420, background: 'radial-gradient(circle,rgba(59,130,246,.13) 0%,transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', animation: 'orb 6s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '15%', right: '8%', width: 320, height: 320, background: 'radial-gradient(circle,rgba(139,92,246,.1) 0%,transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', animation: 'orb 8s ease-in-out infinite reverse' }} />

        {/* HERO CONTENT */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 900, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 28, opacity: heroGo ? 1 : 0, transform: heroGo ? 'translateY(0)' : 'translateY(30px)', transition: 'all 1s cubic-bezier(.16,1,.3,1)' }}>
          {/* Status badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', background: 'rgba(59,130,246,.08)', border: '1px solid rgba(59,130,246,.22)', borderRadius: 100, fontSize: 11, color: '#3b82f6', fontFamily: 'DM Mono, monospace', letterSpacing: '.1em' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
            AVAILABLE FOR OPPORTUNITIES
          </div>

          {/* Profile avatar */}
          <div className="float" style={{ position: 'relative' }}>
            <div className="pglow" style={{ width: 128, height: 128, borderRadius: '50%', background: 'linear-gradient(135deg,rgba(59,130,246,.25),rgba(6,182,212,.15))', border: '2px solid rgba(59,130,246,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: 112, height: 112, borderRadius: '50%', background: 'linear-gradient(135deg,#0f172a,#1e293b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 800, fontFamily: 'DM Mono, monospace', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>RA</div>
            </div>
            {/* Orbit */}
            <div style={{ position: 'absolute', inset: -18, borderRadius: '50%', border: '1px dashed rgba(59,130,246,.22)', animation: 'spin 16s linear infinite' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#06b6d4', boxShadow: '0 0 10px rgba(6,182,212,.9)', position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)' }} />
            </div>
            <div style={{ position: 'absolute', inset: -36, borderRadius: '50%', border: '1px dashed rgba(139,92,246,.15)', animation: 'spin 28s linear infinite reverse' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#8b5cf6', boxShadow: '0 0 8px rgba(139,92,246,.9)', position: 'absolute', top: -3, left: '50%', transform: 'translateX(-50%)' }} />
            </div>
          </div>

          {/* Name + typing */}
          <div>
            <h1 className="hg" style={{ fontSize: 'clamp(44px,7vw,82px)', fontWeight: 800, letterSpacing: '-2.5px', lineHeight: 1.04, color: '#f8fafc', marginBottom: 14 }}>
              Riono <span className="sht">Asnan</span>
            </h1>
            <div style={{ fontSize: 'clamp(13px,2vw,16px)', color: '#64748b', fontFamily: 'DM Mono, monospace', height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <span style={{ color: '#94a3b8' }}>{typed}</span>
              <span className="tc" style={{ color: '#3b82f6', fontSize: 20 }}>|</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { label: 'View Projects', Icon: Eye, action: () => go('projects'), style: { background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', border: 'none', color: '#fff', boxShadow: '0 0 30px rgba(59,130,246,.3)' } },
              { label: 'Download CV', Icon: Download, action: null, style: { background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.12)', color: '#e2e8f0' } },
              { label: 'Contact Me', Icon: Mail, action: () => go('contact'), style: { background: 'rgba(139,92,246,.08)', border: '1px solid rgba(139,92,246,.3)', color: '#8b5cf6' } }
            ].map(({ label, Icon: Ic, action, style: s }) => (
              <button key={label} data-h onClick={action} className="gbtn"
                style={{ padding: '13px 28px', borderRadius: 12, fontSize: 13, fontWeight: 600, fontFamily: 'Sora, sans-serif', display: 'flex', alignItems: 'center', gap: 8, ...s }}>
                <Ic size={15} />{label}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="sg" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginTop: 12, width: '100%', maxWidth: 580 }}>
            <StatCard value={3} suffix="+" label="Years Experience" go={heroGo} />
            <StatCard value={10} suffix="+" label="Internal Projects" go={heroGo} />
            <StatCard value={15} suffix="+" label="Digital Materials" go={heroGo} />
            <StatCard value={90} suffix="%" label="Operational Efficiency" go={heroGo} />
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, color: '#334155', fontSize: 10, fontFamily: 'DM Mono, monospace', animation: 'float 2.5s ease-in-out infinite', letterSpacing: '.1em' }}>
          <span>SCROLL</span><ChevronDown size={14} />
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────────────────── */}
      <section id="about" style={{ padding: '110px 36px', maxWidth: 1100, margin: '0 auto' }}>
        <div className="rv" style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 11, color: '#3b82f6', fontFamily: 'DM Mono, monospace', letterSpacing: '.15em', marginBottom: 10 }}>01 / ABOUT ME</div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,50px)', fontWeight: 700, letterSpacing: '-1.5px', color: '#f8fafc' }}>Who I Am</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 22 }}>
          {/* Bio card – spans 2 cols on wider screens */}
          <div className="glass gh rv" data-delay="100" style={{ padding: 36, borderRadius: 22, gridColumn: 'span 2' }}>
            <p style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.85, marginBottom: 18 }}>
              Lulusan <strong style={{ color: '#e2e8f0' }}>Manajemen Keuangan</strong> dari Universitas Darussalam Gontor dengan pengalaman implementasi dan evaluasi aplikasi internal di{' '}
              <strong style={{ color: '#3b82f6' }}>PT Bank Rakyat Indonesia</strong> — BRISPOT, NDS, BRIMEN, dan BRISURF.
            </p>
            <p style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.85 }}>
              Berpengalaman dalam pengembangan <strong style={{ color: '#e2e8f0' }}>materi pembelajaran digital</strong>, sosialisasi fitur aplikasi, visual communication, automation, dan mendukung transformasi digital perusahaan.
            </p>
            {/* Mini analytics bar */}
            <div style={{ marginTop: 28, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {[{ l: 'Problem Solving', p: 88 }, { l: 'Communication', p: 90 }, { l: 'Adaptability', p: 92 }].map(({ l, p }) => (
                <div key={l} style={{ flex: 1, minWidth: 140 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#475569', marginBottom: 5 }}>
                    <span>{l}</span><span style={{ color: '#3b82f6', fontFamily: 'DM Mono, monospace' }}>{p}%</span>
                  </div>
                  <div style={{ height: 3, background: 'rgba(255,255,255,.05)', borderRadius: 4 }}>
                    <div style={{ height: '100%', width: heroGo ? `${p}%` : '0%', background: 'linear-gradient(90deg,#3b82f6,#06b6d4)', borderRadius: 4, transition: 'width 2s cubic-bezier(.16,1,.3,1)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {[
            { Icon: Zap, label: 'Digital Transformation', desc: 'Driving enterprise tech adoption & change management', col: '#3b82f6' },
            { Icon: Palette, label: 'Visual Communication', desc: 'Crafting high-quality digital materials & infographics', col: '#8b5cf6' },
            { Icon: Cpu, label: 'Automation & Apps Script', desc: 'Streamlining workflows with smart automation tools', col: '#06b6d4' },
            { Icon: Layout, label: 'UI/UX Design', desc: 'User-centered design for internal applications', col: '#f59e0b' }
          ].map(({ Icon: Ic, label, desc, col }, i) => (
            <div key={i} className="glass gh rv" data-delay={`${(i + 1) * 100}`} style={{ padding: 28, borderRadius: 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: 13, background: `${col}18`, border: `1px solid ${col}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <Ic size={22} style={{ color: col }} />
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#f1f5f9', marginBottom: 6 }}>{label}</div>
              <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ─────────────────────────────────────────────────────── */}
      <section id="experience" style={{ padding: '110px 36px', maxWidth: 820, margin: '0 auto' }}>
        <div className="rv" style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 11, color: '#06b6d4', fontFamily: 'DM Mono, monospace', letterSpacing: '.15em', marginBottom: 10 }}>02 / EXPERIENCE</div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,50px)', fontWeight: 700, letterSpacing: '-1.5px', color: '#f8fafc' }}>Career Journey</h2>
        </div>
        <div style={{ position: 'relative', paddingLeft: 52 }}>
          {/* Vertical line */}
          <div style={{ position: 'absolute', left: 23, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom,rgba(59,130,246,.6),rgba(139,92,246,.3),transparent)' }} />
          {experiences.map((exp, i) => (
            <div key={i} className="rv" data-delay={`${i * 150}`} style={{ marginBottom: 28, position: 'relative' }}>
              {/* Dot */}
              <div style={{ position: 'absolute', left: -42, top: 28, width: 14, height: 14, borderRadius: '50%', background: exp.col, boxShadow: `0 0 18px ${exp.col}80`, border: `2px solid ${exp.col}50` }} />
              <div className="glass ec" style={{ borderRadius: 18, border: '1px solid rgba(255,255,255,.07)', cursor: 'pointer', overflow: 'hidden' }}
                data-h onClick={() => setExpOpen(expOpen === i ? null : i)}>
                <div style={{ padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>{exp.role}</div>
                    <div style={{ fontSize: 13, color: exp.col, fontWeight: 600 }}>{exp.co}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: '#475569', background: 'rgba(255,255,255,.05)', padding: '4px 10px', borderRadius: 6 }}>{exp.period}</span>
                    <ChevronRight size={14} style={{ color: '#475569', transform: expOpen === i ? 'rotate(90deg)' : 'none', transition: 'transform .3s ease' }} />
                  </div>
                </div>
                {expOpen === i && (
                  <div style={{ padding: '4px 28px 24px', borderTop: '1px solid rgba(255,255,255,.05)' }}>
                    <div style={{ paddingTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {exp.pts.map((pt, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                          <div style={{ width: 5, height: 5, borderRadius: '50%', background: exp.col, marginTop: 8, flexShrink: 0, boxShadow: `0 0 6px ${exp.col}` }} />
                          <span style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.65 }}>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SKILLS ─────────────────────────────────────────────────────────── */}
      <section id="skills" style={{ padding: '110px 36px', maxWidth: 1100, margin: '0 auto' }}>
        <div className="rv" style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 11, color: '#8b5cf6', fontFamily: 'DM Mono, monospace', letterSpacing: '.15em', marginBottom: 10 }}>03 / SKILLS</div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,50px)', fontWeight: 700, letterSpacing: '-1.5px', color: '#f8fafc' }}>Tech & Design Stack</h2>
        </div>
        {/* Tabs */}
        <div className="rv" style={{ display: 'flex', gap: 8, marginBottom: 36, flexWrap: 'wrap' }}>
          {Object.keys(skillCats).map(cat => (
            <button key={cat} data-h onClick={() => setSkillTab(cat)}
              style={{ padding: '8px 20px', background: skillTab === cat ? 'rgba(59,130,246,.14)' : 'rgba(255,255,255,.04)', border: skillTab === cat ? '1px solid rgba(59,130,246,.5)' : '1px solid rgba(255,255,255,.08)', borderRadius: 8, color: skillTab === cat ? '#3b82f6' : '#64748b', fontSize: 13, fontFamily: 'Sora, sans-serif', transition: 'all .2s' }}>
              {cat}
            </button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 28 }}>
          {/* Skill bars */}
          <div className="glass rl" style={{ padding: 32, borderRadius: 22 }}>
            <div style={{ fontSize: 11, color: '#475569', fontFamily: 'DM Mono, monospace', marginBottom: 24, letterSpacing: '.1em' }}>{skillTab.toUpperCase()} PROFICIENCY</div>
            {skillCats[skillTab].map((s, i) => (
              <SkillBar key={`${skillTab}-${s.n}`} name={s.n} pct={s.p} delay={i * 100} vis={skillVis} />
            ))}
          </div>
          {/* Right panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Tag cloud */}
            <div className="glass rr" style={{ padding: 28, borderRadius: 22 }}>
              <div style={{ fontSize: 11, color: '#475569', fontFamily: 'DM Mono, monospace', marginBottom: 18, letterSpacing: '.1em' }}>ALL SKILLS</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {allSkills.map(s => (
                  <span key={s} className="stag" style={{ padding: '5px 13px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 7, fontSize: 12, color: '#94a3b8' }}>{s}</span>
                ))}
              </div>
            </div>
            {/* Distribution */}
            <div className="glass rr" style={{ padding: 28, borderRadius: 22 }}>
              <div style={{ fontSize: 11, color: '#475569', fontFamily: 'DM Mono, monospace', marginBottom: 20, letterSpacing: '.1em' }}>SKILL DISTRIBUTION</div>
              {[{ l: 'Design & Visual', p: 82, c: '#8b5cf6' }, { l: 'Digital Tools', p: 90, c: '#3b82f6' }, { l: 'Development', p: 68, c: '#06b6d4' }, { l: 'Management', p: 78, c: '#f59e0b' }].map(({ l, p, c }, i) => (
                <div key={l} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b', marginBottom: 5 }}>
                    <span>{l}</span><span style={{ color: c, fontFamily: 'DM Mono, monospace' }}>{p}%</span>
                  </div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,.05)', borderRadius: 4 }}>
                    <div style={{ height: '100%', borderRadius: 4, background: c, boxShadow: `0 0 8px ${c}60`, width: skillVis ? `${p}%` : '0%', transition: `width 1.5s cubic-bezier(.16,1,.3,1) ${i * 140}ms` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ───────────────────────────────────────────────────────── */}
      <section id="projects" style={{ padding: '110px 36px', maxWidth: 1100, margin: '0 auto' }}>
        <div className="rv" style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 11, color: '#3b82f6', fontFamily: 'DM Mono, monospace', letterSpacing: '.15em', marginBottom: 10 }}>04 / PROJECTS</div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,50px)', fontWeight: 700, letterSpacing: '-1.5px', color: '#f8fafc' }}>Featured Work</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 24 }}>
          {projects.map((p, i) => {
            const Ic = p.Icon;
            return (
              <div key={i} className="glass pc rv" data-delay={`${i * 150}`}
                style={{ borderRadius: 22, overflow: 'hidden', border: '1px solid rgba(255,255,255,.07)', cursor: 'pointer' }}
                data-h onClick={() => setModal(p)}>
                {/* Header */}
                <div style={{ height: 148, background: `linear-gradient(135deg,${p.col}14,${p.col}06)`, borderBottom: `1px solid ${p.col}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', bottom: -35, right: -35, width: 120, height: 120, borderRadius: '50%', border: `1px solid ${p.col}18` }} />
                  <div style={{ position: 'absolute', top: -20, left: -20, width: 80, height: 80, borderRadius: '50%', border: `1px solid ${p.col}12` }} />
                  <div style={{ width: 68, height: 68, borderRadius: 18, background: `${p.col}1e`, border: `1px solid ${p.col}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Ic size={30} style={{ color: p.col }} />
                  </div>
                </div>
                <div style={{ padding: 28 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9', marginBottom: 10, lineHeight: 1.4 }}>{p.title}</h3>
                  <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7, marginBottom: 18 }}>{p.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                    {p.features.map(f => (
                      <span key={f} style={{ fontSize: 11, padding: '3px 10px', background: `${p.col}10`, border: `1px solid ${p.col}22`, borderRadius: 6, color: p.col }}>{f}</span>
                    ))}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,.06)' }}>
                    {p.stats.map(({ k, v }) => (
                      <div key={k} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: p.col, fontFamily: 'DM Mono, monospace' }}>{v}</div>
                        <div style={{ fontSize: 10, color: '#475569', textTransform: 'uppercase', letterSpacing: '.05em', marginTop: 2 }}>{k}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CERTIFICATIONS ─────────────────────────────────────────────────── */}
      <section id="certifications" style={{ padding: '110px 36px', maxWidth: 1100, margin: '0 auto' }}>
        <div className="rv" style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 11, color: '#8b5cf6', fontFamily: 'DM Mono, monospace', letterSpacing: '.15em', marginBottom: 10 }}>05 / CERTIFICATIONS</div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,50px)', fontWeight: 700, letterSpacing: '-1.5px', color: '#f8fafc' }}>Credentials</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 18 }}>
          {certs.map(({ n, Icon: Ic, col }, i) => (
            <div key={n} className="glass cb rv" data-delay={`${i * 75}`}
              style={{ padding: 28, borderRadius: 18, border: '1px solid rgba(255,255,255,.07)', textAlign: 'center' }}>
              <div style={{ width: 54, height: 54, borderRadius: 14, background: `${col}14`, border: `1px solid ${col}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Ic size={24} style={{ color: col }} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0', marginBottom: 4 }}>{n}</div>
              <div style={{ fontSize: 10, color: '#3b82f6', fontFamily: 'DM Mono, monospace', letterSpacing: '.12em' }}>CERTIFIED</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ACHIEVEMENT ────────────────────────────────────────────────────── */}
      <section id="achievement" style={{ padding: '40px 36px 110px', maxWidth: 900, margin: '0 auto' }}>
        <div className="rv glass ach" style={{ padding: '52px 44px', borderRadius: 22, textAlign: 'center', background: 'rgba(59,130,246,.03)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: 320, height: 240, background: 'radial-gradient(circle,rgba(59,130,246,.18) 0%,transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div className="float" style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg,rgba(251,191,36,.18),rgba(251,191,36,.05))', border: '1px solid rgba(251,191,36,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 0 30px rgba(251,191,36,.28)' }}>
            <Award size={30} style={{ color: '#fbbf24' }} />
          </div>
          <div style={{ fontSize: 11, color: '#fbbf24', fontFamily: 'DM Mono, monospace', letterSpacing: '.15em', marginBottom: 18 }}>★ ACHIEVEMENT SPOTLIGHT</div>
          <h3 style={{ fontSize: 'clamp(20px,3vw,32px)', fontWeight: 700, color: '#f8fafc', marginBottom: 12, lineHeight: 1.3 }}>
            Best Participant<br />
            <span style={{ color: '#fbbf24' }}>IHT Product Management 2025</span>
          </h3>
          <p style={{ fontSize: 14, color: '#64748b' }}>PT Bank Rakyat Indonesia</p>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────────────────────── */}
      <section id="contact" style={{ padding: '110px 36px', maxWidth: 900, margin: '0 auto' }}>
        <div className="rv" style={{ marginBottom: 52, textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#06b6d4', fontFamily: 'DM Mono, monospace', letterSpacing: '.15em', marginBottom: 10 }}>06 / CONTACT</div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,50px)', fontWeight: 700, letterSpacing: '-1.5px', color: '#f8fafc', marginBottom: 14 }}>Let's Connect</h2>
          <p style={{ fontSize: 14, color: '#64748b', maxWidth: 360, margin: '0 auto', lineHeight: 1.7 }}>
            Open to new opportunities and collaborations in digital transformation & tech.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(196px,1fr))', gap: 18 }}>
          {contacts.map(({ Icon: Ic, label, display, col, k, action }, i) => (
            <div key={k} className="glass cc rv" data-delay={`${i * 100}`}
              style={{ padding: 28, borderRadius: 20, border: '1px solid rgba(255,255,255,.07)', cursor: 'pointer' }}
              data-h onClick={action}>
              <div style={{ width: 46, height: 46, borderRadius: 13, background: `${col}14`, border: `1px solid ${col}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <Ic size={20} style={{ color: col }} />
              </div>
              <div style={{ fontSize: 10, color: '#475569', fontFamily: 'DM Mono, monospace', letterSpacing: '.1em', marginBottom: 8 }}>{label.toUpperCase()}</div>
              <div style={{ fontSize: 12, color: '#e2e8f0', fontWeight: 500, wordBreak: 'break-word', lineHeight: 1.4 }}>{display}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 16, fontSize: 11, color: copied === k ? '#22c55e' : '#334155', transition: 'color .2s' }}>
                {copied === k ? <Check size={11} /> : <Copy size={11} />}
                <span>{copied === k ? 'Copied!' : label === 'LinkedIn' ? 'Open Link' : 'Copy'}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer style={{ padding: '38px 36px', borderTop: '1px solid rgba(255,255,255,.06)', textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: '#334155', fontFamily: 'DM Mono, monospace', marginBottom: 4 }}>
          Designed & Built by <span style={{ color: '#3b82f6' }}>Riono Asnan</span>
        </div>
        <div style={{ fontSize: 10, color: '#1e293b', fontFamily: 'DM Mono, monospace', letterSpacing: '.08em' }}>
          © {new Date().getFullYear()} · All rights reserved
        </div>
      </footer>

      {/* ── PROJECT MODAL ──────────────────────────────────────────────────── */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.82)', backdropFilter: 'blur(12px)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          onClick={() => setModal(null)}>
          <div className="glass modal" style={{ maxWidth: 520, width: '100%', borderRadius: 26, border: `1px solid ${modal.col}28`, overflow: 'hidden' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ padding: '30px 30px 22px', borderBottom: '1px solid rgba(255,255,255,.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 10, color: modal.col, fontFamily: 'DM Mono, monospace', letterSpacing: '.12em', marginBottom: 8 }}>PROJECT DETAIL</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f1f5f9', lineHeight: 1.35, maxWidth: 340 }}>{modal.title}</h3>
              </div>
              <button data-h onClick={() => setModal(null)}
                style={{ background: 'rgba(255,255,255,.06)', border: 'none', borderRadius: 8, padding: '7px 8px', color: '#64748b' }}>
                <X size={15} />
              </button>
            </div>
            <div style={{ padding: 30 }}>
              <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.75, marginBottom: 24 }}>{modal.desc}</p>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 10, color: '#475569', fontFamily: 'DM Mono, monospace', letterSpacing: '.12em', marginBottom: 14 }}>FEATURES</div>
                {modal.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: modal.col, boxShadow: `0 0 6px ${modal.col}`, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: '#94a3b8' }}>{f}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 10, color: '#475569', fontFamily: 'DM Mono, monospace', letterSpacing: '.12em', marginBottom: 14 }}>TECH STACK</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {modal.tech.map(t => (
                    <span key={t} style={{ fontSize: 12, padding: '5px 14px', background: `${modal.col}10`, border: `1px solid ${modal.col}28`, borderRadius: 8, color: modal.col }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
