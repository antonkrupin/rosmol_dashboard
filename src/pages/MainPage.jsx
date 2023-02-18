import React from 'react';

import ChartItem from '../charts/ChartItem';
import Selector from '../selectors/Selector';

import './MainPage.css';

const MainPage = () => {
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
        <div className="filters">
          <div className="selectors">
              <Selector type="names" />
              <Selector type="areas" />
              <Selector type="criteria" />
          </div>
          <button>Фильтрация</button>
        </div>
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