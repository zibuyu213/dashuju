import React, { PureComponent } from 'react';
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';
import {HttpClientImmidIot} from "../../../common/HttpClientImmidIot";
import DataSet from "@antv/data-set";
const { DataView } = DataSet;

export default class Zhu extends PureComponent {
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
        HttpClientImmidIot.query(base+'/parking-report/dataVisualizations/city/440300/illegalStatistics', 'GET', null, this.handleQueryData.bind(this));
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
      return parseInt(marr[0])+"时";
    }
    //回调函数
    handleQueryData(d, type){
        let list1=[];
        if(!(d.data==undefined)){
            for(let i=0;i<d.data.length;i++){
                list1[i]={
                    time: this.gettime(d.data[i].period),
                    次数:	d.data[i].count
                }
            }
        }
        this.setState({
            list:list1,
        });
    }

  render() {
      const { list } = this.state;
    const data1 = [
      {
        item: "南山区",
        count: 40
      },
      {
        item: "福田区",
        count: 21
      },
      {
        item: "盐田区",
        count: 17
      },
      {
        item: "宝安区",
        count: 13
      },
      {
        item: "龙岗区",
        count: 9
      }
    ];
    const dv = new DataView();
    dv.source(data1).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });

    const data17 = [
        {
          time: "18",
          次数: 38
        },
        {
          time: "19",
          次数: 52
        },
        {
          time: "20",
          次数: 61
        },
        {
          time: "21",
          次数: 38
        },
        {
          time: "22",
          次数: 48
        },
        {
          time: "23",
          次数: 38
        },
        {
          time: "24",
          次数: 38
        }
      ];
        return (
          <Chart height={250} data={list} padding={[40, 20, 40, 40]}  forceFit>
            <Axis name="time" />
            <Axis name="次数"
             grid ="null" />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom type="interval" position="time*次数" />
          </Chart>
        );
    }
}
