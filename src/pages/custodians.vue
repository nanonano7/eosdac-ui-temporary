<template>
  <q-page>
  <q-tabs class="tab-tranp" align="center" no-pane-border>
    <q-tab color="primary" default slot="title" name="tab-1">Custodians</q-tab>
    <q-tab color="primary" slot="title" name="tab-2">Candidates</q-tab>
    <q-tab color="primary" slot="title" name="tab-2">My selection</q-tab>
  <q-tab-pane name="tab-1">
    <div class="row">
      <div class="col-xs-12 col-sm-4 col-md-4 col-lg-2">
        <router-link to="/account" tag="div">
        <q-card class="q-ma-sm cursor-pointer">
          <q-card-media>
            <img src="~assets/profile-placeholder.png">
            <q-card-title slot="overlay">
              //NAME
              <span slot="subtitle">Subtitle</span>
            </q-card-title>
          </q-card-media>
        </q-card>
      </router-link>
      </div>
      <div class="col-xs-12 col-sm-4 col-md-4 col-lg-2">
        <q-card class="q-ma-sm">
          <q-card-media>
            <img src="~assets/profile-placeholder.png">
            <q-card-title slot="overlay">//NAME</q-card-title>
          </q-card-media>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-4 col-md-4 col-lg-2">
        <q-card class="q-ma-sm">
          <q-card-media>
            <img src="~assets/profile-placeholder.png">
            <q-card-title slot="overlay">//NAME</q-card-title>
          </q-card-media>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-4 col-md-4 col-lg-2">
        <q-card class="q-ma-sm">
          <q-card-media>
            <img src="~assets/profile-placeholder.png">
            <q-card-title slot="overlay">//NAME</q-card-title>
          </q-card-media>
        </q-card>
      </div>
    </div>
  </q-tab-pane>
  <q-tab-pane name="tab-2">
    <div class="row">
      <div class="col-xs-12 col-sm-4 col-md-2">
        <q-card class="q-ma-sm">
          <q-card-media>
            <img src="~assets/profile-placeholder.png">
            <q-card-title slot="overlay">
              //NAME
              <span slot="subtitle">
                Votes: 345
              </span>
            </q-card-title>
          </q-card-media>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-4 col-md-2">
        <q-card class="q-ma-sm">
          <q-card-media>
            <img src="~assets/profile-placeholder.png">
            <q-card-title slot="overlay">//NAME</q-card-title>
          </q-card-media>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-4 col-md-2">
        <q-card class="q-ma-sm">
          <q-card-media>
            <img src="~assets/profile-placeholder.png">
            <q-card-title slot="overlay">//NAME</q-card-title>
          </q-card-media>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-4 col-md-2">
        <q-card class="q-ma-sm">
          <q-card-media>
            <img src="~assets/profile-placeholder.png">
            <q-card-title slot="overlay">//NAME</q-card-title>
          </q-card-media>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-4 col-md-2">
        <q-card class="q-ma-sm">
          <q-card-media>
            <img src="~assets/profile-placeholder.png">
            <q-card-title slot="overlay">//NAME</q-card-title>
          </q-card-media>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-4 col-md-2">
        <q-card class="q-ma-sm">
          <q-card-media>
            <img src="~assets/profile-placeholder.png">
            <q-card-title slot="overlay">//NAME</q-card-title>
          </q-card-media>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-4 col-md-2">
        <q-card class="q-ma-sm">
          <q-card-media>
            <img src="~assets/profile-placeholder.png">
            <q-card-title slot="overlay">//NAME</q-card-title>
          </q-card-media>
        </q-card>
      </div>
    </div>
  </q-tab-pane>
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
