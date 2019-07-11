import React, { PureComponent } from 'react';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizcharts';
import {HttpClientImmidIot} from "../../../common/HttpClientImmidIot";
import DataSet from "@antv/data-set";

export default class ShuangQuXian extends PureComponent {
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
      HttpClientImmidIot.query('/parking-report/dataVisualizations/area/'+areaid+'/earningsAnalysis', 'GET', null, this.handleQueryData.bind(this));
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
    // if(!(data==undefined)){
    //   for(let i=0;i<d.data.length;i++){
    //     d.data[i] = {
    //       day:this.gettime(d.data[i].period),
    //       acc:	d.data[i].count
    //     }
    //   }
    //   this.setState({
    //     list: data
    //   });
    // }
  }
  render() {
    const data = [
     {
       month: "宝安区",
       "路内停车": 7.0,
       "路外停车": 3.9
     },
     {
       month: "龙岗区",
       "路内停车": 6.9,
       "路外停车": 4.2
     },
     {
       month: "罗湖区",
       "路内停车": 9.5,
       "路外停车": 5.7
     },
     {
       month: "福田区",
       "路内停车": 14.5,
       "路外停车": 8.5
     },
     {
       month: "南山区",
       "路内停车": 18.4,
       "路外停车": 11.9
     }
   ];
   const ds = new DataSet();
   const dv = ds.createView().source(data);
   dv.transform({
     type: "fold",
     fields: ["路内停车", "路外停车"],
     // 展开字段集
     key: "city",
     // key字段
     value: "temperature" // value字段
   });
   const cols = {
     month: {
       range: [0, 1]
     }
   };
        return (
          <Chart height={250} data={dv} scale={cols} padding={[80, 30, 20, 30]} forceFit>
            <Legend  position="top" />
            <Axis name="month"/>
            <Axis
             grid ="null"
              name="temperature"
              label={{
                formatter: val => `${val}`
              }}
            />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom
              type="line"
              position="month*temperature"
              size={2}
              color={"city"}
              shape={"smooth"}
            />
            <Geom
              type="point"
              position="month*temperature"
              size={4}
              shape={"circle"}
              color={"city"}
              style={{
                stroke: "#fff",
                lineWidth: 1
              }}
            />
          </Chart>
        );
    }
}
