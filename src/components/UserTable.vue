<template>
    <div v-if="users.length" class="wrapper">
        <div class="search">
            <input type="text" v-model="search" class="search__input" placeholder="Search for users...">
            <Search class="search__icon" color="#828691" />
        </div>

        <div class="table">
            <div class="table_row">
                <div class="table_header table__cell">Name</div>
                <div class="table_header table__cell">Email</div>
                <div class="table_header table__cell">Gender</div>
                <div class="table_header table__cell">Status</div>
                <div class="table_header table__cell">Actions</div>
            </div>

            <div v-for="user in filteredUsers.slice(pagination?.startIndex, pagination?.endIndex + 1)" :key="user.id" class="table_row">
                <div class="table__cell">{{ user.name }}</div>
                <div class="table__cell">{{ user.email }}</div>
                <div class="table__cell">{{ user.gender }}</div>
                <div class="table__cell"><span :class="{dot: true, 'dot--active': user.status === 'active'}"></span></div>
                <div class="table__cell table__actions">
                    <FilePenLine class="table__icon" color="#ABB2BA" @click="editAction(user)"/>
                    <Trash class="table__icon" color="#ABB2BA"/>
                </div>
            </div>
        </div>

        <Pagination :totalItems="filteredUsers.length" :pageSize="numberOfRecords" @setPaginate="(paginationOptions) => pagination = paginationOptions"/>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { refDebounced } from '@vueuse/core';
import { Search, FilePenLine, Trash } from 'lucide-vue-next';
import Pagination from './Pagination.vue';
import { useEditUserModal } from '../composables/Modals/useEditUserModal';
import type { User, Pagination as PaginationOptions } from '../types';

const props = defineProps<{
    users: User[],
    numberOfRecords: number
}>();

const search = ref<string | undefined>();
const searchDebounced = refDebounced(search, 500);

const pagination = ref<PaginationOptions | undefined>();

const filteredUsers = computed(() => {
    const searchedUsers = searchDebounced.value ? props.users.filter((user) => user.name.toLowerCase().includes(searchDebounced.value.toLowerCase())) : props.users;

    return searchedUsers;
});

const { openEditUserModal } = useEditUserModal();
const editAction = (user: User) => {
    openEditUserModal(user);
}
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin: 0px 10px;
    padding: 20px;
    // box-shadow: ;
    border-radius: 6px;
    background-color: #FFFFFFDE;
    
    @include breakpoint(md) {
        width: 1135px;
        max-width: 95vw;
        margin: 0;
    }
}

.search {
    position: relative;
    width: 300px;

    &__input {
        width: 100%;
        padding: 10px;
        border: none;;
        border-radius: 6px;
        color: #828691;
        background-color: #F8F9FA;
        box-sizing: border-box;
    }

    &__icon {
        position: absolute;
        top: 50%;
        right: 20px;
        width: 20px;
        height: 20px;
        transform: translate(-50%, -50%);
    }
}

.table {
    color: #494F62;
    max-width: 100vw;
    overflow-x: scroll;

    @include breakpoint(md) {
        max-width: unset;
    }
    
    &_row {
        display: grid;
        grid-template-columns: 200px 400px 70px 70px 100px;
        text-align: start;
        
        @include breakpoint(md) {
            grid-template-columns: 2fr 3fr 1fr 1fr 1fr; 
            gap: 40px;
        }

        &:nth-child(even) {
            background-color: #F8F9FA;
        }
    }

    &_header {
        font-weight: 700;
    }

    &__cell {
        display: flex;
        align-items: center;
        padding: 10px;
        background-color: inherit;
    }

    &__actions {
        display: flex;
        gap: 10px;
    }

    &__icon {
        cursor: pointer;
        width: 20px;
        height: 20px;
    }
}

.dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #c92016;

    &--active {
        background-color: #7ddf64;
    }
}
</style>
