// pages/car/car.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        shopcar: [],
        noneshopcar: false,
        totalNum: 0,
        totalPrice: 0,
        isAllslect: true,
        isSlected: true
    },
    paymoney() {
        let userInfo = wx.getStorageSync("userInfo")
        if (!userInfo) {
            wx.switchTab({
                url: '/pages/mine/mine'
            })
        }

    },
    addres() {
        // wx.chooseAddress({
        //     success(res) {
        //         console.log(res)
        //     }
        // })
        wx.chooseAddress()
    },
    selectList(e) {
        const id = e.currentTarget.dataset.id; // 获取data- 传进来的index
        let carts = this.data.shopcar; // 获取购物车列表
        let index = carts.findIndex(v => v.goods_id == id)
            // let selected = carts[index].isSlected; // 获取当前商品的选中状态
        let slect = []
        let isAllslect = true
        carts[index].isSlected = !carts[index].isSlected; // 改变状态//false
        this.setData({ shopcar: carts })
        wx.setStorageSync("cart", carts)
        if (carts.length <= 0) return isAllslect = false
        slect = carts.filter((item, index) => {
            console.log(item.isSlected)
            return item.isSlected == true

        })
        console.log(slect)
        isAllslect = slect.length > 0 ? isAllslect : false
        this.setData({ isAllslect })
        this.getTotalPrice(); // 重新获取总价
    },
    selectAll(e) {
        let selectAllStatus = this.data.isAllslect; // 是否全选状态
        selectAllStatus = !selectAllStatus;
        let carts = this.data.shopcar;

        for (let i = 0; i < carts.length; i++) {
            carts[i].isSlected = selectAllStatus; // 改变所有商品状态
            wx.setStorageSync("cart", carts)

            this.setData({ isSlected: carts[i].isSlected })
        }
        this.setData({
            isAllslect: selectAllStatus,
            shopcar: carts
        });
        this.getTotalPrice(); // 重新获取总价
    },
    getTotalPrice() {
        let carts = this.data.shopcar; // 获取购物车列表
        let total = 0;
        let num = 0;
        for (let i = 0; i < carts.length; i++) { // 循环列表得到每个数据
            if (carts[i].isSlected) { // 判断选中才会计算价格
                total += carts[i].num * carts[i].goods_price; // 所有价格加起来
                num += carts[i].num
            }
        }
        this.setData({ // 最后赋值到data中渲染到页面
            shopcar: carts,
            totalPrice: total.toFixed(2),
            totalNum: num
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        let goodslist = wx.getStorageSync("cart") || []
        console.log(goodslist)
        if (goodslist.length <= 0) {
            this.setData({ isAllslect: false })
            return
        }
        this.setData({
            shopcar: goodslist,
            noneshopcar: true,
            isAllslect: true
        })
        this.getTotalPrice()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})