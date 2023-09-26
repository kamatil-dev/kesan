<template>
  <div>
    <!-- <Header :data="data" /> -->
    <section v-if="data.first_banner"
      class="flex flex-col gap-2 px-4 items-center justify-center h-screen mb-12 bg-fixed bg-center text-center bg-cover"
      :style="`background-image: url('${data.first_banner.background}')`" data-not-lazy>
      <div class="backdrop-blur-sm p-5 text-xl md:text-4xl text-white bg-blue-800 bg-opacity-80 rounded-full">
        {{ data.first_banner.heading }}
      </div>
      <div class="p-5 backdrop-blur-sm text-lg md:text-2xl text-white rounded-full font-bold"
        style="background: rgb(255 205 5 / 80%)">
        {{ data.first_banner.subheading }}
      </div>
    </section>
    <div class="flex flex-col space-y-20 sm:px-20 px-10">
      <section v-if="data.introduction">
        <div class="text-right" v-html="data.introduction"></div>
      </section>
      <section v-if="data.call_to_action"
        class="flex flex-col md:flex-row md:justify-between text-center gap-2 items-center rounded-full shadow-md p-6"
        style="background: rgb(255 205 5 / 80%)">
        <h4 class="font-bold text-xl text-blue-800">
          {{ data.call_to_action.title }}
        </h4>
        <a v-if="data.call_to_action.button" :href="data.call_to_action.button.link"
          class="px-6 py-4 bg-blue-800 text-white text-xl font-bold rounded-full shadow-sm hover:shadow-lg hover:px-8 transition-all">
          {{ data.call_to_action.button.text }}
        </a>
      </section>
      <section v-if="data.second_banner">
        <h2 class="text-3xl md:text-5xl text-blue-800 font-bold title-font text-center w-full mb-10">
          بعض الصور
          {{ data.second_banner.title }}
        </h2>
        <div class="w-full">
          <img class="rounded-lg shadow-sm object-fill w-full" :src="data.second_banner.image"
            :alt="data.second_banner.title" />
        </div>
      </section>
      <section v-if="data.faqs && data.faqs.content">
        <div class="flex flex-col text-center w-full">
          <h2 class="text-xl md:text-3xl bg-[#fdc800] w-fit mx-auto p-2 sm:p-4 shadow text-blue-800 font-bold mb-10">
            <span
              class="before:block before:absolute before:-inset-1 p-2 sm:p-4 before:-skew-y-3 before:bg-blue-800 relative inline-block">
              <span class="relative text-white">{{ data.faqs.title }}</span>
            </span>
          </h2>
        </div>
        <div :class="{
          'md:grid-cols-2': data.faqs.images && data.faqs.images.length > 0,
        }" class="grid gap-4 grid-cols-1 items-center">
          <div class="space-y-4 text-right">
            <details v-for="faq in data.faqs.content" :key="faq" class="group">
              <summary class="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-gray-50">
                <h2 class="font-medium text-right">{{ faq.question }}</h2>
                <svg class="w-5 h-5 transition-transform duration-300 group-open:-rotate-180"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>

              <div class="px-4 mt-4 leading-relaxed text-gray-700 text-right" v-html="faq.answer"></div>
            </details>
          </div>
          <div v-if="data.faqs.images && data.faqs.images.length > 0" class="px-auto md:pr-20">
            <Carousel :wrap-around="true">
              <Slide v-for="image in data.faqs.images" :key="image">
                <img class="shadow-xl rounded-xl" :src="`${image}?fit=600 400`" />
              </Slide>

              <template #addons>
                <Navigation />
              </template>
            </Carousel>
          </div>
        </div>
      </section>
      <section v-if="data.call_to_action && data.call_to_action.button" class="text-center">
        <a :href="data.call_to_action.button.link"
          class="px-6 py-4 bg-red-600 text-white text-xl font-bold rounded-full shadow-sm hover:shadow-lg hover:px-4 transition-all">
          {{ data.call_to_action.button.text }}
        </a>
      </section>
      <section v-if="data.universities &&
        data.universities.content &&
        data.universities.content.length > 0
        " class="text-center" id="universities">
        <h2 class="text-3xl md:text-5xl text-blue-800 font-bold title-font text-center w-full mb-10">
          {{ data.universities.title }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <a v-for="university in data.universities.content.slice(0, 9)" :key="university" :href="university.link ?? '#'"
            target="_blank">
            <div style="box-shadow: 0 0 20px #00000030" class="bg-white rounded-xl p-3 flex flex-col space-y-5">
              <div class="relative">
                <span v-if="university.discounted_price"
                  class="absolute top-3 left-3 bg-[#fdc800] rounded text-2xl px-3 font-medium text-black">{{
                    Math.round(
                      100 -
                      (university.discounted_price * 100) /
                      university.regular_price
                    )
                  }}%</span>
                <img :style="{
                      height: '220px',
                    }" class="object-cover w-full h-auto" :src="`${university.image}?fit=320 220`" />
                <span v-if="university.discounted_price"
                  class="absolute bottom-0 left-0 flex items-center justify-center space-x-1 space-x-reverse text-white h-8 w-full text-center bg-black/50 backdrop-blur">
                  <span class="line-through text-xs">{{
                    university.regular_price
                  }}</span>
                  <b>{{ university.discounted_price }}</b>
                  <span> {{ data.universities.currency }} للاسبوع </span>
                </span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2 space-x-reverse">
                  <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="City-web-2-with-banner" transform="translate(-1214.000000, -645.000000)">
                        <g id="pin-3" transform="translate(1214.000000, 645.000000)">
                          <rect id="Rectangle" class="fill-[#fdc800]" x="0" y="0" width="32" height="32" rx="16"></rect>
                          <g id="Group" stroke-linecap="round" stroke-linejoin="round"
                            transform="translate(9.400000, 7.000000)" stroke="#FFFFFF" stroke-width="1.2">
                            <path
                              d="M13.2,6.6 C13.2,10.68 6.6,17.4 6.6,17.4 C6.6,17.4 0,10.74 0,6.6 C0,2.4 3.42,0 6.6,0 C9.78,0 13.2,2.46 13.2,6.6 Z"
                              id="Path"></path>
                            <circle id="Oval" cx="6.6" cy="6.6" r="1.8"></circle>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <span class="text-[#fdc800]">{{ university.location }}</span>
                </div>
                <svg class="w-28" width="100%" height="100%" viewBox="0 0 881 130" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"
                  xmlns:serif="http://www.serif.com/" :style="{
                    'fill-rule': 'evenodd',
                    'clip-rule': 'evenodd',
                    'stroke-linejoin': 'round',
                    'stroke-miterlimit': 2,
                  }">
                  <g transform="matrix(1,0,0,1,-634.728,-382.568)">
                    <path
                      d="M702.68,382.568L718.721,431.938L770.632,431.938L728.635,462.45L744.677,511.82L702.68,481.308L660.683,511.82L676.724,462.45L634.728,431.938L686.639,431.938L702.68,382.568Z"
                      class="fill-orange-500" />
                  </g>
                  <g transform="matrix(1,0,0,1,-447.914,-382.568)">
                    <path
                      d="M702.68,382.568L718.721,431.938L770.632,431.938L728.635,462.45L744.677,511.82L702.68,481.308L660.683,511.82L676.724,462.45L634.728,431.938L686.639,431.938L702.68,382.568Z"
                      class="fill-orange-500" />
                  </g>
                  <g transform="matrix(1,0,0,1,-261.961,-382.568)">
                    <path
                      d="M702.68,382.568L718.721,431.938L770.632,431.938L728.635,462.45L744.677,511.82L702.68,481.308L660.683,511.82L676.724,462.45L634.728,431.938L686.639,431.938L702.68,382.568Z"
                      class="fill-orange-500" />
                  </g>
                  <g transform="matrix(1,0,0,1,-76.0238,-382.568)">
                    <path
                      d="M702.68,382.568L718.721,431.938L770.632,431.938L728.635,462.45L744.677,511.82L702.68,481.308L660.683,511.82L676.724,462.45L634.728,431.938L686.639,431.938L702.68,382.568Z"
                      class="fill-orange-500" />
                  </g>
                  <g transform="matrix(1,0,0,1,109.853,-382.568)">
                    <path
                      d="M702.68,382.568L718.721,431.938L770.632,431.938L728.635,462.45L744.677,511.82L702.68,481.308L660.683,511.82L676.724,462.45L634.728,431.938L686.639,431.938L702.68,382.568Z"
                      class="fill-orange-500" />
                  </g>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-right">
                {{ university.name }}
              </h3>
              <div class="text-right" v-html="university.description"></div>
              <div v-if="university.icon_1 || university.icon_2"
                class="border-t-2 border-gray-300 pt-2 flex space-x-4 space-x-reverse">
                <span v-if="university.icon_1" class="flex space-x-2 space-x-reverse items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <g fill="none" fill-rule="evenodd">
                      <rect width="32" height="32" class="fill-[#fdc800]" rx="16" />
                      <g stroke="#FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2">
                        <path
                          d="M12.58 13.6c.54-2.1 2.4-3.6 4.62-3.6 2.64 0 4.8 2.16 4.8 4.8 0 .78-.18 1.44-.48 2.1M17.2 7v.6M22.72 9.28l-.42.42M25 14.8h-.6M11.68 9.28l.42.42" />
                        <path
                          d="M20.92 16.84c-1.02 0-1.92.36-2.64 1.02a5.743 5.743 0 0 0-5.58-4.26c-3.12 0-5.7 2.58-5.7 5.7S9.58 25 12.7 25h8.16c2.28 0 4.08-1.8 4.08-4.08 0-2.28-1.8-4.08-4.02-4.08z" />
                      </g>
                    </g>
                  </svg>
                  <b>{{ university.icon_1 }}</b> </span><span v-if="university.icon_2"
                  class="flex space-x-2 space-x-reverse items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <g fill="none" fill-rule="evenodd">
                      <rect width="32" height="32" class="fill-[#fdc800]" rx="16" />
                      <g stroke="#FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2">
                        <path
                          d="M22 7.6h.6a1.8 1.8 0 0 1 1.8 1.8v13.2a1.8 1.8 0 0 1-1.8 1.8H9.4a1.8 1.8 0 0 1-1.8-1.8V9.4a1.8 1.8 0 0 1 1.8-1.8h.6" />
                        <path d="M19.6 17.2l-3.6-3-3.6 3V7.6h7.2z" />
                      </g>
                    </g>
                  </svg>
                  <b>{{ university.icon_2 }}</b>
                </span>
              </div>
            </div>
          </a>
        </div>
        <button v-if="data.universities.content.length > 9" id="button_more"
          onclick="document.querySelector('#button_more').style.display = 'none';document.querySelector('#button_less').style.display = 'block';document.querySelector('#grid_more').style.display = 'grid';"
          class="mt-6 mx-auto px-6 py-4 bg-blue-800 text-white rounded-full shadow-sm hover:shadow-lg hover:px-8 transition-all">
          أظهر المزيد
        </button>
        <div v-if="data.universities.content.length > 9"
          class="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" style="display: none" id="grid_more">
          <a v-for="university in data.universities.content.slice(9)" :key="university" :href="university.link ?? '#'"
            target="_blank">
            <div style="box-shadow: 0 0 20px #00000030" class="bg-white rounded-xl p-3 flex flex-col space-y-5">
              <div class="relative">
                <span v-if="university.discounted_price"
                  class="absolute top-3 left-3 bg-[#fdc800] rounded text-2xl px-3 font-medium text-black">{{
                    Math.round(
                      100 -
                      (university.discounted_price * 100) /
                      university.regular_price
                    )
                  }}%</span>
                <img :style="{
                      height: '220px',
                    }" class="object-cover w-full h-auto" :src="`${university.image}?fit=320 220`" />
                <span v-if="university.discounted_price"
                  class="absolute bottom-0 left-0 flex items-center justify-center space-x-1 space-x-reverse text-white h-8 w-full text-center bg-black/50 backdrop-blur">
                  <span class="line-through text-xs">{{
                    university.regular_price
                  }}</span>
                  <b>{{ university.discounted_price }}</b>
                  <span> {{ data.universities.currency }} للاسبوع </span>
                </span>
              </div>
              <div class="flex justify-between">
                <div class="flex items-center space-x-2 space-x-reverse">
                  <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="City-web-2-with-banner" transform="translate(-1214.000000, -645.000000)">
                        <g id="pin-3" transform="translate(1214.000000, 645.000000)">
                          <rect id="Rectangle" class="fill-[#fdc800]" x="0" y="0" width="32" height="32" rx="16"></rect>
                          <g id="Group" stroke-linecap="round" stroke-linejoin="round"
                            transform="translate(9.400000, 7.000000)" stroke="#FFFFFF" stroke-width="1.2">
                            <path
                              d="M13.2,6.6 C13.2,10.68 6.6,17.4 6.6,17.4 C6.6,17.4 0,10.74 0,6.6 C0,2.4 3.42,0 6.6,0 C9.78,0 13.2,2.46 13.2,6.6 Z"
                              id="Path"></path>
                            <circle id="Oval" cx="6.6" cy="6.6" r="1.8"></circle>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <span class="text-[#fdc800]">{{ university.location }}</span>
                </div>
                <svg class="w-28" width="100%" height="100%" viewBox="0 0 881 130" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"
                  xmlns:serif="http://www.serif.com/" :style="{
                    'fill-rule': 'evenodd',
                    'clip-rule': 'evenodd',
                    'stroke-linejoin': 'round',
                    'stroke-miterlimit': 2,
                  }">
                  <g transform="matrix(1,0,0,1,-634.728,-382.568)">
                    <path
                      d="M702.68,382.568L718.721,431.938L770.632,431.938L728.635,462.45L744.677,511.82L702.68,481.308L660.683,511.82L676.724,462.45L634.728,431.938L686.639,431.938L702.68,382.568Z"
                      class="fill-orange-500" />
                  </g>
                  <g transform="matrix(1,0,0,1,-447.914,-382.568)">
                    <path
                      d="M702.68,382.568L718.721,431.938L770.632,431.938L728.635,462.45L744.677,511.82L702.68,481.308L660.683,511.82L676.724,462.45L634.728,431.938L686.639,431.938L702.68,382.568Z"
                      class="fill-orange-500" />
                  </g>
                  <g transform="matrix(1,0,0,1,-261.961,-382.568)">
                    <path
                      d="M702.68,382.568L718.721,431.938L770.632,431.938L728.635,462.45L744.677,511.82L702.68,481.308L660.683,511.82L676.724,462.45L634.728,431.938L686.639,431.938L702.68,382.568Z"
                      class="fill-orange-500" />
                  </g>
                  <g transform="matrix(1,0,0,1,-76.0238,-382.568)">
                    <path
                      d="M702.68,382.568L718.721,431.938L770.632,431.938L728.635,462.45L744.677,511.82L702.68,481.308L660.683,511.82L676.724,462.45L634.728,431.938L686.639,431.938L702.68,382.568Z"
                      class="fill-orange-500" />
                  </g>
                  <g transform="matrix(1,0,0,1,109.853,-382.568)">
                    <path
                      d="M702.68,382.568L718.721,431.938L770.632,431.938L728.635,462.45L744.677,511.82L702.68,481.308L660.683,511.82L676.724,462.45L634.728,431.938L686.639,431.938L702.68,382.568Z"
                      class="fill-orange-500" />
                  </g>
                </svg>
              </div>
              <h3 class="font-bold text-right">{{ university.name }}</h3>
              <div class="text-right" v-html="university.description"></div>
              <div v-if="university.icon_1 || university.icon_2"
                class="border-t-2 border-gray-300 pt-2 flex space-x-4 space-x-reverse">
                <span v-if="university.icon_1" class="flex space-x-2 space-x-reverse items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <g fill="none" fill-rule="evenodd">
                      <rect width="32" height="32" class="fill-[#fdc800]" rx="16" />
                      <g stroke="#FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2">
                        <path
                          d="M12.58 13.6c.54-2.1 2.4-3.6 4.62-3.6 2.64 0 4.8 2.16 4.8 4.8 0 .78-.18 1.44-.48 2.1M17.2 7v.6M22.72 9.28l-.42.42M25 14.8h-.6M11.68 9.28l.42.42" />
                        <path
                          d="M20.92 16.84c-1.02 0-1.92.36-2.64 1.02a5.743 5.743 0 0 0-5.58-4.26c-3.12 0-5.7 2.58-5.7 5.7S9.58 25 12.7 25h8.16c2.28 0 4.08-1.8 4.08-4.08 0-2.28-1.8-4.08-4.02-4.08z" />
                      </g>
                    </g>
                  </svg>
                  <b>{{ university.icon_1 }}</b> </span><span v-if="university.icon_2"
                  class="flex space-x-2 space-x-reverse items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <g fill="none" fill-rule="evenodd">
                      <rect width="32" height="32" class="fill-[#fdc800]" rx="16" />
                      <g stroke="#FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2">
                        <path
                          d="M22 7.6h.6a1.8 1.8 0 0 1 1.8 1.8v13.2a1.8 1.8 0 0 1-1.8 1.8H9.4a1.8 1.8 0 0 1-1.8-1.8V9.4a1.8 1.8 0 0 1 1.8-1.8h.6" />
                        <path d="M19.6 17.2l-3.6-3-3.6 3V7.6h7.2z" />
                      </g>
                    </g>
                  </svg>
                  <b>{{ university.icon_2 }}</b>
                </span>
              </div>
            </div>
          </a>
        </div>
        <button v-if="data.universities.content.length > 9" id="button_less" style="display: none"
          onclick="document.querySelector('#button_less').style.display = 'none';document.querySelector('#button_more').style.display = 'block';document.querySelector('#grid_more').style.display = 'none';document.querySelector('#universities').scrollIntoView()"
          class="mt-6 mx-auto px-6 py-4 bg-blue-800 text-white rounded-full shadow-sm hover:shadow-lg hover:px-4 transition-all">
          إخفاء
        </button>
      </section>
      <section v-if="data.testimonials">
        <div class="flex justify-between mb-10">
          <h2 class="text-blue-800 font-bold tracking-tight text-3xl md:text-5xl text-right">
            ماذا يقول
            <br class="md:hidden" />
            طلابنا عنا
          </h2>
          <div class="flex">
            <button @click="
              currentSlide =
              currentSlide < data.testimonials.length ? currentSlide + 1 : 0
              "
              class="p-3 ml-3 text-blue-800 border border-current rounded-full focus:outline-none hover:bg-blue-800 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg></button><button @click="
                currentSlide =
                currentSlide > 0 ? currentSlide - 1 : data.testimonials.length
                "
              class="p-3 text-blue-800 transition-colors border border-current rounded-full focus:outline-none hover:bg-blue-800 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transform -rotate-180" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <Carousel v-model="currentSlide" snapAlign="center" :breakpoints="{
          640: {
            itemsToShow: 1.5,
            snapAlign: 'center',
          },
          1024: {
            itemsToShow: 3.25,
            snapAlign: 'center',
          },
        }">
          <Slide v-for="testimonial in data.testimonials" :key="testimonial" class="px-5">
            <div
              class="relative after:content-[''] after:bg-black after:absolute after:top-2 after:left-12 after:w-52 md:after:w-64 after:h-5 after:rounded-full">
              <img class="object-cover shadow-xl rounded-xl bg-white w-full h-auto" :src="testimonial" />
            </div>
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </section>
      <section v-if="data.call_to_action && data.call_to_action.button" class="text-center">
        <a :href="data.call_to_action.button.link"
          class="px-6 py-4 bg-red-600 text-white text-xl font-bold rounded-full shadow-sm hover:shadow-lg hover:px-4 transition-all">
          {{ data.call_to_action.button.text }}
        </a>
      </section>
      <section v-if="data.video && data.video.content && data.video.content.length > 0" id="video">
        <h2 class="text-blue-800 font-bold tracking-tight text-3xl md:text-5xl text-center mb-10"
          v-html="data.video.title"></h2>
        <div class="grid grid-cols-1 gap-6" :class="data.video.content.length > 2
          ? 'md:grid-cols-3'
          : data.video.content.length === 2
            ? 'md:grid-cols-2'
            : ''
          ">
          <iframe v-for="video in data.video.content" :key="video" class="shadow-xl rounded-xl bg-white w-full h-80"
            :src="video.link" frameborder="0" allowfullscreen iframe-video></iframe>
        </div>
        <div v-if="data.video.text" class="text-center mt-4" v-html="data.video.text"></div>
      </section>
      <section v-if="data.third_banner">
        <h2 class="text-3xl md:text-5xl text-blue-800 font-bold title-font text-center w-full mb-10">
          {{ data.third_banner.title }}
        </h2>
        <div class="w-full">
          <img class="rounded-lg shadow-sm object-fill w-full" :src="data.third_banner.image"
            :alt="data.third_banner.title" />
        </div>
      </section>
      <!-- <Statistics /> -->
      <section v-if="data.form">
        <h2 id="form_section" class="text-2xl md:text-5xl text-blue-800 font-bold title-font text-center w-full mb-10"
          v-html="data.form.title"></h2>
        <h2 class="text-xl md:text-3xl text-blue-800 font-bold title-font text-center w-full mb-10">
          أو
        </h2>
        <h2 class="text-2xl md:text-5xl text-blue-800 font-bold title-font text-center w-full mb-10">
          لطلب استشارة
          <span class="text-red-500">مجانية</span>
        </h2>
        <h2 v-if="data.form.subtitle" class="text-xl md:text-3xl font-bold title-font text-center w-full mb-10"
          v-html="data.form.subtitle"></h2>
        <p v-show="formSubmited" class="text-center mb-5 text-green-500">
          تم إرسال طلبكم بنجاح
        </p>
        <form @submit.prevent="SubmitForm">
          <div class="grid gap-6 mb-6 lg:grid-cols-2">
            <div>
              <label for="full_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">الاسم</label>
              <input type="text" id="full_name" v-model="formData.full_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-800 focus:border-blue-800 block w-full p-2.5 outline-blue-800"
                required />
            </div>
            <div>
              <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">رقم الواتس
                أب</label>
              <input type="text" id="phone" v-model="formData.phone"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-800 focus:border-blue-800 block w-full p-2.5 outline-blue-800"
                required />
            </div>
            <div class="col-start-1 col-end-3">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">البريد
                الإلكتروني</label>
              <input type="email"
                pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
                id="email" v-model="formData.email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-800 focus:border-blue-800 block w-full p-2.5 outline-blue-800"
                required />
            </div>
          </div>
          <div class="text-center mb-5 ">
            <button type="submit" :disabled="loading"
              class="text-white bg-blue-800 hover:bg-blue-900 disabled:bg-blue-400 disabled:hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
              أرسل
            </button>
          </div>
        </form>
      </section>
    </div>
    <!-- <Footer :data="data" /> -->
    <a v-if="data.whatsapp && data.whatsapp.is_enabled" class="fixed bottom-5 right-5 rounded-full overflow-hidden"
      :href="`https://wa.me/${data.whatsapp.number}`">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 drop-shadow flex-no-shrink fill-current"
        viewBox="0 0 512 512">
        <rect width="512" height="512" rx="15%" fill="#25d366" />
        <path fill="#25d366" stroke="#ffffff" stroke-width="26" d="M123 393l14-65a138 138 0 1150 47z" />
        <path fill="#ffffff"
          d="M308 273c-3-2-6-3-9 1l-12 16c-3 2-5 3-9 1-15-8-36-17-54-47-1-4 1-6 3-8l9-14c2-2 1-4 0-6l-12-29c-3-8-6-7-9-7h-8c-2 0-6 1-10 5-22 22-13 53 3 73 3 4 23 40 66 59 32 14 39 12 48 10 11-1 22-10 27-19 1-3 6-16 2-18" />
      </svg>
    </a>
  </div>
