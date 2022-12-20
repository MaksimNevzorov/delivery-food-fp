const generateMovies = (qty) => {
  return new Array(qty).fill(null).map((_, index) => ({
    id: index,
    title: `dish ${index}`,
    rating: Math.ceil(Math.random(index) * 5),
    poster: `dish${index + 1}.jpg`,
    comments: [
      {
        title: "Comment 1",
        comment: "Lorem ipsum",
      },
    ],
  }));
};

export const dishes = generateMovies(18);
