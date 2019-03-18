const app = getApp();

Page({
  data: {
    list: [{
        id: 'form',
        name: '表单',
        flag: true,
        index: 0
      },
      {
        id: 'widget',
        name: '基础组件',
        flag: false,
        index: 1
      },
      {
        id: 'feedback',
        name: '操作反馈',
        flag: false,
        index: 2
      },
      {
        id: 'nav',
        name: '导航相关',
        flag: true,
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