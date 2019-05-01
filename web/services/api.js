export default {
  getAlbums: async (httpClient) => {
    return httpClient.get('/albums')
  },
  getPhotosForAlbum: async (httpClient, albumId) => {
    return httpClient.get(`/photos?albumId=${albumId}`)
  }
}
