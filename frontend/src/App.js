import React, { useRef, useEffect, useState } from "react";
import Papa from "papaparse";
import "./App.css";
import logo from "./logo.png";
import MenuItem from "./MenuItem";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { UilSwiggy } from "@iconscout/react-unicons";

function App() {
  const [menuData, setMenuData] = useState({});
  const [usersbranch, setUsersBranch] = useState();

  // Branch → CSV URL mapping (replace gid with correct IDs for each tab)
  const sheetURLs = {
    MainBranch:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRLEaSr-g9olSw6cZg_Uv-YK7mrwCVpw1cj8x2C2nAYPbIUlpu-_mb-zcv6JO6GYecH4D6fQavoCFyz/pub?gid=0&single=true&output=csv",
    // Add more branches here...
  };

  // Refs for categories
  const categoryRefs = {
    "Cold Coffee": useRef(null),
    Mastani: useRef(null),
    Breakfast: useRef(null),
    Sandwich: useRef(null),
    "Misal Pav": useRef(null),
    Dosa: useRef(null),
    "Pav Bhaji": useRef(null),
    Bhurji: useRef(null),
    Shakes: useRef(null),
    Pizza: useRef(null),
    "Cold Drink": useRef(null),
    "Ice Cream": useRef(null),
    Snacks: useRef(null),
    "Quick Bites": useRef(null),
  };

  // Custom order for categories
  const categoryOrder = [
    "Cold Coffee",
    "Snacks",
    "Quick Bites",
    "Mastani",
    "Shakes",
    "Ice Cream",
    "Breakfast",
    "Dosa",
    "Sandwich",
    "Misal Pav",
    "Pav Bhaji",
    "Bhurji",
    "Pizza",
    "Cold Drink",
  ];

  // Get branch from query parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const branch = params.get("branch");
    setUsersBranch(branch);
  }, []);

  // Fetch and parse menu data from Google Sheets
  useEffect(() => {
    if (usersbranch && sheetURLs[usersbranch]) {
      fetch(sheetURLs[usersbranch])
        .then((res) => res.text())
        .then((csv) => {
          Papa.parse(csv, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              // Group items by category
              const grouped = results.data.reduce((acc, row) => {
                if (!row.Category) return acc; // skip empty rows
                if (!acc[row.Category]) acc[row.Category] = [];
                acc[row.Category].push({
                  name: row.Name,
                  desc: row.Desc,
                  price: row.Price,
                  topping_price: row["Topping Price"],
                  image: row.ImageURL, // can be direct link
                });
                return acc;
              }, {});
              setMenuData(grouped);
            },
          });
        })
        .catch((err) => console.error("Error fetching sheet:", err));
    }
  }, [usersbranch]);

  // Scroll to category when button clicked
  const scrollToCategory = (category) => {
    categoryRefs[category]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Header */}
      <header className="AppBar">
        <a href="https://hoteldurgapune.com/">
          <img height={200} src={logo} className="AppBar-logo" alt="logo" />
        </a>
      </header>

      <br />

      {/* Branch Welcome */}
      {usersbranch && (
        <div
          className="Category-title"
          style={{
            fontFamily: "inherit",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {`Welcome to ${usersbranch}`} !
        </div>
      )}

      {/* Title */}
      <div style={{ fontFamily: "sans-serif", textAlign: "center" }}>
        <h3>To choose from:</h3>
      </div>

      {/* Category Buttons */}
      <div className="Category-buttons">
        {categoryOrder
          .filter((category) => menuData[category])
          .map((category) => (
            <button
              key={category}
              onClick={() => scrollToCategory(category)}
              className="Category-button"
            >
              {category}
            </button>
          ))}
      </div>

      {/* Menu Items */}
      <div className="Menu">
        {categoryOrder
          .filter((category) => menuData[category])
          .map((category) => (
            <div
              key={category}
              className="Menu-category"
              ref={categoryRefs[category]}
            >
              <h2 className="Category-title">{category}</h2>
              <div className="Category-items">
                {menuData[category].map((item, index) => (
                  <MenuItem
                    key={index}
                    name={item.name}
                    desc={item.desc}
                    price={item.price}
                    toppingPrice={item.topping_price}
                    image={item.image} // direct from sheet
                  />
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* Footer */}
      <footer className="Footer">
        <div className="Footer-content">
          <div className="Footer-social">
            <a
              href="https://www.instagram.com/hoteldurga1987/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.facebook.com/p/owner-of-Hotel-durga-100054278300215/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://g.co/kgs/621FDxF"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-google"></i>
            </a>
            <a
              href="https://www.swiggy.com/city/pune/hotel-durga-kothrud-rest756038"
              target="_blank"
              rel="noopener noreferrer"
            >
              <UilSwiggy />
            </a>
            <a
              href="https://www.zomato.com/pune/hotel-durga-1-kothrud"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-utensils"></i>
            </a>
          </div>
          <p>For enquiries: 9823049723 | 9665660166 </p>
          <p>Email us: d2dhapse11@gmail.com | dhapsemangesh@gmail.com</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
