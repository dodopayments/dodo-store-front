import { getCookie } from "cookies-next/client";

const getConstantsClient = async () => {
  const mode = getCookie("mode");
  let checkoutUrl;
  let url;

  if (mode === "live") {
    url = process.env.NEXT_PUBLIC_LIVE_API_URL;
    checkoutUrl = process.env.NEXT_PUBLIC_LIVE_CHECKOUT_URL;
  } else {
    url = process.env.NEXT_PUBLIC_TEST_API_URL;
    checkoutUrl = process.env.NEXT_PUBLIC_TEST_CHECKOUT_URL;
  }

  return {
    mode,
    checkoutUrl,
    url,
  };
};

export default getConstantsClient;
