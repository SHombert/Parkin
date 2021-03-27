<template>
  <section class="hero">
    <div class="container">
      <div class="row">
        <ParkingCard
          v-for="parking in parkings"
          :key="parking.recordid"
          class="col"
          :parking="parking"
          @click="goToParkingDetails(parking)"
        />
      </div>
    </div>
  </section>
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
        console.log("Parkings : " + this.parkings);
      })
      .catch((error) => {
        console.log(error);
      });
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
