const firebaseConfig = {
    apiKey: "AIzaSyAW6QVsi0avY8cPZfV7SHnMm947V4-kdqo",
    authDomain: "shopkeeper-isl.firebaseapp.com",
    databaseURL: "https://shopkeeper-isl.firebaseio.com",
    projectId: "shopkeeper-isl",
    storageBucket: "shopkeeper-isl.appspot.com",
    messagingSenderId: "915943658995",
    appId: "1:915943658995:web:5e8f36e48dc65aceb02e86",
    measurementId: "G-T0QEEM1BH2"
};
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var ref = database.ref('Users/');

ref.on("value", function (snapshot) {
    document.getElementById('table-order').innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
        fetchData(childSnapshot);
    });
    document.getElementById('total-users').innerHTML = snapshot.numChildren();
});

function fetchData(childSnapshot) {
    var table = document.getElementById('table-order');
    // table.innerHTML = "";
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    row.setAttribute('onclick', 'showDetail(' + rowCount + ')');
    var cell0 = row.insertCell(0);
    cell0.innerHTML = rowCount + 1;
    var cell1 = row.insertCell(1);
    cell1.innerHTML = childSnapshot.key;
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    var cell5 = row.insertCell(4);
    cell2.innerHTML = childSnapshot.child('17').child('Total').child('Outer').val();
    cell3.innerHTML = childSnapshot.child('17').child('Total').child('Pack').val();
    cell4.innerHTML = childSnapshot.child('19').child('date').val();
    cell5.innerHTML = childSnapshot.child('18').child('contactLess').val();
    if(childSnapshot.child('18').child('contactLess').val()){
        cell5.style.color = 'green'
    }else{
        cell5.style.color = 'red'
    }
}

function showDetail(rowID) {
    var table = document.getElementById('table-order');
    var r = table.rows[rowID];
    var userID = r.cells[1];
    document.getElementById('user-id').innerHTML = userID.innerHTML;
    var ref = database.ref('Users/' + userID.innerHTML + '/');
    ref.on("value", function (snapshot) {
        var tableDetail = document.getElementById('table-detail');
        tableDetail.innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childSnapshot.forEach(function (grandChild) {
                if (grandChild.key === 'contactLess') {
                    var rowCount = tableDetail.rows.length;
                    var row = tableDetail.insertRow(rowCount);
                    row.insertCell(0).innerHTML = grandChild.key;
                    row.insertCell(1).innerHTML = grandChild.val();
                    row.insertCell(2).innerHTML = "";
                    row.style.backgroundColor = '#f2eeed';
                    row.cells[0].style.fontWeight = 'bold'
                    row.cells[1].style.fontWeight = 'bold'
                    if (grandChild.val()) {
                        row.cells[1].style.color = 'green'
                    } else {
                        row.cells[1].style.color = 'red'
                    }
                } else if (grandChild.key === 'date') {
                    var rowCount = tableDetail.rows.length;
                    var row = tableDetail.insertRow(rowCount);
                    row.insertCell(0).innerHTML = grandChild.key;
                    row.insertCell(1).innerHTML = grandChild.val();
                    row.style.backgroundColor = '#f2eeed';
                    row.cells[0].style.fontWeight = 'bold'
                    row.cells[1].style.fontWeight = 'bold'
                    row.insertCell(2).innerHTML = "";
                } else if (grandChild.key === 'Total') {
                    var rowCount = tableDetail.rows.length;
                    var row = tableDetail.insertRow(rowCount);
                    row.insertCell(0).innerHTML = grandChild.key;
                    row.insertCell(1).innerHTML = grandChild.child('Outer').val();
                    row.insertCell(2).innerHTML = grandChild.child('Pack').val();
                    row.style.backgroundColor = '#f2eeed';
                    row.cells[0].style.fontWeight = 'bold'
                    row.cells[1].style.fontWeight = 'bold'
                    row.cells[2].style.fontWeight = 'bold'
                } else {
                    var rowCount = tableDetail.rows.length;
                    var row = tableDetail.insertRow(rowCount);
                    row.insertCell(0).innerHTML = grandChild.key;
                    row.insertCell(1).innerHTML = grandChild.child('Outer').val();
                    row.insertCell(2).innerHTML = grandChild.child('Pack').val();
                }
            });
        });
        tableDetail.setAttribute('class', 'table-stripped');
    });

}