import Footer from "../components/Footer";
import Main from "../components/Main";
import Header from "../components/Navbar";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Main />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
