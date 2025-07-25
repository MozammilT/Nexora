function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#000000] from-20% via-[#0c0c1c] via-70% to-[#1a1a2f] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col items-center">
        <div className="flex items-center space-x-3 mb-6">
          <h3 className="footer-heading text-3xl [text-shadow:0_0_7px_rgba(80,68,229,0.8),0_0_15px_rgba(80,68,229,0.6),0_0_30px_rgba(80,68,229,0.4)]">
            nexora
          </h3>
        </div>
        <p className="text-center max-w-xl text-sm font-normal leading-relaxed">
          Empowering creators worldwide with the most advanced AI content
          creation tools. Transform your ideas into reality.
        </p>
      </div>
      <div className="border-t border-slate-200 max-w-5xl mx-auto">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
          <a href="https://prebuiltui.com">prebuiltui</a> ©2025. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
