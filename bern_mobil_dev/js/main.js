var sel, metroStationData, bcanvas;
var translator = {};
var traverse = [];
var fromto = [];
var questions = {};

var loadXMLDoc = function(ud, cfunc, val) {
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = cfunc;

  if (typeof val === 'undefined' || val == false) {
    xmlhttp.open("GET", ud);
    xmlhttp.send();
  } else {
    xmlhttp.open("POST", ud, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(val);
  }
};

var center_latlon = [46.948110, 7.440307]; //bernbahnhof

var latlonToDistFromCenterPx = function(lat, lon) {
  y = (lat - center_latlon[0]) * 600;
  x = 50 + (lon - center_latlon[1]) * 405;
  return [x, y];
};

var checkData = function() {

  loadXMLDoc('http://david.abotsi.com:8098/', function() {

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
  if (is_bordercanvas) {
    drawBorderCanvas(false);
  }

  code_display.innerHTML = '';

  loadXMLDoc('http://david.abotsi.com:8098/', function() {

    if (xmlhttp.readyState == 4) {

      if (xmlhttp.status == 200) {

        var answer = JSON.parse(xmlhttp.responseText);

        questions.origin = answer.text[2];
        questions.destination = answer.text[3];
        questions.changepoint = answer.text[4];
        questions.thanks = answer.text[5];

        code_display.innerHTML += '<p>' + answer.text[0] + '</p>';
        code_display.innerHTML += '<p>' + answer.text[1] + '</p>';
        answer.landmarks.sort();
        for (var i = 0; i < answer.landmarks.length; i++) {
          var pair = answer.landmarks[i].split(' - ');
          translator[pair[0]] = pair[1];
          code_display.innerHTML += '<p>' + answer.landmarks[i] + '</p>';
        }
        code_display.innerHTML += '<p>' + questions.origin + '</p>';

        switchListener(answer.kind);

      } else {
        console.log('fillReport shit happens');
      }
    }
  }, JSON.stringify({
    "todo": "init"
  }));
};

var fillReport = function(kind) {

  loadXMLDoc('http://david.abotsi.com:8098/', function() {

    if (xmlhttp.readyState == 4) {

      if (xmlhttp.status == 200) {

        var answer = JSON.parse(xmlhttp.responseText);

        traverse = [];

        code_display.innerHTML += '<p>' + answer.text + '</p>';
        var p_ih = '<p class="hoverable">';
        for (var i = 0; i < answer.nodes.length; i++) {
          p_ih += '<span class="hoverable" onmouseover="showStation(this)">' + answer.nodes[i] + '</span> ';
          //   + ((i < answer.nodes.length - 1) ? ' - ' : '')
          if (metroStationData[answer.nodes[i]].latlon) {
            var point = [];
            point.push(metroStationData[answer.nodes[i]].latlon[0]);
            point.push(metroStationData[answer.nodes[i]].latlon[1]);
            point.push(answer.nodes[i]);
            traverse.push(point);
          }
        }
        p_ih += '</p>';
        code_display.innerHTML += p_ih;
        code_display.innerHTML += '<p>Drag over above station names to see the places of your traverse. Type m to see them on the map.</p>';
        code_display.innerHTML += '<p>' + questions.thanks + '</p>';

        console.log(traverse);
        info.innerHTML = 'type m to see your way on the map';
        fromto = [];
        switchListener(answer.kind);

      } else {
        console.log('fillReport shit happens');
      }
    }
  }, kind);
};

var showStation = function(stationImage) {
  var st = image_display.children;
  for (var i = 0; i < st.length - 1; i++) {
    st[i].style.display = 'none';
  }
  st = stationImage.parentNode.children;
  for (var i = 0; i < st.length; i++) {
    st[i].classList.remove('hidedis');
  }
  stationImage.classList.add('hidedis');
  if (stationImage.previousElementSibling) {
    stationImage.previousElementSibling.classList.add('hidedis');
  }

  var image = metroStationData[stationImage.innerHTML].imageName;
  if (image) {
    document.getElementById('img_' + image).style.display = bcanvas.style.display = 'block';
    drawBorderCanvas(stationImage);
  } else {
    drawBorderCanvas(false);
  }
};

var queryFromCli = function(kind, letter) {
  if (fromto.length < 1) {
    return false;
  } else if (fromto.length == 1) {
    code_display.lastChild.innerHTML += ' ' + letter;
    code_display.innerHTML += '<p>ooh, from: ' + translator[letter] + ' ...</p>';
    code_display.innerHTML += '<p>' + questions.destination + '</p>';
    scrollDown();
  } else if (fromto.length == 2) {
    if (fromto[0] != fromto[1]) {
      code_display.lastChild.innerHTML += ' ' + letter;
      code_display.innerHTML += '<p>mhmm to: ' + translator[letter] + ' ...</p>';
      var query = JSON.stringify({
        todo: 'route',
        origin: fromto[0],
        destination: fromto[1]
      });
      console.log(query);
      fillReport(query);
    } else {
      fromto.splice(1, 1);
      code_display.innerHTML += '<p>Uuups origin and destination are equal, try again with another destination!</p>';
      code_display.innerHTML += '<p>' + questions.destination + '</p>';
      scrollDown();
    }
  } else {
    fromto = [];
    console.log('fromto overflow ... reseted');
  }
};

var switchListener = function(kind) {
  if (kind == 'init') {
    globalKeyListener = function(e) {
      var letter = false;
      if (e.keyCode >= 65 && e.keyCode <= 65 + Object.keys(translator).length - 1) {
        letter = String.fromCharCode(e.keyCode).toLowerCase();
        fromto.push(translator[letter]);
        queryFromCli('origin', letter);
      } else {
        console.log('wrong key');
        code_display.innerHTML += '<p>Uuups wrong key, try again!</p>';
      }
    };
  } else if (kind == 'route' || kind == 'noroute') {
    globalKeyListener = function(e) {
      console.log(e.keyCode, 'is key');
      if (e.keyCode == 67) {
        showCli();
        fillOption();
      } else if (e.keyCode == 77) {
        showMap();
      } else if (e.keyCode == 65) {
        if (runAutoHover) {
          autoHover(false);
        } else {
          autoHover(points_display.children, 0, 1);
        }
      }
      /*
      if (appMode == 'cli') {
      }
      */
    };
  }
  scrollDown();
};

var scrollDown = function() {
  if (code_display.children.length > 0) {
    code_display.lastChild.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    });
  }
};

var showCli = function() {
  autoHover(false);
  info.innerHTML = '';
  map_display.classList.remove('active');
  code_display.classList.add('active');
  appMode = 'cli';
  image_display.style.display = 'flex';
};

var drawSnake = function() {

  if (document.getElementById('scanvas')) {
    points_display.removeChild(document.getElementById('scanvas'));
  }

  var path_dims = {
    left: window.innerWidth,
    top: window.innerHeight,
    right: 0,
    bottom: 0
  };

  for (var i = 0; i < points_display.children.length; i++) {
    var point_dims = points_display.children[i].getBoundingClientRect();
    if (point_dims.left < path_dims.left) {
      path_dims.left = point_dims.left;
    }
    if (point_dims.top < path_dims.top) {
      path_dims.top = point_dims.top;
    }
    if (point_dims.right > path_dims.right) {
      path_dims.right = point_dims.right;
    }
    if (point_dims.bottom > path_dims.bottom) {
      path_dims.bottom = point_dims.bottom;
    }
  }

  var points_arr = [];
  var point_offset = window.innerWidth / 400;

  for (var i = 0; i < points_display.children.length; i++) {
    var point_dims = points_display.children[i].getBoundingClientRect();
    points_arr.push(point_dims.left - path_dims.left + point_offset + 100);
    points_arr.push(point_dims.top - path_dims.top + point_offset + 100);
  }

  points_display.innerHTML += '<canvas id="scanvas" width="' + (path_dims.right - path_dims.left + 200) + '" height="' + (path_dims.bottom - path_dims.top + 200) + '" style="left: ' + (path_dims.left - 100) + 'px; top: ' + (path_dims.top - 100) + 'px;"></canvas>';

  spinle.drawSpline(points_arr);

};

//		--- new spinle ---
var spinle = {
  getControlPoints: function(x0, y0, x1, y1, x2, y2, t) {
    //  x0,y0,x1,y1 are the coordinates of the end (knot) pts of this segment
    //  x2,y2 is the next knot -- not connected here but needed to calculate p2
    //  p1 is the control point calculated here, from x1 back toward x0.
    //  p2 is the next control point, calculated here and returned to become the
    //  next segment's p1.
    //  t is the 'tension' which controls how far the control points spread.

    //  Scaling factors: distances from this knot to the previous and following knots.
    var d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
    var d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    var fa = t * d01 / (d01 + d12);
    var fb = t - fa;

    var p1x = x1 + fa * (x0 - x2);
    var p1y = y1 + fa * (y0 - y2);

    var p2x = x1 - fb * (x0 - x2);
    var p2y = y1 - fb * (y0 - y2);

    return [p1x, p1y, p2x, p2y];
  },
  drawSpline: function(pts) {
    //var t = 0.48;
    var t = 0.48;

    var cp = []; // array of control points, as x0,y0,x1,y1,...
    var n = pts.length;

    var scanvas = document.getElementById('scanvas');

    var ctx = scanvas.getContext("2d");
    ctx.clearRect(0, 0, scanvas.width, scanvas.height);

    ctx.lineWidth = window.innerWidth / 150;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#fff';

    // Draw an open curve, not connected at the ends
    for (var i = 0; i < n - 4; i += 2) {
      cp = cp.concat(this.getControlPoints(pts[i], pts[i + 1], pts[i + 2], pts[i + 3], pts[i + 4], pts[i + 5], t));
    }
    for (var i = 2; i < pts.length - 5; i += 2) {
      ctx.beginPath();
      ctx.moveTo(pts[i], pts[i + 1]);
      ctx.bezierCurveTo(cp[2 * i - 2], cp[2 * i - 1], cp[2 * i], cp[2 * i + 1], pts[i + 2], pts[i + 3]);
      ctx.stroke();
      ctx.closePath();
    }
    //  For open curves the first and last arcs are simple quadratics.
    ctx.beginPath();
    ctx.moveTo(pts[0], pts[1]);
    ctx.quadraticCurveTo(cp[0], cp[1], pts[2], pts[3]);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(pts[n - 2], pts[n - 1]);
    ctx.quadraticCurveTo(cp[2 * n - 10], cp[2 * n - 9], pts[n - 4], pts[n - 3]);
    ctx.stroke();
    ctx.closePath();
  }
};

var showMap = function() {
  info.innerHTML = 'drag over labels. type c for new console or a to start / stop auto label.';
  code_display.classList.remove('active');
  map_display.classList.add('active');
  appMode = 'map';
  image_display.style.display = 'none';
  points_display.innerHTML = '';
  for (var i = 0; i < traverse.length; i++) {
    var pos = latlonToDistFromCenterPx(traverse[i][0], traverse[i][1]);
    points_display.innerHTML += '<div class="waypoint" style="left: ' + pos[0] + 'vw; top: calc(50vh - ' + pos[1] + 'vw);"><label>' + traverse[i][2] + '</label></div>';
  }
  drawSnake();
};

var hoverId, runAutoHover = false;

var autoHover = function(children_arr, ix, dir) {
  clearTimeout(hoverId);
  if (!children_arr) {
    if (points_display.children.length > 0) {
      for (var i = 0; i < points_display.children.length; i++) {
        points_display.children[i].classList.remove('autohover');
      }
    }
    runAutoHover = false;
    return false;
  }
  if (document.getElementById('scanvas')) {
    runAutoHover = true;
    children_arr[ix].classList.add('autohover');
    if (ix > children_arr.length - 2) {
      ix--;
      dir = -1;
      ix = ix + dir;
      autoHover(children_arr, ix, dir);
      return;
    }
    if (ix < 1) {
      dir = 1;
    }
    hoverId = setTimeout(function() {
      children_arr[ix].classList.remove('autohover');
      ix = ix + dir;
      autoHover(children_arr, ix, dir);
    }, 2200);
  }
};

var appMode = false;

var globalKeyListener = function(e) {
  if (e.keyCode == 67) {
    showCli();
  } else if (e.keyCode == 77) {
    showMap();
  }
  if (appMode == 'cli') {
    fillOption();
  }
};

var runOnScroll = function() {
  if (is_bordercanvas) {
    drawBorderCanvas(is_bordercanvas);
  }
  if (document.getElementById('scanvas')) {
    drawSnake();
  }
};

var is_bordercanvas = false;
var drawBorderCanvas = function(el) {
  is_bordercanvas = el;
  bcanvas.width = window.innerWidth;
  bcanvas.height = window.innerHeight;
  var ctx = bcanvas.getContext("2d");
  ctx.clearRect(0, 0, bcanvas.width, bcanvas.height);
  ctx.fillStyle = '#0e1625';
  ctx.fillRect(0, 0, bcanvas.width, bcanvas.height);
  if (el) {
    var coords = el.getBoundingClientRect();
    var half_img_edge_length = 200;
    var pseudo_end = (el == el.parentNode.lastElementChild) ? 0 : 32;
    ctx.lineWidth = 2;
    ctx.fillStyle = '#000';
    ctx.strokeStyle = '#0C0';
    ctx.globalCompositeOperation = "xor";
    ctx.beginPath();
    ctx.arc(bcanvas.width / 2, bcanvas.height / 2, half_img_edge_length, 0, 2 * Math.PI);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.arc(bcanvas.width / 2, bcanvas.height / 2, half_img_edge_length, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.save();
    ctx.globalCompositeOperation = "source-atop";
    ctx.beginPath();
    var snakestart = [bcanvas.width / 2, bcanvas.height / 2 + half_img_edge_length];
    ctx.moveTo(snakestart[0], snakestart[1]);
    var snakeend = [coords.x + coords.width / 2, coords.y - 4];
    var h = (snakestart[1] + snakeend[1]) / 2;
    ctx.bezierCurveTo(snakestart[0], h, snakeend[0] - pseudo_end / 2, h, snakeend[0] - pseudo_end / 2, snakeend[1]);
    ctx.lineTo(snakeend[0] - coords.width / 2, snakeend[1]);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(snakeend[0] - coords.width / 2, snakeend[1] + (coords.height + 8) / 2, (coords.height + 8) / 2, 0.5 * Math.PI, 1.5 * Math.PI);
    ctx.moveTo(snakeend[0] - coords.width / 2, snakeend[1] + coords.height + 8);
    ctx.lineTo(snakeend[0] + coords.width / 2 - pseudo_end, snakeend[1] + coords.height + 8);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(snakeend[0] + coords.width / 2 - pseudo_end, snakeend[1] + (coords.height + 8) / 2, (coords.height + 8) / 2, 1.5 * Math.PI, 0.5 * Math.PI);
    ctx.moveTo(snakeend[0] + coords.width / 2 - pseudo_end, snakeend[1]);
    ctx.lineTo(snakeend[0] - pseudo_end / 2, snakeend[1]);
    ctx.stroke();
  }
};

document.addEventListener('DOMContentLoaded', function() {
  loadXMLDoc('json/be_metro_imageurls.json', function() {

    if (xmlhttp.readyState == 4) {

      if (xmlhttp.status == 200) {

        metroStationData = JSON.parse(xmlhttp.responseText);

        console.log('imageurls is: ', metroStationData);

        var keysArr = Object.keys(metroStationData);

        for (var i = 0; i < keysArr.length; i++) {
          if (metroStationData[keysArr[i]].imageName) {
            image_display.innerHTML += '<img id="img_' + metroStationData[keysArr[i]].imageName + '" src="images/metro_stations/' + metroStationData[keysArr[i]].imageName + '.jpg">';
          }
        }

        image_display.innerHTML += '<canvas id="bordercanvas">precanvas</canvas>';
        bcanvas = document.getElementById('bordercanvas');

      } else {
        console.log('imageurls happens');
      }
    }
  });
  map_display = document.getElementById('map_display');
  points_display = document.getElementById('points_display');
  image_display = document.getElementById('image_display');
  code_display = document.getElementById('code_display');
  info = document.getElementById('info');
  info.innerHTML = 'type c for console or m for map';
  window.addEventListener('scroll', runOnScroll);
  window.addEventListener('resize', runOnScroll);
  window.addEventListener('keyup', function(e) {
    console.log(e.keyCode);
    console.log(String.fromCharCode(e.keyCode));
    globalKeyListener(e);
  }, false);
}, false);