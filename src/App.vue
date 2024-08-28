<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div>
    <nav class="navbar">
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
.navbar {
  background-color: grey;
  padding: 1rem;
  display: flex;
  justify-content: center;
  gap: 5px;
}

.nav-link {
  color: #42b983;
  font-weight: bold;
  text-decoration: none;
  font-size: 1.2rem;
}

.nav-link:hover {
  text-decoration: underline;
}

main {
  padding: 1rem;
}

@media (min-width: 1024px) {
  .navbar {
    justify-content: flex-start;
  }
}
</style>
