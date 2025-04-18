import React, { useState } from "react";
import { useStateCart, useDispatchCart } from "./Cartreducer";

export default function Cards({ item }) {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("Full");
  const dispatch = useDispatchCart();
  const data=useStateCart();
  const { name, img, options, description, id } = item;
  const pricePerItem = size === "Full" ? options[0].full : options[0].half;
  const totalPrice = quantity * pricePerItem;

  const clickHandler = async () => {
    dispatch({
      type: "Add",
      id: item.id,
      name: name,
      price: totalPrice,
      size: size,
      quantity: quantity,
    });
    console.log(data);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="card shadow-lg p-3" style={{ height: "600px", width: "20rem", borderRadius: "15px" }}>
        <div style={{ height: "40%", objectFit: "fill" }}>
          <img src={img} className="card-img-top rounded" alt={name} style={{ height: "80%", objectFit: "fill", borderRadius: "12px" }} />
        </div>
        <div className="text-center fw-bold mt-2 text-success fs-5">Price: ₹{pricePerItem} per item</div>
        <div className="card-body">
          <h5 className="card-title text-center">{name}</h5>
          <p className="text-muted text-center">{description}</p>
          <div className="d-flex align-items-center mb-2">
            <label className="me-2 fw-bold">Quantity:</label>
            <select className="form-select w-50" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <div className="btn-group d-flex mb-2">
            <button className={`btn ${size === "Half" ? "btn-secondary" : "btn-outline-secondary"}`} onClick={() => setSize("Half")}>Half</button>
            <button className={`btn ${size === "Full" ? "btn-secondary" : "btn-outline-secondary"}`} onClick={() => setSize("Full")}>Full</button>
          </div>
          <div className="mt-3 p-2 text-center bg-light rounded fw-bold">Total Price: ₹{totalPrice}</div>
          <button className="btn-success justify-centre" onClick={clickHandler}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
