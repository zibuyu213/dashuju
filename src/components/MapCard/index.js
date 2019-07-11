import React, { PureComponent } from 'react';
import "./Card.less";


export default class MapCard extends PureComponent {

  render() {
        return (
            <div  style={{padding:3,boxShadow: 'rgba(86,139,184,1) 0px 0px 10px inset',height:685}} className = "rectMap">
                  {this.props.children}
            </div>
        );
    }
}
