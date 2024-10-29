import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
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
