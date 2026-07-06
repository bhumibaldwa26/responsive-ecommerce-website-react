import { IoPaperPlaneOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-200 mt-20 pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pb-12">
        
        {/* Brand Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold tracking-wider text-white uppercase">Exclusive</h3>
          <p className="text-sm font-semibold text-white">Subscribe</p>
          <p className="text-xs text-slate-400">Get 10% off your first order</p>
          <form className="flex items-center border border-slate-700 bg-slate-900 rounded focus-within:ring-2 focus-within:ring-red-400 focus-within:ring-opacity-50 overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent text-xs px-3 py-2 w-full focus:outline-none text-slate-200 placeholder-slate-500"
            />
            <button type="submit" className="p-2 text-white hover:text-red-400 transition-colors duration-150">
              <IoPaperPlaneOutline className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Support</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            111 Bijoy Sarani, Dhaka, <br />
            DH 1515, Bangladesh.
          </p>
          <p className="text-xs text-slate-400">exclusive@gmail.com</p>
          <p className="text-xs text-slate-400">+88015-88888-9999</p>
        </div>

        {/* Quick Links 1 */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Account</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <a href="#" className="hover:text-white transition-colors duration-150">My Account</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors duration-150">Login / Register</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors duration-150">Cart</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors duration-150">Wishlist</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors duration-150">Shop</a>
            </li>
          </ul>
        </div>

        {/* Quick Links 2 */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Link</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <a href="#" className="hover:text-white transition-colors duration-150">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors duration-150">Terms Of Use</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors duration-150">FAQ</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors duration-150">Contact</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-900 text-center">
        <p className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Exclusive. All rights reserved. Designed for excellence.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
