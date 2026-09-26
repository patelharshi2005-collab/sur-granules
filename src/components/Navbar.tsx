import React, { useState } from 'react';
import { usePlant, PageRoute } from '../context/PlantContext';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, settings, isSyncing, isSupabaseMode } = usePlant();
  const { user, dbUser, signInWithGoogle, logout, isAdmin, loading: authLoading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks: { label: string; page: PageRoute }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Products', page: 'products' },
    { label: 'Applications', page: 'applications' },
    { label: 'Quality & Process', page: 'quality-process' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageRoute) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-200/80 shadow-xs">
      {/* Top Industrial Logistics Bar */}
      <div className="bg-[#00335a] text-white border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-9 flex items-center justify-between text-xs font-normal">
          <div className="flex items-center gap-5 text-white/90">
            <a
              href={`tel:${settings.primaryPhone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[15px]">call</span>
              <span>Phone &amp; WhatsApp: {settings.primaryPhone}</span>
            </a>
            <span className="text-white/30">|</span>
            <a
              href={`mailto:${settings.officialEmail}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[15px]">mail</span>
              <span>Email: {settings.officialEmail}</span>
            </a>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-1.5 text-white/80">
              <span className="material-symbols-outlined text-[15px]">location_on</span>
              <span>Location: Ramnagar, Ankleshwar</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-400/30">
              <span className={`w-1.5 h-1.5 rounded-full ${isSyncing ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
              {isSupabaseMode ? 'Supabase Realtime' : 'PostgreSQL Connected'}
            </span>
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider bg-[#174a78] px-2 py-0.5 rounded text-blue-100">
              ISO 9001:2015
            </span>
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-300">
              {settings.monthlyCapacity}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
        >
          <Logo size="md" />
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`text-sm font-medium transition-colors cursor-pointer py-1 relative ${
                  isActive
                    ? 'text-[#00335a] font-semibold'
                    : 'text-slate-600 hover:text-[#00335a]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#174a78] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* WhatsApp Direct Quick Link */}
          <a
            href="https://wa.me/919925712098?text=Hello%20SUR%20GRANULES%2C%20I%20am%20inquiring%20about%20recycled%20HDPE%20%26%20PP%20granules%20availability."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#a2f5b9] text-[#00210e] px-3.5 py-2 rounded-lg font-display text-xs font-bold border border-emerald-300/60 hover:bg-[#87d89e] transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-[17px]">chat</span>
            <span>WhatsApp</span>
          </a>

          {/* Request a Quote Button */}
          <button
            onClick={() => handleNavClick('request-a-quote')}
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#174a78] hover:bg-[#00335a] text-white px-4 py-2 rounded-lg font-display text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <span>Request Quote</span>
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </button>

          {/* Plant Operations Hub Toggle */}
          <button
            onClick={() => handleNavClick(currentPage === 'admin' ? 'products' : 'admin')}
            title={currentPage === 'admin' ? 'Exit Plant Console' : 'Open Plant Operations Hub'}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold font-display transition-colors shadow-xs cursor-pointer ${
              currentPage === 'admin'
                ? 'bg-emerald-600 text-white ring-2 ring-emerald-300'
                : 'bg-[#00335a] hover:bg-[#174a78] text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {currentPage === 'admin' ? 'dashboard' : 'tune'}
            </span>
            <span className="hidden md:inline">Plant Hub</span>
          </button>

          {/* User Auth Section */}
          {authLoading ? (
            <div className="w-8 h-8 rounded-full bg-slate-100 animate-pulse border border-slate-200" />
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200 cursor-pointer"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-7 h-7 rounded-full object-cover border border-slate-300"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#00335a] text-white flex items-center justify-center text-xs font-bold">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                )}
                <span className="hidden md:inline text-xs font-medium text-slate-700 max-w-[100px] truncate">
                  {user.displayName?.split(' ')[0] || user.email?.split('@')[0]}
                </span>
                <span className="material-symbols-outlined text-[16px] text-slate-500">
                  {userDropdownOpen ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {user.displayName || 'Registered User'}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    <span
                      className={`inline-block mt-1 text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                        isAdmin
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-blue-100 text-blue-900 border border-blue-200'
                      }`}
                    >
                      {isAdmin ? 'Plant Admin' : dbUser?.role || 'Buyer'}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      handleNavClick('admin');
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#00335a]">settings</span>
                    <span>Plant &amp; Allocation Hub</span>
                  </button>

                  <button
                    onClick={() => {
                      handleNavClick('request-a-quote');
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#00335a]">calculate</span>
                    <span>Quote Calculator</span>
                  </button>

                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      onClick={async () => {
                        await logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">logout</span>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => signInWithGoogle()}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-6 py-4 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col gap-3 py-2">
            {navLinks.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`text-left py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  currentPage === item.page
                    ? 'bg-blue-50 text-[#00335a] font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full text-left py-2 px-3 rounded-md text-sm font-semibold bg-slate-100 text-[#00335a] flex items-center justify-between"
              >
                <span>Plant Control &amp; Allocation Hub</span>
                <span className="text-xs bg-[#00335a] text-white px-2 py-0.5 rounded font-mono">B2B Console</span>
              </button>

              {!user ? (
                <button
                  onClick={() => signInWithGoogle()}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#00335a] text-white py-2.5 rounded-lg font-bold text-xs"
                >
                  <span>Sign In with Google</span>
                </button>
              ) : (
                <button
                  onClick={() => logout()}
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-200 text-slate-800 py-2 rounded-lg font-semibold text-xs"
                >
                  <span>Sign Out ({user.email})</span>
                </button>
              )}

              <a
                href="https://wa.me/919925712098"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#a2f5b9] text-[#00210e] py-2.5 rounded-lg font-bold text-xs"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                WhatsApp: 9925712098
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
