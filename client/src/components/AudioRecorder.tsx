import React, { useState, useRef } from 'react';
import { Mic, Loader } from 'lucide-react';

interface AudioRecorderProps {
  onSave: (audioBlob: Blob, transcript: string) => Promise<void>;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onSave }) => {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [saving, setSaving] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const transcriptRef = useRef(''); // Store transcript persistently

  console.log(transcript);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setSaving(true);
        try {
          await onSave(audioBlob, transcriptRef.current);
        } catch (error) {
          console.error('Error saving audio:', error);
          alert('Failed to save audio recording');
        }
        setSaving(false);
      };

      // Check browser compatibility for speech recognition
      if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        alert('Your browser does not support speech recognition.');
        return;
      }

      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        const result = event.results[0][0].transcript;
        setTranscript(result);
        transcriptRef.current = result; // Store transcript in ref
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event);
      };

      recognition.start();
      mediaRecorder.start();
      setRecording(true);

      // Limit recording to 1 minute
      setTimeout(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
          stopRecording();
        }
      }, 60000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Failed to access microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setRecording(false);
    }
  };

  const handleToggleRecording = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="mb-4">
      <button
        onClick={handleToggleRecording}
        disabled={saving}
        className={`px-4 py-2 rounded-full flex items-center space-x-2 ${
          recording 
            ? 'bg-red-600 hover:bg-red-700' 
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white disabled:opacity-50`}
      >
        {saving ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            <span>Saving...</span>
          </>
        ) : (
          <>
            <Mic className={`w-5 h-5 ${recording ? 'animate-pulse' : ''}`} />
            <span>{recording ? 'Stop Recording' : 'Start Recording'}</span>
          </>
        )}
      </button>
    </div>
  );
};

export default AudioRecorder;
