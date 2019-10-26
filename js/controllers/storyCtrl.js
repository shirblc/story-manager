/*
	storyCtrl.js
	Story Manager Controller
	
	Written by Shir Bar Lev
*/

//story manager controller
//contains the currently viewed story
angular.module('StoryManager')
	.controller('storyCtrl', ['$stateParams', 'librarian', 'loadData', function($stateParams, librarian, loadData) {
		//variable declaration
		this.storyDetails = loadData[$stateParams.id];
		this.storyName = storyDetails.name;
		this.storySynopsis = storyDetails.synopsis;
		this.chapters = storyDetails.chapters;
		
		/*
		Function Name: changeStoryName()
		Function Description: Changes the name of the story.
		Parameters: newName - the new name for the story.
		----------------
		Programmer: Shir Bar Lev.
		*/
		this.changeStoryName = function(newName)
		{
			storyName = newName;
		}
		
		/*
		Function Name: changeChapterName()
		Function Description: Changes the name of the selected chapter.
		Parameters: chapterNum - the number of chapter to change
					chapterName - the new name for the chapter
		----------------
		Programmer: Shir Bar Lev.
		*/
		this.changeChapterName = function(chapterNum, chapterName)
		{
			chapters[chapterNum-1].name = chapterName;
			librarian.updateStory(chapters);
		}
		
		/*
		Function Name: changeChapterSynopsis()
		Function Description: Changes the synopsis of the selected chapter.
		Parameters: chapterNum - the number of chapter to change
					chapterSynopsis - the new synopsis for the chapter
		----------------
		Programmer: Shir Bar Lev.
		*/
		this.changeChapterSynopsis = function(chapterNum, chapterSynopsis)
		{
			chapters[chapterNum-1].name = chapterSynopsis;
			librarian.updateStory(chapters);
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
			chapters.push({number: chapters.length, title: chapterName, synopsis: chapterSynopsis});
			librarian.updateStory(chapters);
		}
		
		/*
		Function Name: removeChapter()
		Function Description: Deletes a chapter.
		Parameters: chapterID - the number of the chapter to delete
		----------------
		Programmer: Shir Bar Lev.
		*/
		this.removeChapter = function(chapterID)
		{
			chapters.splice(chapterID, 1);
			librarian.updateStory(chapters);
		}
}]);