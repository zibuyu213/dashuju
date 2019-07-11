import React, { Component } from 'react';
import {Icon } from 'antd';
import shenzhenGeoJson from './shenzhenGeoJson.js';
import { heatmapData } from './genHotPoint';
import _ from 'lodash';
import infoWindowImg from '.././../../img/显示框@3x.png'
import './Map.less';
export default class Map extends Component {
    constructor(props) {
        super(props);
        this.mapInstance = null;
        // this.trafficLayer = null;
        this.geoJson = null;
        // this.heatMap = null;
        this.infoWindow = null;
        this.state = {
            isGeoJsonMap: true,
            // mapTitle: '热力图',
        };
    }

    // 组件挂载之前
    componentWillMount() {
    }

    // 组件挂载后
    componentDidMount() {
        this.mapInstance = new window.AMap.Map('mapContainer', {
            // viewMode: '3D',
            resizeEnable: true,
            // pitch: 70,
            zoom: 10,
            mapStyle: 'amap://styles/darkblue',
            center: [114.251999, 22.63446],
            showIndoorMap: true
        });

        // this.mapInstance.plugin(["AMap.Heatmap"], () => {
        //     //初始化heatmap对象
        //     this.heatMap = new window.AMap.Heatmap(this.mapInstance, {
        //         radius: 35, //给定半径
        //     });
        //     //设置数据集：该数据为北京部分“公园”数据
        //     this.heatMap.setDataSet({
        //         data: heatmapData(100, 200),
        //         max: 100
        //     });
        //     this.heatMap.hide();
        // });

        this.infoWindow = new window.AMap.InfoWindow({
            isCustom: true,  //使用自定义窗体
            autoMove: false,
            anchor: 'bottom-right',
            // content: createInfoWindow(title, content.join("<br/>")),
            // offset: new window.AMap.Pixel(16, -45)
        });

        //构建自定义信息窗体
        function createInfoWindow(content) {
            var info = document.createElement("div");
            info.className = "custom-info input-card content-window-card";
            // 定义中部内容
            var middle = document.createElement("div");
            middle.className = "info-middle";
            middle.style.backgroundImage = `url(${infoWindowImg})`
            middle.innerHTML = content;
            info.appendChild(middle);
            return info;
        }

        this.geoJson = new window.AMap.GeoJSON({
            geoJSON: shenzhenGeoJson,
            // 还可以自定义getMarker和getPolyline
            getPolygon: (geojson, lnglats) => {
                // console.log(geojson)
                const polygon = new window.AMap.Polygon({
                    path: lnglats,
                    fillOpacity: 0,
                    strokeColor: 'white',
                    strokeWeight: 1,
                    strokeOpacity: 0.2,
                    extData: geojson.properties,
                });
                const markCenter = polygon.getBounds().getCenter();
                new window.AMap.Marker({
                    map: this.mapInstance,
                    position: markCenter,
                    content: `<div class='markerPoint' />`
                })
                polygon.on('click', (mapEvent) => {
                    window.location.hash = '/District';
                });
                polygon.on('mouseover', (mapEvent) => {
                    const content = [];
                    const extData = mapEvent.target.Ge.extData;
                    content.push(`<div class='info-head'>${extData.name}</div>`);
                    content.push(
                        `<div class='info-content'>
                            <div class='indicators'>停车场<span>${extData.parking}个</span></div>
                            <div class='indicators'>泊位数<span>${extData.parkingPoint}个</span></div>
                            <div class='indicators'>平均饱和度<span>${extData.parking}%</span></div>
                            <div class='indicators'>最高饱和度<span>${extData.parking}%</span></div>
                        </div>`
                    );
                    this.infoWindow.setContent(createInfoWindow(content.join("")))
                    this.infoWindow.open(this.mapInstance, new window.AMap.LngLat(...extData.cp));
                    polygon.setOptions({
                        strokeWeight: 2,
                        strokeOpacity: 1
                    })
                });
                polygon.on('mouseout', () => {
                    polygon.setOptions({
                        strokeWeight: 1,
                        strokeOpacity: 0.2
                    })
                });
                return polygon
            }
        });
        this.geoJson.setMap(this.mapInstance);
        //实时路况图层
        // this.trafficLayer = new window.AMap.TileLayer.Traffic({
        //     zIndex: 10
        // });

        // 地图事件
        this.mapInstance.on('click', () => {
            this.infoWindow.close();
        });
    }

    // 组件卸载之前
    componentWillUnmount() {
        this.mapInstance.destroy()
    }

    render() {
        const { isGeoJsonMap, mapTitle } = this.state;
        const MyIcon = Icon.createFromIconfontCN({
            scriptUrl: '//at.alicdn.com/t/font_1180595_6nemd1bc6ty.js', // 在 iconfont.cn 上生成
        });
        return (
            <div id='mapContainer' style={{ height: '100%', width: '100%', position: 'relative' }}>
                {/*百分比*/}
                <div
                    style={{
                        position: 'absolute',
                        zIndex: 100,
                        top: 30,
                        padding: '0 10px',
                        left: 'calc(50% - 100px)',
                    }}>{mapTitle}
                </div>
            </div>
        );
    }
}
