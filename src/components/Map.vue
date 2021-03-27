<template>
  <div class="container">
    <l-map style="height:100vh" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <LGeoJson :geojson="geojson"></LGeoJson>
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LGeoJson } from "@vue-leaflet/vue-leaflet";
import axios from "axios";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
  },
  data() {
    return {
      parkings: new Array(),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 13,
      center: [47.1983256, -1.5461534],
      bounds: null,
      attribution:
        "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
      geojson: {
        type: "FeatureCollection",
        features: [
        ],
      },
      geojsonOptions: {
        // Options that don't rely on Leaflet methods.
      },
    };
  },
  async beforeMount() {
    // HERE is where to load Leaflet components!
    //const { circleMarker } = await import("leaflet/dist/leaflet-src.esm");

    //And now the Leaflet circleMarker function can be used by the options:

    this.mapIsReady = true;
  },
  mounted() {
    axios
      .get(
        "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_parkings-publics-nantes&rows=100"
      )
      .then((response) => {
        this.parkings = response.data.records;
        for (let parkingData in this.parkings) {
          var geojsonFeature = {
            type: "Feature",
            properties: {
              name: parkingData.fields.nom_complet,
              popupContent: parkingData.fields.presentation ,
            },
            geometry: parkingData.geometry,
          };
          this.geojson.features.push(geojsonFeature);
        }
        console.log("Parkings : " + this.parkings);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
