<script setup>
// archivo programSlider.vue
import { computed, ref, watch } from "vue";
import Slider from "../../ui/Slider.vue";
import FormInput from "../../ui/FormInput.vue";
import FormLabelError from "../../ui/FormLabelError.vue";
import VSelect from "vue-select";
import Button from "../../ui/Button.vue";
import AuthorizationFallback from "../../../components/page/AuthorizationFallback.vue";

import useUserStore from "../../../store/useUserStore";
import useRoleStore from "../../../store/useRoleStore";

import useGroupsStore from "../../../store/Grupo/useGrupoStore";

import useValidation from "../../../composables/useValidation";
import useHttpRequest from "../../../composables/useHttpRequest";
import useModalToast from "../../../composables/useModalToast";
import useAuth from "../../../composables/useAuth";
import * as yup from "yup";

// Props que recibe el componente
const props = defineProps({
  show: {
    type: Boolean,
    default: () => false,
  },
  group: {
    type: [Object, null],
    default: () => null,
  },
  sedeId: {
    type: Number,
    default: null,
  },
  turnoId: {
    type: Number,
    default: null,
  },
  specialtyId: {
    type: Number,
    default: null,
  },
  planId: {
    type: Number,
    default: null,
  },
  docenteId: {
    type: Number,
    default: null,
  },
});

// Emitir eventos
const emit = defineEmits(["hide"]);

// Stores
const userStore = useUserStore();
const roleStore = useRoleStore();
const groupStore = useGroupsStore();

// Composables
const { store: createGroup, saving, update: updateGroup, updating } = useHttpRequest(
  "/grupo"
);
const { runYupValidation } = useValidation();
const { showToast } = useModalToast();
const { isUserAuthenticated } = useAuth();

// Computed para manejar permisos
const requiredSpecialties = computed(() => {
  if (!props.group?.id_grupo) return ["program-all", "program-create"];
  else return ["program-all", "program-edit"];
});

// Computed para el título
const title = computed(() =>
  props.group ? `Update group "${props.group?.nombre_grupo}"` : "Add new group"
);

console.log("Los id: ", props.planId, props.specialtyId);
// Inicialización del formulario
const initialFormData = () => ({
  nombre_grupo: null,
  id_sede: props.sedeId,
  id_turno: props.turnoId,
  id_especialidad: props.specialtyId,
  id_plan: props.planId,
  id_docente: props.docenteId,
});

// Variables reactivas para los datos del formulario y los errores
const formData = ref(initialFormData());
const formErrors = ref({});

// Función para restablecer el formulario al abrir el modal
watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      if (props.group?.id_grupo) {
        formData.value = { nombre_grupo: props.group.nombre_group };
      } else {
        formData.value = initialFormData();
        formErrors.value = {};
      }
    } else {
      formData.value = initialFormData();
      formErrors.value = {};
    }
  }
);

// Esquema de validación de Yup
const schema = yup.object().shape({
  nombre_grupo: yup
    .string()
    .nullable()
    .required("El nombre de la grupo es obligatorio"),
});

// Función para manejar el envío del formulario
const onSubmit = async () => {
  // Evitar múltiples envíos
  if (saving.value || updating.value) return;

  const data = { ...formData.value };

  // Validar el formulario con Yup
  const { validated, errors } = await runYupValidation(schema, data);
  if (!validated) {
    formErrors.value = errors; // Mostrar los errores
    return;
  }
  formErrors.value = {}; // Limpiar los errores

  // Crear o actualizar la program
  const response = props.group?.id_grupo
    ? await updateGroup(props.group?.id_grupo, data)
    : await createGroup(data);

  // Si la respuesta es exitosa

  console.log("response fro: ", response.grupo?.id_grupo);

  if (response.grupo?.id_grupo) {
    showToast(
      `grupo ${props.group?.id_grupo ? "updated" : "created"} successfully`
    );

    // Cargar datos actualizados en las tiendas
    groupStore.loadGroups(props.idSede, props.idTurno, props.idEspecialidad, props.idPlan, props.idDocente);
    userStore.loadUsers();
    roleStore.loadRoles();
    isUserAuthenticated();

    // Cerrar el modal
    emit("hide");
  } else {
    showToast("Error al guardar el grupo. Inténtalo de nuevo.", "error");
  }
};
</script>

<template>
  <Slider :show="show" :title="title" @hide="emit('hide')">
    <AuthorizationFallback :permissions="requiredSpecialties">
      <div class="mt-4 space-y-4">
        <FormInput
          v-model="formData.nombre_grupo"
          :focus="show"
          label="Nombre del gruopo"
          :error="formErrors?.nombre_grupo"
          required
        />

        <FormInput
          v-model="formData.id_sede"
          :focus="show"
          label="Sede"
          :error="formErrors?.id_sede"
          required
        />

        <FormInput
          v-model="formData.id_turno"
          :focus="show"
          label="Turno"
          :error="formErrors?.id_turno"
          required
        />

        <FormInput
          v-model="formData.id_especialidad"
          :focus="show"
          label="Especialidad"
          :error="formErrors?.id_especialidad"
          required
        />

        <FormInput
          v-model="formData.id_plan"
          :focus="show"
          label="Plan"
          :error="formErrors?.id_plan"
          required
        />

        <FormInput
          v-model="formData.id_docente"
          :focus="show"
          label="Docente"
          :error="formErrors?.id_docente"
          required
        />

        <Button
          :title="group?.id_grupo ? 'Save' : 'Create'"
          :loading-title="group?.id_grupo ? 'Saving...' : 'Creating...'"
          class="!w-full"
          :loading="saving || updating"
          key="submit-btn"
          @click="onSubmit"
        />
      </div>
    </AuthorizationFallback>
  </Slider>
</template>
