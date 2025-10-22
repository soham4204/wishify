const Home = () => {
  const NavLink = ({ to, children, className }) => (
    <a href={to} className={className}>{children}</a>
  );

  const features = [
    {
      icon: "📸",
      title: "Photo Galleries",
      description: "Showcase your best memories with a beautiful carousel or timeline.",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: "🎈",
      title: "Interactive Fun",
      description: "Pop message balloons, make a wish, and blow out digital candles.",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      icon: "💌",
      title: "Personal Touches",
      description: "Add background music, a personal note, and even a voice message.",
      gradient: "from-blue-500 to-cyan-500"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-violet-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-32 overflow-hidden">
        {/* Decorative Background Elements */}
        {/* <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div> */}

        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block mb-6 animate-fadeInUp">
            <span className="px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-semibold">
              ✨ Make birthdays magical
            </span>
          </div>

          <h1 className=" font-display font-bold leading-tight mb-6 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-violet-700 bg-clip-text text-transparent">
              Create a Birthday Wish
            </span>
            <br />
            <br />
            <br />
            <span className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-slate-800">
              They'll Never Forget
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed px-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Build a personalized, interactive celebration page with animated balloons,
            digital candles, photo galleries, and more. Share it all with one
            simple link.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <NavLink
              to="/create"
              className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-lg md:text-xl font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Start Creating Now</span>
              <span className="text-2xl">🎁</span>
            </NavLink>
          </div>

          {/* Social Proof */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
              <span className="font-medium">10+ wishes created</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-slate-300"></div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">💝</span>
              <span className="font-medium">Loved by celebrators</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-800 mb-4">
              All The Fun, All in One Place
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to create an unforgettable birthday experience
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-6 md:p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 overflow-hidden hover:-translate-y-2"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className="text-5xl md:text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-800 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600">
              Three simple steps to create magic
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Choose Your Style", desc: "Pick from templates or start from scratch" },
              { step: "2", title: "Personalize", desc: "Add photos, messages, music, and interactive elements" },
              { step: "3", title: "Share & Celebrate", desc: "Get a unique link to share with the birthday person" }
            ].map((item, index) => (
              <div
                key={index}
                className="relative text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-violet-500 to-purple-600 text-white text-2xl md:text-3xl font-bold rounded-full shadow-lg mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600">
                  {item.desc}
                </p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-violet-300 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;