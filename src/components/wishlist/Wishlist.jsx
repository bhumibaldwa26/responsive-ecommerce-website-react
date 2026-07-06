import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IoHeartOutline, IoTrashOutline, IoCartOutline } from "react-icons/io5";
import { toast } from "sonner";
import ProductCard from "../product/ProductCard";
import { clearWishlist } from "../../redux/features/wishlistSlice";
import { addToCart } from "../../redux/features/cartSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleClearWishlist = () => {
    if (window.confirm("Are you sure you want to clear your wishlist?")) {
      dispatch(clearWishlist());
      toast.success("Wishlist cleared!");
    }
  };

  const handleAddAllToCart = () => {
    if (wishlistItems.length === 0) return;
    
    wishlistItems.forEach((item) => {
      dispatch(addToCart(item));
    });
    
    dispatch(clearWishlist());
    toast.success("All wishlist items moved to your cart!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      
      {/* Header section with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Wishlist
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            You have <span className="font-semibold text-red-500">{wishlistItems.length}</span> items in your wishlist.
          </p>
        </div>

        {wishlistItems.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleClearWishlist}
              className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 hover:text-red-500 hover:border-red-200 rounded-lg text-sm font-semibold transition-all duration-200"
            >
              <IoTrashOutline className="w-4 h-4" />
              Clear Wishlist
            </button>
            <button
              onClick={handleAddAllToCart}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold shadow-sm shadow-red-100 transition-all duration-200"
            >
              <IoCartOutline className="w-4 h-4" />
              Move All to Cart
            </button>
          </div>
        )}
      </div>

      {/* Wishlist Items Grid / Empty State */}
      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 px-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-6 animate-pulse">
            <IoHeartOutline className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Your wishlist is empty</h2>
          <p className="text-slate-500 max-w-sm mt-2 text-sm">
            Explore our curated items and click the heart icon on any product to save it here.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center justify-center bg-slate-900 hover:bg-red-500 text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-md hover:scale-105 transition-all duration-200"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
