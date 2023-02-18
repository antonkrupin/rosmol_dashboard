import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import Header from '../navigation/Header';
import ChartItem from '../charts/ChartItem';
import Selector from '../selectors/Selector';

import { fetchData } from '../slices/dataReducer';

import {
  getFilteredNames,
  getFilteredAreas,
  getFilteredCriteria,
} from '../slices/selectors';

import routes from '../routes';

import './MainPage.css';

const filterData = async (names, areas, criteria, month, year) => {
  console.log('names filter', names);
  const response = await axios.post(routes.reformatter(), {
    "name_filter": names.map((name) => name.id),
    "crit_equal": criteria.map((criteria) => criteria.id), 
    "area_equal": areas.map((area) => String(area.id)),
    "date_equal": [{"month": month, "year": year}]
  });
  console.log(response.data);
  return response.data;
}

// вовлечение молодежи в инновациоаннюу деятельность, сибирский федеральный округ, сумма по полю бюджет срф
const MainPage = () => {
  const dispatch = useDispatch();
  
  const names = useSelector(getFilteredNames);
  const areas = useSelector(getFilteredAreas);
  const criteria = useSelector(getFilteredCriteria);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const [type, setType] = useState('line');

  const [month, setMonth] = useState(1);

  const [year, setYear] = useState(2023);

  console.log('names', names);

  return (
    <>
      <main>
        <Header />
        <div className="filters">
          <div className="lists">
            <select onChange={(e) => setMonth(e.target.value)} >
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
            <select onChange={(e) => setYear(e.target.value)} >
              <option value="" disabled>выберите год</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
          <div className="selectors">
            <Selector type="names" onChange={() => filterData(names, areas, criteria, month, year)} filtered={names}/>
            <Selector type="areas" onChange={() => filterData(names, areas, criteria, month, year)} filtered={areas}/>
            <Selector type="criteria" onChange={() => filterData(names, areas, criteria, month, year)} filtered={criteria}/>
          </div>
          <button type="button" onClick={() => filterData(names, areas, criteria, month, year)}>Фильтрация</button>
        </div>
        <div className="charts">
          <div className="typeFilter">
            <h4>Выберите тип графика:</h4>
            <select onChange={(e) => setType(e.target.value)}>
              <option value="" disabled>Выберите тип графика</option>
              <option value="line">Линейный</option>
              <option value="column">Столбцы</option>
              <option value="spline">Spline</option>
              <option value="area">Area</option>
              <option value="areaspline">Areaspline</option>
              <option value="bar">Свечки</option>
              <option value="scatter">Scatter</option>
              <option value="pie">Pie</option>
            </select>
          </div>
          <div className="chart">
            <ChartItem type={type} title={'График расходов'} />
          </div>
        </div>
      </main>
    </>
  )
};

export default MainPage;

/*
onClick={() => filterData(names, areas, criteria, month, year)}
const response = await axios.post(routes.reformatter(), {
    "name_filter": [1, 11, 17],
    "crit_equal": [1],
    "area_equal": ["11a0a665-e3d0-4006-bf1b-72d5575c0e39"],
    "date_equal": [{"month": 10, "year": 2021}]
  });

*/