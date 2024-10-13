<script setup>
import Table from '../../components/table/Table.vue';
import THead from '../../components/table/THead.vue';
import TBody from '../../components/table/TBody.vue';
import Tr from '../../components/table/Tr.vue';
import Th from '../../components/table/Th.vue';
import Td from '../../components/table/Td.vue';
import CreateButton from '../../components/ui/CreateButton.vue';
import EditButton from '../../components/ui/EditButton.vue';
import DeleteButton from '../../components/ui/DeleteButton.vue';
import AuthorizationFallback from '../../components/page/AuthorizationFallback.vue';
import EstudianteSlider from '../../components/page/Estudiante/EstudianteSlider.vue';

import useStudentsStore from '../../store/Estudiante/useStudentStore';
import useRoleStore from '../../store/useRoleStore';

import useSlider from '../../composables/useSlider';
import useModalToast from '../../composables/useModalToast';
import useHttpRequest from '../../composables/useHttpRequest';

const userStore = useStudentsStore();
const roleStore = useRoleStore();

if (!userStore.students?.length) await userStore.loadStudents();
if (!roleStore.roles?.length) await roleStore.loadRoles();

const { slider, sliderData, showSlider, hideSlider } = useSlider('user-crud');
const { showConfirmModal, showToast } = useModalToast();
const { destroy: deleteUser, deleting } = useHttpRequest('/users');

const onDelete = (user) => {
    if (deleting.value) return;

    showConfirmModal(null, async (confirmed) => {
        if (!confirmed) return;

        const isDeleted = await deleteUser(user?.id);
        if (isDeleted) {
            showToast(`"${user?.name}" deleted successfully...`);
            userStore.loadStudents();
        }
    });
};
</script>

<template>
    <AuthorizationFallback :permissions="['students-all', 'students-view']">
        <div class="w-full space-y-4 py-6">
            <div class="flex-between">
                <h2 class="text-active font-bold text-2xl">Estudiantes</h2>

                <CreateButton @click="showSlider(true)" />
            </div>

            <div class="w-full">
                <Table>
                    <THead>
                        <Tr>
                            <Th> Id </Th>
                            <Th> Nombre </Th>
                            <Th> Apellido Paterno </Th>
                            <Th> Apellido Materno </Th>
                            <Th> Dni </Th>
                            <Th> Action </Th>
                        </Tr>
                    </THead>

                    <TBody>
                        <Tr
                            v-for="user in userStore.students"
                            :key="user.id"
                        >
                            <Td>{{ user?.id }}</Td>
                            <Td>
                                <div
                                    class="text-emerald-500 dark:text-emerald-200"
                                >
                                    {{ user?.name }}
                                </div>
                                <div class="text-xsm text-[#aaa]">
                                    {{ user?.email }}
                                </div>
                            </Td>

                            <Td>
                                <div
                                    class="text-emerald-500 dark:text-emerald-200"
                                >
                                    {{ user?.apellido_paterno }}
                                </div>
                                
                            </Td>

                            <Td>
                                <div
                                    class="text-emerald-500 dark:text-emerald-200"
                                >
                                    {{ user?.apellido_materno }}
                                </div>
                                
                            </Td>

                            <Td>
                                <div
                                    class="text-emerald-500 dark:text-emerald-200"
                                >
                                    {{ user?.dni }}
                                </div>
                                
                            </Td>
                            
                            <Td class="align-middle">
                                <div class="flex flex-col gap-2">
                                    <EditButton
                                        @click="showSlider(true, user)"
                                    />
                                    <DeleteButton @click="onDelete(user)" />
                                </div>
                            </Td>
                        </Tr>
                    </TBody>
                </Table>
            </div>
        </div>

        <EstudianteSlider
            :show="slider"
            :user="sliderData"
            @hide="hideSlider"
        />
    </AuthorizationFallback>
</template>
