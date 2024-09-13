const request = require("request");
const util = require("util");
const sign = require('./sign');
const shop = require('./shop_cart');
const conf = require('./confugrations');
const self_util = require('./util');
const getPromise = util.promisify(request);

function update_shop_cart(shop_cart, result) {
    shop_cart.length = 0;
    let cart_vo;
    if (result.statusCode === 200) {
        let res = JSON.parse(result.toJSON().body);
        console.log('获取购物车商品列表：' + res['msg']);
        let data = res['data'];
        console.log('总价：' + data['totalPrice']);
        cart_vo = data['cartVoList'][0];

        if (cart_vo['cartItemList'].length > 0) {
            let items = cart_vo['cartItemList'][0]['items'];
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                item['sold_out'] = false;
                shop_cart.push(item)
            }
        }
        if (cart_vo['sellOutCartItemList'].length > 0) {
            let items = cart_vo['sellOutCartItemList'][0]['items'];
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                item['sold_out'] = true;
                shop_cart.push(item);
            }
        }
    } else {
        console.log("请求失败：" + result.statusCode)
    }
}

function get_shop_cart_info() {
    let qs = {
        method : 'ddsy.shoppingcart.multiple.query',
        userId : conf.user.id,
        shopId : conf.user.shop.id,
        consigneeId : 15120092,
        city : conf.user.pos.name,
        lat : conf.user.pos.lat,
        lng : conf.user.pos.lng,
        loginToken : conf.user.loginToken,
        uDate : '97945720200211',
        sourceType : 2,
        versionName : '5.4.2',
        plat : conf.api.plat,
        platform: conf.api.platform,
        t: self_util.now(),
        v:'1.0'
    };

    syncReqWithSign({
        url: 'http://api.ddky.com/order/rest.htm',
        method: "GET",
        headers : conf.resp.headers,
        qs: qs
    }, function (result) {
        update_shop_cart(shop.shop_cart, result);
        shop.show_shop_cart();
    });
}

function select_cart_item(indexes, shop_cart) {
    let cartIds = [];
    for (let i = 0; i < indexes.length;i ++) {
        let idx = indexes[i];
        if (idx>=0 && idx < indexes.length) {
            cartIds.push(shop_cart[idx].cartId)
        }
    }

    let qs = {
        method: 'ddsy.shoppingcart.multiple.refresh',
        userId: conf.user.id,
        shopId: conf.user.shop.id,
        consigneeId: '15120092',
        selectedCartIds: cartIds.join(),
        versionName: '5.4.2',
        lat: conf.user.pos.lat,
        lng: conf.user.pos.lng,
        sourceType: '2',
        loginToken: conf.user.loginToken,
        uDate: '97945720200211',
        plat: conf.api.plat,
        platform: conf.api.platform,
        t: self_util.now(),
        v: '1.0',
    };

    syncReqWithSign({
        method: 'GET',
        url: 'http://api.ddky.com/order/rest.htm',
        qs: qs,
        headers: conf.resp.headers
    }, function (result) {
        update_shop_cart(shop.shop_cart, result);
        shop.show_shop_cart();
    });
}

