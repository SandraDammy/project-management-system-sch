import React from 'react'
import  "./button.css"

const Button = ({ className, title, onClick, type = "button" }) => {
  return (
    <>
      <button className={className} onClick={onClick} type="submit">
        {title}
      </button>
    </>
  );
};

export default Button;