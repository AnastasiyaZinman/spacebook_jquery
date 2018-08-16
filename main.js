//With Handlebars and LocalStorage
var STORAGE_ID = 'spacebook';
var SpacebookApp = function () {
    return {
        posts: [
      
        ],

        $posts: $('.posts'),

        _findPostById: function (id) {
            var PostsFromLocalStorage = getFromLocalStorage();
            for (var i = 0; i < PostsFromLocalStorage.length; i += 1) {
                if (PostsFromLocalStorage[i].id === id) {
                    return PostsFromLocalStorage[i];
                }
            }
        },
        
        createPost: function (text) {
            var post = {
                text: text,
                id: guidPostId(),
                comments: []
            }

            // this.currentId += 1;

            this.posts.push(post);
            saveToLocalStorage();
        },

        renderPosts: function () {
            this.$posts.empty();
            var postsLS = getFromLocalStorage();
            app.posts = postsLS;
            // var obj = {"posts":postsLS};
            var source = $('#post-template').html();
            var template = Handlebars.compile(source);
            var newHTML = template({"posts":postsLS});
            this.$posts.append(newHTML);
            bindEvents();
            saveToLocalStorage();
        },

        removePost: function (post) {
            this.posts.splice(this.posts.indexOf(post), 1);
            saveToLocalStorage();
        },
        
        toggleComments: function (currentPost) {
            var $clickedPost = $(currentPost).closest('.post');
            $clickedPost.find('.comments-container').toggleClass('show');
        },
        createComment: function (id, text) {
            var comment = {
                text: text
            }
            console.log("id",id);
            this.posts[id].comments.push(comment);
            // console.log("com",this.posts[id].comments);
            saveToLocalStorage();
        },
        removeComment: function (cur_btn) {
            let postID = $(cur_btn).closest('.post').data().id;
            let commentIndex = $(cur_btn).closest("p").index();
             var post = GetPost(postID); 
            let post_index = GetIndexOfPost(post);
            app.posts[post_index].comments.splice(commentIndex, 1);
            saveToLocalStorage();
            app.renderPosts();
        },

        getCommentsHTML: function (id) {
            var comments_str = '';
            if (this.posts[id]) {
                for (let i = 0; i < this.posts[id].comments.length; i++) {
                    comments_str = comments_str + `<p class='comment' data-commentid=${i}><span class="comment_text">${this.posts[id].comments[i].text}</span><button type='button' class='close' aria-label='Close'><span aria-hidden='true'>&times;</span>REMOVE</button></p>`;
                }
            }
            return comments_str;
        }
    };
}

var app = SpacebookApp();

var saveToLocalStorage = function () {
    localStorage.setItem(STORAGE_ID, JSON.stringify(app.posts));
  }
  var getFromLocalStorage = function () {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
  }

  var guidPostId = function (){
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
    }
     
    // then to call it, plus stitch in '4' in the third group
    guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    return guid;
  }

function bindEvents() {
    $('.add-comment').off();
    $('.add-comment').click(function () {
        var postAndId = GetPostAndId(this);
        var post = GetPost(postAndId.postId);
        var index = GetIndexOfPost(post);
        var text = $(FindCurrentDiv(this)).find('.comment-name').val();
        app.createComment(index, text);
        app.renderPosts();
    });
}

$('body').on('click', '.close', function () {
    console.log("delete");
    app.removeComment(this);
});

function FindCurrentDiv(obj_dom) {
    return $(obj_dom).parent('.comments-container');
}
function SearchCommentIndex(index, text) {
    let postLocalStore = getFromLocalStorage;
    for (let j = 0; j < postLocalStore[index].comments.length; j++)
        if (text === postLocalStore[index].comments[j].text)
            return j;
        else null;
}

function GetPostAndId(current_btn) {
    var $clickedPost = $(current_btn).closest('.post');
    return { 'post': $clickedPost, 'postId': $clickedPost.data().id }
}

function GetPost(postId) {
    var post = app._findPostById(postId);
    return post
}

function GetIndexOfPost(post) {
    let PostsFromLocalStore = getFromLocalStorage();
    for (let i=0; i<PostsFromLocalStore.length; i++)
    if(PostsFromLocalStore[i].id===post.id)
    {
    return i;}
}

// immediately invoke the render method

app.renderPosts();

// Events
$('.add-post').on('click', function () {
    var text = $('#post-name').val();
    app.createPost(text);
    app.renderPosts();
});


$('.posts').on('click', '.remove', function () {
    var $clickedPost = $(this).closest('.post');
    var postID = $clickedPost.data().id;
    var post = app._findPostById(postID);
    app.removePost(post);
    app.renderPosts();
});

$('.posts').on('click', '.show-comments', function () {
    app.toggleComments(this);
});