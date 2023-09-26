<template>
  <header
    class="fixed backdrop-blur-sm top-0 right-0 w-full h-20 bg-white bg-opacity-80 shadow-lg z-50"
  >
    <div class="max-w-screen-xl p-4 mx-auto">
      <div class="flex items-center justify-between space-x-4 lg:space-x-10">
        <div class="flex lg:w-0 lg:flex-1">
          <img
            data-not-lazy
            src="https://cdn.inicontent.com/kesan/74876_14wRVIbLNgNsCaXDD3o1bg.png"
            class="h-10"
          />
        </div>
        <div class="flex gap-2">
          <a
            v-if="
              data.video &&
              data.video.button &&
              data.video.content &&
              data.video.content.length > 0
            "
            class="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-500 rounded-lg flex gap-4 items-start justify-center"
            :href="data.video.button.link"
            :target="
              Array.from(data.video.button.link)[0] === '#' ? '_self' : '_blank'
            "
            ><svg
              class="h-5 w-5"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 461.001 461.001"
              style="enable-background: new 0 0 461.001 461.001"
              xml:space="preserve"
            >
              <path
                style="fill: #fff"
                d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728 c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137 C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607 c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"
              />
            </svg>
            <span class="hidden md:block">
              {{ data.video.button.text }}
            </span>
          </a>
          <a
            class="px-5 py-2 text-sm font-medium text-white bg-blue-800 rounded-lg"
            href="https://kesan.org"
          >
            <svg
              class="md:hidden h-5 w-5"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 26.39 26.39"
              style="enable-background: new 0 0 26.39 26.39"
              xml:space="preserve"
            >
              <g id="c14_house">
                <path
                  style="fill: #fff"
                  d="M3.588,24.297c0,0-0.024,0.59,0.553,0.59c0.718,0,6.652-0.008,6.652-0.008l0.01-5.451c0,0-0.094-0.898,0.777-0.898h2.761
  			c1.031,0,0.968,0.898,0.968,0.898l-0.012,5.434c0,0,5.628,0,6.512,0c0.732,0,0.699-0.734,0.699-0.734V14.076L13.33,5.913
  			l-9.742,8.164C3.588,14.077,3.588,24.297,3.588,24.297z"
                />
                <path
                  style="fill: #fff"
                  d="M0,13.317c0,0,0.826,1.524,2.631,0l10.781-9.121l10.107,9.064c2.088,1.506,2.871,0,2.871,0L13.412,1.504L0,13.317z"
                />
                <polygon
                  style="fill: #fff"
                  points="23.273,4.175 20.674,4.175 20.685,7.328 23.273,9.525"
                />
              </g>
            </svg>
            <span class="hidden md:block">الموقع الرئيسي </span>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const { data } = defineProps({
  data: Object,
});
</script>
