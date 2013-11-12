/*
# 
# 	File: <name>
# 		Define file purpose: "What does this file do??? Why does it exist???"
# 
# 	Class: <name>
# 		Is this a class/object? Define its purpose: its "persona" or "role"
# 		Define its structure: what data elements, methods, etc does it need?
# 
# 	Function: <name>
# 		Is this a function? Define its purpose.
# 		Here's an example, lets say its a multiply function...
# 		Parameters/Inputs:
# 			x - The first integer.
# 		 	y - The second integer.
# 		Returns/Outputs:
# 		 	The two integers multiplied together.
# 		Example/Usage:
# 			var x = <functionName>(a,b);
# 			input.print tostring(x);
# 		 
# 	See Also:
#  		links? another file? function? webpage tutorial?
# 		anything else that can help me understand this file overall? 
#
*/


(function() {
  var app;

  app = angular.module('TechGrindApp', ['TechGrindApp.filters', 'TechGrindApp.services', 'TechGrindApp.directives', 'TechGrindApp.controllers', 'ui.bootstrap', 'LocalStorageModule']);

  app.config([
    '$routeProvider', function($routeProvider) {
      $routeProvider.when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      });
      $routeProvider.when('/content', {
        templateUrl: 'partials/content-page.html',
        controller: 'ContentCtrl'
      });
      $routeProvider.when('/regions', {
        templateUrl: 'partials/regions.html',
        controller: 'RegionsCtrl'
      });
      $routeProvider.when('/regions/:region', {
        templateUrl: 'partials/regions.html',
        controller: 'RegionsCtrl'
      });
      $routeProvider.when('/calendar', {
        templateUrl: 'partials/calendar.html',
        controller: 'CalendarCtrl'
      });
      $routeProvider.when('/events', {
        templateUrl: 'partials/events.html',
        controller: 'EventsCtrl'
      });
      $routeProvider.when('/events/new', {
        templateUrl: 'partials/createactivity.html',
        controller: 'CreateactivityCtrl'
      });
      $routeProvider.when('/events/:name', {
        templateUrl: 'partials/createactivity.html',
        controller: 'CreateactivityCtrl'
      });
      $routeProvider.when('/resources', {
        templateUrl: 'partials/resources.html',
        controller: 'ResourcesCtrl'
      });
      $routeProvider.when('/resources/jobs', {
        templateUrl: 'partials/res-jobs.html',
        controller: 'ResourcesCtrl'
      });
      $routeProvider.when('/resources/docs', {
        templateUrl: 'partials/res-docs.html',
        controller: 'ResourcesCtrl'
      });
      $routeProvider.when('/resources/tutorials', {
        templateUrl: 'partials/res-tutorials.html',
        controller: 'ResourcesCtrl'
      });
      $routeProvider.when('/resources/teamspeak', {
        templateUrl: 'partials/res-teamspeak.html',
        controller: 'ResourcesCtrl'
      });
      $routeProvider.when('/resources/media', {
        templateUrl: 'partials/res-media.html',
        controller: 'ResourcesCtrl'
      });
      $routeProvider.when('/partners', {
        templateUrl: 'partials/partners.html',
        controller: 'PartnersCtrl'
      });
      $routeProvider.when('/register', {
        templateUrl: 'partials/register.html',
        controller: 'RegisterCtrl'
      });
      $routeProvider.when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      });
      $routeProvider.when('/login/:userid', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      });
      $routeProvider.when('/activate/:userid/:activationcode', {
        templateUrl: 'partials/activation.html',
        controller: 'ActivationCtrl'
      });
      $routeProvider.when('/test-cleanup', {
        templateUrl: 'partials/home.html',
        controller: 'TestCtrl'
      });
      $routeProvider.when('/sgenome', {
        templateUrl: 'partials/sgenome.html',
        controller: 'StartupGenomeCtrl'
      });
      $routeProvider.when('/sgenome/:country', {
        templateUrl: 'partials/sgenome.html',
        controller: 'StartupGenomeCtrl'
      });
      $routeProvider.when('/sgenome/:country/:filter', {
        templateUrl: 'partials/sgenome.html',
        controller: 'StartupGenomeCtrl'
      });
      return $routeProvider.otherwise({
        redirectTo: '/home'
      });
    }
  ]);

}).call(this);

