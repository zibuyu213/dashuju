import React, { PureComponent } from 'react';
import {HttpClientImmidIot} from "../../../common/HttpClientImmidIot";
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';

export default class QuXian extends PureComponent {
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
      HttpClientImmidIot.query('/parking-report/dataVisualizations/parking/'+parkid+'/dailyEarning', 'GET', null, this.handleQueryData.bind(this));
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
    return parseInt(darr[1])+"月"+parseInt(darr[2])+"日";
  }
  // loadData回调函数
  handleQueryData(d, type) {
    const data = d.data;
     // console.log(data);
    if(!(data==undefined)){
      for(let i=0;i<d.data.length;i++){
        d.data[i] = {
          country: '收入',
          time:this.gettime(d.data[i].period),
          value:	d.data[i].count
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
      country: '收入',
      time: '1750',
      value: 502,
    },
    {
      country: '收入',
      time: '1800',
      value: 635,
    },
    {
      country: '收入',
      time: '1850',
      value: 809,
    },
    {
      country: '收入',
      time: '1900',
      value: 5268,
    },
    {
      country: '收入',
      time: '1950',
      value: 4400,
    },
    {
      country: '收入',
      time: '1999',
      value: 3634,
    },
    {
      country: '收入',
      time: '2050',
      value: 947,
    },
  ];
  const cols = {
    time: {
      range: [0, 1]
    },
  };
        return (
          <Chart height={250} data={list}  padding={[40, 20, 40, 40]} forceFit>
          <Axis name="time" />
          <Axis name="value"
           grid ="null"/>
          <Tooltip />
          <Geom type="areaStack" position="time*value" color={['country', ['l (90) 0:rgba(238, 105, 37, 1) 1:rgba(238, 105, 37, 1)', 'l (90) 0:rgba(0, 268, 0, 1) 1:rgba(0, 268, 0, 0.1)']]} />
          <Geom type="lineStack" position="time*value" size={2} color={['country', ['rgba(238, 105, 37, 1)', '#00ff00']]} />
        </Chart>
        );
    }
}
