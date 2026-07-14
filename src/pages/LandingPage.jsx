import { useSearchParams } from "react-router-dom";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useGetCategoriesQuery } from "../../redux/features/apiSlice";
import img from "../../assets/landingBanner.png";

function LandingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: categoriesData, isLoading } = useGetCategoriesQuery();

  // Safely format the categories list
  const categories = Array.isArray(categoriesData)
    ? categoriesData.map((cat) => {
        if (typeof cat === "string") {
          return {
            slug: cat,
            name: cat.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          };
        }
        return {
          slug: cat.slug || "",
          name: cat.name || cat.slug || "",
        };
      }).slice(0, 9) // Limit to top 9 categories for layout consistency
    : [];

  const handleCategorySelect = (slug) => {
    const params = new URLSearchParams(searchParams);
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    params.set("page", "1");
    setSearchParams(params);

    // Smoothly scroll down to the product section
    const productsSection = document.getElementById("explore-products-section");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-10 flex flex-col md:flex-row gap-8">
      
      {/* Left Sidebar Category Navigation (Dynamic) */}
      <div className="w-full md:w-64 shrink-0 md:border-r border-slate-150 md:pr-6">
        <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-4 hidden md:block">
          Categories
        </h3>
        
        {isLoading ? (
          <div className="space-y-2.5">
            {Array.from({ length: 7 }).map((_, idx) => (
              <div key={idx} className="h-4 bg-slate-200 rounded animate-pulse w-full" />
            ))}
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:flex md:flex-col md:gap-1.5">
            {categories.map((cat) => (
              <li
                key={cat.slug}
                onClick={() => handleCategorySelect(cat.slug)}
                className={`text-xs font-bold px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-100 hover:text-red-500 transition-all duration-150 flex items-center justify-between border md:border-transparent ${
                  searchParams.get("category") === cat.slug
                    ? "bg-red-50 border-red-200 text-red-500 font-extrabold"
                    : "bg-white md:bg-transparent border-slate-200 text-slate-600"
                }`}
              >
                <span className="truncate">{cat.name}</span>
                <ChevronRightIcon className="size-4 hidden md:block shrink-0" />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right Column: Hero Banner Section */}
      <div className="flex-grow flex flex-col">
        {/* Banner container */}
        <div className="w-full h-fit bg-slate-900 rounded-2xl overflow-hidden shadow-md flex items-center relative group">
          <img
            src={img}
            alt="Homepage Banner Promo"
            className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
          />
        </div>
      </div>

    </div>
  );
}

export default LandingPage;
