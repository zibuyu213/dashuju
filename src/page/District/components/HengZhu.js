import React, { PureComponent } from 'react';
import { Chart, Axis, Geom, Tooltip, Legend, Coord } from 'bizcharts';
import DataSet from "@antv/data-set";
import {HttpClientImmidIot} from "../../../common/HttpClientImmidIot";
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
    //加载数据
  loadData() {
    const areaid = 440305;
      HttpClientImmidIot.query('/parking-report/dataVisualizations/area/'+areaid+'/parkingHotPointWarning', 'GET', null, this.handleQueryData.bind(this));
    }
    gettime(str){
      const arr=str.split("T");
      const d=arr[0];
      const darr = d.split('-');
      const t=arr[1];
      const tarr = t.split('.000');
      const marr = tarr[0].split(':');
      const dd = parseInt(darr[0])+"/"+parseInt(darr[1])+"/"+parseInt(darr[2])+" "+parseInt(marr[0])+":"+parseInt(marr[1])+":"+parseInt(marr[2]);
      //console.log(parseInt(marr[0])+"点");
      return parseInt(darr[2])+"日"+parseInt(marr[0])+"时";
    }
    // loadData回调函数
    handleQueryData(d, type) {
      const data = d.data;
      //console.log(data);
      if(!(data==undefined)){
        for(let i=0;i<d.data.length;i++){
          console.log(d.data[i].countCategory);
          d.data[i] = {
            type: 	d.data[i].parkingName,
            group: 	d.data[i].parkingName,
            周转率: 	d.data[i].rotationRate,
            饱和度:	d.data[i].saturation
          }
        }
        this.setState({
          list: data
        });
      }
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
            周转率: "#0099FF",
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
