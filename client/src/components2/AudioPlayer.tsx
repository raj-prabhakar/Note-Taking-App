"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import { Play, Pause, Download, Share2 } from "lucide-react"
import { toast } from "react-toastify"

interface AudioPlayerProps {
  audioUrl: string
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl
      audioRef.current.load()
    }
  }, [audioUrl])

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleAudioEnded = () => {
    setIsPlaying(false)
    setCurrentTime(0)
    if (audioRef.current) {
      audioRef.current.currentTime = 0
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value)
    setCurrentTime(time)
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleDownloadAudio = () => {
    if (audioUrl) {
      const link = document.createElement("a")
      link.href = audioUrl
      link.download = "audio.mp3"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-5 mt-4 w-full max-w-md mx-auto border border-gray-200">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
        className="hidden"
      >
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <h3 className="text-lg font-semibold text-gray-800 truncate">Audio Recording</h3>

      <div className="flex items-center justify-between mt-3">
        <button
          onClick={handlePlayPause}
          className="p-3 bg-purple-500 text-white rounded-full shadow-md hover:bg-purple-600 transition-all"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>

        <div className="flex items-center space-x-2 flex-grow mx-4">
          <span className="text-xs text-gray-500">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="flex-grow h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #9333ea ${
                (currentTime / duration) * 100
              }%, #e5e7eb ${(currentTime / duration) * 100}%)`,
            }}
          />
          <span className="text-xs text-gray-500">{formatTime(duration)}</span>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleDownloadAudio}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
            title="Download Audio"
          >
            <Download className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => toast.info("Share functionality coming soon!")}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
            title="Share Audio"
          >
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AudioPlayer

