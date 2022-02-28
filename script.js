// NAVBAR hamburger sidebar for mobiles
const burg = document.querySelector(".hamburger")
const mob_menu = document.querySelector(".mobile-nav")

burg.addEventListener("click", function () {
	burg.classList.toggle("is-active")
	mob_menu.classList.toggle("is-active")
})

//active section

menu_items = document.querySelectorAll(".menu-item")
menu_items.forEach(function (item) {
	item.addEventListener("click", function () {
		let active = item.parentNode.querySelector(".menu-item.is-active")
		if (active !== null) {
			active.classList.remove("is-active")
		}
		item.classList.add("is-active")
	})
})

// Popup
const modal = document.querySelector(".modal")
const overlay = document.querySelector(".overlay")
const btnCloseModal = document.querySelector(".close-modal")

const btnsOpenModal = document.querySelectorAll(".show-modal")

btnsOpenModal.forEach(function (btn) {
	btn.addEventListener("click", function () {
		modal.classList.remove("hidden")
		overlay.classList.remove("hidden")
	})
})
btnCloseModal.addEventListener("click", function () {
	modal.classList.add("hidden")
	overlay.classList.add("hidden")
})

//Carousel

const next_btn = document.querySelector("#next")
const prev_btn = document.querySelector("#prev")
const slider = document.querySelector(".slider")
let first_slide
let last_slide
let slides = [
	{
		title: "To create nationwide awareness, ownership and participation across various skills.",
		image: "./images/slider/slide-1.jpg",
	},
	{
		title: "To help Indian youth attain world class standards of competence, excellence and productivity.",
		image: "./images/slider/slide-2.jpg",
	},
	{
		title: "Platform where emerging professionals can display their workplace skills with utmost perfection and make India proud.",
		image: "./images/slider/slide-3.jpg",
	},
]

slides.forEach(({ title, image }, i) => {
	const slide = document.createElement("div")
	slide.classList.add("slider__slide")
	slide.style.backgroundImage = "url('" + image + "')"
	if (i == 0) {
		first_slide = slide

		slide.classList.add("active")
	}

	if (i + 1 == slides.length) {
		last_slide = slide
	}

	const slide_content = document.createElement("div")
	slide_content.classList.add("slider__content")

	const content_title = document.createElement("h3")
	content_title.classList.add("slider__title")
	content_title.textContent = title

	slide_content.appendChild(content_title)
	slide.appendChild(slide_content)
	slider.appendChild(slide)
})

next_btn.addEventListener("click", () => {
	const active_slide = document.querySelector(".slider__slide.active")
	let sibling = active_slide.nextElementSibling
	if (sibling == null) {
		sibling = first_slide
	}

	if (sibling.classList.contains("slider__slide")) {
		active_slide.classList.remove("active")
		sibling.classList.add("active")
	}
})
prev_btn.addEventListener("click", () => {
	const active_slide = document.querySelector(".slider__slide.active")
	let sibling = active_slide.previousElementSibling
	if (sibling == null || !sibling.classList.contains("slider__slide")) {
		sibling = last_slide
		console.log(sibling)
	}

	if (sibling.classList.contains("slider__slide")) {
		active_slide.classList.remove("active")
		sibling.classList.add("active")
	}
})

//Scroll Animation
window.addEventListener("DOMContentLoaded", setup)

function setup() {
	const options = {
		rootMargin: "0px 0px 0px 0px",
	}
	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("show")
				observer.unobserve(entry.target)
			} else {
				return
			}
		})
	}, options)

	const anim = document.querySelectorAll(".anim")
	anim.forEach(function (el) {
		observer.observe(el)
	})
}

//Countdown

let launchDate = new Date("Mar 9, 2022 10:00:00").getTime()

let timer = setInterval(tick, 1000)

function tick() {
	let now = new Date().getTime()
	let t = launchDate - now

	if (t > 0) {
		let hours = Math.floor(t / (1000 * 60 * 60))
		let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))
		let seconds = Math.floor((t % (1000 * 60)) / 1000)

		// document.getElementById('hours').innerHTML = hours;
		// document.getElementById('minutes').innerHTML = minutes;
		// document.getElementById('seconds').innerHTML = seconds;

		let time = `${hours} : ${minutes} : ${seconds}`

		document.querySelector(".countdown").innerHTML = time
	}
}

const form = document.querySelector("#form")
const phone = document.querySelector("#phone")

let f = True

// Show error
function showError(input, message) {
	const formControl = input.parentElement
	formControl.className = "input-box error"
	const small = formControl.querySelector("small")
	small.innerHTML = message
}

//Show success message
function showSuccess(input) {
	const formControl = input.parentElement
	formControl.className = "input-box success"
}

function checkLength(input, length) {
	const len = input.value.length
	if (len === length) {
		showSuccess(input)
	} else {
		showError(input, `Please enter valid 10 digit long phone number`)
		f = False
	}
}
form.addEventListener("submit", function (e) {
	e.preventDefault()
	checkLength(phone, 10)
	if (f) {
		btn = document.querySelector("#submit-btn")
		btn.innerHTML = "You have been registered"
		btn.style.backgroundColor = "green"
	}
})
