<template>
    <div>
        <UserTable :users="users" :numberOfRecords="4"/>

        <EditUserModal />
    </div>
</template>

<script lang="ts" setup>
import UserTable from '../components/UserTable.vue';
import EditUserModal from '../components/Modals/EditUser.vue';
import { useServiceApi } from '../composables/useGorestApi';

const { users, getUsers } = useServiceApi();

getUsers();
</script>
