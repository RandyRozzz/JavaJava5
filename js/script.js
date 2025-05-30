(function (global) {
  var dc = {};
  var homeHtmlUrl = "snippets/home-snippet.html";
  var allCategoriesUrl = "https://davids-restaurant.herokuapp.com/categories.json";

  function insertHtml(selector, html) {
    document.querySelector(selector).innerHTML = html;
  }
  function showLoading(sel) {
    insertHtml(sel,"<div class='text-center my-5'><span class='spinner-border'></span></div>");
  }
  function insertProperty(str, prop, val) {
    return str.replace(new RegExp("{{"+prop+"}}","g"), val);
  }

  document.addEventListener("DOMContentLoaded", function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowHomeHTML, true);
  });

  function buildAndShowHomeHTML(categories) {
    var randomCat = chooseRandomCategory(categories).short_name;
    $ajaxUtils.sendGetRequest(homeHtmlUrl, function (homeHtml){
      var html = insertProperty(homeHtml,"randomCategoryShortName","'"+ randomCat +"'");
      insertHtml("#main-content", html);
    }, false);
  }
  function chooseRandomCategory(cats) {
    return cats[Math.floor(Math.random()*cats.length)];
  }

  global.$dc = dc;
})(window);
