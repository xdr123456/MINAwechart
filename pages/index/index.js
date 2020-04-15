import {getData}  from '../../utils/request.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [],
        Mune: [],
        floorData: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        getData({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata" }).then((res) => {
                console.log(res.data.message)
                this.setData({
                    imgUrls: res.data.message
                })
            }),
            getData({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems" }).then((res) => {
                console.log(res.data.message)
                this.setData({
                    Mune: res.data.message
                })
            })
        getData({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/floordata" }).then((res) => {
            console.log(res.data.message)
            this.setData({
                floorData: res.data.message
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

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