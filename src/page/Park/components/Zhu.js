import React, { PureComponent } from 'react';
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';
import DataSet from "@antv/data-set";
import {HttpClientImmidIot} from "../../../common/HttpClientImmidIot";
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
    //加载数据
  loadData() {
    const parkid = 5;
      HttpClientImmidIot.query('/parking-report/dataVisualizations/parking/'+parkid+'/offline', 'GET', null, this.handleQueryData.bind(this));
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
          time:this.gettime(d.data[i].period),
          次数:	d.data[i].count
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
          time: "0:00",
          次数: 38
        },
        {
          time: "1:00",
          次数: 52
        },
        {
          time: "2:00",
          次数: 61
        },
        {
          time: "3:00",
          次数: 38
        },
        {
          time: "4:00",
          次数: 48
        },
        {
          time: "5:00",
          次数: 38
        },
        {
          time: "6:00",
          次数: 38
        },
        {
          time: "7:00",
          次数: 38
        },
        {
          time: "8:00",
          次数: 48
        },
        {
          time: "9:00",
          次数: 38
        },
        {
          time: "10:00",
          次数: 38
        },
        {
          time: "11:00",
          次数: 38
        },
        {
          time: "12:00",
          次数: 52
        },
        {
          time: "13:00",
          次数: 95
        },
        {
          time: "14:00",
          次数: 48
        },
        {
          time: "15:00",
          次数: 38
        },
        {
          time: "16:00",
          次数: 38
        },
        {
          time: "17:00",
          次数: 38
        },
        {
          time: "18:00",
          次数: 148
        },
        {
          time: "19:00",
          次数: 38
        },
        {
          time: "20:00",
          次数: 158
        },
        {
          time: "21:00",
          次数: 150
        },
        {
          time: "22:00",
          次数: 140
        },
        {
          time: "23:00",
          次数: 150
        },
        {
          time: "24:00",
          次数: 158
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