function jiesuan(items) {
    function stepOne() {
        let qs = { method: 'ddky.order.authorization.info',
            userId: '1021980008',
            shopId: '201808',
            city: '%E6%B7%B1%E5%9C%B3%E5%B8%82',
            lat: '22.52815',
            lng: '114.04066',
            versionName: '5.4.2',
            loginToken: '155404e3a751f19b3cb0a3fa66e081fa',
            uDate: '97945720200211',
            plat: 'H5',
            platform: 'H5',
            t: now(),
            v: '1.0'};
        qs.sign = sign.doSign(qs);
        var options = { method: 'GET',
        url: 'http://api.ddky.com/order/rest.htm',
        qs: qs,
        headers: 
        {
            'cache-control': 'no-cache',
            Cookie: 'wxType=0; sessionCount=46; LNG=114.04066; LAT=22.52815; cityName=%E6%B7%B1%E5%9C%B3%E5%B8%82; shopInfo=%7B%22city%22%3A%22%E6%B7%B1%E5%9C%B3%E5%B8%82%22%2C%22shopId%22%3A%22201808%22%2C%22shopName%22%3A%22%E5%8F%AE%E5%BD%93%E6%99%BA%E6%85%A7%E8%8D%AF%E6%88%BF%EF%BC%88%E5%B9%BF%E4%B8%9C%EF%BC%89%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E6%B7%B1%E5%9C%B3%E7%A6%8F%E7%94%B0%E9%A6%99%E5%B1%B1%E7%BE%8E%E6%A0%91%E5%BA%97%22%2C%22address%22%3A%22%E5%B9%BF%E4%B8%9C%E7%9C%81%E6%B7%B1%E5%9C%B3%E5%B8%82%E7%A6%8F%E7%94%B0%E5%8C%BA%E7%A6%8F%E8%8D%A3%E8%B7%AF%E4%B8%8A%E6%B2%99%E5%A1%98%E6%99%8F%E6%9D%91%E4%B9%9D%E5%B7%B713%E5%8F%B7%E6%A5%BC404%22%2C%22lng%22%3A%22114.04066%22%2C%22lat%22%3A%2222.52815%22%2C%22district%22%3A%22%E7%A6%8F%E7%94%B0%E5%8C%BA%22%2C%22suite%22%3A1%2C%22dizhi%22%3A%22%E5%B9%BF%E4%B8%9C%E7%9C%81%E6%B7%B1%E5%9C%B3%E5%B8%82%E7%A6%8F%E7%94%B0%E5%8C%BA%E7%A6%8F%E8%8D%A3%E8%B7%AF%E4%B8%8A%E6%B2%99%E5%A1%98%E6%99%8F%E6%9D%91%E4%B9%9D%E5%B7%B713%E5%8F%B7%E6%A5%BC404%22%7D; footBtn_indexstatu=4; hidelayer=1; user=%7B%22userId%22%3A1021980008%2C%22uDate%22%3A%2297945720200211%22%2C%22loginToken%22%3A%22155404e3a751f19b3cb0a3fa66e081fa%22%2C%22tel%22%3A%2218565721706%22%2C%22userid%22%3A1021980008%7D; cartNum=0; address=%7B%22addressCity%22%3A%22%E6%B7%B1%E5%9C%B3%E5%B8%82%22%2C%22addressCommunity%22%3A%2213%E5%8F%B7%E6%A5%BC404%22%2C%22addressCreatedAt%22%3A%22%22%2C%22addressCreatedBy%22%3A%22%22%2C%22addressDetail%22%3A%22%E6%B7%B1%E5%9C%B3%E5%B8%82%E7%A6%8F%E7%94%B0%E5%8C%BA%E5%B9%BF%E4%B8%9C%E7%9C%81%E6%B7%B1%E5%9C%B3%E5%B8%82%E7%A6%8F%E8%8D%A3%E8%B7%AF%E4%B8%8A%E6%B2%99%E5%A1%98%E6%99%8F%E6%9D%91%E4%B9%9D%E5%B7%B713%E5%8F%B7%E6%A5%BC404%22%2C%22addressId%22%3A15120092%2C%22addressStreet%22%3A%22%E5%B9%BF%E4%B8%9C%E7%9C%81%E6%B7%B1%E5%9C%B3%E5%B8%82%E7%A6%8F%E7%94%B0%E5%8C%BA%E7%A6%8F%E8%8D%A3%E8%B7%AF%E4%B8%8A%E6%B2%99%E5%A1%98%E6%99%8F%E6%9D%91%E4%B9%9D%E5%B7%B7%22%2C%22addressStreetId%22%3A%22%22%2C%22addressUser%22%3A%22%E6%9D%A8%E5%AE%87%22%2C%22addressUserTel%22%3A%2218565721706%22%2C%22areaName%22%3A%22%E7%A6%8F%E7%94%B0%E5%8C%BA%22%2C%22cityId%22%3A%22%22%2C%22cityName%22%3A%22%E6%B7%B1%E5%9C%B3%E5%B8%82%22%2C%22idCard%22%3A%22%22%2C%22idCardBackendUrl%22%3A%220%22%2C%22idCardFrontedUrl%22%3A%220%22%2C%22isDefault%22%3A0%2C%22lat%22%3A%2222.52815%22%2C%22lng%22%3A%22114.04066%22%2C%22offline%22%3Afalse%2C%22provinceName%22%3A%22%E5%B9%BF%E4%B8%9C%E7%9C%81%22%2C%22sex%22%3A1%2C%22shopId%22%3A%22201808%22%2C%22shopName%22%3A%22%E5%8F%AE%E5%BD%93%E6%99%BA%E6%85%A7%E8%8D%AF%E6%88%BF%EF%BC%88%E5%B9%BF%E4%B8%9C%EF%BC%89%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E6%B7%B1%E5%9C%B3%E7%A6%8F%E7%94%B0%E9%A6%99%E5%B1%B1%E7%BE%8E%E6%A0%91%E5%BA%97%22%2C%22tag%22%3A%22%E5%AE%B6%22%2C%22telList%22%3A%5B%7B%22createdAt%22%3A%222020-02-13%2015%3A16%3A17%22%2C%22doctorName%22%3A%22%E8%8D%AF%E5%B8%88%E5%92%A8%E8%AF%A2%22%2C%22id%22%3A0%2C%22pharmacyId%22%3A201808%2C%22tel%22%3A%2295028%22%7D%5D%2C%22type%22%3A1%2C%22userId%22%3A1021980008%2C%22suite%22%3A1%7D; payMent=o2o',
            Referer: 'http://h.ddky.com/car.html',
            Connection: 'keep-alive',
            'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
            Accept: '*/*',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0' } };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
        });
    }
    // stepOne();
    function stepTwo() {
        let qs = { method: 'ddsy.order.submit.cart',
            shopId: '201808',
            userId: '1021980008',
            city: '%E6%B7%B1%E5%9C%B3%E5%B8%82',
            consigneeId: '15120092',
            multipleShopSupport: '1',
            cartItems: '70362552',
            sourceType: '2',
            versionName: '5.4.2',
            loginToken: '155404e3a751f19b3cb0a3fa66e081fa',
            uDate: '97945720200211',
            plat: 'H5',
            platform: 'H5',
            t: now(),
            v: '1.0'};
        qs.sign = sign.doSign(qs);
        let options = { method: 'GET',
            url: 'http://api.ddky.com/order/rest.htm',
            qs: qs,
            headers: conf.resp.headers
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
        });
    }
    // stepTwo();
    finalAction([507796]);
}

