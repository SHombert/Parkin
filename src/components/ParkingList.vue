<template>
  <div class="card-columns">
    <ParkingCard
      v-for="parking in parkings"
      :key="parking.recordid"
      class="card"
      :parking="parking"
    />
  </div>
</template>

<script>
import ParkingCard from "./ParkingCard.vue";
import axios from "axios";
import * as storage from '../scripts/storage.js';

export default {
  name: "ParkingList",
  components: {
    ParkingCard,
  },
  data() {
    return {
      parkings: new Array(),
    };
  },
   mounted() {
    // si storage vide, appel REST, sinon appel storage
    this.getParkings();
  },

  methods:{
    getParkingsREST(){
      axios
      .get(
        "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_parkings-publics-nantes&rows=100"
      )
      .then((response) => {
        this.parkings = response.data.records;
        this.parkings.forEach(async (value) => {
          await storage.setObject(value.recordid,value);
        });
      })
      .catch((error) => {
        console.log(error);
      });
    },
    /** Retourne les parkings, soit via une requete REST si le localStorage n'est pas encore à jour, sinon via local storage */
    async getParkings(){
      var dbEmpty = await storage.isEmpty();
      if (dbEmpty){
        await this.getParkingsREST();
      }
      else{
        var keys = await storage.keys();
        keys.forEach(async(key) => {
          this.parkings.push(await storage.getObject(key));
        })
      }
    },
  }
};
</script>
