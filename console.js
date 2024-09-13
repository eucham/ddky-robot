const readline = require('readline');
const resp = require('./resp');
const shop = require('./shop_cart');

function usage() {
    console.log('-------------用法-------------');
    console.log('i : 显示购物车详情');
    console.log('u : 从服务器更新购物车商品状态。主要用来看是否有货');
    console.log('s : 勾选/不勾选商品。这个操作没啥用，下单不看这个');
    console.log('b : 抢购商品。看这个就行，输入在购物车中的序号, 如 b 1。所以前提是要加入到购物车中。');
    console.log('h : 输出此帮助');
    console.log('a : 加入到购物车。后面跟skuId');
    console.log('q : 退出');
    console.log('-------------用法-------------');
}

usage();
resp.get_shop_cart_info();

var rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('');
rl.prompt();

rl.on('line', function (line) {
    switch (line.trim().charAt(0)) {
        case 'q':
            rl.close();
            break;
        case 'i':
            shop.show_shop_cart();
            break;
        case 'u':
            resp.get_shop_cart_info();
            break;
        case 's':
            resp.select_cart_item(line.trim().split(' ').slice(1), shop.shop_cart);
            break;
        case 'b':
            resp.buy_items(line.trim().split(' ').slice(1));
            break;
        case 'a':
            resp.add_to_cart(line.trim().split(' ').slice(1), 1);
            break;
        case 'h':
            usage();
            break;
        default:
            console.log('输入有误');
            usage();
            break;
    }
    rl.prompt();
});

rl.on('close', function () {
    console.log('bye');
    process.exit(0);
});

