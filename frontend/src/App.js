import React, { useRef } from "react";
import "./App.css"; // Import general styles
import logo from "./logo.png";
import MenuItem from "./MenuItem";
import pohe from "./pohe.jpg";
import coffee from "./coffee.jpg";

const menuData = {
  "Cold Coffee": [
    {
      name: "Cold Coffee",
      desc: "Rich coffee in cold milk",
      price: "40.00",
      topping: "crush",
      topping_price: "15.00",
      image: coffee,
    },
  ],
  Breakfast: [
    {
      name: "Pohe",
      desc: "Delicious Flat Rice",
      price: "30.00",
      topping: null,
      topping_price: "None",
      image: pohe,
    },
    {
      name: "Upma",
      desc: "Super Tasty",
      price: "35.00",
      topping: "Shev",
      topping_price: "0.00",
      image: "",
    },
  ],
  Sandwich: [
    {
      name: "Veg Sandwich",
      desc: "Freshly cut vegetables with buttered bread",
      price: "50.00",
      topping: "Cheese",
      topping_price: "20.00",
      image: "",
    },
  ],
  "Misal Pav": [
    {
      name: "Misal Pav",
      desc: "Spicy sprouted bean curry served with bread",
      price: "45.00",
      topping: "Extra Curry",
      topping_price: "5.00",
      image: "",
    },
  ],
  Dosa: [
    {
      name: "Masala Dosa",
      desc: "Crispy dosa with spicy potato filling",
      price: "60.00",
      topping: "Coconut Chutney",
      topping_price: "0.00",
      image: "",
    },
  ],
  "Pav Bhaji": [
    {
      name: "Pav Bhaji",
      desc: "Spicy vegetable mash served with bread",
      price: "70.00",
      topping: "Butter",
      topping_price: "10.00",
      image: "",
    },
  ],
  Bhurji: [
    {
      name: "Egg Bhurji",
      desc: "Scrambled eggs with Indian spices",
      price: "55.00",
      topping: "Extra Egg",
      topping_price: "10.00",
      image: "",
    },
  ],
  Shakes: [
    {
      name: "Chocolate Shake",
      desc: "Rich chocolate shake with ice cream",
      price: "50.00",
      topping: "Whipped Cream",
      topping_price: "10.00",
      image: "",
    },
  ],
  Pizza: [
    {
      name: "Margherita Pizza",
      desc: "Classic cheese and tomato pizza",
      price: "100.00",
      topping: "Extra Cheese",
      topping_price: "20.00",
      image: "",
    },
  ],
  "Cold Drink": [
    {
      name: "Coke",
      desc: "Refreshing cold drink",
      price: "20.00",
      topping: "Ice",
      topping_price: "0.00",
      image: "",
    },
  ],
  "Ice Cream": [
    {
      name: "Vanilla Ice Cream",
      desc: "Creamy vanilla ice cream",
      price: "30.00",
      topping: "Chocolate Sauce",
      topping_price: "5.00",
      image: "",
    },
  ],
  Mastani: [
    {
      name: "Mango Mastani",
      desc: "Rich mango shake with ice cream",
      price: "70.00",
      topping: "Nuts",
      topping_price: "15.00",
      image: "",
    },
  ],
};

function App() {
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
                  image={item.image}
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
