// @vitest-environment nuxt
import { describe, expect, it, test, vi } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import { flushPromises } from "@vue/test-utils";
import Planets from "~/pages/planets.vue";

describe("My test", () => {
  it("should pass", async () => {
    vi.useFakeTimers();

    const { useFetchMock } = vi.hoisted(() => {
      return {
        useFetchMock: vi.fn((key) => {
          console.log("key", key);
          return {
            data: {
              results: [
                { name: "Tatooine" },
                { name: "Alderaan" },
                { name: "Yavin IV" },
                { name: "Hoth" },
                { name: "Dagobah" },
                { name: "Bespin" },
                { name: "Endor" },
                { name: "Naboo" },
                { name: "Coruscant" },
                { name: "Kamino" },
              ],
            },
          };
        }),
      };
    });

    mockNuxtImport("useFetch", () => {
      return useFetchMock;
    });

    const component = await mountSuspended(Planets);

    console.log(component.text());

    expect(component.text()).toContain("Planets");

    await vi.advanceTimersByTimeAsync(5000);

    expect(component.text()).toContain("Tatooine");
    expect(true).toBe(true);
  });
});
