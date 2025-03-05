import axios from "axios";
import { getCookie } from 'cookies-next/client';

const testApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TEST_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const liveApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LIVE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getConstants = async () => {
  const mode =  getCookie("mode");
  let api;
  let checkoutUrl;
  let url;
  switch (mode) {
    case "test":
      api = testApi;
      url = process.env.NEXT_PUBLIC_TEST_API_URL;
      checkoutUrl = process.env.NEXT_PUBLIC_TEST_CHECKOUT_URL;
      break;
    case "live":
      api = liveApi;
      url = process.env.NEXT_PUBLIC_LIVE_API_URL;
      checkoutUrl = process.env.NEXT_PUBLIC_LIVE_CHECKOUT_URL;
      break;
    default:
      api = testApi;
      url = process.env.NEXT_PUBLIC_TEST_API_URL;
      checkoutUrl = process.env.NEXT_PUBLIC_TEST_CHECKOUT_URL;
  }

  return {
    api,
    mode,
    checkoutUrl,
    url,
  };
}

export default getConstants;
