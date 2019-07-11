import React, { PureComponent } from 'react';
import { Chart, Axis, Geom, Tooltip, Coord, Label } from 'bizcharts';
import {HttpClientImmidIot} from "../../../common/HttpClientImmidIot";
import DataSet from "@antv/data-set";
const { DataView } = DataSet;
const tyep = ['', '0.5-1小时', '1-4小时', '4-8小时', '8-16小时', '>16', '1-4小时'];

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

    //loadData
    loadData(){
        let base = 'https://www.easy-mock.com/mock/5cd0f2f3682f200251f31dd3/immidiot';
        HttpClientImmidIot.query(base+'/parking-report/dataVisualizations/city/440300/areaParkingTimeDistribution', 'GET', null, this.handleQueryData.bind(this));
    }

    //回调函数
    handleQueryData(d, type){
        let list1=[];
        if(!(d.data==undefined)){
            for(let i=0;i<d.data.length;i++){
                list1[i] = {
                  item: tyep[parseInt(d.data[i].countCategory)],
                  count: d.data[i].count
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
          val = val * 100 + "%";
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
                  percent = percent * 100 + "%";
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