function stepThree(cartItems) {
    let qs = {
        method: 'ddsy.order.submit.cart',
        shopId: conf.user.shop.id,
        userId: conf.user.id,
        city: conf.user.pos.name,
        consigneeId: '15120092',
        multipleShopSupport: '1',
        cartItems: cartItems.join(),
        sourceType: '2',
        versionName: '5.4.2',
        loginToken: conf.user.loginToken,
        uDate: '97945720200211',
        plat: conf.api.plat,
        platform: conf.api.platform,
        t: self_util.now(),
        v: '1.0',
        lat: conf.user.pos.lat,
        lng: conf.user.pos.lng
    };
    let options = {
        method: 'GET',
        url: 'http://api.ddky.com/order/rest.htm',
        qs: qs,
        headers: conf.resp.headers
    };
    syncReqWithSign(options, function (result) {
        let res = JSON.parse(result.toJSON().body);
        if (res.success) {
            finalAction(cartItems)
        } else {
            console.log("失败: " + res.msg);
        }
    });
}
// stepThree();
function finalAction(cartItems) {
    let qs = {
        versionName: '5.6.0',
        platform: conf.api.plat,
        sourceType: '2',
        remark: '',
        cartItems: cartItems.join(),
        voucherId: '',
        userId: conf.user.id,
        shopId: conf.user.shop.id,
        deliverPay: '9.00',
        city: conf.user.pos.name,
        consigneeId: '15120092',
        shippingMethod: '0',
        payType: '-1',
        isInvoice: '0',
        method: 'ddsy.order.submit.order',
        loginToken: conf.user.loginToken,
        uDate: '97945720200211',
        plat: conf.api.plat,
        t: self_util.now(),
        v: '1.0'
    };
    let options = {
        method: 'GET',
        url: 'http://api.ddky.com/order/rest.htm',
        qs: qs,
        headers: conf.resp.headers
    };
    syncReqWithSign(options, function (result) {
        if (result.statusCode === 200) {
            let res = JSON.parse(result.toJSON().body);
            if (res != null && res.success) {
                console.log("请前去付款");
            } else {
                console.log("失败: [ " + res.msg + " ], 将继续进行尝试;");
                finalAction(cartItems);
            }
        } else {
            console.log(result);
            finalAction(cartItems);
        }
    });
}

function buy_items(itemIdxes) {
    let cartIds = [];
    for (let i = 0; i < itemIdxes.length;i ++) {
        let idx = parseInt(itemIdxes[i]);
        if (idx>=0 && idx < shop.shop_cart.length) {
            cartIds.push(shop.shop_cart[idx].cartId)
        }
    }
    console.log("selected : " + cartIds);
    finalAction(cartIds);
}

function add_to_cart(skuId, quantity) {
    if (skuId.length <= 0)
        return;
    let qs = {
        userId: conf.user.id,
        shopId: conf.user.shopId,
        skuId: skuId[0],
        multipleShopSupport: '1',
        quantity: quantity,
        method: 'ddsy.shoppingcart.add',
        positionCode: '1',
        loginToken: conf.user.loginToken,
        uDate: '97945720200211',
        versionName: '5.3.0',
        plat: conf.api.plat,
        platform: conf.api.platform,
        t: self_util.now(),
        v: '1.0'
    };
    let options = {
        method: 'GET',
        url: 'http://api.ddky.com/order/rest.htm',
        qs: qs,
        headers: conf.resp.headers
    };
    syncReqWithSign(options, function (result) {
        console.log(result);
    });
}

// jiesuan();

async function syncReqWithSign(options, callback) {
    options.qs.sign = sign.doSign(options.qs);
    let result = await getPromise(options);
    callback(result)
}

function requestGet(url, headers, requestData) {
    return new Promise((resolve, reject) => {
        let option = {
            url: url,
            method: "GET",   //指定请求方法类型：GET, POST
            timeout: 30000,  // 设置请求超时，单位是毫秒
            headers: headers,
            qs: requestData    // 进行GET请求时，此处的参数一定是qs,请注意，如果是POST请求，参数是form
        };
        request(option, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body)   // 返回response的内容
            } else {
                reject(error);   // 返回错误信息
            }
        });
    });
}

module.exports = {
    get_shop_cart_info,
    select_cart_item,
    buy_items,
    add_to_cart
};