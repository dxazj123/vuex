import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    // 所有的任务列表
    list: [],
    inputValue: '',
    nextId: 5,
    viewKey: 'all'
  },
  getters: {
    // 统计未完成的任务的条数
    unDoneLength (state) {
      return state.list.filter(x => x.done === false).length
    },
    infolist (state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'undone') {
        return state.list.filter(x => !x.done)
      }
      if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      }
    }
  },
  mutations: {
    initList (state, list) {
      state.list = list
    },
    // 为stroe中inputValue赋值
    setInputValue (state, val) {
      state.inputValue = val
    },
    addItem (state) {
      const object = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(object)
      state.nextId++
    },
    removeItem (state, id) {
      // 根据id查找对象项的索引
      const i = state.list.findIndex(x => x.id === id)
      // 根据所以，删除对应的元素
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    // 修改列表项的选中状态
    changeStatus (state, param) {
      const i = state.list.findIndex(x => x.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.stauts
      }
    },
    // 清除已完成的任务
    cleanDone (state) {
      state.list = state.list.filter(x => x.done === false)
    },
    changeViewKey (state, key) {
      state.viewKey = key
    }
  },
  actions: {
    getList (context) {
      axios.get('/list.json').then(({ data }) => {
        context.commit('initList', data)
      })
    }
  },
  modules: {
  }
})
