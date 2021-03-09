<template>
  <b-navbar  role="navigation" aria-label="main navigation">
     <b-nav-item href="#">Link</b-nav-item>
    <div class="b-navbar-brand">
      <a class="b-navbar-item animated" href="/">
        
      </a>

      <a
        role="button"
        class="b-navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="b-navbarBasicExample"
        :class="{ 'is-active': mobileMenuActive }"
        @click="mobileMenuActive = !mobileMenuActive"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="b-b-navbar-menu" :class="{ 'is-active': mobileMenuActive }">
      <div class="b-navbar-start">
        <router-link class="b-navbar-item" to="/"> Accueil </router-link>

        <div class="b-navbar-item has-dropdown is-hoverable">
          <a class="b-navbar-link">
            Composteurs
          </a>

          <div class="b-navbar-dropdown">
            <router-link class="b-navbar-item" to="/composters">
              Liste
            </router-link>
            <a class="b-navbar-item">
              Carte
            </a>
            <hr class="b-navbar-divider" />
            <router-link class="b-navbar-item" to="/about">
              A propos
            </router-link>
            <a
              class="b-navbar-item"
              href="https://github.com/alexsedlex/org.univ.compostmap"
              target="github"
            >
              Voir le code source
            </a>
          </div>
        </div>
      </div>

      <div class="b-navbar-end">
        <div class="b-navbar-item copyright">
          Created by Univ-Nantes &copy;
        </div>
      </div>
    </div>
  </b-navbar>
</template>

<script>
export default {
  name: "MenuView",
  data() {
    return {
      mobileMenuActive: false,
    };
  },
};
</script>

