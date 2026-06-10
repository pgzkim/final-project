import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import '../scss/style.scss'

const MOBILE_WIDTH = 768

const shell = document.querySelector('.site-shell')
const menuToggles = document.querySelectorAll('[data-menu-toggle]')
const showAllButtons = document.querySelectorAll('[data-show-all]')
const readMoreButtons = document.querySelectorAll('[data-read-more]')
const sliderElements = document.querySelectorAll('[data-slider]')
const mobileMedia = window.matchMedia(`(max-width: ${MOBILE_WIDTH - 1}px)`)

menuToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    shell.classList.toggle('site-shell--menu-open')
  })
})

let sliders = []

const initSliders = () => {
  if (sliders.length) return

  sliders = Array.from(sliderElements, (slider) => {
    const swiper = new Swiper(slider, {
      modules: [Pagination],
      slidesPerView: 1,
      spaceBetween: 16,
      slidesPerGroup: 1,
      slidesOffsetBefore: 16,
      slidesOffsetAfter: 16,
      observer: true,
      observeParents: true,
      watchOverflow: true,
      watchSlidesProgress: true,
      pagination: {
        el: slider.querySelector('.swiper-pagination'),
        clickable: true,
      },
    })

    slider.querySelectorAll('img').forEach((image) => {
      if (!image.complete) {
        image.addEventListener('load', () => swiper.update(), { once: true })
      }
    })

    return swiper
  })
}

const destroySliders = () => {
  sliders.forEach((swiper) => swiper.destroy(true, true))
  sliders = []

  sliderElements.forEach((slider) => {
    slider.querySelector('.swiper-pagination').replaceChildren()
  })
}

const syncSliders = () => {
  if (mobileMedia.matches) {
    initSliders()
  } else {
    destroySliders()
  }
}

syncSliders()

if (mobileMedia.addEventListener) {
  mobileMedia.addEventListener('change', syncSliders)
} else {
  mobileMedia.addListener(syncSliders)
}

let resizeFrame

window.addEventListener('resize', () => {
  cancelAnimationFrame(resizeFrame)
  resizeFrame = requestAnimationFrame(() => {
    sliders.forEach((swiper) => {
      swiper.update()
      swiper.pagination.render()
      swiper.pagination.update()
    })
  })
})

showAllButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const section = button.closest('[data-expandable]')
    const text = button.querySelector('[data-show-text]')

    section.classList.toggle('catalog-section--expanded')
    text.textContent = section.classList.contains('catalog-section--expanded') ? 'Скрыть' : 'Показать все'
    sliders.forEach((slider) => slider.update())
  })
})

readMoreButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault()

    const copy = button.closest('.hero__copy')
    const hiddenText = copy.querySelector('.invisible')
    const buttonText = button.querySelector('[data-read-more-text]')

    hiddenText.classList.toggle('invisible--visible')
    button.classList.toggle('read-more--open')
    buttonText.textContent = hiddenText.classList.contains('invisible--visible') ? 'Скрыть' : 'Читать далее'
  })
})
