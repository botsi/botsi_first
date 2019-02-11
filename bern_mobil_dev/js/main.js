var sel;
var loadXMLDoc = function(ud, cfunc, val) {
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = cfunc;

  if (typeof val === 'undefined' || val == false) {
    xmlhttp.open("GET", ud);
    xmlhttp.send();
  } else {
    console.log('isend: ', val);
    xmlhttp.open("POST", ud, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(val);
  }
};


var draw = function(array) {
  console.log(array);
  for (var i = 0; i < array.length; i++) {
    var square = document.createElement('div');
    square.style.width = array[i].width[0] + 'px';
    square.style.height = array[i].width[0] + 'px';
    square.style.background = '#ccc';
    document.getElementById('display').appendChild(square);
  }
};


var show = function(array) {

  var table = '';

  table += '<table>';

  for (var i = 0; i < array.length; i++) {
    array[i]
    table += '<tr>';
    for (var j = 0; j < array[i].length; j++) {
      table += '<td>';
      table += array[i][j];
      table += '</td>';
    }
    table += '</tr>';

  }

  table += '</table>';

  document.getElementById('display').innerHTML = 'there are ' + array.length + ' users';
  document.getElementById('preview').innerHTML = table;
};


var checkData = function() {

  loadXMLDoc('http://david.abotsi.com:8099/', function() {

    if (xmlhttp.readyState == 4) {

      if (xmlhttp.status == 200) {

        var filetime = JSON.parse(xmlhttp.responseText).filetime;

        console.log(filetime);

      } else {
        console.log('fillReport shit happens');
      }
    }
  }, JSON.stringify({
    "todo": "check"
  }));
};

var fillOption = function() {

  loadXMLDoc('http://david.abotsi.com:8099/', function() {

    if (xmlhttp.readyState == 4) {

      if (xmlhttp.status == 200) {

        //console.log('xmlhttp.responseText: ', xmlhttp.responseText);

        var answer = JSON.parse(xmlhttp.responseText);
        var data = answer.content;

        for (var i = 0; i < data.length; i++) {
          sel.innerHTML += '<option' + ((i == 0) ? ' selected' : '') + ' value="' + i + '">' + data[i][0] + ' ' + data[i][1] + '</option>';
        }

        console.log(answer.filetime);

      } else {
        console.log('fillReport shit happens');
      }
    }
  }, JSON.stringify({
    "todo": "init"
  }));
};

var fillReport = function(kind) {

  loadXMLDoc('http://david.abotsi.com:8099/', function() {

    if (xmlhttp.readyState == 4) {

      if (xmlhttp.status == 200) {

        console.log('xmlhttp.responseText: ', xmlhttp.responseText);

        var answer = JSON.parse(xmlhttp.responseText).content;

        draw(answer);

      } else {
        console.log('fillReport shit happens');
      }
    }
  }, kind);
};

var queryFromButton = function(id, length, count) {

  var part = id.split('_');

  var query = JSON.stringify({
    todo: "read",
    kind: part[1],
    mode: part[2],
    length: length,
    count: count,
    uid: sel.value
  });

  fillReport(query);
};

document.addEventListener('DOMContentLoaded', function() {
  info = document.getElementById('info');
  info.innerHTML = 'type c for console or m for map';
  window.addEventListener('keyup', function(e) {
    if (e.keyCode == 67) {
      showCli();
    } else if (e.keyCode == 77) {
      //showMap();
    }
  }, false);
  /*
  sel = document.getElementById('user');
  fillOption();
  */
}, false);