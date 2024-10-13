<script setup>
// archivo Especialidades
import Table from "../../components/table/Table.vue";
import THead from "../../components/table/THead.vue";
import TBody from "../../components/table/TBody.vue";
import Tr from "../../components/table/Tr.vue";
import Th from "../../components/table/Th.vue";
import Td from "../../components/table/Td.vue";
import CreateButton from "../../components/ui/CreateButton.vue";
import EditButton from "../../components/ui/EditButton.vue";
import DeleteButton from "../../components/ui/DeleteButton.vue";
import AuthorizationFallback from "../../components/page/AuthorizationFallback.vue";
import SpecialtySlider from "../../components/page/Especialidad/EspecialidadSlider.vue";

import useSpecialtyStore from "../../store/Especialidad/useEspecialidadStore";
import useSlider from "../../composables/useSlider";
import useModalToast from "../../composables/useModalToast";
import useHttpRequest from "../../composables/useHttpRequest";

import useRoleStore from "../../store/useRoleStore";
import useUserStore from "../../store/useUserStore";
import useAuth from "../../composables/useAuth";

const userStore = useUserStore();
const roleStore = useRoleStore();
const specialtiesStore = useSpecialtyStore();

// specialtyStore.specialties.especialidades

if (!specialtiesStore.specialties.length) await specialtiesStore.loadSpecialties();

const { slider, sliderData, showSlider, hideSlider } = useSlider("specialty-crud");
const { showConfirmModal, showToast } = useModalToast();
const { destroy: deleteSpecialy, deleting } = useHttpRequest("/especialidad");
const { isUserAuthenticated } = useAuth();

const onDelete = (specialty) => {
  if (deleting.value) return;

  showConfirmModal(null, async (confirmed) => {
    if (!confirmed) return;

    const isDeleted = await deleteSpecialy(specialty?.id_especialidad);
    console.log("pasod eleinar  cosmlas: ", isDeleted);
    if (isDeleted) {
      showToast(`Specialty "${specialty?.nombre_especialidad}" deleted successfully...`);
      specialtiesStore.loadSpecialties();
      userStore.loadUsers();
      roleStore.loadRoles();
      isUserAuthenticated();
    }
  });
};
</script>

<template>
  <AuthorizationFallback :permissions="['specialties-all', 'specialties-view']">
    <div class="w-full space-y-4 py-6">
      <div class="flex-between">
        <h2 class="text-active font-bold text-2xl">Specialties</h2>

        <CreateButton @click="showSlider(true)" />
      </div>

      <div class="w-full">
        <Table>
          <THead>
            <Tr>
              <Th> Id </Th>
              <Th> Specialties </Th>
              <Th> Action </Th>
            </Tr>
          </THead>

          <TBody>
            <Tr
              v-for="specialty in specialtiesStore.specialties"
              :key="specialty.id_especialidad"
            >
              <Td>{{ specialty?.id_especialidad }}</Td>
              <Td>
                <div class="text-emerald-500 dark:text-emerald-200">
                  {{ specialty?.nombre_especialidad }}
                </div>
              </Td>

              <Td class="align-middle">
                <div class="flex flex-col gap-2">
                  <EditButton @click="showSlider(true, specialty)" />
                  <DeleteButton @click="onDelete(specialty)" />
                </div>
              </Td>
            </Tr>
          </TBody>
        </Table>
      </div>
    </div>

    <SpecialtySlider :show="slider" :specialty="sliderData" @hide="hideSlider" />
  </AuthorizationFallback>
</template>
