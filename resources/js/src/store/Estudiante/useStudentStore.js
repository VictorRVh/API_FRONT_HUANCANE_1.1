import { ref } from 'vue';
import { defineStore } from 'pinia';
// useEspecialidadStore
import useHttpRequest from '../../composables/useHttpRequest';

const useStudentsStore = defineStore('students', () => {
    const {
        index: getStudents,
        loading: studentsLoading,
        initialLoading: studentsFirstTimeLoading,
    } = useHttpRequest('/users-by-role/8');

    const student = ref(null);
    const students = ref([]);

    const setStudent = (authStudent) => {
        student.value = authStudent;
    };

    const loadStudents = async () => {
        const response = await getStudents();
        students.value = response;
    };

    return {
        student,
        setStudent,
        students,
        studentsLoading,
        studentsFirstTimeLoading,
        loadStudents,
    };
});

export default useStudentsStore;
