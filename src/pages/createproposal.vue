<template>
<q-page padding>
  <div class="row justify-center">
    <div class="col-xs-12">
      <mavon-editor ref="editor" v-model="editorText" language="en" placeholder="Proposal main body" :toolbars="toolbars" class="create-markdown-body" />
    </div>
  </div>
  <div class="row q-mt-sm">
    <div class="col-xs-6">
      <q-card flat class="q-mb-sm">
        <q-card-main>
          <div class="row">
            <div class="col-xs-3">
              <q-select v-model="type" float-label="Type" radio :options="[
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
          <q-field label="Parent ID" :label-width="12">
            <q-input v-model="proposalTitle" />
          </q-field>
          <q-field label="Payment amount" :label-width="12">
            <q-input v-model="proposalTitle" />
          </q-field>
          <q-field label="Recuring data? toggle?" :label-width="12">
            <q-input v-model="proposalTitle" />
          </q-field>
          <q-field label="Title" :label-width="12">
            <q-input @input="saveTitle()" v-model="proposalTitle" />
          </q-field>
          <q-field label="Worker" :label-width="12">
            <q-input v-model="proposalTitle" />
          </q-field>
          <q-list class="q-ma-sm no-border">
          <q-collapsible header-class="q-px-none" dense group="somegroup" :label="'Start Date: ' + startDate | ''">
            <q-datetime-picker format24h v-model="startDate" type="datetime" />
          </q-collapsible>
          <q-collapsible header-class="q-px-none" dense group="somegroup" :label="'Expire Date: ' + expireDate | ''">
            <q-datetime-picker format24h v-model="expireDate" type="datetime" />
          </q-collapsible>
          <q-collapsible header-class="q-px-none" dense group="somegroup" :label="'Due Date: ' + dueDate | ''">
            <q-datetime-picker format24h v-model="dueDate" type="datetime" />
          </q-collapsible>
        </q-list>
        <q-field label="Arbitrator" :label-width="12">
          <q-input v-model="proposalTitle" />
        </q-field>
        </q-card-main>
      </q-card>
    </div>
  </div>
</q-page>
</template>

<script>
import {
  mapGetters
} from 'vuex'
export default {
  data () {
    return {
      proposalTitle: '',
      editorText: '',
      type: '',
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
        subfield: true,
        preview: true
      }
    }
  },
  computed: {
    ...mapGetters({
      getDraft: 'account/getProposalDraft'
    })
  },
  methods: {
    saveTitle () {
      let t = this.proposalTitle
      this.$store.commit('account/SAVE_DRAFT_TITLE', {
        title: t
      })
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
  }
}
</script>

<style>
.op-image:nth-child(2) {
  display: none;
}

.create-markdown-body {
  padding: 0px !important;
  max-width: 9999px !important;
}
</style>
