"use server";
import axios from "axios";
import { headers } from 'next/headers';
import { parseHostname } from "./parse-hostname";

const createApiInstance = (baseURL: string) => {
  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export async function getServerConfig() {
  const headersList = await headers();
  const hostname = headersList.get('host') || '';
  const { mode } = parseHostname(hostname);

  const config = {
    api: mode === 'live' 
      ? createApiInstance(process.env.NEXT_PUBLIC_LIVE_API_URL!)
      : createApiInstance(process.env.NEXT_PUBLIC_TEST_API_URL!),
    mode,
    checkoutUrl: mode === 'live'
      ? process.env.NEXT_PUBLIC_LIVE_CHECKOUT_URL
      : process.env.NEXT_PUBLIC_TEST_CHECKOUT_URL,
    url: mode === 'live'
      ? process.env.NEXT_PUBLIC_LIVE_API_URL
      : process.env.NEXT_PUBLIC_TEST_API_URL,
  };

  return config;
}

export default getServerConfig;
