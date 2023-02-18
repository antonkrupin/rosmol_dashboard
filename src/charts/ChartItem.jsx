import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import './ChartItem.css';

const ChartItem = (props) => {
  const { type, title } = props;

  const getOptions = () => ({
    colors: ['#A2CA82', '#8FA5DE', '#9182CC', '#A54545', '#242424'],
    chart: {
      type,
      // height: '30%',
      style: {
        fontFamily: 'Open Sans Bold',
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      itemMarginTop: 10,
      itemMarginBottom: 10
    },
    plotOptions: {
      // работает на графике bar (будет полезно)
      series: {
        pointPlacement: type === ('column' || 'bar') ? 'between' : 'on',
        // радиус границы
        // borderRadius: 8,
        // ширина линии для bar
        // pointWidth: 20,
        // pointPadding: 200,
        // две последние не понятное, бесполезное. можно выбирать просто нажав на название
        // selected: false,
        // showCheckbox: true,
        //убирает расстояние от старта, хорошо везде, кроме column
        //pointPlacement: 'on',
        // делает расстояние между группами, хз как работает
        // groupPadding: 0.5,
      }
    },
    title: {
      text: title,
    },
    xAxis: {
      title: {
        text: 'год',
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
      categories: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]
    },
    yAxis: {
      title: {
        text: 'млн. рублей',
        style: {
          color: '#242424',
          fontSize: '20px',
        }
      },
    },
    series: [
      {
        data: [1, 2, 1, 4, 3, 6, 0, 9],
        name: 'СФО',
      },
      {
        data: [2, 7, 0, 4, 6, 20, 1, 3],
        name: 'ЮФО',
      },
      {
        data: [4, 12, 3, 1, 8, 5, 2, 3],
        name: 'ДФО',
      },
      {
        data: [5, 8, 5, 3, 2, 9, 11, 5],
        name: 'ПФО',
      },
      {
        data: [0, 3, 7, 1, 4, 3, 8, 6],
        name: 'СЗФО',
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