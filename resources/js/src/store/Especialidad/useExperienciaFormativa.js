import { ref } from 'vue';
import { defineStore } from 'pinia';
// useHttpRequest para interactuar con la API
import useHttpRequest from '../../composables/useHttpRequest';

const useExperienciaStore = defineStore('experiencia', () => {
    // Importamos las funciones necesarias de useHttpRequest
    const {
        //index: getUnits,
        show: getExperienciaById, // Añadimos el método show para obtener una especialidad por ID
        //show: getunits,
        loading: ExperienciaLoading,
        initialLoading: ExperienciaFirstTimeLoading,
    } = useHttpRequest('/experiencia_formativa');

    const experiencia = ref(null); // Para almacenar una sola especialidad
    const experiencias = ref([]);  // Para almacenar la lista de especialidades

    // Función para establecer una especialidad específica
    const setExperiencia = (authExperiencia) => {
        experiencia.value = authExperiencia;
    };

    // Función para cargar todas las especialidades
    const loadUnits = async (id) => {
        const response = await getUnitById(id);
        experiencias.value = response;
    };

    // Nueva función para cargar una especialidad por su ID
    const loadUnitById = async (id) => {
        const response = await getUnitById(id); // Usamos el método show
        Unit.value = response;
    };

    return {
        Unit,
        setUnit,
        Units,
        UnitsLoading,
        UnitsFirstTimeLoading,
        loadUnits,
        loadUnitById, // Retornamos la nueva función para obtener una especialidad por ID
    };
});

export default useUnitsStore;
