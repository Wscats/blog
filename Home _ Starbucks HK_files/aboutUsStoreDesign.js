define(['jquery'], function($) {
  'use strict'

  $('.cms-page-view').on('click', '.store-design-detail-close-btn img', function(e) {
    const target = $(e.target);
    target.closest('.store-design-detail').hide()
    $('body').removeClass('cms-store-design-detail-popup')
  })
  $('.store-design-container-btn').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    $('body').addClass('cms-store-design-detail-popup')
  })


  // Brewing guide
  $(".sb-bw-brewingGuide-container .Mask-container").scroll(function() {
    var obj = $(".sb-bw-brewingGuide-container .Mask-container")
    if (obj.scrollLeft() <= 0) {
      $(".turn-right").css("display", "block")
      $(".turn-left").css("display", "none")
    } else if (obj.scrollLeft() >= 148) {
      $(".turn-right").css("display", "none")
      $(".turn-left").css("display", "block")
    } else {
      $(".turn-right").css("display", "block")
      $(".turn-left").css("display", "block")
    }
  })

  $(".sb-bw-brewingGuide-container .turn-right").click(function() {
    var obj = $(".sb-bw-brewingGuide-container .Mask-container")
    if (obj.scrollLeft() < 148) {
      obj.animate({ scrollLeft: obj.scrollLeft() + 100 }, 100)
    } else {
      obj.animate({ scrollLeft: obj.scrollLeft() }, 100)
    }
  })

  $(".sb-bw-brewingGuide-container .turn-left").click(function() {
    var obj = $(".sb-bw-brewingGuide-container .Mask-container")
    if (obj.scrollLeft() > 0) {
      obj.animate({ scrollLeft: obj.scrollLeft() - 100 }, 100)
    } else {
      obj.animate({ scrollLeft: obj.scrollLeft() }, 100)
    }
  })
})