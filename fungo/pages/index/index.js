const app = getApp();

Page({
  data: {
    list: [{
        name: '表单',
        flag: true,
        count: 1,
        index: 0
      },
      {
        name: '基础组件',
        flag: false,
        count: 3,
        index: 1
      },
      {
        name: '操作反馈',
        flag: false,
        count: 5,
        index: 2
      },
      {
        name: '导航相关',
        flag: true,
        count: 7,
        index: 3
      }
    ]
  },
  // 事件处理
  onLoad: function() {
    // 查看是否授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              // 已授权处理
              wx.login({
                success: res => {
                  //console.log(res.code);
                }
              });
            }
          })
        } else {
          wx.redirectTo({
            url: '../login/login',
          })
        }
      }
    })
  },
  upper(e) {
    console.log(e)
  },
  lower(e) {
    console.log(e)
  },
  scroll(e) {
    console.log(e)
  },
 
  mark: function(e) {
    let index = e.currentTarget.dataset.index
    let flag = `list[${index}].flag`
    // let count = `list[${index}].count`
    // if (flag) e.currentTarget.dataset.count++
    this.setData({
      [flag]: !e.currentTarget.dataset.flag
    })
  },
  del: function(e) {
    let that = this;
    wx.showModal({
      title: '提示！',
      content: '确认删除此任务么？',
      success: function(res) {
        if (res.confirm) {
          that.data.list.splice(e.currentTarget.dataset.index, 1)
          that.setData({
            list: that.data.list
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
});