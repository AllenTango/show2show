const app = getApp();
let startX, endX;

Page({
  data: {
    list: [{
        id: 'form',
        name: '表单',
        flag: true,
        isTouchMove: false
      },
      {
        id: 'widget',
        name: '基础组件',
        flag: false,
        isTouchMove: false
      },
      {
        id: 'feedback',
        name: '操作反馈',
        flag: false,
        isTouchMove: false
      },
      {
        id: 'nav',
        name: '导航相关',
        flag: true,
        isTouchMove: false
      }
    ]
  },
  // 事件处理
  onLoad: function () {
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
  del: function(e) {
    wx.showModal({
      title: '提示！',
      content: '确认删除此任务么？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          let listItem = this.data.list[e.currentTarget.dataset.index]
          this.data.list.splice(e.currentTarget.dataset.index, 1)
          this.setData({
            list: this.data.list
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
});