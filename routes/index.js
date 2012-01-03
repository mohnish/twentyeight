
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Register with your Facebook account in order to use Twenty8' })
};

exports.profile = function(req, res) {
  res.render('profile', { title: 'Profile page' });
}