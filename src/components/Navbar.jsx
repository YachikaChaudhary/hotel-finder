import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>🏨 HotelFinder</h2>

      <div>
        <a href="#home">Home</a>
        <a href="#hotels">Hotels</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;