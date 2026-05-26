import { useState, useEffect } from 'react';
import './Typewriter.css';

export interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delay?: number;
}

export default function Typewriter({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  delay = 2000,
}: TypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) {
      return;
    }

    const currentWord = words[currentWordIndex];

    const handleTick = () => {
      if (isDeleting) {
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        } else {
          setCurrentText((prev) => prev.slice(0, -1));
        }
      } else {
        if (currentText === currentWord) {
          setIsDeleting(true);
        } else {
          setCurrentText((prev) => currentWord.slice(0, prev.length + 1));
        }
      }
    };

    const isWordTyped = !isDeleting && currentText === currentWord;
    const speed = isWordTyped ? delay : isDeleting ? deletingSpeed : typingSpeed;

    const timer = setTimeout(handleTick, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delay]);

  if (!words || words.length === 0) {
    return null;
  }

  return (
    <span className="typewriter">
      <span className="typewriter-text">{currentText}</span>
      <span className="typewriter-cursor" aria-hidden="true">
        |
      </span>
    </span>
  );
}
