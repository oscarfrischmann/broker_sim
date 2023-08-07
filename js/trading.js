const user = [];
let userCash = Number(localStorage.getItem('cash'));
let stocksJSON = localStorage.getItem('stocks');
let stocksPARSE = JSON.parse(stocksJSON);

let showCash = document.getElementById('userCash');

showCash.innerText = `${userCash} USD`;
let select = document.getElementById('stocksSelect');

stocksPARSE.forEach( e => {
    let eachStock = document.createElement('option');
    eachStock.innerText = e.ticker;
    select.appendChild(eachStock);
});

let sellBtn = document.getElementById('sellBtn');
let buyBtn = document.getElementById('buyBtn');
let confirmBtn = document.getElementById('confirmOrder');
let orderType = document.getElementById('orderType');
let stockSelect = document.getElementById('stocksSelect');
let stockTickerTittle = document.getElementById('stokTicker')

sellBtn.addEventListener('click', ()=>{
    confirmBtn.style.backgroundColor = 'red';
    orderType.innerText = 'Sell Order';
});

buyBtn.addEventListener('click', ()=>{
    confirmBtn.style.backgroundColor = 'green';
});

stockSelect.addEventListener('change', ()=>{
    
    stockTickerTittle.innerText = `${stockSelect.value}`
})







function seeStockPrices() {
    console.log(`Acciones disponibles:`);
    stocks.forEach(element => console.log(`${element.ticker}: ${element.price} ${element.currency}`));
}
















// Highcharts.chart('container', {

//     title: {
//         text: 'U.S Solar Employment Growth',
//         align: 'left'
//     },

//     subtitle: {
//         text: 'By Job Category. Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>.',
//         align: 'left'
//     },

//     yAxis: {
//         title: {
//             text: 'Number of Employees'
//         }
//     },

//     xAxis: {
//         accessibility: {
//             rangeDescription: 'Range: 2010 to 2020'
//         }
//     },

//     legend: {
//         layout: 'vertical',
//         align: 'right',
//         verticalAlign: 'middle'
//     },

//     plotOptions: {
//         series: {
//             label: {
//                 connectorAllowed: false
//             },
//             pointStart: 2010
//         }, 
//     },

//     series: [{
//         name: 'Installation & Developers',
//         data: [43934, 48656, 65165, 81827, 112143, 142383,
//             171533, 165174, 155157, 161454, 154610]
//     }],

//     responsive: {
//         rules: [{
//             condition: {
//                 maxWidth: 800
//             },
//             chartOptions: {
//                 legend: {
//                     layout: 'horizontal',
//                     align: 'center',
//                     verticalAlign: 'bottom',
                    
//                 }
//             }
//         }]
//     }

// });

