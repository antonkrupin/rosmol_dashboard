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
        <fieldset>
          <legend>Выберите параметр</legend>
          {names.map((name) => (
            <div key={name.id}>
              <input type="checkbox" id={name.id} name={name.name} />
              <label htmlFor={name.name}>{name.name}</label>
            </div>
          ))}
        </fieldset>
      )}
      {type === 'areas' && (
        <fieldset>
          <legend>Выберите параметр</legend>
          {areas.map((area) => (
            <div key={area.id}>
              <input type="checkbox" id={area.id} name={area.name} />
              <label htmlFor={area.name}>{area.name}</label>
            </div>
          ))}
        </fieldset>
      )}
      {type === 'criteria' && (
        <fieldset>
          <legend>Выберите параметр</legend>
          {criterias.map((criteria) => (
            <div key={criteria.id}>
              <input type="checkbox" id={criteria.id} name={criteria.name} />
              <label htmlFor={criteria.name}>{criteria.name}</label>
            </div>
          ))}
        </fieldset>
      )}
    </>
  )
};

export default Selector;

/*

<fieldset>
    <legend>Choose your monster's features:</legend>

    <div>
      <input type="checkbox" id="scales" name="scales" checked>
      <label for="scales">Scales</label>
    </div>

    <div>
      <input type="checkbox" id="horns" name="horns">
      <label for="horns">Horns</label>
    </div>
</fieldset>

*/
