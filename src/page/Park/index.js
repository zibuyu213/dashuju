import React, { PureComponent } from 'react';
import {  Row, Col, Icon } from 'antd';
import NewCard from '../../components/Card';
import QuXian1 from './components/QuXian1';
import QuXian from './components/QuXian';
import Huan from './components/Huan';
import Huan1 from './components/Huan1';
import Zhu from './components/Zhu';
import JianBianXian from './components/JianBianXian';
import ShuangQuXian from './components/ShuangQuXian';
import chechang from '../../img/chechang.png';
import {HttpClientImmidIot} from "../../common/HttpClientImmidIot";

export default class Park extends PureComponent {
  constructor(props) {
        super(props);
        this.state = {
          curDayParkingMoney:"--",
          curTimeSpareSpace:"--",
          todayParkTimes:"--",
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
      HttpClientImmidIot.query('/parking-report/dataVisualizations/parking/'+parkid+'/parkingMapOverView', 'GET', null, this.handleQueryData.bind(this));
  }
  // loadData回调函数
  handleQueryData(d, type) {
    const data = d.data;
    if(!(data==undefined)){
      this.setState({
        curDayParkingMoney:data.curDayParkingMoney,
        curTimeSpareSpace:data.curTimeSpareSpace,
        todayParkTimes:data.todayParkTimes,
      });
    }

  }
  render() {
    const {curDayParkingMoney,curTimeSpareSpace,todayParkTimes} = this.state;
        return (
            <div>
              <Row gutter={24} style={{margin:3}}>
                <Col xs={4}>
                  <Row  gutter={24}>
                    <Col xs={24}>
                      <NewCard title="24小时周转率">
                      <JianBianXian/>
                      </NewCard>
                    </Col>
                    <Col xs={24} style={{marginTop:10}}>
                      <NewCard title="24小时车流统计">
                      <ShuangQuXian/>
                      </NewCard>
                    </Col>
                  </Row>
                </Col>
                <Col xs={16} style={{height:698}}>
                  <Row>
                    <Col xs={24}>
                      <div  style={{padding:3,boxShadow: 'rgba(86,139,184,1) 0px 0px 10px inset',height:140}} className = "rectMap">
                            <Col xs={24} style={{textAlign:'center'}}>
                              <span style={{ fontSize: 30 , color: '#FBFB65'}}>联合总部大厦停车场</span>
                            </Col>
                            <Col xs={1} style={{marginTop:30}}>
                            </Col>
                            <Col xs={3} style={{marginTop:30}}>
                              <span style={{fontSize: 25 , color: 'white' }}>泊位数</span><span style={{fontSize: 25 , color: '#FBFB65'}}>210</span>
                            </Col>
                            <Col xs={3} style={{marginTop:30}}>
                              <span style={{fontSize: 25 , color: 'white' }}>类型</span><span style={{fontSize: 25 , color: '#FBFB65'}}>路外</span>
                            </Col>
                            <Col xs={5} style={{marginTop:30}}>
                              <span style={{fontSize: 25 , color: 'white' }}>价格</span><span style={{fontSize: 25 , color: '#FBFB65'}}>10元/首小时</span>
                            </Col>
                            <Col xs={12} style={{marginTop:30}}>
                              <Icon type="environment"style={{fontSize: 25, color: 'white' }}/>
                              <span style={{ fontSize: 25, color: 'white',marginLeft:8 }}>学府路中信海阔天空小区旁中铁二局高新区</span>
                            </Col>
                      </div>
                    </Col>
                    <Col xs={24} style={{marginTop:10}}>
                    <div  style={{padding:3,boxShadow: 'rgba(86,139,184,1) 0px 0px 10px inset',height:532}} className = "rectMap">
                        <Row>
                          <Col xs={24}>
                            <img src={chechang} style={{width:"100%",height:427}}/>
                          </Col>
                          <Col xs={8} style={{background:"#293345"}}>
                          <div style={{color:"gray",textAlign:'center',marginTop:13}}>
                           <span style={{ fontSize: 17 , color: 'gray'}}>实时空位</span>
                          </div>
                          <div style={{color:"gray",textAlign:'center',marginTop:13}}>
                           <span style={{ fontSize: 30, color: '#FBFB65'}}>{curTimeSpareSpace}</span>
                          </div>
                          </Col>
                          <Col xs={8} style={{background:"#293345"}}>
                          <div style={{color:"gray",textAlign:'center',marginTop:13}}>
                           <span style={{ fontSize: 17, color: 'gray'}}>今日停车次数</span>
                          </div>
                          <div style={{color:"gray",textAlign:'center',marginTop:13}}>
                           <span style={{ fontSize: 30, color: '#FBFB65'}}>{todayParkTimes}</span>
                          </div>
                          </Col>
                          <Col xs={8} style={{background:"#293345"}}>
                          <div style={{color:"gray",textAlign:'center',marginTop:13}}>
                           <span style={{ fontSize: 17, color: 'gray'}}>今日停车金额</span>
                          </div>
                          <div style={{color:"gray",textAlign:'center',marginTop:13}}>
                           <span style={{ fontSize: 30, color: '#FBFB65'}}>{curDayParkingMoney}</span>
                          </div>
                          </Col>
                        </Row>
                        </div>
                    </Col>
                  </Row>
                </Col>
                <Col xs={4}>
                  <Row  gutter={24}>
                    <Col xs={24}>
                      <NewCard title="月停车时长统计">
                      <Huan1/>
                      </NewCard>
                    </Col>
                    <Col xs={24} style={{marginTop:10}}>
                      <NewCard title="月单车辆停车次数统计">
                      <Huan/>
                      </NewCard>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row gutter={24} style={{margin:3,marginTop:10}}>
                <Col xs={8}>
                  <NewCard title="24小时设备掉线次数统计">
                  <Zhu/>
                  </NewCard>
                </Col>
                <Col xs={8}>
                  <NewCard title="日收入统计">
                    <QuXian/>
                  </NewCard>
                </Col>
                <Col xs={8}>
                  <NewCard title="24小时车位使用率">
                  <QuXian1/>
                  </NewCard>
                </Col>
              </Row>
            </div>
        );
    }
}