(function() {
  var services;

  services = angular.module('TechGrindApp.services', []);

  services.value('version', '0.1');

  services.factory('steam', function($http, localStorageService) {
    var baseurl, handle_request, headers, loginp, restapi;
    baseurl = 'http://dev-back1.techgrind.asia/';
    restapi = baseurl + 'scripts/rest.pike?request=';
    handle_request = function(response) {
      localStorageService.add('user', JSON.stringify(response.data.me));
      console.log(sexpr("steam-service", "response", response));
      return response.data;
    };
    loginp = function() {
      var logindata, user;
      logindata = JSON.parse(localStorageService.get('logindata'));
      user = JSON.parse(localStorageService.get('user'));
      return logindata && user && user.id && user.id !== "guest";
    };
    headers = function(login) {
      var logindata;
      logindata = JSON.parse(localStorageService.get('logindata'));
      if (loginp() || (login && logindata)) {
        return {
          headers: logindata
        };
      } else {
        return {};
      }
    };
    return {
      login: function(userid, password) {
        console.log(sexpr("steam-service", "login:", userid, password));
        if (userid !== "" && password !== "") {
          localStorageService.add('logindata', JSON.stringify({
            Authorization: 'Basic ' + window.btoa(userid + ":" + password)
          }));
          return $http.get(restapi + "login", headers(true)).then(handle_request);
        }
      },
      logout: function() {
        localStorageService.remove('logindata');
        localStorageService.remove('user');
        return $http.get(restapi + "login", headers()).then(handle_request);
      },
      loginp: loginp,
      user: function() {
        if (loginp()) {
          return JSON.parse(localStorageService.get('user'));
        }
      },
      get: function(request) {
        console.log(sexpr("steam-service", "GET", request));
        return $http.get(restapi + request, headers()).then(handle_request);
      },
      post: function(request, data) {
        console.log(sexpr("steam-service", "POST", request, data));
        return $http.post(restapi + request, data, headers()).then(handle_request);
      },
      put: function(request, data) {
        console.log(sexpr("steam-service", "PUT", request, data));
        return $http.put(restapi + request, data, headers()).then(handle_request);
      }
    };
  });

}).call(this);

/*
# 
# 	File: <name>
# 		Define file purpose: "What does this file do??? Why does it exist???"
# 
# 	Class: <name>
# 		Is this a class/object? Define its purpose: its "persona" or "role"
# 		Define its structure: what data elements, methods, etc does it need?
# 
# 	Function: <name>
# 		Is this a function? Define its purpose.
# 		Here's an example, lets say its a multiply function...
# 		Parameters/Inputs:
# 			x - The first integer.
# 		 	y - The second integer.
# 		Returns/Outputs:
# 		 	The two integers multiplied together.
# 		Example/Usage:
# 			var x = <functionName>(a,b);
# 			input.print tostring(x);
# 		 
# 	See Also:
#  		links? another file? function? webpage tutorial?
# 		anything else that can help me understand this file overall? 
#
*/


