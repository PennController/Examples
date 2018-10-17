// Show the picture trials first (though we generate them second)
var shuffleSequence = seq(randomize("picture"), randomize("rating"));
PennController.ResetPrefix(null);
// We don't give the full URL in the spreadsheet
PennController.AddHost("http://files.lab.florianschwarz.net/ibexfiles/PennController/SampleTrials/");

// As before, we use Template to define a template
// But now, we also specify that we want to use a subset of the table:
// this template only uses the rows where Type is 'rating'
PennController.Template( PennController.defaultTable.filter("Type","rating") ,
    row => PennController( "rating" ,
        newText( "sentence" , row.Sentence )
        ,
        newScale("judgment",    "cold", "cool", "lukewarm", "warm", "hot")
            .settings.labelsPosition("top")
            .settings.before( getText("sentence") )
            .settings.size("auto")
            .print()
            .wait()
    )
);

// We use Template a second time to define a template for the 'picture' trials
// This template only uses the rows where Type is 'picture'
PennController.Template( PennController.defaultTable.filter("Type","picture") ,
    row => PennController( "picture" ,
        defaultImage
            .settings.size(200, 200)
        ,
        newText("test sentence", row.Sentence)
            .print()
        ,
        newCanvas("patches", 500, 200)
            .settings.add(   0, 0, newImage("color1", row.Color1) )
            .settings.add( 300, 0, newImage("color2", row.Color2) )
            .print()
        ,
        newSelector("patch")
            .settings.add( getImage("color1") , getImage("color2") )
            .wait()
    )
);
