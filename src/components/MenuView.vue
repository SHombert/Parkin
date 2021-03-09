<template>
  <nav class="navbar box" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item animated" href="/">
        <img
          class="navbar-brand-img"
          src="../../public/assets/img/compost1.png"
        />
      </a>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        :class="{ 'is-active': mobileMenuActive }"
        @click="mobileMenuActive = !mobileMenuActive"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': mobileMenuActive }">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/"> Accueil </router-link>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            Composteurs
          </a>

          <div class="navbar-dropdown">
            <router-link class="navbar-item" to="/composters">
              Liste
            </router-link>
            <a class="navbar-item">
              Carte
            </a>
            <hr class="navbar-divider" />
            <router-link class="navbar-item" to="/about">
              A propos
            </router-link>
            <a
              class="navbar-item"
              href="https://github.com/alexsedlex/org.univ.compostmap"
              target="github"
            >
              Voir le code source
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item copyright">
          Created by Univ-Nantes &copy;
        </div>
      </div>
    </div>
  </nav>
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

<style scoped>
.navbar {
  height: 70px;
}
.navbar-brand-img {
  margin-left: 10px;
  height: 50px;
  width: 35px;
}
.router-link-active {
  font-weight: bold;
  text-decoration: underline;
  text-decoration-color: #399953;
}

.animated {
  position: relative;
  z-index: 0;
  margin-right: 5px;
  margin-left: 5px;
  height: 40px;
  border-radius: 10px;
  overflow: hidden;
}

.animated::before {
  content: "";
  position: absolute;
  z-index: -2;
  left: -50%;
  top: -50%;
  width: 200%;
  height: 200%;
  background-color: #399953;
  background-repeat: no-repeat;
  background-size: 50% 50%, 50% 50%;
  background-position: 0 0, 100% 0, 100% 100%, 0 100%;
  background-image: linear-gradient(#7fff00, #32cd32),
    linear-gradient(#32cd32, #228b22), linear-gradient(#f4a460, #a0522d),
    linear-gradient(#a0522d, #800000);
  animation: rotate 4s linear infinite;
}

.animated::after {
  content: "";
  position: absolute;
  z-index: -1;
  left: 6px;
  top: 6px;
  width: calc(100% - 12px);
  height: calc(100% - 12px);
  background: white;
  border-radius: 5px;
}

@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}
</style>
