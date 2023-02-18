import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';

import { fetchNames } from '../slices/namesReducer';

import { fetchAreas } from '../slices/areasReducer';

import { fetchCriteria } from '../slices/criteriaReducer';

import { getNames, getAreas, getCriteria } from '../slices/selectors';

import './Selector.css';

const Selector = (props) => {
  const dispatch = useDispatch();

  const { type } = props;

  useEffect(() => {
    dispatch(fetchNames());
    dispatch(fetchAreas());
    dispatch(fetchCriteria());
  }, [dispatch]);

  const names = useSelector(getNames);

  const areas = useSelector(getAreas);

  const criterias = useSelector(getCriteria);

  return (
    <>
      {type === 'names' && (
        <select className="select">
          <option value="" disabled>Выберите параметр</option>
          {names.map((name) => (
            <option key={name.id} value={name.id}>
              {name.name}
            </option>
          ))}
        </select>
      )}
      {type === 'areas' && (
        <select className="select">
          <option value="" disabled>Выберите параметр</option>
          {areas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.name}
            </option>
          ))}
        </select>
      )}
      {type === 'criteria' && (
        <select className="select">
          <option value="" disabled>Выберите параметр</option>
          {criterias.map((criteria) => (
            <option key={criteria.id} value={criteria.id}>
              {criteria.name}
            </option>
          ))}
        </select>
      )}
    </>
  )
};

export default Selector;