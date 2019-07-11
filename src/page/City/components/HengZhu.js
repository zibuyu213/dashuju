import React, { PureComponent } from 'react';
import { Chart, Axis, Geom, Tooltip, Legend, Coord } from 'bizcharts';
import DataSet from "@antv/data-set";
const { DataView } = DataSet;

export default class HengZhu extends PureComponent {

  render() {
    const datazz = [
          {
            group: "深圳万象天地停车场",
            type: "深圳万象天地停车场",
            "周转率": 50.1,
            饱和度: 93.7,
          },
          {
            group: "海雅缤纷城停车场",
            type: "海雅缤纷城停车场",
            "周转率": 64.0,
            饱和度: 62.0,
          },
          {
            group: "科兴科学院",
            type: "科兴科学院",
            "周转率": 40.6,
            饱和度: 66.3,
          },
          {
            group: "海岸城路段",
            type: "海岸城路段",
            "周转率": 38.0,
            饱和度: 34.2
          },
          {
            type: "欢乐海岸停车场",
            "周转率": 39.3,
            饱和度: 44
          }
        ];
        const dvzz = new DataView();
        dvzz.source(datazz)
          .transform({
            type: "map",

            callback(row) {
              row["饱和度"] *= -1;
              return row;
            }
          })
          .transform({
            type: "fold",
            fields: [
              "饱和度",
              "周转率"
            ],
            key: "opinion",
            value: "value",
            retains: ["group", "type"]
          });
          const colorMap = {
            "周转率": "#0099FF",
            饱和度: "#FF9933",
          };
        return (
          <Chart height={250} data={dvzz} padding={[40, 20, 20, 120]} forceFit>
          <Axis name="type" title={null} labelOffset={10} />
          <Axis
            name="value"
            title={null}
            tickLine={null}
            position="right"
            formatter={function(val) {
              return val + "%";
            }}
          />
          <Coord transpose />
          <Tooltip />
          <Legend />
          <Geom
            type="intervalStack"
            position="type*value"
            color={[
              "opinion",
              function(opinion) {
                return colorMap[opinion];
              }
            ]}
            shape="smooth"
            opacity={1}
          />
        </Chart>
        );
    }
}
