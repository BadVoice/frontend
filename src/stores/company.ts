import { ref } from "vue";
import { defineStore } from "pinia";

import { createCompany } from "@/services/api/company/companyAPI";

export const useCompanyStore = defineStore("companyName", () => {
  const companyName = ref("" as string);
  const companyId = ref(0 as number);

  async function setCompanyName(name: string) {
    const response = await createCompany(name);
    companyId.value = response.id;

    return response;
  }

  return { companyName, companyId, setCompanyName };
});
