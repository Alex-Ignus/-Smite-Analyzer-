var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin


var g = svg.append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");
   
const abilities = ['Ability_1', 'Ability_2','Ability_3','Ability_4','Ability_5']
const godIcons = new Map();
var data = {}


smiteDB.collection('god').get().then( res =>{
	console.log('get from DB')
    console.log(res);
	for (i=0; i<res.docs.length;i++){
		console.log('loop')
		data[i] = {
			Ability1:res.docs[i]._delegate._document.data.partialValue.mapValue.fields.Ability1.stringValue
		};
	}
    console.log(data);
})

//-----bscaleable------//
var dataset = {things: [40, 60],};
var width = 315;
var height = 315;
var radius = Math.min(width, height) / 2;
var color = d3.scale.category20();
var pie = d3.layout.pie().sort(null);
var arc = d3.svg.arc()
    .innerRadius(radius - 85)
    .outerRadius(radius - 50);
var svg = d3.select("#donut")
    .append("svg")
    .attr("width", width)
    .attr("height", 264)
    .append("g")
    .attr("transform", "translate(" 
        + width / 2.090 + "," 
        + height / 2.38  + ")");
var path = svg.selectAll("path")
    .data(pie(dataset.things))
    .enter().append("path")
    .attr("fill", function(d, i) { return getColors(i); })
    .attr("d", arc);

function getColors (i) {
    var colorArray = ['#E5E5E5','#5CB85C'];
    return colorArray[i];
}

svg.append("svg:text")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("style","font-family:Ubuntu")
    .attr("font-size","40")
    .attr("fill","#5CB85C")
    .text("60%");

// smiteDB.collection('god').get().then(res => { 

//     var data = [];
//     //console.log(res);
//     res.docs.forEach( doc=> { 
//         data.push(doc.data());
//     })
//    // console.log(data);
//     var icons = new Map();
//     y = 0;
//     x = 0;
//     data.forEach(obj =>{
//         //console.log("Name: " + obj['Name'] + "\nRole: " + obj['Roles'] +"\nAbilities: ");
//         if(x > 1000){ 
//             x = 0;
//             y += 50;
//         }
        
//         abilities.forEach(str => { 
//             //console.log("\t" + obj[str]['Summary'] + " : " + obj[str]['URL']);
//             var myimage = svg.append('image')
//             .attr('xlink:href',  obj[str]['URL'])
//             .attr('width', 50)
//             .attr('height', 50)
//             .attr('x', x+=50)
//             .attr('y', y);
//             icons.set(obj[str]['Summary'], obj[str]['URL'] );
//         })
       
//         godIcons.set(obj['Name'],icons ); 
//         icons = new Map();
      
      
//     } )
//     console.log(godIcons);

   
    
 
// });
