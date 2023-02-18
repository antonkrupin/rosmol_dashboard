import React from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import {
  getFilteredNames,
  getFilteredAreas,
  getFilteredCriteria,
  getData,
} from '../slices/selectors';

import './ChartItem.css';

const ChartItem = (props) => {
  const { type, title } = props;

  const names = useSelector(getFilteredNames);
  const areas = useSelector(getFilteredAreas);
  const criteria = useSelector(getFilteredCriteria);
  const data = useSelector(getData);

  const getOptions = () => ({
    colors: ['#A2CA82', '#A54545', '#9E7D7D', '#8FA5DE', '#8A9AA9', '#9182CC', '#7C7C7C'],
    chart: {
      type,
      // height: '30%',
      style: {
        fontFamily: 'Open Sans Bold',
      }
    },
    title: {
      text: title,
    },
    xAxis: {
      title: {
        // text: 'год',
        style: {
          color: '#242424',
          fontSize: '20px',
        }
      },
      labels: {
        style: {
          color: '#242424',
          fontSize: '15px',
        }
      },
      categories: names.map((name) => name.name)
    },
    yAxis: {
      title: {
        text: criteria.map((cr) => cr.name)[0] ? `${criteria.map((cr) => cr.name)[0]}\n(млн. рублей.)` : 'Данные не загружены',
        style: {
          color: '#242424',
          fontSize: '20px',
        }
      },
    },
    series: [
      {
        data: data,
        name: areas.map((area) => area.name).at(-1) ? `${areas.map((area) => area.name).at(-1)}` : 'Данные не загружены',
      },
    ],
  });
  return (
    <div className="chartItem">
      <HighchartsReact highcharts={Highcharts} options={getOptions()} />
    </div>
  )
};

export default ChartItem;
