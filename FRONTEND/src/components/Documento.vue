<template>
  <div class="documento">
    <!-- Botones para seleccionar la acción (se mantienen si no estás editando) -->
    <div class="botones-accion">
      <button class="btn-expediente" @click="cambiarAExpediente">Insertar Expediente</button>
      <button class="btn-documento" @click="cambiarADocumento">Insertar Documento</button>
    </div>

    <!-- Mostrar solo el formulario de expediente cuando se selecciona -->
    <div v-if="mostrarFormularioExpediente">
      <h2>Crear Expediente</h2>

      <label for="expedienteNombre">Nombre del Expediente:</label>
      <input id="expedienteNombre" v-model="nuevoExpediente.nombre" />

      <!-- Botón para añadir expediente -->
      <button @click="añadirExpediente">Añadir Expediente</button>

      <!-- Mostrar los datos del expediente creado -->
      <div v-if="expedienteCreado">
        <h3>Expediente Creado:</h3>
        <p>ID: {{ expedienteCreado.id }}</p>
        <p>Nombre: {{ expedienteCreado.nombre }}</p>
       
      </div>
    </div>

    <!-- Mostrar solo el formulario de documento cuando se selecciona o se está editando -->
    <div v-if="mostrarFormularioDocumento || isEditing">
      <h2 v-if="isEditing">Editar Documento</h2>
      <h2 v-else>Crear Documento</h2>

      <label for="documentoNombre">Nombre del Documento:</label>
      <input id="documentoNombre" v-model="nuevoDocumento.titulo" />

      <label for="documentoContenido">Contenido del Documento:</label>
      <input id="documentoContenido" v-model="nuevoDocumento.contenido" />

      <!-- Mostrar el campo de ID del expediente en el modo de creación o como label en el modo de edición -->
      <div v-if="isEditing">
        <label>ID del Expediente: {{ expedienteId }} </label>
      </div>
      <div v-else>
        <label for="expedienteIdManual">ID del Expediente:</label>
        <input id="expedienteIdManual" v-model="expedienteIdManual" placeholder="Escriba el ID del expediente manualmente" readonly />
      </div>

      <!-- Botón de añadir o actualizar documento -->
      <button v-if="isEditing" @click="actualizarDocumento">Actualizar Documento</button>
      <button v-else @click="añadirDocumentos">Añadir Documento</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

// Variables reactivas
const isEditing = ref(false); // Modo de edición
const nuevoExpediente = ref({ nombre: '' });
const expedienteCreado = ref(null); // Almacena los datos del expediente creado
const expedienteId = ref(null); // Almacena el ID del expediente creado o editado
const expedienteIdManual = ref(''); // Campo para que el usuario escriba manualmente el ID del expediente
const nuevoDocumento = ref({ titulo: '', contenido: '' });
const mostrarFormularioExpediente = ref(false); // Controla la visibilidad del formulario de expediente
const mostrarFormularioDocumento = ref(false);  // Controla la visibilidad del formulario de documento

const route = useRoute();
const router = useRouter();

// Si existe un id en la ruta, significa que estamos en modo edición
onMounted(() => {
  if (route.params.id) {
    isEditing.value = true;
    cargarDocumento(route.params.id);
  }
});

// Función para cargar los datos del documento en modo de edición
const cargarDocumento = (id) => {
  axios.get(`/documento/${id}`)
    .then(response => {
      const documento = response.data;
      nuevoDocumento.value.titulo = documento.titulo;
      nuevoDocumento.value.contenido = documento.contenido;
      expedienteId.value = documento.expediente.id;
    })
    .catch(error => {
      console.error('Error al cargar el documento:', error);
    });
};

// Función para actualizar el documento
const actualizarDocumento = () => {
  const id = route.params.id;
  axios.put(`/documento/${id}`, {
    titulo: nuevoDocumento.value.titulo,
    contenido: nuevoDocumento.value.contenido
  })
    .then(() => {
      router.push('/'); // Redirigir después de actualizar
    })
    .catch(error => {
      console.error('Error al actualizar el documento:', error);
    });
};

// Función para añadir documentos al expediente
const añadirDocumentos = () => {
  if (!expedienteIdManual.value) {
    alert('Por favor, ingrese el ID del expediente.');
    return;
  }

  const documento = {
    titulo: nuevoDocumento.value.titulo,
    contenido: nuevoDocumento.value.contenido,
    expediente: { id: expedienteIdManual.value } // Usa el ID del expediente ingresado manualmente
  };

  axios.post('/documento/crear', documento)
    .then(response => {
      console.log('Documento añadido correctamente:', response.data);
      // Limpia el formulario de documento tras la creación
      nuevoDocumento.value = { titulo: '', contenido: '' };
      expedienteIdManual.value = ''; // Limpia el campo de ID manual
      expedienteCreado.value='';
    })
    .catch(error => {
      console.error('Error al añadir documento:', error);
    });
};

// Función para añadir expediente
const añadirExpediente = () => {
  axios.post('/expediente/crear', nuevoExpediente.value)
    .then(response => {
      console.log('Expediente añadido correctamente:', response.data);
      // Limpia el formulario de expediente tras la creación
      nuevoExpediente.value = { nombre: '' };
      
      // Almacena los datos del expediente creado
      expedienteCreado.value = response.data;

      // Habilita el formulario de documento y asigna el ID del expediente recién creado
      expedienteIdManual.value = response.data.id;
      mostrarFormularioDocumento.value = true;
    })
    .catch(error => {
      console.error('Error al añadir expediente:', error);
    });
};

// Función para cambiar a insertar expediente
const cambiarAExpediente = () => {
  mostrarFormularioExpediente.value = true;
  mostrarFormularioDocumento.value = false;
  resetFormularioDocumento(); // Resetea el formulario de documento cuando cambias a expediente
};

// Función para cambiar a insertar documento
const cambiarADocumento = () => {
  mostrarFormularioDocumento.value = true;
  mostrarFormularioExpediente.value = false;
};

// Función para resetear el formulario de documento
const resetFormularioDocumento = () => {
  nuevoDocumento.value = { titulo: '', contenido: '' }; // Limpia el formulario de documento
  expedienteIdManual.value = ''; // Limpia el campo de ID manual
};
</script>

<style scoped>
.documento{
    display: flex;
  flex-direction: column;
  align-items: center;
  width: 280%;
  margin-top: 10%;
  margin-left: -100%;
  }

  .botones-accion {
  display: flex;
  margin-top: -7%;

 
}

.btn-expediente {

  margin-top: 20%;
}

.btn-documento {
  margin-top: 20%; 
}

.botones-accion button {
  margin-right: 10px; 
}
</style>