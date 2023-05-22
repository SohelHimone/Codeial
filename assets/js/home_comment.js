{ 
    let createcomment=function(){
        let newcommentform=$('#comment-form');
        newcommentform.submit(function(e){
            e.preventDefault();
        
        
    //     $.ajax({
    //         type:'post',
    //         url:'/posts/create',
    //         data: newpostform.serialize(),
    //         success:function(data){
    //             // console.log(data)
    //             let newpost= newpostdom(data.data.post);
    //             $('#post-list-container').prepend(newpost);
    //             deletepost($(' .delete-post',newpost));
    //         },
    //         error:function(error){
    //             console.log(error.responseText);
    //         }
    //     })
    })
    }

    // let deletepost=function(deletelink){
    //     $(deletelink).click(function(e){
    //         e.preventDefault();

    //         $.ajax({
    //             type:'get',
    //             url:$(deletelink).prop('herf'),
    //             success:function(data){
    //                 $(`#post-${data.data.post._id}`).remove();
    //             },
    //             error:function(error){
    //                 console.log(error.responseText);
    //             }
    //         })
    //     })
    //  }
    // //creating dom
    // let newpostdom=function(post){
    //     return (`<li id="post-${post._id}">
        
    //     <small>
    //         <a class="delete-btn" href="/posts/destroy/${post._id}">Delete</a>
    //     </small>
        
    //     <p>${post.content}</p>
    //     <p>${post.user.name}</p>
    // </li>
    // <div class="comments-container">
        
    //         <form action="/comments/create" method="post">
    //             <input type="text" name="content" placeholder="Add comment here..." required>
    //             <input type="hidden" name="post" value="${post._id}">
    //             <input type="submit" value="Add Comment">
    //         </form>
       
    //     <!-- this id for comment section -->
    //     <div>
    //         <ul>
    //             <%for (comment of post.comment){%>
    //                 <%-include('_comment')-%>
    //             <%}%>
            
    //             </ul>
                
    //         </div>
    
    //     </div>`)
    // }
    createcomment();

}
    