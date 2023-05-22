{
    let createpost=function(){
        let newpostform=$('#new-feed-form');
        newpostform.submit(function(e){
        e.preventDefault();
        
        $.ajax({
            type:'post',
            url:'/posts/create',
            data: newpostform.serialize(),
            success:function(data){
                // console.log(data)
                let newpost= newpostdom(data.data.post);
                $('#post-list-container>ul').prepend(newpost);
                deletepost($(' .delete-post',newpost));

                new ToggleLike($(' .toggle-like-button',newpost))
            },
            error:function(error){
                console.log(error.responseText);
            }
        })
    })
    }
    
     //creating delete function by ajax
     let deletepost=function(deletelink){
        $(deletelink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deletelink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error:function(error){
                    console.log(error.responseText);
                }
            })
        })
     }
    //creating dom
    let newpostdom=function(post){
        return (`<li id="post-${post._id}">
        
        <small>
            <a class="delete-btn" href="/posts/destroy/${post._id}">Delete</a>
        </small>
        
        <p>${post.content}</p>
        <p>${post.user.name}</p>
        <small>
        <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">0 Likes</a>
        </small>
   
    <div class="comments-container">
        
            <form action="/comments/create" method="post" id="comment-form">
                <input type="text" name="content" placeholder="Add comment here..." required>
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Add Comment">
            </form>
       
        <!-- this id for comment section -->
        <div>
            <ul id="post-comment-${post._id}">
                
            </ul>
                
        </div>
    
        </div>
        </li>`)
    }
    createpost();
}






