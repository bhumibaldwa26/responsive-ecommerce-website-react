import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

// Initialize PDF document
const doc = new PDFDocument({
  size: "A4",
  margins: { top: 50, bottom: 50, left: 50, right: 50 },
  bufferPages: true,
});

// Stream to file
const outputPdfPath = path.resolve("./Exclusive_Architecture_Guide.pdf");
const writeStream = fs.createWriteStream(outputPdfPath);
doc.pipe(writeStream);

// Colors (using Exclusive Brand Colors)
const COLORS = {
  primary: "#DB4444",   // Red Accent
  textDark: "#0F172A",  // Slate 900
  textLight: "#475569", // Slate 600
  bgLight: "#F8FAFC",   // Slate 50
  border: "#E2E8F0",    // Slate 200
  white: "#FFFFFF",
};

// ==========================================
// TITLE PAGE
// ==========================================
doc.rect(0, 0, 595.28, 841.89).fill(COLORS.bgLight);

// Header Decorative Bar
doc.rect(0, 0, 595.28, 15).fill(COLORS.primary);

// Cover Title
doc.fillColor(COLORS.primary);
doc.fontSize(16).font("Helvetica-Bold").text("EXCLUSIVE E-COMMERCE", 50, 220);

doc.fillColor(COLORS.textDark);
doc.fontSize(32).font("Helvetica-Bold").text("Architecture & Code Reference Guide", 50, 245, {
  width: 450,
  lineGap: 10,
});

// Divider
doc.moveTo(50, 360).lineTo(250, 360).lineWidth(4).stroke(COLORS.primary);

// Subtitle
doc.fillColor(COLORS.textLight);
doc.fontSize(12).font("Helvetica").text(
  "A detailed technical guide explaining each folder, slice, component, and file created or modified to implement Wishlist, Shopping Cart, Search, and Category systems.",
  50,
  380,
  { width: 450, lineGap: 6 }
);

// Metadata
doc.fillColor(COLORS.textDark);
doc.fontSize(10).font("Helvetica-Bold").text("Author:", 50, 580);
doc.font("Helvetica").text("Antigravity AI Assistant", 100, 580);

doc.font("Helvetica-Bold").text("Date:", 50, 600);
doc.font("Helvetica").text(new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }), 100, 600);

doc.font("Helvetica-Bold").text("Tech Stack:", 50, 620);
doc.font("Helvetica").text("React.js, Redux Toolkit, RTK Query, Tailwind CSS, React Router", 120, 620);

// Add page
doc.addPage();

// ==========================================
// REGISTER HEADER & FOOTER ON SUBSEQUENT PAGES
// ==========================================
doc.on("pageAdded", () => {
  // Page decorations
  doc.rect(0, 0, 595.28, 8).fill(COLORS.primary);
  
  // Footer page number will be added at the end using bufferPages
});

// Helper: Page Title Header
function renderSectionHeader(title) {
  doc.addPage();
  doc.fillColor(COLORS.primary);
  doc.fontSize(18).font("Helvetica-Bold").text(title, 50, 60);
  doc.moveTo(50, 85).lineTo(545, 85).lineWidth(1).stroke(COLORS.border);
  doc.y = 100;
}

// Helper: File Details Card
function renderFileCard(filePath, purpose, keyCreations) {
  // Draw card bg
  const startY = doc.y;
  
  doc.fontSize(12).font("Helvetica-Bold").fillColor(COLORS.textDark).text(filePath, 60, startY + 10);
  
  doc.fontSize(9).font("Helvetica-Bold").fillColor(COLORS.primary).text("PURPOSE:", 70, doc.y + 8);
  doc.fontSize(10).font("Helvetica").fillColor(COLORS.textLight).text(purpose, 85, doc.y - 1, { width: 440, lineGap: 3 });
  
  doc.fontSize(9).font("Helvetica-Bold").fillColor(COLORS.primary).text("KEY DETAILS:", 70, doc.y + 6);
  
  keyCreations.forEach((item) => {
    doc.fontSize(10).font("Helvetica").fillColor(COLORS.textLight).text(`•  ${item}`, 85, doc.y + 3, { width: 440, lineGap: 3 });
  });
  
  const endY = doc.y + 15;
  
  // Draw a left border line as indicator
  doc.moveTo(50, startY + 8).lineTo(50, endY - 8).lineWidth(3).stroke(COLORS.primary);
  // Bottom padding spacing
  doc.y = endY + 10;
}

// ==========================================
// SECTION 1: STATE MANAGEMENT & REDUX
// ==========================================
renderSectionHeader("1. State Management & Redux Architecture");

