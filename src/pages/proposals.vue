<template>
<q-page>
  <q-tabs inverted no-pane-border>
    <q-tab default slot="title" name="tab-1">Active</q-tab>
    <q-tab slot="title" name="tab-2">Inactive</q-tab>
    <q-tab-pane name="tab-1">
      <div class="row">
        <div class="col-xs-12 col-md-6 col-lg-6 col-xl-2">
          <q-field icon="sort" label="Sort:">
            <q-select v-model="sortBy" :options="[
        {
        label: 'Votes',
        value: 'Votes'
        },
        {
        label: 'Alphabetical',
        value: 'Alphabetical'
        }
        ]" />
          </q-field>
        </div>
      </div>
      <router-link v-for="(proposal, index) in activeProps" :key="index" :to="'/proposal/' + proposal.id" tag="div" cursor-pointer>
      <q-card class="q-ma-sm cursor-pointer">
        <q-card-title class="text-primary wrap pr-title">
          <span class="q-pr-sm q-display-1 float-left on-left brdr text-positive" detail icon="done">87%</span>
          <div class="q-headline">{{proposal.title}}</div>
          <span slot="subtitle"></span>
        </q-card-title>
        <q-card-main>
          {{proposal.desc}}
        </q-card-main>
          <q-card-actions>
            <q-chip small square color="white on-left" text-color="primary" detail icon="perm identity">
            by <b>{{proposal.worker}}</b>
            </q-chip>
          <q-chip small square color="white on-left" text-color="primary" detail>
          payment amount <b>{{proposal.payment_amount}}</b> eosDAC
          </q-chip>
        </q-card-actions>
      </q-card>
      </router-link>
    </q-tab-pane>
    <q-tab-pane name="tab-2">
      <div class="row">
        <div class="col-xs-12 col-md-6 col-lg-6 col-xl-2">
          <q-field icon="sort" label="Sort:">
            <q-select v-model="sortBy" :options="[
        {
        label: 'Votes',
        value: 'Votes'
        },
        {
        label: 'Alphabetical',
        value: 'Alphabetical'
        }
        ]" />
          </q-field>
        </div>
      </div>
      <router-link v-for="(proposal, index) in inactiveProps" :key="index" to="/proposal" tag="div" cursor-pointer>
      <q-card class="q-ma-sm cursor-pointer">
        <q-card-title class="text-primary wrap pr-title">
          <span class="q-pr-sm q-display-1 float-left on-left brdr text-positive" detail icon="done">87%</span>
          <div class="q-headline">{{proposal.title}}</div>
          <span slot="subtitle"></span>
        </q-card-title>
        <q-card-main>
          {{proposal.desc}}
        </q-card-main>
          <q-card-actions>
            <q-chip small square color="white on-left" text-color="primary" detail icon="perm identity">
            by <b>{{proposal.worker}}</b>
            </q-chip>
            <q-chip small square color="white on-left" text-color="primary" detail>
            payment amount <b>{{proposal.payment_amount}}</b> eosDAC
            </q-chip>
        </q-card-actions>
      </q-card>
      </router-link>
    </q-tab-pane>
  </q-tabs>
</q-page>
</template>

<script>
import MarkdownIt from 'markdown-it'
import MarkdownItSanitizer from 'markdown-it-sanitizer'
export default {
  components: {
  },
  data () {
    return {
      sortBy: 'Votes',
      time: 1526699933,
      post: '',
      activeProps: null,
      inactiveProps: null
    }
  },
  methods: {
    loadData () {
      let md = new MarkdownIt().set({ html: true }).use(MarkdownItSanitizer)
      this.$store.dispatch('api/getProposalsTEMP').then((proposals) => {
        let prop = []
        let unprop = []
        for (let i = 0; i < proposals.length; i++) {
          proposals[i].desc = md.render(proposals[i].desc).replace(/<[^>]+>/g, '')
          if (proposals[i].type === 0) {
            if (new Date(proposals[i].expire) > new Date()) {
              prop.push(proposals[i])
            } else {
              unprop.push(proposals[i])
            }
          }
        }
        this.activeProps = prop
        this.inactiveProps = unprop
      })
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style>
.q-tab .active

.pr-title {
  word-wrap: break-word;
  padding-bottom: 0px;
}

.brdr {
  border-right:1px solid grey;
}
</style>
