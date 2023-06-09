class View {
    static fiveLeadsTable = document.querySelector('tbody')

    constructor() {
      
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
             <td>${element.flavor}</td>
             <td>${element.date}</td>
             <td>${element.intDay}</td>
             <td>${element.device}</td>
             `
            View.fiveLeadsTable.appendChild(row);
        });
    }

    render() {

    }
}
