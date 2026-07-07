import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import { toast } from "sonner";
import {
  IoHeart,
  IoHeartOutline,
  IoCartOutline,
  IoCarOutline,
  IoRefreshOutline,
  IoShieldCheckmarkOutline
} from "react-icons/io5";

import { useGetProductQuery } from "../../redux/features/apiSlice";
import { addToCart } from "../../redux/features/cartSlice";
import { toggleWishlist } from "../../redux/features/wishlistSlice";


const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // RTK Query for product details
  const { data: product, error, isLoading } = useGetProductQuery(id);

  // Read state from Redux
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = product ? wishlistItems.some((item) => item.id === product.id) : false;

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("red");
  const [selectedSize, setSelectedSize] = useState("M");

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    dispatch(toggleWishlist(product));
    if (isWishlisted) {
      toast.success(`Removed "${product.title}" from wishlist!`);
    } else {
      toast.success(`Added "${product.title}" to wishlist!`);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({ ...product, quantity }));
    toast.success(`Added ${quantity} x "${product.title}" to cart!`);
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-500"></div>
          <p className="text-sm font-semibold text-slate-500 animate-pulse">Loading details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 bg-slate-50">
        <h2 className="text-xl font-bold text-slate-800">Failed to load product details</h2>
        <p className="text-slate-500 text-sm mt-1">{error?.message || "Something went wrong"}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-red-500 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 bg-slate-50">
        <h2 className="text-xl font-bold text-slate-800">Product not found</h2>
        <p className="text-slate-500 text-sm mt-1">The requested product could not be located.</p>
      </div>
    );
  }

  // Safely display images
  const images = Array.isArray(product.images) ? product.images : [product.thumbnail || product.images];
  const mainImage = images[selectedImageIndex] || product.thumbnail;

  const hasDiscount = product.discountPercentage && product.discountPercentage > 0;
  const originalPrice = hasDiscount
    ? Math.round(product.price / (1 - product.discountPercentage / 100))
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 mb-8 font-medium">
        <span className="hover:text-slate-600 cursor-pointer">Account</span>
        <span className="mx-2">/</span>
        <span className="hover:text-slate-600 cursor-pointer uppercase">{product.category}</span>
        <span className="mx-2">/</span>
        <span className="text-slate-800 font-bold">{product.title}</span>
      </nav>

      {/* Main Container Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Image Gallery (4 cols on medium+) */}
        <div className="md:col-span-7 flex flex-col-reverse sm:flex-row gap-4 h-fit">
          
          {/* Thumbnails list */}
          <div className="flex flex-row sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[500px] shrink-0 scrollbar-none">
            {images.slice(0, 4).map((imgUrl, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`w-16 h-16 sm:w-20 sm:h-24 p-2 rounded-xl bg-slate-100 flex items-center justify-center border-2 transition-all duration-250 overflow-hidden shrink-0 ${
                  selectedImageIndex === index ? "border-red-500 ring-2 ring-red-100" : "border-transparent hover:border-slate-300"
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`${product.title} view ${index + 1}`}
                  className="max-h-full max-w-full object-contain hover:scale-105 transition-transform"
                />
              </button>
            ))}
          </div>

          {/* Large Main View Image */}
          <div className="flex-grow aspect-[4/5] sm:aspect-square bg-slate-100 rounded-2xl flex items-center justify-center p-6 border border-slate-100 shadow-inner relative group overflow-hidden">
            {hasDiscount && (
              <span className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-extrabold px-2.5 py-1.5 rounded-lg shadow-sm">
                SAVE {Math.round(product.discountPercentage)}%
              </span>
            )}
            <img
              src={mainImage}
              alt={product.title}
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-350"
            />
          </div>
        </div>

        {/* Right Column: Product Actions & Context (5 cols) */}
        <div className="md:col-span-5 flex flex-col space-y-6">
          
          {/* Title & Info */}
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {product.title}
            </h1>
            
            {/* Stars rating & Stock */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center">
                <ReactStars
                  count={5}
                  value={product.rating || 4}
                  size={18}
                  edit={false}
                  activeColor="#ffd700"
                  classNames="pointer-events-none"
                />
                <span className="text-xs text-slate-500 font-semibold ml-2">
                  ({product.rating?.toFixed(1) || "4.0"} Rating)
                </span>
              </div>
              <span className="text-slate-300">|</span>
              <span className="text-xs font-bold text-emerald-600">In Stock</span>
            </div>

            {/* Price display */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-2xl lg:text-3xl font-black text-red-500">${product.price}</span>
              {hasDiscount && originalPrice && (
                <span className="text-sm lg:text-base text-slate-400 line-through font-semibold">
                  ${originalPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed mt-4 border-b border-slate-100 pb-5">
              {product.description || "Indulge in the finest quality of craftsmanship. A product refined to elevate your day-to-day style and usage."}
            </p>
          </div>

          {/* Color Selector */}
          <div className="flex items-center gap-4 text-sm font-semibold">
            <span className="text-slate-700 min-w-16">Colors:</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedColor("red")}
                className={`w-6 h-6 rounded-full bg-red-500 border-2 transition-all duration-200 ${
                  selectedColor === "red" ? "border-slate-800 ring-2 ring-red-100 scale-110" : "border-white"
                }`}
              />
              <button
                onClick={() => setSelectedColor("green")}
                className={`w-6 h-6 rounded-full bg-emerald-500 border-2 transition-all duration-200 ${
                  selectedColor === "green" ? "border-slate-800 ring-2 ring-emerald-100 scale-110" : "border-white"
                }`}
              />
              <button
                onClick={() => setSelectedColor("black")}
                className={`w-6 h-6 rounded-full bg-slate-950 border-2 transition-all duration-200 ${
                  selectedColor === "black" ? "border-slate-800 ring-2 ring-slate-200 scale-110" : "border-white"
                }`}
              />
            </div>
          </div>

          {/* Size Selector */}
          {[
            "mens-shirts",
            "mens-shoes",
            "tops",
            "womens-dresses",
            "womens-shoes",
          ].includes(product.category) && (
            <div className="flex items-center gap-4 text-sm font-semibold">
              <span className="text-slate-700 min-w-16">Size:</span>
              <div className="flex gap-2">
                {["XS", "S", "M", "L", "XL"].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg border text-xs font-bold transition-all duration-150 ${
                      selectedSize === sz
                        ? "bg-red-500 text-white border-red-500 shadow-sm"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity selector & Action Buttons */}
          <div className="flex items-center gap-4 pt-2 border-t border-slate-100">
            {/* Quantity adjustment */}
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden shrink-0">
              <button
                onClick={handleDecrement}
                className="px-3.5 py-2 hover:bg-slate-50 text-slate-600 font-bold transition-colors"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-2 text-sm font-extrabold text-slate-800 min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="px-3.5 py-2 hover:bg-slate-50 text-slate-600 font-bold transition-colors"
              >
                +
              </button>
            </div>

            {/* Add to Cart button */}
             <button
                 onClick={handleAddToCart}
                 className="flex-grow flex items-center justify-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold text-sm rounded-lg shadow-sm shadow-red-100 hover:shadow-md hover:scale-[1.01] transition-all duration-200"
               >
                 <IoCartOutline className="w-4 h-4" />
                 Add to Cart
               </button>

            {/* Wishlist toggle icon */}
            <button
              onClick={handleWishlistToggle}
              className={`p-3 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-200 ${
                isWishlisted
                  ? "bg-red-50 border-red-200 text-red-500"
                  : "bg-white border-slate-200 text-slate-700 hover:text-red-500 hover:border-slate-300"
              }`}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              {isWishlisted ? <IoHeart className="w-5 h-5" /> : <IoHeartOutline className="w-5 h-5" />}
            </button>
          </div>

          {/* Delivery & Warranty info cards */}
          <div className="border border-slate-250 rounded-xl divide-y divide-slate-200 bg-white overflow-hidden shadow-sm">
            <div className="flex items-start gap-4 p-4">
              <IoCarOutline className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-extrabold text-slate-900">Free Delivery</h4>
                <p className="text-[10px] text-slate-500 mt-0.5 hover:underline cursor-pointer">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4">
              <IoRefreshOutline className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-extrabold text-slate-900">Return Delivery</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Free 30 Days Delivery Returns. <span className="hover:underline text-slate-700 font-medium cursor-pointer">Details</span>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4">
              <IoShieldCheckmarkOutline className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-extrabold text-slate-900">Product Protection</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  {product.warrantyInformation || "1 Year Manufacturer Brand Warranty Included."}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
