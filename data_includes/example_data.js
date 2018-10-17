// We will explain this line later
PennController.ResetPrefix(null);

// Use PennController to script your trial
PennController(
    // We create a new text element that we name 'test sentence,' which contains the text of our complex test sentence
    newText("test sentence", "A is colder than B, though A is not cold yet.")
        .print() // This prints the text onto the screen
    ,
    // We create a key element that we name 'answer' and which reacts to any key press on F (coherent) or J (incoherent)
    newKey("answer", "FJ")
        .wait() // This waits for a key press before validation
);
