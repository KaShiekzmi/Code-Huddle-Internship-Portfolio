const orders = [
    { id: 1, customer: 'Alice', items: ['laptop', 'mouse'], total: 1200, status: 'completed' },
    { id: 2, customer: 'Bob', items: ['keyboard', 'monitor'], total: 800, status: 'pending' },
    { id: 3, customer: 'Charlie', items: ['phone'], total: 600, status: 'completed' },
    { id: 4, customer: 'Alice', items: ['tablet', 'case'], total: 400, status: 'cancelled' },
    { id: 5, customer: 'Bob', items: ['headphones'], total: 150, status: 'completed' }
];

//filter and calculate
const completedOrders = orders.filter((order) => {
    return order.status === "completed"
})

console.log('Orders that are completed: ', completedOrders)

let totalRevenue = 0;
for (let order of completedOrders) {
    totalRevenue += order.total;
}

console.log('Total revenue of completed Orders: ', totalRevenue)

const customersSpendMore = orders.filter((order) => {
    return order.total > 500
}).map(order => order.customer)

console.log('Customers who spend more than 500 dollars: ', customersSpendMore)

//Transform Data
const customerSpending = {};
orders.forEach((order) => {
    if (!customerSpending[order.customer]) {
        customerSpending[order.customer] = 0;
    }
    customerSpending[order.customer] += order.total;
})

console.log('Customer total spending summary: ', customerSpending)

//Unique Items
const uniqueItems = orders.flatMap(o => o.items)

console.log('Unique Items: ', uniqueItems)

//Report on avg orders by status
var statusTotals = {};
var statusCounts = {};
for (var i = 0; i < orders.length; i++) {
    var s = orders[i].status;
    if (!statusTotals[s]) {
        statusTotals[s] = 0;
        statusCounts[s] = 0;
    }
    statusTotals[s] += orders[i].total;
    statusCounts[s]++;
}
var averages = {};
for (var k in statusTotals) {
    averages[k] = statusTotals[k] / statusCounts[k];
}

console.log('Report showing average order value by status: ', averages)

//function to get customer report
function getCustomerInsights(name) {
    var count = 0;
    var spent = 0;
    var most = null;
    var fav = [];

    orders.forEach(order => {
        if (order.customer === name) {
            count++;
            spent += order.total;
            if (most === null || order.total > most.total) {
                most = order;
            }
            order.items.forEach(item => {
                if (!fav.includes(item)) {
                    fav.push(item);
                }
            });
        }
    });


    return {
        totalOrders: count,
        totalSpent: spent,
        mostExpensiveOrder: most,
        favoriteItems: fav
    };
}

console.log('Report on Customer Insight: ', getCustomerInsights('Alice'));