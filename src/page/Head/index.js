import React, { PureComponent } from 'react';
import {  Row, Col, Icon } from 'antd';
import logo from '../../img/logo.png';
import img from '../../img/headbg.png';
import moment from 'moment';
export default class Head extends PureComponent {
  state={
    time:"",
    date:"",
    week:""
  }
  tick = () => {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var currentdate = year + "年" + month + "月" + strDate + "日";
    this.setState({
       time: moment().format('HH:mm:ss') ,
       date: currentdate,
       week: moment().format('dddd') ,
     }) }

  componentDidMount() {
    moment.locale('en', {
    weekdays  : [
        "星期日","星期一", "星期二", "星期三", "星期四", "星期五", "星期六",
    ]
});
    // 定时器，可以修改1000为自己想要的时间，
    this.interval = setInterval(() => this.tick(), 1000);
  }

  render() {
    const {time,date,week} = this.state;
    return (
          <Row  style={{ color:"white",width:"100%" , height:"100%",backgroundImage: 'url(' +img + ')' ,textAlign:'center',backgroundSize: 'cover'}}>
            <Col xs={2} style={{paddingTop:47}}>
            <span style={{  fontSize: 30,marginLeft:43 }}>{time}</span>
            </Col>
            <Col xs={2} style={{paddingTop:53}}>
              <Row style={{textAlign:'left',marginLeft:10}}>
                <Col xs={24}>
                <span style={{  fontSize: 10}}>{date}</span>
                </Col>
                <Col xs={24} style={{marginTop:-5}}>
                <span style={{  fontSize: 10 }}>{week}</span>
                </Col>
              </Row>
            </Col>
            <Col xs={16} style={{paddingTop:25}}>
              <img src={logo} style={{ marginTop: -7, width: 84,marginRight:10 }} />
              <span style={{  fontSize: 25,marginLeft:10 }}>城市静态交通一体化管理服务平台</span>
            </Col>
            <Col xs={4} style={{marginTop:68 }}>
              <span style={{ fontSize: 16,marginLeft:-77}}>超级管理员<Icon type="caret-down" /></span>
              <span style={{ fontSize: 16 ,marginLeft:30}}>
                <a style={{color:"white"}} onClick={() => { window.location.pathname = '/plateform' }}>进入管理界面</a>
              </span>
              <span style={{ fontSize: 16, color:"white" ,marginLeft:30}}>
                <a style={{color:"white"}} onClick={() => { window.history.back();}}>返回</a>
              </span>
            </Col>
          </Row>
    )
  }
}
