<template>
  <div>
    <div class="card text-center">
      <div class="card-header">
        Featured
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ parking.fields.nom_complet }}</h5>
        <p class="card-text"></p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
      <div class="card-footer text-muted">
        2 days ago
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ParkingCard",
  props: {
    parking: {},
  },
};
</script>
