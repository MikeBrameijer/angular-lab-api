function RedditFeed(RedditService, $q) {
  const ctrl = this;
  //list of reddit post to display
  ctrl.feed = [];
  /**
   * Call https://www.reddit.com/r/aww/.json
   * and set ctrl.feed to be the results
   */
  ctrl.fetchAwwSubreddit = () => {
    return $q(function (resolve, reject) {
      RedditService.fetchAwwServiceSubreddit()
        .then((response) => {
          console.log(response);
          // This method is what is used to get data from the promise once it has been resolved
          let unicorn = response.data.data.children;
          unicorn.forEach(function (spot, howLong) {
            let childObj = {
              title: spot.data.title,
              img: spot.data.thumbnail,
              link: spot.data.url
            }
            ctrl.feed.push(childObj);

            // if (howLong === 10) {
            //   resolve()
            // }

          });

        });
    });
  }
  ctrl.fetchAwwSubreddit();
}

angular
  .module('RedditApp')
  .component('redditFeed', {
    template: `
    <hr>
    <div class="container" ng-repeat="post in $ctrl.feed"> 
      <a href="{{post.link}}"><img src="{{post.img}}"/></a>  
      <br>
      <h2>{{post.title}}</h2>  
    </div>
    <br>`,
    controller: RedditFeed,

  });
