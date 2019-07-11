import React, { PureComponent } from 'react';
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';
import DataSet from "@antv/data-set";
import {HttpClientImmidIot} from "../../../common/HttpClientImmidIot";
const { DataView } = DataSet;

export default class JianBianXian extends PureComponent {
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
      const parkid = 5;
        HttpClientImmidIot.query('/parking-report/dataVisualizations/parking/'+parkid+'/turnoverRate', 'GET', null, this.handleQueryData.bind(this));
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
      if(!(data==undefined)){
        for(let i=0;i<d.data.length;i++){
          d.data[i] = {
            day:this.gettime(d.data[i].period),
            acc:	d.data[i].count
          }
        }
        this.setState({
          list: data
        });
      }
    }
  render() {
    const {list} = this.state;
    const data = [
     {
       day: "2015-01-01",
       acc: 84.0
     },
     {
       day: "2015-02-01",
       acc: 14.9
     },
     {
       day: "2015-03-01",
       acc: 17.0
     },
     {
       day: "2015-04-01",
       acc: 20.2
     },
     {
       day: "2015-05-01",
       acc: 55.6
     },
     {
       day: "2015-06-01",
       acc: 56.7
     },
     {
       day: "2015-07-01",
       acc: 30.6
     },
     {
       day: "2015-08-01",
       acc: 63.2
     },
     {
       day: "2015-09-01",
       acc: 24.6
     },
     {
       day: "2015-10-01",
       acc: 14.0
     },
     {
       day: "2015-11-01",
       acc: 9.4
     },
     {
       day: "2015-12-01",
       acc: 6.3
     }
   ];
   const cols = {
     day: {
       alias: "月份"
     },
     acc: {
       alias: "积累量"
     }
   };
        return (
          <Chart height={250} data={list} scale={cols} padding={[40, 20, 20, 40]} forceFit>
            <Axis
              name="day"
              title={null}
              tickLine={null}
              line={{
                stroke: "#E6E6E6"
              }}
            />
            <Axis
              name="acc"
              line={false}
              tickLine={null}
              grid={null}
              title={null}
            />
            <Tooltip />
            <Geom
              type="line"
              position="day*acc"
              size={1}
              color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
              shape="smooth"
              style={{
                shadowColor: "l (270) 0:rgba(21, 146, 255, 0)",
                shadowBlur: 60,
                shadowOffsetY: 6
              }}
            />
          </Chart>
        );
    }
}
