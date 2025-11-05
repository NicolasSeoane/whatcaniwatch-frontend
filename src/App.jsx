import { BrowserRouter as Router } from "react-router-dom";
import { NavBar } from "./components/MenuComponents/NavBar";
import { MobileMenu } from "./components/MenuComponents/MobileMenu";
import { Footer } from "./components/MenuComponents/Footer";
import { useState } from "react";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Router>
      <NavBar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <MobileMenu mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <main className="pt-20 px-6 min-h-screen text-white">
        <AppRoutes /> 
      </main>
      <Footer />
    </Router>
  );
}

export default App;