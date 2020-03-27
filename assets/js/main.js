$(document).ready(function(){
	writeUsernameBlock();
	$('.signIn').click(function(){
		open('#signInBlock',0)
	})
	$('.register').click(function(){
		open('#registerBlock',0)
	})
	$('.formClose').click(function(){
		close('#signInBlock, #registerBlock')
	})
	.hover(function(){
		$(this).css({'cursor': 'pointer'})
	})

	var location = window.location.href;
	if(location.indexOf('index.html')!=-1){
		reviewsAjax();
		newsAjax();
		topReviewsAjax();
	}
	if(location.indexOf('reviews.html')!=-1){
		reviewsAjax();
	}
	if(location.indexOf('movies.html')!=-1){
		topMoviesAjax();
		moviesAjax();
		document.getElementById('sortMovies').addEventListener('change', sortMovies);
		document.getElementById('filterMovies').addEventListener('change', filterMovies);
		document.getElementById('searchMovies').addEventListener('click', function(e){ e.preventDefault(); searchMovies();});
		document.getElementById('searchInput').addEventListener('keyup', function(e){ if(e.keyCode == 13){searchMovies();}});
	}
	if(location.indexOf('watchlist.html')!=-1){
		writeWatchlist();
	}

	$('.close').hover(function(){
		$(this).children().first().stop(true, true).animate({height: '23px'}, 300);
		$(this).children().last().stop(true, true).animate({height: '30px'}, 300);
	},function(){
		$(this).children().first().stop(true, true).animate({height: '29px'}, 300);
		$(this).children().last().stop(true, true).animate({height: '25px'}, 300);
	});
			


	document.getElementById('dugmeRegister').addEventListener('click', proveraRegister);
	document.getElementById('dugmeSignIn').addEventListener('click', proveraSignIn);
	
})//ovo je kraj ready funkcije

function close(block){
	$(block).css({'visibility': 'hidden', 'width': '0%', 'height':'0%', 'top':'0%'})
	$('body').css({'overflow':'visible'})
}
function open(block, offset){
	$(block)
	.css({'visibility': 'visible', 'top':offset})
	.animate({'width':'100%', 'height': '100vh'}, 400)
	$('body').css({'overflow':'hidden'})
}

function proveraRegister(){
	var regexFullName = /^[A-Z][a-z]{2,20}(\s[A-Z][a-z]{2,20})+$/,
		regexUser = /^(?=.*[A-z])(?!\s)[A-z\d.?-]{3,25}$/,
		regexEmail = /^([A-z][A-z0-9-._]{2,35})\@([A-z]{3,10}\.[a-z]{2,5}(.[a-z]{2,5})?)$/,
		regexPassword = /^(?=.*[a-z])(?=.*\d)(?=.*[A-Z]).{3,30}$/;

	var fullName = document.getElementById("fullName"),
		username = document.getElementById("usernameRegister"),
		email = document.getElementById("emailRegister"),
		password = document.getElementById("passwordRegister"),
		passwordConfirm = document.getElementById("passwordConfirm");

	var fullNameValue = fullName.value.trim(),
		usernameValue = username.value.trim(),
		emailValue = email.value.trim(),
		passwordValue = password.value,
		passwordConfirmValue = passwordConfirm.value;

	valid= true;
	if(!(regexFullName.test(fullNameValue))){
		fullName.style.borderBottom = "2px solid #cf2525";
		valid = false;
	} else{
		fullName.style.borderBottom = "2px solid green";
	}

	if(!(regexUser.test(usernameValue))){
		username.style.borderBottom = "2px solid #cf2525";
		valid = false;
	} else{
		username.style.borderBottom = "2px solid green";
	}

	if(!(regexEmail.test(emailValue))){
		email.style.borderBottom = "2px solid #cf2525";
		valid = false;
	} else{
		email.style.borderBottom = "2px solid green";
	}

	if(!(regexPassword.test(passwordValue))){
		password.style.borderBottom = "2px solid #cf2525";
		valid = false;
	} else{
		password.style.borderBottom = "2px solid green";
	}

	if((passwordValue!=passwordConfirmValue)||(passwordConfirmValue=="")){
		passwordConfirm.style.borderBottom = "2px solid #cf2525";
		valid = false;
	} else{
		passwordConfirm.style.borderBottom = "2px solid green";
	}

	if(valid){
		localStorage.setItem("username", usernameValue);
		location.reload();
		
	} else{
		console.log("not")
	}
}
function proveraSignIn(){
	var regexUser = /^(?=.*[A-z])(?!\s)[A-z\d.?-]{3,25}$/,
		regexPassword = /^(?=.*[a-z])(?=.*\d)(?=.*[A-Z]).{3,30}$/;

	var username = document.getElementById("usernameSignIn"),
		password = document.getElementById("passwordSignIn");

	var usernameValue = username.value.trim(),
		passwordValue = password.value;

	valid= true;
	if(!(regexUser.test(usernameValue))){
		username.style.borderBottom = "2px solid #cf2525";
		valid = false;
	} else{
		username.style.borderBottom = "2px solid green";
	}
	if(!(regexPassword.test(passwordValue))){
		password.style.borderBottom = "2px solid #cf2525";
		valid = false;
	} else{
		password.style.borderBottom = "2px solid green";
	}

	if(valid){
		localStorage.setItem("username", usernameValue);
		location.reload();
	} else{
		console.log("not")
	}
}
function writeUsernameBlock(){
	if(localStorage.getItem("username")){
		document.getElementById('account').innerHTML = `
			<li id='user'>${localStorage.getItem("username")}&nbsp;&nbsp;<i class="fas fa-chevron-down"></i>
				<ul id='signOutBlock'>
					<li><a id='signOut'href='index.html'>Sign Out</a></li>
				<ul>
			</li>`;
		document.getElementById('signOut').addEventListener('click', function(){localStorage.clear()})
		$('#user').hover(function(){
			$('#signOutBlock').css({'display':'flex'});
		},
		function(){
			$('#signOutBlock').css({'display':'none'});
		})
	} else{
		document.getElementById('account').innerHTML = `
		<li></li>
		<li><a class="signIn" href="#">sign in</a></li>`;
	}
}


