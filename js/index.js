!function(root, factory) {
    "function" == typeof define && define.amd ? // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function() {
        return root.svg4everybody = factory();
    }) : "object" == typeof module && module.exports ? // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory() : root.svg4everybody = factory();
}(this, function() {
    /*! svg4everybody v2.1.9 | github.com/jonathantneal/svg4everybody */
    function embed(parent, svg, target) {
        // if the target exists
        if (target) {
            // create a document fragment to hold the contents of the target
            var fragment = document.createDocumentFragment(), viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
            // conditionally set the viewBox on the svg
            viewBox && svg.setAttribute("viewBox", viewBox);
            // copy the contents of the clone into the fragment
            for (// clone the target
            var clone = target.cloneNode(!0); clone.childNodes.length; ) {
                fragment.appendChild(clone.firstChild);
            }
            // append the fragment into the svg
            parent.appendChild(fragment);
        }
    }
    function loadreadystatechange(xhr) {
        // listen to changes in the request
        xhr.onreadystatechange = function() {
            // if the request is ready
            if (4 === xhr.readyState) {
                // get the cached html document
                var cachedDocument = xhr._cachedDocument;
                // ensure the cached html document based on the xhr response
                cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""), 
                cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), // clear the xhr embeds list and embed each item
                xhr._embeds.splice(0).map(function(item) {
                    // get the cached target
                    var target = xhr._cachedTarget[item.id];
                    // ensure the cached target
                    target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)), 
                    // embed the target into the svg
                    embed(item.parent, item.svg, target);
                });
            }
        }, // test the ready state change immediately
        xhr.onreadystatechange();
    }
    function svg4everybody(rawopts) {
        function oninterval() {
            // while the index exists in the live <use> collection
            for (// get the cached <use> index
            var index = 0; index < uses.length; ) {
                // get the current <use>
                var use = uses[index], parent = use.parentNode, svg = getSVGAncestor(parent), src = use.getAttribute("xlink:href") || use.getAttribute("href");
                if (!src && opts.attributeName && (src = use.getAttribute(opts.attributeName)), 
                svg && src) {
                    if (polyfill) {
                        if (!opts.validate || opts.validate(src, svg, use)) {
                            // remove the <use> element
                            parent.removeChild(use);
                            // parse the src and get the url and id
                            var srcSplit = src.split("#"), url = srcSplit.shift(), id = srcSplit.join("#");
                            // if the link is external
                            if (url.length) {
                                // get the cached xhr request
                                var xhr = requests[url];
                                // ensure the xhr request exists
                                xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(), 
                                xhr._embeds = []), // add the svg and id as an item to the xhr embeds list
                                xhr._embeds.push({
                                    parent: parent,
                                    svg: svg,
                                    id: id
                                }), // prepare the xhr ready state change event
                                loadreadystatechange(xhr);
                            } else {
                                // embed the local id into the svg
                                embed(parent, svg, document.getElementById(id));
                            }
                        } else {
                            // increase the index when the previous value was not "valid"
                            ++index, ++numberOfSvgUseElementsToBypass;
                        }
                    }
                } else {
                    // increase the index when the previous value was not "valid"
                    ++index;
                }
            }
            // continue the interval
            (!uses.length || uses.length - numberOfSvgUseElementsToBypass > 0) && requestAnimationFrame(oninterval, 67);
        }
        var polyfill, opts = Object(rawopts), newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, webkitUA = /\bAppleWebKit\/(\d+)\b/, olderEdgeUA = /\bEdge\/12\.(\d+)\b/, edgeUA = /\bEdge\/.(\d+)\b/, inIframe = window.top !== window.self;
        polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe;
        // create xhr requests object
        var requests = {}, requestAnimationFrame = window.requestAnimationFrame || setTimeout, uses = document.getElementsByTagName("use"), numberOfSvgUseElementsToBypass = 0;
        // conditionally start the interval if the polyfill is active
        polyfill && oninterval();
    }
    function getSVGAncestor(node) {
        for (var svg = node; "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode); ) {}
        return svg;
    }
    return svg4everybody;
});
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
