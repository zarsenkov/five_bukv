import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Delete, CheckCircle } from 'lucide-react';

// --- ЗАГАДАННОЕ СЛОВО ---
const SECRET_WORD = "ПИЦЦА"; 

export default function App() {
  const [guesses, setGuesses] = useState(Array(6).fill('')); // 6 попыток
  const [currentGuess, setCurrentGuess] = useState(0);
  const [input, setInput] = useState('');

  // --- ОБРАБОТКА НАЖАТИЯ КЛАВИШИ ---
  // Добавляет букву в текущую попытку
  const addLetter = (letter) => {
    if (input.length < 5) setInput(prev => prev + letter);
  };

  // --- ПРОВЕРКА СЛОВА ---
  // Фиксирует попытку и переходит к следующей
  const submitGuess = () => {
    if (input.length !== 5) return;
    const newGuesses = [...guesses];
    newGuesses[currentGuess] = input;
    setGuesses(newGuesses);
    setInput('');
    setCurrentGuess(prev => prev + 1);
  };

  // --- ОПРЕДЕЛЕНИЕ ЦВЕТА ЯЧЕЙКИ ---
  // Сравнивает букву с секретным словом
  const getStatus = (word, index) => {
    const letter = word[index];
    if (SECRET_WORD[index] === letter) return 'correct';
    if (SECRET_WORD.includes(letter)) return 'present';
    return 'absent';
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>CYBER<span style={{color: '#00FF41'}}>5</span></h1>
      
      {/* СЕТКА СЛОВ */}
      <div style={styles.grid}>
        {guesses.map((guess, i) => (
          <div key={i} style={styles.row}>
            {[...Array(5)].map((_, j) => {
              const letter = i === currentGuess ? input[j] : guess[j];
              const status = (i < currentGuess) ? getStatus(guess, j) : '';
              return (
                <div key={j} className={`cell ${status}`}>
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* ЭКРАННАЯ КЛАВИАТУРА (Набросок) */}
      <div style={styles.keyboard}>
        {["ЙЦУКЕНГШЩЗХЪ", "ФЫВАПРОЛДЖЭ", "ЯЧСМИТЬБЮ"].map((row, i) => (
          <div key={i} style={styles.keyRow}>
            {row.split('').map(char => (
              <button key={char} style={styles.key} onClick={() => addLetter(char)}>{char}</button>
            ))}
          </div>
        ))}
        <div style={styles.keyRow}>
          <button style={{...styles.key, width: '60px'}} onClick={() => setInput(input.slice(0, -1))}><Delete size={18}/></button>
          <button style={{...styles.key, width: '100px', background: '#00FF41', color: '#000'}} onClick={submitGuess}>ENTER</button>
        </div>
      </div>
    </div>
  );
}

// --- СТИЛИ ---
const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' },
  header: { fontSize: '32px', margin: '0 0 10px 0', letterSpacing: '4px' },
  grid: { display: 'flex', flexDirection: 'column', gap: '8px' },
  row: { display: 'flex', gap: '8px' },
  keyboard: { marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' },
  keyRow: { display: 'flex', gap: '4px' },
  key: { 
    background: '#222', color: '#fff', border: '1px solid #444', 
    padding: '12px 8px', borderRadius: '4px', cursor: 'pointer', 
    fontFamily: 'inherit', fontSize: '14px', fontWeight: 'bold' 
  }
};
