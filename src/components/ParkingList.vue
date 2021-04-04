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
    axios
      .get(
        "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_parkings-publics-nantes&rows=100"
      )
      .then((response) => {
        this.parkings = response.data.records;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
