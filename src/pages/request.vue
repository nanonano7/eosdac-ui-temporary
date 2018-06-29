<template>
  <q-page padding>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-5">
        <div class="row justify-center">
        <q-btn class="q-ma-sm" size="lg" label="Create Sub-Proposal" @click="propose()" color="primary"/>
      </div>
        <q-card class="q-ma-sm">
          <q-list separator>
            <q-item link :to="'/account/' + proposal.worker">
              <q-item-main label="Worker" />
              <q-item-tile>
                <span class="q-mx-sm q-item-side">{{proposal.worker}}</span>
              </q-item-tile>
            </q-item>
        <q-item>
          <q-item-main label="Start" />
          <q-item-side right>
            <p>{{proposal.start | moment('YYYY-MM-DD hh:mm:ss A')}}</p>
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
        <q-item link :to="'/account/' + proposal.arbitrator">
          <q-item-main label="Arbitrator" />
          <q-item-side right>
            {{proposal.arbitrator}}
          </q-item-side>
        </q-item>
        <q-item>
          <q-item-main label="Payment amount" />
          <q-item-side right>
            {{proposal.payment_amount}} eosDAC
          </q-item-side>
        </q-item>
      </q-list>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-7">
    <q-card class="markdown-body q-ma-sm">
      <q-card-title>
    <h1 class="text-center proposal-title">{{proposal.title}}</h1>
  </q-card-title>
    <div v-html="proposal.desc"></div>
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
      post: '',
      proposal: null,
      account: null
    }
  },
  methods: {
    showDate () {
      let ts = Math.round((new Date()).getTime() / 1000)
      return ts + 3000000
    },
    loadData () {
      this.$store.dispatch('api/getProposalsTEMP').then((proposals) => {
        let proposal = proposals.find(p => p.id === parseInt(this.$route.params.id))
        if (proposal) {
          let md = new MarkdownIt()
          proposal.desc = md.render(proposal.desc)
          this.proposal = proposal
          this.$store.dispatch('api/getAccountsTEMP').then((accounts) => {
            let account = accounts.find(account => {
              return account.name === proposal.worker
            })
            if (account) {
              this.account = account
            }
          })
        }
      })
    },
    propose () {
      this.$store.commit('account/SAVE_DRAFT_META', {
        parentId: this.$route.params.id
      })
      this.$router.push('/createproposal')
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
