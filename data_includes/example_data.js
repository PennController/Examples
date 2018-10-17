PennController.ResetPrefix(null);

PennController(
    newText("green", "How warm is the color green to you?")
        .print()
    ,
    newScale("judgment", 5) // 5-point scale
        .print()
        .wait()             // Validate upon choice
);
