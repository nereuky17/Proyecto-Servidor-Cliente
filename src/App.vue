<script setup>
import { RouterLink, RouterView } from 'vue-router';  // Importamos las herramientas del router
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <nav>
      <RouterLink to="/expediente">Expedientes</RouterLink>
      <RouterLink to="/documento">Documentos</RouterLink>
    </nav>
  </header>

  <main>
    <!-- Aquí el RouterView renderizará el componente correspondiente según la ruta -->
    <RouterView />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

nav a {
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
}

nav a.router-link-exact-active {
  text-decoration: underline;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
