
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Twenty8 stories to kick start your day' })
};  