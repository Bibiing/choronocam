import Header from "../components/Header";
import Upload from "../components/landing/Upload";
import Instructions from "../components/landing/Instructions";
import FAQ from "../components/landing/FAQ";
import Footer from "../components/Footer";

const LandingPage = () => (
  <div className="mx-auto font-poppins">
    <Header />
    <main className="mt-[120px] container max-w-5xl mx-auto px-4 py-8 flex-grow">
      <h1 className="text-3xl font-bold text-center text-[#365486] mb-8">
        Upload Your Images
      </h1>
      <Upload />
      <Instructions />
      <FAQ />
    </main>
    <Footer />
  </div>
);

export default LandingPage;
