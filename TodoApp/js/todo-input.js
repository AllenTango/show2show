class TodoInput extends HTMLElement {
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
        <input id="new-todo" type="text" placeholder="心里的声音，真的很有趣！" />
      </form>
      `;
    this._shadow.innerHTML = template;
    this.$form = this._shadow.querySelector('form');
    this.$input = this._shadow.querySelector('input');
    this.$form.addEventListener('submit', e => {
      e.preventDefault();
      if (this.$input.value) {
        this.dispatchEvent(new CustomEvent('onSubmit', {
          detail: this.$input.value
        }));
        this.$input.value = '';
      }
    });
  }
}

window.customElements.define('todo-input', TodoInput);