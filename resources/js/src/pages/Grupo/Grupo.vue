<script setup>
// Importa useRouter de Vue Router
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import Table from "../../components/table/Table.vue";
import THead from "../../components/table/THead.vue";
import TBody from "../../components/table/TBody.vue";
import Tr from "../../components/table/Tr.vue";
import Th from "../../components/table/Th.vue";
import Td from "../../components/table/Td.vue";
import CreateButton from "../../components/ui/CreateButton.vue";
import EditButton from "../../components/ui/EditButton.vue";
import DeleteButton from "../../components/ui/DeleteButton.vue";
import ViewButton from "../../components/ui/ViewButton.vue";
import AuthorizationFallback from "../../components/page/AuthorizationFallback.vue";

import useGroupsStore from "../../store/Grupo/useGrupoStore";

import useSlider from "../../composables/useSlider";
import useModalToast from "../../composables/useModalToast";
import useHttpRequest from "../../composables/useHttpRequest";

import useRoleStore from "../../store/useRoleStore";
import useUserStore from "../../store/useUserStore";
import useAuth from "../../composables/useAuth";
import GrupoSlider from "../../components/page/Grupo/GrupoSlider.vue";


const props = defineProps({
  idSede: {
    type: Number,
    default: null,
  },
  idTurno: {
    typeof: Number,
    default: null,
  },
  idEspecialidad: {
    typeof: Number,
    default: null,
  },
  idPlan: {
    typeof: Number,
    default: null,
  },
  idDocente: {
    typeof: Number,
    default: null,
  },
});

// Acceder al parámetro de la ruta

// Ahora puedes usar `idEspecialidad` en tu componente
//console.log("ruta s", props.idEspecialidad);

// Cargar la especialidad correspondiente cuando se monta el componente

const router = useRouter(); // Aquí es donde obtenemos el router

const userStore = useUserStore();
const roleStore = useRoleStore();
const groupStore = useGroupsStore();

if (!groupStore.groups.length)
  await groupStore.loadGroups(props.idSede, props.idTurno, props.idEspecialidad, props.idPlan, props.idDocente);

const { slider, sliderData, showSlider, hideSlider } = useSlider("group-crud");
const { showConfirmModal, showToast } = useModalToast();
const { destroy: deleteSpecialy, deleting } = useHttpRequest("/grupo");
const { isUserAuthenticated } = useAuth();

const onDelete = (group) => {
  if (deleting.value) return;

  showConfirmModal(null, async (confirmed) => {
    if (!confirmed) return;

    const isDeleted = await deleteSpecialy(group?.id_grupo);
    console.log("pasod eleinar  cosmlas: ", isDeleted);
    if (isDeleted) {
      showToast(`Grupo "${group?.nombre_grupo}" deleted successfully...`);
      groupStore.loadGroups(props.idSede, props.idTurno, props.idEspecialidad, props.idPlan, props.idDocente);
      userStore.loadUsers();
      roleStore.loadRoles();
      isUserAuthenticated();
    }
  });
};

const SeeMore = (id) => {
  router.push({
    name: "UnidadDidactica",
    params: { idPrograma: id },
  });
};

const SeeMoreExperiencia = (id) => {
  router.push({
    name: "ExperienciaFormativa",
    params: { idPrograma: id },
  });
};

// console.log("nuievos Programes: ", groupStore.Programs.programas);

//console.log("El nombre de la especialidad: ", specialtyStore.specialty);
</script>

<template>
  <AuthorizationFallback :permissions="['program-all', 'program-view']">
    <div class="w-full space-y-4 py-6">
      <div class="flex-between">
        <h2 class="text-active font-bold text-2xl">{{}} / Grupos</h2>
        <CreateButton @click="showSlider(true)" />
      </div>

      <div class="w-full">
        <Table>
          <THead>
            <Tr>
              <Th> Id </Th>
              <Th> Grupos </Th>
              <Th> Action </Th>
            </Tr>
          </THead>

          <TBody>
            <Tr
              v-for="grupo in groupStore.groups.grupo"
              :key="grupo.id_grupo"
            >
              <Td>{{ grupo?.id_grupo }}</Td>
              <Td>
                <div class="text-emerald-500 dark:text-emerald-200">
                  {{ grupo?.nombre_grupo }}
                </div>
              </Td>

              <Td class="align-middle">
                <div class="flex flex-row gap-2 justify-center items-center">
                  <ViewButton @click="SeeMore(grupo?.id_grupo)" />
                  <ViewButton @click="SeeMoreExperiencia(grupo?.id_grupo)" />
                  <EditButton @click="showSlider(true, grupo)" />
                  <DeleteButton @click="onDelete(grupo)" />
                </div>
              </Td>
            </Tr>
          </TBody>
        </Table>
      </div>
    </div>

    <GrupoSlider
      :sedeId="props.idSede"
      :turnoId="props.idTurno"
      :specialtyId="props.idEspecialidad"
      :planId="props.idPlan"
      :docenteId="props.idDocente"
      :show="slider"
      :group="sliderData"
      @hide="hideSlider"
    />
  </AuthorizationFallback>
</template>
