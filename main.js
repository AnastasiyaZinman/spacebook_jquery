var SpacebookApp = function () {
  return {
    posts: [
      {
        text: "Hello world 1", id: 1, comments: [
          { text: "Man, this is a comment 1!" },
          { text: "Man, this is a comment 2!" },
          { text: "Man, this is a comment 3!" }
        ]
      },
      {
        text: "Hello world 2", id: 2, comments: [
          { text: "Man, this is a comment 1!" },
          { text: "Man, this is a comment 2!" },
          { text: "Man, this is a comment 3!" }
        ]
      }
    ],

    // the current id to assign to a post
    currentId: 3,
    $posts: $('.posts'),

    _findPostById: function (id) {
      for (var i = 0; i < this.posts.length; i += 1) {
        if (this.posts[i].id === id) {
          return this.posts[i];
        }
      }
    },


    createPost: function (text) {
      var post = {
        text: text,
        id: this.currentId,
        comments: []
      }

      this.currentId += 1;

      this.posts.push(post);
    },

    renderPosts: function () {
      this.$posts.empty();

      for (var i = 0; i < this.posts.length; i += 1) {
        var post = this.posts[i];
        var cur_div = $('.comments-container');
        var commentsContainer = `<div class="comments-container">
                                  <input type="text" class="comment-name">
                                  <button class="btn btn-primary add-comment">Post Comment</button> 
                                  <ul>${this.getCommentsHTML(GetIndexOfPost(post))}</ul>
                                </div>
        `;

        this.$posts.append('<div class="post" data-id=' + post.id + '>'
          + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
          commentsContainer + '</div>'); bindEvents();
      }
    },

    removePost: function (post) {
      
      this.posts.splice(this.posts.indexOf(post), 1);
    },

    toggleComments: function (currentPost) {
      var $clickedPost = $(currentPost).closest('.post');
      $clickedPost.find('.comments-container').toggleClass('show');
    },
    createComment: function (id, text) {
      var comment = {
        text: text
      }

      this.posts[id].comments.push(comment);
      // console.log("com",this.posts[id].comments);

    },
    removeComment: function (cur_btn) {
      console.log("cur_btn",cur_btn);
      $clickedComment=$(cur_btn).prev(".comment_text");
      var $comment_text=$clickedComment.text();
      
      let $postID = $(cur_btn).closest('.post').data().id;
      console.log("$postID",$postID);
      // debugger;
      var post = GetPost($postID);
      var index = GetIndexOfPost(post);
      var $commentIndex=SearchCommentIndex(index,$comment_text );
      this.posts[index].comments.splice($commentIndex, 1);
      app.renderPosts();
    },

    getCommentsHTML: function (id) {
        var comments_str = '';
        if (this.posts[id]) {
        for (let i = 0; i<this.posts[id].comments.length; i++) {
          comments_str = comments_str + `<p class='comment' data-commentid=${i}><span class="comment_text">${this.posts[id].comments[i].text}</span><button type='button' class='close' aria-label='Close'><span aria-hidden='true'>&times;</span>REMOVE</button></p>`;
        }
      }
        return comments_str;
    }
  };
}
var app = SpacebookApp();

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
function SearchCommentIndex(index,text) {
for(let j=0; j<app.posts[index].comments.length;j++)
if (text===app.posts[index].comments[j].text) 
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
  return app.posts.indexOf(post);
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
