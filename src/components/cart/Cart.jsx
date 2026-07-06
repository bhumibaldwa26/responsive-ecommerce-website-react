import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IoTrashOutline, IoCartOutline, IoArrowBackOutline, IoGiftOutline } from "react-icons/io5";
import { toast } from "sonner";
import { removeFromCart, updateQuantity, clearCart } from "../../redux/features/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  
  // Get cart values from Redux
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const handleRemove = (id, title) => {
    dispatch(removeFromCart(id));
    toast.success(`Removed "${title}" from cart`);
  };

  const handleQuantityChange = (id, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty >= 1) {
      dispatch(updateQuantity({ id, quantity: newQty }));
    }
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      dispatch(clearCart());
      toast.success("Cart cleared!");
    }
  };

  const handleCheckout = () => {
    toast.success("Order Placed Successfully! Thank you for shopping with Exclusive.");
    dispatch(clearCart());
  };

  // Pricing calculations
  const shippingCost = totalAmount > 100 ? 0 : totalAmount > 0 ? 15 : 0;
  const finalTotal = totalAmount + shippingCost;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      
      {/* Page Title */}
      <div className="border-b border-slate-100 pb-6 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Shopping Cart
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review your chosen items before final checkout.
        </p>
      </div>

      {cartItems.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center text-center py-20 px-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 mb-6">
            <IoCartOutline className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Your cart is empty</h2>
          <p className="text-slate-500 max-w-sm mt-2 text-sm">
            Looks like you haven&apos;t added anything to your cart yet. Head back to explore our items!
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center justify-center bg-slate-900 hover:bg-red-500 text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-md hover:scale-105 transition-all duration-200"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        /* Cart Content Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cart items table (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Table layout - Desktop */}
            <div className="hidden sm:block bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                    <th className="py-4 px-6">Product</th>
                    <th className="py-4 px-6">Price</th>
                    <th className="py-4 px-6">Quantity</th>
                    <th className="py-4 px-6 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
                  {cartItems.map((item) => {
                    const displayImage = item.thumbnail || (Array.isArray(item.images) ? item.images[0] : item.images);
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-5 px-6 flex items-center gap-4">
                          <button
                            onClick={() => handleRemove(item.id, item.title)}
                            className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                            aria-label="Delete item"
                          >
                            <IoTrashOutline className="w-4 h-4" />
                          </button>
                          <div className="w-12 h-12 bg-slate-50 rounded-lg p-1.5 flex items-center justify-center shrink-0 border border-slate-100">
                            <img src={displayImage} alt={item.title} className="max-h-full max-w-full object-contain" />
                          </div>
                          <Link to={`/products/${item.id}`} className="font-semibold hover:text-red-500 transition-colors truncate max-w-[200px]">
                            {item.title}
                          </Link>
                        </td>
                        <td className="py-5 px-6 font-medium">${item.price.toFixed(2)}</td>
                        <td className="py-5 px-6">
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden w-28">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                              className="px-2.5 py-1.5 hover:bg-slate-100 text-slate-500 transition-colors font-bold"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="flex-grow text-center text-xs font-bold text-slate-800">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                              className="px-2.5 py-1.5 hover:bg-slate-100 text-slate-500 transition-colors font-bold"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-5 px-6 text-right font-bold text-slate-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* List layout - Mobile viewports */}
            <div className="sm:hidden space-y-4">
              {cartItems.map((item) => {
                const displayImage = item.thumbnail || (Array.isArray(item.images) ? item.images[0] : item.images);
                return (
                  <div key={item.id} className="bg-white border border-slate-100 rounded-xl p-4 flex gap-4 shadow-sm relative">
                    <button
                      onClick={() => handleRemove(item.id, item.title)}
                      className="absolute top-3 right-3 text-slate-400 hover:text-red-500 p-1"
                      aria-label="Delete item"
                    >
                      <IoTrashOutline className="w-5 h-5" />
                    </button>
                    
                    <div className="w-20 h-20 bg-slate-50 rounded-lg p-2 flex items-center justify-center shrink-0 border border-slate-100">
                      <img src={displayImage} alt={item.title} className="max-h-full max-w-full object-contain" />
                    </div>

                    <div className="flex-grow space-y-2">
                      <Link to={`/products/${item.id}`} className="font-bold text-slate-800 text-sm hover:text-red-500 block truncate pr-8">
                        {item.title}
                      </Link>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-500">${item.price.toFixed(2)}</span>
                        <span className="text-sm font-bold text-red-500">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      
                      {/* Qty adjustments */}
                      <div className="flex items-center border border-slate-250 rounded-lg overflow-hidden w-24">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                          className="px-2 py-1 hover:bg-slate-100 text-slate-500 transition-colors font-bold"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="flex-grow text-center text-xs font-bold text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                          className="px-2 py-1 hover:bg-slate-100 text-slate-500 transition-colors font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action buttons under items list */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 hover:text-red-500 hover:border-red-200 bg-white rounded-lg text-sm font-semibold transition-all duration-200"
              >
                <IoArrowBackOutline className="w-4 h-4" />
                Continue Shopping
              </Link>
              <button
                onClick={handleClearCart}
                className="px-4 py-2 border border-red-100 text-red-500 hover:bg-red-50 rounded-lg text-sm font-semibold transition-all duration-250"
              >
                Clear Shopping Cart
              </button>
            </div>

          </div>

          {/* Right Column: Checkout Totals Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Coupon Code section */}
            <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-3">
              <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2 uppercase tracking-wider">
                <IoGiftOutline className="w-4 h-4 text-red-500" />
                Have a Promo Coupon?
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="bg-slate-50 border border-slate-250 text-xs px-3.5 py-2.5 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-red-400 focus:bg-white text-slate-800"
                />
                <button
                  onClick={() => toast.success("Coupon code applied (mock details)")}
                  className="bg-slate-900 hover:bg-red-500 text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-colors shrink-0"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Summary card */}
            <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
                Order Summary
              </h3>
              
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="font-semibold text-slate-900">
                    {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                {shippingCost > 0 && (
                  <p className="text-[10px] text-slate-400 leading-normal">
                    Tip: Add <span className="font-bold text-red-500">${(100 - totalAmount).toFixed(2)}</span> more to qualify for FREE Shipping!
                  </p>
                )}
              </div>

              <div className="border-t border-slate-100 pt-4 flex justify-between items-baseline">
                <span className="text-base font-extrabold text-slate-950">Total Amount</span>
                <span className="text-xl font-black text-red-500">${finalTotal.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center py-3 bg-red-500 hover:bg-red-600 text-white font-bold text-sm rounded-lg shadow-sm shadow-red-100 hover:shadow-md hover:scale-[1.01] transition-all duration-200 mt-2"
              >
                Proceed to Checkout
              </button>
            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;
