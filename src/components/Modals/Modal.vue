<template>
    <div ref="modal" v-if="showModal">
        <div class="backdrop">
            <div class="modal">
                <div class="modal__header">
                    <h3 class="modal__title">
                        <slot name="title" />
                    </h3>
                    <svg class="close-button" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" color="#4b5563" viewBox="0 0 14 14" @click="closeModal">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </div>
                <div class="modal__content">
                    <slot name="content" />
                </div>
                <div class="modal__actions">
                    <slot name="actions">
                        <button @click="closeModal" type="button">
                            <slot name="cancelButton"></slot>
                        </button>
                        <button @click="saveAction" type="button">
                            <slot name="saveButton"></slot>
                        </button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
interface Props {
    showModal: boolean;
}

withDefaults(defineProps<Props>(), {
    showModal: false,
});

const emit = defineEmits(['closeModal', 'saveAction'])

const closeModal = () => {
    emit('closeModal')
}

const saveAction = () => {
    emit('saveAction');
}
</script>

<style lang="scss" scoped>
.modal {
    position: absolute;
    top: 50%;
    left: 50%;
    
    padding: 20px;
    border-radius: 6px;
    
    background-color: #F8F9FA;

    transform: translate(-50%, -50%);

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #494F62;

        .close-button {
            width: 20px;
            height: 20px;
            cursor: pointer;
        }
    }

    &__title {
        margin: 0px;
        font-size: 30px;
    }

    &__content {
        margin-top: 30px;
    }

    &__actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 30px;
    }
}

.backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}
</style>
