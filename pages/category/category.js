// pages/category/category.js
import { getData } from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        leftData: [],
        rightData: [],
        currentIndex: 0,
        top: 0,
        id: 0
    },
    // 接口返回值
    Cates: [],
    changelist(e) {
        console.log(e.currentTarget.dataset.index)
        const index = e.currentTarget.dataset.index
        var rightData = this.Cates[index].children
        this.setData({
            currentIndex: index,
            rightData,
            top: 0
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        getData({ url: "https://api-hmugo-web.itheima.net/api/public/v1/categories" }).then((res) => {
            console.log(res.data.message)
            this.Cates = res.data.message
            var leftData = this.Cates.map(v => v.cat_name)
                // console.log(leftData)
            var rightData = this.Cates[0].children
            this.setData({
                leftData,
                rightData
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