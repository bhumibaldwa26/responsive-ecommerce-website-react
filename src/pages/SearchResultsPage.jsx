import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoSearchOutline, IoFilterOutline } from "react-icons/io5";
import { useGetProductsQuery } from "../../redux/features/apiSlice";
import ProductCard from "./ProductCard";

const SearchResultsPage = () => {
  const location = useLocation();

  // Extract query from URL search params
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";

  // Category filter state for combining search and category
  const [selectedCategory, setSelectedCategory] = useState("");

  // RTK Query fetches search results (limit 100 to search the entire database)
  const { data, error, isLoading, isFetching } = useGetProductsQuery({
    search: searchQuery,
    limit: 100,
  });

  // Reset category filter when search query changes
  useEffect(() => {
    setSelectedCategory("");
  }, [searchQuery]);

  const products = data?.products || [];

  // Dynamically extract categories available in the search results for local filtering
  const availableCategories = [
    ...new Set(products.map((product) => product.category)),
  ].filter(Boolean);

  // Filter search results locally if a category filter is active
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  // Render Skeletons Helper
  const renderSkeletons = () => {
    return Array.from({ length: 8 }).map((_, idx) => (
      <div key={idx} className="bg-white border border-slate-100 rounded-xl p-4 flex flex-col gap-4 animate-pulse">
        <div className="aspect-square bg-slate-200 rounded-lg w-full" />
        <div className="h-4 bg-slate-200 rounded w-3/4" />
        <div className="h-4 bg-slate-200 rounded w-1/4" />
        <div className="h-8 bg-slate-200 rounded w-full mt-auto" />
      </div>
    ));
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl inline-block max-w-md border border-red-150">
          <h3 className="font-extrabold text-lg mb-2">Search Error</h3>
          <p className="text-sm">Something went wrong while retrieving search results.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 min-h-screen">
      
      {/* Title / Search Term display */}
      <div className="border-b border-slate-100 pb-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <IoSearchOutline className="text-slate-400 w-6 sm:w-8 h-6 sm:h-8" />
            Search Results
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Found <span className="font-semibold text-red-500">{filteredProducts.length}</span> matches for &ldquo;<span className="text-slate-800 font-bold">{searchQuery}</span>&rdquo;
            {selectedCategory && (
              <span> in category &ldquo;<span className="text-red-500 font-semibold uppercase">{selectedCategory.replace(/-/g, " ")}</span>&rdquo;</span>
            )}
          </p>
        </div>

        {/* Clear filters trigger */}
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory("")}
            className="text-xs text-red-500 hover:text-red-600 font-bold border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-50/50 transition-colors self-start md:self-auto"
          >
            Clear Category Filter
          </button>
        )}
      </div>

      {/* Categories subset horizontal bar (only visible if we have results & multiple categories) */}
      {!isLoading && availableCategories.length > 0 && (
        <div className="mb-8 space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold text-slate-500 uppercase tracking-widest">
            <IoFilterOutline className="w-4 h-4 text-slate-400" />
            Filter by Result Categories
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-150 whitespace-nowrap ${
                selectedCategory === ""
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400"
              }`}
            >
              All Matches ({products.length})
            </button>
            {availableCategories.map((catSlug) => {
              const count = products.filter((p) => p.category === catSlug).length;
              const displayName = catSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
              return (
                <button
                  key={catSlug}
                  onClick={() => setSelectedCategory(catSlug)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-150 whitespace-nowrap ${
                    selectedCategory === catSlug
                      ? "bg-red-500 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400"
                  }`}
                >
                  {displayName} ({count})
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Results grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {isLoading || isFetching ? (
          renderSkeletons()
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          /* Empty search state */
          <div className="col-span-full flex flex-col items-center justify-center text-center py-20 px-4 bg-white rounded-2xl border border-slate-100 shadow-sm max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-6">
              <IoSearchOutline className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-slate-800">No products found</h2>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              We couldn&apos;t find any items matching &ldquo;{searchQuery}&rdquo;. Try checking for typos or searching for alternative keywords like &ldquo;phone&rdquo;, &ldquo;laptop&rdquo;, or &ldquo;fragrance&rdquo;.
            </p>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setSelectedCategory("")}
                className="bg-slate-900 hover:bg-red-500 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
              <Link
                to="/"
                className="border border-slate-250 hover:border-slate-400 text-slate-700 font-semibold text-xs px-5 py-2.5 rounded-lg transition-colors"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default SearchResultsPage;
