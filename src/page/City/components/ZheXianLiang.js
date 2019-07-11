import React, { PureComponent } from 'react';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizcharts';

export default class ZheXianLiang extends PureComponent {

  render() {
    const data = [
    {
      country: '路内',
      year: '1750',
      value: 502,
    },
    {
      country: '路内',
      year: '1800',
      value: 635,
    },
    {
      country: '路内',
      year: '1850',
      value: 489,
    },
    {
      country: '路内',
      year: '1900',
      value: 526,
    },
    {
      country: '路内',
      year: '1950',
      value: 440,
    },
    {
      country: '路内',
      year: '1999',
      value: 363,
    },
    {
      country: '路内',
      year: '2050',
      value: 694,
    },
    {
      country: '路外',
      year: '1750',
      value: 210,
    },
    {
      country: '路外',
      year: '1800',
      value: 310,
    },
    {
      country: '路外',
      year: '1850',
      value: 211,
    },
    {
      country: '路外',
      year: '1900',
      value: 176,
    },
    {
      country: '路外',
      year: '1950',
      value: 322,
    },
    {
      country: '路外',
      year: '1999',
      value: 76,
    },
    {
      country: '路外',
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
          <Geom opacity={1} type="areaStack" position="year*value" color={['country', ['l (90) 0:rgba(237, 125, 49, 1) 1:rgba(237, 125, 49, 1)', 'l (90) 0:rgba(91, 155, 213, 1) 1:rgba(91, 155, 213, 1)']]} />
          <Geom opacity={1} type="lineStack" position="year*value" size={2} color={['country', ['rgba(237, 125, 49, 1)', '#5B9BD5']]} />
          </Chart>
        );
    }
}
