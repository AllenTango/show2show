# 自定义元素的生命周期

```js
// 需要ES6支持
// 首先定义一个类

class MyElement extends HTMLElement {
  // 构造函数 设置初始状态
  constructor() {
    super();    // 第一步首先是要调用super()函数O_O
    console.log('constructed!');
  }
  // 挂载到DOM时，获取数据或设置默认属性
  connectedCallback() {
    console.log('connected!');
  }
  // 从DOM移除组件时，删除事件侦听等
  disconnectedCallback() {
    console.log('disconnected!');
  }
  // 观察元素的观察属性变化
  // 也可以通过实现静态observeAttributes getter 来观察属性
  // static get observeAttributes() {
  //   return ['my-attr'];   
  // }
  attributeChangeCallback(name, oldVal, newVal) {
    console.log(`Attibute: ${name} changed!`);
  }
  // 将自定义元素移动到新文档时触发
  adoptedCallback() {
    console.log('adopted!');
  }
}
// 将自定义元素注册到CustomElementRegistry
window.customElements.define('my-element', MyElement);
```

## 利用自定义元素实现待办清单


需要构建的内容：
- `<todo-app>` 元素：
  - 包含待办清单的所有事项
  - 添加待办事项的方法add()
  - 删除待办事项的方法remove()
  - 切换状态待办事项的方法toggle()
- `todo-item` 元素：
  - 包含详情
  - 包含索引属性
  - 包含状态属性
- `todo-input` 元素应该有


```html
<template id="TodoList">
  <h1>Todos</h1>
  <section>
    <solt name="todoInput">
      <input type="text" name="" placeholder="要写什么呢？">
    </solt>
    <ul>
      <slot name="todoItem">
        <li>
          <input type="checkbox" name="" value="">
          <label for="">我要实现的内容</label>
          <button type="button" name="button">删除</button>
        </li>
      </slot>
    </ul>
  </section>
</template>
```

# [主要参考文档🌟 Web Components: from zero to hero](https://dev.to/thepassle/web-components-from-zero-to-hero-4n4m)
# [淘宝 Web Components 最佳实践](http://taobaofed.org/blog/2018/10/31/a-tag/)
# [如何使用本地存储-js](https://www.taniarascia.com/how-to-use-local-storage-with-javascript/)
# [Object.assign() 方法使用](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
# [Event接口的preventDefault()方法](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault)
# [自定义事件](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Creating_and_triggering_events)
