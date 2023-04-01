import React, { useState } from "react";
import Button from "../Button/button";
import './itemCount.css'
import { useContext } from 'react';
import CartContext from "../Context/CartContext";
import Swal from "sweetalert2";

const ItemCount = ({initial, stock, onAddToCart}) => {
  const [count, setCount] = useState(initial);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  
  const decrease = () => {
    if(count > initial) {
      setCount(count - 1);
    }
  };

  const increase = () => {
    if(count < stock) {
      setCount(count + 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(count); 
    setCount(initial); 
    setIsButtonVisible(false); 
  }

  return (
    <div className="itemCount">
      {isButtonVisible && <Button onClick={decrease}>-</Button>} 
      {isButtonVisible && <span className='contador'>{count}</span>}
      {isButtonVisible && <Button onClick={increase}>+</Button>} 
      {isButtonVisible && <Button className="btn-comprar" onClick={handleAddToCart}>Comprar</Button>}
    </div>
  );
}

export default ItemCount;





 