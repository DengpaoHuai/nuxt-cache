type CustomFetch = {
  key: string;
  url: string;
};

const useCustomFetch = ({ key, url }: CustomFetch) => {
  const response = useAsyncData(key, async () => {
    const response = await fetch(url);
    return response.json();
  });

  const customCache = useState("customCache", () => response.data);

  return response;
};
