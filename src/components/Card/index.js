import React, { PureComponent } from 'react';
import {Row,Col} from 'antd';
import "./Card.less";


export default class NewCard extends PureComponent {

  render() {
    const {title} = this.props;
        return (
            <div  style={{paddingBottom: 24,paddingTop: 2,paddingLeft: 2,boxShadow: 'rgba(86,139,184,1) 0px 0px 10px inset'}} className = "rect">
              <Row type="flex" justify="space-around" align="middle">
                <Col xs={24}>
                   <div style={{color:"white",
                                background: 'linear-gradient(to left, rgba(30,46,81,0), rgba(30,46,81,1))',
                                height:35,padding:1}}><span style={{marginLeft:7,fontSize:20}}>{title}</span></div>
                </Col>
                <Col xs={24} style={{margin:10}}>
                  {this.props.children}
                </Col>
              </Row>
            </div>
        );
    }
}