(function() {
  var app, categories, getblog, mockevents, regiongetdetail;

  app = angular.module('TechGrindApp.controllers', []);

  app.run([
    '$rootScope', function(root) {
      return root.sexpr = sexpr;
    }
  ]);

  app.controller('RegisterCtrl', [
    '$scope', '$location', 'steam', function(S, loc, steam) {
      var handle_request, tested_users;
      S.registerdata = {};
      S.passwordmatch = true;
      tested_users = {};
      S.tested_users = function() {
        return tested_users;
      };
      S.user_checking = function() {
        return S.registerdata.userid && typeof tested_users[S.registerdata.userid] === 'undefined';
      };
      S.user_available = function() {
        return typeof tested_users[S.registerdata.userid] !== 'undefined' && !tested_users[S.registerdata.userid];
      };
      S.user_taken = function() {
        return typeof tested_users[S.registerdata.userid] !== 'undefined' && tested_users[S.registerdata.userid];
      };
      S.register = function() {
        S.registerdata.group = 'techgrind';
        return steam.post('register', S.registerdata).then(handle_request);
      };
      handle_request = function(data) {
        return S.data = data;
      };
      S.$watch('[registerdata.password, registerdata.password2]', function() {
        if (S.registerdata.password && S.registerdata.password2 && S.registerdata.password !== S.registerdata.password2) {
          return S.passwordmatch = false;
        } else {
          return S.passwordmatch = true;
        }
      }, true);
      S.$watch('registerdata.fullname', function() {
        var count, handle_user;
        count = 0;
        if (S.registerdata.fullname) {
          S.testname = S.registerdata.fullname.toLowerCase().replace(/[^a-z ]/g, "").trim().replace(/\s+/g, ".");
        }
        S.registerdata.userid = S.testname;
        handle_user = function(data) {
          console.log(sexpr("user-result", data));
          if (data.error === "request not found") {
            return tested_users[data.request] = false;
          } else {
            count++;
            tested_users[data.request] = true;
            if (data.request === S.registerdata.userid) {
              S.registerdata.userid = S.testname + "." + count;
              return steam.get(S.registerdata.userid).then(handle_user);
            }
          }
        };
        if (S.registerdata.userid) {
          return steam.get(S.registerdata.userid).then(handle_user);
        }
      });
      return S.$watch('registerdata.userid', function() {
        var handle_user;
        handle_user = function(data) {
          console.log(sexpr("userid-result", data));
          if (data.error === "request not found") {
            return tested_users[data.request] = false;
          } else {
            return tested_users[data.request] = true;
          }
        };
        if (S.registerdata.userid) {
          return steam.get(S.registerdata.userid).then(handle_user);
        }
      });
    }
  ]);

  app.controller('LoginCtrl', [
    '$scope', '$location', '$routeParams', 'steam', function(S, loc, rp, steam) {
      var handle_request;
      S.username = "";
      S.password = "";
      if (rp.userid) {
        S.userid = rp.userid;
      }
      S.loginp = steam.loginp;
      S.user = steam.user;
      S.logout = function() {
        return steam.logout().then(handle_request);
      };
      S.login = function() {
        console.log(sexpr("LoginCtrl", S.userid, S.password));
        steam.login(S.userid, S.password).then(handle_request);
        S.userid = "";
        return S.password = "";
      };
      handle_request = function(data) {
        S.data = data;
        return console.log(sexpr("LoginCtrl", "handle_request", S.user(), data));
      };
      return steam.get('login').then(handle_request);
    }
  ]);

  app.controller('ActivationCtrl', [
    '$scope', '$routeParams', 'steam', function(S, rp, steam) {
      var activationdata, handle_activation;
      handle_activation = function(data) {
        if (data.result === "user is activated") {
          S.activation = "activated";
        } else if (data.error === "user already activated") {
          S.activation = "active";
        } else {
          S.activation = "failed";
        }
        S.userid = rp.userid;
        S.error = data.error;
        return S.data = data;
      };
      activationdata = {
        activate: rp.activationcode,
        userid: rp.userid
      };
      return steam.post('activate', activationdata).then(handle_activation);
    }
  ]);

  app.controller('AppCtrl', [
    '$scope', '$location', 'steam', function(S, loc, steam) {
      var handle_request;
      S.active = function(menuItem) {
        if (loc.path() === menuItem) {
          return 'active';
        }
      };
      S.user = steam.user;
      S.loginp = steam.loginp;
      S.logout = steam.logout;
      S.data = {};
      handle_request = function(data) {
        return S.data = data;
      };
      return steam.get('login').then(handle_request);
    }
  ]);

  app.controller('HomeCtrl', [
    '$scope', '$http', function(S, http) {
      http.get('/mock').success(function(data) {
        return S.mock = data;
      });
      S.getblog = getblog();
      return http.get('https://graph.facebook.com/153371304826505/feed?limit=5&access_token=CAACEdEose0cBAOGDpUGu6jvFBkuibxGrHEPEgvDkVEPaomUw1FPMjRbJ408vNYsWiiUSyCfDx3C9cxtM22eph3aokhHc0L02JzwKPnldUN1T3SZBuuTtGI582ahKDgGivN421JINwiygtQGZA62Owc7rlpiPR8cNZA1QZCjeuYcMAMsW8NjYgLbuJrdIMPJgQlsHrmGOnwZDZD').success(function(data) {
        return S.facebookFeed = data;
      });
    }
  ]);

  app.controller('RegionsCtrl', [
    '$scope', '$location', 'steam', function(S, loc, steam) {
      return S.countries = [
        {
          name: 'Cambodia',
          url: 'cambodia'
        }, {
          name: 'China',
          url: 'china'
        }, {
          name: 'Indonesia',
          url: 'indonesia'
        }, {
          name: 'Malaysia',
          url: 'malaysia'
        }, {
          name: 'Philippines',
          url: 'philippines'
        }, {
          name: 'Singapore',
          url: 'singapore'
        }, {
          name: 'Thailand',
          url: 'thailand'
        }, {
          name: 'Vietnam',
          url: 'vietnam'
        }
      ];
    }
  ]);

  app.controller('ResourcesCtrl', [
    '$scope', '$location', function(S, loc) {
      return S.resources = [
        {
          name: 'Startup Jobs',
          url: 'resources/jobs',
          icon: 'icon-laptop'
        }, {
          name: 'Docs & Templates',
          url: 'resources/docs',
          icon: 'icon-file-text'
        }, {
          name: 'Guides & Tutorials',
          url: 'resources/tutorials',
          icon: 'icon-lightbulb'
        }, {
          name: 'Photos & Video',
          url: 'resources/media',
          icon: 'icon-film'
        }, {
          name: 'TeamSpeak Server',
          url: 'resources/teamspeak',
          icon: 'icon-group'
        }
      ];
    }
  ]);

  app.controller('EventsCtrl', [
    '$scope', '$location', 'steam', function(S, loc, steam) {
      var allevents, get_events, list_events_by_category;
      S.events = {};
      allevents = [];
      list_events_by_category = function(category) {
        S.events[category] = allevents.filter(function(item) {
          return item.category === category;
        });
        return console.log(sexpr("list_events_by_category", category, S.events));
      };
      get_events = function(data) {
        S.data = data;
        allevents = data.events;
        list_events_by_category('event');
        list_events_by_category('workshop');
        return list_events_by_category('conference');
      };
      steam.get('techgrind.events').then(get_events);
      S.createactivity = [
        {
          path: 'partials/createactivity.html'
        }
      ];
      S.past = [
        {
          title: 'World.Startup.Report',
          name: 'WSR',
          path: '/events/wsr'
        }
      ];
      return S.showEvent = function(event) {
        return loc.path(event.url);
      };
    }
  ]);

  app.controller('CreateactivityCtrl', [
    '$scope', 'steam', '$location', '$routeParams', function(S, steam, loc, rp) {
      var handle_event;
      S.rp = rp;
      S.user = steam.user;
      S.categories = categories;
      handle_event = function(data) {
        S.data = data;
        S.event = data.event;
        return console.log(sexpr("handle_event", data));
      };
      if (rp.name) {
        console.log(sexpr("rp.name", rp));
        steam.get('techgrind.events.' + rp.name).then(handle_event);
      } else {
        S.event = {
          name: 'SHORT-NAME',
          title: 'Event Title',
          description: 'Event description',
          events: []
        };
      }
      return S.submit_event = function() {
        console.log(sexpr("submit_event", S.event));
        if (S.event.eventid) {
          return steam.post(S.event.eventid, S.event).then(handle_event);
        } else {
          return steam.put('techgrind.events', S.event).then(handle_event);
        }
      };
    }
  ]);

  app.controller('PartnersCtrl', function() {});

  app.controller('StartupGenomeCtrl', [
    '$scope', '$routeParams', 'steam', function(S, rp, steam) {
      var get_countries, get_country;
      S.countries = {};
      S.sgenome = {};
      S.debug = [];
      get_countries = function(data) {
        var country, _i, _len, _ref, _results;
        _ref = data.inventory;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          country = _ref[_i];
          _results.push(S.countries[country.name] = country);
        }
        return _results;
      };
      get_country = function(country, filter) {
        S.debug.push = ["getting", country, filter];
        if (filter) {
          filter = "/" + filter;
        } else {
          filter = "";
        }
        return steam.get('/home/techgrind/organizations/country/' + country + filter).then(function(data) {
          S.debug.push = "got " + country;
          return S.sgenome[country] = data;
        });
      };
      steam.get('/home/techgrind/organizations/country').then(get_countries);
      if (rp.country) {
        return get_country(rp.country, rp.filter);
      }
    }
  ]);

  app.controller('TestCtrl', [
    '$scope', '$location', 'steam', function(S, loc, steam) {
      var handle_request;
      S.user = steam.user;
      handle_request = function(data) {
        return S.data = data;
      };
      steam.get('delete').then(handle_request);
      return steam.get('login').then(handle_request);
    }
  ]);

  app.controller('ContentCtrl', [
    '$scope', '$route', '$location', '$routeParams', function(S, r, loc, rp) {
      var matchr, matchregion;
      S.loc = loc;
      S.rp = rp;
      S.articlename = rp.articlename;
      S.day = rp.day;
      S.month = rp.month;
      S.content = rp.content;
      S.tabs = [
        {
          title: 'Articles'
        }, {
          title: 'Events'
        }
      ];
      S.getblog = getblog();
      S.regionblog = {};
      S.chatterbox = [];
      S.addComment = function() {
        S.comments.push({
          print: S.commenttext
        });
        return S.commenttext = "";
      };
      S.findarticle = function(name) {
        var item, _i, _len, _ref;
        name = rp.articlename;
        _ref = S.getblog.articles;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          console.log(sexpr(item));
          if (item.articlename === name) {
            return item;
          }
        }
      };
      if (rp.articlename) {
        S.article = S.findarticle(rp.articlename);
      }
      S.find = function(regionname) {
        var item, _i, _len, _ref;
        regionname = rp.region;
        _ref = S.getblog.articles;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          console.log(sexpr(item));
          if (item.country === regionname) {
            return item;
          }
        }
      };
      matchregion = function(item) {
        console.log(sexpr("filter", item.country === rp.region, item.country, rp.region, item));
        return item.country === rp.region;
      };
      if (rp.region) {
        S.regionblog.articles = S.getblog.articles.filter(matchregion);
        S.regionblog.events = S.getblog.events.filter(matchregion);
        S.regionblog.calendar = S.getblog.calendar.filter(matchregion);
      }
      S.profiles = [
        {
          role: 'Volunteers',
          icon: 'icon-group',
          type: 'volunteers'
        }
      ];
      S.regiongetdetail = regiongetdetail();
      S.regionprofile = {};
      S.findprofile = function(rname) {
        var detail, _i, _len, _ref;
        rname = rp.region;
        _ref = S.regiongetdetail.volunteers;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          detail = _ref[_i];
          console.log(sexpr(item));
          if (detail.country === rname) {
            return detail;
          }
        }
      };
      matchr = function(detail) {
        console.log(sexpr("filter", detail.country === rp.region, detail.country, rp.region, detail));
        return detail.country === rp.region;
      };
      if (rp.region) {
        S.regionprofile.volunteers = S.regiongetdetail.volunteers.filter(matchr);
      }
      S.rendercal = function() {
        $('#calendar').fullCalendar('render');
        return console.log(sexpr("cal-tab-selected"));
      };
      S.list1 = [
        {
          name: 'News'
        }, {
          name: 'Articles'
        }
      ];
      return S.list2 = [];
    }
  ]);

  app.controller('ContentPageCtrl', [
    '$scope', '$location', '$routeParams', function(S, loc, rp) {
      return S.addComment = function() {
        S.chatterbox.push(S.commenttext);
        return S.commenttext = "";
      };
    }
  ]);

  regiongetdetail = function() {
    return {
      volunteers: [
        {
          name: 'Nantaprong (House) Leelahongjudha',
          mail: 'th.house @ techgrind.asia',
          tags: 'developement',
          country: 'thailand',
          owner: 'Naveen'
        }, {
          name: 'Karl Hoffman',
          mail: 'th.karl @ techgrind.asia',
          tags: 'developement',
          country: 'thailand',
          owner: 'Naveen'
        }, {
          name: 'Efraim Pettersson',
          mail: 'th.efraim @ techgrind.asia',
          tags: 'developement',
          country: 'thailand',
          ownem: 'Naveen'
        }, {
          name: 'Juanita Sabapathy',
          mail: 'sg.juanita @ techgrind.asia',
          tags: 'developement',
          country: 'singapore',
          owner: 'Naveen'
        }, {
          name: 'Martin Bähr',
          mail: 'cn.martin @ techgrind.asia',
          tags: 'developement',
          country: 'china',
          owner: 'Naveen'
        }, {
          name: 'Herman Tamas',
          mail: 'cn.tamas @ techgrind.asia',
          month: 'june',
          tags: 'developement',
          country: 'china',
          owner: 'Naveen'
        }, {
          name: 'Worawut Saibua',
          mail: 'th.worawut @ techgrind.asia',
          month: 'june',
          tags: 'developement',
          country: 'thailand',
          owner: 'Naveen',
          icon: ''
        }, {
          name: 'Philippe Dacquet',
          mail: 'th.philippe @ techgrind.asia',
          month: 'june',
          tags: 'developement',
          country: 'thailand',
          owner: 'Naveen',
          icon: ''
        }, {
          name: 'Bie Eadtevongsai',
          mail: 'th.bie @ techgrind.asia',
          month: 'june',
          tags: 'developement',
          country: 'thailand',
          owner: 'Naveen',
          icon: '',
          title: 'Coming soon ',
          content: 'wait'
        }, {
          name: ' Join Us!',
          mail: 'contact @ techgrind.asia',
          month: 'june',
          tags: 'developement',
          country: 'china',
          owner: 'Naveen',
          icon: ''
        }
      ]
    };
  };

  getblog = function() {
    return {
      news: [
        {
          title: 'How to Use ng-bind-html-safe',
          day: '20',
          month: 'june',
          tags: 'developement',
          country: 'thailand',
          owner: 'Naveen',
          articlename: 'how-to-use-ng-bind-html-safe',
          tab: 'news',
          rate: 3,
          fb: 30,
          tw: 5,
          gp: 10,
          excerpt: 'Creates a binding that will innerHTML the result of evaluating the expression into the current element The innerHTML-ed content',
          content: 'Creates a binding that will innerHTML the result of evaluating the expression into the current element. The innerHTML-ed content will not be sanitized! You should use this directive only if ngBindHtml directive is too restrictive.'
        }, {
          title: 'SSW Winner Announced',
          day: '7',
          month: 'july',
          tags: 'developement',
          country: 'singaphore',
          owner: 'Naveen',
          articlename: 'ssw-winner-announced',
          tab: 'news',
          rate: 3,
          fb: 30,
          tw: 5,
          gp: 10,
          excerpt: 'Winner of SSW Bangkok, SplashPost, has received a gigantic prize ticket to Switzerland where he will pitch for $500,000 in funding from the European',
          content: 'Winner of SSW Bangkok, SplashPost, has received a gigantic prize ticket to Switzerland where he will pitch for $500,000 in funding from the European investor community and Sandbox Network.',
          url: 'news/article2'
        }, {
          title: 'Fashion Incubator Looking for Talent',
          day: '9',
          month: 'May',
          tags: 'developement',
          country: 'viewtnam',
          owner: 'Naveen',
          articlename: 'fashion-incubator',
          tab: 'news',
          rate: 2,
          fb: 30,
          tw: 5,
          gp: 10,
          excerpt: 'If you are a talented designer looking for support and infrastructure to build your own fashion brand - a group of Singapore-based women entrepreneurs',
          content: 'If you are a talented designer looking for support and infrastructure to build your own fashion brand - a group of Singapore-based women entrepreneurs are looking to help you do just that!'
        }, {
          title: 'Founder Equity Calculator',
          day: '8',
          month: 'May',
          tags: 'developement',
          country: 'india',
          owner: 'Naveen',
          articlename: 'founder-equity-calculator',
          tab: 'news',
          rate: 4,
          fb: 30,
          tw: 5,
          gp: 10,
          excerpt: 'Sorry about that everyone - meant to put this up immediately after the session over a week ago. Click here to view the founder-equity calculator',
          content: 'Sorry about that everyone - meant to put this up immediately after the session over a week ago. Click here to view the founder-equity calculator that was presented at TechGrind Co-founder dating event in April.'
        }, {
          title: 'TG Monthly Enter Singaphore',
          day: '2',
          month: 'May',
          tags: 'developement',
          country: 'singaphore',
          owner: 'Naveen',
          articlename: 'tg-monthly-enter-singaphore',
          tab: 'news',
          rate: 1,
          fb: 30,
          tw: 5,
          gp: 10,
          excerpt: 'To all you struggling startups in Singapore, tired of all the noise and fluff, eager to really solve problems and be part of a community',
          content: 'To all you struggling startups in Singapore, tired of all the noise and fluff, eager to really solve problems and be part of a community supportive of eachother --- get on over to Hackerspace.SG this Saturday, May 4th!!!'
        }, {
          title: 'FAP.BKK#1, WSR, a very busy week!',
          day: '27',
          month: 'April',
          tags: 'developement',
          country: 'thailand',
          owner: 'Naveen',
          articlename: 'fap-bkk-very-busy-work',
          tab: 'news',
          rate: 4,
          fb: 30,
          tw: 5,
          gp: 10,
          excerpt: 'Thank-you everyone for a great week full of events! This last week was incredibly busy and productive for Bangkok startups.',
          content: 'Thank-you everyone for a great week full of events! This last week was incredibly busy and productive for Bangkok startups. Thanks to all who contributed and helped make TechGrind explode onto the scene with such success.'
        }, {
          title: 'Fashion Incubator Looking for Talent',
          day: '9',
          month: 'May',
          tags: 'developement',
          country: 'viewtnam',
          owner: 'Naveen',
          articlename: 'fashion-incubator',
          tab: 'articles',
          rate: 3,
          fb: 30,
          tw: 5,
          gp: 10,
          excerpt: 'If you are a talented designer looking for support and infrastructure to build your own fashion brand - a group of Singapore-based women entrepreneurs',
          content: 'If you are a talented designer looking for support and infrastructure to build your own fashion brand - a group of Singapore-based women entrepreneurs are looking to help you do just that!'
        }, {
          title: 'How to Use ng-bind-html-safe',
          day: '20',
          month: 'june',
          tags: 'developement',
          country: 'thailand',
          owner: 'Naveen',
          articlename: 'how-to-use-ng-bind-html-safe',
          tab: 'news',
          rate: 3,
          fb: 30,
          tw: 5,
          gp: 10,
          excerpt: 'Creates a binding that will innerHTML the result of evaluating the expression into the current element. The innerHTML-ed content',
          content: 'Creates a binding that will innerHTML the result of evaluating the expression into the current element. The innerHTML-ed content will not be sanitized! You should use this directive only if ngBindHtml directive is too restrictive.'
        }, {
          title: 'TG Monthly Enter Singaphore',
          day: '2',
          month: 'May',
          tags: 'developement',
          country: 'singaphore',
          owner: 'Naveen',
          articlename: 'tg-monthly-enter-singaphore',
          tab: 'news',
          rate: 3,
          fb: 30,
          tw: 5,
          gp: 10,
          excerpt: 'To all you struggling startups in Singapore, tired of all the noise and fluff, eager to really solve problems and be part of a community',
          content: 'To all you struggling startups in Singapore, tired of all the noise and fluff, eager to really solve problems and be part of a community supportive of eachother --- get on over to Hackerspace.SG this Saturday, May 4th!!!'
        }
      ],
      articles: [
        {
          title: 'How to Use ng-bind-html-safe',
          day: '20',
          month: 'june',
          tags: 'developement',
          country: 'thailand',
          owner: 'Naveen',
          articlename: 'how-to-use-ng-bind-html-safe',
          tab: 'articles',
          rate: 5,
          fb: 30,
          tw: 5,
          gp: 10,
          excerpt: 'Creates a binding that will innerHTML the result of evaluating the expression into the current element. The innerHTML-ed content will not be sanitized!',
          content: 'Creates a binding that will innerHTML the result of evaluating the expression into the current element. The innerHTML-ed content will not be sanitized! You should use this directive only if ngBindHtml directive is too restrictive.'
        }, {
          title: 'SSW Winner Announced',
          day: '7',
          month: 'july',
          tags: 'developement',
          country: 'singaphore',
          owner: 'Naveen',
          articlename: 'ssw-winner-announced',
          tab: 'articles',
          rate: 1,
          fb: 30,
          tw: 5,
          gp: 10,
          excerpt: 'Winner of SSW Bangkok, SplashPost, has received a gigantic prize ticket to Switzerland where he will pitch for $500,000 in funding from the European investor',
          content: 'Winner of SSW Bangkok, SplashPost, has received a gigantic prize ticket to Switzerland where he will pitch for $500,000 in funding from the European investor community and Sandbox Network.',
          url: 'articles/article2'
        }, {
          title: 'Fashion Incubator Looking for Talent',
          day: '9',
          month: 'May',
          tags: 'developement',
          country: 'viewtnam',
          owner: 'Naveen',
          articlename: 'fashion-incubator',
          tab: 'articles',
          rate: 3,
          fb: 30,
          tw: 5,
          gp: 10,
          excerpt: 'If you are a talented designer looking for support and infrastructure to build your own fashion brand - a group of Singapore-based women entrepreneurs',
          content: 'If you are a talented designer looking for support and infrastructure to build your own fashion brand - a group of Singapore-based women entrepreneurs are looking to help you do just that!'
        }, {
          title: 'Founder Equity Calculator',
          day: '8',
          month: 'May',
          tags: 'developement',
          country: 'india',
          owner: 'Naveen',
          articlename: 'founder-equity-calculator',
          tab: 'articles',
          rate: 4,
          fb: 30,
          tw: 5,
          gp: 10,
          excerpt: 'Sorry about that everyone - meant to put this up immediately after the session over a week ago. Click here to view the founder-equity calculator',
          content: 'Sorry about that everyone - meant to put this up immediately after the session over a week ago. Click here to view the founder-equity calculator that was presented at TechGrind Co-founder dating event in April.'
        }, {
          title: 'TG Monthly Enter Singaphore',
          day: '2',
          month: 'May',
          tags: 'developement',
          country: 'singaphore',
          owner: 'Naveen',
          articlename: 'tg-monthly-enter-singaphore',
          tab: 'articles',
          rate: 2,
          fb: 30,
          tw: 5,
          gp: 10,
          excerpt: 'To all you struggling startups in Singapore, tired of all the noise and fluff, eager to really solve problems and be part of a community',
          content: 'To all you struggling startups in Singapore, tired of all the noise and fluff, eager to really solve problems and be part of a community supportive of eachother --- get on over to Hackerspace.SG this Saturday, May 4th!!!'
        }
      ],
      activities: [
        {
          title: 'SSW Winner Announced',
          day: '7',
          month: 'july',
          tags: 'developement',
          country: 'Singaphore',
          owner: 'Naveen',
          articlename: 'ssw-winner-announced',
          tab: 'activities',
          rate: 3,
          fb: 30,
          tw: 5,
          gp: 10,
          excerpt: 'Winner of SSW Bangkok, SplashPost, has received a gigantic prize ticket to Switzerland where he will pitch for $500,000 in funding from the European investor community',
          content: 'Winner of SSW Bangkok, SplashPost, has received a gigantic prize ticket to Switzerland where he will pitch for $500,000 in funding from the European investor community and Sandbox Network.',
          url: 'activities/ssw-winner-announced'
        }
      ],
      calendar: [
        {
          title: 'Coming soon ',
          content: 'wait',
          country: 'india',
          articlename: 'bye'
        }
      ],
      discussion: [
        {
          title: 'SSW Winner Announced',
          day: '7',
          month: 'july',
          tags: 'developement',
          country: 'singaphore',
          owner: 'Naveen',
          articlename: 'ssw-winner-announced',
          tab: 'discussion',
          rate: 3,
          fb: 30,
          tw: 5,
          gp: 10,
          excerpt: 'Winner of SSW Bangkok, SplashPost, has received a gigantic prize ticket to Switzerland where he will pitch for $500,000 in funding from the European investor',
          content: 'Winner of SSW Bangkok, SplashPost, has received a gigantic prize ticket to Switzerland where he will pitch for $500,000 in funding from the European investor community and Sandbox Network.',
          url: 'discussion/ssw-winner-announced'
        }
      ]
    };
  };

  mockevents = [
    {
      title: 'Get.A.Partner',
      name: 'GAP',
      description: 'Find your cofounders - partners - and hires!',
      path: '/events/gap',
      name: 'gap',
      category: 'event'
    }, {
      title: 'Interview',
      name: 'INTRVU',
      description: 'Learn about building businesses from successful entrepreneurs',
      path: '/events/intrvu',
      name: 'intrvu',
      category: 'event'
    }, {
      title: 'Mobile Monday Bangkok',
      name: 'MoMoBKK',
      description: 'See all the latest mobile tech and trends!',
      path: '/events/momobkk',
      name: 'momobkk',
      category: 'event'
    }, {
      title: 'Slap.Learn.And.Pitch',
      name: 'SLAP',
      description: 'find your cofounders - partners - hires!',
      path: '/events/slap',
      name: 'slap',
      category: 'workshop'
    }, {
      title: 'Coding.For.Fun',
      name: 'CFF',
      description: 'come learn to code something new',
      path: '/events/cff',
      name: 'cff',
      category: 'workshop'
    }, {
      title: 'Citech.Hacker.Space.Party',
      name: 'CITEC-HSP',
      description: 'learn to hack apart and build hardware',
      path: '/events/citec',
      name: 'citec',
      category: 'workshop'
    }, {
      place: 'Singapore',
      owner: 'Startup Asia',
      description: 'TechInAsias hallmark tech conference',
      path: '/events/startup-asia',
      name: 'startup-asia',
      category: 'conference'
    }, {
      place: 'Singapore',
      owner: 'Echelon',
      description: 'e27s hallmark tech conference',
      path: '/events/echelon',
      name: 'echelon',
      category: 'conference'
    }, {
      owner: 'GDCThailand',
      place: 'Bangkok Thailand',
      description: 'TechGrinds Game Developer Conference Thailand',
      path: '/events/gdc-thailand',
      name: 'gdc-thailand',
      category: 'conference'
    }
  ];

  categories = [
    {
      name: 'event'
    }, {
      name: 'workshop'
    }, {
      name: 'conference'
    }
  ];

}).call(this);

