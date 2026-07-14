import RootLayout from "./components/layout/RootLayout";
import About from "./components/about/About";
import LandingPage from "./pages/LandingPage";
import NewArrival from "./components/home/NewArrival";
import ProductPage from "./pages/ProductPage";
import ProductDetails from "./components/product/ProductDetails";
import Cart from "./components/cart/Cart";
import Wishlist from "./components/wishlist/Wishlist";
import SearchResultsPage from "./pages/SearchResultsPage";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import ContactPage from "./pages/ContactPage";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route
        index
        element={
          <>
            <LandingPage />
            <NewArrival />
            <ProductPage />
          </>
        }
      />
      <Route path="/search-results" element={<SearchResultsPage />} />

      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
