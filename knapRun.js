document.querySelector("button").addEventListener("click", runKnap);
//Gives us the answers to output
function knapSackAnalysis(table, items, capacity, values, weights) {
    const total = capacity;
    var answer = [];
    var indexAns = 0;
    for (let i = items.length; i > 0; i--) {
        //i.e. adding it helped
        if (table[i][capacity] != table[i - 1][capacity]) {
            indexAns = i - 1;
            answer.push(indexAns);
            capacity -= weights[indexAns];
            //       alert("We've just pushed item: "+i);
        }
    }
    //   alert("Answer: items at indices "+answer);
    //Take the right indices and format it:
    var pickedItems = [];
    var pickedWeights = [];
    var pickedValues = [];
    for (let i = 0; i < answer.length; i++) {
        let j = answer[i];
        pickedItems.push(items[j]);
        pickedValues.push(values[j]);
        pickedWeights.push(weights[j]);
        /* Uncomment the below for the answer!!!! 
        alert("We picked item: "+items[j]+":{"+values[j]+","+weights[j]+"}");
   */
    }
    var totalWeight = 0;
    var totalValue = 0;
    for (let i = 0; i < pickedItems.length; i++) {
        totalWeight += Number(pickedWeights[i]);
        totalValue += Number(pickedValues[i]);
    }
    //  alert("Final Picks: "+pickedItems +", taking up weight= "+totalWeight+"/"+total+", and with a total value of: "+totalValue);
    alert("Do items: " + pickedItems + ". It'll take up " + totalWeight + " out of your " + total + " minutes, but it'll maximize your value at " + totalValue);
}
function runKnap() {
    var capacity = document.getElementById('capacity').value;
    if (capacity <= 0) {
        alert("Enter a positive number of time that you have!");
        return;
    }
    var items = [
        item1 = document.getElementById('act1').value,
        item2 = document.getElementById('act2').value,
        item3 = document.getElementById('act3').value,
        item4 = document.getElementById('act4').value,
        item5 = document.getElementById('act5').value
    ]
    var values = [
        value1 = document.getElementById('value1').value,
        value2 = document.getElementById('value2').value,
        value3 = document.getElementById('value3').value,
        value4 = document.getElementById('value4').value,
        value5 = document.getElementById('value5').value,

    ]
    var weights = [
        weight1 = document.getElementById('weight1').value,
        weight2 = document.getElementById('weight2').value,
        weight3 = document.getElementById('weight3').value,
        weight4 = document.getElementById('weight4').value,
        weight5 = document.getElementById('weight5').value
    ]
    //    alert("capacity="+capacity);
    //   for(let i = 0; i<items.length;i++){
    //       alert("Item "+i+": {"+items[i]+", "+values[i]+", "+weights[i]+"}");
    //    }

    //Do the hard work
    var table = knapSackTable(capacity, weights, values);
    //Print out the table
    /* for(let i = 0; i<=items.length; i++){
           for(let j =0; j<=capacity;j++){
               alert("row["+i+"]["+j+"] "+" = "+table[i][j]);
           }
          }
          alert("capacity="+capacity);
   */
    knapSackAnalysis(table, items, capacity, values, weights);

}
//Gives us the table to send to analysis
function knapSackTable(capacity, weights, values) {
    if (capacity == null || weights == null || values == null) {
        alert("Invalid!");
        return;
    }
    const size = values.length;

    //6 rows, 0->5 (row 1 = item 1)
    var table = new Array(size + 1);
    //capacity # of cols+1, 0->capacity (includes capacity as an option)
    for (let i = 0; i < size + 1; i++) {
        table[i] = new Array(capacity + 1);
    }
    //set all to 0 in row 0 and col 0
    for (let i = 0; i <= size; i++) {
        table[i][0] = 0;
    }
    for (let i = 0; i <= capacity; i++) {
        table[0][i] = 0;
    }
    for (let i = 1; i <= size; i++) {
        //get the val,weight of items (item 1 = index 0)
        var value = values[i - 1], weight = weights[i - 1];
        for (let j = 1; j <= capacity; j++) {
            //if we didnt pick the item, get without it same capacity
            table[i][j] = table[i - 1][j];
            //if we pick the item since it fits, AND its better, add it
            if (j >= weight && Number(table[i - 1][j - weight]) + Number(value) > table[i - 1][j]) {
                //alert("Changing b/c: "+Number(table[i-1][j-weight])+Number(value)+">"+table[i-1][j]);
                table[i][j] = Number(table[i - 1][j - weight]) + Number(value);
            }
            //         alert("table["+i+"]["+j+"] = "+table[i][j]);
        }
    }
    return table;
}
