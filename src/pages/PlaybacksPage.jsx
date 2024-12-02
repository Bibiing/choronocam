import Header from "../components/Header";
import Playbacks from "../components/PlayBack/PlayBack";
import Footer from "../components/Footer";

const PlaybacksPage = () => (
  <div className="font-poppins">
    <Header />
    <main className="mt-[120px]">
      <Playbacks />
    </main>
    <Footer />
  </div>
);

export default PlaybacksPage;
