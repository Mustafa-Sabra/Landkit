$(function () {
  // start fixed nav
  $("[data-toggle='popover']").popover({
    html: true,
    content: `<div class="popover-div">
                   <h6>Standard License <span>$49.00</span></h6>
                   <ul class="popover-ul">
                      <li>Use for a single product</li>
                      <li>Non-paying users only</li>
                   </ul>
                   <span>Read the full <a href="#">Standard License</a></span>
                </div>
               <div class="popover-div">
                   <h6>Multisite License <span>$149.00</span></h6>
                   <ul class="popover-ul">
                      <li>Use for a single product</li>
                      <li>Non-paying users only</li>
                   </ul>
                   <span>Read the full <a href="#">Multisite License</a></span>
                </div>
                <div class="popover-div">
                   <h6>Extended License <span>$499.00</span></h6>
                   <ul class="popover-ul">
                      <li>Use for a single product</li>
                      <li>Paying users allowed</li>
                   </ul>
                   <span>Read the full <a href="#">Extended License</a></span>
                </div>`,
  });

  $(".themes i").click(function () {
    if (!$(this).hasClass("active")) {
      $(this).addClass("active");
      $(this).siblings().removeClass("active");
    }
  });

  $(".dropdown").hover(function () {
    if ($(window).width() >= 975) {
      $(".dropdown-toggle", this).trigger("click");
    }
  });

  $(".navbar .navbar-nav .dropdown .account .dropdown-item ul li").on(
    "click",
    function () {
      if ($(window).width() < 975) {
        $(`${this} .nested-dropdown`).css({ display: "block" });
        $(`${this} ~ li .nested-dropdown`).css({ display: "none" });
      }
    }
  );
  // end fixed nav

  /*start heading*/
  $(".heading").css({
    height: `${
      $(window).height() -
      ($(".navbar").innerHeight() + $(".navbar").offset().top)
    }px`,
  });
  /*end heading*/

  /*start customers*/
  setInterval(function () {
    $(`${$(".our-customers .carousel .carousel-inner .active").data("name")}`)
      .siblings()
      .hide();
    $(
      `${$(".our-customers .carousel .carousel-inner .active").data("name")}`
    ).fadeIn();
  }, 10);

  /*end customers*/

  /*start business*/
  var timeFunc = (element) => {
    var timePerChar = 2000 / parseInt(element.innerText);
    loopFunc(timePerChar, parseInt(element.innerText), element);
  };
  var loopFunc = (time, numOfChar, element) => {
    var i = 1;
    element.innerText = "0";
    var type = setInterval(function () {
      element.innerText = parseInt(element.innerText) + 1;
      i++;
      if (i > numOfChar) {
        clearInterval(type);
      }
    }, time);
  };

  $(window).one("myCustom", function () {
    var countArray = Array.from(document.querySelectorAll(".business .count"));
    countArray.forEach((element) => {
      timeFunc(element);
    });
  });

  $(window).on("scroll", function () {
    if ($(window).scrollTop() >= 2780 && $(window).scrollTop() < 3500) {
      $(window).trigger("myCustom");
    }
  });
  /*end business*/

  /*start pricing*/

  var label = $(".pricing .custom-control .custom-control-label");
  label.on("click", () => {
    var price = $(".pricing .standard .price");
    if (label.data("value") === ".annual") {
      label.data("value", ".monthly");
      var type = setInterval(function () {
        price.text(parseInt(price.text()) + 1);

        if (parseInt(price.text()) >= price.data("monthly")) {
          clearInterval(type);
        }
      }, 1500 / (49 - 20));
    } else {
      label.data("value", ".annual");
      var type = setInterval(function () {
        price.text(parseInt(price.text()) - 1);

        if (parseInt(price.text()) <= price.data("annual")) {
          clearInterval(type);
        }
      }, 1500 /
        (parseInt(price.data("monthly")) - parseInt(price.data("annual"))));
    }
  });

  /*end pricing*/
});

new WOW().init();
//made by vipul mirajkar thevipulm.appspot.com
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 120 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};
