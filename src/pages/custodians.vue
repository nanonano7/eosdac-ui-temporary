<template>
<q-page>
  <q-tabs inverted align="center" no-pane-border>
    <q-tab default slot="title" name="tab-1">Custodians</q-tab>
    <q-tab slot="title" name="tab-2">Candidates</q-tab>
    <q-tab slot="title" name="tab-3">My selection</q-tab>
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
      <div class="row">
        <div v-for="(account, index) in custodians" :key="index" class="col-md-12 col-lg-12 col-xl-4">
          <router-link :to="'/account/' + account.name" tag="div" cursor-pointer>
            <q-card class="q-ma-sm cursor-pointer">
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
                  <q-item>
                    <q-item-main label="Custodian" />
                    <q-item-side right>
                      YES
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
          </router-link>
        </div>
      </div>
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
      <div class="row">
        <div v-for="(account, index) in candidates" :key="index" class="col-md-12 col-lg-12 col-xl-4">
          <router-link to="/account" tag="div" cursor-pointer>
            <q-card class="q-ma-sm cursor-pointer">
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
                  <q-item>
                    <q-item-main label="Custodian" />
                    <q-item-side right>
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
          </router-link>
        </div>
      </div>
    </q-tab-pane>
  </q-tabs>
  <q-page-sticky position="top-right" :offset="[18, 18]">
  </q-page-sticky>
</q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      custodians: null,
      candidates: null,
      sortBy: 'Votes'
    }
  },
  methods: {
    loadData () {
      this.$store.dispatch('api/getAccountsTEMP').then((accounts) => {
        let custodians = []
        let candidates = []
        for (let i = 0; i < accounts.length; i++) {
          if (accounts[i].custodian === 1) {
            custodians.push(accounts[i])
          } else {
            candidates.push(accounts[i])
          }
        }
        this.custodians = custodians
        this.candidates = candidates
      })
    },
    sortArr (by) {
      function sortByVotes (a, b) {
        let comparison = 0
        if (a.total_votes > b.total_votes) {
          comparison = 1
        } else if (a.total_votes < b.total_votes) {
          comparison = -1
        }
        return comparison
      }
      this.custodians.sort(sortByVotes)
    }
  },
  watch: {
    sortBy (val) {
      if (val === 'Votes') {
        this.sortArr()
      }
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style>
</style>
