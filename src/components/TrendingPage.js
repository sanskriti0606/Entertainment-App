// client/src/components/TrendingPage.js
import React, { useEffect, useState } from 'react';
import './TrendingPage.css';
import './MoviesPage.css'; // Import the same CSS file used in MoviesPage
import SearchBox from './SearchBox'; // Import the SearchBox component
import RecommendedPage from './RecommendedPage';

const TrendingPage = () => {
  const [trending, setTrending] = useState([]);
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [playingVideo, setPlayingVideo] = useState(null);

// Sample trending data
  const sampleTrending = [
    {
      title: 'Inception',
      releaseYear: '2010',
      imageUrl: '/images/inception.jpg',
      videoUrl: '/images/Entertainment App Movie Video Sample.mp4',
    },
    {
      title: 'Breaking Bad',
      releaseYear: '2008',
      imageUrl: '/images/breaking-bad.jpg',
      videoUrl: '/images/Entertainment App Movie Video Sample.mp4',
    },
    {
      title: 'The Shawshank',
      releaseYear: '1994',
      imageUrl: '/images/shawshank-redemption.jpg',
      videoUrl: '/images/Entertainment App Movie Video Sample.mp4',
    },
    {
      title: 'Stranger Things',
      releaseYear: '2016',
      imageUrl: '/images/stranger-things.jpg',
      videoUrl: '/images/Entertainment App Movie Video Sample.mp4',
    },
    {
      title: 'The Dark Knight',
      releaseYear: '2008',
      imageUrl: '/images/dark-knight.jpg',
      videoUrl: '/images/Entertainment App Movie Video Sample.mp4',
    },
    {
      title: 'Friends',
      releaseYear: '1994',
      imageUrl: '/images/friends.jpg',
      videoUrl: '/images/Entertainment App Movie Video Sample.mp4',
    },
    {
      title: 'Pulp Fiction',
      releaseYear: '1994',
      imageUrl: '/images/pulp-fiction.jpg',
      videoUrl: '/images/Entertainment App Movie Video Sample.mp4',
    },
    {
      title: 'Game of Thrones',
      releaseYear: '2011',
      imageUrl: '/images/game-of-thrones.jpg',
      videoUrl: '/images/Entertainment App Movie Video Sample.mp4',
    },
    {
      title: 'Fight Club',
      releaseYear: '1999',
      imageUrl: '/images/fight-club.jpg',
      videoUrl: '/images/Entertainment App Movie Video Sample.mp4',
    },
    {
      title: 'Forrest Gump',
      releaseYear: '1994',
      imageUrl: '/images/forrest-gump.jpg',
      videoUrl: '/images/Entertainment App Movie Video Sample.mp4',
    },
    {
      title: 'The Matrix',
      releaseYear: '1999',
      imageUrl: '/images/matrix.jpg',
      videoUrl: '/images/Entertainment App Movie Video Sample.mp4',
    },
    {
      title: 'The Godfather',
      releaseYear: '1972',
      imageUrl: '/images/godfather.jpg',
      videoUrl: '/images/Entertainment App Movie Video Sample.mp4',
    },
    {
      title: 'The Crown',
      releaseYear: '2016',
      imageUrl: '/images/the-crown.jpg',
      videoUrl: '/images/Entertainment App Movie Video Sample.mp4',
    },
    {
      title: 'Narcos',
      releaseYear: '2015',
      imageUrl: '/images/narcos.jpg',
      videoUrl: '/images/Entertainment App Movie Video Sample.mp4',
    },
    {
      title: 'Black Mirror',
      releaseYear: '2011',
      imageUrl: '/images/black-mirror.jpg',
      videoUrl: '/images/Entertainment App Movie Video Sample.mp4',
    },
    {
      title: 'The Mandalorian',
      releaseYear: '2019',
      imageUrl: '/images/mandalorian.jpg',
      videoUrl: '/images/Entertainment App Movie Video Sample.mp4',
    },
    {
      title: 'Westworld',
      releaseYear: '2016',
      imageUrl: '/images/westworld.jpg',
      videoUrl: '/images/Entertainment App Movie Video Sample.mp4',
    },
    // ... (other trending items)
  ];

  useEffect(() => {
    // Use either the API call or the sample data, depending on your preference.
    // For now, let's use the sample data.
    setTrending(sampleTrending);

    // If you want to fetch data from an API:
    // axios.get('/api/trending').then((response) => {
    //   setTrending(response.data);
    // }).catch((error) => {
    //   console.error('Error fetching trending:', error);
    // });
  }, []);

  const handleBookmark = (item) => {
    // Implement your logic to add/remove items from bookmarks
    const isBookmarked = bookmarkedItems.some((bookmarkedItem) => bookmarkedItem.title === item.title);

    if (isBookmarked) {
      // If already bookmarked, remove from bookmarks
      const updatedBookmarks = bookmarkedItems.filter((bookmarkedItem) => bookmarkedItem.title !== item.title);
      setBookmarkedItems(updatedBookmarks);
    } else {
      // If not bookmarked, add to bookmarks
      setBookmarkedItems([...bookmarkedItems, item]);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const playVideo = (videoUrl) => {
    setPlayingVideo(videoUrl);
  };

  const stopVideo = () => {
    setPlayingVideo(null);
  };


  const filteredTrending = trending.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log('Trending state:', filteredTrending);
  console.log('Bookmarked state:', bookmarkedItems);

  return (
    <div>
      <SearchBox onSearch={handleSearch} /> {/* Include the SearchBox component */}
      <h2 className="movies-header">Trending</h2>
      {playingVideo && (
        <div className="video-overlay" onClick={stopVideo}>
          {/* Video component goes here */}
          <video
            className="centered-video"
            width="70%"
            controls
            autoPlay
            onEnded={stopVideo}
          >
            <source src={playingVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <div className="trending-list">
        {filteredTrending.slice(0, 8).map((item) => (
          <div key={item.title} className="movie-card">
            <img src={item.imageUrl} alt={item.title} />
            <h3>{item.title}</h3>
            <p>Release Year: {item.releaseYear}</p>
            <div
              className="play-button"
              onClick={() => playVideo(item.videoUrl)}
            >
              ▶ Play
            </div>
            <div className="bookmark-button" onClick={() => handleBookmark(item)}>
              {bookmarkedItems.some((bookmarkedItem) => bookmarkedItem.title === item.title)
                ? 'Bookmarked'
                : 'Bookmark'}
            </div>
          </div>
        ))}
      </div>

      {/* Recommended for You section */}

      {/* Movie cards from RecommendedPage */}
      <RecommendedPage />

    </div>
  );
};

export default TrendingPage;