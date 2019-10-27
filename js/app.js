/*
	app.js
	Story Manager Module
	
	Written by Shir Bar Lev
*/

angular
.module('StoryManager', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider, $http) {
	$urlRouterProvider.otherwise('/');
	
	//home state (main/library page)
	$stateProvider.state('home', {
		templateUrl: '/views/libraryMgr.html',
		url: '/',
		resolve: {
			loadData: function($http) {
				return $http({
					method: 'GET',
					url: '/data/stories.json'
				}).then(function(response) {
					return response.data.stories;
				});
			}
		},
		controller: 'libraryCtrl as library'
	});
	
	//a story's page
	$stateProvider.state('story', {
		templateUrl: '/views/storyMgr.html',
		url: '/story/{id}',
		resolve: {
			loadData: function($http) {
				return $http({
					method: 'GET',
					url: '/data/stories.json'
				}).then(function(response) {
					return response.data.stories;
				});
			}
		},
		controller: 'storyCtrl as story'
	});
	
	//a story edit page
	//child of the story page
	$stateProvider.state('story.edit', {
		templateUrl: '/views/storyEdit.html',
		controller: 'storyCtrl as story'
	});
	
	//a chapter edit page
	//child of the story edit page
	$stateProvider.state('story.editChapter', {
		templateUrl: '/views/chapterEdit.html',
		controller: 'storyCtrl as story'
	});
}]);

angular
.module('StoryManager').$inject = ['$http'];