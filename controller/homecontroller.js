module.exports.home=function(req,res){
    // return res.end("<h1>Express homecontroller is here</h1>");
    return res.render('home',{
        title:"Home"
    });
}

