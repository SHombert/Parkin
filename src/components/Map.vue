<template>
  <div class="container">
    <l-map v-if="!isLoading" style="height:100vh" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker
        v-for="marker in markers"
        :key="marker.recordid"
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
          <img
            src="../../public/assets/placeholder.png"
            width="30"
            height="30"
          />
        </l-icon>
        <div v-if="!clicked"></div>
      </l-marker>
      <l-marker
        v-if="geoOk"
        :lat-lng="geolocationMarker"
        :options="optionsGeolocation"
      >
        <l-icon :icon-anchor="dynamicAnchor">
          <img src="../../public/assets/pin.png" width="30" height="30" />
        </l-icon>
      </l-marker>
    </l-map>
    <p v-else>Chargement en cours...</p>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";

import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LIcon,
} from "@vue-leaflet/vue-leaflet";
import axios from "axios";
import * as storage from "../scripts/storage.js";
import { Geolocation, Permissions, PermissionType } from "@capacitor/core";

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
      zoom: 14,
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
      permission: {},
      iconSize: 25,
      optionsGeolocation: { title: "Ma position" },
    };
  },
  async beforeMount() {
    // HERE is where to load Leaflet components!
    //const { circleMarker } = await import("leaflet/dist/leaflet-src.esm");
    //And now the Leaflet circleMarker function can be used by the options:

    this.mapIsReady = true;
  },
  mounted() {
    this.getParkings();
    this.getPosition();
    console.log(this.geoOk);
    this.isLoading = false;
    this.watchPosition();
  },
  methods: {
    /** Appel rest pour les parkings + mise à jour des marqueurs */
    getParkingsREST() {
      axios
        .get(
          "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_parkings-publics-nantes&rows=100"
        )
        .then((response) => {
          this.parkings = response.data.records;
          this.parkings.forEach(async (value) => {
            var marker = {
              recordid: value.recordid,
              location: value.fields.location,
              options: {
                title: value.fields.nom_complet,
              },
            };
            this.markers.push(marker);
            await storage.setObject(value.recordid, value);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /** Retourne les parkings, soit via une requete REST si le localStorage n'est pas encore à jour, sinon via local storage + mise à jour des marqueurs */
    async getParkings() {
      var dbEmpty = await storage.isEmpty();
      if (dbEmpty) {
        await this.getParkingsREST();
      } else {
        var keys = await storage.keys();
        keys.forEach(async (key) => {
          var parking = await storage.getObject(key);
          this.parkings.push(parking);
          var marker = {
            recordid: parking.recordid,
            location: parking.fields.location,
            options: {
              title: parking.fields.nom_complet,
            },
          };
          this.markers.push(marker);
        });
      }
    },
    // premiere position au lancement de l'application
    async getPosition() {
      this.coordinates = await Geolocation.getCurrentPosition();
      /*this.permission = await Permissions.query({
        name: PermissionType.Geolocation,
      });
      this.geoOk = this.permission.state === "granted";*/
      this.geoOk = !(typeof this.coordinates ==="undefined");
      if (this.geoOk) {
        this.geolocationMarker[0] = this.coordinates.coords.latitude;
        this.geolocationMarker[1] = this.coordinates.coords.longitude;
        this.center=this.geolocationMarker;
      }
    },
    //Permet de suivre la position dynamiquement
    watchPosition() {
      const wait = Geolocation.watchPosition(
        {},
         (position, failurePosition) => {    
            this.geolocationMarker = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

          
        }
      );
      console.log(wait);
    },
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
  computed: {
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15];
    },
  },
};
</script>
