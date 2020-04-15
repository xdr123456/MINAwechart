// pages/detail/detail.js
import { getData } from "../../utils/request";
Page({
    /**
     * 页面的初始数据
     */
    data: {
        detaillist: {}
    },
    urls: [],
    current: 0,
    //轮播图预览功能
    imagePreview(e) {
        console.log(e);
        this.current = e.currentTarget.dataset.index;
        this.urls = this.data.detaillist.pics.map(v => {
            return v.pics_big_url;
        });
        wx.previewImage({
            current: this.urls[this.current], // 当前显示图片的http链接
            urls: this.urls // 需要预览的图片http链接列表
        });
    },
    //加入购物车功能
    addCar(e) {
        let goods = this.data.detaillist;
        goods.isSlected = true;
        // console.log(e.currentTarget.dataset.id);
        let id = e.currentTarget.dataset.id;
        var shopcar = wx.getStorageSync("cart") || []; //获取缓存的car
        var index = "";

        if (shopcar.length > 0) {
            // //说明缓存中有购物数据
            var index = shopcar.findIndex(item => {
                return item.goods_id == id;
            });
            if (index != -1) {
                shopcar[index].num += 1;
            } else {
                goods.num = 1; //第一次点击加入购物车
                shopcar.push(goods);
            }
        } else {
            goods.num = 1; //第一次点击加入购物车
            shopcar.push(goods);
        }
        wx.setStorageSync("cart", shopcar); //存在与否，都设置storage
        wx.showToast({
            title: "加入购物车成功！",
            icon: "success",
            duration: 2000
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options);
        getData({
            url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/detail",
            data: { goods_id: options.goods_id }
        }).then(res => {
            var res = res.data.message;
            this.setData({
                detaillist: res
            });
            console.log(res);
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
});