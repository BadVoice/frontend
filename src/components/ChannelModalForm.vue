<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    @click.self=""
  >
    <div class="bg-white p-6 rounded shadow-lg w-96">
      <h2 class="text-xl font-bold mb-4">Настройка сообщения</h2>
      <p class="text-1xl font-bold text-red-500" v-if="error">{{ error }}</p>
      <div class="mb-4">
        <label for="channel" class="block text-gray-700 font-bold mb-2"
          >Выберите канал:</label
        >
        <select
          v-model="selectedChannelId"
          name="channel"
          id="channel"
          class="block w-full bg-white border border-gray-300 rounded px-3 py-2"
        >
          <option
            v-for="channel in channels"
            :value="channel.id"
            :key="channel.id"
          >
            {{ channel.app_name }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label for="message" class="block text-gray-700 font-bold mb-2"
          >Сообщение:</label
        >
        <textarea
          v-model="messageText"
          name="message"
          id="message"
          class="block w-full bg-white border border-gray-300 rounded px-3 py-2"
        ></textarea>
      </div>
      <div class="flex flex-row gap-[20px]">
        <button
          @click="addMessage"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Сохранить сообщение
        </button>

        <button
          @click="closeModal"
          class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Закрыть
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChannelStore } from "@/stores/company";
import type { IChannel, IMessage } from "@/stores/types/types";
import { ref, type Ref } from "vue";
const emits = defineEmits(["closeModal"]);

const closeModal = () => {
  emits("closeModal");
};

const props = defineProps({
  channelId: Number,
  channels: Array as () => IChannel[],
});

const channelsStore = useChannelStore();
const error = ref("");
const selectedChannelId = ref(0 as number);
const messageText: Ref<string> = ref("");

const addMessage = async () => {
  if (props.channels) {
    const selectedChannel = props.channels.find(
      (channel) => channel.id === selectedChannelId.value
    );

    let maxMessageLength = 4096;

    if (selectedChannel) {
      if (selectedChannel.app_name === "Telegram") {
        maxMessageLength = 4096;
      } else if (selectedChannel.app_name === "Vkontakte") {
        maxMessageLength = 4096;
      } else if (selectedChannel.app_name === "WhatsApp") {
        maxMessageLength = 1000;
      }
    }

    if (messageText.value.length <= maxMessageLength) {
      const channel_id = selectedChannelId.value;
      const text = messageText.value;
      await channelsStore.createChannelForm(channel_id, text).catch((err) => {
        if (err.response && err.response.status === 400) {
          error.value = "Ошибка: Вы ввели слишком большое сообщение.";
        }
      });
    } else {
      error.value = "Ошибка: Вы ввели слишком большое сообщение.";

      console.error("Ошибка при создании сообщения:", error);
    }
  }
};
</script>
