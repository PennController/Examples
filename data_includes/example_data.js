PennController.ResetPrefix(null);
// Fetch the images there:
PennController.AddHost("http://files.lab.florianschwarz.net/ibexfiles/PennController/SampleTrials/");

// Run this before every trial
PennController.Header(
    newVar("score", 0)          // The score Var element is part of every trial
        .settings.global()      // Global: its value is NOT reset each time
);

// INSTRUCTIONS
PennController( "instructions" ,
    defaultText
        .print()
    ,
    newText("intro1", "Welcome. You will see four patches of different colors aligned horizontally.")
    ,
    newText("intro2", "You have 1 second to select the color whose name is shown above the line of patches.")
    ,
    newText("intro3", "Place your fingers above the numeric keys 1, 2, 3 and 4 on your keyboard.")
    ,
    newText("intro4", "Press 1, 2, 3 or 4 to start.")
    ,
    newKey("numeric", "1234�") // Handle exception: an all-digit string would be evaluated as a charCode
        .wait()                 // Start when 1, 2, 3 or 4 is pressed (weird character not on keyboard)
)
.setOption("hideProgressBar", true); // Do not show the progress bar on first screen


// TEST TRIALS
PennController.Template(  // Trials generated from design.csv from chunk_includes
  row => PennController( "trial" ,
    newSelector("patch")                    // Selector: group of elements out of which to choose
    ,
    defaultImage
        .settings.size(100, 100)            // Each image in this trial is 100x100px
        .settings.selector("patch")         // Each image in this trial is a choice option
    ,
    defaultText
        .settings.size(100, 25)             // Each text has same width as images (100px)
        .settings.center()                  // Text labels will be centered below images
    ,
    newText("display score", "")
        .settings.text( getVar("score") )   // Can't pass getVar("score") to newText directly
        .settings.before( newText("left label", "Score: ") )
        .settings.size("100%")              // 100% width = as wide as the widest element on the page (= canvas below)
        .settings.right()                   // + aligned to the right = aligned with right edge of widest element (canvas)
        .print()
    ,
    newText("color", row.colorText)         // Retrieve the color name from the CSV design spreadsheet
        .settings.css("font-size", "x-large") // Make it stand out
        .settings.bold()
        .print()
    ,
    newCanvas("patches", 500, 130)
        .settings.add(  0,   0, newImage("color1", row.color1) )   // Color patches
        .settings.add(133,   0, newImage("color2", row.color2) )   // (filenames from CSV design spreadsheet)
        .settings.add(266,   0, newImage("color3", row.color3) )
        .settings.add(400,   0, newImage("color4", row.color4) )
        .settings.add(  0, 105, newText("key1", "1") )             // Labels (keys)
        .settings.add(133, 105, newText("key2", "2") )
        .settings.add(266, 105, newText("key3", "3") )
        .settings.add(400, 105, newText("key4", "4") )
        .print()
    ,
    newText("null", "")                     // Dummy, unprinted Text element, automatically selected upon timeout (see below)
    ,
    newTimer("delay", 1000)                 // 1s timer, then dummy text selected (if no selection in the meantime)
        .settings.callback( 
            getSelector("patch").testNot.selected()  // Select 'null' only if no selection yet
                .success( getSelector("patch").select(getText("null")) )
        )
        .start()
    ,
    getSelector("patch")
        .shuffle()                          // Shuffle the images (dummy Text element not part of selector yet)
        .settings.disableClicks()           // Selection by key, not by click
        .settings.keys( 49, 50, 51, 52 )    // Charcodes for keys 1, 2, 3 and 4 (all-digit strings would be evaluated as charCodes)
        .settings.add( getText("null") )    // Add dummy Text element now (after shuffle and key assignment)
        .settings.frame("solid 2px green")  // Positive visual feedback (green) by default
        .settings.callback(
            getSelector("patch").test.selected( getImage("color1") )
                .success( getVar("score").set(v=>v+1) )                           // Increment score if color1 was selected
                .failure( getSelector("patch").settings.frame("solid 2px red") )  // Red frame otherwise (negative visual feedback)
        )
        .settings.log()                     // Log which color was selected
        .wait()                             // Wait for a selection (dummy Text automatically selected after 1s of no selection)
        .settings.disable()                 // First selection is definitive
    ,
    newTimer("end", 500)                    // Wait 500ms before next trial (so you can see visual feedback frame)
        .start()
        .wait()
  )
  .log( "color", row.colorText )            // Log which color name was shown
);


// OLD IBEX SYNTAX FOR EARLY SENDING OF RESULTS
var manualSendResults = true;
var items = [["send", "__SendResults__", {}]];
var shuffleSequence = seq("instructions", "trial", "send", "end"); // Order of labels reflects order of definition in this script


// FINAL SCREEN
PennController( "end" ,
    newText("end", "Game over! Your final score is:")
        .print()
    ,
    newText("final score", "")
        .settings.text( getVar("score") )   // Can't pass getVar("score") directly to newText
        .settings.center()
        .settings.bold()
        .settings.css("font-size", "x-large") // Make it stand out
        .print()
    ,
    newTimer("ever", 1)                     // Dummy timer
        .wait()                             // Will wait forever (never started)
)
.setOption("countsForProgressBar", false); // No need to 'complete' this screen to fill the progress bar
