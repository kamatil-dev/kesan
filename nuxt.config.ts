export default defineNuxtConfig({
  ssr: false,
  modules: ["@nuxtjs/tailwindcss", "nuxt-lazy-load"],
  app: {
    head: {
      title: "كيسان للخدمات التعليمية",
      viewport: "width=device-width, initial-scale=1",
      charset: "utf-8",
      meta: [
        {
          name: "description",
          content:
            "شركة كيسان للخدمات و الاستشارات التعليمية مختصة في الدراسة في الخارج و نعمل على مساعدة الطلاب الطموحين في الحصول على قبول جامعي من الخارج",
        },
        {
          name: "og:image",
          content:
            "https://cdn.inicontent.com/kesan/74876_14wRVIbLNgNsCaXDD3o1bg.png",
        },
      ],
      link: [
        {
          rel: "icon",
          href: "https://cdn.inicontent.com/inicontent/favicon_14wRVIbLNgNsCaXDD3o1bg.webp",
        },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap",
        },
      ],
      script: [
        {
          src: "https://www.googletagmanager.com/gtag/js?id=AW-809304087",
          async: true,
        },
        {
          children: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-809304087');`,
        },
      ],
    },
  },
  experimental: {
    payloadExtraction: false,
  },
});
