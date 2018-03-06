(function (window) {
  "use strict";

  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function (fn) {
    console.log("Setting submit handler for form");
    this.$formElement.on("submit", function (event) {
      event.preventDefault();

      var data = {};

      $(this).serializeArray().forEach(function (item) {
        data[item.name] = item.value;
        console.log(item.name + " is " + item.value);
      });
      console.log(data);
      fn(data);
      this.reset();
      this.elements[0].focus();
    });
  };

  FormHandler.prototype.addPaymentSubmitHandler = function () {
  //  window.alert("Here");
    console.log("Setting submit handler for payment form");
    this.$formElement.on("submit", function (event) {
      event.preventDefault();

      var data = {};
      var x;
      var y;
      $(this).serializeArray().forEach(function (item) {
        data[item.name] = item.value;
        if(item.name == "title"){
          x = item.value;
        }
        if(item.name == "username"){
          y = item.value;
        }
        console.log(item.name + " are " + item.value);
      });

      console.log(data);

      this.reset();

      this.elements[0].focus();

      var newp  = $("<p>");
      newp.append("Thanks " + x +" "+ y);
      $("#ex1").html(newp);
      $("#ex1").addClass("modal");

      var newx = $("<a href='#ex1' rel='modal:open' id='x'>");
      newx.append("Open");
      $("#ex2").html(newx);
      document.getElementById("x").click();
      $( "#x" ).remove();
    });

  };

  FormHandler.prototype.addInputHandler = function (fn) {
    console.log("Setting input handler for form");
    this.$formElement.on("input", "[name=\"emailAddress\"]", function (event) {
      var emailAddress = event.target.value;
      var message = "";
      if (fn(emailAddress)) {
        event.target.setCustomValidity("");
      } else {
        message = emailAddress + " is not an authorized email address!";
        event.target.setCustomValidity(message);
      }
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
