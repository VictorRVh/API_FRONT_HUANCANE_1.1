import { ref } from 'vue';
import { defineStore } from 'pinia';
// useHttpRequest para interactuar con la API
import useHttpRequest from '../../composables/useHttpRequest';

const useGroupsStore = defineStore('Groups', () => {
    // Importamos las funciones necesarias de useHttpRequest
    const {
        index: getGroupsAll,
        show: getGroupById, // Añadimos el método show para obtener una Groupa por ID
        showTwo: getGroups,
        loading: GroupsLoading,
        initialLoading: GroupsFirstTimeLoading,
    } = useHttpRequest('/grupo');

    const group = ref(null); // Para almacenar una sola Groupa
    const groups = ref([]);  // Para almacenar la lista de Groupa es

    // Función para establecer una Groupa específica
    const setGroup = (authGroup) => {
        group.value = authGroup;
    };

    // Función para cargar todas las Groupaes
    const loadGroups = async () => {
        const response = await getGroupsAll()
        groups.value = response;
    };

    // Nueva función para cargar una Groupa por su ID
    const loadGroupById = async (id) => {
        const response = await getGroupById(id); // Usamos el método show
        group.value = response;
    };

    return {
        group,
        setGroup,
        groups,
        GroupsLoading,
        GroupsFirstTimeLoading,
        loadGroups,
        loadGroupById, // Retornamos la nueva función para obtener una Groupa por ID
    };
});

export default useGroupsStore;
