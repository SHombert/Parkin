<template>
  <div>
    <div class="card text-center">
      <div class="card-header">
        <a
          :href="parking.fields.site_web"
          target="out"
          class="btn btn-link btn-sm"
          >Site web</a
        >
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ parking.fields.nom_complet }}</h5>

        <div v-if="parking.fields.stationnement_velo == 'OUI'" class="d-inline p-2">
          <img
            src="../../public/assets/velo1.png"
            width="55"
            height="40"
            alt=""
          />
        </div>
        <div v-if="parking.fields.acces_pmr == 'OUI'" class="d-inline p-2">
          <img
            src="../../public/assets/handicap.png"
            width="40"
            height="40"
            alt=""
          />
        </div>
        <div class="m-2 d-block">
          <a
            href="#"
            class="btn btn-info btn-sm"
            @click="goToParkingDetails(parking)"
            >Voir les détails</a
          >
        </div>
      </div>
      <div class="card-footer">
        {{ parking.fields.capacite_voiture }} places
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
  methods: {
    goToParkingDetails(parking) {
      this.$router.push({
        name: "ParkingDetail",
        params: { id: parking.recordid },
      });
    },
  },
};
</script>
