import React from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/storeContext.jsx';
import FoodItem from '../FoodItem/FoodItem.jsx';

const FoodDisplay = ({ category }) => {
  const { food_list } = React.useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item) => (
          <FoodItem
            key={item.id} // ✅ Use stable unique key
            id={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