/*
# 
# 	File: <name>
# 		Define file purpose: "What does this file do??? Why does it exist???"
# 
# 	Class: <name>
# 		Is this a class/object? Define its purpose: its "persona" or "role"
# 		Define its structure: what data elements, methods, etc does it need?
# 
# 	Function: <name>
# 		Is this a function? Define its purpose.
# 		Here's an example, lets say its a multiply function...
# 		Parameters/Inputs:
# 			x - The first integer.
# 		 	y - The second integer.
# 		Returns/Outputs:
# 		 	The two integers multiplied together.
# 		Example/Usage:
# 			var x = <functionName>(a,b);
# 			input.print tostring(x);
# 		 
# 	See Also:
#  		links? another file? function? webpage tutorial?
# 		anything else that can help me understand this file overall? 
#
*/


(function() {
  var filters;

  filters = angular.module('TechGrindApp.filters', []);

  filters.filter('interpolate', [
    'version', function(version) {
      return function(text) {
        return String(text).replace(/\%VERSION\%/mg, version);
      };
    }
  ]);

}).call(this);

/*
# 
# 	File: <name>
# 		Define file purpose: "What does this file do??? Why does it exist???"
# 
# 	Class: <name>
# 		Is this a class/object? Define its purpose: its "persona" or "role"
# 		Define its structure: what data elements, methods, etc does it need?
# 
# 	Function: <name>
# 		Is this a function? Define its purpose.
# 		Here's an example, lets say its a multiply function...
# 		Parameters/Inputs:
# 			x - The first integer.
# 		 	y - The second integer.
# 		Returns/Outputs:
# 		 	The two integers multiplied together.
# 		Example/Usage:
# 			var x = <functionName>(a,b);
# 			input.print tostring(x);
# 		 
# 	See Also:
#  		links? another file? function? webpage tutorial?
# 		anything else that can help me understand this file overall? 
#
*/


