// FUNCTIONS TO CREATE IMAGE CANVAS //
// A simple alien image
/*
    Usage:    imageAlien("target-home-leftAlien1", "blue")
*/
var imageAlien = (name, color) => newImage(name, 'alien_'+color+'.png' )
                                      .settings.size(45, 45);
    

// A canvas with 10 aliens in 3 ships (to be printed over each planet images)
/*
    Usage:    canvas10Aliens3Ships("target-home", {leftShip: ["red","red","red"], middleShip... }, "BW")
*/
var canvas10Aliens3Ships = (name, alienColors, BandW) =>
    newCanvas(name, 137, 245)
        .settings.add(  4, 12 , newImage(name+"-ships", '3ships'+BandW+'.png').settings.size(137, 209), 1 )  // Image:  3 ships
        .settings.add( -5, 84 ,
            newCanvas(name+"-leftShip", 72 , 90 )                                                            // Canvas: 3 left aliens
                .settings.add( 27,  0, imageAlien(name+'-leftAlien1', alienColors.leftShip[0]) , 2 )
                .settings.add( 18, 45, imageAlien(name+'-leftAlien2', alienColors.leftShip[1]) , 3 )
                .settings.add( 0,  11, imageAlien(name+'-leftAlien3', alienColors.leftShip[2]) , 4 )
        )
        .settings.add( 50, 40 ,
            newCanvas(name+"-middleShip", 45, 175 )                                                          // Canvas: 4 middle aliens
                .settings.add( 0,   0, imageAlien(name+'-middleAlien1', alienColors.middleShip[0]) , 5 )
                .settings.add( 0,  43, imageAlien(name+'-middleAlien2', alienColors.middleShip[1]) , 6 )
                .settings.add( 0,  85, imageAlien(name+'-middleAlien3', alienColors.middleShip[2]) , 7 )
                .settings.add( 0, 127, imageAlien(name+'-middleAlien4', alienColors.middleShip[3]) , 8 )
        )
        .settings.add( 82, 85 ,
            newCanvas(name+"-rightShip", 67 , 89 )                                                           // Canvas: 3 right aliens
                .settings.add( 0,  0, imageAlien(name+'-rightAlien1', alienColors.rightShip[0]) , 9 )
                .settings.add( 5, 44, imageAlien(name+'-rightAlien2', alienColors.rightShip[1]) , 10 )
                .settings.add(22, 17, imageAlien(name+'-rightAlien3', alienColors.rightShip[2]) , 11 )
        )
        .settings.add( 45, 220, newText(name+'-planetName', name.replace(/^[^-]+-/,'')) );                   // Text:   planet name



// A canvas with home, transit and destination (if named 'filler' then will be black and white)
/*
    Usage:    canvas3Planets("planets", { home: {leftShip...} , transit: {leftShip...} , destination; {leftShip...} })
*/
var canvas3Planets = (name, planetAliens) => {
    let blackAndWhite = "";
    if (name=="filler")
        blackAndWhite = "BW";
    return newCanvas(name, 530, 245)
            .settings.add(   0, 0, newImage(name+"-planets", 'planetsLarger'+blackAndWhite+'.png').settings.size(530, 245), 0 )
            .settings.add(   0, 0, canvas10Aliens3Ships(name+"-Home",        planetAliens.home,        blackAndWhite) )
            .settings.add( 190, 0, canvas10Aliens3Ships(name+"-Transit",     planetAliens.transit,     blackAndWhite) )
            .settings.add( 380, 0, canvas10Aliens3Ships(name+"-Destination", planetAliens.destination, blackAndWhite) )
};


// The main canvas, showing two spapce-travel pictures side by side (target and filler)
/*
    Usage:    canvasTargetFiller( {home: {leftShip...}, transit...} , {home: {leftShip...}, transit...} )
*/
var canvasTargetFiller = (targetAliens, fillerAliens) =>
    newCanvas('planets', 1160, 255)
        .settings.add(   5, 5, canvas3Planets('target', targetAliens) , 1 )
        .settings.add( 620, 5, canvas3Planets('filler', fillerAliens) , 2 );
