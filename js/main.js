//========== variables
freader = new FileReader();
puzzleh = $("#puzzle-pre").height();
puzzlew = $("#puzzle-pre").width();

//======== win time
$(document).ready(function() {
  if (!localStorage.wintime) localStorage.wintime = 0;
  $("#wintime").text("You Win " + localStorage.wintime + " Time");
});

//========== Load The Image
$("#inpfile").change(function() {
  freader.readAsDataURL(this.files[0]);
  freader.onloadend = function() {
    sessionStorage.imgsrc = freader.result;
    $("#puzzle-pre")
      .html("")
      .html(
        '<img src="' + sessionStorage.imgsrc + '" height="100%" width="100%">'
      );
  };
});

//=========== StartGame
$("#start").click(function() {
  //variables
  h = puzzleh / 3;
  w = puzzlew / 3;
  xpos = 0;
  ypos = 0;

  //creat puzzle pieces
  $("#puzzle-cont").html("");
  for (i = 0; i < 9; i++) {
    if (i === 3 || i === 6) {
      xpos = 0;
      ypos -= h;
    }
    item = $(document.createElement("div"));
    $("#puzzle-cont").append(item);
    item
      .css({
        height: h,
        width: w,
        "background-image": "url(" + sessionStorage.imgsrc + ")",
        "background-size": puzzlew + "px" + " " + puzzleh + "px",
        "background-position": xpos + "px" + " " + ypos + "px"
      })
      .attr("class", "puzzle-piece")
      .attr("id", "puzzle-p")
      .attr("value", i);
    xpos -= w;
  }

  // container rotate
  $("#main").css("transform", "rotateY(180deg)");
  $("#puzzle-pre").css("z-index", "1");
  $("#puzzle-cont").css("z-index", "2");

  //make puzzle
  function random(min, max) {
    return Math.floor(Math.random() * max - min);
  }
  item = document.getElementsByClassName("puzzle-piece");
  ritem = [0];
  val = [0];
  for (i = 0; i < item.length; i++) {
    do {
      myrand = random(0, item.length);
    } while (ritem.indexOf(myrand) > -1);
    ritem[i] = myrand;
    $("#puzzle-cont").append(item[myrand]);
    val[i] = i.toString();
  }

  // check win game
  firstTime = true;
  function winAlert(obj) {
    if (obj && firstTime === true) {
      $("#win").text("Congratulation YOU WIN");
      localStorage.wintime = parseInt(localStorage.wintime) + 1;
      firstTime = false;
      $("#wintime").text("You Win " + localStorage.wintime + " Time");
    }
  }

  function compareArray(array1, array2) {
    chk = null;
    if (array1.length === array2.length) {
      for (i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
          chk = false;
        }
      }
      if (chk !== false) return true;
    }
    return false;
  }

  $(".puzzle-piece").hover(function() {
    i = 0;
    checkval = [0];
    item = document.getElementsByClassName("puzzle-piece");
    while (i < item.length) {
      if (item[i].getAttribute("value"))
        checkval[i] = item[i].getAttribute("value");
      i++;
    }
    winAlert(compareArray(checkval, val));
  });

  //sortable
  $("#puzzle-cont").sortable();
});
