import React, { PureComponent } from 'react';
import { Chart, Axis, Geom, Tooltip, Legend, Coord, Label } from 'bizcharts';
import DataSet from "@antv/data-set";
const { DataView } = DataSet;

export default class Shan extends PureComponent {

  render() {
    const bztdata = [
      { item: '支付宝服务窗', count: 17.77 },
      { item: '微信小程序', count: 17.51 },
      { item: '手机APP', count: 24.11 },
      { item: '公众号', count: 40.61 },
    ];
    const bzt = new DataView();
    bzt.source(bztdata).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    const bztcols = {
      percent: {
        formatter: val => {
          val = val * 100 + '%';
          return val;
        },
      },
    };
        return (
          <Chart height={250} data={bzt} scale={bztcols} padding={[20, 0, 20, 0]} forceFit>
            <Coord type="theta" radius={0.75} />
            <Axis name="percent"/>
            <Legend position="bottom" />
            <Tooltip
              showTitle={false}
              itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}:{value}</li>" />
            <Geom
              type="intervalStack"
              position="percent"
              color="item"
              tooltip={[
                'item*percent',
                (item, percent) => {
                  percent = percent * 100 + '%';
                  return {
                    name: item,
                    value: percent,
                  };
                },
              ]}
              style={{ lineWidth: 1, stroke: '#fff' }}
            >
              <Label
                content="percent"
                formatter={(val, item) => {
                  return item.point.item + ': ' + val;
                }} />
            </Geom>
          </Chart>
        );
    }
}
