<template>
    <div>
        <input type="text" v-model="id" placeholder="Introduzca Id">
        <button @click="buscar">Buscar</button>
        <ul>
            <li v-for="documento in documentos" :key="documento.id">
                <h3>{{ documento.titulo }}</h3>
                <p>{{ documento.contenido }}</p>
                
            </li>
        </ul>
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
