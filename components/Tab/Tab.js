// components/Tab/Tab.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tabData: { // 属性名
            type: Array,
            value: []
        },
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        changeTab(e) {
            console.log(e)
            const id = e.currentTarget.dataset.id
                //触发事件
            this.triggerEvent("changeContent", { id })
        }
    }
})