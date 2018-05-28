<template>
  <q-page padding>
    <div class="row">
      <div class="col-xs-12 col-md-4">
        <q-card class="q-ma-sm">
          <q-list dense separator no-border>
            <q-item>
              <q-item-side icon="account_circle" />
              <q-item-main label="nanonano7" />
            </q-item>
            <q-item>
              <q-item-side icon="comment" />
              <q-item-main label="17 Comments" />
            </q-item>
            <q-item>
              <q-item-side icon="event note" />
              <!--<q-item-main :label="Vote Start: {{ time | moment("YYYY/MM/DD") }} (~{{ time | moment("from") }})" />-->
              Vote Start: {{ time | moment("YYYY/MM/DD") }} (~{{ time | moment("from") }})
            </q-item>
            <q-item>
              <q-item-side icon="event note" />
              <!--<q-item-main :label="Vote End: {{ time | moment("YYYY/MM/DD") }} (~{{ time | moment("from") }})" />-->
            </q-item>
            <q-item>
              <q-item-side icon="comment" />
              <q-item-main label="17 Comments" />
            </q-item>
          </q-list>
        </q-card>

        <q-card class="q-ma-sm">
          <q-card-title>
            Supporting Links
          </q-card-title>
          <q-list dense separator no-border>
            <q-item>
              <q-item-side icon="link" />
              <q-item-main label="http://lol.lol" />
            </q-item>
          </q-list>
        </q-card>

        <q-card class="q-ma-sm">
          lol
        </q-card>
      </div>

      <div class="col-xs-12 col-sm-12 col-md-8">
    <q-card class="markdown-body q-ma-sm">
      <q-card-title>
    <h1 class="text-center proposal-title">Title of proposal lmao lmao lmao and other important stuff</h1>
    <span slot="subtitle"><q-icon name="account_circle" style="font-size: 14px"/> Author: nanonano7</span>
  </q-card-title>
    <div v-html="post"></div>
  </q-card>
</div>
</div>
  </q-page>
</template>

<script>
import MarkdownIt from 'markdown-it'
export default {
  components: {
  },
  data () {
    return {
      post: ''
    }
  },
  methods: {
    loadData () {
      let md = new MarkdownIt()
      this.$axios.get('https://raw.githubusercontent.com/EOSIO/eosjs/master/README.md').then((response) => {
        this.post = md.render(response.data)
      }).catch(() => {
      })
    }
  },
  created () {
    this.loadData()
  }
}
</script>

<style>
.proposal-seperator {
  margin-bottom:  45px;
}
.proposal-title {
  margin-top: 0px !Important;
}
.markdown-body {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        padding: 0px 45px 45px 45px;
    }

    @media (max-width: 767px) {
        .markdown-body {
            padding: 15px;
        }
    }
</style>
