import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
  filterData,
  setNameFilter,
  removeNameFilter,
  setAreaFilter,
  removeAreaFilter,
  setCriteriaFiler,
  removeCriteriaFilter,
} from '../slices/dataReducer';

import { getNames, getAreas, getCriteria, getFilteredNames, getFilteredAreas, getFilteredCriteria } from '../slices/selectors';

import './Selector.css';

const Selector = (props) => {
  const dispatch = useDispatch();

  const {
    type,
    onChange,
    month, year,
    namesP,
    areasP,
    criteriaP,
  } = props;

  const names = useSelector(getNames);

  const areas = useSelector(getAreas);

  const criterias = useSelector(getCriteria);

  const namesF = useSelector(getFilteredNames);
  const areasF = useSelector(getFilteredAreas);
  const criteriaF = useSelector(getFilteredCriteria);

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
    const name = target.name === 'radio' ? target.value : target.name;
    toggleSelected(target, id, name, setFilter, removeFilter);
  }

  return (
    <>
      {type === 'names' && (
        <fieldset onChange={() => dispatch(filterData({namesF, areasF, criteriaF, month, year}))}>
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
        <fieldset onChange={() => dispatch(filterData({namesF, areasF, criteriaF, month, year}))}>
          <legend>Выберите параметр</legend>
          {areas.map((area) => (
            <div key={area.id}>
              <input type="radio" id={area.id}
            name="radio" value={area.name} onClick={(e) => checkBoxHandler(e, setAreaFilter, removeAreaFilter)} />
            <label htmlFor={area.id}>{area.name}</label>
              
            </div>
          ))}
        </fieldset>
      )}
      {type === 'criteria' && (
        <fieldset onChange={() => dispatch(filterData({namesF, areasF, criteriaF, month, year}))}>
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
