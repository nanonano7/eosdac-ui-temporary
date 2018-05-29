<template>
<q-page>
  <q-tabs class="tab-tranp" align="center" no-pane-border>
    <q-tab color="primary" default slot="title" name="tab-1">Active</q-tab>
    <q-tab color="primary" slot="title" name="tab-2">Inactive</q-tab>
    <q-tab-pane name="tab-1">
      <router-link to="/proposal" tag="div" cursor-pointer>
      <q-card class="q-mb-sm cursor-pointer">
        <q-card-title class="text-primary wrap pr-title">
          <span class="q-pr-sm q-display-1 float-left on-left brdr text-positive" detail icon="done">87%</span>
          <div class="q-headline">Title of proposal lmao lmao lmao and other important stuff</div>
          <span slot="subtitle"></span>
        </q-card-title>
        <q-card-main all-pointer-events cursor-pointer>
          Deploy a smart contract.

The setcode command accepts WASM text and converts this to binary before signing and broadcasting. For this, the Binaryen library is used. Because this is a large library it is not included in eosjs by default.

Add binaryen to your project:

npm i binaryen@37.0.0
Although the EOS back-end does seek to be up-to-date and have binaryen backwards compatibility, new versions of binaryen may be problematic.

Import and include the library when you configure Eos:
        </q-card-main>
          <q-card-actions>
            <q-chip small square color="white on-left" text-color="primary" detail icon="perm identity">
            by <b>account.name</b>
            </q-chip>
          <q-chip small square color="white on-left" text-color="primary" detail icon="comment">
          10 comments
          </q-chip>
          <q-chip small square color="white on-left" text-color="primary" detail icon="thumbs up down">
          245 votes
          </q-chip>
        </q-card-actions>
      </q-card>
      </router-link>
      <q-card class="q-mb-sm">
        <q-card-title class="text-primary wrap pr-title">
          <span class="q-pr-sm q-display-1 float-left on-left brdr text-warning" detail icon="done">60%</span>
          <div class="q-headline">Proposal numba 1 title test skdhfgksdh fkhsdkfh sdfhsdufhosd fhosdfho okshdfouahou ashodhsaodas</div>
          <span slot="subtitle"></span>
        </q-card-title>
        <q-card-main>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam sapien vitae diam malesuada maximus in in nunc. In pulvinar, magna sit amet rutrum interdum, augue nunc vestibulum sem, a semper enim nisi vitae turpis. Praesent aliquam volutpat.
        </q-card-main>
          <q-card-actions>
          <q-chip small square color="white on-left" text-color="primary" detail icon="comment">
          10 comments
          </q-chip>
          <q-chip small square color="white on-left" text-color="primary" detail icon="thumbs up down">
          245 votes
          </q-chip>
        </q-card-actions>
      </q-card>
      <q-card class="q-mb-sm">
        <q-card-title class="text-primary wrap pr-title">
          <span class="q-pr-sm q-display-1 float-left on-left brdr text-negative" detail icon="done">27%</span>
          <div class="q-headline">Proposal numba 1 title test skdhfgksdh fkhsdkfh sdfhsdufhosd fhosdfho okshdfouahou ashodhsaodas</div>
          <span slot="subtitle"></span>
        </q-card-title>
        <q-card-main>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam sapien vitae diam malesuada maximus in in nunc. In pulvinar, magna sit amet rutrum interdum, augue nunc vestibulum sem, a semper enim nisi vitae turpis. Praesent aliquam volutpat.
        </q-card-main>
          <q-card-actions>
          <q-chip small square color="white on-left" text-color="primary" detail icon="comment">
          10 comments
          </q-chip>
          <q-chip small square color="white on-left" text-color="primary" detail icon="thumbs up down">
          245 votes
          </q-chip>
        </q-card-actions>
      </q-card>
    </q-tab-pane>
    <q-tab-pane name="tab-2">Tab Two</q-tab-pane>
  </q-tabs>
</q-page>
</template>

<script>
import MarkdownIt from 'markdown-it'
import PercentageSlider from 'components/percentage-slider'
export default {
  components: {
    PercentageSlider
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
