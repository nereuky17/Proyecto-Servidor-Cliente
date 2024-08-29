<template>
  <div class="container my-4">
    <div class="row">
      <!-- Buscador -->
      <div class="col-12 col-md-8 mx-auto">
        <div class="input-group mb-3">
          <input
            type="text"
            v-model="id"
            class="form-control"
            placeholder="Introduzca Id"
            aria-label="Id"
          />
          <button
            @click="buscar"
            class="btn btn-primary"
            type="button"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
    
    <!-- Resultados -->
    <div class="row">
      <div class="col-12">
        <ul class="list-group">
          <li
            v-for="documento in documentos"
            :key="documento.id"
            class="list-group-item mb-3"
          >
            <h5 class="mb-1">{{ documento.titulo }}</h5>
            <p class="mb-1">{{ documento.contenido }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      documentos: []
    };
  },
  methods: {
    buscar() {
      const API_URL = '/expediente/'; // Asegúrate de que esta URL sea correcta
      fetch(`${API_URL}${this.id}/documentos`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          this.documentos = data;
        })
        .catch(error => {
          console.error('Error al buscar documentos:', error);
        });
    }
  }
};
</script>

<style scoped>
/* Estilo para el contenedor principal */
.container {
  max-width: 800px;
}

/* Estilo para el botón */
.btn-primary {
  margin-left: 0.5rem;
}

/* Estilo para los elementos de la lista */
.list-group-item {
  border-radius: 0.375rem; /* Bordes redondeados */
  border: 1px solid #dee2e6;
}

/* Margen para el título y contenido de cada documento */
.list-group-item h5 {
  font-size: 1.25rem;
  color: #007bff;
}

.list-group-item p {
  font-size: 1rem;
  color: #495057;
}
</style>
