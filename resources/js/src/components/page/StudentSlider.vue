<script setup>
import { computed, ref, watch } from 'vue';
import Slider from '../ui/Slider.vue';
import FormInput from '../ui/FormInput.vue';
import FormLabelError from '../ui/FormLabelError.vue';
import VSelect from 'vue-select';
import Button from '../ui/Button.vue';
import AuthorizationFallback from '../../components/page/AuthorizationFallback.vue';

import useRoleStore from '../../store/useRoleStore';
import useStudentStore from '../../store/useStudentStore';
import useValidation from '../../composables/useValidation';
import useHttpRequest from '../../composables/useHttpRequest';
import useUtils from '../../composables/useUtils';
import useModalToast from '../../composables/useModalToast';

import * as yup from 'yup';

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
    },
    student: {
        type: [Object, null],
        default: () => null,
    },
});
const emit = defineEmits(['hide']);

const studentStore = useStudentStore();
const roleStore = useRoleStore();
const {
    store: createStudent,
    saving,
    update: updateStudent,
    updating,
} = useHttpRequest('/students');
const { runYupValidation } = useValidation();
const { omitPropsFromObject } = useUtils();
const { showToast } = useModalToast();

const requiredPermissions = computed(() => {
    if (!props.student?.id) return ['students-all', 'students-create'];
    else return ['students-all', 'students-edit'];
});

const title = computed(() =>
    props.student ? `Update student "${props.student?.name}"` : 'Add new student',
);

const initialFormData = () => {
    return {
        nombre: null,
        apellido: null,
        email: null
    };
};

const formData = ref(initialFormData());
const formErrors = ref({});

watch(
    () => props.show,
    () => {
        if (props.show) {
            if (props.student?.id) {
                formData.value = Object.entries(initialFormData()).reduce(
                    (r, [key, val]) => {
                        if (props.student[key])
                            return { ...r, [key]: props.student[key] };
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

const roleOptions = computed(() => {
    const formDataRoleIds = formData.value.roles.map((role) =>
        role?.id?.toString(),
    );
    return roleStore.roles.filter(
        (role) =>
            !formDataRoleIds.includes(role?.id?.toString()) &&
            role?.name !== 'super-admin',
    );
});

const selectedRole = ref(null);
const onRoleSelect = (role) => {
    formData.value = {
        ...formData.value,
        roles: [role].concat(formData.value.roles),
    };
    selectedRole.value = null;
};
const onRoleRemove = (role) => {
    const updatedRoles = formData.value.roles.filter(
        (fRole) => fRole?.id?.toString() !== role?.id?.toString(),
    );

    formData.value = {
        ...formData.value,
        roles: updatedRoles,
    };
};

const schema = yup.object().shape({
    nombre: yup.string().nullable().required('El nombre es obligatorio'),
    apellido: yup.string().nullable().required('El apellido es obligatorio'),
    email: yup
        .string()
        .email('Debe ser un correo electrónico válido')
        .nullable()
        .required('El correo electrónico es obligatorio'),
});


const onSubmit = async () => {
    if (saving.value || updating.value) return;

    let data = {
        ...formData.value,  // Solo incluye nombre, apellido y email
    };

    // Validar los campos usando Yup
    const { validated, errors } = await runYupValidation(schema, data);
    if (!validated) {
        formErrors.value = errors;
        return;
    }
    formErrors.value = {};

    // Si el estudiante ya existe, actualiza, sino crea uno nuevo
    const response = props.student?.id
        ? await updateStudent(props.student?.id, data)
        : await createStudent(data);

    if (response?.id) {
        showToast(
            `Student ${props.student?.id ? 'updated' : 'created'} successfully`,
        );
        studentStore.loadStudents();  // Aquí se carga la lista de estudiantes actualizada
        emit('hide');  // Cierra el modal o formulario después de guardar
    }
};


</script>

<template>
    <Slider
        :show="show"
        :title="title"
        @hide="emit('hide')"
    >
        <AuthorizationFallback :permissions="requiredPermissions">
            <div class="mt-4 space-y-4">
                <!-- Campo para el nombre -->
                <div>
                    <FormInput
                        v-model="formData.nombre"
                        :focus="show"
                        label="Nombre"
                        required
                    />
                    <FormLabelError v-if="formErrors?.nombre" :error="formErrors.nombre" />
                </div>

                <!-- Campo para el apellido -->
                <div>
                    <FormInput
                        v-model="formData.apellido"
                        label="Apellido"
                        required
                    />
                    <FormLabelError v-if="formErrors?.apellido" :error="formErrors.apellido" />
                </div>

                <!-- Campo para el email -->
                <div>
                    <FormInput
                        v-model="formData.email"
                        label="Email"
                        required
                    />
                    <FormLabelError v-if="formErrors?.email" :error="formErrors.email" />
                </div>

                <!-- Botón para enviar el formulario -->
                <Button
                    :title="props.student?.id ? 'Update' : 'Create'"
                    key="submit-btn"
                    :loading-title="props.student?.id ? 'Updating...' : 'Creating...'"
                    class="!w-full"
                    :loading="saving || updating"
                    @click="onSubmit"
                />
            </div>
        </AuthorizationFallback>
    </Slider>
</template>


