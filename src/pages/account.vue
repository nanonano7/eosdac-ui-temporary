<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-xs-12 col-md-4">
        <q-card class="q-ma-sm">
          <q-card-title class="text-primary">
            <div class="q-title">//NAME</div>
          </q-card-title>
          <q-card-main>
            <img src="~assets/profile-placeholder.png" class="q-ma-sm" style="width:50%;margin-left: auto;margin-right: auto;display: block;">
            <q-list no-border>
              <q-item multiline>
                <q-item-main label="Bio" sublabel="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam sapien vitae diam malesuada maximus in in nunc. In pulvinar, magna sit amet rutrum interdum, augue nunc vestibulum sem, a semper enim nisi vitae turpis. Praesent aliquam volutpat."/>
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
                  625
                </q-item-side>
              </q-item>
              <q-item>
                <q-item-main label="Locked tokens" />
                <q-item-side right>
                  3251.01242102
                </q-item-side>
              </q-item>
            </q-list>
          </q-card-main>
          <q-card-actions>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-xs-12">
        <q-tabs class="tab-tranp" align="center" no-pane-border>
          <q-tab color="primary" default slot="title" name="tab-1">Active Proposals</q-tab>
          <q-tab color="primary" slot="title" name="tab-2">Inactive Proposals</q-tab>
          <q-tab color="primary" slot="title" name="tab-2">Requests</q-tab>
          <q-tab color="primary" slot="title" name="tab-2">Votes</q-tab>
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
          </q-tab-pane>
        </q-tabs>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>

<style>
</style>
