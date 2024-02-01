import { ref, computed } from "vue";
import { defineStore } from "pinia";

import { createCompany } from "@/services/api/company/companyAPI";

export const useCompanyStore = defineStore("companyName", () => {
  const companyName = ref("");

  async function setCompanyName(name: string) {
    companyName.value = name;
    await createCompany(name);
    console.log(name);
  }

  return { companyName, setCompanyName };
});
