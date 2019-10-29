/*
	storyCtrl.js
	Story Manager Controller
	
	Written by Shir Bar Lev
*/

//story manager controller
//contains the currently viewed story
angular.module('StoryManager')
	.controller('storyCtrl', ['$stateParams', 'librarian', 'loadData', '$state', function($stateParams, librarian, loadData, $state) {
		//variable declaration
		var vm = this;
		var storyDetails = loadData[$stateParams.id-1];
		this.storyName = storyDetails.name;
		this.storySynopsis = storyDetails.synopsis;
		this.chapters = storyDetails.chapters;
		this.storyID = storyDetails.id;
		this.chapter = loadChapterData();
		this.forDeletion;
		
		/*
		Function Name: loadChapterData()
		Function Description: Checks to see whether the current page has a "chapterID" value,
							which means it's a chapter-edit page. If it is, fetches the data
							of the chapter being edited for the template to fill in.
		Parameters: None.
		----------------
		Programmer: Shir Bar Lev.
		*/
		function loadChapterData() {
			if($stateParams.chapterID)
				{
					return vm.chapters[$stateParams.chapterID - 1];
				}
		}
		
		/*
		Function Name: changeDetails()
		Function Description: Changes the name and synopsis of the story.
		Parameters: None.
		----------------
		Programmer: Shir Bar Lev.
		*/
		this.changeDetails = function() {
			vm.storyName = document.getElementById("storyTitle").value;
			vm.storySynopsis =  document.getElementById("storySynopsis").value;
			librarian.updateStoryDetails(vm.storyName, vm.storySynopsis);
		};
		
		/*
		Function Name: deleteItem()
		Function Description: Opens a popup to confirm whether to delete the selected item.
		Parameters: toDelete - the item which needs to be deleted.
		----------------
		Programmer: Shir Bar Lev.
		*/
		this.deleteItem = function(toDelete) {
			document.getElementById("modalBox").className = "on";
			if(typeof toDelete != "string")
				vm.forDeletion = "All chapters";
			else
				vm.forDeletion = toDelete;
		};
		
		/*
		Function Name: changeChapterDetails()
		Function Description: Changes the name and synopsis of the selected chapter.
		Parameters: None
		----------------
		Programmer: Shir Bar Lev.
		*/
		this.changeChapterDetails = function()
		{
			var chapterNumber = $stateParams.chapterID;
			vm.chapters[chapterNumber-1].name = document.getElementById("chapterTitle").value;
			vm.chapters[chapterNumber-1].name = document.getElementById("chapterSynopsis").value;
			librarian.updateStory(vm.chapters);
			
			vm.changeState();
		}
		
		/*
		Function Name: changeState()
		Function Description: Once the user is done updating the chapter, sends the user back to the
							story page.
		Parameters: None
		----------------
		Programmer: Shir Bar Lev.
		*/
		this.changeState = function() {
			$state.go('story', {id: vm.storyID});
		}
		
		/*
		Function Name: addChapter()
		Function Description: Adds a new chapter.
		Parameters: chapterName - the name of the new chapter
					chapterSynopsis - the synopsis of the new chapter
		----------------
		Programmer: Shir Bar Lev.
		*/
		this.addChapter = function(chapterName, chapterSynopsis)
		{
			vm.chapters.push({
				number: vm.chapters.length, 
				title: chapterName, 
				synopsis: chapterSynopsis
			});
			librarian.updateStory(vm.chapters);
		}
		
		/*
		Function Name: removeChapter()
		Function Description: Deletes a chapter.
		Parameters: None.
		----------------
		Programmer: Shir Bar Lev.
		*/
		this.removeChapter = function()
		{
			var chapterNumber = Number($stateParams.chapterID) - 1;
			vm.chapters.splice(chapterNumber, 1);
			librarian.updateStory(vm.chapters);
		}
}]);