<template>
<q-page>
  <q-tabs class="tab-tranp" align="center" no-pane-border>
    <q-tab color="primary" default slot="title" name="tab-1">Active</q-tab>
    <q-tab color="primary" slot="title" name="tab-2">Inactive</q-tab>
    <q-tab-pane name="tab-1">
      <router-link to="/proposal" tag="div" cursor-pointer>
      <q-card class="q-mb-sm cursor-pointer">
        <q-card-title class="text-primary wrap pr-title">
          <div class="q-headline">Mow my lawn pls ok</div>
          <span slot="subtitle"></span>
        </q-card-title>
        <q-card-main all-pointer-events cursor-pointer>
          pls
        </q-card-main>
          <q-card-actions>
            <q-chip small square color="white on-left" text-color="primary" detail icon="perm identity">
            by <b>account.name</b>
            </q-chip>
          <q-chip small square color="white on-left" text-color="primary" detail icon="comment">
          10 comments
          </q-chip>
        </q-card-actions>
      </q-card>
      </router-link>
      <router-link to="/proposal" tag="div" cursor-pointer>
      <q-card class="q-mb-sm cursor-pointer">
        <q-card-title class="text-primary wrap pr-title">
          <div class="q-headline">Mow my lawn pls ok</div>
          <span slot="subtitle"></span>
        </q-card-title>
        <q-card-main all-pointer-events cursor-pointer>
          pls
        </q-card-main>
          <q-card-actions>
            <q-chip small square color="white on-left" text-color="primary" detail icon="perm identity">
            by <b>account.name</b>
            </q-chip>
          <q-chip small square color="white on-left" text-color="primary" detail icon="comment">
          10 comments
          </q-chip>
        </q-card-actions>
      </q-card>
      </router-link>
      <router-link to="/proposal" tag="div" cursor-pointer>
      <q-card class="q-mb-sm cursor-pointer">
        <q-card-title class="text-primary wrap pr-title">
          <div class="q-headline">Mow my lawn pls ok</div>
          <span slot="subtitle"></span>
        </q-card-title>
        <q-card-main all-pointer-events cursor-pointer>
          pls
        </q-card-main>
          <q-card-actions>
            <q-chip small square color="white on-left" text-color="primary" detail icon="perm identity">
            by <b>account.name</b>
            </q-chip>
          <q-chip small square color="white on-left" text-color="primary" detail icon="comment">
          10 comments
          </q-chip>
        </q-card-actions>
      </q-card>
      </router-link>
    </q-tab-pane>
    <q-tab-pane name="tab-2">Tab Two</q-tab-pane>
  </q-tabs>
</q-page>
</template>

<script>
import MarkdownIt from 'markdown-it'
export default {
  components: {
  },
  data () {
    return {
      time: 1526699933,
      post: ''
    }
  },
  methods: {
    showDate () {
      let ts = Math.round((new Date()).getTime() / 1000)
      return ts
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
.pr-title {
  word-wrap: break-word;
  padding-bottom: 0px;
}

.nopadtop {
  padding-top: 0px;
}

.brdr {
  border-right:1px solid grey;
}
</style>
