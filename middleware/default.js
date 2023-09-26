export default defineNuxtRouteMiddleware(async (to, from) => {
  const data = useState("data");
  if (to.params.slug) {
    const res = (
      await $fetch("https://api.inicontent.com/kesan/landing", {
        params: {
          slug: `~${to.params.slug.split("#")[0]}`,
        },
      })
    ).result[0];
    if (res && res.title) data.value = res;
    else return navigateTo("https://kesan.org", { external: true });
  } else return navigateTo("https://kesan.org", { external: true });
});
