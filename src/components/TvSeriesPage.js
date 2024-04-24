import React, { useEffect, useState } from 'react';
import './MoviesPage.css'; // Import the same CSS file used in MoviesPage
import SearchBox from './SearchBox'; // Import the SearchBox component

const TvSeriesPage = () => {
  const [tvSeries, setTvSeries] = useState([]);
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [playingVideo, setPlayingVideo] = useState(null);

  // Sample TV series data with video URLs
  const sampleTvSeries = [
    {
      title: 'Breaking Bad',
      releaseYear: '2008',
      posterUrl: '/images/breaking-bad.jpg',
      videoUrl: '/images/Entertainment App Movie Video Sample.mp4',
    },
{
      title: 'Stranger Things',
      releaseYear: '2016',
      posterUrl: '/images/stranger-things.jpg',
      videoUrl: '/images/Entertainment App Movie Video Sample.mp4',
    },
    {
      title: 'The Crown',
      releaseYear: '2016',
      posterUrl: '/images/the-crown.jpg',
      videoUrl: '/images/Entertainment App Movie Video Sample.mp4',
    },
    {
      title: 'Narcos',
      releaseYear: '2015',
      posterUrl: '/images/narcos.jpg',
      videoUrl: '/images/Entertainment App Movie Video Sample.mp4',
    },
    {
      title: 'Black Mirror',
      releaseYear: '2011',
      posterUrl: '/images/black-mirror.jpg',
      videoUrl: '/images/Entertainment App Movie Video Sample.mp4',
    },
    {
      title: 'The Mandalorian',
      releaseYear: '2019',
      posterUrl: '/images/mandalorian.jpg',
      videoUrl: '/images/Entertainment App Movie Video Sample.mp4',
    },
    {
      title: 'Game of Thrones',
      releaseYear: '2011',
      posterUrl: '/images/game-of-thrones.jpg',
      videoUrl: '/images/Entertainment App Movie Video Sample.mp4',
    },
    {
      title: 'Westworld',
      releaseYear: '2016',
      posterUrl: '/images/westworld.jpg',
      videoUrl: '/images/Entertainment App Movie Video Sample.mp4',
    },
    // ... Repeat this structure for other TV series
  ];

  useEffect(() => {
    // Use either the API call or the sample data, depending on your preference.
    // For now, let's use the sample data.
    setTvSeries(sampleTvSeries);

    // If you want to fetch data from an API:
    // axios.get('/api/tv-series').then((response) => {
    //   setTvSeries(response.data);
    // }).catch((error) => {
    //   console.error('Error fetching TV series:', error);
    // });
  }, []);

  const handleBookmark = (item) => {
    const isBookmarked = bookmarkedItems.some(
      (bookmarkedItem) => bookmarkedItem.title === item.title
    );

    if (isBookmarked) {
      setBookmarkedItems((prevItems) =>
        prevItems.filter((bookmarkedItem) => bookmarkedItem.title !== item.title)
      );
    } else {
      setBookmarkedItems((prevItems) => [...prevItems, item]);
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

  const filteredTvSeries = tvSeries.filter((series) =>
    series.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <SearchBox onSearch={handleSearch} />
      <h2 className="movies-header">TV Series</h2>
      {playingVideo && (
        <div className="video-overlay" onClick={stopVideo}>
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
      <div className="movies-list">
        {filteredTvSeries.map((series) => (
          <div key={series.title} className="movie-card">
            <img src={series.posterUrl} alt={series.title} />
            <p>{series.title} ({series.releaseYear})</p>
            {series.videoUrl && (
              <div
                className="play-button"
                onClick={() => playVideo(series.videoUrl)}
              >
                ▶ Play
              </div>
            )}
            <div
              className="bookmark-button"
              onClick={() => handleBookmark(series)}
            >
              {bookmarkedItems.some(
                (bookmarkedItem) => bookmarkedItem.title === series.title
              )
                ? 'Bookmarked'
                : 'Bookmark'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TvSeriesPage;