</template>

<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";
definePageMeta({
  middleware: "default",
});
const loading = ref(false),
  currentSlide = ref(0),
  data = useState("data"),
  formData = ref({
    full_name: null,
    phone: null,
    email: null,
  }),
  formSubmited = ref(false),
  SubmitForm = async (event) => {
    loading.value = true;
    await useFetch("https://api.inicontent.com/kesan/entry", {
      method: "POST",
      body: {
        ...formData.value,
        referrer: document.referrer,
        landing_id: data.value.id,
      },
      initialCache: false,
    });
    formData.value = {
      full_name: null,
      phone: null,
      email: null,
    };
    event.target.reset();
    formSubmited.value = true;
    setTimeout(() => (formSubmited.value = false), 5000);
    loading.value = false;
  };
useSeoMeta({
  title: `كيسان للخدمات التعليمية | ${data.value.title}`,
  ogImage: data.value.first_banner.background,
  twitterCard: data.value.first_banner.background,
});
</script>

<style>
html {
  scroll-behavior: smooth;
}

ul {
  list-style: disc;
}

ol {
  list-style: decimal;
}

::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
  -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
  background-color: #022048;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
  -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
  border-radius: 10px;
  background-color: #ffffff;
}

@supports (-webkit-overflow-scrolling: touch) {
  body * {
    background-attachment: scroll;
  }
}
</style>