(function() {
  var directives;

  directives = angular.module('TechGrindApp.directives', []);

  directives.directive('appVersion', [
    'version', function(version) {
      return function(scope, elm, attrs) {
        return elm.text(version);
      };
    }
  ]);

  directives.directive('draggable', function() {
    return {
      restrict: 'A',
      link: function(scope, elm, attrs) {
        return elm.draggable({
          revert: true
        });
      }
    };
  });

  directives.directive('droppable', function($compile) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        console.log("" + element);
        return element.droppable({
          drop: function(event, ui) {
            var dragEl, dragIndex, dropEl, reject;
            dragIndex = angular.element(ui.draggable).data('index');
            reject = angular.element(ui.draggable).data('reject');
            dragEl = angular.element(ui.draggable).parent();
            dropEl = angular.element(this);
            if (dragEl.hasClass('list1') && !dropEl.hasClass('list1') && reject === !true) {
              scope.list2.push(scope.list1[dragIndex]);
              scope.list1.splice(dragIndex, 1);
            } else if (dragEl.hasClass('list2') && !dropEl.hasClass('list2') && reject === !true) {
              scope.list1.push(scope.list2[dragIndex]);
              scope.list2.splice(dragIndex, 1);
            }
            return scope.$apply();
          }
        });
      }
    };
  });

  directives.directive('calendar', function($parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var cal, calendar, region, regions;
        region = $parse(attrs['region']);
        calendar = $parse(attrs['calendar']);
        console.log(sexpr("calendar-directive", region(scope), calendar(scope)));
        regions = {
          thailand: ['https://www.google.com/calendar/feeds/7rd1tlnke94kh99ub6vta9ov34%40group.calendar.google.com/public/basic', 'https://www.google.com/calendar/feeds/en.thai%23holiday%40group.v.calendar.google.com/public/basic'],
          singapore: ['https://www.google.com/calendar/feeds/c6itotjtf79b07k42qqo5ngqu4%40group.calendar.google.com/public/basic', 'https://www.google.com/calendar/feeds/en.singapore%23holiday%40group.v.calendar.google.com/public/basic']
        };
        if (calendar(scope) === "all") {
          cal = regions['thailand'].concat(regions['singapore']);
        } else {
          cal = regions[calendar(scope)];
        }
        return element.fullCalendar({
          header: {
            left: 'title',
            center: '',
            right: 'today'
          },
          eventSources: cal,
          eventClick: function(event) {
            window.open(event.url, 'gcalevent', 'width=700,height=600');
            return false;
          },
          loading: function(bool) {
            if (bool) {
              return $('#loading').show();
            } else {
              return $('#loading').hide();
            }
          }
        });
      }
    };
  });

}).call(this);

