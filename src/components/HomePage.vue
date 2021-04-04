<template>
  <div style="height:100%">
    <h2>Bienvenue sur l'application Parkin'</h2>
    <p>
      L'application permet de retrouver les parkings
      à proximité de la ville de Nantes et de consulter les informations détaillées d’accessibilité les concernant.
    </p>
    <div class="text-center"><img src="../../public/assets/map_nantes.jpg"/></div>
    <div >Le code source peut être consulté à la page suivante : <a class="btn btn-light" href="https://github.com/SHombert/Parkin">https://github.com/SHombert/Parkin</a></div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>
<style>
img {
  max-width: 100%;
  height: auto;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
