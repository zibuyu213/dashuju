import React, { PureComponent } from 'react';
import {  Row, Col } from 'antd';
import Map from './components/Map';
import LeiDa from './components/LeiDa';
import Huan from './components/Huan';
import Shan from './components/Shan';
import ZheXianLiang from './components/ZheXianLiang';
import HengZhu from './components/HengZhu';
import ZheXianAn from './components/ZheXianAn';
import Zhu from './components/Zhu';
import NewCard from '../../components/Card';
import MapCard from '../../components/MapCard';


export default class City extends PureComponent {

  render() {
        return (
            <div>
              <Row gutter={24} style={{margin:3}}>
                <Col xs={4}>
                  <Row  gutter={24}>
                    <Col xs={24}>
                      <NewCard title="区域车场周转能力">
                      <LeiDa/>
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
                    <Col xs={24} style={{height:680}}>
                      <Map/>
                      <div style={{background:"rgba(0, 0, 0, 0.7)",height:680,width:'18%',zIndex: 2,position: 'absolute',marginLeft:'82%',marginTop:-680}}>
                          <div style={{color:"#0058DC",textAlign:'center',marginTop:60}}>
                           <span style={{ fontSize: 16 , color: 'white'}}>今日停车金额</span>
                          </div>
                          <div style={{color:"#0058DC",textAlign:'center',marginTop:15}}>
                           <span style={{ fontSize: 25 , color: '#FBFB65'}}>1,056,328</span>
                          </div>

                           <div style={{color:"#0058DC",textAlign:'center',marginTop:60}}>
                            <span style={{ fontSize: 16 , color: 'white'}}>今日停车次数</span>
                           </div>
                           <div style={{color:"#0058DC",textAlign:'center',marginTop:15}}>
                            <span style={{ fontSize: 25 , color: '#FBFB65'}}>56,328</span>
                           </div>
                           <div style={{color:"#0058DC",textAlign:'center',marginTop:60}}>
                            <span style={{ fontSize: 16 , color: 'white'}}>实时空位</span>
                           </div>
                           <div style={{color:"#0058DC",textAlign:'center',marginTop:15}}>
                            <span style={{ fontSize: 25 , color: '#FBFB65'}}>154,320</span>
                           </div>
                           <div style={{color:"#0058DC",textAlign:'center',marginTop:60}}>
                            <span style={{ fontSize: 16 , color: 'white'}}>今日新增用户</span>
                           </div>
                           <div style={{color:"#0058DC",textAlign:'center',marginTop:15}}>
                            <span style={{ fontSize: 25 , color: '#FBFB65'}}>154,320</span>
                           </div>
                      </div>
                      <div style={{height:100,width:'18%',zIndex: 2,position: 'absolute',marginLeft:'12%',marginTop:-155}}>
                          <div style={{color:"#0058DC",textAlign:'center',marginTop:60}}>
                           <span style={{ fontSize: 16 , color: 'white'}}>泊位总数</span>
                          </div>
                          <div style={{color:"#0058DC",textAlign:'center',marginTop:15}}>
                           <span style={{ fontSize: 25 , color: '#FBFB65'}}>1,056,328</span>
                          </div>
                      </div>
                      <div style={{height:100,width:'18%',zIndex: 2,position: 'absolute',marginLeft:'-3%',marginTop:-155}}>
                          <div style={{color:"#0058DC",textAlign:'center',marginTop:60}}>
                           <span style={{ fontSize: 16 , color: 'white'}}>车场总数</span>
                          </div>
                          <div style={{color:"#0058DC",textAlign:'center',marginTop:15}}>
                           <span style={{ fontSize: 25 , color: '#FBFB65'}}>1,056,328</span>
                          </div>
                      </div>
                    </Col>

                  </Row>
                  </MapCard>
                </Col>
                <Col xs={4}>
                  <Row  gutter={24}>
                    <Col xs={24}>
                      <NewCard title="区域车场营收能力分析">
                      <LeiDa/>
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
