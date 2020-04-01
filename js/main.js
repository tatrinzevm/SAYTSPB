

$(document).ready(function () {
  var modal = $('.modal'),
      modalSuccess = $('.modal__success'),
      modalError = $('.modal__error'),
      modalForm = $('.modal__form'),
      modalBtn = $('[data-toggle=modal]'),
      scrollMenu = $('.menu__scroll__flex-block'),
      modalBtnOK = $('.modal__button--OK');
  scrollMenu.addClass('menu__scroll__flex-block--hidden');
  
  modalBtn.on('click', function () {
    modal.addClass('modal--visibility');
  });

  modalBtnOK.on('click', function (evt) {
    modalSuccess.removeClass('modal--visibility');
    modalError.removeClass('modal--visibility');
  });

  /*Обработчик события click на кнопку закрытия модального окна.*/

  $(document).on('click', function (evt) {
    if(evt.target.classList.contains('modal')) {
      modal.toggleClass('modal--visibility');
    }
  });

  $(document).on('keydown', function (evt) {
    if(!modal.is(':hidden') && evt.keyCode == 27) {
      modal.removeClass('modal--visibility');
    }
  });
// Модальное окно при успешной отправке
  $(document).on('click', function (evt) {
    if(evt.target.classList.contains('modal__success')) {
      modalSuccess.removeClass('modal--visibility');
    }
  });

  $(document).on('keydown', function (evt) {
    if(!modalSuccess.is(':hidden') && evt.keyCode == 27) {
      modalSuccess.removeClass('modal--visibility');
    }
  });

  // Модальное окно при ошибке отправки
  $(document).on('click', function (evt) {
    if(evt.target.classList.contains('modal__error')) {
      modalError.removeClass('modal--visibility');
    }
  });

  $(document).on('keydown', function (evt) {
    if(!modalError.is(':hidden') && evt.keyCode == 27) {
      modalError.removeClass('modal--visibility');
    }
  });

  $(window).on('scroll', function () {
    if($(window).scrollTop()>100) {
      scrollMenu.removeClass('menu__scroll__flex-block--hidden');
    } else {
      scrollMenu.addClass('menu__scroll__flex-block--hidden');
    }
  });

  scrollUpBtn.on('click', function () {
    $("html,body").animate({scrollTop:0},500);
  });

  $('a[href*="#"]').click(function() {
    $("html,body").animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 400);
    return false;
});


  //initialize swiper when document ready
  var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });
  var prevBtn = $('.swiper-button-prev'),
      nextBtn = $('.swiper-button-next'),
      bullets = $('.swiper-pagination');
  nextBtn.css('left', prevBtn.width() + 27 + bullets.width() + 27);
  bullets.css('left', prevBtn.width() + 27);

  //Валидация форм
  // Форма модального окна
  $('.modal__form').validate({
    errorElement: "div",
    errorClass: "invalid",
    validClass: "success",
    rules: {
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userPhone: {
        required: true,
        minlength: 18,
        maxlength: 18
      }
    },
    messages: {
      userName: {
        required: "Пожалуйста, укажите имя",
        minlength: "Имя не должно быть короче двух символов",
        maxlength: "Имя не должно быть длиннее пятнадцати символов"
      },
      userPhone: {
        required: "Пожалуйста, укажите номер телефона",
        minlength: "Некорректный номер телефона",
        maxlength: "Некорректный номер телефона"
      }
    },
    submitHandler: function (form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          modal.removeClass('modal--visibility');
          modalSuccess.addClass('modal--visibility');
          $(form)[0].reset();
        },
        error: function (response) {
          modal.removeClass('modal--visibility');
          modalError.addClass('modal--visibility');
          $(form)[0].reset();
        }
      });
    }
  });
  //Форма блока расчет стоимости
  $('.cost-calc__form').validate({
    errorElement: "div",
    errorClass: "invalid",
    validClass: "success",
    rules: {
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userEmail: {
        required: true,
        email: true
      },
      userSite: 'required',
      userMessage: 'required'
    },
    messages: {
      userName: {
        required: "Пожалуйста, укажите имя",
        minlength: "Имя не должно быть короче двух символов",
        maxlength: "Имя не должно быть длиннее пятнадцати символов"
      },
      userEmail: {
        required: "Пожалуйста, укажите E-mail",
        email: "Email ожидается в формате name@domain.com"
      },
      userSite: "Пожалуйста, укажите адрес сайта",
      userMessage: "Пожалуйста, заполните текст сообщения"
    },
    submitHandler: function (form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          modal.removeClass('modal--visibility');
          modalSuccess.addClass('modal--visibility');
          $(form)[0].reset();
        },
        error: function (response) {
          modal.removeClass('modal--visibility');
          modalError.addClass('modal--visibility');
          $(form)[0].reset();
        }
      });
    }
  });


  //Валидация формы footer
  $('.footer__form').validate({
    errorElement: "div",
    errorClass: "invalid",
    validClass: "success",
    rules: {
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userPhone: {
        required: true,
        minlength: 18,
        maxlength: 18
      },
      userQuestion: "required",
      questionPolicyCheckbox: "required"
    },
    messages: {
      userName: {
        required: "Пожалуйста, укажите имя",
        minlength: "Имя не должно быть короче двух символов",
        maxlength: "Имя не должно быть длиннее пятнадцати символов"
      },
      userPhone: {
        required: "Пожалуйста, укажите номер телефона",
        minlength: "Некорректный номер телефона",
        maxlength: "Некорректный номер телефона"
      },
      userQuestion: "Пожалуйста, напишите свой вопрос",
      questionPolicyCheckbox: "Вы должны согласиться с обработкой данных до отправки формы"
    },
    submitHandler: function (form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          modalSuccess.addClass('modal--visibility');
          $(form)[0].reset();
        },
        error: function (response) {
          modalError.addClass('modal--visibility');
          $(form)[0].reset();
        }
      });
    }
  });

  var player;
  $('.video__play').on('click', function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '434',
      width: '100%',
      videoId: 'g8Oi3LaTD5s',
      events: {
        'onReady': onPlayerReady
      }
    });
  });

  function onPlayerReady(event) {
    event.target.playVideo();
  }

 
  // Маска для номера телефона
  $('[type=tel]').mask('+7 (000) 000-00-00');
});