import _ from 'lodash';
// 随机生成设备点
const heatmapData = function (min = 30, max = 50) {
    const leng = _.random(min, max);
    const points = [];
    for (let i = 0; i < leng; i++) {
        const count = _.random(10, 100);
        let lng = _.random(113.802164, 114.318522); // 经度
        let lat = _.random(22.522676, 22.780584); // 纬度
        points.push({ lng, lat, count })
    }
    return points
}

export {
    heatmapData
}