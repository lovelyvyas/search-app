function search() {
  var input = document.getElementById("search").value;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "search.php?keyword=" + input, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      displayResults(xhr.responseText, input);
    }
  };
  xhr.send();
}

function displayResults(response, keyword) {
  var resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";
  var data = JSON.parse(response);
  var table = document.createElement("table");
  var headerRow = table.insertRow(0);
  var idHeader = headerRow.insertCell(0);
  var dataHeader = headerRow.insertCell(1);
  idHeader.innerHTML = "Article No";
  dataHeader.innerHTML = "Content";
  for (var i = 0; i < data.length; i++) {
    var row = table.insertRow(i+1);
    var idCell = row.insertCell(0);
    var dataCell = row.insertCell(1);
    idCell.innerHTML = data[i].id;
    var dataText = data[i].data;
    if (keyword !== "") {
      var regex = new RegExp(keyword, 'gi');
      if(!dataText) return;
      dataText = dataText.replace(regex, '<mark>$&</mark>');
    }
    dataCell.innerHTML = dataText;
  }
  resultsDiv.appendChild(table);
}