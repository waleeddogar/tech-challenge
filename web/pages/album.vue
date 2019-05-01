<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center column>
            <v-dialog v-model="photoModal"
                      v-if="photoData"
                      transition="dialog-bottom-transition"
                      persistent
                      scrollable
                      max-width="600px">
                <v-card raised style="background-color: #e6e6e6 !important;">
                    <v-card-title class="headline pt-1 pb-1 pl-3 pr-0"
                                  style="background-color: #16252B !important; color: #ffffff;">
                        <v-spacer></v-spacer>
                        <div class="headline">{{ photoData.title.toUpperCase() }}</div>
                        <v-spacer></v-spacer>
                    </v-card-title>
                    <v-card-text class="pa-0" style="max-height: 600px !important;">
                        <img style="height: 100% !important; !important; width: auto" :src="photoData.url"/>
                    </v-card-text>
                    <v-card-actions class="pa-0">
                        <v-btn dark block class="ma-0" color="error" @click.native="photoModal = false">
                            Close Photo
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-card class="pa-0" width="100%" style="background-color: rgba(0,0,0,0.53)" v-if="activeAlbumData">
                <v-card-title class="headline pa-2 text-xs-center"
                              style="background-color: #16252B !important; color: #ffffff;">
                    <v-spacer></v-spacer>
                    {{ activeAlbumData.title.toUpperCase() }}
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text class="text-xs-center subheading">
                    <v-container fluid grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md4 v-for="photo in photosData" :key="photo.id">
                                <v-card>
                                    <v-card-title style="background-color: #16252B !important; color: #ffffff;">
                                        <v-spacer></v-spacer>
                                        {{ photo.title.toUpperCase() }}
                                        <v-spacer></v-spacer>
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text>
                                        <img :src="photo.thumbnailUrl">
                                    </v-card-text>
                                    <v-card-actions class="pa-0">
                                        <v-btn block class="ma-0"
                                               style="background-color: #16252B !important; color: #ffffff;"
                                               @click="openPhoto(photo)">
                                            View Photo
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    components: {},
    data () {
      return {
        photoModal: false,
        photoData: null
      }
    },
    mounted () {
      if (this.albumsData.length === 0) {
        this.getAlbums()
      }
      if (!this.activeAlbum) {
        this.$router.replace({ path: this.$store.state.routes.home })
      } else {
        this.getPhotosForAlbum()
      }
    },
    computed: {
      activeAlbum () {
        return this.$store.state.gallery.activeAlbum
      },
      activeAlbumData () {
        return this.$store.state.gallery.albums.filter(album => album.id === this.activeAlbum)[0]
      },
      albumsData: function () {
        return this.$store.state.gallery.albums
      },
      photosData: function () {
        return this.$store.state.gallery.photos
      }
    },
    methods: {
      getAlbums: async function () {
        await this.$store.dispatch('gallery/getAlbums')
      },
      getPhotosForAlbum: async function () {
        await this.$store.dispatch('gallery/getPhotosForAlbum', this.activeAlbum)
      },
      async openPhoto (photo) {
        this.photoData = photo
        this.photoModal = true
      }
    }
  }
</script>

<style>
</style>