/*function sliderAjax(){
	getObj('indexSlider.json',function(data){
		slider(data,"indexSlider");
	});
}*/
function slider(photos, holder, folder){
	let block = '';
	let brojac=-1;
	for(element of photos){
		block += `
			<div class="indexSliderMovie">
				<img src="img/`+folder+`/${element.photo.source}" alt="${element.photo.source}"/>
			</div>
		`
	}
	automaticSlider()
	function automaticSlider(){
		document.getElementById(holder).innerHTML = block;
		var slidePhotos = document.getElementsByClassName('indexSliderMovie');
		brojac++;
		for(i=0; i<slidePhotos.length; i++){
			slidePhotos[i].classList.add('displayNone');
		}
		if(brojac==slidePhotos.length){brojac=0;}
		slidePhotos[brojac].classList.add('displayBlock');
		setTimeout(automaticSlider, 4000);
	}
}

function reviewsAjax(){
	getObj('reviews.json',function(data){
		writeReviews(data);
	});
}
function writeReviews(rev){
	let block = "";
	for(element of rev){
		block += `
			<div class="review">
				<div>
					<img src="img/movies/${element.photo.source}" alt="${element.alt}"/>
				</div>
				<div>
					<h4>${element.filmTitle}</h4>
					<a id="name" href="#">${element.name}</a>
					<p id="text">`
						var maxlength=290;
						if(element.text.length>maxlength){
							var string = (element.text).substring(0, maxlength);
							var stringMore = (element.text).substring(maxlength,element.text.length);
							block += 
								`${string}<span class="more-text">${stringMore}</span>
								<a href="#" class="showMore">...see more</a>`
						} else{
						 	block += `${element.text}`
						}
						block +=`
				</p>
				<p id="time">${element.time}</p>
			</div>
		</div>`
	}
	document.getElementById('reviewBlock').innerHTML = block;
	$('.showMore').click(function(e){
		e.preventDefault();
		showMore($(this));
	})
}
function showMore(obj){
	console.log(obj.prev())
	if(obj.prev().css('display')!='inline'){
		obj.prev().show(100)
		obj[0].textContent='see less'
	}
	else{
		obj.prev().hide(100)
		obj[0].textContent='...see more'
	}
}
function topReviewsAjax(){
	getObj('topReviewers.json', function(data){
		writeTopReviewers(data);
	})
}
function writeTopReviewers(reviewers){
	let block = "";
	for(element of reviewers){
		block +=
			`<div class="userIcon">
				<img src="img/users/${element.profilePhoto.source}" alt="${element.profilePhoto.alt}"/>
				<div>
					<h5>${element.username}</h5>
					<p>${element.reviews}&nbsp;reviews</p>
				</div>
			</div>`
	}
	document.getElementById('topReviewersBlock').innerHTML = block;
}


