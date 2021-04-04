<template>
  <div class="container">
    <div v-if="!isLoading" class="jumbotron">
      <h1 >{{ parking.fields.nom_complet }}</h1>
      <h5 class="text-muted d-inline">
        {{ parking.fields.capacite_voiture }} places
      </h5>
      <button class="btn btn-outline-info btn-sm m-3">
        <a :href="mapURL" target="out">Google maps</a>
      </button>
      <button class="btn btn-outline-secondary btn-sm m-3">
        <a :href="parking.fields.site_web" target="out">Site Web</a>
      </button>
      <div>
        <span
          v-if="parking.fields.acces_pmr == 'OUI'"
          class="badge badge-info m-2"
          >{{ parking.fields.capacite_pmr }}
          <img
            src="../../public/assets/handicap.png"
            width="20"
            height="20"
            alt=""
        /></span>
        <span
          v-if="parking.fields.stationnement_velo == 'OUI'"
          class="badge badge-success"
          >Vélo : {{ parking.fields.capacite_velo }}</span
        >
        <span
          v-if="parking.fields.capacite_moto != null"
          class="badge badge-primary m-2"
          >Moto : {{ parking.fields.capacite_moto }}</span
        >
        <span
          v-if="parking.fields.capacite_vehicule_electrique != null"
          class="badge badge-danger"
          >Electrique : {{ parking.fields.capacite_vehicule_electrique }}</span
        >
      </div>
      <hr class="my-4" />
      <h4>Coordonnées</h4>
      <p>{{ parking.fields.telephone }}</p>
      <p>
        {{ parking.fields.adresse }} {{ parking.fields.code_postal }}
        {{ parking.fields.commune }}
      </p>
      <hr class="my-4" />
      <p>Catégorie : {{ parking.fields.libcategorie }}</p>
      <p>Moyen de paiement : {{ parking.fields.moyen_paiement }}</p>

      <p class="lead">{{ parking.fields.presentation }}</p>
    </div>
    <p v-else>Chargement en cours...</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ParkingDetail",
  props: {
    id: String,
  },
  data() {
    return {
      parking: {},
      isLoading: true,
      mapURL: String,
    };
  },
  mounted() {
    axios
      .get(
        "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_parkings-publics-nantes&rows=100"
      )
      .then((response) => {
        let parkingFromRequest = response.data.records.filter(
          (record) => record.recordid == this.id
        );
        console.log(parkingFromRequest);
        if (parkingFromRequest.length > 0) {
          this.parking = parkingFromRequest[0];
          this.mapURL =
            "https://maps.google.com/?q=" +
            this.parking.fields.location[0] +
            "," +
            this.parking.fields.location[1];

          this.isLoading = false;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
