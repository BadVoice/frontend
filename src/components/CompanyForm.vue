<template>
  <div class="flex items-center justify-center h-screen">
    <form @submit.prevent="sendCompanyTitle" class="max-w-sm mx-auto my-4">
      <label for="title" class="block text-gray-700 text-sm font-bold mb-2"
        >Название компании:</label
      >
      <input
        type="text"
        id="title"
        v-model="companyName"
        required
        class="w-full border py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Создать компанию
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCompanyStore } from "../stores/company";
import { useRouter } from "vue-router";

const companyName = ref("");
const router = useRouter();
const companyStore = useCompanyStore();

const sendCompanyTitle = async () => {
  await companyStore.setCompanyData(companyName.value);
  router.push(`/companies/${companyStore.companyId}`);
};
</script>
