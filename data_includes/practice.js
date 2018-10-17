// FIRST PRACTICE TRIAL:     VISIBLE = GOOD
PennController( "practice good" ,
    newTimer("end", 500)                        // Wait 500ms before starting
        .start()
        .wait()
    ,
    newTooltip('instructions', "")              // Let's create the instructions tooltip (no text for now)
    ,
    // LAYOUT PREPARATION
    newText("test sentence", "Exactly three aliens no longer were red")
        .settings.center()                      // Test sentence at the top and in the middle of the screen
        .print()
    ,
    canvasTargetFiller(                         // Create the target and filler images
    {    
        home:        {leftShip: ["red", "red", "red"],    middleShip: ["red", "red", "red", "red"],     rightShip: ["red", "red", "red"]},
        transit:     {leftShip: ["grey", "grey", "grey"], middleShip: ["grey", "grey", "grey", "grey"], rightShip: ["grey", "grey", "grey"]},
        destination: {leftShip: ["blue", "blue", "blue"], middleShip: ["red", "red", "red", "red"],     rightShip: ["red", "red", "red"]},
        
    },
    {    
        home:        {leftShip: ["BW", "BW", "BW"], middleShip: ["BW", "BW", "BW", "BW"], rightShip: ["BW", "BW", "BW"]},
        transit:     {leftShip: ["BW", "BW", "BW"], middleShip: ["BW", "BW", "BW", "BW"], rightShip: ["BW", "BW", "BW"]},
        destination: {leftShip: ["BW", "BW", "BW"], middleShip: ["BW", "BW", "BW", "BW"], rightShip: ["BW", "BW", "BW"]},
    }    
    ).settings.add( 620, 5,                             // Add the planet to be revealed, but hide it for now (only in practice trials)
        canvas3Planets("reveal",
          {    
            home:        {leftShip: ["green", "green", "green"], middleShip: ["green", "green", "green", "green"], rightShip: ["green", "green", "green"]},
            transit:     {leftShip: ["grey", "grey", "grey"],    middleShip: ["grey", "grey", "grey", "grey"],     rightShip: ["grey", "grey", "grey"]},
            destination: {leftShip: ["red", "red", "red"],       middleShip: ["blue", "blue", "blue", "blue"],     rightShip: ["blue", "blue", "blue"]},
          }    
        ) , -1
    )
        .print()                                        // Show the main canvas (below the text)
    ,
    getCanvas('target-Transit').settings.hidden(),      // Hide the transit planet for now
    getCanvas('target-Destination').settings.hidden(),  // Hide the destination planet for now
    getCanvas('filler').settings.hidden(),              // Hide the picture on the right for now
    getCanvas('reveal').settings.hidden()               // Hide the picture on the right for now
    ,
    // INSTRUCTIONS
    instructions( getCanvas('target-Home')            , "These aliens are moving out from their home planet." ),
    instructions( getCanvas('target-Home')            , "They are traveling using three space ships." ),
    instructions( getCanvas('target-Home-leftShip')   , "For instance, these three aliens are traveling in one ship together." ),
    instructions( getCanvas('target-Home-middleShip') , "And these four aliens are traveling in another ship together." )
    ,
    getCanvas('target-Transit')          
        .settings.visible()                             // Reveal transit planet
    ,
    instructions( getCanvas('target-Transit')     , "They all stop by a transit planet..." )
    ,
    getCanvas('target-Destination')
        .settings.visible()                             // Reveal destination planet
    ,
    instructions( getCanvas('target-Destination') , "... before arriving to their destination." )
    ,
    getCanvas('filler')
        .settings.visible()                             // Reveal picture on the right (B&W)
    ,
    newTimer("filler revelation", 200)                  // Give participant some time to digest
        .start()
        .wait()
    ,
    instructions( getCanvas('filler')      , "Here, you can see another group of aliens, also moving out from their planet." , "bottom center" ),
    instructions( getCanvas('filler')      , "We applied a filter screen, so you cannot see their colors."                   , "bottom center" ),
    instructions( getText('test sentence') , "Your task will be to guess which of the two pictures this sentence describes"  , "bottom center" ),
    instructions( getCanvas('planets')     , "Now click on one of the two pictures to make a choice."                        , "bottom center" ),
    instructions( getCanvas('target')      , "Click on the picture on the left if you think it matches"                      , "bottom center" ),
    instructions( getCanvas('filler')      , "or click on the picture on the right if you think it's a better match"         , "bottom center" )
    ,
    // CLICKS
    newTimer('before click', 100)
        .start()
        .wait()
    ,
    newTooltip('correct', "Right, this picture matches the description"),   // Create the positive feedback tooltip (not printed yet)
    newTooltip('incorrect', "")                                             // Create the negative feedback tooltip (not printed yet)
        .settings.css("background-color", "tomato")                         //     (beautiful tomato color means 'wrong!')
    ,
    newSelector('trips')                                                    // Group the selectable pictures
        .settings.add( getCanvas('target') , getCanvas('filler') , getCanvas('reveal') )
        .settings.frame( "solid 2px purple" )                               // Frame around selected element
        .settings.log()                                                     // Record selection
        .wait()                                                             // Wait for selection

        .test.selected( getCanvas('filler') )                               // If filler was selected...
        .success(
            // WRONG PICTURE SELECTED BLOCK
            getSelector('trips').settings.disable()                         // Temporarily disable selector
            ,
            getTooltip('incorrect')                                         // And show negative feedback
                .settings.text("Wrong, you should have selected the visible picture")
                .settings.position('bottom center')
                .print( getCanvas('filler') )                               // Show it under the wrong picture
                .wait()

                .settings.text("As you can see, the aliens' colors match the description here")
                .print( getCanvas('target') )                               // Then indicate the correct picture
                .wait()
            ,
            getCanvas('reveal').settings.visible(),                         // Now reveal the colors
            getCanvas('filler').remove()                                    // And remove the b&w picture
            ,
            getTooltip('incorrect')
                .settings.text("Once we remove the filter, you can see the aliens' colors indeed do not match here")
                .print( getCanvas('reveal') )                               // Explanations
                .wait()
            ,
            getSelector('trips')
                .settings.enable()                                          // Re-enable selector
                .wait( getSelector('trips').test.selected(getCanvas('target')) ) // Wait for a click on the correct picture
           // END WRONG PICTURE SELECTED BLOCK
        )
    ,
    getCanvas("reveal").settings.visible(),                 // Reveal colors (if not already revealed)
    getCanvas("filler").remove(),                           // Remove BW filler (if not done yet)
    getSelector('trips').settings.disable()                 // Temporarily disable selector
    ,
    getTooltip('correct')                                   // Give some positive feedback
        .settings.position('bottom center')
        .print( getCanvas('target') )
        .wait()
        .settings.text( "... while this one, as a matter of fact, does not" )
        .print( getCanvas('reveal') )
        .wait()
        .settings.text( "Let's go through a second practice trial" )
        .settings.position( "middle center" )
        .print( getCanvas('planets') )
        .wait()
    ,
    newTimer("end", 500)                                    // Wait 500ms before proceeding
        .start()
        .wait()
);







