// ffffibo@trickfilm 2022
// After Effects
// ReTexter 1.0
/*The user can browse and select a TSV file containing data about layers 
and text to apply to them. Once the file is selected, the user can click 
the "Apply" button to execute the script, which will update the text for 
the specified layers in the After Effects project. 
 */

/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"activeId":35,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":null,"windowType":"Palette","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"STARR0055-Retexter","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"]}},"item-20":{"id":20,"type":"Button","parentId":32,"style":{"enabled":true,"varName":null,"text":"Browse","justify":"center","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-28":{"id":28,"type":"Button","parentId":30,"style":{"enabled":true,"varName":null,"text":"Apply","justify":"center","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-30":{"id":30,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":20,"alignChildren":["left","center"],"alignment":"left"}},"item-31":{"id":31,"type":"Progressbar","parentId":30,"style":{"enabled":true,"varName":null,"preferredSize":[85,4],"alignment":null,"helpTip":null}},"item-32":{"id":32,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-33":{"id":33,"type":"StaticText","parentId":32,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Select CVS-File","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-34":{"id":34,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-35":{"id":35,"type":"StaticText","parentId":34,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":true,"scrolling":true},"softWrap":true,"text":"dfdsff fdsjfkdshfkdshfsdjhdkjshfjkdshfdsjhfjkdshfdjskhfdjskhfdskjhfdsjkhfjdks sdfjhdskhfjksd sdfhjsdkhfjksdhfsd shfsjkdfhkj","justify":"left","preferredSize":[205,200],"alignment":"top","helpTip":null}}},"order":[0,32,33,20,30,31,28,34,35],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"}}
*/ 



var file = new File;
var check = 0;
var fileData = new Array;
var workData = new Array;


// PALETTE
// =======
var palette = new Window("palette"); 
    palette.text = "ReTexter"; 
    palette.orientation = "column"; 
    palette.alignChildren = ["left","top"]; 
    palette.spacing = 10; 
    palette.margins = 10; 

// GROUP1
// ======
var group1 = palette.add("group", undefined, {name: "group1"}); 
    group1.orientation = "row"; 
    group1.alignChildren = ["left","center"]; 
    group1.spacing = 10; 
    group1.margins = 0; 

var statictext1 = group1.add("statictext", undefined, undefined, {name: "statictext1"}); 
    statictext1.text = "Select TVS-File";
    statictext1.preferredSize.width = 95;

var button1 = group1.add("button", undefined, undefined, {name: "button1"}); 
    button1.text = "Browse"; 
    button1.preferredSize.width = 100; 

// GROUP2
// ======
var group2 = palette.add("group", undefined, {name: "group2"}); 
    group2.orientation = "row"; 
    group2.alignChildren = ["left","center"]; 
    group2.spacing = 20; 
    group2.margins = 0; 
    group2.alignment = ["left","top"]; 

var progressbar1 = group2.add("progressbar", undefined, undefined, {name: "progressbar1"}); 
    progressbar1.maxvalue = 100; 
    progressbar1.value = 0; 
    progressbar1.preferredSize.width = 85; 
    progressbar1.preferredSize.height = 4; 

var button2 = group2.add("button", undefined, undefined, {name: "button2"}); 
    button2.text = "Apply"; 
    button2.preferredSize.width = 100; 

// GROUP3
// ======
var group3 = palette.add("group", undefined, {name: "group3"}); 
    group3.orientation = "row"; 
    group3.alignChildren = ["left","top"]; 
    group3.spacing = 10; 
    group3.margins = 0; 

var trc = group3.add("statictext", undefined, undefined, {name: "trc", multiline: true, scrolling: true}); 
    trc.text = "TRC:"; 
    trc.preferredSize.width = 205; 
    trc.preferredSize.height = 60;

palette.show();


button1.onClick = function openDialog() {
    fileData = new Array;
    workData = new Array;
    progressbar1.value = 0;
    file = file.openDlg("Öffne CSV-Datei", "Acceptable Files:*.csv");
	if (file) {
        check = 1;
		//updatePanel();
		fileData = readCSV();

        buildArray(fileData);
        

	}
}

button2.onClick = function execute() {
  app.beginUndoGroup("STARR0055-Retexter")
  progressbar1.value = 0;
  trace("Execute")
    for (var j = 0; j< workData.length;j++){
        var myComp;
        for (var i = 1; i <= app.project.numItems; i ++) {
            if ((app.project.item(i) instanceof CompItem) && (app.project.item(i).name === workData[j].comp)) {
                for (var k = 1; k <= app.project.item(i).layers.length;k++){
                    if (app.project.item(i).layer(k).name == workData[j].layer){
                        app.project.item(i).layer(k).sourceText.setValue(workData[j].text);
                      
                    }
                }
        
            }
        }  
        progressbar1.value = (100*j/workData.length)     

    }
    app.endUndoGroup()
    trace("Done! Please Check: s01: h-sym-1")
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

function trace(str, add) {
    // str = str.toString();
    if (add) {
        trc.text += "\n" + str
    } else {
        trc.text = str;
    }
}

function buildArray(fileData){
   var arr= new Array
    for (var i = 1; i < fileData.length;i++){
        arr = fileData[i].split('\t')
      
        workData.push({comp:arr[0],layer:arr[1],text:arr[2]})
    }
    trace(file.name + " has " + workData.length +" entries.")
}
