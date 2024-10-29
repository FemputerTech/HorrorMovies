import Header from "./components/Headers/Header";
import Sidebar from "./components/Sidebars/Sidebar";
import Main from "./components/Mains/Main";
import Footer from "./components/Footers/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header name="Meghan" />
      <Sidebar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
