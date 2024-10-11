<script setup>

import { ref } from 'vue';

import AuthorizationFallback from '../components/page/AuthorizationFallback.vue';
import ProductSlider from '../components/page/ProductSlider.vue';

import useProductStore from '../store/useProductsStore';
import useSlider from '../composables/useSlider';
import useModalToast from '../composables/useModalToast';
import useHttpRequest from '../composables/useHttpRequest';

import CreateButton from '../components/ui/CreateButton.vue';
import EditButton from '../components/ui/EditButton.vue';
import DeleteButton from '../components/ui/DeleteButton.vue';

const productStore = useProductStore();

// Cargar productos si no se han cargado antes
if (!productStore.products?.length) await productStore.loadProducts();

const { slider, sliderData, showSlider, hideSlider } = useSlider('product-crud');
const { showConfirmModal, showToast } = useModalToast();

const { store: createProduct, update: updateProduct } = useHttpRequest('/products');
const { destroy: deleteProduct, deleting } = useHttpRequest('/products');

// Estado para controlar la visibilidad del formulario
const showForm = ref(false);

// Estado para el producto (nuevo o editado)
const newProduct = ref({
    id: null,
    name: '',
    description: '',
    price: '',
    category: '',
});

// Estado para controlar si se está editando un producto
const isEditing = ref(false);

// Función para alternar el formulario
const toggleForm = () => {
    showForm.value = !showForm.value;
    resetForm();
};

// Función para iniciar el proceso de creación de un nuevo producto
const startCreate = () => {
    isEditing.value = false;
    toggleForm();
};

// Función para iniciar la edición de un producto existente
const startEdit = (product) => {
    isEditing.value = true;
    newProduct.value = { ...product };  // Copiar los datos del producto al formulario
    showForm.value = true; // Mostrar el formulario para editar
};

// Función para reiniciar el formulario después de crear/editar un producto
const resetForm = () => {
    newProduct.value = {
        id: null,
        name: '',
        description: '',
        price: '',
        category: '',
    };
};

// Función para manejar el envío del formulario (crear o editar)
const onSubmit = async () => {
    if (!newProduct.value.name || !newProduct.value.price) {
        alert("Please fill all fields");
        return;
    }

    if (isEditing.value) {
        // Editar producto existente
        const response = await updateProduct(newProduct.value.id, newProduct.value);
        if (response) {
            productStore.loadProducts(); // Recargar productos
            showToast(`Product "${newProduct.value.name}" updated successfully`);
            toggleForm(); // Ocultar formulario
        }
    } else {
        // Crear nuevo producto
        const response = await createProduct(newProduct.value);
        if (response) {
            productStore.loadProducts(); // Recargar productos
            showToast(`Product "${newProduct.value.name}" added successfully`);
            toggleForm(); // Ocultar formulario
        }
    }
};


// Función para manejar la eliminación de un producto
const onDelete = (product) => {
    if (deleting.value) return;

    showConfirmModal(null, async (confirmed) => {
        if (!confirmed) return;

        const isDeleted = await deleteProduct(product?.id);
        if (isDeleted) {
            showToast(`"${product?.name}" deleted successfully...`);
            productStore.loadProducts();
        }
    });
};
</script>

<template>
    <AuthorizationFallback
        :permissions="['products-all', 'products-view', 'products-create', 'products-edit', 'products-delete']">
        <div class="w-full space-y-4 py-6">
            <div class="flex-between">
                <h2 class="text-active font-bold text-2xl">Products</h2>
                <!-- Botón para mostrar el formulario -->
                <button @click="startCreate" class="px-4 py-2 bg-emerald-600 text-white rounded">Add New</button>
            </div>

            <!-- Formulario simple para agregar o editar un producto -->
            <div v-if="showForm" class="p-4 border rounded bg-zinc-600">
                <h3 class="font-semibold mb-2">{{ isEditing ? 'Edit Product' : 'Add New Product' }}</h3>
                <form @submit.prevent="onSubmit">
                    <div class="mb-4">
                        <label class="block mb-1">Product Name</label>
                        <input v-model="newProduct.name" type="text" class="p-2 border rounded w-full text-black"
                            placeholder="Enter product name" required />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-1">Description</label>
                        <input v-model="newProduct.description" type="text" class="p-2 border rounded w-full text-black"
                            placeholder="Enter product description" required />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-1">Price</label>
                        <input v-model="newProduct.price" type="number" class="p-2 border rounded w-full text-black"
                            placeholder="Enter product price" required />
                    </div>

                    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
                    <button @click="toggleForm" type="button"
                        class="px-4 py-2 bg-gray-500 text-white rounded ml-2">Cancel</button>
                </form>
            </div>

            <!-- Tabla de productos -->
            <div class="w-full">
                <Table>
                    <THead>
                        <Tr>
                            <Th> Id </Th>
                            <Th> Product </Th>
                            <Th> Price </Th>
                            <Th> Category </Th>
                            <Th> Action </Th>
                        </Tr>
                    </THead>

                    <TBody>
                        <Tr v-for="product in productStore.products" :key="product.id">
                            <Td>{{ product.id }}</Td>
                            <Td>
                                <div class="text-emerald-500 dark:text-emerald-200">
                                    {{ product.name }}
                                </div>
                                <div class="text-xsm text-[#aaa]">
                                    {{ product.description }}
                                </div>
                            </Td>
                            <Td>{{ product.price }}</Td>
                            <Td>{{ product.category }}</Td>
                            <Td class="align-middle">
                                <div class="flex gap-2">
                                    <!-- Botón de edición -->
                                    <button @click="startEdit(product)"
                                        class="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>

                                    <!-- Botón de eliminación -->
                                    <button @click="onDelete(product)"
                                        class="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                                </div>
                            </Td>
                        </Tr>
                    </TBody>
                </Table>
            </div>
        </div>
    </AuthorizationFallback>
</template>