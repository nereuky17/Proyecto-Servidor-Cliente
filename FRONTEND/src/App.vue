<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const marginTop = computed(() => {
  switch (route.path) {
    case '/':
      return '0';
    case '/expediente':
      return '-5%';
    case '/documento':
      return '-10%';
    case '/expedientebus':
      return '-15%';
    default:
      return '0';
  }
});
</script>

<template>
  <div :style="{ marginTop: marginTop }" class="app">
    <div class="container-fluid">
      <!-- Navbar -->
      <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4 shadow-sm">
        <a class="navbar-brand" href="#">
          <img alt="Vue logo" class="logo" src="./assets/expedientee.png" width="50" height="50" />
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/expediente" class="nav-link">Lista Expedientes</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/documento" class="nav-link">Inserción Expediente y Documento</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/expedientebus" class="nav-link">Búsqueda Expediente</RouterLink>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Main Content -->
      <main class="row justify-content-center">
        <div class="col-12 col-md-10">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}

.navbar {
  width: 100%;
}

/* Estilo del logo en el navbar */
.navbar-brand .logo {
  margin-right: 1rem;
}

/* Estilo de los enlaces de navegación */
.nav-link {
  color: #007bff !important;
  font-weight: bold;
}

.nav-link:hover {
  text-decoration: underline;
  color: #0056b3 !important;
}

/* Estilo del main content */
main {
  padding: 2rem 1rem;
}

/* Estilo responsivo para el navbar en pantallas pequeñas */
@media (max-width: 768px) {
  .navbar-nav {
    text-align: center;
    width: 100%;
  }

  .navbar-nav .nav-item {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .navbar {
    padding: 1rem;
  }

  .navbar-brand .logo {
    width: 40px;
    height: 40px;
  }
}

/* Estilo adicional para mejorar el navbar */
.navbar {
  border-bottom: 1px solid #dee2e6;
  background-color: #f8f9fa;
}

/* Añadir sombra al navbar */
.shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075) !important;
}
</style>
