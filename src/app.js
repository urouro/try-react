(function (React, $) {
  "use strict";

  var jsonMockUrl = 'http://www.mocky.io/v2/55405e5cbe2f27040f0072cb';


  // - components

  /**
   *  CommentsBox
   *
   *  @param url
   */
  var CommentList = React.createClass({
    getInitialState: function () {
      return {data: []}
    },
    componentDidMount: function () {
      var url = this.props.url;

      $.ajax({
        url: url,
        dataType: 'json',
        success: function (data) {
          console.log(data);
          this.setState({data: data});
        }.bind(this),
        error: function (xhr, status, error) {
          console.error(url, status, error.toString());
        }.bind(this)
      });
    },
    render: function () {
      /**
      `data` should be

      ```
      [
       {name: "", comment: ""},
       ...
      ]
      ```
      */
      var data = this.state.data;

      var commentNodes = data.map(function (comment) {
        return (
          <div>
            <div>{comment.name}</div>
            <div>{comment.comment}</div>
          </div>
        );
      });

      return (
        <div className="commentList">
          {commentNodes}
        </div>
      );
    }
  });

  /**
   *  CommentForm
   *
   */
  var CommentForm = React.createClass({
    handleSubmit: function (e) {
      e.preventDefault();

      var author = React.findDOMNode(this.refs.name).value.trim();
      var comment = React.findDOMNode(this.refs.comment).value.trim();

      if (!author || !comment) {
        return;
      }

      // Send request to the server

      React.findDOMNode(this.refs.name).value = '';
      React.findDOMNode(this.refs.comment).value = '';

      return;
    },
    render: function () {
      return (
        <form className="commentForm" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="名前" ref="name" />
          <input type="text" placeholder="コメント" ref="comment" />
          <input type="submit" value="登録" />
        </form>
      );
    }
  });


  // - render

  React.render(
    <CommentList url={jsonMockUrl} />,
    document.getElementById('comments')
  );

  React.render(
    <CommentForm />,
    document.getElementById('new-comment')
  );
})(React, jQuery);
