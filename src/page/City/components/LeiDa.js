import React, { PureComponent } from 'react';
import { Chart, Axis, Geom, Tooltip, Coord } from 'bizcharts';
import DataSet from "@antv/data-set";
const { DataView } = DataSet;

export default class LeiDa extends PureComponent {

  render() {
    const data = [
          {
            item: "福田区",
            百分比: 70
          },
          {
            item: "宝安区",
            百分比: 60
          },
          {
            item: "南山区",
            百分比: 50
          },
          {
            item: "罗湖区",
            百分比: 40
          },
          {
            item: "龙华区",
            百分比: 60
          },
          {
            item: "光明区",
            百分比: 70
          },
          {
            item: "龙岗区",
            百分比: 50
          },
          {
            item: "大鹏区",
            百分比: 30
          },
          {
            item: "坪山区",
            百分比: 60
          }
        ];
        const dv = new DataView().source(data);
        dv.transform({
          type: "fold",
          fields: ["百分比"],
          // 展开字段集
          key: "user",
          // key字段
          value: "score" // value字段
        });
        const cols = {
          score: {
            min: 0,
            max: 80
          }
        };
        return (
          <Chart
                height={250}
                data={dv}
                padding={[10, 10, 10, 10]}
                scale={cols}
                forceFit
              >
                <Coord type="polar" radius={0.8} />
                <Axis
                  name="item"
                  line={null}
                  tickLine={null}
                  grid={{
                    lineStyle: {
                      lineDash: null
                    },
                    hideFirstLine: false
                  }}
                />
                <Tooltip/>
                <Axis
                  name="score"
                  line={null}
                  tickLine={null}
                  grid={{
                    type: "polygon",
                    lineStyle: {
                      lineDash: null
                    },
                    alternateColor: "rgba(0, 0, 0, 0.04)"
                  }}
                />
                <Geom type="area" position="item*score" color="user" />
                <Geom type="line" position="item*score" color="user" size={2} />
                <Geom
                  type="point"
                  position="item*score"
                  color="user"
                  shape="circle"
                  size={4}
                  style={{
                    stroke: "#122843",
                    lineWidth: 1,
                    fillOpacity: 1
                  }}
                />
              </Chart>
        );
    }
}
