import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import '../styles/main.css'

// ---- HEADER SCROLL EFFECT ----
const header = document.querySelector('#siteHeader')
const onScroll = () => {
  header?.classList.toggle('scrolled', window.scrollY > 60)
}
window.addEventListener('scroll', onScroll, { passive: true })
onScroll()

// ---- BURGER MENU ----
const burger = document.querySelector('#burger')
const overlay = document.querySelector('#mobileNavOverlay')

burger?.addEventListener('click', () => {
  const isOpen = overlay?.classList.contains('open')
  overlay?.classList.toggle('open', !isOpen)
  // animate burger lines
  const lines = burger.querySelectorAll('.burger-line')
  if (!isOpen) {
    lines[0].style.transform = 'translateY(7.5px) rotate(45deg)'
    lines[1].style.opacity = '0'
    lines[2].style.transform = 'translateY(-7.5px) rotate(-45deg)'
  } else {
    lines[0].style.transform = ''
    lines[1].style.opacity = ''
    lines[2].style.transform = ''
  }
})

// Close mobile nav on link click
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    overlay?.classList.remove('open')
    const lines = burger?.querySelectorAll('.burger-line')
    lines?.forEach(l => { l.style.transform = ''; l.style.opacity = '' })
  })
})

// ---- HERO SLIDER ----
new Swiper('#heroSlider', {
  modules: [Pagination, Autoplay, EffectFade],
  effect: 'fade',
  fadeEffect: { crossFade: true },
  autoplay: { delay: 4500, disableOnInteraction: false },
  pagination: { el: '.hero-pagination', clickable: true },
  loop: true,
  speed: 1000,
})

// ---- PLACES ACCORDION ----
const placeItems = document.querySelectorAll('.place-item')
placeItems.forEach(item => {
  const btn = item.querySelector('.place-question')
  btn?.addEventListener('click', () => {
    const isOpen = item.classList.contains('open')
    // Close all
    placeItems.forEach(i => {
      i.classList.remove('open')
      i.querySelector('.place-question')?.setAttribute('aria-expanded', 'false')
    })
    // Open clicked if it was closed
    if (!isOpen) {
      item.classList.add('open')
      btn.setAttribute('aria-expanded', 'true')
    }
  })
})

// ---- GALLERY SLIDER ----
new Swiper('#gallerySlider', {
  modules: [Navigation, Autoplay, Pagination],
  slidesPerView: 'auto',
  spaceBetween: 16,
  centeredSlides: false,
  navigation: {
    nextEl: '.gallery-btn-next',
    prevEl: '.gallery-btn-prev',
  },
  pagination: {
    el: '.gallery-pagination',
    clickable: true,
  },
  grabCursor: true,
  loop: true,
  autoplay: { delay: 3500, disableOnInteraction: false },
  breakpoints: {
    320: { spaceBetween: 12 },
    768: { spaceBetween: 16 },
  },
})

// ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href')
    if (href === '#') return
    const target = document.querySelector(href)
    if (target) {
      e.preventDefault()
      const offset = 80
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  })
})

// ---- REVEAL ON SCROLL ----
const revealEls = document.querySelectorAll(
  '.spec-card, .skipper-card, .place-item, .checklist-card, .tip-item, .glossary-group, .comfort-item'
)

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
)

revealEls.forEach((el, i) => {
  el.classList.add('reveal')
  el.style.transitionDelay = `${(i % 4) * 0.07}s`
  observer.observe(el)
})
