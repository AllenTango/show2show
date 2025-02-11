let startX, startY
class touch {

  constructor() {}

  _touchstart(e, items) {
    //开始触摸时 重置所有删除
    items.forEach(function (v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })

    startX = e.changedTouches[0].clientX
    startY = e.changedTouches[0].clientY

    return items
  }

  _touchmove(e, items) {
    let index = e.currentTarget.dataset.index;    //当前索引
    let touchMoveX = e.changedTouches[0].clientX;    //滑动变化坐标
    let touchMoveY = e.changedTouches[0].clientY;    //滑动变化坐标
      //获取滑动角度
      angle = this._angle({
        X: startX,
        Y: startY
      }, {
          X: touchMoveX,
          Y: touchMoveY
        });
    items.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    return items
  }

  _angle(start, end) {
    let _X = end.X - start.X
    let  _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  }
}

export default touch