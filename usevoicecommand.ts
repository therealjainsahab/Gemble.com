import { useState, useCallback, useEffect } from 'react';

interface VoiceCommand {
  command: string | RegExp;
  callback: () => void;
}

export const useVoiceCommands = (commands: VoiceCommand[]) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) return;

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');

      setTranscript(transcript);
      
      commands.forEach(({ command, callback }) => {
        if (typeof command === 'string') {
          if (transcript.toLowerCase().includes(command.toLowerCase())) {
            callback();
          }
        } else if (command.test(transcript)) {
          callback();
        }
      });
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => recognition.stop();
  }, [isListening, commands]);

  const toggleListening = useCallback(() => {
    setIsListening((prev) => !prev);
  }, []);

  return { isListening, transcript, toggleListening };
};
