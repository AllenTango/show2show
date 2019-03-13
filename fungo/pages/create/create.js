Page({
  data: {
    time: "12:01"
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  }
});