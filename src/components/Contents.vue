<script setup>
import { ref, onMounted } from 'vue'
import { usePlayerStore } from '../stores/player.js'

import ContentsNav from './contents/ContentsNav.vue'
import BottomBoxes from './contents/BottomBoxes.vue'

const player = usePlayerStore()

// songs data
const playlist = ref([
  {
    artist: "Burn Water",
    song: "Nostalgia Dreams",
    cover: 'bg-[url(../img/covers/Burnwater.jpg)]',
    file: "https://firebasestorage.googleapis.com/v0/b/learn-c73c3.appspot.com/o/Misc%2Fmusicplayer%2FBurn-Water-Nostalgia-Dreams.MP3?alt=media&token=658b9ade-b33b-4fb2-972b-789a870869fc",
    duration: '1:00'
  },
  {
    artist: "Lighthouse Family",
    song: "Ocean Drive",
    cover: 'bg-[url(../img/covers/Lighthouse.jpg)]',
    file: "https://firebasestorage.googleapis.com/v0/b/learn-c73c3.appspot.com/o/Misc%2Fmusicplayer%2FLighthouse-Family-Ocean-Drive.MP3?alt=media&token=c0bbf7f5-2869-4a26-9e88-d19db9200e04",
    duration: '1:21'
  },
  {
    artist: "Major Lazer ft Ice Prince",
    song: "Particular",
    cover: 'bg-[url(../img/covers/Particular.jpg)]',
    file: "https://firebasestorage.googleapis.com/v0/b/learn-c73c3.appspot.com/o/Misc%2Fmusicplayer%2FMajor-Lazer-Particula.MP3?alt=media&token=87928490-b89c-460a-b255-ada450bcf874",
    duration: '1:07'
  },
  {
    artist: "Burna Boy",
    song: "Alone",
    cover: 'bg-[url(../img/covers/Burna.jpg)]',
    file: "https://firebasestorage.googleapis.com/v0/b/learn-c73c3.appspot.com/o/Misc%2Fmusicplayer%2FBurna-Boy-Alone.MP3?alt=media&token=b198e1fe-0688-4119-941f-2f84544d58d0",
    duration: '1:13'
  }
])

onMounted(() => {
  player.currentSong = playlist.value[1]
  player.play(playlist.value[1])
})
</script>

<template>
  <div
    class="grow flex bg-black/80 backdrop-blur-[8px] backdrop-saturate-[130%] overflow-y-auto"
    :class="{'pointer-events-none': player.navVisible}"
  >

    <ContentsNav />

    <div class="grow h-full table overflow-y-auto">
      <div class="table-cell align-middle text-center">
        <div class="w-full max-w-4xl inline-block text-justify px-3 py-5 sm:p-5">

          <div class="w-full sm:max-w-xl md:max-w-full mx-auto flex items-end xs:items-center justify-between mb-12">
              <div>
                  <p class="text-sm text-red-500">Store</p>
                  <p class="text-xl sm:text-2xl md:text-3xl font-bold text-white/90 leading-none">New Releases</p>
              </div>

              <div class="flex items-center text-white">
                  <button class="w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center bg-white/10 rounded-full mr-3">
                      <i class="ph-fill ph-shuffle"></i>
                  </button>
                  <button class="w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center bg-red-500 rounded-full mr-3">
                      <i class="ph-fill ph-play"></i>
                  </button>
                  <button
                    class="w-7 h-7 sm:w-10 sm:h-10 mdb:hidden flex items-center justify-center border rounded-full pointer-events-auto"
                    @click="player.navVisible = !player.navVisible"
                  >
                      <i class="ph-fill ph-list"></i>
                  </button>
              </div>
          </div>

          <div class="md:flex items-center mb-12">
              <div class="relative w-full sm:max-w-lg md:w-1/2 mx-auto flex items-end relative md:mr-10 mb-8 md:mb-0 rounded-2xl overflow-hidden">
                  <img src="../assets/img/covers/default.png" class="w-full opacity-90">
                  
                  <div class="absolute top-0 left-0 w-full h-full bg-cover bg-center duration-1000" :class="player.currentSong.cover"></div>
                  
                  <div class="absolute top-0 flex items-end justify-between w-full h-full">
                      <div class="w-full flex items-center justify-between mx-3 xs:mx-6 mb-3 xs:mb-6">
                          <div>
                              <p class="font-bold text-sm xs:text-base text-white/95">{{player.currentSong.song}}</p>
                              <p class="text-xs text-white/80">{{player.currentSong.artist}}</p>
                          </div>
                          
                          <div>
                            <i
                              class="ph-fill ph-play-circle text-3xl text-white/90 cp hover:scale-125"
                              v-show="!player.isPlaying"
                            ></i>
                            <div class="waveform" v-show="player.isPlaying">
                              <div class="bar"></div>
                              <div class="bar"></div>
                              <div class="bar"></div>
                              <div class="bar"></div>
                            </div>
                          </div>
                      </div>
                  </div>
              </div>

              <div class="w-full sm:max-w-lg md:w-1/2 mx-auto">
                  <div
                    class="flex items-center justify-between hover:bg-white/10 rounded-lg xs:rounded-xl px-2.5 py-2 cp my-1"
                    v-for="song in playlist"
                    :key="song.song"
                    @click="player.play(song, true)"
                    :class="{'bg-white/10': song.file == player.currentSong.file}"
                  >
                      <div class="flex items-center">
                        <div class="w-8 h-8 rounded-md mr-3 xs:mr-4 bg-cover bg-center" :class="song.cover"></div>
                        <div>
                            <p class="font-bold text-white/90 text-xs xs:text-sm">{{song.artist}}</p>
                            <p class="text-white/60 text-xs">{{song.song}}</p>
                        </div>
                      </div>

                      <div class="flex items-center">
                          <span class="text-white/60 mr-3 xs:mr-4 text-xs xs:text-sm">{{song.duration}}</span>
                          <i class="ph-fill ph-plus-circle text-white/90 text-lg"></i>
                      </div>
                  </div>
              </div>
          </div>
            
          <BottomBoxes />

        </div>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes animateBar1 {
  0%, 100% { height: 0 }
  50% { height: 100% }
}

@keyframes animateBar2 {
  0%, 50% { height: 0 }
  100{ height: 100% }
}

@keyframes animateBar3 {
  0%, 25% { height: 0 }
  75%, 100% { height: 100% }
}

@keyframes animateBar4 {
  0%, 75% { height: 0 }
  25%, 100% { height: 100% }
}

.waveform {
  @apply flex h-3.5 bg-transparent overflow-hidden rotate-180
}

.bar {
  @apply w-[3px] bg-white/90 mx-[1.5px]
}

.bar:nth-child(1) {
  animation: animateBar1 1.5s ease-in-out infinite;
}

.bar:nth-child(2) {
  animation: animateBar2 1s ease-in-out infinite;
}

.bar:nth-child(3) {
  animation: animateBar3 1.25s ease-in-out infinite;
}

.bar:nth-child(4) {
  animation: animateBar4 0.75s ease-in-out infinite;
}
</style>
