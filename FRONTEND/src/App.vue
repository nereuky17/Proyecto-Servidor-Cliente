<script setup>


import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const marginTop = computed(() => {
  switch (route.path) {
    case '/':
      return '-65%';
    case '/expediente':
      return '-100%';
    case '/documento':
      return '-115%';
    case '/expedientebus':
      return '-120%';
    default:
      return '-10%';
  }
});

</script>

<template>
  <div :style="{ marginTop: marginTop }" class="app">
 
    <nav class="navbar">
     <img alt="Vue logo" class="logo" src="./assets/expedientee.png" width="125" height="125" /> 
      <RouterLink to="/" class="nav-link">Home</RouterLink> |
      <RouterLink to="/expediente" class="nav-link">Lista Expedientes</RouterLink> |
      <RouterLink to="/documento" class="nav-link">Inserción Expediente y Documento</RouterLink> |
      <RouterLink to="/expedientebus" class="nav-link">Búsqueda Expediente</RouterLink>
    </nav>
    
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 240%;
  margin-top: -7%;
}

.navbar {
  background-color: grey;
  padding:1rem;
  padding-right: 1rem;
  padding-left: 30%;
  display: flex;
  justify-content: center;
  gap: 0px;
  width: 144%;
  
  margin-left:-10%;
  margin-right:0%;
  z-index: 1000;
}

.nav-link {
  color: #42b983;
  font-weight: bold;
  text-decoration: none;
  justify-content: center;
  font-size: 1.2rem;
}

.nav-link:hover {
  text-decoration: underline;
  justify-content: center;
}
.logo {
    margin: 2 6rem 0 0;
    height: 70%;
    width: 7%;
  }


main {
  justify-content: center;
  padding: 1rem;
}

@media (min-width: 1024px) {
  .navbar {
    justify-content: flex-start;
  }
}
.app{
  justify-content: center;
}
</style>
