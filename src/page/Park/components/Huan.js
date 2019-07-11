import React, { PureComponent } from 'react';
import { Chart, Axis, Geom, Tooltip,Coord, Label } from 'bizcharts';
import {HttpClientImmidIot} from "../../../common/HttpClientImmidIot";
import DataSet from "@antv/data-set";
import _ from 'lodash';
const { DataView } = DataSet;

export default class Huan extends PureComponent {
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
      HttpClientImmidIot.query('/parking-report/dataVisualizations/parking/'+parkid+'/singleAutoParkingTimes', 'GET', null, this.handleQueryData.bind(this));
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
          item: d.data[i].countCategory+'次',
          count:	d.data[i].count
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
        item: "1-2",
        count: 40
      },
      {
        item: "0.5-1",
        count: 21
      },
      {
        item: "8-16",
        count: 17
      },
      {
        item: "4-8",
        count: 13
      },
      {
        item: ">16",
        count: 9
      }
    ];
    const dv = new DataView();
    dv.source(list).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => {
          val = _.ceil((val*100),0)+"%";
          return val;
        }
      }
    };
        return (
          <Chart
            height={250}
            data={dv}
            scale={cols}
            padding={[30, 30, 30, 30]}
            forceFit
          >
            <Coord type={"theta"} radius={0.9} innerRadius={0.5} />
            <Axis name="percent" />
            <Tooltip
              showTitle={false}
              itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
            />
            <Geom
              type="intervalStack"
              position="percent"
              color="item"
              tooltip={[
                "item*percent",
                (item, percent) => {
                  console.log();
                  percent =_.ceil((percent*100),0)+"%";
                  return {
                    name: item,
                    value: percent
                  };
                }
              ]}
              style={{
                lineWidth: 1,
                stroke: "#fff"
              }}
            >
              <Label
                content="percent"
                formatter={(val, item) => {
                  return item.point.item + ": " + val;
                }}
              />
            </Geom>
          </Chart>
        );
    }
}
