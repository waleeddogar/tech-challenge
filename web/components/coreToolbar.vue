<template>
    <div>
        <v-navigation-drawer
                class="hidden-sm-and-up"
                clipped
                absolute
                fixed
                dark
                width="599"
                app
                v-model="leftDrawer">
            <v-list class="pt-0">
                <v-list-tile @click.stop="leftDrawer = !leftDrawer"
                             :to="this.$store.state.routes.home">
                    <v-list-tile-action>
                        <v-icon>show_chart</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Home</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile @click="logout()">
                    <v-list-tile-action>
                        <v-icon>clear</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Logout</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar
                clippedLeft
                clippedRight
                dense
                app
                fixed>
            <div class="nav-item-right hidden-sm-and-up" style="height: 100% !important;">
                <v-toolbar-side-icon dark @click.stop="leftDrawer = !leftDrawer"></v-toolbar-side-icon>
            </div>
            <v-toolbar-title class="hidden-xs-only headline pt-2" @click.stop="goHome">
                <img class="align-content-center" src="~/static/logo.svg" height="40px">
            </v-toolbar-title>

            <v-spacer class="hidden-sm-and-up"></v-spacer>

            <v-toolbar-title class="hidden-sm-and-up pt-2" @click.stop="goHome">
                <img src="~/static/logo.svg" height="40px">
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items class="hidden-xs-only">
                <v-btn flat
                       disabled
                       dark
                       class=" hidden-sm-and-down nav-item disabled-btn"
                       :to="this.$store.state.routes.home">
                    Home
                </v-btn>
                <v-menu bottom offset-y class="nav-item">
                    <v-btn flat dark slot="activator">
                        <v-icon class="mr-1" dark>person_outline</v-icon>
                        <span>{{ userName ? userName : 'Select User' }}</span>
                        <v-icon class="ml-1" dark>keyboard_arrow_down</v-icon>
                    </v-btn>
                    <v-list class="pa-0">
                        <v-list-tile @click="switchUser('test')">
                            <v-list-tile-title>Test</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="switchUser('waleed')">
                            <v-list-tile-title>Waleed</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-toolbar-items>
        </v-toolbar>
    </div>
</template>

<script>
  export default {
    components: {},
    data () {
      return {
        leftDrawer: false
      }
    },
    computed: {
      userName () {
        return this.$store.state.activeUser ? this.$store.state.activeUser.name.toUpperCase() : null
      }
    },
    methods: {
      goHome: function () {
        this.$router.replace({ path: this.$store.state.routes.home })
      },
      switchUser (userName) {
        this.$store.dispatch('setUser', userName)
      },
      logout: async function () {
        try {
          window.location.reload()
        } catch (e) {
          this.formError = e.message
        }
      }
    }
  }
</script>

<style scoped>
    .toolbar {
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        background: #16252B;
    }

    .toolbar__content {
        height: inherit;
    }

    .toolbar__items {
        margin-right: 0px !important;
    }

    .list__tile--active {
        border-left: 4px solid;
        border-color: gold;
    }

    .btn--active {
        background-color: transparent !important;
        color: #23CFEE !important;
    }

    .user-name.btn.btn--disabled {
        background-color: dimgray !important;
        color: white !important;
    }

    .disabled-btn.btn.btn--disabled {
        color: white !important;
    }

</style>
