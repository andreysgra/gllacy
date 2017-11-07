'use strict'

svg4everybody();

(function () {

  // Форма обратной связи
  var blockContacts = document.querySelector('.contacts');
  var modalFeedback = document.querySelector('.modal-feedback');
  var modalOverlay = document.querySelector('.modal-overlay');

  if (blockContacts && modalFeedback && modalOverlay) {
    blockContacts.addEventListener('click', function (event) {
      var target = event.target;

      if (target.classList.contains('contacts__button')) {
        event.preventDefault();

        modalOverlay.classList.add('modal-overlay--opened');
        modalFeedback.classList.add('modal-feedback--opened');
      }
    });

    modalFeedback.addEventListener('click', function (event) {
      var target = event.target;

      if (target.classList.contains('modal-feedback__button')) {
        event.preventDefault();

        closeFormContact();
      }
    });

    window.addEventListener('keydown', function (event) {
      if (event.keyCode === 27) {
        closeFormContact();
      }
    });
  }

  // Слайдер
  var sliderToggles = document.querySelector('.slider-toggles');
  var sliderButtons = document.querySelectorAll('.slider-toggles__button');
  var slider = document.querySelectorAll('.slide');
  var pageWrapper = document.querySelector('.page-wrapper');
  var currentSlider = 0;
  var activeButton = 0;

  if (slider.length > 0) {
    for (var i = 0; i < slider.length; i++) {
      if (slider[i].classList.contains('slide--current')) {
        currentSlider = i;
      }
    }
  }

  if (sliderButtons.length > 0) {
    for (var i = 0; i < sliderButtons.length; i++) {
      sliderButtons[i].dataset.number = i;

      if (sliderButtons[i].classList.contains('slider-toggles__button--active')) {
        activeButton = sliderButtons[i].dataset.number;
      }
    }
  }

  if (sliderToggles) {
    sliderToggles.addEventListener('click', function (event) {
      var target = event.target;
      var number = target.dataset.number

      if (target.classList.contains('slider-toggles__button')) {
        event.preventDefault();

        if (activeButton != number) {
          slider[currentSlider].classList.remove('slide--current');
          pageWrapper.classList.remove('page-wrapper--background-' + currentSlider);

          currentSlider = number;
          slider[currentSlider].classList.add('slide--current');
          pageWrapper.classList.add('page-wrapper--background-' + currentSlider);

          target.classList.add('slider-toggles__button--active');
          sliderButtons[activeButton].classList.remove('slider-toggles__button--active');
          activeButton = number;
        }
      }
    })
  }

  function closeFormContact() {
    if (modalFeedback.classList.contains('modal-feedback--opened')) {
      modalOverlay.classList.remove('modal-overlay--opened');
      modalFeedback.classList.remove('modal-feedback--opened');
    }
  }

})();

// Яндекс карта
function init (ymaps) {
  var map = new ymaps.Map("map", {
    center: [59.93933369972061, 30.33056871667154],
    zoom: 16,
    controls: ['zoomControl']
  });

  var placemark = new ymaps.Placemark([59.938703842795576, 30.32303707375772], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/icon-map-marker.svg',
    iconImageSize: [80, 140],
    iconImageOffset: [-40, -140],
    iconShadow: true,
    iconShadowImageHref: 'img/bg-marker-shadow.png',
    iconShadowImageSize: [182, 110],
    iconShadowImageOffset: [0, -110]
  });

  map.behaviors.disable('scrollZoom');
  map.geoObjects.add(placemark);
}
