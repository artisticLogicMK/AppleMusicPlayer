<script setup>
import { ref, onMounted } from 'vue'
import { usePlayerStore } from '../stores/player.js'

const player = usePlayerStore()

onMounted(() => {
  // Get references to the audio element and the seek slider
  var audioPlayer = document.getElementById('audioPlayer')
  var seekSlider = document.getElementById('seekSlider')
  
  // handle played part of the seek slider
  var colorPlayedPart = function (slider) {
      //calculate the percentage of the played part
      var slidedPart = (slider.value - slider.min) / (slider.max - slider.min) * 100
  
      // indicate a white background for the played part of the seek slider
      slider.style.background = `linear-gradient(to right, #fff 0%, #fff ${slidedPart}%, rgba(255,255,255,0.2) ${slidedPart}%, rgba(255,255,255,0.2) 100%)`
  }
  
  // Add an event listener to the seek slider
  seekSlider.addEventListener('input', function() {
      // Calculate the seek time based on the slider value
      var seekTime = audioPlayer.duration * (this.value / 100)
  
      // Update the current playback time of the audio element
      audioPlayer.currentTime = seekTime
  
      // update played part of the seek slider
      colorPlayedPart(this)
  })
  
  // Add an event listener to the audio element to update the seek slider position
  audioPlayer.addEventListener('timeupdate', function() {
      // Calculate the slider value based on the current playback time
      var sliderValue = (audioPlayer.currentTime / audioPlayer.duration) * 100
  
      // Update the seek slider value
      seekSlider.value = sliderValue
  
      // update played part of the seek slider
      colorPlayedPart(seekSlider)
  })
  
  // listen when audio starts playing
  audioPlayer.addEventListener('play', function() {
      // indicate that audio is isPlaying
      player.isPlaying = true
      
      // if play start, keep loader hidden
      player.isLoading = false
  })
  
  // listen when audio ends
  audioPlayer.addEventListener('ended', function() {
    player.isPlaying = false
  })
  
  // player buttons
  var playButton = document.getElementById('playButton')
  var pauseButton = document.getElementById('pauseButton')
  var loopButton = document.getElementById('loopButton')
  var volumeSlider = document.getElementById('volumeSlider')
  
  playButton.addEventListener('click', function() {
      audioPlayer.play()
      // indicate that audio is isPlaying
      player.isPlaying = true
  })
  
  pauseButton.addEventListener('click', function() {
      audioPlayer.pause()
      // indicate that audio is paused
      player.isPlaying = false
  })
  
  // listen for when loop button is clicked
  loopButton.addEventListener('click', function() {
      if (audioPlayer.loop) {
        audioPlayer.loop = false
        player.isLooping = false
      }
      else if (!audioPlayer.loop) {
        audioPlayer.loop = true
        player.isLooping = true
        audioPlayer.play()
      }
  })
  
  // Add an event listener to the volume slider
  volumeSlider.addEventListener('input', function() {
      // adjust player volume by slider
      audioPlayer.volume = this.value
  })
})

// volume toggle
const volumeVisible = ref(false) // dont show volume slider
const setVolumeVisibility = () => {
  volumeVisible.value = !volumeVisible.value
  
  // if over 3s hide volume slider
  setTimeout(() => {
    volumeVisible.value = false
  }, 10000)
}
</script>

<template>
  <div class="shrink-0 flex items-center justify-even h-14 bg-black/50 backdrop-blur-[8px] text-white/95 px-1 sm:px-5">
    <audio id="audioPlayer" loop="true" class="hidden"></audio>
    <div class="flex items-center">
      <div class="w-8 h-8 flex items-center justify-center rounded-full sm:mr-3 ml-2 sm:ml-0 overflow-hidden" v-if="player.isLoading">
        <i class="ph-fill ph-spiral animate-[spin_0.5s_linear_infinite] text-4xl"></i>
      </div>

      <div class="w-8 h-8 flex rounded-full sm:mr-3 ml-2 sm:ml-0 bg-cover bg-center animate-[spin_6s_linear_infinite]" :class="player.currentSong.cover" v-if="!player.isLoading">
      </div>
      
      <div class="hidden sm:block text-xs">
          <p class="font-semibold">{{player.currentSong.song}}</p>
          <p>{{player.currentSong.artist}}</p>
      </div>
    </div>

    <div class="grow flex items-center justify-even mx-3 sm:mx-7">
      <div class="text-lg">
          <i class="ph-fill ph-repeat cp mr-2" :class="player.isLooping ? 'opacity-100': 'opacity-50'" id="loopButton"></i>
          
          <i class="ph-fill ph-pause cp" id="pauseButton" v-show="player.isPlaying"></i>
          
          <i class="ph-fill ph-play cp" id="playButton" v-show="!player.isPlaying"></i>
      </div>

      <div class="hidden grow h-0.5 bg-white/20 cp mx-4 sm:mx-7 hover:h-1">
          <div class="h-full w-1/2 flex items-center justify-end bg-white">
              <div class="w-2.5 h-2.5 rounded-full bg-white"></div>
          </div>
      </div>

      <input type="range" min="0" max="100" value="0" class="grow appearance-none h-[3px] bg-white/20 cp mx-4 sm:mx-7 -mt-1" id="seekSlider">

      <div class="text-lg">
        <button
          class="group relative ph-fill cp"
          :class="volumeVisible ? 'ph-arrow-down' : 'ph-speaker-high'"
          @click="setVolumeVisibility"
        >
          <div
            class="absolute bottom-full -right-2 p-4 pt-1 bg-black/40 backdrop-blur-[80px] rounded-md mb-1"
            v-show="volumeVisible"
            @click.stop
          >
              <input type="range" value="1" step="0.01" min="0" max="1" id="volumeSlider" class="w-[120px] appearance-none accent-white h-[3px] opacity-90 cp">
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
