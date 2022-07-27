$(document).ready(function () {

  // 검색 필드 기능
  // 검색 필드를 보여주는 버튼
  let searchBt = $('.search-bt');
  // 검색 필드
  let searchWrap = $('.search-wrap');


  // 검색필드 보여주는 버튼 클릭
  // 클릭할때 서서히 보이고 숨기기 토글
  // fadeToggle();

  searchBt.click(function (event) {
    event.preventDefault();
    searchWrap.stop().fadeToggle(300);

    // 검색 버튼 이미지 교체하기
    let imgName = $(this).find('img').attr('src');

    if (imgName == 'images/main_search.png') {
      $(this).find('img').attr('src', 'images/search_btn_close.png');
      $(this).css('background', '#3d66c4');
    } else {
      $(this).find('img').attr('src', 'images/main_search.png');
      $(this).css('background', '#fff');
    }

  });
  // 링크사이트 펼침기능
  // footersite를저장
  let footerSite = $('.footer-site');

  // site-list를 저장
  let siteList = $('.site-list');

  footerSite.click(function () {    
    siteList.stop().slideToggle(500);
    footerSite.toggleClass('footer-site-open');
  });

  footerSite.mouseleave(function () {
    siteList.stop().slideUp(500);
    footerSite.removeClass('footer-site-open');
  });

});


window.onload = function () {
  // 랜덤 천사 기능(0~2)
  let rNum = Math.floor(Math.random() * 3);
  let rClass = 'about-box-char-' + rNum;
  let rTag = $('.about-box-sns');
  rTag.addClass(rClass);

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

  // about 슬라이드
  let swAbout = new Swiper('.sw-about', {
    loop: true,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    speed: 500,
    pagination: {
      el: '.sw-about-pg',
      type: 'fraction'
    },
    navigation: {
      nextEl: '.sw-about-next',
      prevEl: '.sw-about-prev'
    },
    allowTouchMove: false
  });

  let swAboutBt = $('.sw-about-pause');
  swAboutBt.click(function () {
    // 현재 class 상태 체크
    let temp = $(this).hasClass('sw-about-play');
    if (temp == true) {
      // 슬라이드 자동 실행
      swAbout.autoplay.start();
      // 아이콘을 pause 버튼으로 바꾼다.
      // 사용자는 멈추기 위해서 클릭을 하도록 안내한다.
      $(this).removeClass('sw-about-play');
    } else {
      // 슬라이드 멈춤
      swAbout.autoplay.stop();
      // 아이콘을 play 버튼으로 바꾼다.
      // 사용자는 멈춘 슬라이드를 play 하려고 할것이다.
      $(this).addClass('sw-about-play');
    }
  });

  // sid 슬라이드
  let swSid = new Swiper('.sw-sid', {
    loop: true,
    pagination: {
      el: '.sw-sid-pg',
      type: 'fraction'
    },
    navigation: {
      prevEl: '.sw-sid-prev',
      nextEl: '.sw-sid-next'
    },
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    }
  });

  // 자동 실행 멈춤/재생
  let swSidPause = $('.sw-sid-pause');
  swSidPause.click(function () {

    // 현재 sw-sid-play 클래스 적용중?
    // true, false
    let temp = $(this).hasClass('sw-sid-play');
    if (temp == false) {

      $(this).addClass('sw-sid-play');
      // 슬라이드 멈추기
      swSid.autoplay.stop();

    } else {

      $(this).removeClass('sw-sid-play');
      // 슬라이드 재생
      swSid.autoplay.start();

    }

  });

};