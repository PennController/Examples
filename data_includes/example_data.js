// Include this line at the top of your scripts
// See the documentation for more information:
// 		https://lab.florianschwarz.net/PennController/wiki/documentation/
PennController.ResetPrefix(null);


// SAMPLE TRIAL
PennController(
	newText("sentence", "<< Chris talks to itself >>")
		.print()
	,
	newText("question", "this sounds...")
		.print()
	,
	newScale("rating", 5)
		.settings.before( newText("left" , "bad")  )
		.settings.after(  newText("right", "good") )
		.print()
		.wait()		// The trial will end after a selection has been made
);


// Learn how to use PennController on the website's tutorial:
//		https://lab.florianschwarz.net/PennController/wiki/00-tutorial/
//
// Find more example experiments here:
//		https://lab.florianschwarz.net/PennController/examples-of-experiments/