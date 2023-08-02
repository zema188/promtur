function changerActive(list) {
  for(let i = 0; i < list.length; i++) {
      list[i].classList.remove('active')
  }
  list = 0
}

//Popup close 
document.addEventListener("click", function(event) {
  event = event || window.event;
  let target = event.target

  if(target.classList.contains('popup')) {
    target.classList.remove('active')
    bodyScrollLock.enableBodyScroll(target);
  }

  //закрытие меню кликом по темной области
  if(target.classList.contains('header-m')) {
    target.classList.remove('active')
    bodyScrollLock.enableBodyScroll(target);
    for (let i = 0; i < headerMenuBtn.length; i++) {
      headerMenuBtn[i].classList.toggle('open')
    }
  }


  //закрытие блоков close-out по клику вне 
  if(!target.classList.contains('close-out') && !target.closest('.close-out')) {
    let closeOutBlock = document.querySelectorAll('.close-out')
    changerActive(closeOutBlock)
  }
}

)

let popupClose = document.querySelectorAll('.popup-close')
for(let i=0 ; i < popupClose.length ; i++) {
    popupClose[i].addEventListener("click",
    function() {
      let popup = popupClose[i].closest('.popup')
      if(popup.classList.contains('filter')) {
        popup.classList.remove('popup')
      } else {
        popup.classList.remove('active')
      }
        bodyScrollLock.enableBodyScroll(popup);
    })
}
//слайдер на главной
const excursionSwiper = new Swiper('.excursion__swiper', {
  speed: 400,
  spaceBetween: 20,
  slidesPerView: 3,
  navigation: {
    nextEl: '.excursion__swiper-next',
    prevEl: '.excursion__swiper-prev',
  },
  breakpoints: {
    // when window width is >= 320px
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 640px
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    }
  }
});

//слайдер на главной
const companySwiper = new Swiper('.company__swiper', {
  speed: 400,
  spaceBetween: 20,
  slidesPerView: 1,
  navigation: {
    nextEl: '.company__next',
    prevEl: '.company__prev',
  },
  pagination: {
    el: ".company__pagination",
  },
  breakpoints: {
    // when window width is >= 320px
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
  }
});

// открытие попапа записаться 
if(document.querySelectorAll('.excursion__card-btn').length) {
  const excursionCardBtn = document.querySelectorAll('.excursion__card-btn')
  const popupRecord = document.querySelector('.popup-record')
  excursionCardBtn.forEach(btn => {
    btn.addEventListener('click', function() {
      popupRecord.classList.add('active')
      bodyScrollLock.disableBodyScroll(popupRecord)
    })
  });
}


// показать скрыть пароль
if(document.querySelectorAll('.eye').length) {
  const yey = document.querySelectorAll('.eye')

  yey.forEach(yey => {
    yey.addEventListener('click', function() {
      togglePassword(this)
    })
  });

  function togglePassword(eye) {
    const field = eye.closest('.input-password-w')
    const input = field.querySelector('input')
    const yeyOpen = field.querySelector('.eye_open')
    const yeyClose = field.querySelector('.eye_close')

    yeyOpen.classList.toggle('active')
    yeyClose.classList.toggle('active')

    if(!yeyOpen.classList.contains('active')) {
      input.setAttribute('type', 'text')
    } else {
      input.setAttribute('type', 'password')
    }
  }
}


//gallery swiper
if(document.querySelectorAll('.gallery__swiper').length) {
  const gallery = document.querySelector('.gallery')
  const miniImage = gallery.querySelectorAll('.gallery__swiper-slide')
  const bigImage = gallery.querySelectorAll('.gallery__list-item')
  const gallerySwiperList = gallery.querySelector('.gallery__swiper-list')
  const galleryPrevBtn = gallery.querySelector('.gallery__swiper-prev')
  const galleryNextBtn = gallery.querySelector('.gallery__swiper-next')
  let activeId = 0

  // открыть галарею по клику на фото
  const openGallery = document.querySelectorAll('.open-gallery')
  for(let i = 0; i < openGallery.length; i++) {
    openGallery[i].addEventListener('click', function() {
      gallery.classList.add('active')
      bodyScrollLock.disableBodyScroll(gallery);
    })
  }


  //скролл по кнопкам
  galleryPrevBtn.onclick = function() {
    if(activeId > 0) {
      changeActiveSlide(-1)
    } else {
      changeActiveSlide(miniImage.length-1)
    }
  }
  galleryNextBtn.onclick = function() {
    if(activeId < miniImage.length - 1) {
      changeActiveSlide(1)
    } else {
      changeActiveSlide(-miniImage.length+1)
    }
  }

  function changeActiveSlide(side) {
      activeId += side
      miniImage[activeId].scrollIntoView();
      bigImage[activeId].scrollIntoView();
      changerActive(miniImage)
      miniImage[activeId].classList.add('active')

  }
  //scroll by click in mini image
  for(let i = 0; i < miniImage.length; i++) {
    miniImage[i].addEventListener('click', function() {
      changerActive(miniImage)
      this.classList.add('active')
      activeId = i
      bigImage[i].scrollIntoView();
    })
  }


  // change mini images by scroll
  gallery.addEventListener('scroll', function(){
    for(let i = 0; i < bigImage.length; i++) {
      checkIfElementIs100pxBelowViewport(bigImage[i],i)
    }
  });


  function checkIfElementIs100pxBelowViewport(element,number) {
    const rect = element.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const isAboveMidpoint = rect.top < windowHeight / 2;
    const isBelowMidpoint = rect.bottom > windowHeight / 2;
  
    if (isAboveMidpoint && isBelowMidpoint) {
      activeId = number
      changerActive(miniImage)
      miniImage[number].classList.add('active')
      miniImage[number].scrollIntoView();
    }
  }

}


