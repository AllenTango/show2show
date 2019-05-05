Page({
  data: {
    list: [{
        name: '表单',
        flag: true,
        count: 1,
        id: 0
      },
      {
        name: '点击展示详情页/编辑',
        flag: false,
        count: 3,
        id: 1
      },
      {
        name: '提示完成次数 👉 ',
        flag: false,
        count: 5,
        id: 2
      },
      {
        name: '向左 👈 滑动标记完成/未完成|删除',
        flag: true,
        count: 7,
        id: 3
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
 
  showDetail: function(event) {
    let taskId = event.currentTarget.dataset.taskId;
    console.log(taskId);
    wx.navigateTo({
      url: '../detail/detail?id=' + taskId,
    })
  },

  mark: function(e) {
    let index = e.currentTarget.dataset.index
    let flag = `list[${index}].flag`
    this.setData({
      [flag]: !e.currentTarget.dataset.flag
    })
  },

  del: function(e) {
    let that = this,
      index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示！',
      content: '确认删除此任务么？',
      success: function(res) {
        if (res.confirm) {
          that.data.list.splice(index, 1)
          that.setData({
            list: that.data.list
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    // this.data.list.splice(e.currentTarget.dataset.index, 1)
    // this.setData({
    //   list: this.data.list
    // })
  }
});