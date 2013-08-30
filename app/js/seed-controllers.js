'use strict';

/* Controllers */

angular.module('TechGrindApp.oldcontrollers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('BlogSpot', ['$scope', '$resource', function(S, r) {
              S.date = function(blogspotdate) {
                                  var date = new Date(blogspotdate)
                      var monthNames = [ "January", "February", "March",
                      "April", "May", "June", "July",
                      "August", "September", "October",
                      "November", "December" ];
                  return { day: date.getDate(), month: monthNames[date.getMonth()] }
                          }
                      S.blogspot = r("http://techgrind1.blogspot.com/feeds/posts/default",
                                          {alt:'json', callback:'JSON_CALLBACK'},
                                                          {get: {method:'JSONP', isArray: false}})
                              S.blog = S.blogspot.get()
              S.blogs = {}
          S.getblog = function(category) {
                              if (!S.blogs[category])
                              S.blogs[category] = S.blogspot.get({category:category})
                      return S.blogs[category]
              }       
  }]);
