<template>
    <v-app dark style="background-color: #626262">
        <core-toolbar></core-toolbar>
        <v-content class="pl-0 pr-0 pb-0 ma-0">
            <v-container xs12 fluid fill-height class="pa-0" v-resize="onResize">
                <nuxt/>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
  import coreToolbar from '~/components/coreToolbar'

  export default {
    components: {
      coreToolbar
    },
    data () {
      return {}
    },
    mounted () {
      this.onResize()
    },
    computed: {},
    methods: {
      async onResize () {
        let windowSize = {
          height: window.innerHeight,
          width: window.innerWidth
        }
        await this.$store.dispatch('updateWindowSize', windowSize)
      }
    }
  }
</script>

<style>
    .headline {
        font-size: 18px !important;
        font-weight: 400 !important;
    }

    .nav-item {
        border-left: solid 1px rgba(255, 255, 255, .12);
    }

    .nav-item-right {
        border-right: 1px solid darkslategray;
    }

    @media only screen and (max-width: 599px) {
        .toolbar .toolbar__content > *:not(.btn):not(.menu):first-child:not(:only-child), .toolbar .toolbar__extension > *:not(.btn):not(.menu):first-child:not(:only-child) {
            margin-left: 0 !important;
        }
    }

    .tab-item {
        border-left: 1px solid #16252B;
    }

    .navigation-drawer {
        padding: 0;
    }


</style>

