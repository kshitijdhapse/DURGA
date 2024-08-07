import React from "react";

function MenuItem({ name, desc, price, topping, toppingPrice, image }) {
  return (
    <div className="MenuItem">
      <img
        src={image || "default-image.jpg"}
        alt={name}
        className="MenuItem-image"
      />
      <h3>{name}</h3>
      <p>{desc}</p>
      <p>Price: ₹{price}</p>
      {topping && topping !== "None" && (
        <p>
          Topping: {topping} (₹{toppingPrice})
        </p>
      )}
    </div>
  );
}

export default MenuItem;
