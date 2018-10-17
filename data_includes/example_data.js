PennController.ResetPrefix(null);

PennController(
    newText("test sentence", "The fish swim in a tank which is perfectly round")
        .print()        // A test sentence
    ,
    newImage("competitor", "http://files.lab.florianschwarz.net/ibexfiles/PennController/SampleTrials/1fishSquareTank.png")
        .print()        // An image with 1 fish that swims in a square tank
    ,
    newImage("target", "http://files.lab.florianschwarz.net/ibexfiles/PennController/SampleTrials/2fishRoundTank.png")
        .print()        // An image with 2 fish that swim in a round tank
    ,
    newSelector("tank") // We indicate that target+competitor belong to a selection group
        .settings.add( getImage("target") , getImage("competitor") )
        .wait()         // On hold until target or competitor is selected
);
