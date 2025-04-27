document.addEventListener('DOMContentLoaded', () => {
	const preloader = document.getElementById('preloader')
	const percentage = document.getElementById('loader-percentage')
	const progressBar = document.querySelector('.loader-progress')

	const assets =
		document.images.length + document.querySelectorAll('video').length
	let assetsLoaded = 0

	function assetLoaded() {
		assetsLoaded++
		let progress = Math.round((assetsLoaded / assets) * 100)
		percentage.textContent = progress + '%'
		progressBar.style.width = progress + '%'

		if (assetsLoaded === assets) {
			setTimeout(() => {
				preloader.style.opacity = '0'
				preloader.style.visibility = 'hidden'
			}, 500)
		}
	}

	document.querySelectorAll('img').forEach(img => {
		if (img.complete) {
			assetLoaded()
		} else {
			img.addEventListener('load', assetLoaded)
			img.addEventListener('error', assetLoaded)
		}
	})

	document.querySelectorAll('video').forEach(video => {
		if (video.readyState >= 3) {
			assetLoaded()
		} else {
			video.addEventListener('loadeddata', assetLoaded)
			video.addEventListener('error', assetLoaded)
		}
	})
})
// Функция для обновления грид-элементов
function updateGridItems() {
	const gridItems = document.querySelectorAll('.grid-item')
	const isMobile = window.innerWidth <= 768

	gridItems.forEach(item => {
		if (isMobile) {
			item.classList.add('fade-in-up')
		} else {
			item.classList.remove('fade-in-up')
		}
	})
}

// Инициализация Intersection Observer
let observer = null

function initObserver() {
	if (observer) {
		observer.disconnect()
	}

	observer = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible')
					observer.unobserve(entry.target)
				}
			})
		},
		{ threshold: 0.1 }
	)

	document.querySelectorAll('.fade-in-up').forEach(element => {
		observer.observe(element)
	})
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
	updateGridItems()
	initObserver()
})

// Обновление при изменении размера окна
window.addEventListener('resize', () => {
	updateGridItems()
	initObserver()
})
