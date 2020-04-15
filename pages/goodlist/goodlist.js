// pages/goodlist/goodlist.js
import { getData } from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabData: [
            { id: 0, title: '综合', isActive: true },
            { id: 1, title: '销量', isActive: false },
            { id: 2, title: '价格', isActive: false }
        ],
        goodlist: [],
        total: 0,
        pageSzie: 0,
        pageNum: 1,
        optionId: 0
    },
    changeItem(e) {
        console.log(e.detail.id)
        const id = e.detail.id
            //修改源数组
        let { tabData } = this.data
        tabData.forEach((v, i) => i === id ? v.isActive = true : v.isActive = false)
        this.setData({
            tabData
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        this.setData({ optionId: options.cid })
        getData({
            url: `https://api-hmugo-web.itheima.net/api/public/v1/goods/search?cid=${this.data.optionId}`
        }).then((res) => {
            console.log(res.data.message)
            this.setData({
                goodlist: res.data.message.goods,
                total: res.data.message.total,
                pageSzie: res.data.message.goods.length,
                pageNum: res.data.message.pagenum
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
        this.setData({ goodlist: [] })
        getData({
            url: `https://api-hmugo-web.itheima.net/api/public/v1/goods/search?cid=${this.data.optionId}`
        }).then((res) => {
            console.log(res.data.message)
            this.setData({
                goodlist: res.data.message.goods,
                pageNum: 1
            })
            wx.showToast({
                title: '刷新成功',
                mask: true
            })
            wx.stopPullDownRefresh()
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        //获取data中的数据时，要this.data.xxx
        if (Math.ceil(this.data.total / this.data.pageSzie) > this.data.pageNum) {
            console.log('加载更多')
            wx.showToast({
                title: "加载更多",
                mask: true,
            })
            getData({
                url: `https://api-hmugo-web.itheima.net/api/public/v1/goods/search`,
                data: { cid: this.data.optionId }
            }).then((res) => {
                let goods = [...this.data.goodlist, ...res.data.message.goods]
                this.setData({
                    goodlist: goods,
                    pageNum: res.data.message.pageNum++
                })
                console.log(this.data.goodlist)
            })

        } else {
            wx.showToast({
                title: '没有更多数据了',
                icon: 'none',
                mask: true
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})