function newsAjax(){
	getObj('news.json', function(data){
		writeNews(data);
	})
}
function writeNews(news){
	let block="";
	for(element of news){
		block += `
		<div class="news">
			<a href="#"><img src="img/news/${element.photo.source}" alt="${element.photo.alt}"/></a>
			<div>
				<a href="#"><h3>${element.title}</h3></a>
				<p>${element.description}</p>
			</div>
		</div>`
	}
	document.getElementById('newsBlock').innerHTML = block;
}

function topMoviesAjax(){
	getObj('topMovies.json',function(data){
		slider(data,"topMoviesBlock","movies")
	});
}
function moviesAjax(){
	getObj('movies.json', function(data){
		writeMovies(data);
	})
}
function writeMovies(mov){
	let block= "";
	for(element of mov){
		block += movieBlock();
	}
	document.getElementById('moviesBlock').innerHTML = block;	
	$('.movie').click(function(){
		writeInfo($(this).attr('data-id'));
	})
}
function movieBlock(){
	return `
			<div class="movie" data-id="${element.id}">
				<img src="img/movies/${element.photo.source}" alt="${element.photo.alt}"/>
			</div>
		`
}


function getObj(file, func){
	$.ajax({
		url: "assets/data/"+file,
		method: "POST",
		type: "json",
		success: func,
		error(xhr,status,error){
			console.log(xhr);
			console.log(status);
			console.log(error);
		}
	});
}
function sortMovies(){
	var movies=[];
	var clicked = this.value;
	getObj("movies.json",function(data){
		movies = data;
		if(clicked == "newest"){
			movies.sort((a,b) => b.year - a.year);
			writeMovies(movies);
		}
		if(clicked=="oldest"){
			movies.sort((a,b) => a.year-b.year);
			writeMovies(movies);
		}
		if(clicked=="0"){
			movies.sort((a,b) => a.id - b.id);
			writeMovies(movies);
		}
	})
}
function filterMovies(){
	var clicked = this.value;
	getObj("movies.json",function(data){
		movies=data;
		if(clicked=='0'){
			writeMovies(movies)
		} else{
			movies = movies.filter(function(mov){
			for(genre of mov.genres){
				if(genre==clicked)
					return true;
				}
			})
			writeMovies(movies);
		}
	})
}

function writeInfo(id){
	var mov =[];
	getObj("movies.json",function(data){
		for(element of data){
			if(element.id==id){
				mov = element;
				break;
			}
		}
		let block = "";
		block += `
			<div class="infoMovie">
				<div class="close" id="infoClose">
					<span></span>
					<span></span>
				</div>
				<div id="infoDesc">
					<h2>${mov.title}&nbsp;&nbsp;&nbsp;&nbsp;${mov.year}</h2>
					<p>${mov.synopsis}<br/><br/>${mov.length}</p>`
					if(!localStorage.getItem('username')){
						block +=`<div class="watchlistIcon"><a href="#" class="signIn">Please sign in to add to your watchlist</a></div>`
					}
					else{
						block +=`<div class="watchlistIcon" id="addToWatchlist"><p>Add to your watchlist</p></div>`
					}
					block += `
					<div class="crewBlock">
						<ul id="directorsInfo">`
						element.crew.directors.length==1 ? block += `<p>Director<hr/></p>` : block += `<p>Directors<hr/></p>`
						for(crewMember of element.crew.directors){
							block += `<li>${crewMember}</li>`} 
					block +=`</ul>
						<ul id="producersInfo">`
						element.crew.producers.length==1 ? block += `<p>Producer<hr/></p>` : block += `<p>Producers<hr/></p>`
						for(crewMember of element.crew.producers){
							block += `<li>${crewMember}</li>`} 
					block +=`</ul>
						<ul id="writersInfo">`
						element.crew.producers.length==1 ? block += `<p>Writer<hr/></p>` : block += `<p>Writers<hr/></p>`
						for(crewMember of element.crew.writers){
							block += `<li>${crewMember}</li>`} 
					block +=`</ul>
						<ul id="cinematographyInfo"><p>Cinematography<hr/></p>`
						for(crewMember of element.crew.cinematography){
							block += `<li>${crewMember}</li>`} 
					block +=`</ul></div>
				</div>
				<div id="infoPhoto"><img src="img/movies/${mov.photo.source}" alt="${mov.photo.alt}"/></div>
			</div>
		`
		document.getElementById('infoBlock').innerHTML= block;
		var scrollTop = $(window).scrollTop();
		open('#infoBlock',scrollTop);
		$('.signIn').click(function(){
			open('#signInBlock',0)
		})
		$('#infoClose').click(function(){
			close('#infoBlock');
		})
		.hover(function(){
			$(this).children().first().stop(true, true).animate({height: '23px'}, 300);
			$(this).children().last().stop(true, true).animate({height: '30px'}, 300);
		},function(){
			$(this).children().first().stop(true, true).animate({height: '29px'}, 300);
			$(this).children().last().stop(true, true).animate({height: '25px'}, 300);
		});
		$('#addToWatchlist').click(function(){
			addToWatchlist(id);
		});
	})
}


