import React, { PureComponent } from 'react';
import {  Row, Col, Icon , Dropdown , Menu } from 'antd';
import Map from './components/Map';
import HengZhu from './components/HengZhu';
import ZheXianLiang from './components/ZheXianLiang';
import ZheXianAn from './components/ZheXianAn';
import Zhu from './components/Zhu';
import JianBianXian from './components/JianBianXian';
import Top from './components/Top';
import ShuangQuXian from './components/ShuangQuXian';
import Huan from './components/Huan';
import Shan from './components/Shan';
import NewCard from '../../components/Card';
import MapCard from '../../components/MapCard';


export default class District extends PureComponent {

  render() {

    const menu = (
    <Menu style={{background:"#010D21"}}>
      <Menu.Item>
        <a href="/Visualize/#/Park" style={{color:"#0058DC"}}>
          联合总部大厦停车场
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="/Visualize/#/Park" style={{color:"#0058DC"}}>
          联合总部大厦停车场
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="/Visualize/#/Park" style={{color:"#0058DC"}}>
          联合总部大厦停车场
        </a>
      </Menu.Item>
    </Menu>
  );
        return (
            <div>
              <Row gutter={24} style={{margin:3}}>
                <Col xs={4}>
                  <Row  gutter={24}>
                    <Col xs={24}>
                      <NewCard title="停车分析 : 车流分析">
                      <ShuangQuXian/>
                      </NewCard>
                    </Col>
                    <Col xs={24} style={{marginTop:10}}>
                      <NewCard title="停车用户画像 : 停车时长分布">
                      <Huan/>
                      </NewCard>
                    </Col>
                  </Row>
                </Col>
                <Col xs={16}>
                <MapCard>
                  <Row>
                    <Col xs={21} style={{height:680}}>
                      <Map/>
                    </Col>
                    <Col xs={3} style={{background:"#293345",height:680}}>
                    <div style={{color:"#0058DC",textAlign:'center',marginTop:40}}>
                         <Dropdown overlay={menu}>
                            <a  style={{ fontSize: 27 , color: '#FBFB65'}}>
                              福田区 <Icon style={{ fontSize: 27 , color: '#FBFB65'}} type="down" />
                            </a>
                          </Dropdown>
                         </div>
                         <div style={{color:"#0058DC",textAlign:'center',marginTop:25}}>
                          <span style={{ fontSize: 16 , color: 'gray'}}>车厂总数</span>
                         </div>
                         <div style={{color:"#0058DC",textAlign:'center',marginTop:15}}>
                          <span style={{ fontSize: 25 , color: '#2C58B0'}}>1,286</span>
                         </div>
                         <div style={{color:"#0058DC",textAlign:'center',marginTop:25}}>
                          <span style={{ fontSize: 16 , color: 'gray'}}>泊位总数</span>
                         </div>
                         <div style={{color:"#0058DC",textAlign:'center',marginTop:15}}>
                          <span style={{ fontSize: 25 , color: '#2C58B0'}}>154,320</span>
                         </div>
                         <div style={{color:"#0058DC",textAlign:'center',marginTop:60}}>
                          <span style={{ fontSize: 16 , color: 'gray'}}>实时空位</span>
                         </div>
                         <div style={{color:"#0058DC",textAlign:'center',marginTop:15}}>
                          <span style={{ fontSize: 25 , color: '#FBFB65'}}>154,320</span>
                         </div>
                         <div style={{color:"#0058DC",textAlign:'center',marginTop:25}}>
                          <span style={{ fontSize: 16 , color: 'gray'}}>今日停车次数</span>
                         </div>
                         <div style={{color:"#0058DC",textAlign:'center',marginTop:15}}>
                          <span style={{ fontSize: 25 , color: '#FBFB65'}}>56,328</span>
                         </div>
                         <div style={{color:"#0058DC",textAlign:'center',marginTop:25}}>
                          <span style={{ fontSize: 16 , color: 'gray'}}>今日停车金额</span>
                         </div>
                         <div style={{color:"#0058DC",textAlign:'center',marginTop:15}}>
                          <span style={{ fontSize: 25 , color: '#FBFB65'}}>1,056,328</span>
                         </div>
                    </Col>
                  </Row>
                  </MapCard>
                </Col>
                <Col xs={4}>
                  <Row  gutter={24}>
                    <Col xs={24}>
                      <NewCard title="TOP收入车场">
                      <Top/>
                      </NewCard>
                    </Col>
                    <Col xs={24} style={{marginTop:10}}>
                      <NewCard title="停车分析 : 支付服务统计">
                      <Shan/>
                      </NewCard>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row gutter={24} style={{margin:3,marginTop:10}}>
                <Col xs={4}>
                  <NewCard title="停车指数分析">
                  <ZheXianLiang/>
                  </NewCard>
                </Col>
                <Col xs={8}>
                  <NewCard title="停车热点区域预警">
                    <HengZhu/>
                  </NewCard>
                </Col>
                <Col xs={8}>
                  <NewCard title="营收分析">
                  <ZheXianAn/>

                  </NewCard>
                </Col>
                <Col xs={4}>
                  <NewCard title="停车分析 : 违章次数统计">
                  <Zhu/>
                  </NewCard>
                </Col>
              </Row>
            </div>
        );
    }
}
