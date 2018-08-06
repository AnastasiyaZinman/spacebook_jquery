var SpacebookApp = function () {
    return {
      posts: [
        {
          text: "Hello world", id: 1, comments: [
            { text: "Man, this is a comment!" },
            { text: "Man, this is a comment!" },
            { text: "Man, this is a comment!" }
          ]
        },
        {
          text: "Hello world", id: 2, comments: [
            { text: "Man, this is a comment!" },
            { text: "Man, this is a comment!" },
            { text: "Man, this is a comment!" }
          ]
        },
        {
          text: "Hello world", id: 3, comments: [
            { text: "Man, this is a comment!" },
            { text: "Man, this is a comment!" },
            { text: "Man, this is a comment!" }
          ]
        }
      ],
  
      // the current id to assign to a post
      currentId: 4,
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
          id: this.currentId
        }
  
        this.currentId += 1;
  
        this.posts.push(post);
      },
  
      renderPosts: function () {
        this.$posts.empty();
  
        for (var i = 0; i < this.posts.length; i += 1) {
          var post = this.posts[i];
  
          var commentsContainer = `<div class="comments-container">
                                    <input type="text" class="comment-name">
                                    <button class="btn btn-primary add-comment">Post Comment</button> 
                                    <ul></ul>
                                  </div>`;
                                  //${this.getCommentsHTML(commentsConteiner,post)} 
  
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
      createComment: function (id,text) {
        var comment = {
          text: text
        }
        console.log(comment);
        this.posts[id].comments.push(comment);
        console.log(this.posts[id].comments);
      },
      removeComment: function () {
        //TODO
      },
      getCommentsHTML: function (cl_div,index) { 
        $(cl_div).find("p").remove();
        console.log(index);
        if (this.posts){
          // var $clickedPost = $(this).closest('.post');
          // var postID = $clickedPost.data().id;
          //var post = app._findPostById(postID);
          // var index= app.posts.indexOf(post);
          for(let i=0;i<app.posts[index]["comments"].length;i++)
          $(cl_div).find("ul").append("<p>" + app.posts[index]["comments"][i].text + "</p>");
              }      else console.log('empty');
      }
    };
  }
  function bindEvents() {
     $('.add-comment').off();
    $('.add-comment').click(function () {
        var $clickedPost = $(this).closest('.post');
        var postID = $clickedPost.data().id;
        var post = app._findPostById(postID);
        var index= app.posts.indexOf(post);
        var text = $(this).parent('.comments-container').children('.comment-name').val();
        app.createComment(index,text);
        app.getCommentsHTML($clickedPost,index);
        
    });
  }
  var app = SpacebookApp();
  
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
  