function getWatchlistMovies(){

	return JSON.parse(localStorage.getItem("watchlist"));
}
function addFirstMovieWatchlist(id){
	let watchlist = [];
	watchlist[0] = {
		id: id
	}
	alert('Added to your watchlist!')
	localStorage.setItem('watchlist', JSON.stringify(watchlist));
}
function addToWatchlist(id){
	if(!localStorage.getItem('watchlist')){
		addFirstMovieWatchlist(id)
	}
	else{
		watchlist = getWatchlistMovies();
		for(element of watchlist){
			if(element.id==id){
				alert('Movie already in watchlist');
				var check=1;
				break;
			}
		}
		if(!check){
			var added = {
				id: id
			} 
			watchlist.push(added);
			localStorage.setItem('watchlist', JSON.stringify(watchlist));
			alert('Added to your watchlist!')
		}
	}
}
function writeWatchlist(){
	let watchlist = getWatchlistMovies();
	if(!watchlist){
		let block=`<div id="watchlistEmpty">
			<h4>HOW TO ADD</h4>
			<p>Add films you want to see to your watchlist from the
		 icon on each film poster. Click <a href="movies.html">here</a> to choose movies!</p>
		<div>`
		document.getElementById('watchlistBlock').innerHTML = block;
	}
	else{
		getObj('movies.json',function(data){
			let block = "";
			let movies =[];
			for(element of watchlist){
				for(mov of data){
					if(element.id==mov.id){
						movies.push(mov);
						break;
					}
				}
			}
			for(element of movies){
				block +=`
					<div class="watchlistMovie" data-id="${element.id}">
						<img src="img/movies/${element.photo.source}" alt="${element.photo.alt}"/>
						<div class="remove">
							<div class="removeFromWatchlist close" data-id="${element.id}"><span></span><span></span></div>
							<p>&nbsp;remove from watchlist</p>
						</div>
					</div>`
			}
			document.getElementById('watchlistBlock').innerHTML = block;
			$('.removeFromWatchlist').click(function(){
				removeFromWatchlist($(this).attr('data-id'));
			})
		})
	}
}
function removeFromWatchlist(id){
	let watchlist = getWatchlistMovies()
	watchlist = watchlist.filter(wl => wl.id != id)
	if(watchlist.length == 0){
		localStorage.removeItem("watchlist");
		location.reload();
	} else{
		localStorage.setItem('watchlist', JSON.stringify(watchlist))
		location.reload();
	}
}

function searchMovies(){
	var text = $('#searchInput').val().toLowerCase();
	getObj('movies.json', function(data){
		var movies = data;
		var searchedMovies = [];
		for(element of movies){
			if((element.title.toLowerCase()).indexOf(text)!=-1){
				searchedMovies.push(element);
			}
		}
		if(searchedMovies.length==0){
			document.getElementById('moviesBlock').innerHTML = "<p class='error'>Sorry, we couldn't find any matches.</p>";
		} else{
			writeMovies(searchedMovies);
		}
	})
}


//use this for sorting with only the movies shown
/*let movies = document.getElementsByClassName('movie');
	let moviesId = [];
	for(element of movies){
		moviesId.push($(element).attr('data-id'))
	}*/