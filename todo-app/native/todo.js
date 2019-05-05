window.customElements.define('todo-app',
  class extends HTMLElement {
    constructor() {
      super();
      let template = document.createElement('template');
      template.innerHTML = `
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
      this._todos = JSON.parse(localStorage.getItem('todos')) || [
        {
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
      this._shadow = this.attachShadow({
        mode: 'open'
      });
      this._shadow.appendChild(template.content.cloneNode(true));
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
  });

window.customElements.define('todo-input',
  class extends HTMLElement {
    constructor() {
      super();
      this._shadow = this.attachShadow({
        mode: 'open'
      });
    }

    connectedCallback() {
      const template = `
        <style>
          #new-todo {
            color: deepskyblue;
            width: 100%;
            line-height: 1.5em;
            box-sizing: border-box;
            padding: 5px;
            font-size: 24px;
          }
          #new-todo::placeholder {
            color: #00bfff91;
          }
        </style>
        <form id="new-todo-form">
          <input id="new-todo" type="text" placeholder="心里的声音，很真有趣！" />
        </form>
      `;
      this._shadow.innerHTML = template;
      this.$form = this._shadow.querySelector('form');
      this.$input = this._shadow.querySelector('input');
      this.$form.addEventListener('submit', e => {
        e.preventDefault();
        this.dispatchEvent(new CustomEvent('onSubmit', {
          detail: this.$input.value
        }));
        this.$input.value = '';
      });
    }
  }
);

class TodoItem extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({
      mode: 'open'
    });
  }

  connectedCallback() {
    this.setAttribute('role', 'option')
    const template = `
      <style>
        li {
          color: deepskyblue;
          font-size: 24px;
          display: block;
          height: 35px;
          line-height: 40px;
          position: relative;
          border-bottom: 1px solid #d9d9d9;
        }
        input[type="checkbox"] {
          position: absolute;
          box-sizing: border-box;
          left: -40px;
          top: 5px;
          height: 30px;
          width: 30px;
        }
        input:checked + label {
          color: #d9d9d9;
          text-decoration: line-through;
        }
        .del {
          position: absolute;
          right: 0;
          width: 60px;
          height: 100%;
          background-color: red;
          color: white;
          display: inline-block;
          border: none;
        }
      </style>
      <li class="item">
        <input type="checkbox">
        <label>
          <slot></slot>
        </label>
        <button class="del">删除</button>
      </li>
    `;
    this._shadow.innerHTML = template;
    this.$item = this._shadow.querySelector('.item');
    this.$removeBtn = this._shadow.querySelector('button');
    this.$text = this._shadow.querySelector('label');
    this.$checkbox = this._shadow.querySelector('input');

    this.$removeBtn.addEventListener('click', (e) => {
      this.dispatchEvent(new CustomEvent('onRemove', {
        detail: this.index
      }));
    });
    this.$checkbox.addEventListener('click', (e) => {
      this.dispatchEvent(new CustomEvent('onToggle', {
        detail: this.index
      }));
    });
    if (!this.hasAttribute('text')) {
      this.setAttribute('text', 'placeholder');
    }
    this._render();
  }

  static get observedAttributes() {
    return ['text', 'checked', 'index'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case 'text':
        this._text = newVal;
        break;
      case 'checked':
        this._checked = this.hasAttribute('checked');
        break;
      case 'index':
        this._index = parseInt(newVal);
        break;
    }
  }

  _render() {
    if (this.hasAttribute('checked')) {
      this.$checkbox.setAttribute('checked', '');
    } else {
      this.$checkbox.removeAttribute('checked');
    }
    this.$text.innerHTML = this._text;
  }

  set index(val) {
    this.setAttribute('index', val);
  }

  get index() {
    return this._index;
  }

  set checked(val) {
    if (val) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }

  get checked() {
    return this.hasAttribute('checked');
  }
}

window.customElements.define('todo-item', TodoItem);
