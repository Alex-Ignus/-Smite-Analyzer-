var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin


var g = svg.append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");
   
const abilities = ['Ability_1', 'Ability_2','Ability_3','Ability_4','Ability_5']
const godIcons = new Map();
var dbData = {}
const match_types = ['conquest','joust','clash']
var size = 0;

function addToMap(i, objEle, DataCount){ 
        var role = objEle;
        if(DataCount.has(role)!= true){ 
            console.log('objEle : ' + role );
            DataCount.set(role, 0);
        }
        
        c =  parseInt(DataCount.get(role));
        c += parseInt(dbData[i].GodData.match_count);
      
        if(isNaN(c)==false){ 
            DataCount.set(role,  c);
        }
        }
      

smiteDB.collection('test_roleCount').get().then( res =>{
	console.log('get from DB')
    console.log(res);
    
	for (i=0; i<res.docs.length;i++){
		console.log('loop')
        size ++;
        console.log(res.docs[i].id);
        console.log(res.docs[i]._delegate._document.data.partialValue.mapValue.fields.roles.mapValue.fields.mage.integerValue);
        console.log(res.docs[i]._delegate._document.data.partialValue.mapValue.fields.roles.mapValue.fields.hunter.integerValue);
        console.log(res.docs[i]._delegate._document.data.partialValue.mapValue.fields.roles.mapValue.fields.assassin.integerValue);
        console.log(res.docs[i]._delegate._document.data.partialValue.mapValue.fields.roles.mapValue.fields.warrior.integerValue);
        console.log(res.docs[i]._delegate._document.data.partialValue.mapValue.fields.roles.mapValue.fields.guardian.integerValue);

		dbData[i] = {
            matchData:{ 
                MatchType:res.docs[i].id,
                mage:res.docs[i]._delegate._document.data.partialValue.mapValue.fields.roles.mapValue.fields.mage.integerValue,
                hunter:res.docs[i]._delegate._document.data.partialValue.mapValue.fields.roles.mapValue.fields.hunter.integerValue,
                assassin:res.docs[i]._delegate._document.data.partialValue.mapValue.fields.roles.mapValue.fields.assassin.integerValue,
                guardian:res.docs[i]._delegate._document.data.partialValue.mapValue.fields.roles.mapValue.fields.guardian.integerValue,
                warrior:res.docs[i]._delegate._document.data.partialValue.mapValue.fields.roles.mapValue.fields.warrior.integerValue
            },
		};
	}
})
smiteDB.collection('test_roleCount').get().then( res =>{

    var data = []; 
    res.docs.forEach(doc => { 
        data.push(doc.data())
    })
    console.log(data)
    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = 450 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
    // Build X scales and axis:
    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(match_types)
    .padding(0.01);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
})