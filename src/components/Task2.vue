<template>
    <div>
        <h3>Provide your pesel number</h3>

        <input type="text" v-model="pesel">
        <button @click="validation(pesel)">check</button>

        <h4 v-show="peselIsValid !== null">Pesel is {{ peselIsValid ? 'valid' : 'invalid' }}</h4>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useCheckPesel } from '../composables/useCheckPesel';

const { peselIsValid, validation } = useCheckPesel();

const pesel = ref<string | undefined>();
</script>
