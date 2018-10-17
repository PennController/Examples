PennController.ResetPrefix(null);
PennController.AddHost("http://files.lab.florianschwarz.net/ibexfiles/Pictures/");

// All the instructions tooltips have the same format (almost)
var instructions = (where, text, position) => 
    getTooltip('instructions')
                .settings.text(text)                         // Update the instructions tooltip's text
                .settings.position(position||"middle right") // (Re-)position it
                .print(where)                                // Attach it to the specified element, and
                .wait();                                     // Wait for validation


// DEFAULT SETTINGS FOR TOOLTIPS
PennController.Header(
    defaultTooltip
        .settings.position("middle right")          // Vertically centered and horizontally on the right by default
        .settings.size(170,90)                      // All tooltips are 170x90
        .settings.frame()                           // Add a frame around the element attached to
        .settings.label("Click or press Space")     // The bottom-right label
        .settings.key(32)                           // Tooltips can be validated by pressing space (key code = 32)
);
