import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', () => {
  const navVisible = ref(false)
  const currentSong = ref({})
  const isLoading = ref(false)
  const isPlaying = ref(false)
  const isLooping = ref(true)
  
  const play = (song, showLoading) => {
    // update data of song currently playing with payload
    currentSong.value = song
    
    // when file loading
    if (showLoading) {
      isLoading.value = true
    }
    
    // Get references to the audio element
    const audioPlayer = document.getElementById('audioPlayer')
    audioPlayer.src = currentSong.value.file
    audioPlayer.play()
  }

  return { navVisible, currentSong, play, isLoading, isPlaying, isLooping }
})
