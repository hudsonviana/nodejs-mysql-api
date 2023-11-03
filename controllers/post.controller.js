function index(req, res) {
  const posts = 'Post lists';
  res.send(posts);
}

module.exports = {
  index: index,
};
