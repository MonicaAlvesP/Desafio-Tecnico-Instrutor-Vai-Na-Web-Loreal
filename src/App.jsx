import { BrowserRouter } from 'react-router-dom'
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import RoutesApp from "./Routes";
import { AppProvider } from './context/FilmsContext';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Header />
        <RoutesApp />
        <Footer />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
