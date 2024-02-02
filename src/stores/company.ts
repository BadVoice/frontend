import { ref } from "vue";
import { defineStore } from "pinia";

import {
  createCompanyService,
  getCompanyService,
} from "@/services/api/company/companyAPI";

export const useCompanyStore = defineStore("companyName", () => {
  const companyName = ref("" as string);
  const companyId = ref(0 as number);

  async function setCompanyData(name: string) {
    const response = await createCompanyService(name);
    companyId.value = response.id;

    return response;
  }

  async function getCompanyData(id: number) {
    const response = await getCompanyService(id);
    companyId.value = response.id;
    companyName.value = response.name;
    return response;
  }

  return { companyName, companyId, setCompanyData, getCompanyData };
});
