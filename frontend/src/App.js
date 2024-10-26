import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // Import general styles
import logo from "./logo.png";
import MenuItem from "./MenuItem";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { UilSwiggy } from "@iconscout/react-unicons";

function App() {
  const [menuData, setMenuData] = useState({});
  const [usersbranch, setUsersBranch] = useState();
  // Initialize refs at the top level of the component
  const coldCoffeeRef = useRef(null);
  const breakfastRef = useRef(null);
  const sandwichRef = useRef(null);
  const misalPavRef = useRef(null);
  const dosaRef = useRef(null);
  const pavBhajiRef = useRef(null);
  const bhurjiRef = useRef(null);
  const shakesRef = useRef(null);
  const pizzaRef = useRef(null);
  const coldDrinkRef = useRef(null);
  const iceCreamRef = useRef(null);
  const mastaniRef = useRef(null);

  // Map categories to their corresponding refs
  const categoryRefs = {
    "Cold Coffee": coldCoffeeRef,
    Breakfast: breakfastRef,
    Sandwich: sandwichRef,
    "Misal Pav": misalPavRef,
    Dosa: dosaRef,
    "Pav Bhaji": pavBhajiRef,
    Bhurji: bhurjiRef,
    Shakes: shakesRef,
    Pizza: pizzaRef,
    "Cold Drink": coldDrinkRef,
    "Ice Cream": iceCreamRef,
    Mastani: mastaniRef,
  };

  // Get branch from query parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const branch = params.get("branch");
    setUsersBranch(branch);
  }, []);

  // Fetch menu data for the selected branch
  useEffect(() => {
    if (usersbranch) {
      axios
        .get(`https://durgamenu.onrender.com/menu/${usersbranch}`)
        .then((response) => {
          setMenuData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching menu data:", error);
        });
    }
  }, [usersbranch]); // Refetch menu when branch is selected

  // Scroll to the category when the button is clicked
  const scrollToCategory = (category) => {
    categoryRefs[category]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <header className="AppBar">
        <a href="https://hoteldurgapune.com/">
          <img height={200} src={logo} className="AppBar-logo" alt="logo" />
        </a>
      </header>

      <br></br>

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

      <div style={{ fontFamily: "sans-serif", textAlign: "center" }}>
        <h3>To choose from:</h3>
      </div>

      <div className="Category-buttons">
        {Object.keys(menuData).map((category) => (
          <button
            key={category}
            onClick={() => scrollToCategory(category)}
            className="Category-button"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="Menu">
        {Object.entries(menuData).map(([category, items]) => (
          <div
            key={category}
            className="Menu-category"
            ref={categoryRefs[category]} // Assign ref to each category
          >
            <h2 className="Category-title">{category}</h2>
            <div className="Category-items">
              {items.map((item, index) => (
                <MenuItem
                  key={index}
                  name={item.name}
                  desc={item.desc}
                  price={item.price}
                  topping={item.topping}
                  toppingPrice={item.topping_price}
                  image={`https://durgamenu.onrender.com/media/${item.image}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
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
              <i className="fas fa-utensils"></i> {/* Zomato */}
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
