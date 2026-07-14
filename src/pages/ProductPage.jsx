import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery, useGetCategoriesQuery } from "../../redux/features/apiSlice";
import ProductCard from "./ProductCard";

const ProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const category = searchParams.get("category") || "";
  const limit = 8;

  // RTK Query fetches
  const { data, error, isLoading, isFetching } = useGetProductsQuery({
    page,
    limit,
    category,
  });

  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery();

  // Reset page to 1 when category changes
  useEffect(() => {
    if (page !== 1 && category) {
      handleCategoryChange(category);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  // Format categories safely (supporting strings array or objects array)
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
      })
    : [];

  const handleCategoryChange = (slug) => {
    const params = new URLSearchParams();
    if (slug) params.set("category", slug);
    params.set("page", "1");
    setSearchParams(params);
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    setSearchParams(params);
  };

  const products = data?.products || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  // Render skeletons helper
  const renderSkeletons = () => {
    return Array.from({ length: limit }).map((_, idx) => (
      <div key={idx} className="bg-white border border-slate-100 rounded-xl p-4 flex flex-col gap-4 animate-pulse">
        <div className="aspect-square bg-slate-200 rounded-lg w-full" />
        <div className="h-4 bg-slate-200 rounded w-3/4" />
        <div className="h-4 bg-slate-200 rounded w-1/4" />
        <div className="h-8 bg-slate-200 rounded w-full mt-auto" />
      </div>
    ));
  };

  if (error) {
    const errorMessage = error?.data?.message || error?.error || "Unable to retrieve products. Please verify your connection.";
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl inline-block max-w-md border border-red-150">
          <h3 className="font-extrabold text-lg mb-2">Error Loading Products</h3>
          <p className="text-sm">{errorMessage}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="explore-products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      
      {/* Category Pills Header Section */}
      <div className="mb-10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-red-500 rounded-full" />
          <h2 className="font-extrabold text-xs text-red-500 uppercase tracking-widest">
            Products
          </h2>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {category
              ? `Category: ${categories.find((c) => c.slug === category)?.name || category}`
              : "Explore Our Products"}
          </h1>

          {/* Pagination Top Controls */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1 || isFetching}
                className="px-4 py-2 border border-slate-200 hover:border-slate-400 disabled:opacity-50 disabled:pointer-events-none rounded-lg text-xs font-bold transition-all bg-white text-slate-700"
              >
                Previous
              </button>
              <span className="text-xs text-slate-500 font-bold px-3">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages || isFetching}
                className="px-4 py-2 border border-slate-200 hover:border-slate-400 disabled:opacity-50 disabled:pointer-events-none rounded-lg text-xs font-bold transition-all bg-white text-slate-700"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Category Pill Navigation (Horizontal Scrollable) */}
        {!isCategoriesLoading && categories.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-slate-200">
            <button
              onClick={() => handleCategoryChange("")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                category === ""
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400"
              }`}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                  category === cat.slug
                    ? "bg-red-500 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 min-h-[40vh] relative">
        {isLoading || isFetching ? (
          renderSkeletons()
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center text-center py-16 bg-white rounded-2xl border border-slate-100">
            <p className="text-slate-500 font-semibold">No products available in this category.</p>
            <button
              onClick={() => handleCategoryChange("")}
              className="mt-4 px-4 py-2 bg-slate-900 hover:bg-red-500 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
