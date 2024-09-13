const resp = {
    headers: {
        'cache-control': 'no-cache',
        Cookie: 'wxType=0; sessionCount=47; LNG=114.04066; LAT=22.52815; cityName=%E6%B7%B1%E5%9C%B3%E5%B8%82; shopInfo=%7B%22city%22%3A%22%E6%B7%B1%E5%9C%B3%E5%B8%82%22%2C%22shopId%22%3A%22201808%22%2C%22shopName%22%3A%22%E5%8F%AE%E5%BD%93%E6%99%BA%E6%85%A7%E8%8D%AF%E6%88%BF%EF%BC%88%E5%B9%BF%E4%B8%9C%EF%BC%89%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E6%B7%B1%E5%9C%B3%E7%A6%8F%E7%94%B0%E9%A6%99%E5%B1%B1%E7%BE%8E%E6%A0%91%E5%BA%97%22%2C%22address%22%3A%22%E5%B9%BF%E4%B8%9C%E7%9C%81%E6%B7%B1%E5%9C%B3%E5%B8%82%E7%A6%8F%E7%94%B0%E5%8C%BA%E7%A6%8F%E8%8D%A3%E8%B7%AF%E4%B8%8A%E6%B2%99%E5%A1%98%E6%99%8F%E6%9D%91%E4%B9%9D%E5%B7%B713%E5%8F%B7%E6%A5%BC404%22%2C%22lng%22%3A%22114.04066%22%2C%22lat%22%3A%2222.52815%22%2C%22district%22%3A%22%E7%A6%8F%E7%94%B0%E5%8C%BA%22%2C%22suite%22%3A1%2C%22dizhi%22%3A%22%E5%B9%BF%E4%B8%9C%E7%9C%81%E6%B7%B1%E5%9C%B3%E5%B8%82%E7%A6%8F%E7%94%B0%E5%8C%BA%E7%A6%8F%E8%8D%A3%E8%B7%AF%E4%B8%8A%E6%B2%99%E5%A1%98%E6%99%8F%E6%9D%91%E4%B9%9D%E5%B7%B713%E5%8F%B7%E6%A5%BC404%22%7D; footBtn_indexstatu=4; hidelayer=1; user=%7B%22userId%22%3A1021980008%2C%22uDate%22%3A%2297945720200211%22%2C%22loginToken%22%3A%22155404e3a751f19b3cb0a3fa66e081fa%22%2C%22tel%22%3A%2218565721706%22%2C%22userid%22%3A1021980008%7D; cartNum=0; address=%7B%22addressCity%22%3A%22%E6%B7%B1%E5%9C%B3%E5%B8%82%22%2C%22addressCommunity%22%3A%2213%E5%8F%B7%E6%A5%BC404%22%2C%22addressCreatedAt%22%3A%22%22%2C%22addressCreatedBy%22%3A%22%22%2C%22addressDetail%22%3A%22%E6%B7%B1%E5%9C%B3%E5%B8%82%E7%A6%8F%E7%94%B0%E5%8C%BA%E5%B9%BF%E4%B8%9C%E7%9C%81%E6%B7%B1%E5%9C%B3%E5%B8%82%E7%A6%8F%E8%8D%A3%E8%B7%AF%E4%B8%8A%E6%B2%99%E5%A1%98%E6%99%8F%E6%9D%91%E4%B9%9D%E5%B7%B713%E5%8F%B7%E6%A5%BC404%22%2C%22addressId%22%3A15120092%2C%22addressStreet%22%3A%22%E5%B9%BF%E4%B8%9C%E7%9C%81%E6%B7%B1%E5%9C%B3%E5%B8%82%E7%A6%8F%E7%94%B0%E5%8C%BA%E7%A6%8F%E8%8D%A3%E8%B7%AF%E4%B8%8A%E6%B2%99%E5%A1%98%E6%99%8F%E6%9D%91%E4%B9%9D%E5%B7%B7%22%2C%22addressStreetId%22%3A%22%22%2C%22addressUser%22%3A%22%E6%9D%A8%E5%AE%87%22%2C%22addressUserTel%22%3A%2218565721706%22%2C%22areaName%22%3A%22%E7%A6%8F%E7%94%B0%E5%8C%BA%22%2C%22cityId%22%3A%22%22%2C%22cityName%22%3A%22%E6%B7%B1%E5%9C%B3%E5%B8%82%22%2C%22idCard%22%3A%22%22%2C%22idCardBackendUrl%22%3A%220%22%2C%22idCardFrontedUrl%22%3A%220%22%2C%22isDefault%22%3A0%2C%22lat%22%3A%2222.52815%22%2C%22lng%22%3A%22114.04066%22%2C%22offline%22%3Afalse%2C%22provinceName%22%3A%22%E5%B9%BF%E4%B8%9C%E7%9C%81%22%2C%22sex%22%3A1%2C%22shopId%22%3A%22201808%22%2C%22shopName%22%3A%22%E5%8F%AE%E5%BD%93%E6%99%BA%E6%85%A7%E8%8D%AF%E6%88%BF%EF%BC%88%E5%B9%BF%E4%B8%9C%EF%BC%89%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E6%B7%B1%E5%9C%B3%E7%A6%8F%E7%94%B0%E9%A6%99%E5%B1%B1%E7%BE%8E%E6%A0%91%E5%BA%97%22%2C%22tag%22%3A%22%E5%AE%B6%22%2C%22telList%22%3A%5B%7B%22createdAt%22%3A%222020-02-13%2015%3A16%3A17%22%2C%22doctorName%22%3A%22%E8%8D%AF%E5%B8%88%E5%92%A8%E8%AF%A2%22%2C%22id%22%3A0%2C%22pharmacyId%22%3A201808%2C%22tel%22%3A%2295028%22%7D%5D%2C%22type%22%3A1%2C%22userId%22%3A1021980008%2C%22suite%22%3A1%7D; payMent=o2o',
        Connection: 'keep-alive',
        'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
        Accept: '*/*',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0'
    },
};

const user = {
    loginToken: '155404e3a751f19b3cb0a3fa66e081fa',
    id: '1021980008',
    pos: {
        name: '%E6%B7%B1%E5%9C%B3%E5%B8%82',
        lat: 22.52815,
        lng: 114.04066
    },
    shop: {
        id : 201808
    },
    shopId: 201808
};

const api = {
    plat : 'H5',
    platform: 'H5',
};

module.exports = {
    resp,
    user,
    api
};