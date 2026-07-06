import gucci from "../../assets/arrival/gucci.png";
import woman from "../../assets/arrival/woman.png";
import play from "../../assets/arrival/play.png";
import speaker from "../../assets/arrival/speaker.png";

function NewArrival() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 border-b border-slate-100">
      
      {/* Section Header */}
      <div className="mb-10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-red-500 rounded-full" />
          <h4 className="font-extrabold text-xs text-red-500 uppercase tracking-widest">
            Featured
          </h4>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          New Arrivals
        </h1>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[500px]">
        
        {/* Main PlayStation Block (2 columns, 2 rows on desktop) */}
        <div className="bg-slate-950 rounded-2xl overflow-hidden relative md:col-span-2 md:row-span-2 shadow-sm group">
          <img
            src={play}
            alt="Play Station promo"
            className="w-full h-full object-cover opacity-85 group-hover:scale-[1.02] transition-transform duration-555"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">Play Station 5</h2>
            <p className="text-xs md:text-sm text-slate-300 mt-2 max-w-sm leading-relaxed">
              Black and White version of the PS5 coming out on sale.
            </p>
            <a
              href="#"
              className="text-white text-xs font-bold underline decoration-red-500 underline-offset-4 hover:text-red-400 mt-4 self-start transition-colors"
            >
              Shop Now
            </a>
          </div>
        </div>

        {/* Women's Fashion Block (2 columns, 1 row on desktop) */}
        <div className="bg-slate-950 rounded-2xl overflow-hidden relative md:col-span-2 shadow-sm group">
          <img
            src={woman}
            alt="Women's collection"
            className="w-full h-full object-cover opacity-85 group-hover:scale-[1.02] transition-transform duration-555"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">Women&apos;s Collections</h2>
            <p className="text-xs md:text-sm text-slate-300 mt-2 max-w-sm leading-relaxed">
              Featured women collections that give you another vibe.
            </p>
            <a
              href="#"
              className="text-white text-xs font-bold underline decoration-red-500 underline-offset-4 hover:text-red-400 mt-4 self-start transition-colors"
            >
              Shop Now
            </a>
          </div>
        </div>

        {/* Speaker Block (1 column, 1 row on desktop) */}
        <div className="bg-slate-950 rounded-2xl overflow-hidden relative md:col-span-1 shadow-sm group flex items-center justify-center">
          <img
            src={speaker}
            alt="Speakers"
            className="w-full h-full object-cover opacity-85 group-hover:scale-[1.02] transition-transform duration-555"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
            <h2 className="text-lg font-bold tracking-tight">Speakers</h2>
            <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">
              Amazon wireless speakers.
            </p>
            <a
              href="#"
              className="text-white text-xs font-bold underline decoration-red-500 underline-offset-4 hover:text-red-400 mt-3 self-start transition-colors"
            >
              Shop Now
            </a>
          </div>
        </div>

        {/* Perfume Block (1 column, 1 row on desktop) */}
        <div className="bg-slate-950 rounded-2xl overflow-hidden relative md:col-span-1 shadow-sm group flex items-center justify-center">
          <img
            src={gucci}
            alt="Gucci Perfume"
            className="w-full h-full object-cover opacity-80 group-hover:scale-[1.02] transition-transform duration-555"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
            <h2 className="text-lg font-bold tracking-tight">Perfume</h2>
            <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">
              GUCCI INTENSE OUD EDP.
            </p>
            <a
              href="#"
              className="text-white text-xs font-bold underline decoration-red-500 underline-offset-4 hover:text-red-400 mt-3 self-start transition-colors"
            >
              Shop Now
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default NewArrival;
