import React, { PureComponent } from 'react';
import { Chart, Axis, Geom, Tooltip, Legend, Coord } from 'bizcharts';
import {HttpClientImmidIot} from "../../../common/HttpClientImmidIot";
import DataSet from "@antv/data-set";
const { DataView } = DataSet;

export default class HengZhu extends PureComponent {
    constructor(props) {
          super(props);
          this.state = {
              list:[],
          };
      }
    // 组件挂载之前
    componentWillMount() {
    }

    // 组件挂载后
    componentDidMount() {
        this.loadData();
           // if (window.checkPageEnable('/AbnormalParkingAlarm')) {
           //     this.loadData();
           // }
    }

    // 组件卸载之前
    componentWillUnmount() {

    }

    //loadData
    loadData(){
        let base = 'https://www.easy-mock.com/mock/5cd0f2f3682f200251f31dd3/immidiot';
        HttpClientImmidIot.query(base+'/parking-report/dataVisualizations/city/440300/parkingHotPointWarning', 'GET', null, this.handleQueryData.bind(this));
    }

    //回调函数
    handleQueryData(d, type){
        let list1=[];
        if(!(d.data==undefined)){
            for(let i=0;i<d.data.length;i++){
                list1[i] = {
                    type: d.data[i].parkingName,
                    group: d.data[i].parkingName,
                    周转率: d.data[i].rotationRate,
                    饱和度: d.data[i].saturation,
                }
            }
        }
        this.setState({
            list:list1,
        });
    }
  render() {
      const {list} = this.state;
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
        dvzz.source(list)
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
