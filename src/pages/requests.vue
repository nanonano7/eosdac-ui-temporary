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
        <router-link v-for="(proposal, index) in activeReqs" :key="index" to="/proposal" tag="div" cursor-pointer>
        <q-card class="q-ma-sm cursor-pointer">
          <q-card-title class="text-primary wrap pr-title">
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
            <q-chip small square color="white on-left" text-color="primary" detail icon="assignment">
            Proposals: <b>0</b>
            </q-chip>
          </q-card-actions>
        </q-card>
        </router-link>
      </q-tab-pane>
      <q-tab-pane name="tab-2">
        <router-link v-for="(proposal, index) in inactiveReqs" :key="index" to="/proposal" tag="div" cursor-pointer>
        <q-card class="q-mb-sm cursor-pointer">
          <q-card-title class="text-primary wrap pr-title">
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
      activeReqs: null,
      inactiveReqs: null
    }
  },
  methods: {
    loadData () {
      let md = new MarkdownIt().set({ html: true }).use(MarkdownItSanitizer)
      this.$store.dispatch('api/getProposalsTEMP').then((proposals) => {
        let req = []
        let unreq = []
        for (let i = 0; i < proposals.length; i++) {
          proposals[i].desc = md.render(proposals[i].desc).replace(/<[^>]+>/g, '')
          if (proposals[i].type === 1) {
            if (new Date(proposals[i].expire) > new Date()) {
              req.push(proposals[i])
            } else {
              unreq.push(proposals[i])
            }
          }
        }
        this.activeReqs = req
        this.inactiveReqs = unreq
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
