<script setup>
import Table from '../components/table/Table.vue';
import THead from '../components/table/THead.vue';
import TBody from '../components/table/TBody.vue';
import Tr from '../components/table/Tr.vue';
import Th from '../components/table/Th.vue';
import Td from '../components/table/Td.vue';
import CreateButton from '../components/ui/CreateButton.vue';
import EditButton from '../components/ui/EditButton.vue';
import DeleteButton from '../components/ui/DeleteButton.vue';
import AuthorizationFallback from '../components/page/AuthorizationFallback.vue';
import StudentSlider from '../components/page/StudentSlider.vue';

import useStudentStore from '../store/useStudentStore';
import useSlider from '../composables/useSlider';
import useModalToast from '../composables/useModalToast';
import useHttpRequest from '../composables/useHttpRequest';

const studentStore = useStudentStore();

if (!studentStore.students?.length) await studentStore.loadStudents();

const { slider, sliderData, showSlider, hideSlider } = useSlider('student-crud');
const { showConfirmModal, showToast } = useModalToast();
const { destroy: deleteStudent, deleting } = useHttpRequest('/students');

const onDelete = (student) => {
    if (deleting.value) return;

    showConfirmModal(null, async (confirmed) => {
        if (!confirmed) return;

        const isDeleted = await deleteStudent(student?.id);
        if (isDeleted) {
            showToast(`"${student?.name}" deleted successfully...`);
            studentStore.loadStudents();
        }
    });
};
</script>

<template>
    <AuthorizationFallback :permissions="['students-all', 'students-view']">
        <div class="w-full space-y-4 py-6">
            <div class="flex-between">
                <h2 class="text-active font-bold text-2xl">Students</h2>

                <CreateButton @click="showSlider(true)" />
            </div>

            <div class="w-full">
                <Table>
                    <THead>
                        <Tr>
                            <Th> Id </Th>
                            <Th> Nombre </Th>
                            <Th> Apellido </Th>
                            <Th> Email </Th>
                            <Th> Action </Th>
                        </Tr>
                    </THead>

                    <TBody>
                        <Tr
                            v-for="student in studentStore.students"
                            :key="student.id"
                        >
                            <Td>{{ student?.id }}</Td>
                            <Td>
                              <div
                                    class="text-emerald-500 dark:text-emerald-200"
                                >
                                    {{ student?.nombre }}
                                </div>
                            </Td>
                            <Td>
                              <div
                                    class="text-emerald-500 dark:text-emerald-200"
                                >
                                    {{ student?.apellido }}
                                </div>
                            </Td>
                            <Td>
                                
                                <div class="text-xsm text-[#aaa]">
                                    {{ student?.email }}
                                </div>
                            </Td>
                            <Td class="align-middle">
                                <div class="flex flex-col gap-2">
                                    <EditButton
                                        @click="showSlider(true, student)"
                                    />
                                    <DeleteButton @click="onDelete(student)" />
                                </div>
                            </Td>
                        </Tr>
                    </TBody>
                </Table>
            </div>
        </div>

        <StudentSlider
            :show="slider"
            :student="sliderData"
            @hide="hideSlider"
        />
    </AuthorizationFallback>
</template>
