var id_count = 0, PostsList = [];
CommentsList = [], id_comment=0;

function AddComment(id_post,text) {
    var Comment = {
    'id': id_post,
    'id_comment' : id_comment+=1,
    'name_author': 'name',
    'text': text,
    }
    CommentsList.push(Comment);
    CleartextForm();
    console.log(CommentsList);
}
function CleartextForm() {
   $(".form-control").val("");

}

function AddPost(post_text) {
    var Post = {
        'id': id_count += 1,
        'text': post_text
    };
    return Post;
}
function IdCommentUpdate (){
    id_comment=0;
}
function PushPostToPostList(new_post) {
    PostsList.push(new_post);
}
var bindEvents = function () {
    $('.remove').off();
    $('.add-comment-form').off();

    $('.add-comment-form').click(function () { 
        $(this).closest("p").find("button").hide();
        var post_id = $(this).closest("p").data().id;
        $(this).closest("p").append(" <textarea id='" + post_id + "_" 
        + (id_comment+1) +  "' class='form-control' aria-label='With textarea'></textarea>");
        $(this).closest("p").append("<button type='reset' class='btn btn-success send-comment'>Send</button>");
        bindCommentsEvents(post_id);
    });

    var bindCommentsEvents = function (post_id) {
        $('.send-comment').off();
        $('.send-comment').click(function () { 
        var CommentText = $('.form-control').val();
        AddComment(post_id,CommentText);
        RenderComments();
        }
    )}

    
    $('.remove').click(function () {
        $(this).closest("p").remove();
        var post_id = $(this).closest("p").data().id;
        // console.log(post_id);
        var array_id = findPost(post_id);
        deleteItemFromPostsList(array_id);
    });
}
function findPost(post_id) {
    var j = 0;
    while ((PostsList[j].id !== post_id) && (j < PostsList.length)) {
        j++;
        if (j === PostsList.length)  return null 
        else  return j 
    }
    }
    function deleteItemFromPostsList(array_id) {
        if (array_id !== null)
            PostsList.splice(array_id, 1);
        else alert("Error. Can't find an element");
        console.log(PostsList);
    }

    function RenderPosts() {
        $('.posts').empty();
        if (PostsList) {
            PostsList.forEach(function (element, index) {
                $('.posts').append("<p class='post' data-id='" + PostsList[index].id + "' >" + PostsList[index].text +
                "   <button type='button' class='remove close' aria-label='Close'><span aria-hidden='true'>&times;</span>REMOVE</button>" +'<br>'+  
                "<button class='btn btn-info add-comment-form' type='reset'>Add comment</button>" +'</p>');
                bindEvents();
            })
        }
        $('.posts').append("<ul> <ul>");
    }
    function RenderComments() {
        $('ul').empty();
        if (CommentsList) {
            CommentsList.forEach(function (element, index) {
            $('ul').append("<li"+ "class='" + CommentsList[index].id + "'>" 
            + CommentsList[index].text + "</li><br>")
            })
    }
    }

    $('button').on('click', function () {
        var PostText = $('#post-name').val();
        post = AddPost(PostText);
        
        PushPostToPostList(post);
        IdCommentUpdate();
        // console.log(PostsList);
        RenderPosts();
    })

