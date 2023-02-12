module.exports.profile=function(req,res){
    // return res.end('<h1>this user Profile controller</h1>')
    return res.render('home',{
        title:"Profile",
        msg:('this user Profile controller')
    
    });
}


module.exports.post=function(req,res){
    // return res.end('<h1>this user post controller</h1>')
    return res.render('home',{
        title:"Post",
        msg:('this user Post controller')
    });
}