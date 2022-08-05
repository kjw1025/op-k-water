$(document).ready(function () {

  // 모바일 메뉴
  let mobileMenu = $('.mobile-menu');
  let mobileBt = $('.all-menu');
  mobileBt.click(function(event){
    // href 막기
    event.preventDefault();
    let wW = window.innerWidth;
    if(wW > 1000) {
      return;
    }
    
    mMainMenu.removeClass('m-mainmenu-active');
    mSubMenu.hide();
    mDepth3.hide();

    mobileMenu.toggleClass('mobile-menu-active');
    // 모바일 메뉴가 펼쳐졌는지 아닌지를 판단(true/false);
    let temp = mobileMenu.hasClass('mobile-menu-active');
    if(temp) {
      $('html').css('overflow', 'hidden');
      $(this).find('img').attr('src', 'images/search_close.png');
    }else{
      $('html').css('overflow-y', 'auto');
      $(this).find('img').attr('src', 'images/main_allmenu.png');
    }

  });

  // 모바일 메뉴 Depth1
  let mMenu = $('.m-menu');
  let mMenuLi = $('.m-menu > li');
  // 주메뉴
  let mMainMenu = $('.m-mainmenu');
  // 서브메뉴 Depth2
  let mSubMenu = $('.m-submenu');
  // 서브메뉴 Depth3
  let mDepth3 = $('.m-depth3');

  $.each(mMenuLi, function(index, item){

    let depth1 = $(this).find('.m-mainmenu');
    depth1.click(function(event){
      event.preventDefault();
      // 현재 포커스가 있는지 없는지 파악
      let temp = $(this).hasClass('m-mainmenu-active');
      
      if(temp) {
        // temp 는 true 가 나온 상황이 메뉴 오픈 된 상태
        // 닫힌 상태로 바꾸어주어야 한다.
        $(this).removeClass('m-mainmenu-active');
        // 서브메뉴를 닫아준다.
        $(this).next().stop().slideUp();

      }else{
        // 일단 모든 메뉴를 닫고 
        mMainMenu.removeClass('m-mainmenu-active');
        // 클릭된 메뉴만 펼친다.
        $(this).addClass('m-mainmenu-active');
        // 일단 모든 서브메뉴를 닫아라.
        mSubMenu.stop().slideUp();
        // 하나는 열어라
        $(this).next().stop().slideDown();
      }
      // 3Depth 는 무조건 닫는다.
      mDepth3.stop().slideUp();

    });
  });

  $.each(mSubMenu, function(index, item) {
    let mSubMenuA = $(this).find('> li > a');
    
    mSubMenuA.click(function(event){
      // depth3 가 있는지 검사
      let depth3 = $(this).next();
      
      if(depth3.length) {
        // href 있다면.. 막는다.
        event.preventDefault();

        let tempShow = depth3.css('display');
        if(tempShow == 'none') {
          // 안보이고 있던 상태라면
          // 보이게 해준다.
          // 일단 모두 숨긴다.
          mDepth3.stop().slideUp();
          depth3.stop().slideDown();
        }else{
          // 보이고 있던 상태라면
          // 가려준다.
          depth3.stop().slideUp();
        }       

      }

    });

  });


  // 마우스 휠 코드
  let section = $('.wrap > section');
  let footer = $('.footer');

  let sectionSpeed = 500;
  let sectionPos = [];
  let sectionIndex = 0;
  // 연속 휠 막기
  let scrollIng = false;
  // 화면사이즈 체크
  let wheelIng = true;
  let sectionMenu = $('.section-menu');
  function wheelCheckFn(){
    let wW = window.innerWidth;
    if(wW <= 1000) {
      wheelIng = false;
      sectionMenu.hide();
    }else{
      wheelIng = true;
      sectionMenu.show();
      mobileMenu.removeClass('mobile-menu-active');
      mobileBt.find('img').attr('src', 'images/main_allmenu.png');
    }
  }

  wheelCheckFn();
 
  $(window).resize(function(){
    wheelCheckFn();
  });

  // 위치 파악 (Y 스크롤 이동 px )
  function resetSection() {

    $.each(section, function (index, item) {
      let tempY = $(this).offset().top;
      tempY = Math.ceil(tempY);
      sectionPos[index] = tempY;
    });

    // footer 위치를 추가 및 변경 합니다.
    sectionPos[sectionPos.length] = Math.ceil(footer.offset().top);
  }

  // 최초에 새로고침 또는 실행시 위치값파악
  resetSection();  

  // footer 추가로 인한 코드 위치 변경
  let sectionTotal = sectionPos.length;
  
  $(window).resize(function () {
    resetSection();

    if(wheelIng) {      
      // 색상 셋팅
      sectionColor();
      gsap.to($('html'), sectionSpeed / 1000, {
        scrollTo: sectionPos[sectionIndex],
        onComplete: function () {
          scrollIng = false;
        }
      });
    }

  });

  // 스크롤바의 윗쪽 위치값을 파악한다.
  $(window).scroll(function(){

    if(wheelIng) {
      return;
    }

    let tempY = $(window).scrollTop();
    tempY = Math.ceil(tempY);
    for(let i = sectionTotal - 1; i >= 0; i--) {
      let tempMax = sectionPos[i];
      if(tempY >= tempMax) {
        sectionIndex = i;
        break;
      }
    }
  });

  // 마우스 휠 체크
  $(window).bind('mousewheel DOMMouseScroll', function (event) {

    let distance = event.originalEvent.wheelDelta;
    if (distance == null) {
      distance = event.originalEvent.detail * -1;
    }

    // 화면 사이즈에 따른 작동여부
    if(wheelIng != true) {
      return;
    }

    // 연속 휠 막아준다.
    if (scrollIng) {
      return;
    }
    scrollIng = true;

    if (distance < 0) {
      sectionIndex++;
      if (sectionIndex >= sectionTotal) {
        sectionIndex = sectionTotal - 1;
      }
    } else {
      sectionIndex--;
      if (sectionIndex <= 0) {
        sectionIndex = 0;
      }
    }

    // 색상 셋팅
    sectionColor();
    gsap.to($('html'), sectionSpeed / 1000, {
      scrollTo: sectionPos[sectionIndex],
      onComplete: function () {
        scrollIng = false;
      }
    });  

  });

  // 섹션 이동 기능
  let sectionLink = $('.section-menu a');
  $.each(sectionLink, function(index, item){
    $(this).click(function(event){
      // href 를 막는다.
      event.preventDefault();
      moveSection(index);
    });
  });

  function moveSection(_index){
    // 보여질 section 번호를 저장
    sectionIndex = _index;
    
    // 색상 셋팅
    sectionColor();

    // 이동모션
    gsap.to($('html'), sectionSpeed / 1000, {
      scrollTo: sectionPos[sectionIndex],
      onComplete: function () {
        scrollIng = false;
      }
    });
   
  }

  function sectionColor() {
    // 포커스 표현
    sectionLink.removeClass('section-menu-active');
    sectionLink.eq(sectionIndex).addClass('section-menu-active');
    // 색상 표현
    sectionLink.removeClass('section-menu-blue');
    if(sectionIndex != 2 && sectionIndex != 5 ) {
      sectionLink.addClass('section-menu-blue');
    }
  }

  // 최초 또는 새로 고침 시 색상 셋팅
  sectionColor();


  // 검색 필드 기능
  // 검색 필드를 보여주는 버튼
  let searchBt = $('.search-bt');
  // 검색 필드
  let searchWrap = $('.search-wrap');

  // 검색필드 보여주는 버튼 클릭
  // 클릭할때 서서히 보이고 숨기기 토글
  // fadeToggle();

  searchWrap.click(function (event) {
    // 클릭된 것이 Body 로 못가게 막는다.
    event.stopPropagation();
  });

  searchBt.click(function (event) {
    event.preventDefault();
    // 클릭된 것이 Body 로 못가게 막는다.
    event.stopPropagation();
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

  $('body').click(function () {
    searchWrap.stop().fadeOut(300);
    searchBt.find('img').attr('src', 'images/main_search.png');
    searchBt.css('background', '#fff');
  });

  // 링크사이트 펼침기능
  // footersite를저장
  let footerSite = $('.footer-site');

  // site-list를 저장
  let siteList = $('.site-list');

  footerSite.click(function () {

    let temp = $(this).hasClass('footer-site-open');
    if (temp == true) {
      siteList.stop().slideUp(500);
      $(this).removeClass('footer-site-open');
    } else {
      siteList.stop().slideDown(500);
      $(this).addClass('footer-site-open');
    }
  });

  footerSite.mouseleave(function () {
    siteList.stop().slideUp(500);
    $(this).removeClass('footer-site-open');
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
    slidesPerView: 3,
    grid: {
      rows: 2,
    },
    loop: true,
    navigation: {
      prevEl: '.sw-visual-prev',
      nextEl: '.sw-visual-next'
    },
    breakpoints: {
      760: {
        slidesPerView: 4,
        grid: {
          rows: 1,
        },
      },
      800: {
        slidesPerView: 4,
        grid: {
          rows: 1,
        },
      },
      960: {
        slidesPerView: 5,
        grid: {
          rows: 1,
        },
      },
      1080: {
        slidesPerView: 6,
        grid: {
          rows: 1,
        },
      },
      1200: {
        slidesPerView: 7,
        grid: {
          rows: 1,
        },
      },
      1260: {
        slidesPerView: 8,
        grid: {
          rows: 1,
        },
      },
    },
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
    },
    // display 변경시 처리
    observer: true,
    observeParents: true,
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

  // 뉴스 Top 영역 슬라이드
  // 슬라이드 옵션
  let swNewsListOpt = {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 12,
    breakpoints: {
      700: {
        slidesPerView: 3,
      },
      900: {
        slidesPerView: 4,
      }
    },
    navigation: {
      prevEl: '.sw-news-list-prev',
      nextEl: '.sw-news-list-next'
    }
  };
  // 슬라이드 저장
  let swNewsList;
  // = new Swiper('.sw-news-list', swNewsListOpt);  
  // 화면이 작아질때, 즉, 1000px 보다 작을 때 슬라이드 생성되어야 함.
  // 만약 1000px 보다 크면 슬라이드는 제거가 되어야 한다.
  $(window).resize(function () {

    // jQuery 는 scroll 빼고 너비잡는다.
    // javaScript window.innerWidth
    let wW = window.innerWidth;

    if (wW <= 1000) {
      // 슬라이드 생성
      if (swNewsList == undefined) {
        swNewsList = new Swiper('.sw-news-list', swNewsListOpt);
      }
    } else {
      // 슬라이드 제거
      if (swNewsList != undefined) {
        swNewsList.destroy();
        swNewsList = undefined;
      }
    }

  });

  // 최초 진입 및 새로 고침 시에도 체크
  let wW = window.innerWidth;
  if (wW <= 1000) {
    if (swNewsList == undefined) {
      swNewsList = new Swiper('.sw-news-list', swNewsListOpt);
    }
  } else {
    if (swNewsList != undefined) {
      swNewsList.destroy();
      swNewsList = undefined;
    }
  }

  // 뉴스 탭메뉴
  // 탭 메뉴 저장
  let newsBottomMenu = $('.news-bottom-menu > a');
  // 탭의 내용
  // html 의 태그 구조의 문제가 발생합니다.
  let newsBottomCont = [
    // $('.news-box-bot').eq(0),
    $('.news-box-bot').eq(1),
    $('.news-box-bot').eq(2),
    $('.news-box-bot').eq(3)
  ];

  // 활성화될 번호 기억
  let newsBottomIdx = 0;
  // newsBottomCont[0].hide();
  // newsBottomCont[1].hide();
  // newsBottomCont[2].hide();
  // newsBottomCont[newsBottomIdx].show();
  // newsBottomMenu.removeClass('news-bottom-menu-active');
  // newsBottomMenu.eq(newsBottomIdx).addClass('news-bottom-menu-active');


  // 탭 메뉴 클릭시 내용 보여주기
  $.each(newsBottomMenu, function (index, item) {
    $(this).click(function (event) {
      // href 막기
      event.preventDefault();

      newsBottomMenu.removeClass('news-bottom-menu-active');
      $(this).addClass('news-bottom-menu-active');

      newsBottomCont[0].hide();
      newsBottomCont[1].hide();
      newsBottomCont[2].hide();
      newsBottomCont[index].show();

    });
  });

  // 화면 리사이징시 jquery css 제거
  $(window).resize(function () {

    // 화면 너비
    let wW = $(window).width();
    if (wW > 630) {
      newsBottomCont[0].removeAttr('style');
      newsBottomCont[1].removeAttr('style');
      newsBottomCont[2].removeAttr('style');
    } else {

      $.each(newsBottomMenu, function (index, itme) {

        // 화면 리사이즈 마다 물어본다. 
        let temp = $(this).hasClass('news-bottom-menu-active');
        if (temp) {
          newsBottomCont[0].hide();
          newsBottomCont[1].hide();
          newsBottomCont[2].hide();
          newsBottomCont[index].show();
        }

      });
    }

  });

};