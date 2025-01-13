export const getTagline = () => {
  // Show a randomized tagline whenever someone arrives on the page
  const taglines = [
    'Codes for Jesus',
    'Worked at Tesla',
    'Worked at EvenVision',
    'Serves the Lord',
    'Builds the Internet',
    'Really likes Coffee',
    'Is going through a big Satisfactory phase',
    'Loves his Wife :)',
  ];

  const index = Math.floor(Math.random() * taglines.length);

  return taglines[index];
};
