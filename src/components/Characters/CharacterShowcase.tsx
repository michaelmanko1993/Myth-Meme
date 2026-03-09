import { FC, useState, useEffect, useRef } from 'react';
import { characters } from '../../data/characters';
import CharacterCard from './CharacterCard';

const INITIAL_DISPLAY_COUNT = 12;
const LOAD_MORE_COUNT = 8;

const CharacterShowcase: FC = () => {
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  const [isLoading, setIsLoading] = useState(false);
  const loadMoreRef = useRef<HTMLButtonElement>(null);

  const displayedCharacters = characters.slice(0, displayCount);
  const hasMore = displayCount < characters.length;

  const handleLoadMore = () => {
    setIsLoading(true);
    // Small delay to show loading state and prevent jarring transitions
    setTimeout(() => {
      setDisplayCount(prev => Math.min(prev + LOAD_MORE_COUNT, characters.length));
      setIsLoading(false);
    }, 100);
  };

  // Intersection Observer for infinite scroll (optional enhancement)
  useEffect(() => {
    if (!hasMore || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            setDisplayCount(prev => Math.min(prev + LOAD_MORE_COUNT, characters.length));
            setIsLoading(false);
          }, 100);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [displayCount, hasMore, isLoading]);

  return (
    <section id="legends" className="py-16 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Myth Memes Origins
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Where legends are born, battles rage across realms of light and darkness, 
            and the future of myth begins today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {displayedCharacters.map((character) => (
            <CharacterCard 
              key={character.id} 
              character={character} 
              size="medium"
            />
          ))}
        </div>

        <div className="text-center mt-12 space-y-4">
          {hasMore && (
            <button
              ref={loadMoreRef}
              onClick={handleLoadMore}
              disabled={isLoading}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold py-3 px-8 rounded-full hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? 'Loading...' : `Load More (${characters.length - displayCount} remaining)`}
            </button>
          )}
          <div>
            <button
              onClick={() => {
                // Scroll to top of legends section (which is already visible, but ensures we're at the top)
                window.scrollTo({ top: 0, behavior: 'smooth' });
                // If user wants to see all, they can use Load More button
                // Or we could expand to show all immediately
                setDisplayCount(characters.length);
              }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold py-3 px-8 rounded-full hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Explore All Legends
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharacterShowcase;

