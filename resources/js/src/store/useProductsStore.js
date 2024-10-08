import { ref } from 'vue';
import { defineStore } from 'pinia';

import useHttpRequest from '../composables/useHttpRequest';

const useProductStore = defineStore('products', () => {
    const {
        index: getProducts,
        loading: productsLoading,
        initialLoading: productsFirstTimeLoading,
    } = useHttpRequest('/products');

    const product = ref(null);
    const products = ref([]);

    const setProduct = (selectedProduct) => {
        product.value = selectedProduct;
    };

    const loadProducts = async () => {
        const response = await getProducts();
        products.value = response;
    };

    return {
        product,
        setProduct,
        products,
        productsLoading,
        productsFirstTimeLoading,
        loadProducts,
    };
});

export default useProductStore;
