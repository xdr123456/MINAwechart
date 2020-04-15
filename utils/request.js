export function getData(params) {
    return new Promise((reslove, reject) => {
        wx.request({
            ...params,
            success: (res) => {
                reslove(res)
            },
            fail: (e) => {
                reject(e)
            }
        })
    })
}

