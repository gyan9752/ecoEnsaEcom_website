import "./globals.css";
import { CartProvider } from "@/app/context/CartContext";

export const metadata = {
  title: "Ecoensa - Pure Organic Living & Sustainable Products",
  description: "Hand-harvested organic spices, dry fruits, A2 ghee, and pure wild honey.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}