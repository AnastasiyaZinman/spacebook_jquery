var id_count = 0, PostsList = [];

function AddPost(post_text) {
    var Post = {
        'id': id_count += 1,
        'text': post_text
    };
    return Post;
}
function PushPostToPostList(new_post) {
    PostsList.push(new_post);
}
var bindEvents = function () {
    $('.remove').off();
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
                    "   <button type='button' class='remove close' aria-label='Close'><span aria-hidden='true'>&times;</span>REMOVE</button>" + '</p>');
                bindEvents();
            })
        }
    }

    $('button').on('click', function () {
        var PostText = $('#post-name').val();
        post = AddPost(PostText);
        PushPostToPostList(post);
        // console.log(PostsList);
        RenderPosts();
    })

