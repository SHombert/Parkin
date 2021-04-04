<template>
  <div class="container">
    <l-map v-if="!isLoading" style="height:100vh" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker
        v-for="marker in markers"
        :key="marker.location"
        :lat-lng="marker.location"
        :options="marker.options"
        @click="clickedMarker(marker.location)"
      >
        <l-popup v-if="clicked" class="text-center" autopan="false">
          <p class="lead">{{ currentParking.fields.nom_complet }}</p>
          <button class="btn btn-outline-info btn-sm d-flex">
            <a href="#" @click="goToParkingDetails(currentParking)"
              >Voir les détails</a
            >
          </button>
        </l-popup>
        <l-icon :icon-anchor="dynamicAnchor">
          <img src="../../public/assets/placeholder.png" width="30"
            height="30">
        </l-icon>
        <div v-if="!clicked"></div>
      </l-marker>
      <l-marker v-if="geoOk" :lat-lng="geolocationMarker">
        <l-icon :icon-anchor="dynamicAnchor">
          <img src="../../public/assets/pin.png" width="30"
            height="30">
        </l-icon>
      </l-marker>
    </l-map>
    <p v-else>Chargement en cours...</p>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";

import { LMap, LTileLayer, LMarker, LPopup, LIcon } from "@vue-leaflet/vue-leaflet";
import axios from "axios";
import { Geolocation } from "@capacitor/core";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon,
  },
  data() {
    return {
      isLoading: true,
      parkings: new Array(),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 13,
      center: [47.1983256, -1.5461534],
      bounds: null,
      attribution:
        "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
      markers: new Array(),
      geolocationMarker: new Array(),
      currentParking: {},
      clicked: false,
      coordinates: {},
      geoOk: false,
      iconSize:25,
    };
  },
  async beforeMount() {
    // HERE is where to load Leaflet components!
    //const { circleMarker } = await import("leaflet/dist/leaflet-src.esm");

    //And now the Leaflet circleMarker function can be used by the options:

    this.mapIsReady = true;
    this.coordinates = await Geolocation.getCurrentPosition();
    this.geoOk = !(typeof this.coordinates=== "undefined");
  },
  mounted() {
    axios
      .get(
        "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_parkings-publics-nantes&rows=100"
      )
      .then((response) => {
        this.parkings = response.data.records;
        this.parkings.forEach((value) => {
          var marker = {
            location: value.fields.location,
            options: {
              title: value.fields.nom_complet,
            },
          };
          this.markers.push(marker);
        });
        if (this.geoOk) {
          this.geolocationMarker[0] = this.coordinates.coords.latitude;
          this.geolocationMarker[1] = this.coordinates.coords.longitude;
        }

        this.isLoading = false;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    clickedMarker(location) {
      this.currentParking = this.parkings.filter(
        (record) => record.fields.location == location
      )[0];
      console.log(this.currentParking.fields.nom_complet);
      this.clicked = true;
    },
    goToParkingDetails(parking) {
      this.$router.push({
        name: "ParkingDetail",
        params: { id: parking.recordid },
      });
    },
  },
  computed:{  
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15];
    }
  }
};
</script>
