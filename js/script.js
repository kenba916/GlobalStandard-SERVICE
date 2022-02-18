// drawer
$(".drawer-icon").on("click", function (e) {
  e.preventDefault();

  $(".drawer-icon").toggleClass("is-active");
  $(".drawer-content").slideToggle(200);

  return false;
});


// slick
$(".slider").slick({
  autoplay: true,
  autoplaySpeed: 2800,
});


// アコーディオン
$(".question-q").on("click", function () {
  $(this).next(".question-a").slideToggle(300);
  $(this).toggleClass("open");
  $(this).children(".question-q_txt").toggleClass("-active");
  $(this).find(".question-q_bar1").toggleClass("-rotate");
  $(this).find(".question-q_bar2").toggleClass("-rotate");

  return false;
});


// スクロール
$('.case-categories a[href*="#"]').click(function () {
  var elmHash = $(this).attr("href"); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
  var pos = $(elmHash).offset().top - 100; //idの上部の距離からHeaderの高さを引いた値を取得
  $("body,html").animate({ scrollTop: pos }, 300); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール

  return false;
});


// 全て記入でボタンがactive
let $submit = $("#js-submit");
$("#js-form input, #js-form textarea, #js-form select").on("change", function () {
  // !== not equal("" からではなく) $$ かつ   → valueの値がからではなく
  if (
    $('#js-form input[type="text"]').val() !== "" &&
    $('#js-form input[type="email"]').val() !== "" &&
    $('#js-form input[type="tel"]').val() !== "" &&
    $("#js-form select option").val("") !== "" &&
    $("#js-form textarea").val() !== "" &&
    $('#js-form input[type="text-kana"]')
      .val()
      .match(/^([ァ-ン]|ー)+$/) &&
    $('#js-form input[type="checkbox"]').prop("checked") === true
  ) {
    $submit.prop("disabled", false);
    $submit.addClass("active");
  } else {
    $submit.prop("disabled", true);
    $submit.removeClass("active");
  }
});


// カタカナ強制
$('#js-form input[type="text-kana"]').on("change", function () {
  if (
    !$(this)
      .val()
      .match(/^([ァ-ン]|ー)+$/)
  ) {
    alert("全角カタカナで入力してください。");
  }
});



// form
let $form = $("#js-form");
$form.submit(function (e) {
  $.ajax({
    url: $form.attr("action"),
    data: $form.serialize(),
    type: "POST",
    dataType: "xml",
    statusCode: {
      0: function () {
        //送信に成功したときの処理
        $form.slideUp();
        $("#js-success").slideDown();
      },
      200: function () {
        //送信に失敗したときの処理
        $form.slideUp();
        $("#js-error").slideDown();
      },
    },
  });
  return false;
});


$(function () {
  $("button[type=submit]").click(function () {
    $("#js-form").submit();
  });
});