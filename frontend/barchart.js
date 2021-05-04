var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin


var g = svg.append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");
   
const abilities = ['Ability_1', 'Ability_2','Ability_3','Ability_4','Ability_5']
const godIcons = new Map();
var dbData = {}

var  roleCount = new Map();
var  pantheonCount = new Map();
var  god2Role = new Map(); 
var got2Pantheon = new Map();
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
      
//the required data base: god count
smiteDB.collection('god_count').get().then( res =>{
	console.log('get from DB')
    console.log(res);
	for (i=0; i<res.docs.length;i++){
		console.log('loop')
        size ++;
		dbData[i] = {
            GodData:{ 
                ID:res.docs[i]._delegate._document.data.partialValue.mapValue.fields.id.stringValue,
                Name:res.docs[i]._delegate._document.data.partialValue.mapValue.fields.Name.stringValue,
                Role:res.docs[i]._delegate._document.data.partialValue.mapValue.fields.Roles.stringValue,
                Pantheon:res.docs[i]._delegate._document.data.partialValue.mapValue.fields.Pantheon.stringValue,
                match_count:res.docs[i]._delegate._document.data.partialValue.mapValue.fields.match_count.integerValue
            },
		};
	}
    console.log(dbData)
    for (i = 0; i < size; i++ ){
        addToMap(i, dbData[i].GodData.Role, roleCount)
        addToMap(i, dbData[i].GodData.Pantheon, pantheonCount)
        var role = dbData[i].GodData.Role
        var pantheon = dbData[i].GodData.Pantheon
        if(god2Role.has(role) != true ){ 
            god2Role.set(role, []);
        }
        if(got2Pantheon.has(pantheon) != true ){ 
            got2Pantheon.set(pantheon, []);
        }
        god2Role.get(role).push( dbData[i].GodData.Name);
        got2Pantheon.get(pantheon).push( dbData[i].GodData.Name);


    }
    console.log(roleCount)
    console.log(pantheonCount)
    console.log(god2Role)
    console.log(got2Pantheon)

})

smiteDB.collection('god_count').get().then( res =>{

    var data = []; 
    res.docs.forEach(doc => { 
        data.push(doc.data())
    })

    var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin;
    var xScale =  d3.scaleLinear().range ([0, width]),
    yScale = d3.scaleBand().range ([0, height]).padding(0.4);

    var g = svg.append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");

    xScale.domain([0, d3.max(data, function(d) { return d.match_count; })]);
    yScale.domain(data.map(function(d) { return d.Pantheon; }));

        g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

        g.append("g")
        .call(d3.axisLeft(yScale).tickFormat(function(d){
            return  d;
        }).ticks(10))
        .append("text")
        .attr("y", 0)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("value");
        g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .on("click", function(){
            d3.select(this)
                .attr("fill", "red");
  
            // Get current event info
            console.log(d3.event);
            
            // Get x & y co-ordinates
            console.log(d3.mouse(this));
        })
        .attr("x", 0)
        .attr("y", function(d) { return yScale(d.Pantheon); })
        .attr("height", yScale.bandwidth())
        .attr("width", function(d) { return xScale(d.match_count); })
       


        
})