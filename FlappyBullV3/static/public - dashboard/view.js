class View {

    static donutItem = document.querySelector('#myDoughnutChart');
    static barItem = document.querySelector('#myBarChart');
    static fiveLeadsTable = document.querySelector('tbody')
    static otherData = document.querySelector('.other-data')

    constructor() {
        this.doughnutChart;
        this.barChart;
    }

    updateBarChart(dayCounts) {
        const labels = Object.keys(dayCounts)
        const days = Object.values(dayCounts)
        console.log(labels);
        console.log(days);

        this.barChart.data.datasets[0].data = days
        this.barChart.data.labels = labels
        this.barChart.update()
     }
 
    getBarChart() {
        const config = {
            type: 'bar',
            data: {
                labels: ['Thursday', 'Friday', 'Saturday', 'Sunday'],
                datasets: [{
                    label: 'Interactions By Day',
                    data: [0, 0, 0, 0],
                    borderWidth: 4,
                    backgroundColor: ['rgba(238, 28, 204, 0.8)', 'rgba(255, 211, 0, 0.8)', 'rgba(29, 25, 172, 0.8)', 'rgba(226, 27, 77, 0.8)'],
                    borderColor : ['rgba(238, 28, 204, 1)', 'rgba(255, 211, 0, 1)', 'rgba(29, 25, 172, 1)', 'rgba(226, 27, 77, 1)']
                }]
            },
            options: {
                scales: {
                    y: {
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.5)'
                        },
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.5)',
                            lineWidth: 1
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.5)',
                            lineWidth: 1
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.5)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltips: {
                        enabled: true
                    },
                    title: {
                        display: true,
                        text: 'Total interactions by day',
                        font: {
                            color: 'rgba(255, 255, 255, 0.5)',
                            size: 18
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 20
                    }
                }
            }
        };

        this.barChart = new Chart(View.barItem, config);
    }

    getDonutChart() {
        const config = {
            type: 'doughnut',
            data: {
                labels: ['Watermelon', 'Blue Berry'],
                datasets: [{
                    label: 'RedBull popProduct',
                    data: [50, 10],
                    backgroundColor: ['rgba(204, 39, 41, 1)', 'rgba(19, 52, 134, 1)'],
                    hoverOffset: 2,
                    borderWidth: 0
                }]
            },
            options: {
                cutoutPercentage: 50,
                responsive: true,
                maintainAspectRatio: false
            }
        };

        this.doughnutChart = new Chart(View.donutItem, config);
    }

    updateTable(newData) {
        console.log(newData);
       View.fiveLeadsTable.innerHTML = '';
        newData.forEach(element => {
            let row = document.createElement('tr');
            row.innerHTML =
            `<td>${element.name}</td>
             <td>${element.email}</td>
             <td>${element.number}</td>
             <td>${element.date}</td>
             `
            View.fiveLeadsTable.appendChild(row);
        });
    }

    updateMupiInt(todasLasInts) {
        console.log(todasLasInts);
        View.otherData.innerHTML = ''
        let p = document.createElement('p')
       p.innerHTML = `
       <p> ${todasLasInts} </p>       
       `
       View.otherData.appendChild(p)
    }

    updateDoughnutChart(newDataset) {
        //console.log(this.doughnutChart);
        //console.log('Hey within Update doughnutChart');
        this.doughnutChart.data.datasets[0].data = newDataset;
        //this.doughnutChart.data.labels = ;
        this.doughnutChart.update();
    }


    render() {
        this.getDonutChart()
        this.getBarChart()
    }
}
