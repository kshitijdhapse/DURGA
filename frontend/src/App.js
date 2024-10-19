import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // Import general styles
import logo from "./logo.png";
import MenuItem from "./MenuItem";
import Modal from "react-modal";

function App() {
  const [menuData, setMenuData] = useState({});
  const [usersbranch, setUsersBranch] = useState();
  const [branches, setBranches] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(true); // Modal starts open

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

  // Fetch menu data for the selected branch
  useEffect(() => {
    if (usersbranch) {
      axios
        .get(`http://127.0.0.1:8000/menu/${usersbranch}`)
        .then((response) => {
          setMenuData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching menu data:", error);
        });
    }
  }, [usersbranch]); // Refetch menu when branch is selected

  // Fetch available branches from API
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/branches`)
      .then((response) => {
        setBranches(response.data);
      })
      .catch((error) => {
        console.error("Error fetching branches:", error);
      });
  }, []);

  // Handle branch selection
  const selectBranch = (branch) => {
    setUsersBranch(branch);
    setModalIsOpen(false); // Close modal after selection
  };

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

      {/* Branch Selection Modal */}
      <Modal isOpen={modalIsOpen} ariaHideApp={false} className="Modal">
        <h2>Where are you at ?</h2>
        <ul className="Branch-list">
          {branches.map((branch, index) => (
            <li key={index} className="Branch-item">
              <button onClick={() => selectBranch(branch.branch)}>
                {branch.branch}
              </button>
            </li>
          ))}
        </ul>
      </Modal>

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
                  image={`http://127.0.0.1:8000/media/${item.image}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
