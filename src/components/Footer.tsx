import { Music2, Instagram, Twitter, Youtube, Mail } from "lucide-react";

const socials = [
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Twitter,   href: "#", label: "Twitter" },
  { Icon: Youtube,   href: "#", label: "YouTube" },
  { Icon: Mail,      href: "#booking", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Music2 className="w-6 h-6 text-gold-400" strokeWidth={1.5} />
              <span className="text-lg font-bold text-white tracking-wide">
                DJ <span style={{ color: "#C9A84C" }}>Axiom</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Professional DJ & music producer based in Los Angeles. Available
              worldwide for clubs, festivals, weddings, and private events.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
              Navigate
            </h3>
            <ul className="space-y-2">
              {[
                { href: "#events",    label: "Past Events" },
                { href: "#gear",      label: "DJ Gear" },
                { href: "#playlists", label: "Playlists" },
                { href: "#booking",   label: "Book Now" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-slate-400 hover:text-gold-400 transition-colors duration-300"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
              Connect
            </h3>
            <div className="flex items-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2 rounded-lg text-slate-500 hover:text-gold-400 hover:bg-gold-400/8 border border-white/5 hover:border-gold-400/25 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} DJ Axiom. All rights reserved.
          </p>
          <p className="text-xs text-slate-700">
            Built with Next.js · Tailwind CSS · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
