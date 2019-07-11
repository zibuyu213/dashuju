import React, { PureComponent } from 'react';
import { Chart, Axis, Geom, Tooltip, Legend, } from 'bizcharts';
import {HttpClientImmidIot} from "../../../common/HttpClientImmidIot";
export default class ZheXianAn extends PureComponent {
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
        HttpClientImmidIot.query(base+'/parking-report/dataVisualizations/city/440300/earningsAnalysis', 'GET', null, this.handleQueryData.bind(this));
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
      return parseInt(darr[1])+"月"+parseInt(darr[2])+'日';
    }
    gettime1(str){
      const arr=str.split("T");
      const d=arr[0];
      const darr = d.split('-');
      const t=arr[1];
      const tarr = t.split('.000');
      const marr = tarr[0].split(':');
      const dd = parseInt(darr[0])+"/"+parseInt(darr[1])+"/"+parseInt(darr[2])+" "+parseInt(marr[0])+":"+parseInt(marr[1])+":"+parseInt(marr[2]);
      //console.log(parseInt(marr[0])+"点");
      return parseInt(darr[1]);
    }
    //回调函数
    handleQueryData(d, type){
        let list1=[];
        if(!(d.data==undefined)){
            for(let i=0;i<d.data.length;i++){
                list1[i]={
                    month:((this.gettime1(d.data[i].period) == '06')?'近一月':'上一月'),
                    date:this.gettime(d.data[i].period),
                    value:d.data[i].count,
                }
            }
        }
        this.setState({
            list:list1,
        });
    }
  render() {
      const { list } = this.state;
    const data = [
    {
      month: '近一月',
      date: '1750',
      value: 502,
    },
    {
      month: '近一月',
      date: '1800',
      value: 635,
    },
    {
      month: '上一月',
      date: '1900',
      value: 176,
    },
    {
      month: '上一月',
      date: '1950',
      value: 322,
    },
    {
      month: '上一月',
      date: '2050',
      value: 113,
    },
  ];
  const cols = {
    date: {
    },
  };
        return (
          <Chart height={250} data={list} scale={cols} padding={[40, 20, 10, 40]} forceFit>
          <Axis name="date" />
          <Axis name="value"
           grid ="null" />
          <Legend  position="top"/>
          <Tooltip />
          <Geom opacity={.8} type="area" position="date*value" color={['month', ['l (90) 0:rgba(91, 155, 213, 1) 1:rgba(91, 155, 213, 1)', 'l (90) 0:rgba(85, 111, 87, 1) 1:rgba(85, 111, 87, 1)']]} />
          <Geom opacity={.8} type="line" position="date*value" size={2} color={['month', ['rgba(91, 155, 213, 1)', '#556F57']]} />
          </Chart>
        );
    }
}
