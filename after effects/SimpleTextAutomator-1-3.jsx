// fibo@trickfilm 2023
// After Effects
// Simple Text Automator 1.0
/* The script reads a CSV file and then duplicates a specific composition 
in the After Effects project, changing the text layers in the duplicated 
composition based on the data in the CSV file. The script can be used to 
quickly generate multiple versions of a composition with different text data.
 */

// GLOBAL VARS
// =======
var file = new File;
var check = 0;
var selComps = [];
var count = 0;

// UI
// =======

/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":null,"windowType":"Palette","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Simple Text Automator 1.2","preferredSize":[0,0],"margins":8,"orientation":"column","spacing":8,"alignChildren":["center","top"]}},"item-2":{"id":2,"type":"EditText","parentId":6,"style":{"enabled":true,"varName":"fileLocBox","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"","justify":"left","preferredSize":[250,0],"alignment":null,"helpTip":null}},"item-3":{"id":3,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-4":{"id":4,"type":"Group","parentId":3,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-5":{"id":5,"type":"StaticText","parentId":4,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":true,"text":"Select Compositions:","justify":"left","preferredSize":[0,0],"alignment":"top","helpTip":null}},"item-6":{"id":6,"type":"Group","parentId":3,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-7":{"id":7,"type":"StaticText","parentId":6,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Select CSV File:","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-8":{"id":8,"type":"Button","parentId":6,"style":{"enabled":true,"varName":"getFileButton","text":"Browse","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-10":{"id":10,"type":"ListBox","parentId":4,"style":{"enabled":true,"varName":"compBox","creationProps":{"multiselect":true,"numberOfColumns":"1","columnWidths":"[]","columnTitles":"[]","showHeaders":false},"listItems":"Item 1, Item 2","preferredSize":[440,200],"alignment":null,"helpTip":null,"selection":[]}},"item-18":{"id":18,"type":"Group","parentId":3,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["right","center"],"alignment":"fill"}},"item-20":{"id":20,"type":"Button","parentId":18,"style":{"enabled":true,"varName":"applyButton","text":"Apply","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-21":{"id":21,"type":"Group","parentId":3,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-22":{"id":22,"type":"StaticText","parentId":21,"style":{"enabled":true,"varName":"","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Data:","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-23":{"id":23,"type":"ListBox","parentId":21,"style":{"enabled":true,"varName":"dataBox","creationProps":{"multiselect":false,"numberOfColumns":1,"columnWidths":"[]","columnTitles":"[]","showHeaders":true},"listItems":"Item 1, Item 2","preferredSize":[440,200],"alignment":null,"helpTip":null}}},"order":[0,3,6,7,2,8,21,22,23,4,5,10,18,20],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"},"activeId":22}
*/ 

// PALETTE
// =======
var palette = new Window("palette"); 
    palette.text = "Simple Text Automator 1.0"; 
    palette.orientation = "column"; 
    palette.alignChildren = ["center","top"]; 
    palette.spacing = 8; 
    palette.margins = 8; 

// GROUP1
// ======
var group1 = palette.add("group", undefined, {name: "group1"}); 
    group1.orientation = "column"; 
    group1.alignChildren = ["left","center"]; 
    group1.spacing = 10; 
    group1.margins = 0; 

// GROUP2
// ======
var group2 = group1.add("group", undefined, {name: "group2"}); 
    group2.orientation = "row"; 
    group2.alignChildren = ["left","center"]; 
    group2.spacing = 10; 
    group2.margins = 0; 

var statictext1 = group2.add("statictext", undefined, undefined, {name: "statictext1"}); 
    statictext1.text = "Select CSV File:"; 

var fileLocBox = group2.add('edittext {properties: {name: "fileLocBox"}}'); 
    fileLocBox.preferredSize.width = 250; 

var getFileButton = group2.add("button", undefined, undefined, {name: "getFileButton"}); 
    getFileButton.text = "Browse"; 


// GROUP4
// ======
var group4 = group1.add("group", undefined, {name: "group4"}); 
    group4.orientation = "column"; 
    group4.alignChildren = ["left","center"]; 
    group4.spacing = 10; 
    group4.margins = 0; 

var statictext3 = group4.add("statictext", undefined, undefined, {name: "statictext3"}); 
    statictext3.text = "Select Compositions:"; 
    statictext3.alignment = ["left","center"]; 

var compBox_array = ["Item 1","Item 2"]; 
var compBox = group4.add("listbox", undefined, undefined, {name: "compBox", items: compBox_array, multiselect: true}); 
    compBox.preferredSize.width = 440; 
    compBox.preferredSize.height = 200; 

// GROUP5
// ======
var group5 = group1.add("group", undefined, {name: "group5"}); 
    group5.orientation = "row"; 
    group5.alignChildren = ["right","center"]; 
    group5.spacing = 10; 
    group5.margins = 0; 
    group5.alignment = ["fill","center"]; 

var applyButton = group5.add("button", undefined, undefined, {name: "applyButton"}); 
    applyButton.text = "Apply"; 

palette.center();
palette.show();

// FUNCTIONS
// ======

updateDD();

function updateDD(){
    compBox.removeAll();
    for (var i=1; i<=app.project.numItems; i++) {
        if (app.project.item(i) instanceof CompItem) {
            compBox.add("item",app.project.item(i).name);
            compBox_array.push(app.project.item(i).name);
          }
    }  
    compBox.selection = 0;
    changeDD();
}

compBox.onChange = function (){
    changeDD();
}

function changeDD(){
    selComps = [];

    for (var i = 1; i <= app.project.numItems; i ++) {
        for (var j = 0; j < compBox.selection.length; j++){
          if ((app.project.item(i) instanceof CompItem) && (app.project.item(i).name === String(compBox.selection[j]))) {
            selComps.push(app.project.item(i))

            }
        }
    }   
}

getFileButton.onClick = function() {
    file = file.openDlg("Open a file", "Acceptable Files:*.csv");
    if (file) {
        fileLocBox.text = file.fsName;
        check=1;

	}
}

applyButton.onClick = function() {
    if(file) {
        if (selComps.length>0){
            app.beginUndoGroup("Simple Text Automator");
            var fileExtension = fileLocBox.text;
            var fileData = readCSV();
            changeComps(fileData);
            app.endUndoGroup();
        }else{
            alert("Select Composition(s)");
        }
    } else {
        alert("Select a CSV-file");
        return false;
    }
    alert(count + " compositions created");
    count = 0;
            
}

function readCSV() { 
  var txtArray = [];
  var currentLine;
  file.open("r");
  while(!file.eof){
    currentLine = file.readln();
    txtArray.push(currentLine);
  }
  file.close();
  return txtArray;
}

function getTextLayer(comp,str){
  var txtLayer;
    for (var i = 1; i <= comp.layers.length; i ++) {
        if (comp.layers[i] .name === str) {
            txtLayer = comp.layers[i];
        }
    }
    return txtLayer;
}


function changeComps(txtArray){
  var headerArray = txtArray[0].split(",");
   for (var j = 0; j < selComps.length; j++){
      for (var i = 1; i < txtArray.length; i ++) {
        changeComp(txtArray[i].split(","),headerArray,selComps[j]);
      }
   }

}

function changeComp(txtArray,headerArray,compOne){
    var newComp  = compOne.duplicate();
    newComp.name = compOne.name + "-" + txtArray[0];
    for (var i = 0; i < headerArray.length;i++){
       if(getTextLayer(newComp,headerArray[i])){
         changeText(getTextLayer(newComp,headerArray[i]),txtArray[i]);
       }
    }
    count++;
}

function changeText(textLayer,str){
    textLayer.property("Source Text").setValue(str);
}
