var shop_cart = [];

target_sku_ids = [50098805,32878052,50000148,50097674,50010791,50097373,50043277,32882981,50014705,50016254,50068073,50004209,50045390,50097678,50097677,50097580,50097573,50098274,50099014,50098275,50098519,50098520,50098521,50098515,50098516,50098517,50098518,50053585,50098278,50097676,50097675,50097975];

now_sku_ids = [50010791, 50098805, 50097674, 32878052];

function transfer_selected(selected) {
    return selected === 0 ? 'X' : '√';
}

function in_target(skuId) {
    return target_sku_ids.indexOf(skuId) !== -1;
}

function show_shop_cart() {
    if (shop_cart.length === 0) {
        console.log("购物车为空");
        return;
    }
    let item_desc = "%s\t%s(<=%s)\t%s\t%s\t%s";
    console.log(item_desc, "选中", "数量", "限制", "cartId", "id", "skuId", "goodsId", "是否为目标", "价格", "名称");
    for (let i = 0; i < shop_cart.length; i++) {
        item = shop_cart[i];
        // console.log(typeof(item) + ' -- ' + item)
        if (!item.sold_out) {
            console.log(item_desc,
                transfer_selected(item['selected']), item['quantityBuying'], item['quantityLimit'],
                item['cartId'], item['id'], item['skuId'], item['goodsId'], in_target(item['skuId']),
                item['productPrice'], item['name']);
        } else {
            console.log('\033[31m' + item_desc + '\033[0m',
                transfer_selected(item['selected']), item['quantityBuying'], item['quantityLimit'],
                item['cartId'], item['id'], item['skuId'], item['goodsId'], in_target(item['skuId']),
                item['productPrice'], item['name']);
        }
    }
}

module.exports = {
    show_shop_cart,
    shop_cart
};
