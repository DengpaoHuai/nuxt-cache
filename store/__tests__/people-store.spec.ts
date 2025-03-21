import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import usePeopleStore from "../usePeopleStore";
import { flushPromises } from "@vue/test-utils";

describe("People store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should pass", async () => {
    vi.useFakeTimers();

    vi.stubGlobal("$fetch", async () => ({
      results: [
        { name: "Luke Skywalker" },
        { name: "C-3PO" },
        { name: "R2-D2" },
        { name: "Darth Vader" },
        { name: "Leia Organa" },
        { name: "Owen Lars" },
        { name: "Beru Whitesun lars" },
        { name: "R5-D4" },
        { name: "Biggs Darklighter" },
        { name: "Obi-Wan Kenobi" },
      ],
    }));

    const TestComponent = defineComponent({
      async setup() {
        const { people, isPeopleLoading } = storeToRefs(usePeopleStore());
        const { refetch } = usePeopleStore();
        return {
          people,
          isPeopleLoading,
        };
      },
      template: `
        <div>
            <p>toto</p>
   
          <ul>
            <li v-for="person in people">{{ person.name }}</li>
          </ul>
            <button @click="refetch()">Refetch</button>
        </div>
      `,
    });

    const component = await mountSuspended(TestComponent);
    expect(component.text()).toContain("toto");
    // expect(component.text()).toContain("Loading...");
    //const store = usePeopleStore();
    //console.log(store.people);
    //  expect(store.people).toEqual([]);

    //   await vi.advanceTimersByTimeAsync(5000);

    //await nextTick();

    // await flushPromises();

    expect(component.html()).toContain("Luke");

    //click button
    await component.get("button").trigger("click");
    vi.stubGlobal("$fetch", async () => ({
      results: [
        { name: "Luke1 Skywalker" },
        { name: "C-3PO" },
        { name: "R2-D2" },
        { name: "Darth Vader" },
        { name: "Leia Organa" },
        { name: "Owen Lars" },
        { name: "Beru Whitesun lars" },
        { name: "R5-D4" },
        { name: "Biggs Darklighter" },
        { name: "Obi-Wan Kenobi" },
      ],
    }));
    await flushPromises();
    await vi.advanceTimersByTimeAsync(1500);

    await nextTick();
    //  expect(component.html()).toContain("Luke1");
  });
});
