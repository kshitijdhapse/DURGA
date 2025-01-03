import React from "react";

function MenuItem({ name, desc, price, topping, toppingPrice, image }) {
  return (
    <div className="MenuItem">
      <img
        src={image || "default-image.jpg"}
        alt={name}
        className="MenuItem-image"
        style={{ width: "270px", height: "300px", objectFit: "cover" }}
      />
      <h3>{name}</h3>
      <p>{desc}</p>
      {/* <p>Price: ₹{price}</p> */}
      <br></br>
      {topping && topping !== "None" && <p>Toppings available: {topping}</p>}
    </div>
  );
}

export default MenuItem;
