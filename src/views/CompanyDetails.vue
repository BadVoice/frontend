<template>
  <div class="flex justify-center items-start h-screen">
    <div
      class="bg-gradient-to-t from-blue-200 to-green-200 rounded-lg p-8 w-[900px]"
    >
      <h1 class="text-3xl font-bold mb-4 text-center">
        Настройте каналы в компании
      </h1>
      <div v-if="companyName" class="mb-8 text-center">
        <h2 class="text-4xl">{{ companyName }}</h2>
        <!-- Другая информация о компании -->
      </div>
      <div v-else class="text-center">
        <p>Загрузка данных...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import { useRoute } from "vue-router";
import { useCompanyStore } from "@/stores/company";

const companyStore = useCompanyStore();
const companyName: Ref<string> = ref("");
const companyId: Ref<number> = ref(0);
const route = useRoute();

onMounted(async () => {
  const id = parseInt(route.params.id as string, 10);

  if (!isNaN(id)) {
    companyId.value = id;
    await companyStore.getCompanyData(companyId.value);
    companyId.value = companyStore.companyId;
    companyName.value = companyStore.companyName;
  }
});
</script>
