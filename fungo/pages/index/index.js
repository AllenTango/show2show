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
  touchstart: function (e) {
    startX = e.touches[0].pageX; 
  },
  touchmove: function(e) {
    let index = e.currentTarget.dataset.index
    endX = e.touches[0].pageX
    this.data.list.forEach(function(v, i) {
      v.isTouchMove = false
      if (i === index) {
        if (startX > endX) {
          v.isTouchMove = true
        } else {
          v.isTouchMove = false
        }
      }
    })
    this.setData({
      list: this.data.list
    })
    console.log(e)
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