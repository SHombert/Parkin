<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <a class="navbar-brand" href="#">
     <img src="../../public/assets/parking.png" width="30" height="30" alt=""> Parkin'</a>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" to="/">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/parkings">Parkings</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/map">Carte</router-link>
      </li>
    </ul>

  </div>
</nav>
</template>

<script>
export default {
  name: "MenuView",
};
</script>

