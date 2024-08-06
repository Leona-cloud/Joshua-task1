import axios from "axios";

const unsplashApi = async (searchParam: string) => {
  const options = {
    method: "GET",
    url: `https://api.unsplash.com/search/photos?page=1&query=${searchParam}`,
    headers: {
      Authorization: `Client-ID ${
      process.env.unsplash_access_key
      }`,
      accept: "application/json",
      "content-type": "application/json",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data.results);
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

export default unsplashApi;
