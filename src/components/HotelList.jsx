import { useEffect, useState } from "react";
import { getHotels } from "../services/hotelApi";
import "../styles/hotelList.css";

function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 10;

  useEffect(() => {
    loadHotels();
  }, []);

  async function loadHotels() {
    try {
      const data = await getHotels();
      setHotels(data.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading hotels...</h2>;
  }

  // FILTER LOGIC
  let filteredHotels = hotels.filter((hotel) => {
    return (
      hotel.name.toLowerCase().includes(search.toLowerCase()) &&
      (location === "" ||
        hotel.location.toLowerCase().includes(location.toLowerCase())) &&
      (minPrice === "" || hotel.price >= Number(minPrice)) &&
      (maxPrice === "" || hotel.price <= Number(maxPrice)) &&
      (rating === "" || hotel.rating >= Number(rating))
    );
  });

  // SORTING
  if (sort === "low") {
    filteredHotels.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filteredHotels.sort((a, b) => b.price - a.price);
  }

  // PAGINATION
  const indexOfLast = currentPage * hotelsPerPage;
  const indexOfFirst = indexOfLast - hotelsPerPage;
  const currentHotels = filteredHotels.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);

  return (
    <div id="hotels">
      <h2 style={{ textAlign: "center" }}>🏨 Available Hotels</h2>

      {/* FILTERS */}
      <div className="filters">
        <input
          placeholder="Search name"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            setCurrentPage(1);
          }}
        />

        <input
          type="number"
          placeholder="Min Price"
          onChange={(e) => {
            setMinPrice(e.target.value);
            setCurrentPage(1);
          }}
        />

        <input
          type="number"
          placeholder="Max Price"
          onChange={(e) => {
            setMaxPrice(e.target.value);
            setCurrentPage(1);
          }}
        />

        <input
          type="number"
          placeholder="Rating"
          onChange={(e) => {
            setRating(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          onChange={(e) => {
            setSort(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Sort</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
        </select>
      </div>

      {/* HOTEL GRID */}
      <div className="hotel-container">
        {currentHotels.length === 0 ? (
          <p style={{ textAlign: "center" }}>No hotels found 😢</p>
        ) : (
          currentHotels.map((hotel) => (
            <div key={hotel.id} className="hotel-card">
              
              <img
                src={
                  hotel.image
                    ? `https://demohotelsapi.pythonanywhere.com${hotel.image}`
                    : `https://picsum.photos/400/300?random=${hotel.id}`
                }
                alt={hotel.name}
                className="hotel-img"
                loading="lazy"
                onError={(e) => {
                  e.target.src = `https://picsum.photos/400/300?random=${hotel.id}`;
                }}
              />

              <div className="hotel-info">
                <h3>{hotel.name}</h3>
                <p>📍 {hotel.location}</p>
                <p>⭐ {hotel.rating}</p>
                <p>💰 ₹{hotel.price}</p>

                <button className="book-btn">Book Now</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span>
          {currentPage} / {totalPages || 1}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default HotelList;