"use server";
import axios from "axios";
import { cookies } from "next/headers";

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
  const cookieStore = await cookies();
  const mode = cookieStore.get("mode")?.value;
  let api;
  let checkoutUrl;
  let url;

  if (mode === "live") {
    api = liveApi;
    url = process.env.NEXT_PUBLIC_LIVE_API_URL;
    checkoutUrl = process.env.NEXT_PUBLIC_LIVE_CHECKOUT_URL;
  } else {
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
};

export default getConstants;
