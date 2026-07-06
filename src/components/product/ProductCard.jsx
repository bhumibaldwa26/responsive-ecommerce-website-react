import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoHeart, IoHeartOutline, IoCartOutline } from "react-icons/io5";
import ReactStars from "react-rating-stars-component";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { addToCart } from "../../redux/features/cartSlice";
import { toggleWishlist } from "../../redux/features/wishlistSlice";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get wishlisted status from Redux
  const isWishlisted = useSelector((state) =>
    state.wishlist.items.some((item) => item.id === product.id)
  );

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation(); // Prevent navigating to detail page
    dispatch(toggleWishlist(product));
    if (isWishlisted) {
      toast.success(`Removed "${product.title}" from wishlist!`);
    } else {
      toast.success(`Added "${product.title}" to wishlist!`);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigating to detail page
    dispatch(addToCart(product));
    toast.success(`Added "${product.title}" to cart!`);
  };

  // Get display image safely
  const displayImage = product.thumbnail || (Array.isArray(product.images) ? product.images[0] : product.images);

  // Calculate discount display
  const hasDiscount = product.discountPercentage && product.discountPercentage > 0;
  const originalPrice = hasDiscount
    ? Math.round(product.price / (1 - product.discountPercentage / 100))
    : null;

  return (
    <div
      onClick={handleClick}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer h-full"
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100 flex items-center justify-center p-4">
        
        {/* Discount Badge */}
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-extrabold px-2 py-1 rounded uppercase tracking-wider z-10 shadow-sm">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}

        {/* Wishlist Heart Toggle Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 p-2 rounded-full bg-white text-slate-700 hover:text-red-500 shadow-sm hover:shadow-md transition-all duration-200 z-10 focus:outline-none"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? (
            <IoHeart className="w-5 h-5 text-red-500 animate-pulse" />
          ) : (
            <IoHeartOutline className="w-5 h-5" />
          )}
        </button>

        {/* Product Image */}
        <img
          src={displayImage}
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 ease-in-out"
          loading="lazy"
        />

        {/* Add to Cart Overlay on Hover (Desktop only, fallback below for mobile) */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:flex justify-center z-10">
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-slate-900 hover:bg-red-500 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-lg hover:scale-105 transition-all duration-200"
          >
            <IoCartOutline className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Details info */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-slate-800 text-sm hover:text-red-500 transition-colors duration-150 line-clamp-1 mb-1">
          {product.title}
        </h3>
        
        {/* Pricing block */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-base font-extrabold text-red-500">${product.price}</span>
          {hasDiscount && originalPrice && (
            <span className="text-xs text-slate-400 line-through">${originalPrice}</span>
          )}
        </div>

        {/* Rating and footer elements */}
        <div className="mt-auto pt-2 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center">
            <ReactStars
              count={5}
              value={product.rating || 4}
              size={16}
              edit={false}
              activeColor="#ffd700"
              classNames="pointer-events-none"
            />
            <span className="text-[10px] font-semibold text-slate-500 ml-1.5 mt-0.5">
              ({product.rating?.toFixed(1) || "4.0"})
            </span>
          </div>
        </div>

        {/* Add to Cart button for Mobile viewport */}
        <button
          onClick={handleAddToCart}
          className="md:hidden mt-3 w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-red-500 text-white font-semibold text-xs py-2 rounded-lg transition-colors duration-150"
        >
          <IoCartOutline className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    images: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    thumbnail: PropTypes.string,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number,
    category: PropTypes.string,
    discountPercentage: PropTypes.number,
  }).isRequired,
};

export default ProductCard;
