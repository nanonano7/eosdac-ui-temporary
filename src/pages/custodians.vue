<template>
  <q-page>
  <q-tabs class="tab-tranp" align="center" no-pane-border>
    <q-tab color="primary" default slot="title" name="tab-1">Custodians</q-tab>
    <q-tab color="primary" slot="title" name="tab-2">Candidates</q-tab>
    <q-tab color="primary" slot="title" name="tab-2">My selection</q-tab>
  <q-tab-pane name="tab-1">
    <div class="row">
      <div class="col-xs-12 col-sm-4 col-md-4 col-lg-3">
        <q-card class="q-ma-sm">
          <q-card-title class="text-primary">
            <div class="q-title">//NAME</div>
          </q-card-title>
          <q-card-main>
            <img src="~assets/profile-placeholder.png" class="q-ma-sm" style="width:50%;margin-left: auto;margin-right: auto;display: block;">
            <q-list no-border separator>
              <q-item>
                <q-item-main label="Custodian" />
                <q-item-side right>
                  YES
                </q-item-side>
              </q-item>
              <q-item>
                <q-item-main label="SOME INFO" />
                <q-item-side right>
                  YES
                </q-item-side>
              </q-item>
            </q-list>
          </q-card-main>
          <q-card-actions>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-4 col-md-4 col-lg-3">
        <q-card class="q-ma-sm">
          <q-card-title class="text-primary">
            <div class="q-title">//NAME</div>
          </q-card-title>
          <q-card-main>
            <img src="~assets/profile-placeholder.png" class="q-ma-sm" style="width:50%;margin-left: auto;margin-right: auto;display: block;">
            <q-list no-border>
              <q-item>
                <q-item-main label="Custodian" />
                <q-item-side right>
                  YES
                </q-item-side>
              </q-item>
              <q-item>
                <q-item-main label="SOME INFO" />
                <q-item-side right>
                  YES
                </q-item-side>
              </q-item>
            </q-list>
          </q-card-main>
          <q-card-actions>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-4 col-md-4 col-lg-3">
        <q-card class="q-ma-sm">
          <q-card-title class="text-primary">
            <div class="q-title">//NAME</div>
          </q-card-title>
          <q-card-main>
            <img src="~assets/profile-placeholder.png" class="q-ma-sm" style="width:50%;margin-left: auto;margin-right: auto;display: block;">
            <q-list no-border>
              <q-item>
                <q-item-main label="Custodian" />
                <q-item-side right>
                  YES
                </q-item-side>
              </q-item>
              <q-item>
                <q-item-main label="SOME INFO" />
                <q-item-side right>
                  YES
                </q-item-side>
              </q-item>
            </q-list>
          </q-card-main>
          <q-card-actions>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-4 col-md-4 col-lg-3">
        <q-card class="q-ma-sm">
          <q-card-title class="text-primary">
            <div class="q-title">//NAME</div>
          </q-card-title>
          <q-card-main>
            <img src="~assets/profile-placeholder.png" class="q-ma-sm" style="width:50%;margin-left: auto;margin-right: auto;display: block;">
            <q-list no-border>
              <q-item>
                <q-item-main label="Custodian" />
                <q-item-side right>
                  YES
                </q-item-side>
              </q-item>
              <q-item>
                <q-item-main label="SOME INFO" />
                <q-item-side right>
                  YES
                </q-item-side>
              </q-item>
            </q-list>
          </q-card-main>
          <q-card-actions>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-tab-pane>
  <q-tab-pane name="tab-2">Tab Two</q-tab-pane>
</q-tabs>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>

<style>
</style>
