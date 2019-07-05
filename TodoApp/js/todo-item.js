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