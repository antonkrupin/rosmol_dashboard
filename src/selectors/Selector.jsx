import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import routes from '../routes';
import {
  setData,
  setStatus,
  setNameFilter,
  removeNameFilter,
  setAreaFilter,
  removeAreaFilter,
  setCriteriaFiler,
  removeCriteriaFilter,
} from '../slices/dataReducer';

import {
  getNames,
  getAreas,
  getCriteria,
  getStatus
} from '../slices/selectors';

import './Selector.css';

const Selector = (props) => {
  const dispatch = useDispatch();

  const {
    type,
    month,
    year,
    data,
  } = props;

  const filterData = async (names, areas, criteria, month, year) => {
    if ((names.length !== 0) && (areas.length !== 0) && (criteria.length !== 0)) {
      dispatch(setStatus('updating'));
      const response = await axios.post(routes.reformatter(), {
        "name_filter": names.map((name) => name.id),
        "crit_equal": criteria.map((criteria) => criteria.id), 
        "area_equal": areas.map((area) => String(area.id)),
        "date_equal": [{"month": Number(month) !== 13 ? month : null , "year": year}]
      });
      dispatch(setData(response.data));
      dispatch(setStatus('resolved'));
      return response.data;
    } else {
      dispatch(setData([]));
    }
  }

  useEffect(() => {
    filterData(data.names, data.areas, data.criteria, month, year);
  }, [data.names, data.areas, data.criteria, month, year]);

  const names = useSelector(getNames);

  const areas = useSelector(getAreas);

  const criterias = useSelector(getCriteria);

  const status = useSelector(getStatus);

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
    const name = target.name; // === 'radio' ? target.value : target.name;
    toggleSelected(target, id, name, setFilter, removeFilter);
  }

  return (
    <>
      {type === 'names' && (
        <fieldset disabled={status === 'updating'}>
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
        <fieldset disabled={status === 'updating'}>
          <legend>Выберите параметр</legend>
          {areas.map((area) => (
            <div key={area.id}>
              <input
                type="checkbox"
                id={area.id}
                name={area.name} 
                onClick={(e) => checkBoxHandler(e, setAreaFilter, removeAreaFilter,)}
              />
              <label htmlFor={area.id}>{area.name}</label>
            </div>
          ))}
        </fieldset>
      )}
      {type === 'criteria' && (
        <fieldset disabled={status === 'updating'}>
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