doc.fontSize(11).font("Helvetica").fillColor(COLORS.textLight).text(
  "Global state management acts as the backbone of our e-commerce engine, handling cart items, prices, wishlist status, and asynchronous product fetching. Slices are written using Redux Toolkit (@reduxjs/toolkit) for standard synchronous actions and RTK Query (createApi) for clean caching operations.",
  50,
  doc.y,
  { width: 495, lineGap: 5 }
);
doc.y += 20;

renderFileCard(
  "src/redux/store/index.js",
  "Initializes the central Redux Store and wires up combined reducers.",
  [
    "Registers standard slices: cart (cartReducer) and wishlist (wishlistReducer) for local UI states.",
    "Binds apiSlice.reducer for handling queries to the external DummyJSON API.",
    "Sets up default middleware concatenated with the apiSlice RTK Query middleware.",
    "Ensures all page components hook into a single, unified store context."
  ]
);

renderFileCard(
  "src/redux/features/apiSlice.js",
  "Implements RTK Query hooks targeting DummyJSON API endpoints.",
  [
    "Unified getProducts query accepting page, limit, category, and search parameters.",
    "Added getCategories endpoint returning available catalog categories dynamically.",
    "Added single getProduct endpoint for fetching detailed product listings by unique ID.",
    "Leverages automatic caching, query deduping, and state query tags."
  ]
);

renderFileCard(
  "src/redux/features/cartSlice.js",
  "Standard slice managing shopping cart items, quantities, totals, and persistence.",
  [
    "Uses createSlice with initial state read from localStorage.",
    "Calculates totalQuantity and totalAmount values automatically on state changes.",
    "addToCart: appends new items or increments quantity if item is already present.",
    "removeFromCart & updateQuantity: handles individual item removals or increment adjustments.",
    "clearCart: clears shopping cart state and resets all totals to zero.",
    "Saves cart array data directly to localStorage under 'cartItems' instantly."
  ]
);

renderFileCard(
  "src/redux/features/wishlistSlice.js",
  "Standard slice managing saved products, preventing duplicates, and handling persistence.",
  [
    "Stores liked items and persists state under local storage key 'wishlistItems'.",
    "toggleWishlist: pushes product object if missing, or filters it out if already present.",
    "removeFromWishlist: removes item from the list by filtering on the product id.",
    "clearWishlist: clears all wishlist items, resetting back to an empty state."
  ]
);

// ==========================================
// SECTION 2: GLOBAL LAYOUTS & NAVBAR
// ==========================================
renderSectionHeader("2. Global Layouts & Navigation Menu");

doc.fontSize(11).font("Helvetica").fillColor(COLORS.textLight).text(
  "Layout components govern the outer design framework, headers, footers, notifications, and responsive navigation bars. They provide a structural container that wraps around specific routed pages.",
  50,
  doc.y,
  { width: 495, lineGap: 5 }
);
doc.y += 20;

renderFileCard(
  "src/components/layout/RootLayout.jsx",
  "App viewport parent routing layout defining global container frames.",
  [
    "Combines the sticky navbar (NavigationMenuDemo) and main page outlet (<Outlet />).",
    "Renders the newly designed global footer component (Footer) at the bottom.",
    "Configures and mounts the sonner toast notification system globally (<Toaster position='bottom-right' richColors />).",
    "Uses a flexbox column layout structure ('flex flex-col min-h-screen') ensuring the footer is pinned to the page bottom."
  ]
);

renderFileCard(
  "src/components/layout/Footer.jsx",
  "Premium multi-column site footer displaying metadata and navigation shortcuts.",
  [
    "Renders e-commerce store brand details and local office coordinates.",
    "Incorporates quick links to user account portals, cart screens, and contact details.",
    "Includes newsletter subscription forms featuring styled submit icons.",
    "Fully styled using Slate-950 dark thematic grids with subtle borders and typography."
  ]
);

renderFileCard(
  "src/components/NavigationMenuDemo.jsx",
  "Sticky glassmorphic navigation header providing action anchors and search filters.",
  [
    "Sticky top positioning backed by white translucent backdrop blur filters.",
    "Integrates active state links highlighting Home, About, and Contact pages.",
    "Subscribes to Redux selectors to draw red notification badges displaying live cart counts (totalQuantity) and wishlist counts.",
    "Supports real-time search submissions navigating to query-based routes.",
    "Collapses into a slide-down mobile responsive menu triggered by hamburger actions."
  ]
);

// ==========================================
// SECTION 3: PRODUCT GRID & DETAILS
// ==========================================
renderSectionHeader("3. Product Cards & Detail Visuals");

