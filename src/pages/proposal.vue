<template>
  <q-page padding>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-5">
        <q-card class="q-ma-sm">
          <q-list separator>
        <q-item link>
          <q-item-main label="Worker" />
          <q-item-side right>
            account.name
          </q-item-side>
        </q-item>
        <q-item>
          <q-item-main label="Start" />
          <q-item-side right>
            <p>{{showDate() | moment('YYYY-MM-DD hh:mm:ss A')}}</p>
          <p>(~{{ showDate() | moment('from', 'now')}})</p>
          </q-item-side>
        </q-item>
        <q-item>
          <q-item-main label="Expire" />
          <q-item-side right>
            <p>{{showDate() | moment('YYYY-MM-DD hh:mm:ss A')}}</p>
          <p>(~{{ showDate() | moment('from', 'now')}})</p>
          </q-item-side>
        </q-item>
        <q-item>
          <q-item-main label="Due date" />
          <q-item-side right>
            <p>{{showDate() | moment('YYYY-MM-DD hh:mm:ss A')}}</p>
          <p>(~{{ showDate() | moment('from', 'now')}})</p>
          </q-item-side>
        </q-item>
        <q-item link>
          <q-item-main label="Arbitrator" />
          <q-item-side right>
            account.name
          </q-item-side>
        </q-item>
        <q-item>
          <q-item-main label="Payment amount" />
          <q-item-side right>
            3265.00154258 eosDAC
          </q-item-side>
        </q-item>
      </q-list>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-7">
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
    showDate () {
      let ts = Math.round((new Date()).getTime() / 1000)
      return ts + 3000000
    },
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
