<template>
    <div class="edit-user-modal">
        <Modal :showModal="editUserModalState" @closeModal="closeEditUserModal" @saveAction="saveData">
            <template #title>
                Edit user
            </template>

            <template #content>
                <div class="row">
                    <label for="name">Name</label>
                    <input type="text" id="name" v-model="editUserData.name">
                </div>

                <div class="row">
                    <label for="email">Email</label>
                    <input type="text" id="email" v-model="editUserData.email">
                </div>

                <div class="row">
                    <label for="gender">Gender</label>
                    <select type="text" id="gender"v-model="editUserData.gender">
                        <option value="female">female</option>
                        <option value="male">male</option>
                    </select>
                </div>

                <p v-show="errorMessage" class="error-message">{{ errorMessage }}</p>
            </template>

            <template #cancelButton> 
                Cancel
            </template>

            <template #saveButton>
                Save
            </template>
        </Modal>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import Modal from './Modal.vue';
import { useEditUserModal } from '../../composables/Modals/useEditUserModal';
import { useServiceApi } from '../../composables/useGorestApi';

const { editUserData, editUserModalState, closeEditUserModal } = useEditUserModal();
watch(editUserModalState, (newValue) => {
    if (newValue) errorMessage.value = undefined;
})

const { editUser } = useServiceApi();

const saveData = async () => {
    if (!basicValidation()) return;

    await editUser(editUserData);
    closeEditUserModal();
}

const errorMessage = ref<string | undefined>();
const basicValidation = (): boolean => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(editUserData.email)) {
        errorMessage.value = "Invalid email";
        return false;
    };
    if (!editUserData.name.length) {
        errorMessage.value = "Empty name";
        return false;
    };

    return true;
}
</script>

<style lang="scss">
.edit-user-modal {
    .modal__content {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 500px;
        max-width: 80vw;
    }
}
</style>
<style lang="scss" scoped>
.row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    color: #494F62;

    input, select {
        width: 100%;
        height: 20px;
    }
}

.error-message {
    color: #c92016;
}
</style>
