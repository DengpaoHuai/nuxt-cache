import type { Pinia } from "pinia";
import useErrorStore from "~/store/useErrorStore";

export default defineNuxtPlugin((nuxtApp) => {
  const httpClient = $fetch.create({
    baseURL: "https://crudcrud.com/api/ce8020aeb24443dab857e77ca1f6c19",
    onRequest({ request, options, error }) {
      /*    if (session.value?.token) {
          // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
          options.headers.set('Authorization', `Bearer ${session.value?.token}`)
        }*/
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        useErrorStore().setError(
          new Error("You are not authorized to access this resource"),
          "Unauthorized"
        );
        //await nuxtApp.runWithContext(() => navigateTo("/login"));
      }
      if (response.status === 404) {
        useErrorStore().setError(new Error("Resource not found"), "Not Found");
      }
      if (response.status === 500) {
        useErrorStore().setError(new Error("Server error"), "Server Error");
      }
      if (response.status === 400) {
        console.log(nuxtApp.$pinia);

        useErrorStore(nuxtApp.$pinia as Pinia).setError(
          new Error("Bad request"),
          "Bad Request"
        );
      }
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      httpClient,
    },
  };
});
