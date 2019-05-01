<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center column>
            <v-card class="pa-0" width="100%">
                <div v-if="userName" class="headline pa-2 text-xs-center"
                     style="background-color: #16252B !important; color: #ffffff;">
                    Welcome {{ userName }}
                </div>
                <div v-else class="headline pa-2 text-xs-center"
                     style="background-color: #16252B !important; color: #ffffff;">
                    Select User
                </div>
                <v-card-text v-if="userName" class="text-xs-center subheading">
                    <v-container fluid grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md4 v-for="album in albumsData" :key="album.id">
                                <v-card style="background-color: rgba(0,0,0,0.53)">
                                    <v-card-title class="pa-1"
                                                  style="background-color: #16252B !important; color: #ffffff;">
                                        <v-spacer></v-spacer>
                                        {{ album.title.toUpperCase() }}
                                        <v-spacer></v-spacer>
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text class="pa-2">
                                        <v-layout>
                                            <v-flex class="text-xs-left">
                                                <span>Album Id:</span>
                                            </v-flex>
                                            <v-flex class="text-xs-right">
                                                {{ album.id }}
                                            </v-flex>
                                        </v-layout>
                                        <v-divider></v-divider>
                                        <v-layout>
                                            <v-flex class="text-xs-left">
                                                User Id:
                                            </v-flex>
                                            <v-flex class="text-xs-right">
                                                {{ album.userId }}
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                    <v-divider></v-divider>
                                    <v-card-actions class="pa-0">
                                        <v-btn block small class="ma-0"
                                               style="background-color: #16252B !important; color: #ffffff;"
                                               @click="openAlbum(album.id)">
                                            View Album
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions v-else>
                    <v-btn v-for="user in appUsers"
                           :key="user.id" block
                           style="background-color: #16252B !important; color: #ffffff;"
                           @click="switchUser(user.name)">
                        <v-icon left dark>account_circle</v-icon>
                        {{user.name}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    components: {},
    data () {
      return {}
    },
    mounted () {
      if (this.albumsData.length === 0) {
        this.getAlbums()
      }
    },
    computed: {
      appUsers () {
        return this.$store.state.users
      },
      userName () {
        return this.$store.state.activeUser ? this.$store.state.activeUser.name.toUpperCase() : null
      },
      albumsData: function () {
        return this.$store.state.gallery.albums
      }
    },
    methods: {
      switchUser (userName) {
        this.$store.dispatch('setUser', userName)
      },
      getAlbums: async function () {
        await this.$store.dispatch('gallery/getAlbums')
      },
      openAlbum: async function (albumId) {
        await this.$store.dispatch('gallery/setActiveAlbum', albumId)
        this.$router.replace({ path: this.$store.state.routes.album })
      }
    }
  }
</script>

<style>
    .error {
        color: red;
    }
</style>
