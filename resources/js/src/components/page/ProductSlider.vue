<script setup>
import { computed, ref, watch } from 'vue';
import useProductStore from '../../store/useProductsStore';
import useValidation from '../../composables/useValidation';
import useHttpRequest from '../../composables/useHttpRequest';
import useUtils from '../../composables/useUtils';
import useModalToast from '../../composables/useModalToast';

import AuthorizationFallback from './AuthorizationFallback.vue';

import * as yup from 'yup';

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
    },
    product: {
        type: [Object, null],
        default: () => null,
    },
});
const emit = defineEmits(['hide']);

const productStore = useProductStore();
const {
    store: createProduct,
    saving,
    update: updateProduct,
    updating,
} = useHttpRequest('/products');
const { runYupValidation } = useValidation();
const { omitPropsFromObject } = useUtils();
const { showToast } = useModalToast();

const requiredPermissions = computed(() => {
    if (!props.product?.id) return ['products-all', 'products-view', 'products-create', 'products-edit', 'products-delete'];
    else return ['products-all', 'products-edit'];
});


const title = computed(() =>
    props.product ? `Update product "${props.product?.name}"` : 'Add new product',
);

const initialFormData = () => {
    return {
        name: null,
        description: null,
        price: null,
        category: null,
    };
};

const formData = ref(initialFormData());
const formErrors = ref({});

watch(
    () => props.show,
    () => {
        if (props.show) {
            if (props.product?.id) {
                formData.value = Object.entries(initialFormData()).reduce(
                    (r, [key, val]) => {
                        if (props.product[key])
                            return { ...r, [key]: props.product[key] };
                        return { ...r, [key]: val };
                    },
                    {},
                );
            } else {
                formData.value = initialFormData();
                formErrors.value = {};
            }
        }
    },
);

const schema = yup.object().shape({
    name: yup.string().nullable().required(),
    description: yup.string().nullable().required(),
    price: yup.number().nullable().required().positive(),
    category: yup.string().nullable().required(),
});

const onSubmit = async () => {
    if (saving.value || updating.value) return;

    let data = {
        ...formData.value,
    };

    const { validated, errors } = await runYupValidation(schema, data);
    if (!validated) {
        formErrors.value = errors;
        return;
    }
    formErrors.value = {};

    data = omitPropsFromObject(data, ['extra_field']); // Ajusta según los campos

    const response = props.product?.id
        ? await updateProduct(props.product?.id, data)
        : await createProduct(data);

    if (response?.id) {
        showToast(
            `Product ${props.product?.id ? 'updated' : 'created'} successfully`,
        );
        productStore.loadProducts();
        emit('hide');
    }
};
</script>

<template>
    <Slider :show="show" :title="title" @hide="emit('hide')">
        <AuthorizationFallback :permissions="requiredPermissions">
            <div class="mt-4 space-y-4">
                <FormInput v-model="formData.name" :focus="show" label="Product Name" :error="formErrors?.name"
                    required />

                <FormInput v-model="formData.description" label="Description" :error="formErrors?.description"
                    required />

                <FormInput v-model="formData.price" label="Price" type="number" :error="formErrors?.price" required />

                <FormInput v-model="formData.category" label="Category" :error="formErrors?.category" required />

                <Button :title="product?.id ? 'Update Product' : 'Create Product'"
                    :loading-title="product?.id ? 'Updating...' : 'Saving...'" :loading="saving || updating"
                    class="!w-full" @click="onSubmit" />
            </div>
        </AuthorizationFallback>
    </Slider>
</template>
