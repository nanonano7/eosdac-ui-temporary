<template>
<q-page>
  <div class="row">
    <div class="col-sm-12 col-md-6">
      <mavon-editor boxShadow="false" defaultOpen="edit" ref="editor" v-model="editorText" language="en" placeholder="Proposal main body" :toolbars="toolbars" class="q-ma-sm create-markdown-body round-borders" />
    </div>
    <div class="col-sm-12 col-md-6">
      <q-card class="q-ma-sm markdown-body">
        <q-card-title>
      <h1 v-if="proposalTitle" class="text-center proposal-title">{{proposalTitle}}</h1>
      <h1 v-else class="text-center proposal-title text-grey">Title</h1>
    </q-card-title>
      <div v-html="renderedText"></div>
    </q-card>
    </div>
  </div>
  <div class="row q-mt-sm">
    <div class="col-xs-6">
      <q-card class="q-ma-sm">
        <q-card-main>
          <q-field class="q-mt-sm" :label-width="12">
            <q-input float-label="Title" @input="saveTitle()" v-model="proposalTitle" />
          </q-field>
          <div class="row q-mt-sm">
            <div class="col-xs-5">
              <q-select v-model="type" @input="saveChanges()" float-label="Type" radio :options="[
        {
          label: 'Proposal',
          value: 'Proposal'
        },
        {
          label: 'Request',
          value: 'Request'
        }
      ]" />
            </div>
          </div>
          <q-field v-if="type === 'Proposal'" class="q-mt-sm" :label-width="12">
            <q-input float-label="Parent ID" @input="saveChanges()" v-model="parentId" />
          </q-field>
          <q-field class="q-mt-sm" :label-width="12">
            <q-input type="number" float-label="Payment amount" @input="saveChanges()" v-model="paymentAmount" />
          </q-field>
          <q-field class="q-mt-sm" :label-width="12">
            <q-input float-label="Recuring data? toggle?" @input="saveChanges()" v-model="recurring" />
          </q-field>
          <q-field class="q-mt-sm" :label-width="12">
            <q-input float-label="Arbitrator" @input="saveChanges()" v-model="arbitrator" />
          </q-field>
          <q-list class="q-ma-sm no-border">
            <q-field :label="'Start Date: ' + startDate" class="q-mt-sm" :label-width="12">
            <q-datetime-picker @input="saveChanges()" format24h v-model="startDate" type="datetime" />
          </q-field>
          <q-field :label="'Expire Date: ' + expireDate" class="q-mt-sm" :label-width="12">
            <q-datetime-picker @input="saveChanges()" format24h v-model="expireDate" type="datetime" />
          </q-field>
          <q-field :label="'Due Date: ' + dueDate" class="q-mt-sm" :label-width="12">
            <q-datetime-picker @input="saveChanges()" format24h v-model="dueDate" type="datetime" />
          </q-field>
        </q-list>
        </q-card-main>
      </q-card>
    </div>
  </div>
</q-page>
</template>

<script>
import MarkdownIt from 'markdown-it'
let md = new MarkdownIt()
import {
  mapGetters
} from 'vuex'
export default {
  data () {
    return {
      proposalTitle: 'Title',
      editorText: '',
      renderedText: '',
      type: 'Proposal',
      parentId: 0,
      paymentAmount: 0,
      recurring: '',
      arbitrator: '',
      startDate: '',
      expireDate: '',
      dueDate: '',
      toolbars: {
        bold: true,
        italic: true,
        header: true,
        underline: true,
        strikethrough: true,
        mark: true,
        superscript: true,
        subscript: true,
        quote: true,
        ol: true,
        ul: true,
        link: true,
        imagelink: true,
        code: true,
        table: true,
        fullscreen: false,
        readmodel: false,
        htmlcode: false,
        help: false,
        undo: false,
        redo: false,
        trash: false,
        save: false,
        navigation: false,
        alignleft: true,
        aligncenter: true,
        alignright: true,
        subfield: false,
        preview: false
      }
    }
  },
  computed: {
    ...mapGetters({
      getDraft: 'account/getProposalDraft',
      getAccount: 'account/getAccount'
    })
  },
  methods: {
    saveTitle () {
      let t = this.proposalTitle
      this.$store.commit('account/SAVE_DRAFT_META', {
        title: t
      })
    },
    saveChanges () {
      this.$store.commit('account/SAVE_DRAFT_META', {
        title: this.proposalTitle,
        type: this.type,
        parentId: this.parentId,
        paymentAmount: this.paymentAmount,
        recurring: this.recurring,
        arbitrator: this.arbitrator,
        startDate: this.startDate,
        expireDate: this.expireDate,
        dueDate: this.dueDate
      })
    }
  },
  watch: {
    editorText (val) {
      this.renderedText = md.render(val)
    }
  },
  mounted () {
    document.getElementsByClassName('op-image')[0].childNodes[2].style.visibility = 'hidden'
    this.$refs.editor.$on('change', function (text) {
      this.$store.commit('account/SAVE_DRAFT', {
        text
      })
    })
    let prop = this.getDraft
    this.proposalTitle = prop.title
    this.editorText = prop.text
    this.renderedText = prop.renderedText
    this.type = prop.type
    this.parentId = prop.parentId
    this.paymentAmount = prop.paymentAMount
    this.recurring = prop.recurring
    this.arbitrator = prop.arbitrator
    this.startDate = prop.startDate
    this.expireDate = prop.expireDate
    this.dueDate = prop.dueDate
  }
}
</script>

<style>
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
.op-image:nth-child(2) {
  display: none;
}

.create-markdown-body {
  padding: 0px !important;
  max-width: 9999px !important;
  shadow: none;
  border: none;
}
.v-note-wrapper {
  z-index: 1 !important;
}
</style>
