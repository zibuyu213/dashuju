import React, { PureComponent } from 'react';
import {HttpClientImmidIot} from "../../../common/HttpClientImmidIot";
import {  Row, Col } from 'antd';

export default class Top extends PureComponent {
  constructor(props) {
        super(props);
        this.state = {
            list:[
              {
                name:'南山路',
                money:'12800.8'
              },
            ],
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
          HttpClientImmidIot.query('/parking-report/dataVisualizations/area/'+areaid+'/areaTopIncome', 'GET', null, this.handleQueryData.bind(this));
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
        console.log(data);
        if(!(data==undefined)){
          for(let i=0;i<d.data.length;i++){
            d.data[i] = {
              money:d.data[i].rotationRate,
              name:	d.data[i].parkingName
            }
          }
          this.setState({
            list: data
          });
        }
      }
  render() {
    const {list} = this.state;
    const bijiao = (num) =>{
              const a = 20*num.money/list[0].money;
              return a;

            };
    const listItems = list.map((list) =>
          <Col xs={22} key={list.name} style={{marginTop:20,height:20 ,background: '#4D64CC',marginLeft:10}}>
          <span style={{ fontSize: 15,width:80}}>{list.name}--{list.money}</span>
            <span style={{ fontSize: 14 ,float:'left',width:50}}>{list.name}</span>
            <span style={{ fontSize: 14 ,float:'left',width:50,marginLeft:10}}>{list.money}</span>
          </Col>
        );
        return (
          <Row gutter={24} style={{height:250,color:"white"}}>
              {listItems}
              <Col xs={22} style={{marginTop:20,height:20 ,background: '#4D64CC',marginLeft:10}}>
                <span style={{ fontSize: 15,width:80}}>联合总部大厦停车场</span>
              </Col>
              <Col xs={20} style={{marginTop:20,height:20 ,background: '#4D64CC',marginLeft:10}}>
                <span style={{ fontSize: 15,width:80}}>海岸缤纷城</span>
              </Col>
              <Col xs={18} style={{marginTop:20,height:20 ,background: '#4D64CC',marginLeft:10}}>
                <span style={{ fontSize: 15,width:80}}>中华信息港</span>
              </Col>
              <Col xs={15} style={{marginTop:20,height:20 ,background: '#4D64CC',marginLeft:10}}>
                <span style={{ fontSize: 15,width:80}}>科兴科技园</span>
              </Col>
              <Col xs={12} style={{marginTop:20,height:20 ,background: '#4D64CC',marginLeft:10}}>
                <span style={{ fontSize: 15,width:80}}>海岸城路段</span>
              </Col>
              <Col xs={12} style={{marginTop:20,height:20 ,background: '#4D64CC',marginLeft:10}}>
                <span style={{ fontSize: 15,width:80}}>海岸城路段</span>
              </Col>
            </Row>
        );
    }
}
