export function normalizeMovieCard(item, rank = 1) {
  if (!item) return null;
  return {
    "#IMDB_ID": item.imdbID,
    "#AKA": item.Title,
    "#TITLE": item.Title,
    "#IMG_POSTER": item.Poster && item.Poster !== "N/A" ? item.Poster : "https://www.prokerala.com/movies/assets/img/no-poster-available.webp",
    "#RANK": rank,
    "#YEAR": item.Year,
    "#ACTORS": item.Actors || ""
  };
}

export function normalizeSingleMovie(data) {
  if (!data) return null;
  const actors = data.Actors ? data.Actors.split(", ").map(n => ({ name: n })) : [];
  const directors = data.Director ? data.Director.split(", ").map(n => ({ name: n })) : [];
  const writers = data.Writer ? data.Writer.split(", ").map(n => ({ name: n })) : [];
  
  return {
    short: {
      name: data.Title,
      datePublished: data.Year,
      genre: data.Genre ? data.Genre.split(", ") : [],
      image: data.Poster !== "N/A" ? data.Poster : "",
      description: data.Plot,
      director: directors,
      creator: writers,
      actor: actors,
      aggregateRating: {
        ratingValue: data.imdbRating,
        bestRating: "10",
        ratingCount: data.imdbVotes
      }
    },
    top: {
      runtime: { displayableProperty: { value: { plainText: data.Runtime } } },
      videos: { total: 1 },
      images: { total: 1 },
      engagementStatistics: { watchlistStatistics: { displayableCount: { text: "Watchlist" } } }
    },
    main: {
      cast: {
        total: actors.length,
        edges: actors.map(a => ({
          node: {
            name: { nameText: { text: a.name }, primaryImage: { url: "" } },
            characters: [{ name: "" }]
          }
        }))
      }
    }
  };
}
