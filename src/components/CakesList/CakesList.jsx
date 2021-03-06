import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CakeItem from "../CakeItem/CakeItem";
import "./CakesList.css";

function CakesList() {
  const dispatch = useDispatch();
  const cakes = useSelector((store) => store.cakes);

  // useEffect to fetch cakes on page load
  // dispatch 'FETCH_CAKES' to trigger saga
  useEffect(() => {
    dispatch({
      type: "FETCH_CAKES",
    });
  }, []);

  return (
    <>
      <h2 id="shop" className="cake-header">
        Cake Collection
      </h2>
      <hr className="cake-line" />
      <form className="sort">
        <label className="sort-name">Sort</label>
        <select className="drop-down">
          <option value="best-selling">Best Selling</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="price">Price: Low to High</option>
        </select>
      </form>
      {/* Map through list and pass item to CakeItem component */}
      <section className="cake-container">
        {cakes.map((item) => {
          return <CakeItem key={item.id} item={item} />;
        })}
      </section>
    </>
  );
}

export default CakesList;
