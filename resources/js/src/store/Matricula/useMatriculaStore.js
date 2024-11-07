import { ref } from 'vue';
import { defineStore } from 'pinia';
// useHttpRequest para interactuar con la API
import useHttpRequest from '../../composables/useHttpRequest';

const useEnrollmentStudentsStore = defineStore('EnrollmentStudents', () => {
    // Importamos las funciones necesarias de useHttpRequest
    const {
        index: getEnrollmentStudents,
        show: getEnrollmentById, // Añadimos el método show para obtener una especialidad por ID
        //show: getEnrollmentStudents,
        loading: EnrollmentStudentsLoading,
        initialLoading: EnrollmentStudentsFirstTimeLoading,
    } = useHttpRequest('/matricula');

    const Enrollment = ref(null); // Para almacenar una sola especialidad
    const EnrollmentStudents = ref([]);  // Para almacenar la lista de especialidades

    // Función para establecer una especialidad específica
    const setEnrollment = (authEnrollment) => {
        Enrollment.value = authEnrollment;
    };

    // Función para cargar todas las especialidades
    const loadEnrollmentStudents = async () => {
        const response = await getEnrollmentStudents();
        EnrollmentStudents.value = response;
    };

    // Nueva función para cargar una especialidad por su ID
    const loadEnrollmentById = async (id) => {
        const response = await getEnrollmentById(id); // Usamos el método show
        Enrollment.value = response;
       // console.log("Store: ",response)
    };
    const loadUser = async () =>{
        const response = await getUserDni();
        users.value = response;
    }

    return {
        Enrollment,
        setEnrollment,
        EnrollmentStudents,
        EnrollmentStudentsLoading,
        EnrollmentStudentsFirstTimeLoading,
        loadEnrollmentStudents,
        loadEnrollmentById, // Retornamos la nueva función para obtener una especialidad por ID
    };
});

export default useEnrollmentStudentsStore;
