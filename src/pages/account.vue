<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-md-12 col-lg-12 col-xl-4">
        <q-card class="q-ma-sm">
          <q-card-main>
            <q-list no-border>
              <q-item>
            <q-item-side>
              <q-item-tile avatar>
                <img :src="'assets/' + account.image">
              </q-item-tile>
            </q-item-side>
            <q-item-main class="q-title" :label="account.name" />
          </q-item>
              <q-item multiline>
                <q-item-main label="Bio" :sublabel="account.bio"/>
              </q-item>
              <q-item>
                <q-item-main label="Custodian" />
                <q-item-side right v-if="account.custodian">
                  YES
                </q-item-side>
                <q-item-side right v-else>
                  NO
                </q-item-side>
              </q-item>
              <q-item>
                <q-item-main label="Votes" />
                <q-item-side right>
                  {{account.total_votes}}
                </q-item-side>
              </q-item>
              <q-item>
                <q-item-main label="Locked tokens" />
                <q-item-side right>
                  {{account.locked}}
                </q-item-side>
              </q-item>
            </q-list>
          </q-card-main>
          <q-card-actions>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-md-12 col-xl-8">
        <q-tabs inverted class="q-ma-sm" align="center" no-pane-border>
          <q-tab default slot="title" name="tab-1">Active Proposals</q-tab>
          <q-tab slot="title" name="tab-2">Inactive Proposals</q-tab>
          <q-tab slot="title" name="tab-2">Requests</q-tab>
          <q-tab slot="title" name="tab-2">Votes</q-tab>
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
        </q-tabs>
      </div>
    </div>
  </q-page>
</template>

<script>
import MarkdownIt from 'markdown-it'
import MarkdownItSanitizer from 'markdown-it-sanitizer'
export default {
  // name: 'PageName',
  data () {
    return {
      account: null,
      activeProps: null
    }
  },
  methods: {
    loadData () {
      this.$store.dispatch('api/getAccountsTEMP').then((accounts) => {
        let account = accounts.find(account => {
          return account.name === this.$route.params.name
        })
        if (account) {
          this.account = account
        }
      })
      let md = new MarkdownIt().set({ html: true }).use(MarkdownItSanitizer)
      this.$store.dispatch('api/getProposalsTEMP').then((proposals) => {
        let prop = []
        let unprop = []
        for (let i = 0; i < proposals.length; i++) {
          proposals[i].desc = md.render(proposals[i].desc).replace(/<[^>]+>/g, '')
          if (proposals[i].type === 0 && this.$route.params.name === proposals[i].worker) {
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
</style>
