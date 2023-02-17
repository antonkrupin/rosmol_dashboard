import React from 'react';

import './Selector.css';

const Selector = () => {
  return (
    <select className="select-1">
      <option value="" disabled hidden>Выберите год</option>
      <option value="222">Two</option>
      <option value="333">Three</option>
      <option value="444">Four</option>
    </select>
  )
};

export default Selector;