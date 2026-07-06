import "../styles/hero.css";

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1>Discover Luxury Hotels</h1>

        <p>
          Explore premium stays across cities with comfort, style, and best deals.
        </p>

        {/* Scroll to Hotels */}
        <a href="#hotels">
          <button className="hero-btn">Explore Hotels</button>
        </a>
      </div>
    </section>
  );
}

export default Hero;