import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import Cart from "../components/Cart";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodcat, setFoodCat] = useState([]);
  const [fooditem, setFoodItem] = useState([]);

  const loaddata = async () => {
    const response = await fetch("http://localhost:5000/api/fooddata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setFoodCat(data[1]); // Categories
    setFoodItem(data[0]); // Items
  };

  useEffect(() => {
    loaddata();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade position-relative"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1100&auto=format&fit=crop"
              className="d-block w-100 img-fluid"
              style={{
                width: "100vw",
                height: "100vh",
                objectFit: "cover",
                objectPosition: "center",
              }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://plus.unsplash.com/premium_photo-1663852297267-827c73e7529e?w=600&auto=format&fit=crop"
              className="d-block w-100 img-fluid"
              style={{
                width: "100vw",
                height: "100vh",
                objectFit: "cover",
                objectPosition: "center",
              }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=2070&auto=format&fit=crop"
              className="d-block w-100 img-fluid"
              style={{
                width: "100vw",
                height: "100vh",
                objectFit: "cover",
                objectPosition: "center",
              }}
              alt="..."
            />
          </div>
        </div>

        {/* Search Bar Positioned Above Bottom */}
        <div
          className="position-absolute d-flex justify-content-center"
          style={{
            bottom: "50px",
            left: "10%",
            width: "80%",
            zIndex: "10",
          }}
        >
          <form
            className="d-flex w-100 bg-light p-2 rounded-pill shadow"
            style={{ border: "2px solid #ccc" }}
          >
            <input
              className="form-control border-0 bg-transparent px-3"
              type="search"
              placeholder="Search anything..."
              aria-label="Search"
              onChange={(e)=>{setSearch(e.target.value)}}
              style={{ flex: 1, outline: "none" }}
            />
            <button
              className="btn btn-primary rounded-pill px-4"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
      <div className="container">
        {foodcat.length > 0 &&
          foodcat.map((category) => (
            <div key={category._id}>
              <h2 className="text-center">{category.CategoryName}</h2>
              <div className="row">
                {fooditem
                  .filter((item) => (item.CategoryName === category.CategoryName && item.name.toLowerCase().includes(search.toLowerCase())))
                  .map((filteredItem) => (
                    <div key={filteredItem._id} className="col-md-4 mb-4">
                      <Cards item={filteredItem} />
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}
