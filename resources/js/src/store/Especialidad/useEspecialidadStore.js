import { ref } from 'vue';
import { defineStore } from 'pinia';
// useEspecialidadStore
import useHttpRequest from '../../composables/useHttpRequest';

const useSpecialtiesStore = defineStore('specialties', () => {
    const {
        index: getSpecialties,
        loading: specialtiesLoading,
        initialLoading: specialtiesFirstTimeLoading,
    } = useHttpRequest('/especialidad');

    const specialty = ref(null);
    const specialties = ref([]);

    const setSpecialty = (authSpecialty) => {
        specialty.value = authSpecialty;
    };

    const loadSpecialties = async () => {
        const response = await getSpecialties();
        specialties.value = response;
    };

    return {
        specialty,
        setSpecialty,
        specialties,
        specialtiesLoading,
        specialtiesFirstTimeLoading,
        loadSpecialties,
    };
});

export default useSpecialtiesStore;
