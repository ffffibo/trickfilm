// ffffibo@trickfilm 2023
// After Effects
// Split Shapes 1.0
/* This script defines a function called splitShapes() that takes all Shape Layers
 and splits the shapes in the layer into separate layers, each with only one shape. 
 It does this by looping through all of the shapes in the Shape Layer and creating 
 a new layer for each shape. It sets the name of the new layer to the name of the shape, 
 and then removes all of the shapes in the new layer except for the one that we want to 
 keep.
 */

// Define the function
function splitShapes() {
    // Get the active composition
    var curComp = app.project.activeItem;
    
    // Get the selected layers
    var selectedLayers = app.project.activeItem.selectedLayers;
    
    // Initialize a count variable
    var count = 0;
    
    // Check if there is an active composition and if it is a CompItem
    if (curComp == null || !(curComp instanceof CompItem)) {
        // If there is no active composition or it is not a CompItem, show an error message and exit the function
        alert("No comp active.");
        return;
    }
    
    // Check if there are any selected layers
    if (selectedLayers.length == 0) {
        // If there are no selected layers, show an error message and exit the function
        alert("Select at least one Shape Layer");
        return;
    }
    
    // Start an undo group
    app.beginUndoGroup("Split Shapes");
    
    // Loop through all of the selected layers
    for (var k = 0; k < selectedLayers.length; k++) {
        // Get the current layer
        var shapeLayer = app.project.activeItem.selectedLayers[k];
        
        // Check if the current layer is a Shape Layer
        if (shapeLayer == null || !(shapeLayer.matchName == "ADBE Vector Layer")) {
            // If the current layer is not a Shape Layer, increment the count variable
            count++;
            
            // Check if all of the selected layers are not Shape Layers
            if (count == selectedLayers.length) {
                // If all of the selected layers are not Shape Layers, show an error message and exit the function
                alert("Select at least one Shape Layer");
                return;
            }
        } else {
            // If the current layer is a Shape Layer, get the number of shapes in the layer
            var shapeCount = shapeLayer("ADBE Root Vectors Group").numProperties;
            
            // Loop through all of the shapes in the Shape Layer
            for (var i = 1; i <= shapeCount; i++) {
                // Duplicate the Shape Layer
                var newLayer = shapeLayer.duplicate();
                
                // Set the name of the new layer to the name of the shape
                newLayer.name = shapeLayer("ADBE Root Vectors Group").property(i).name;
                
                // Get the 'Contents' property of the new layer
                var contents = newLayer.property("Contents");
                
                // Loop through all of the shapes in the new layer
                for (var j = shapeCount; j > 0; j--) {
                    // If the current shape is not the one we want to keep, remove it
                    if (j != i) {
                        contents.property(j).remove();
                    }
                }
            }
        }
    }
    
    // End the undo group
    app.endUndoGroup();
}

// Call the function
splitShapes();
