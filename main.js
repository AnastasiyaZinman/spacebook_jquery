var SpacebookApp = function () {
  return {
    posts: [
      {
        text: "Hello world 1", id: 1, comments: [
          { text: "Man, this is a comment!" },
          { text: "Man, this is a comment!" },
          { text: "Man, this is a comment!" }
        ]
      },
      {
        text: "Hello world 2", id: 2, comments: [
          { text: "Man, this is a comment!" },
          { text: "Man, this is a comment!" },
          { text: "Man, this is a comment!" }
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
                                  <ul></ul>
                                </div>`;
        //${this.getCommentsHTML(cur_div,GetIndexOfPost(post))}

        this.$posts.append('<div class="post" data-id=' + post.id + '>'
          + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
          commentsContainer + '</div>'); bindEvents();
      }
    },

    removePost: function (postID) {
      var post = this._findPostById(postID);
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
      console.log("com",this.posts[id].comments);

    },
    removeComment: function (cur_btn) {
      let $clickedComment = $(cur_btn).closest('.comment');
      let $commentID = $clickedComment.data().commentid;
      console.log("$commentID",$commentID);
      let $postID = $(cur_btn).closest('.post').data().id;
      console.log("$postID",$postID);
      // debugger;
      // console.log("post",app.posts[$postID-1]);
       console.log("splice",this.posts[$postID-1].comments.splice($commentID, 1));
     app.getCommentsHTML($(cur_btn).parent,$postID-1);
      // app.renderPosts();
    },

    getCommentsHTML: function (current_dom, index) {
      $(current_dom).find("p").remove();;
      console.log(index);
      if (this.posts[index]["comments"].length) {
        for (let i = 0; i < app.posts[index]["comments"].length; i++) {
          console.log("i=", i);
          $(current_dom).find("ul").append("<p class='comment' data-commentid='"+ i +"'>" +
            app.posts[index]["comments"][i].text +
            "<button type='button' class='close' aria-label='Close'><span aria-hidden='true'>&times;</span>REMOVE</button>" + "</p>");
          bindCommentsEvents();
        }
      } else console.log('empty');
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
    var text = $(FindCurrentDiv(this)).children('.comment-name').val();
    app.createComment(index, text);
    app.getCommentsHTML(FindCurrentDiv(this), index);
  });
}

function bindCommentsEvents() {
  $('.close').off();
  $('.close').click(function () {
    app.removeComment(this);
  });
}

function FindCurrentDiv(obj_dom) {
  return $(obj_dom).parent('.comments-container');
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
  app.removePost(postID);
  app.renderPosts();
});

$('.posts').on('click', '.show-comments', function () {
  app.toggleComments(this);
});
