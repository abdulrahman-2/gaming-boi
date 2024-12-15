import GridContainer from "@/components/defaults/GridContainer";
import Navbar from "@/components/nav/Navbar";
import Sidebar from "@/components/nav/Sidebar";
import { WishlistProvider } from "@/context/wishlistContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WishlistProvider>
      <main className="dark background grid min-h-screen h-full">
        <GridContainer cols={1} className={`md:grid-cols-10 lg:grid-cols-12`}>
          <Sidebar />
          <div className="px-[15px] md:px-10 lg:px-20 py-5 md:py-7 md:col-span-9 lg:col-span-10">
            <Navbar />
            {children}
          </div>
        </GridContainer>
      </main>
    </WishlistProvider>
  );
}
