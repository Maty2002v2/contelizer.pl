import { ref, computed, watch } from 'vue';
import type { Pagination } from "../types";

export const usePagination = (limitStepsOfPackage: number = 10) => {
  
  let pagination = ref<Pagination>({
    totalItems: 0,
    currentPage: 1,
    pageSize: 0,
    totalPages: 0,
    startPage: 0,
    endPage: 0,
    startIndex: 0,
    endIndex: 0,
    pages: [],
    currentPackageIndex: 0
  });

  watch(() => pagination.value.pages, () => {
    if (paginationPackages.value.length < pagination.value.currentPackageIndex + 1) pagination.value.currentPackageIndex = 0;
  })

  const paginate = (
    totalItems: number,
    currentPage: number = 1,
    pageSize: number = 6,
    maxPages: number = 10
  ) => {
    const totalPages = Math.ceil(totalItems / pageSize);

    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= maxPages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
      const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = maxPages;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        startPage = totalPages - maxPages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    const pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
      (i) => startPage + i
    );

    pagination.value = {
      ...pagination.value,
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    }
  }

  const changePackage = (number: number) => {
    if(number > 0 && canChangePackage.value.next) {
        pagination.value.currentPackageIndex++;
        return;
    };

    if(number < 0 && canChangePackage.value.prev) pagination.value.currentPackageIndex--;
  }

  const paginationPackages = computed(() => {
    const packages = [];
    const { pages } = pagination.value;

    for (let i = 0; i < pages.length; i += limitStepsOfPackage) {
      const group = pages.slice(i, i + limitStepsOfPackage);
      packages.push(group);
    }

    return packages;
  });

  const paginationBlocks = computed(() => paginationPackages.value[pagination.value.currentPackageIndex]);

  const canChangePackage = computed(() => {
      const { currentPackageIndex } = pagination.value;
      return {
          next: currentPackageIndex + 1 < paginationPackages.value.length,
          prev: currentPackageIndex > 0
      }
  });

  return {
    pagination,
    paginationBlocks,
    canChangePackage,
    paginate,
    changePackage,
  };
};
