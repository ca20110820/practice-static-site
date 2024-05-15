// https://www.coinlore.com/cryptocurrency-data-api

function openTab(event, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    document.getElementById(tabName).style.display = "block";
    
    if(tabName === "Tab3") {
        getCoinloreData();
    }
}


function coinSelectionChanged(event) {
    // Select the dropdown element
    var dropdown = document.getElementById('dropdown');
  
    // Add event listener for the 'change' event
    dropdown.addEventListener('change', function() {
      // Get the selected value
      var selectedValue = dropdown.value;
      
      // You can then use the selected value as needed
      console.log('Selected value:', selectedValue);

      showDataViews(selectedValue);
    });
}

document.addEventListener('DOMContentLoaded', coinSelectionChanged);

async function getCoinloreData(){
    const url = "https://api.coinlore.net/api/tickers/?start=0&limit=1000000";

    const requestConfig = {
    };

    await fetch(url, requestConfig)
    .then(async function(response){
        if (response.ok) {
            return await response.json()
        }
        
        throw await response.text()
    }).then(async function(data){
        let dataList = data.data;
        console.log(dataList);
        

        let dropdown = document.querySelector('#dropdown');
        dropdown.innerHTML = null;

        dataList.forEach(obj => {
            console.log(obj);
            // Create <option> and populate #dropdown
            let option = document.createElement('option');
            option.value = obj.id;
            option.innerHTML = `${obj.nameid}`;

            dropdown.appendChild(option);
        });
        
    }).catch(function(error){
        console.error(error);
    });
}

async function showDataViews(coinid) {
    let url = `https://api.coinlore.net/api/ticker/?id=${coinid}`;
    let response = await fetch(url);
    let data = await response.json();
    data = data[0];

    console.log(data);
    createTableFromJSON(data);
}

function createTableFromJSON(jsonData) {
    // Get the div where the table will be placed
    let tableDiv = document.getElementById('table-view');

    tableDiv.innerHTML = null;

    let table = document.createElement('table');

    // Loop through the JSON data and create rows for keys and values
    for (let key in jsonData) {
        let row = table.insertRow();
        let keyCell = row.insertCell(0);
        let valueCell = row.insertCell(1);

        keyCell.textContent = key;
        valueCell.textContent = jsonData[key];
    }

    tableDiv.appendChild(table);
}
