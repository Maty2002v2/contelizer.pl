<template>
    <div v-if="pagination?.pages" class="pagination">
        <div :class="{'pagination__block': true, 'pagination__block--disabled': !canChangePackage.prev}" @click="changePackage(-1)">
            <ChevronsLeft :size="15"/>
        </div>
        <div 
            v-for="page in paginationBlocks" 
            :key="page" 
            :class="{'pagination__block': true, 'pagination__block--active': page === pagination.currentPage}"
            @click="setPage(page)"
        >{{ page }}</div>
        <div 
            :class="{
                'pagination__block pagination__block--last': true, 
                'pagination__block--disabled': !canChangePackage.next}" @click="changePackage(1)">
            <ChevronsRight :size="15"/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, watch } from 'vue';
import { ChevronsLeft, ChevronsRight } from 'lucide-vue-next';
import { PaginationConfig } from '../types';
import{ usePagination } from '../composables/usePagination';

const props = withDefaults(defineProps<PaginationConfig>(), {
    currentPage: 1,
    pageSize: 10,
    maxPages: 20,
});

watch(props, (newProps) => {
    const { totalItems, currentPage, pageSize, maxPages } = newProps;
    paginate(totalItems, currentPage, pageSize, maxPages);
    emit('setPaginate', pagination.value);
}, { deep: true})

const emit = defineEmits(['setPaginate']);

const { 
    pagination, 
    paginationBlocks, 
    canChangePackage, 
    paginate,
    changePackage,
} = usePagination(3);

const setPage = (number: number) => {
    const { totalItems, pageSize, maxPages } = props;
    paginate(totalItems, number, pageSize, maxPages);
    
    emit('setPaginate', pagination.value);
}

onMounted(() => {
    const { totalItems, currentPage, pageSize, maxPages } = props;
    paginate(totalItems, currentPage, pageSize, maxPages);
    emit('setPaginate', pagination.value);
})
</script>

<style lang="scss" scoped>
.pagination {
    display: flex;
    font-size: 15px;
    width: fit-content;
    border: 1px solid #E8EBEE;
    border-radius: 6px;

    &__block {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        padding: 5px;
        border-left: 1px solid #E8EBEE;
        box-sizing: border-box;

        color: #646cff;

        background-color: #fff;

        cursor: pointer;

        &--last {
            border-right: 1px solid #E8EBEE;
        }

        &--active {
            color: #fff;
            background-color: #646cff;
        }

        &--disabled {
            color: #000;
            cursor: default;
        }
    }
}
</style>
