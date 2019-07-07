// 注册moment对象
Vue.filter('date', time => moment(time).format('LL'))
// 新建一个 Vue 实例
new Vue({
  // 将Vue实例挂在到元素上
  name: 'Markdown 笔记本',
  el: '#notebook',

  // 数据
  data() {
    return {
      notes: JSON.parse(localStorage.getItem('notes')) || [], // 空数组用以保存笔记列表
      selectedId: localStorage.getItem('selected-id') || null,
    }
  },

  // 计算属性
  computed: {
    selectedNote() {
      // textarea节点双向绑定数据时，找不到selectedNote.content 会报错，需外加空值解决
      // 解决方法：https://segmentfault.com/q/1010000017923704
      return this.notes.find(note => note.id === this.selectedId) || '';
    },
    notePreview() {
      // 将Markdown渲染为HTML
      return this.selectedNote ? marked(this.selectedNote.content) : '';
    },
    // 排序操作 时间 加星
    sortedNotes() {
      // 使用slice数组方法创建副本，防止触发notes侦听器
      return this.notes.slice()
        .sort((a, b) => b.created - a.created)
        .sort((a, b) => (a.favorite === b.favorite) ? 0 : a.favorite ? -1 : 1)
    },
    linesCount() {
      if (this.selectedNote) {
        return this.selectedNote.content.split(/\r\n|\r|\n/).length
      }
    },
    wordsCount() {
      // 正则表达式 替换 换行符
      if (this.selectedNote) {
        let str = this.selectedNote.content;
        str = str.replace(/\n/g, ' ');
        str = str.replace(/(^\s*)|(\s*$)/gi, '');
        str = str.replace(/\s\s+/gi, ' ');
        return str.split(' ').length
      }
    },
    charactersCount() {
      if (this.selectedNote) {
        return this.selectedNote.content.split('').length
      }
    }
  },

  // 逻辑写在可复用的函数methods里
  methods: {
    addNote() {
      const time = Date.now()
      // 新建笔记的默认值
      const note = {
        id: String(time),
        title: `新建笔记 ${this.notes.length + 1}`,
        content: "这是基于 Marked 的[Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)笔记本",
        created: time,
        favorite: false,
      }
      this.notes.push(note)
      this.selectNote(note)
    },
    selectNote(note) {
      this.selectedId = note.id
    },
    favoriteNote() {
      this.selectedNote.favorite ^= true
    },
    removeNote() {
      // && confirm('删除这条笔记') 条件删除
      if (this.selectedNote) {
        const index = this.notes.indexOf(this.selectedNote)
        if (index !== -1) {
          this.notes.splice(index, 1)
        }
      }
    },
    saveNotes() {
      // 代替 watch 中的自写content方法 侦听数据变化
      localStorage.setItem('notes', JSON.stringify(this.notes))
    },
  },

  // 侦听改变
  watch: {
    // 保存Notes数据变化
    notes: {
      handler: 'saveNotes',
      deep: true,
    },
    // 保存选中项
    selectedId(val) {
      localStorage.setItem('selected-id', val)
    }
  },
})