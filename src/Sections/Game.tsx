import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Multi-Game Arcade Component
 * Embeds the game iframe with proper styling and responsive design
 */
const Game = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Ensure iframe loads properly
    if (iframeRef.current) {
      iframeRef.current.addEventListener('load', () => {
        // Optional: Handle iframe load events
      });
    }
  }, []);

  return (
    <section
      id='game'
      className='relative h-screen flex flex-col items-center justify-center overflow-hidden'
    >
      {/* Background graphics (matching your portfolio style) */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <svg
          className='absolute top-0 left-0 w-full h-full opacity-5'
          xmlns='http://www.w3.org/2000/svg'
        >
          <defs>
            <linearGradient id='gameLineGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop offset='0%' stopColor='#10B981' stopOpacity='0.4' />
              <stop offset='50%' stopColor='#8B5CF6' stopOpacity='0.4' />
              <stop offset='100%' stopColor='#3B82F6' stopOpacity='0.4' />
            </linearGradient>
          </defs>
          <path
            d='M 0 50 L 200 100 L 400 30 L 600 120 L 800 60 L 1000 110 L 1200 40'
            stroke='url(#gameLineGradient)'
            strokeWidth='2'
            fill='none'
          />
        </svg>
        <div className='absolute top-0 right-1/4 w-96 h-96 bg-accent-green/5 rounded-full blur-3xl animate-pulse' />
        <div
          className='absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-3xl animate-pulse'
          style={{ animationDelay: '1s' }}
        />
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full h-full flex flex-col relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mb-4 sm:mb-6 text-center flex-shrink-0'
        >
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-3 text-white'>
            🎮 Multi-Game Arcade
          </h2>
          <p className='text-text-muted text-xs sm:text-sm'>
            Play 6 classic games: Snake, Pong, Breakout, Tetris, Memory Cards, and Space Invaders
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='relative w-full bg-background rounded-xl overflow-hidden shadow-2xl border border-accent-green/20 flex-1 min-h-0'
        >
          <iframe
            ref={iframeRef}
            src='/games/multi-game-arcade/index.html'
            className='w-full h-full border-0'
            title='Multi-Game Arcade'
            allow='fullscreen'
            loading='lazy'
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Game;

