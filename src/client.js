import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId: "s2cj25xg",
    dataset: "production",
    apiVersion: "2021-11-16",
    useCdn: true,
    token: "skxuhLpk1RmO81EOE9alXg3nihn8ENMcz6gUHzJgtkfDCD1sSd5G6FeRIpvW6iFhwzfj4k2zzcPsQWhH8n8JDfmIS4nNvLsMu2fMlmJWqjFM9nkbut5iH6XOksMOzCEdUc8JmStPWUqC2n7BW9HWWlukIOrBmwV4JxT58OE81cicKbgN99Tz",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
