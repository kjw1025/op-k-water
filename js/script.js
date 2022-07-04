$(document).ready(function () {});
window.onload = function () {
  // 메뉴 기능
  let header = $('.header');
  let gnb = $('.gnb');
  let gnbH = gnb.height();

  gnb.mouseenter(function () {
    header.css('height', gnbH);
  });
  gnb.mouseleave(function () {
    header.css('height', 70);
  });

  // 비주얼 슬라이드
  new Swiper('.sw-visual', {
    slidesPerView: 8,
    loop: true,
    navigation: {
      prevEl: '.sw-visual-prev',
      nextEl: '.sw-visual-next'
    }
  });
};