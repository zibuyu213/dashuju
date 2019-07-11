import React, { Component } from 'react';
export default class Map extends Component {
    constructor(props) {
        super(props);
        this.mapInstance = null;
        this.trafficLayer = null;
        this.state = {
        };
    }

    // 组件挂载之前
    componentWillMount() {
    }

    // 组件挂载后
    componentDidMount() {
        this.mapInstance = new window.AMap.Map('mapContainer', {
            resizeEnable: true,
            mapStyle: 'amap://styles/darkblue',
            showIndoorMap: true,
            zoom: 13,
        });

        // 地图插件
        this.mapInstance.plugin(["AMap.DistrictSearch"], () => {
            new window.AMap.DistrictSearch({
                extensions: 'all',
                subdistrict: 0
            }).search('福田区', (status, result) => {
                // 外多边形坐标数组和内多边形坐标数组
                var outer = [
                    new window.AMap.LngLat(-360, 90, true),
                    new window.AMap.LngLat(-360, -90, true),
                    new window.AMap.LngLat(360, -90, true),
                    new window.AMap.LngLat(360, 90, true),
                ];
                var holes = result.districtList[0].boundaries
                var pathArray = [
                    outer
                ];
                pathArray.push.apply(pathArray, holes)
                var polygon = new window.AMap.Polygon({
                    path: pathArray,
                    strokeColor: '#00eeff',
                    strokeWeight: 1,
                    fillColor: '#0f163e',
                    fillOpacity: 1
                });
                this.mapInstance.add(polygon);
                this.mapInstance.setCenter(result.districtList[0].center)
            })

        });

        // canvas网格线
        const layer = new window.AMap.TileLayer.Flexible({
            cacheSize: 30,
            zIndex: 200,
            createTile: (x, y, z, success, fail) => {
                let c = document.createElement('canvas');
                c.width = c.height = 250;

                let cxt = c.getContext("2d");
                cxt.font = "15px Verdana";
                cxt.fillStyle = "rgb(20,124,222)";
                cxt.strokeStyle = "rgb(237,125,47)";
                cxt.strokeRect(0, 0, 250, 250);
                cxt.fillText('(' + [x, y, z].join(',') + ')', 10, 30);
                cxt.lineWidth = 3
                // 通知API切片创建完成
                success(c);
            }
        });
        layer.setMap(this.mapInstance);


        //实时路况图层
        this.trafficLayer = new window.AMap.TileLayer.Traffic({
            zIndex: 10
        });
        this.trafficLayer.setMap(this.mapInstance);
    }

    // 组件卸载之前
    componentWillUnmount() {
        this.mapInstance.destroy()
    }

    render() {
        const { } = this.state;
        return (
            <div id='mapContainer' style={{ height: '100%', width: '100%', position: 'relative' }}>
            </div>
        );
    }
}
