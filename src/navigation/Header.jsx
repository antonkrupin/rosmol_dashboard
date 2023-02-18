import React from 'react';

import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <h1>Logo</h1>
      </div>
      <div className="title">
        <h1>ФГАИС «Молодёжь России». Дашборд.</h1>
      </div>
      <nav>
        <button>Общедоступная информация</button>
        <button className="danger">Авторизация</button>
      </nav>
    </div>
  )
};

export default Header;