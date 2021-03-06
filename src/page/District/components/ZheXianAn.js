import React, { PureComponent } from 'react';
import { Chart, Axis, Geom, Tooltip, Legend, } from 'bizcharts';

export default class ZheXianAn extends PureComponent {

  render() {
    const data = [
    {
      country: '上月',
      year: '1750',
      value: 502,
    },
    {
      country: '上月',
      year: '1800',
      value: 635,
    },
    {
      country: '上月',
      year: '1850',
      value: 489,
    },
    {
      country: '上月',
      year: '1900',
      value: 526,
    },
    {
      country: '上月',
      year: '1950',
      value: 440,
    },
    {
      country: '上月',
      year: '1999',
      value: 363,
    },
    {
      country: '上月',
      year: '2050',
      value: 694,
    },
    {
      country: '本月',
      year: '1750',
      value: 210,
    },
    {
      country: '本月',
      year: '1800',
      value: 310,
    },
    {
      country: '本月',
      year: '1850',
      value: 211,
    },
    {
      country: '本月',
      year: '1900',
      value: 176,
    },
    {
      country: '本月',
      year: '1950',
      value: 322,
    },
    {
      country: '本月',
      year: '1999',
      value: 76,
    },
    {
      country: '本月',
      year: '2050',
      value: 113,
    },
  ];
  const cols = {
    year: {
      type: 'linear',
      tickInterval: 50,
    },
  };
        return (
          <Chart height={250} data={data} scale={cols} padding={[40, 20, 10, 40]} forceFit>
          <Axis name="year" />
          <Axis name="value"
           grid ="null" />
          <Legend  position="top"/>
          <Tooltip />
          <Geom opacity={.8} type="areaStack" position="year*value" color={['country', ['l (90) 0:rgba(91, 155, 213, 1) 1:rgba(91, 155, 213, 1)', 'l (90) 0:rgba(85, 111, 87, 1) 1:rgba(85, 111, 87, 1)']]} />
          <Geom opacity={.8} type="lineStack" position="year*value" size={2} color={['country', ['rgba(91, 155, 213, 1)', '#556F57']]} />
          </Chart>
        );
    }
}
