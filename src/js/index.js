import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'
import '../scss/style.scss'

const MOBILE_WIDTH = 768

const shell = document.querySelector('.site-shell')
const menuToggles = document.querySelectorAll('[data-menu-toggle]')
const showAllButtons = document.querySelectorAll('[data-show-all]')

menuToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    shell.classList.toggle('site-shell--menu-open')
  })
})

const sliders = []

if (window.innerWidth < MOBILE_WIDTH) {
  document.querySelectorAll('[data-slider]').forEach((slider) => {
    sliders.push(
      new Swiper(slider, {
        modules: [Pagination],
        slidesPerView: 'auto',
        spaceBetween: 16,
        pagination: {
          el: slider.querySelector('.swiper-pagination'),
          clickable: true,
        },
      })
    )
  })
}

showAllButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const section = button.closest('[data-expandable]')
    const text = button.querySelector('[data-show-text]')

    section.classList.toggle('catalog-section--expanded')
    text.textContent = section.classList.contains('catalog-section--expanded') ? 'Скрыть' : 'Показать все'
    sliders.forEach((slider) => slider.update())
  })
})
