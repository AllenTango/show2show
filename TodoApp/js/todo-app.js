class TodoApp extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({
      mode: 'open'
    });
  }

  connectedCallback() {
    const template = `
      <style>
        h1 {
          font-size: 70px;
          text-align: center;
          color: deepskyblue;
        }
        ul {
          list-style: none;
          border-top: 5px solid #d9d9d9;
        }
        section {
          max-width: 800px;
          border-radius: 2px;
          margin: 0 auto;
          box-shadow: 0 0 5px rgba(0,0,0,.3);
        }
      </style>
      <h1>待办清单</h1>
      <section>
        <todo-input></todo-input>
        <ul id="todos"><slot></slot></ul>
      </section>
      `;
    this._todos = JSON.parse(localStorage.getItem('todos')) || [{
        text: "我需要做什么呢？",
        checked: true
      },
      {
        text: "可是我忘记了，",
        checked: false
      },
      {
        text: "算了吧！",
        checked: false
      }
    ];
    this._shadow.innerHTML = template;
    this.$todoList = this._shadow.querySelector('ul');
    this.$input = this._shadow.querySelector('todo-input');
    this.$input.addEventListener('onSubmit', this.addItem.bind(this));
    this._render();
  }

  removeItem(e) {
    this._todos.splice(e.detail, 1);
    localStorage.removeItem('todos');
    this._render();
  }

  toggleItem(e) {
    const item = this._todos[e.detail];
    this._todos[e.detail] = Object.assign({}, item, {
      checked: !item.checked
    });
    this._render();
  }

  addItem(e) {
    console.log(e);
    console.log(e.detail);
    this._todos.push({
      text: e.detail,
      checked: false
    });
    this._render();
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this._todos));
  }

  // 渲染数据
  _render() {
    this.$todoList.innerHTML = '';
    this._todos.forEach((todo, index) => {
      let $todoItem = document.createElement('todo-item');
      $todoItem.setAttribute('text', todo.text);
      if (todo.checked) {
        $todoItem.setAttribute('checked', '');
      }
      $todoItem.setAttribute('index', index);
      $todoItem.addEventListener('onRemove', this.removeItem.bind(this));
      $todoItem.addEventListener('onToggle', this.toggleItem.bind(this));
      this.$todoList.appendChild($todoItem);
      this.saveTodos();
    });
  }

  set todos(val) {
    this._todos = val;
    this._render()
  }

  get todos() {
    return this._todos;
  }
}


window.customElements.define('todo-app', TodoApp);