<template>
<q-page padding>
  <div class="row">
    <div class="col-xs-12 col-sm-4">
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
                NO
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
          <q-btn color="primary" icon="assignment ind" label="Become a Custodian" />
        </q-card-actions>
      </q-card>
    </div>
    <div class="col-xs-12 col-sm-8">
      <q-card class="q-ma-sm">
        <q-card-title class="text-primary">
          <div class="q-title">Bio</div>
        </q-card-title>
        <q-card-main>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam sapien vitae diam malesuada maximus in in nunc. In pulvinar, magna sit amet rutrum interdum, augue nunc vestibulum sem, a semper enim nisi vitae turpis. Praesent aliquam volutpat.
        </q-card-main>
        <q-card-actions>
        </q-card-actions>
      </q-card>
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
