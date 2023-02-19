import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../navigation/Header';
import ChartItem from '../charts/ChartItem';
import Selector from '../selectors/Selector';

import { fetchData } from '../slices/dataReducer';

import {
  getFilteredNames,
  getFilteredAreas,
  getFilteredCriteria,
  getStatus,
} from '../slices/selectors';

import './MainPage.css';

const MainPage = () => {
  const dispatch = useDispatch();
  
  const names = useSelector(getFilteredNames);
  const areas = useSelector(getFilteredAreas);
  const criteria = useSelector(getFilteredCriteria);
  const status = useSelector(getStatus);
  
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const [type, setType] = useState('column');

  const [month, setMonth] = useState(1);

  const [year, setYear] = useState(2023);

  return (
    <>
      <main>
        <Header />
        <div className="filters">
          <div className="lists">
            <div>
              <h4>Выберите месяц:</h4>
              <select onChange={(e) => setMonth(e.target.value)} disabled={status === 'updating'}>
                <option value="" disabled>выберите месяц</option>
                <option value="1">Январь</option>
                <option value="2">Февраль</option>
                <option value="3">Март</option>
                <option value="4">Апрель</option>
                <option value="5">Май</option>
                <option value="6">Июнь</option>
                <option value="7">Июль</option>
                <option value="8">Август</option>
                <option value="9">Сентябрь</option>
                <option value="10">Октябрь</option>
                <option value="11">Ноябрь</option>
                <option value="12">Декабрь</option>
              </select>
            </div>
            <div>
              <h4>Выберите год:</h4>
              <select onChange={(e) => setYear(e.target.value)} disabled={status === 'updating'}>
                <option value="" disabled>выберите год</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
            </div>
          </div>
          <div className="selectors">
            <Selector type="names" month={month} year={year} data={{names, areas, criteria}}/>
            <Selector type="areas" month={month} year={year} data={{names, areas, criteria}}/>
            <Selector type="criteria" month={month} year={year} data={{names, areas, criteria}}/>
          </div>
        </div>
        <div className="charts">
          <div className="typeFilter">
            <h4>Выберите тип графика:</h4>
            <select onChange={(e) => setType(e.target.value)} disabled={status === 'updating'}>
              <option value="" disabled>Выберите тип графика</option>
              <option value="column">Столбцы</option>
              <option value="line">Линейный</option>
              <option value="spline">Spline</option>
              <option value="area">Area</option>
              <option value="areaspline">Areaspline</option>
              <option value="bar">Свечки</option>
              <option value="scatter">Scatter</option>
              <option value="pie">Pie</option>
            </select>
          </div>
          <div className="chart">
            <ChartItem type={type} title={'График расходов'} namesP={names} areasP={areas} criteriaP={criteria}/>
          </div>
        </div>
      </main>
    </>
  )
};

export default MainPage;
