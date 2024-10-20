import { ref } from 'vue';
import { defineStore } from 'pinia';
// useEspecialidadStore
import useHttpRequest from '../../composables/useHttpRequest';

const usePlansStore = defineStore('plans', () => {
    const {
        index: getPlans,
        loading: plansLoading,
        initialLoading: plansFirstTimeLoading,
    } = useHttpRequest('/plan');

    const plan = ref(null);
    const plans = ref([]);

    const setPlan = (authplan) => {
        plan.value = authplan;
    };

    const loadPlans = async () => {
        const response = await getPlans();
        plans.value = response;
    };

    return {
        plan,
        setPlan,
        plans,
        plansLoading,
        plansFirstTimeLoading,
        loadPlans,
    };
});

export default usePlansStore;
