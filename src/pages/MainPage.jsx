import React from 'react';
import axios from 'axios';

import ChartItem from '../charts/ChartItem';
import Selector from '../selectors/Selector';

import routes from '../routes';

import './MainPage.css';

const MainPage = () => {
  const response = axios.get('http://bossofcreeps.site/datastorage/areas/').then((data) => console.log(data));
  console.log(response);
  /* fetch('http://bossofcreeps.site/datastorage/areas/')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  }); */
  return (
    <>
      <main>
        <div className="header">
          <div className="logo">
            <h1>Logo</h1>
          </div>
          <div className="title">
            <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, corrupti!</h1>
          </div>
        </div>
        <Selector />
        <div className="charts">
          <ChartItem type={'line'} title={'График расходов'} />
          <ChartItem type={'column'} title={'График расходов'} />
          <ChartItem type={'spline'} title={'График расходов'} />
          <ChartItem type={'area'} title={'График расходов'} />
          <ChartItem type={'areaspline'} title={'График расходов'} />
          <ChartItem type={'bar'} title={'График расходов'} />
          <ChartItem type={'scatter'} title={'График расходов'} />
          <ChartItem type={'pie'} title={'График расходов'} />
        </div>
      </main>
    </>
  )
};

export default MainPage;