doc.fontSize(11).font("Helvetica").fillColor(COLORS.textLight).text(
  "Product-centric components parse API values to construct visual lists, product detail sheets, galleries, color selectors, and cart/wishlist quick-action buttons.",
  50,
  doc.y,
  { width: 495, lineGap: 5 }
);
doc.y += 20;

renderFileCard(
  "src/components/product/ProductCard.jsx",
  "Reusable e-commerce product card showing prices, discounts, and floating icons.",
  [
    "Floating toggle wishlist Heart icon connected to wishlistSlice (filled/outline state).",
    "Shows discount percentage badges and calculates/renders original crossed-out prices.",
    "Renders stars ratings using react-rating-stars-component.",
    "Implements a hover overlay displaying an 'Add to Cart' action button on desktop (always visible on mobile viewports).",
    "Blocks click propagation on buttons to prevent trigger navigation to detail pages.",
    "PropType structure updated to support images as arrays or strings safely."
  ]
);

renderFileCard(
  "src/components/product/ProductDetails.jsx",
  "Detailed product specs sheet containing image selectors and specifications.",
  [
    "Thumbnail gallery panel letting users cycle through up to 4 product image assets.",
    "Reads live wishlist status from Redux to color the detail heart trigger.",
    "Interactive color selection and size toggle buttons (XS to XL) displayed on relevant categories.",
    "Fully custom numeric quantity selectors (- / + counter controls).",
    "Connects triggers to standard Redux dispatchers (addToCart, toggleWishlist) with sonner toast notifications.",
    "Draws detail cards for shipping delivery details, warranty, and return policies."
  ]
);

// ==========================================
// SECTION 4: PRODUCT FILTER PAGES
// ==========================================
renderSectionHeader("4. Page Templates & Category Filters");

doc.fontSize(11).font("Helvetica").fillColor(COLORS.textLight).text(
  "Page templates render specific lists of filtered items, search results, shopping cart summaries, and wishlist grids.",
  50,
  doc.y,
  { width: 495, lineGap: 5 }
);
doc.y += 20;

renderFileCard(
  "src/components/product/ProductPage.jsx",
  "Primary product exploration screen supporting horizontal scrollable category pills.",
  [
    "Displays a scrollable horizontal category navigation bar fetched dynamically from the API.",
    "Syncs active filters and pagination pages directly inside React Router's URL query search params (?category=slug&page=1).",
    "Renders animated, pulsing card loading skeletons during API fetching operations.",
    "Resets page pagination counters to 1 whenever a category filter is changed."
  ]
);

renderFileCard(
  "src/components/product/SearchResultsPage.jsx",
  "Search query parser using the DummyJSON Search API with dynamic category sub-filters.",
  [
    "Queries the complete database via apiSlice search parameters.",
    "Extracts categories dynamically from matching items, letting users filter search results by category dynamically.",
    "Fixes a container click bug in the original code that forced page redirection errors.",
    "Reuses ProductCard templates for consistent ratings, discounts, and badges.",
    "Renders visual empty search results plates when no items are found."
  ]
);

renderFileCard(
  "src/components/wishlist/Wishlist.jsx",
  "Saved items portal giving users rapid options to transfer products.",
  [
    "Displays a grid of all wishlisted products from Redux state.",
    "Add actions to clear the wishlist or transfer all saved products directly into the cart (Move All to Cart).",
    "Renders a polished empty state with heart icons and navigation triggers if no products are saved."
  ]
);

renderFileCard(
  "src/components/cart/Cart.jsx",
  "Checkout cart page displaying chosen products, subtotals, and checkouts.",
  [
    "Presents cart items in a clean table detailing product thumbnails, prices, quantity counters, and subtotals.",
    "Connects quantity adjustments directly to Redux updateQuantity dispatches.",
    "Renders coupon inputs and calculates shipping costs (Free above $100, $15 otherwise).",
    "Triggers a mock checkout action that empties the cart and issues success toasts."
  ]
);

// ==========================================
// FOOTER PAGE NUMBERS (Post-Process)
// ==========================================
const range = doc.bufferedPageRange();
for (let i = 0; i < range.count; i++) {
  doc.switchToPage(i);
  
  // Skip cover page
  if (i > 0) {
    doc.fillColor(COLORS.textLight);
    doc.fontSize(8).font("Helvetica");
    
    // Header brand
    doc.text("Exclusive E-Commerce Website | Technical Reference Guide", 50, 35);
    
    // Page count
    doc.text(`Page ${i + 1} of ${range.count}`, 50, 805, { align: "right", width: 495 });
  }
}

// Finalize PDF file
doc.end();
console.log("PDF generated successfully!");