//enterprises__switch-btn
if(document.querySelectorAll('.enterprises__switch-btn').length) {
  const enterprisesSwitchBtn = document.querySelectorAll('.enterprises__switch-btn')
  enterprisesSwitchBtn.forEach(btn => {
    btn.addEventListener('click', function() {
      changerActive(enterprisesSwitchBtn)
      this.classList.add('active')
    })
  });
}

//скролл до блока по клику на ссылку
$(document).ready(function () {
    $('a[href^="#"]').on('click', function (event) {
        event.preventDefault();

        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });
});

//открытие sort блока
if(document.querySelectorAll('.sort').length) {
  const sort = document.querySelectorAll('.sort')
  sort.forEach(sortBlock => {
    sortBlock.addEventListener('click', function(e) {
      const target = e.target
      //открытие по title 
      if(target.classList.contains('sort__title') || target.closest('.sort__title')) {
        sortBlock.classList.toggle('active')
        return
      }
      if(target.classList.contains('sort__list-item') || target.closest('.sort__list-item')) {
        const itemClicked = target.closest('.sort__list-item')
        const text = itemClicked.querySelector('span').innerHTML.trim()
        const title = sortBlock.querySelector('.sort__title').querySelector('span')
        title.innerHTML = text
        sortBlock.classList.remove('active')
        return
      }
    })
  });
}

//блок dropdown-input добавление в input из dropdown-input__list

if(document.querySelectorAll('.dropdown-input').length) {
  const dropdownInputBlock = document.querySelectorAll('.dropdown-input')

  dropdownInputBlock.forEach(parentBlock => {
    parentBlock.addEventListener('click', function(e) {
      const target = e.target
      e.preventDefault()

      if(target.classList.contains('dropdown-input__title') || target.closest('.dropdown-input__title')) {
        parentBlock.classList.toggle('active')
        return
      }
      if(target.classList.contains('dropdown-input__item') || target.closest('.dropdown-input__item')) {
        const itemClicked = target.closest('.dropdown-input__item')
        const text = itemClicked.querySelector('span').innerHTML.trim()
        const title = parentBlock.querySelector('.dropdown-input__title').querySelector('input')
        title.value = text
        parentBlock.classList.remove('active')
        return
      }

    })
  });
}

//бургер меню
let headerMenuBtn = document.querySelectorAll('.toggle-menu')
let mobileMenu = document.querySelector('.header-m')
for (let i = 0; i < headerMenuBtn.length; i++) {
  headerMenuBtn[i].addEventListener('click', function() {
    toggleMobileMenu()
  })
}

function toggleMobileMenu() {
  for (let i = 0; i < headerMenuBtn.length; i++) {
    headerMenuBtn[i].classList.toggle('open')
  }
  mobileMenu.classList.toggle('active')
}

// Size-control
window.addEventListener('resize', function(event){
  if(window.innerWidth >= 1024 && mobileMenu !== null) {
    mobileMenu.classList.remove('active')
    for (let i = 0; i < headerMenuBtn.length; i++) {
      headerMenuBtn[i].classList.remove('open')
    }
  }
})

//header-touch-swipe
function hedearMobileSwipeClose() {
  const headerMobile = document.querySelector('.header-m')
  const headerMobileContent = headerMobile.querySelector('.header-m__content')


  headerMobileContent.addEventListener('touchstart', handleTouchStart, false);
  headerMobileContent.addEventListener('touchmove', handleTouchMove, false);
  
  let xDown = null;
  let yDown = null;
  
  function handleTouchStart(evt) {
      xDown = evt.touches[0].clientX;
      yDown = evt.touches[0].clientY;
  };
  
  function handleTouchMove(evt) {
      if ( ! xDown || ! yDown ) {
          return;
      }
  
      let xUp = evt.touches[0].clientX;
      let yUp = evt.touches[0].clientY;
  
      let xDiff = xDown - xUp;
      let yDiff = yDown - yUp;
      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
          if ( xDiff > 0 ) {
            headerMobile.classList.remove('active')
            for (let i = 0; i < headerMenuBtn.length; i++) {
              headerMenuBtn[i].classList.toggle('open')
            }
            bodyScrollLock.enableBodyScroll(headerMobile);
          } else {
          }
      } else {
          if ( yDiff > 0 ) {
          } else {
          }
      }
      xDown = null;
      yDown = null;
  
  };
}
if(document.querySelectorAll('.header-m').length) {
  hedearMobileSwipeClose()
}