// SECOND PRACTICE TRIAL:     VISIBLE = BAD
PennController( "practice bad" ,
    newTimer("end", 500)                        // Wait 500ms before starting
        .start()
        .wait()
    ,
    newTooltip('instructions', "")              // Let's create the instructions tooltip (no text for now)
    ,
    // LAYOUT PREPARATION
    newText("test sentence", "Exactly three aliens no longer were blue")
        .settings.center()                      // Test sentence at the top and in the middle of the screen
        .print()
    ,
    canvasTargetFiller(                         // Create the target and filler images
    {    
        home:        {leftShip: ["blue", "blue", "blue"], middleShip: ["blue", "blue", "blue", "blue"], rightShip: ["blue", "blue", "blue"]},
        transit:     {leftShip: ["grey", "grey", "grey"], middleShip: ["grey", "grey", "grey", "grey"], rightShip: ["grey", "grey", "grey"]},
        destination: {leftShip: ["blue", "blue", "blue"], middleShip: ["red", "red", "red", "red"],     rightShip: ["red", "red", "red"]},
        
    },
    {    
        home:        {leftShip: ["BW", "BW", "BW"], middleShip: ["BW", "BW", "BW", "BW"], rightShip: ["BW", "BW", "BW"]},
        transit:     {leftShip: ["BW", "BW", "BW"], middleShip: ["BW", "BW", "BW", "BW"], rightShip: ["BW", "BW", "BW"]},
        destination: {leftShip: ["BW", "BW", "BW"], middleShip: ["BW", "BW", "BW", "BW"], rightShip: ["BW", "BW", "BW"]},
    }    
    ).settings.add( 620, 5,                             // Add the planet to be revealed, but hide it for now (only in practice trials)
        canvas3Planets("reveal",
          {    
            home:        {leftShip: ["blue", "blue", "blue"], middleShip: ["blue", "blue", "blue", "blue"], rightShip: ["blue", "blue", "blue"]},
            transit:     {leftShip: ["grey", "grey", "grey"], middleShip: ["grey", "grey", "grey", "grey"], rightShip: ["grey", "grey", "grey"]},
            destination: {leftShip: ["blue", "blue", "blue"], middleShip: ["blue", "blue", "blue", "blue"], rightShip: ["red", "red", "red"]},
          }    
        ) , -1
    )
        .print()                                        // Show the main canvas (below the text)
    ,
    getCanvas('reveal').settings.hidden()               // Hide the picture on the right for now
    ,
    // INSTRUCTIONS
    instructions( getCanvas('target-Home')            , "These aliens are moving out from their home planet." ),
    instructions( getCanvas('target-Home')            , "They are traveling using three space ships." ),
    instructions( getCanvas('target-Home-leftShip')   , "For instance, these three aliens are traveling in one ship together." ),
    instructions( getCanvas('target-Home-middleShip') , "And these four aliens are traveling in another ship together." )
    ,
    getCanvas('target-Transit')          
        .settings.visible()                             // Reveal transit planet
    ,
    instructions( getCanvas('target-Transit')     , "They all stop by a transit planet..." )
    ,
    getCanvas('target-Destination')
        .settings.visible()                             // Reveal destination planet
    ,
    instructions( getCanvas('target-Destination') , "... before arriving to their destination." )
    ,
    getCanvas('filler')
        .settings.visible()                             // Reveal picture on the right (B&W)
    ,
    newTimer("filler revelation", 200)                  // Give participant some time to digest
        .start()
        .wait()
    ,
    instructions( getCanvas('filler')      , "Here, you can see another group of aliens, also moving out from their planet." , "bottom center" ),
    instructions( getCanvas('filler')      , "We applied a filter screen, so you cannot see their colors."                   , "bottom center" ),
    instructions( getText('test sentence') , "Your task will be to guess which of the two pictures this sentence describes"  , "bottom center" ),
    instructions( getCanvas('planets')     , "Now click on one of the two pictures to make a choice."                        , "bottom center" ),
    instructions( getCanvas('target')      , "Click on the picture on the left if you think it matches"                      , "bottom center" ),
    instructions( getCanvas('filler')      , "or click on the picture on the right if you think it's a better match"         , "bottom center" )
    ,
    // CLICKS
    newTimer('before click', 100)
        .start()
        .wait()
    ,
    newTooltip('correct', "Right, this picture matches the description"),   // Create the positive feedback tooltip (not printed yet)
    newTooltip('incorrect', "")                                             // Create the negative feedback tooltip (not printed yet)
        .settings.css("background-color", "tomato")                         //     (beautiful tomato color means 'wrong!')
    ,
    newSelector('trips')                                                    // Group the selectable pictures
        .settings.add( getCanvas('target') , getCanvas('filler') , getCanvas('reveal') )
        .settings.frame( "solid 2px purple" )                               // Frame around selected element
        .settings.log()                                                     // Record selection
        .wait()                                                             // Wait for selection

        .test.selected( getCanvas('filler') )                               // If filler was selected...
        .success(
            // WRONG PICTURE SELECTED BLOCK
            getSelector('trips').settings.disable()                         // Temporarily disable selector
            ,
            getTooltip('incorrect')                                         // And show negative feedback
                .settings.text("Wrong, you should have selected the visible picture")
                .settings.position('bottom center')
                .print( getCanvas('filler') )                               // Show it under the wrong picture
                .wait()

                .settings.text("As you can see, the aliens' colors match the description here")
                .print( getCanvas('target') )                               // Then indicate the correct picture
                .wait()
            ,
            getCanvas('reveal').settings.visible(),                         // Now reveal the colors
            getCanvas('filler').remove()                                    // And remove the b&w picture
            ,
            getTooltip('incorrect')
                .settings.text("Once we remove the filter, you can see the aliens' colors indeed do not match here")
                .print( getCanvas('reveal') )                               // Explanations
                .wait()
            ,
            getSelector('trips')
                .settings.enable()                                          // Re-enable selector
                .wait( getSelector('trips').test.selected(getCanvas('target')) ) // Wait for a click on the correct picture
           // END WRONG PICTURE SELECTED BLOCK
        )
    ,
    getCanvas("reveal").settings.visible(),                 // Reveal colors (if not already revealed)
    getCanvas("filler").remove(),                           // Remove BW filler (if not done yet)
    getSelector('trips').settings.disable()                 // Temporarily disable selector
    ,
    getTooltip('correct')                                   // Give some positive feedback
        .settings.position('bottom center')
        .print( getCanvas('target') )
        .wait()
    ,
    newTimer("end", 500)                                    // Wait 500ms before proceeding
        .start()
        .wait()
);