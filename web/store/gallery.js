import api from '../services/api'

export const state = () => ({
  albums: [],
  photos: [],
  activeAlbum: null
})

const SET_ALBUMS = 'SET_ALBUMS'
const SET_ACTIVE_ALBUM = 'SET_ACTIVE_ALBUM'
const SET_PHOTOS_FOR_ALBUM = 'SET_PHOTOS_FOR_ALBUM'

export const mutations = {
  [SET_ALBUMS]: (state, albums) => {
    state.albums = albums
  },
  [SET_ACTIVE_ALBUM]: (state, albumId) => {
    state.activeAlbum = albumId
  },
  [SET_PHOTOS_FOR_ALBUM]: (state, photos) => {
    if (photos) {
      state.photos = photos
    }
  }
}

export const actions = {
  async getAlbums ({ commit, store, router }) {
    try {
      let { data } = await api.getAlbums(this.$axios)
      commit(SET_ALBUMS, data)
    } catch (error) {
      commit(SET_ALBUMS, [])
    }
  },
  async setActiveAlbum ({ commit }, albumId) {
    commit(SET_ACTIVE_ALBUM, albumId)
  },
  async getPhotosForAlbum ({ commit, store, router }, albumId) {
    try {
      let { data } = await api.getPhotosForAlbum(this.$axios, albumId)
      commit(SET_PHOTOS_FOR_ALBUM, data)
    } catch (error) {
      commit(SET_PHOTOS_FOR_ALBUM, null)
    }
  }
}
