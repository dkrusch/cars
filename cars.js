const API = {
    getJournalEntries: function() {
        return fetch("http://localhost:3000/cars")
        .then(response => response.json())
        .then(parsedResponse => parsedResponse);
    }
}

API.getJournalEntries().then(cars => 
{
    let profits = cars.map(car => car.gross_profit)
    let total = profits.reduce((a, b) => a + b, 0)
    let dates = cars.map(car => car.purchase_date)
    let agents = cars.map(car => (`${car.sales_agent.first_name} ${car.sales_agent.last_name}`))
    let carMakes = cars.map(car => car.vehicle.make)
    let banks = cars.map(car => car.credit.credit_provider)
    console.log(carMakes)
    let agentProfits = cars.map(car =>
    {
        return {
            agent: `${car.sales_agent.first_name} ${car.sales_agent.last_name}`,
            profit: car.gross_profit
        }
    }).reduce((newObj, object) => 
    {
        if (newObj[object.agent])
        {
            newObj[object.agent] += object.profit
        }
        else
        {
            newObj[object.agent] = object.profit
        }
        // let money = newObj[object.agent].toFixed(2)
        // console.log(money)
        // newObj[object.agent] = money
        return newObj
    }, {})

    console.log(agentProfits)
    console.log(max(banks))
    let apArray = Object.entries(agentProfits)
    console.log(apArray.sort((a, b) => b[1] - a[1]))
    // agentProfits.sort((a, b) => 
    // {
    //     console.log(a, b)
    //     return a - b
    // }, 0)
    console.log("most profitable", apArray[0][0])
    console.log(max(carMakes))
    let months = dates.map(date => date.slice(5,7))
    console.log(max(agents))
    console.log(max(months))
    total = total.toFixed(2)
})

// function addProfits(array, arrayToAdd)
// {
//     let holder = []
//     for (let i = 0; i < array.length; i++)
//     {
//         let object = {}
//         console.log(i)
//         object.agent = array[i];
//         object.profit = arrayToAdd[i]
//         console.log(object)
//         holder.push(object)
//     }
//     console.log(holder)
//     return holder
// }

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

// usage example:
var a = ['a', 1, 'a', 2, '1'];
var unique = a.filter( onlyUnique ); // returns ['a', 1, 2, '1']

function max(array)
{
    if(array.length == 0)
        return null;
    let object = {};
    let maxElement = array[0], maxCount = 1;
    for(let i = 0; i < array.length; i++)
    {
        let element = array[i];
        if(object[element] == null)
        {
            object[element] = 1;
        }
        else
        {
            object[element]++;  
        }
        if(object[element] > maxCount)
        {
            maxElement = element;
            maxCount = object[element];
        }
    }
    console.log(object)
    return maxElement;
}