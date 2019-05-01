import VuexPersist from 'vuex-persist'

export const strict = false

const vuexLocalStorage = process.browser ? new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
  modules: ['gallery']
}) : null

export const plugins = process.browser ? [vuexLocalStorage.plugin] : []

export const state = () => ({
  users: [
    {
      id: '1',
      name: 'Test'
    },
    {
      id: '2',
      name: 'Waleed'
    }
  ],
  activeUser: null,
  routes: {
    home: '/',
    album: '/album'
  },
  windowSize: {
    height: 0,
    width: 0
  },
  heights: {
    toolbarHeight: 48,
    dividersTotalHeight: 3
  }
})

const SET_USER = 'SET_USER'
const UPDATE_WINDOW_SIZE = 'UPDATE_WINDOW_SIZE'

export const mutations = {
  [SET_USER]: (state, userName) => {
    state.activeUser = state.users.filter(user => user.name.toLowerCase() === userName.toLowerCase())[0]
  },
  [UPDATE_WINDOW_SIZE]: (state, windowSize) => {
    state.windowSize = windowSize
  }
}

export const actions = {
  async setUser ({ commit, store, router }, userName) {
    commit(SET_USER, userName)
  },
  async updateWindowSize ({ commit }, windowSize) {
    commit(UPDATE_WINDOW_SIZE, windowSize)
  }
}
