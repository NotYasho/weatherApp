firstTime = true;
h2 = document.querySelector('h2');
h1 = document.querySelector('h1');
submit = document.querySelector('#submit');
body = document.querySelector('body');
inputBox = document.querySelector('header input');
mainTemp = document.querySelector('.temp');
mainCity = document.querySelector('.location .city');
date = document.querySelector('.date');
weather = document.querySelector('.weather');
maxMin = document.querySelector('.high-low');
header = document.querySelector('header');

console.log("Time:", dayOrNight())

if (firstTime) {
	const cities = [
		'London',
		'New York',
		'Paris',
		'Tokyo',
		'Sydney',
		'Berlin',
		'Rome',
		'Madrid',
		'Moscow',
		'Dubai',
		'Shanghai',
		'Beijing',
		'Seoul',
		'Hong Kong'
	];
	h2.innerHTML = `Try typing a city name, like ❝${choice(cities)}❞`;
	if (dayOrNight() === 'day') {
		const img = choice([
			'morning.jpg',
			'morning-2.png',
			'morning-3.jpg'
		]);
		body.style.backgroundImage = `url("./images/${img}")`;
	}
	else if (dayOrNight() === 'night') {
		const img = choice([
			'night.jpg',
			'night-2.jpg',
			'night-3.jpg'
		]);
		body.style.backgroundImage = `url("./images/${img}")`;
	}
	else {
		const img = choice([
			'normal.jpg',
			'normal-1.jpg',
			'normal-2.jpg'
		]);
		body.style.backgroundImage = `url("./images/${img}")`;
	}
}
inputBox.addEventListener('keyup', function(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		submit.click();
	}
});

function getWeather() {
	// Please don't steal plsplspls
	// Get your api key from https://home.openweathermap.org/users/sign_up
	const apiKey = "yourApiKeyHere";
	if (inputBox.value == '') {
		inputBox.classList.add('shake');
		setTimeout(function() {
			inputBox.classList.remove('shake');
		}, 300);
		return;
	}
	else {
		fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputBox.value}&appid=${apiKey}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data.cod);
				if (data.cod === '404') {
					inputBox.value = null;
					inputBox.placeholder = 'City not found :(';
					document.documentElement.style.setProperty('--placeholder', '#b0003ba6');
					inputBox.style.border = '#871e41 1px solid';
					return;
				}
				h1.innerHTML = null;
				h2.innerHTML = null;
				inputBox.style.border = 'none';
				document.documentElement.style.setProperty('--placeholder', 'rgba(0, 0, 0, 0.651)');
				inputBox.placeholder = 'Search for a city';
				header.style.padding = '15vh 15px 15px';

				const temperature = Math.round(data.main.temp - 273.15);
				if (firstTime) {
					firstTime = false;
					mainTemp.innerHTML = `${temperature}&deg;`;
					mainCity.innerHTML = data.name;
					date.innerHTML = new Date().toDateString();
					weather.innerHTML = data.weather[0].main;
					maxMin.innerHTML = `${Math.round(data.main.temp_max - 273.15)}&deg; / ${Math.round(
						data.main.temp_min - 273.15
					)}&deg;`;
				}
				else {
					mainTemp.innerHTML = `${Math.round(data.main.temp - 273.15)}&deg;`;
					mainCity.innerHTML = data.name;
					date.innerHTML = new Date().toDateString();
					weather.innerHTML = data.weather[0].main;
					maxMin.innerHTML = `${Math.round(data.main.temp_max - 273.15)}&deg; / ${Math.round(
						data.main.temp_min - 273.15
					)}&deg;`;
				}
				if (temperature < 5) {
					const veryColdImages = [
						'images/veryCold-1.jpg',
						'images/veryCold-2.jpg',
						'images/veryCold-3.jpg'
					];

					body.style.backgroundImage = `url("${choice(veryColdImages)}")`;
				}
				else if (temperature >= 5 && temperature < 10) {
					const coldImages = [
						'images/cold-1.jpg',
						'images/cold-2.jpg',
						'images/cold-3.png'
					];
					body.style.backgroundImage = `url('${choice(coldImages)}')`;
				}
				else if (temperature >= 10 && temperature < 30) {
					const mediumImages = [
						'images/mild-1.jpg',
						'images/mild-2.jpg',
						'images/mild-3.jpg',
						'images/mild-4.jpg'
					];
					body.style.backgroundImage = `url('${choice(mediumImages)}')`;
				}
				else if (temperature >= 30) {
					const hotImages = [
						'images/warm-1.jpg',
						'images/warm-2.jpg',
						'images/warm-3.jpg',
						'images/warm-4.jpg'
					];
					body.style.backgroundImage = `url('${choice(hotImages)}')`;
				}
			});
	}
}

function choice(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function dayOrNight() {
	const currentTime = new Date();
	var hours = currentTime.getHours();
	if (hours >= 5 && hours <= 12) {
		return 'day';
	}
	else if (hours >= 13 && hours <= 18) {
		return 'mild';
	}
	else {
		return 'night';
	}
}
