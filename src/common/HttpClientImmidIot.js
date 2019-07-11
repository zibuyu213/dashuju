import $ from 'jquery';
import {message} from 'antd';

export var HttpClientImmidIot = (function () {
    //请求类型【truth,mock】
    // var REQUEST = "mock";
    var REQUEST = "truth";

    var requestSuccess = 0;
    var requestDataError = 1;
    var requestServiceError = 2;

    //获取请求host
    var httpClientHost = '';
    switch (process.env.NODE_ENV) {
        case "development":
            //开发环境
            httpClientHost = 'https://unicom.triplego.cn'; //
            break;
        case "production":
            //大树 生产环境
            httpClientHost = 'https://unicom.triplego.cn';
            break;
        default:
            break;
    }

    function query(url, rtype, data, callback, contentType = 'application/json;charset=UTF-8', processData = true) {
        //console.log(REQUEST + "--" + url + "--Params:", data);
        let httpUrl = '';
        httpClientHost = 'https://unicom.triplego.cn';
        if (url.indexOf('http') > -1) {
            httpUrl = url;
            // 中间件接口，增加几个公共参数
        } else if (url.indexOf('easy-mock') > -1) {
            httpUrl = url.replace(/easy-mock/, 'https://www.easy-mock.com/mock/5cd0f2f3682f200251f31dd3/immidiot');
        } else {
            httpUrl = httpClientHost + url
        }
            let headers = null;
            let header_token = null;
            // if ((url === window.window.MODULE_PARKING_AUTHORITY + '/admin/token') || (url === window.MODULE_PARKING_AUTHORITY + '/configureInfo/getLogoConfig')) { // 判断是否是登录接口
            //     header_token = "Basic Y29uc29sZTpjb25zb2xl";
            // } else {
            //     let access_token = window.customCookie.get('access_token') || '';
            //     header_token = "Bearer " + access_token;
            // }
            header_token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJzdXBlcjoxIiwid3hPcGVuSWQiOm51bGwsIm5pY2tOYW1lIjoiYWRtaW4iLCJzY29wZSI6WyJjb25zb2xlIl0sIm5hbWUiOiJzdXBlcjoxIiwiZXhwIjoxNTU5Nzg0ODMxLCJ1c2VySWQiOjEsIm9wZXJhdG9ySWQiOjEsImF1dGhvcml0aWVzIjpbIjEiLCJ1c2VySWQgOjEiXSwianRpIjoiMjEzMTdmNzEtZTIyZC00MjQzLTk2MjAtZDM4ZWJkNDAwMjViIiwiY2xpZW50X2lkIjoiY29uc29sZSJ9.iMHV6_0-YhcLeBWklSEEy586fGO1cVmWOtUZ13Q5wC0';
            // header_token = "Bearer " + access_token;
            headers = {"Authorization": header_token};
            $(function () {
                $.ajax({
                    "url": httpUrl,
                    "async": true,
                    "cache": false,
                    "method": rtype,
                    "data": data,
                    "processData": processData,
                    "dataType": 'json',
                    "contentType": contentType,
                    "xhrFields": {
                        "withCredentials": true,
                    },
                    "headers": headers,
                    timeout: 40000,
                    "crossDomain": true,
                    success: function (d) {
                      callback(d, requestSuccess);
                        if (d.success) {
                            //成功
                          //  console.log(REQUEST + "--" + url + "--Success:", d);
                        } else {
                            //可以处理d.error.code
                            // if (d.error.code === 10014 || d.error.code === 10015) {// 登录失效 || 用户不存在
                            //     window.isInvalidToLogin = true;
                            //     sessionStorage.clear();
                            //     localStorage.clear();
                            //     window.setPageMenu([]);
                            //     window.setPermission({});
                            //     window.setManagePartnerList([]);
                            //     window.currentIsSystemAdmin = false;
                            //     if (d.error.code === 10014) {
                            //         location.hash = '/Login';
                            //     } else {
                            //         callback(d, requestSuccess);
                            //         const hash = location.hash;
                            //         if (!hash.match('Login')) {
                            //             location.hash = '/Login';
                            //         }
                            //     }
                            // } else {
                            //     message.error(d.error.message);
                            //     callback(d, requestDataError);
                            // }
                        }
                    },
                    error: function (e) {
                        //服务异常
                        console.error(REQUEST + "--" + url + "--Error:", e);
                        message.error("服务器异常！");
                        callback(e, requestServiceError);
                    }
                });
            })
    }

    return {
        ClientHost: httpClientHost,
        GET: 'GET',
        POST: "POST",
        PUT: "PUT",
        DELETE: "DELETE",
        requestSuccess: requestSuccess,
        requestDataError: requestDataError,
        requestServiceError: requestServiceError,
        query: query,
        REQUEST: REQUEST
    }


}());
