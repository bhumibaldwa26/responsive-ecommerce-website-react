import about from "../../assets/about.jpg";

function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Story Text details */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-red-500 rounded-full" />
            <span className="font-extrabold text-xs text-red-500 uppercase tracking-widest">
              Our Story
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Launching Our Story of Excellence
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Launched in 2015, Exclusive is South Asia&apos;s premier online shopping marketplace with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data, and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 million consumers across the region.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Exclusive has more than 1 Million products to offer, growing at a very fast pace. Exclusive offers a diverse assortment in categories ranging from consumer electronics, fashion, household goods, beauty, to groceries.
          </p>
        </div>

        {/* Right side Image block */}
        <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-white p-2">
          <img
            src={about}
            alt="About Exclusive story"
            className="w-full h-full object-cover rounded-xl hover:scale-[1.01] transition-transform duration-350"
          />
        </div>

      </div>
    </div>
  );
}

export default About;
