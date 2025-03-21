/*const useErrorStore = defineStore("useErrorStore", () => {
  const errorTitle = ref("");
  const errorDescription = ref("");
  const errorType = ref("");
  const displayError = ref(false);

  onMounted(() => {
    // console.log("useErrorStore mounted");
  });

  const setError = (error: Error, type: string) => {
    console.log("enter");
    errorTitle.value = "toto";
    displayError.value = true;
  };

  const clearError = () => {
    errorTitle.value = "";
    errorDescription.value = "";
    errorType.value = "";
    displayError.value = false;
  };

  return {
    errorTitle,
    errorDescription,
    errorType,
    displayError,
    setError,
    clearError,
  };
});

export default useErrorStore;*/

/* OPTION STORE */

import { defineStore } from "pinia";

const useErrorStore = defineStore("useErrorStore", {
  state: () => ({
    errorTitle: "",
    errorDescription: "",
    errorType: "",
    displayError: false,
  }),
  actions: {
    setError(error: Error, type: string) {
      this.errorTitle = "toto";
      this.displayError = true;
    },
  },
});

export default useErrorStore;
