<script setup>
import { usePlayerStore } from '../../stores/player.js'

const player = usePlayerStore()
</script>

<template>
  <div
    class="w-56 lg:w-64 h-[780px] mdb:h-full absolute top-0 z-30 mdb:static mdb:block bg-black/50 backdrop-blur-[10px] mdb:backdrop-blur-[0px] mdb:bg-black/[.0] border-r border-white/[.15] text-white/90 py-5 overflow-y-auto pointer-events-auto"
    :class="player.navVisible ? 'translate-x-0' : '-translate-x-full mdb:translate-x-0'"
  >
    <button class="ph-fill ph-x absolute top-0 right-0 m-3 text-2xl mdb:hidden" @click="player.navVisible = false"></button>
    
    <div class="w-fit mx-auto mb-12 mt-10">
        <p class="text-xs mb-6 font-bold">LIBRARY</p>
        <ol class="navItems">
            <li>
                <i class="ph-fill ph-playlist"></i> Playlists
            </li>
            <li>
                <i class="ph-fill ph-user"></i> Artists
            </li>
            <li>
                <i class="ph-fill ph-disc"></i> Albums
            </li>
            <li>
                <i class="ph-fill ph-play-circle"></i> Songs
            </li>
        </ol>
    </div>

    <div class="w-fit mx-auto">
        <p class="text-xs mb-6 font-bold">DISCOVER</p>
        <ol class="navItems text-sm ml-2">
            <li class="active">
                <i class="ph-fill ph-star"></i> Store
            </li>
            <li>
                <i class="ph-fill ph-broadcast"></i> Radio
            </li>
            <li>
                <i class="ph-fill ph-heart"></i> For You
            </li>
            <li >
                <i class="ph-fill ph-browsers"></i> Browse
            </li>
        </ol>
    </div>
  </div>
</template>

<style scoped>
.navItems {@apply text-sm ml-2 }
.navItems li {@apply flex items-center mb-3 active:text-red-500 sm:hover:text-red-500 cursor-pointer }
.navItems li.active {@apply text-red-500 }
.navItems i {@apply text-lg mr-4 }
</style>
