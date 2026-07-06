import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HotelList from "./components/HotelList";
import About from "./components/About";
import Contact from "./components/Contact";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <HotelList />
              <About />
              <Contact />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;