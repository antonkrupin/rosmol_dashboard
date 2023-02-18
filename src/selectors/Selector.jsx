import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';

import { fetchNames, setNameFilter, removeNameFilter } from '../slices/namesReducer';

import { fetchAreas, setAreaFilter, removeAreaFilter } from '../slices/areasReducer';

import { fetchCriteria, setCriteriaFiler, removeCriteriaFilter } from '../slices/criteriaReducer';

import { getNames, getAreas, getCriteria } from '../slices/selectors';

import './Selector.css';
import { current } from '@reduxjs/toolkit';

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

  const toggleSelected = (target, id, name, setFilter, removeFilter) => {
    if (!target.hasAttribute("selected")) {
      dispatch(setFilter({id, name}));
      target.setAttribute("selected", true);
    } else {
      dispatch(removeFilter({id, name}));
      target.removeAttribute("selected");
    }
  }

  const checkBoxHandler = (e, setFilter, removeFilter) => {
    const target = e.target.previousSibling ? e.target.previousSibling : e.target;
    const id = target.id.split('_')[0];
    const name = target.name;
    toggleSelected(target, id, name, setFilter, removeFilter);
  }

  return (
    <>
      {type === 'names' && (
        <fieldset>
          <legend>Выберите параметр</legend>
          {names.map((name) => (
            <div key={name.id}>
              <input
                type="checkbox"
                id={name.id}
                name={name.name} 
                onClick={(e) => checkBoxHandler(e, setNameFilter, removeNameFilter)}
              />
              <label htmlFor={name.id}>{name.name}</label>
            </div>
          ))}
        </fieldset>
      )}
      {type === 'areas' && (
        <fieldset>
          <legend>Выберите параметр</legend>
          {areas.map((area) => (
            <div key={area.id}>
              <input
                type="checkbox"
                id={area.id}
                name={area.name}
                onClick={(e) => checkBoxHandler(e, setAreaFilter, removeAreaFilter)}
              />
              <label htmlFor={area.id}>{area.name}</label>
            </div>
          ))}
        </fieldset>
      )}
      {type === 'criteria' && (
        <fieldset>
          <legend>Выберите параметр</legend>
          {criterias.map((criteria) => (
            <div key={criteria.id}>
              <input
                type="checkbox"
                id={`${criteria.id}_cr`}
                name={criteria.name}
                onClick={(e) => checkBoxHandler(e, setCriteriaFiler, removeCriteriaFilter)}
              />
              <label htmlFor={`${criteria.id}_cr`}>{criteria.name}</label>
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
