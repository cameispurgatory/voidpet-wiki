import Navbar from "./navbar";
import Footer from "./footer";

function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-screen-xl flex flex-col min-h-screen px-4 ">
      <Navbar />
      <main className="flex-1 mx-8">{props.children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
