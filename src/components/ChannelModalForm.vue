<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white p-6 rounded shadow-lg w-140 h-140">
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
      <div class="p-4 pt-16 space-y-16">
        <div class="space-x-4 items-start">
          <label for="keyboardType" class="mr-2 text-gray-700 font-bold mb-2"
            >Выберите тип клавиатуры:</label
          >
          <select
            v-model="selectedkeyboardType"
            class="border rounded p-2 mb-2"
          >
            <option
              v-for="(type, index) in keyboardType"
              :key="index"
              :value="type"
            >
              {{ type }}
            </option>
          </select>
        </div>

        <div class="flex space-x-4 items-center">
          <label for="buttonText" class="mr-2 text-gray-700 font-bold mb-2"
            >Текст кнопки:</label
          >
          <input
            type="text"
            v-model="buttonText"
            class="p-2 border border-gray-300 rounded"
          />
          <label for="buttonType" class="mr-2 text-gray-700 font-bold mb-2"
            >Выберите тип кнопки:</label
          >
          <select v-model="selectedButtonType" class="border rounded p-2 mb-2">
            <option
              v-for="(type, index) in supportedButtonTypes"
              :key="index"
              :value="type"
            >
              {{ type }}
            </option>
          </select>
          <button
            @click="addButton"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Добавить кнопку
          </button>
        </div>
      </div>
      <div class="flex flex-row gap-[20px]">
        <button
          @click="sendForm"
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
      <h2 class="text-2xl text-red-700 font-bold mb-4">Ваши кнопки:</h2>
      <div v-for="(buttonList, keyboardType) in buttons" :key="keyboardType">
        <h3 class="text-2xl text-red-700 font-bold mb-4">
          Тип клавиатуры: {{ keyboardType }}:
        </h3>
        <div v-for="(button, index) in buttonList" :key="index" class="mb-2">
          <button
            :class="
              button.type === 'LINK'
                ? 'bg-blue-500 text-white px-4 py-2 rounded'
                : 'bg-gray-300 text-black px-4 py-2 rounded'
            "
          >
            {{ button.content }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChannelStore } from "@/stores/company";
import type { IChannel, IMessage } from "@/stores/types/types";
import { computed, ref, type Ref } from "vue";
import { getMaxMessageLengthByChannel } from "@/utils";
import { getSupportedButtonTypes } from "@/utils";
import { isButtonAddable } from "@/utils";
import { calculateMaxButtons } from "@/utils";

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

const keyboardType = computed(() => ["DEFAULT", "INLINE"]);
const selectedkeyboardType = ref("");

const buttonText = ref("");
const buttonType = computed(() => ["LINK", "TEXT"]);
const selectedButtonType = ref("");

interface Button {
  content: string;
  type: string;
}
type ButtonsDict = Record<string, Button[]>;

const buttons = ref<ButtonsDict>({});

const supportedButtonTypes = computed(() => {
  if (props.channels) {
    const selectedChannel = props.channels.find(
      (channel) => channel.id === selectedChannelId.value
    );
    if (selectedChannel) {
      const channelType = selectedChannel.app_name;
      const keyboardType = selectedkeyboardType.value;
      return getSupportedButtonTypes(channelType, keyboardType);
    }
  }
});

const addButton = () => {
  if (props.channels) {
    const selectedChannel = props.channels.find(
      (channel) => channel.id === selectedChannelId.value
    );
    if (selectedChannel) {
      const maxButtons = calculateMaxButtons(
        selectedChannel.app_name,
        selectedkeyboardType.value,
        selectedButtonType.value
      );
      // Создаем новый массив для выбранного типа клавиатуры, если он еще не существует
      if (!buttons.value[selectedkeyboardType.value]) {
        buttons.value[selectedkeyboardType.value] = [];
      }

      if (
        buttons.value[selectedkeyboardType.value].length >= <number>maxButtons
      ) {
        error.value = "Ошибка: Недопустимое количество кнопок.";
        return;
      }
    }

    if (
      selectedChannel &&
      isButtonAddable(
        selectedChannel.app_name,
        selectedkeyboardType.value,
        selectedButtonType.value,
        buttonText.value
      )
    ) {
      const newButton = {
        content: buttonText.value,
        type: selectedButtonType.value,
      };
      buttons.value[selectedkeyboardType.value].push(newButton);
      buttonText.value = "";
      selectedButtonType.value = "";
    } else {
      error.value = "Ошибка: Слишком длинное название кнопки.";
    }
  }
};

const sendForm = async () => {
  if (props.channels) {
    const selectedChannel = props.channels.find(
      (channel) => channel.id === selectedChannelId.value
    );

    let maxMessageLength = 4096;

    if (selectedChannel) {
      maxMessageLength = getMaxMessageLengthByChannel(selectedChannel.app_name);
    }

    if (messageText.value.length <= maxMessageLength) {
      const channel_id = selectedChannelId.value;
      const text = messageText.value;
      const keyboardType = selectedkeyboardType.value;
      const buttonsList = Object.values(buttons.value).flat();
      await channelsStore
        .createChannelForm(channel_id, text, keyboardType, buttons.value)
        .catch((err) => {
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
