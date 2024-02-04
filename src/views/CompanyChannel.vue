<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-600"
  >
    <div class="max-w-2xl p-6 bg-white rounded-lg shadow-xl">
      <div v-for="channel in channels" :key="channel.id" class="mb-6">
        <div class="bg-gray-200 p-4 rounded-lg">
          <p class="text-lg font-semibold">
            Название канала: {{ channel.channel_name }}
          </p>
          <p>ID компании: {{ channel.company_id }}</p>
          <p>Messager: {{ channel.app_name }}</p>
          <div
            v-for="message in channel.messages"
            :key="message.id"
            class="mt-4"
          >
            <div class="bg-gray-300 p-4 rounded-lg">
              <p class="font-semibold">ID сообщения: {{ message.id }}</p>
              <p>Текст: {{ message.text }}</p>
              <p>ID канала в сообщении: {{ message.channel_id }}</p>
              <div
                v-for="keyboard in message.keyboards"
                :key="keyboard.id"
                class="mt-2"
              >
                <div class="bg-gray-400 p-4 rounded-lg">
                  <p class="font-semibold">ID клавиатуры: {{ keyboard.id }}</p>
                  <p>Тип клавиатуры: {{ keyboard.type }}</p>
                  <p>ID сообщения в клавиатуре: {{ keyboard.message_id }}</p>
                  <div
                    v-for="button in keyboard.buttons"
                    :key="button.id"
                    class="mt-2"
                  >
                    <div class="bg-gray-500 p-4 rounded-lg">
                      <p class="font-semibold">ID кнопки: {{ button.id }}</p>
                      <p>Содержание кнопки: {{ button.content }}</p>
                      <p>Тип кнопки: {{ button.type }}</p>
                      <p>ID клавиатуры в кнопке: {{ button.keyboard_id }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCompanyStore } from "@/stores/company";
import type { IChannel } from "@/stores/types/types";

const companyStore = useCompanyStore();

const route = useRoute();
const companyId = ref(0);
const channelId = ref(0);
const channels = ref<IChannel[]>([]);

onMounted(async () => {
  const company_id = parseInt(route.params.id as string, 10);
  const channel_id = Number(route.params.channelId);

  companyId.value = company_id;
  channelId.value = channel_id;
  const response = await companyStore.getChannelData(
    companyId.value,
    channelId.value
  );
  channels.value = response.channels;
  console.log(response.channels);
});
</script>
