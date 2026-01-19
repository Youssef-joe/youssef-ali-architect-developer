import { useState, useEffect, useCallback } from 'react';

const chars = '!<>-_\\/[]{}—=+*^?#________';

export function useTextScramble(finalText: string, delay: number = 0) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const scramble = useCallback(() => {
    setIsComplete(false);
    let iteration = 0;
    const totalIterations = finalText.length * 3;

    const interval = setInterval(() => {
      setDisplayText(
        finalText
          .split('')
          .map((char, index) => {
            if (index < iteration / 3) {
              return finalText[index];
            }
            if (char === ' ') return ' ';
            // For Arabic characters, just reveal them
            if (/[\u0600-\u06FF]/.test(char)) {
              return index < iteration / 3 ? char : '_';
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= totalIterations) {
        clearInterval(interval);
        setDisplayText(finalText);
        setIsComplete(true);
      }

      iteration += 1;
    }, 30);

    return () => clearInterval(interval);
  }, [finalText]);

  useEffect(() => {
    const timeout = setTimeout(scramble, delay);
    return () => clearTimeout(timeout);
  }, [scramble, delay]);

  return { displayText, isComplete };
}