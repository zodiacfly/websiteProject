function addLoadEvent(func){
	var oldLoad = window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	} else {
		window.onload = function(){
			oldLoad();
			func();
		}
	}
}
addLoadEvent(setMainEvent)

function setMainEvent(){
	var indicator = document.querySelector('.indicator');
	var navList = document.querySelectorAll('#header > .main-header > nav > ul > li');
	var upper = document.querySelectorAll('.upper');
	var content = document.querySelector('.content');
	var contentUl = document.querySelector('.content > ul');
	var contentList = document.querySelectorAll('.content > ul > li');
	var header = document.querySelector('#header');
	var num = 0;
	
	content.style.height = document.documentElement.clientHeight - header.offsetHeight + 'px';
	indicator.style.left = navList[0].offsetLeft + navList[0].offsetWidth/2 +'px';
	upper[0].style.width = '100%';
	var lastPosition =  navList[0].offsetLeft + navList[0].offsetWidth/2;

	var home = document.querySelector('.home');
	var homeSliderUL =document.querySelector('.home-slider');
	var homeSlideList= homeSliderUL.querySelectorAll('li');
	var homeButtonUL= document.querySelector('.home-button');
	var homeButtonList = homeButtonUL.querySelectorAll('li');

	var about = document.querySelector('.about');
	var aboutUL = about.querySelectorAll('ul');
	var picFrame1 = about.querySelector('.pic-one');
	var picFrame2 = about.querySelector('.pic-two');

	var sideNavList = document.querySelectorAll('.content > .side-nav-dot li');
	var teamList = document.querySelectorAll('.team-list > ul >li');
	var teamTitle = document.querySelector('.team-title');
	var teamText = document.querySelector('.team-text');
	var lastAminationIndex = 0;
	var aminationArr = [
			{
				start:function(){
					homeSliderUL.style.transform = 'translateY(0)';
					homeButtonUL.style.transform = 'translateY(0)';
					homeSliderUL.style.opacity = 1;
				},
				end:function(){
					homeSliderUL.style.transform = 'translateY(-800px)';
					homeButtonUL.style.transform = 'translateY(300px)';
					homeSliderUL.style.opacity = 0;
				}
			},
			{
				start:function(){
					var plane1 = document.querySelector('.course-plane1');
					var plane2 = document.querySelector('.course-plane2');
					var plane3 = document.querySelector('.course-plane3');
					plane1.style.top = '';
					plane1.style.left = '';
					plane2.style.top = '';
					plane2.style.left = '';
					plane3.style.top = '';
					plane3.style.left = '';
				},
				end:function(){
					var plane1 = document.querySelector('.course-plane1');
					var plane2 = document.querySelector('.course-plane2');
					var plane3 = document.querySelector('.course-plane3');
					plane1.style.top = -300 + 'px';
					plane1.style.left = 200 + 'px';
					plane2.style.top = 300 + 'px';
					plane2.style.left = -250 + 'px';
					plane3.style.top = 300 + 'px';
					plane3.style.left = 500 + 'px';

				}
			},
			{
				start:function(){
					var pencil1 = document.querySelector('.works-pencil1');
					var pencil2 = document.querySelector('.works-pencil2');
					var pencil3 = document.querySelector('.works-pencil3');
					pencil1.style.top = '';
					pencil2.style.top = '';
					pencil3.style.top = '';
				},
				end:function(){
					var pencil1 = document.querySelector('.works-pencil1');
					var pencil2 = document.querySelector('.works-pencil2');
					var pencil3 = document.querySelector('.works-pencil3');
					pencil1.style.top = -100 + 'px';
					pencil2.style.top = 350 + 'px';
					pencil3.style.top = 400 + 'px';
				}
			},
			{
				start:function(){
					picFrame1.style.transform = '';
					picFrame2.style.transform = '';
				},
				end:function(){
					picFrame1.style.transform = 'rotate(45deg)';
					picFrame2.style.transform = 'rotate(-45deg)';
				}
			},
			{
				start:function(){
					teamText.style.transform = '';
					teamTitle.style.transform = '';
				},
				end:function(){
					teamText.style.transform = 'translateX(200px)';
					teamTitle.style.transform = 'translateX(-200px)';
				}
			}
		];

	var music = document.querySelector('.header-music');
	var audioObj = document.querySelector('.header-music > audio');

	var mask = document.querySelector('.mask');
	var maskUpper = mask.querySelector('.mask-upper');
	var maskLower = mask.querySelector('.mask-lower');
	var maskLine = mask.querySelector('.mask-line');

	function addSideNavAndTopNavClickHandle(num){
		for (var i = 0; i < sideNavList.length; i++) {
			sideNavList[i].classList.remove('side-nav-current');
			upper[i].style.width = '';
		}
		
		sideNavList[num].classList.add('side-nav-current');
		upper[num].style.width = '100%';
		indicator.style.left = navList[num].offsetLeft + navList[num].offsetWidth/2 + 'px';
		lastPosition = navList[num].offsetLeft + navList[num].offsetWidth/2;
		contentUl.style.top = -num*(document.documentElement.clientHeight - header.offsetHeight) + 'px';

		if(aminationArr[num] && typeof aminationArr[num].start == 'function' ){
			aminationArr[num].start();
		}
		if(aminationArr[lastAminationIndex] && typeof aminationArr[lastAminationIndex].end == 'function' && lastAminationIndex != num ){
			aminationArr[lastAminationIndex].end();
		}
	}

	// set amination for opening the website-------------------------------------
	function setOnLoadAmination(){
		var loadPicArr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg','worksimg3.jpg','worksimg4.jpg','team.png'];
		var flag = 0;
		for (var i = 0; i < loadPicArr.length; i++) {
			var img = new Image();
			img.onload = function(){
				flag++;
				maskLine.style.width = flag/loadPicArr.length*100 + '%';
			}
			img.src = 'images/' + loadPicArr[i];
		}
		maskLine.addEventListener('transitionend',function(){
			if(flag == loadPicArr.length){
				this.style.display = 'none';
				maskUpper.style.height = 0;
				maskLower.style.height = 0;
			}

		})
		maskUpper.addEventListener('transitionend',function(){
			setHomeSliderEvent();
			aminationArr[0].start();
			mask.remove();
		})
	}
	setOnLoadAmination();

	//background music--------------------------------------------------------
	function setMusicPlayEvent(){
		
		music.addEventListener('click',addMusicClickHandle)

		function addMusicClickHandle(){
			if(audioObj.paused){
				audioObj.play();
				music.style.background = 'url(images/musicon.gif) no-repeat';
			} else {
				audioObj.pause();
				music.style.background = 'url(images/musicoff.gif) no-repeat';
			}
		}
	}
	setMusicPlayEvent();

	//set initial amination position for each section------------------------
	function setInitAminationPosition(){
		for (var i = 0; i < aminationArr.length; i++) {
			aminationArr[i].end();
		}	
	} 
	setInitAminationPosition();
	
	//set side nav ---------------------------------------------------------
	function setSideNavEvent(){
		for (var i = 0; i < sideNavList.length; i++) {
			sideNavList[i].index = i;
			sideNavList[i].onclick = function(){
				lastAminationIndex = num;
				num = this.index;
				addSideNavAndTopNavClickHandle(num);
			}
		}	
	}
	setSideNavEvent()

	//set header nav event------------------------------------------------------------
	function setHeaderNavEvent(){
		
		function addMouseoverHandle(){
			indicator.style.left = navList[this.index].offsetLeft + navList[this.index].offsetWidth/2 + 'px';
		}

		function addMouseoutHandle(){
			indicator.style.left = lastPosition + 'px';
		}

		for (var i = 0; i < navList.length; i++) {
			navList[i].index = i;
			navList[i].onclick = function(){
				lastAminationIndex = num;
				num = this.index;
				addSideNavAndTopNavClickHandle(num);
			};
			navList[i].addEventListener('mouseover',addMouseoverHandle);
			navList[i].addEventListener('mouseout',addMouseoutHandle);
		}
	}
	setHeaderNavEvent();	

	//set height for content part-------------------------------------------------------
	function setContentHeight(){
		for (var i = 0; i < contentList.length; i++) {
			contentList[i].style.height = document.documentElement.clientHeight - header.offsetHeight + 'px';
		}
		window.onresize = function(){
			content.style.height = document.documentElement.clientHeight - header.offsetHeight + 'px';
			contentUl.style.top = -num*(document.documentElement.clientHeight - header.offsetHeight) + 'px';
			indicator.style.left = navList[num].offsetLeft + navList[num].offsetWidth/2 + 'px';
			lastPosition = navList[num].offsetLeft + navList[num].offsetWidth/2;
			for (var i = 0; i < contentList.length; i++) {
				contentList[i].style.height = document.documentElement.clientHeight - header.offsetHeight + 'px';
			}
		}
	}
	setContentHeight();
	
	//set wheel event-----------------------------------------------------------------
	function setWheelScrollEvent(){
		var timeId;
		function myWheel(e){
			var direct = 0;
			if(e.wheelDelta){
				direct = e.wheelDelta > 0 ? 'up' : 'down';
			} else if(e.detail){
				direct = e.detail < 0? 'up' : 'down';
			}
			if(direct == 'up'){
				if(num > 0){
					lastAminationIndex = num;
					num--;
					addSideNavAndTopNavClickHandle(num);
				}
			} else if(direct == 'down'){
				if(num < contentList.length - 1){
					lastAminationIndex = num;
					num++;
					addSideNavAndTopNavClickHandle(num);
				}
			}
		}
		//for firefox--------------------------
		if(content.addEventListener){
			content.addEventListener('DOMMouseScroll',function(e){
				e = e || event;
				//set lock to prevent wheel scroll too fast----------------------
				clearTimeout(timeId);
				timeId = setTimeout(function(){
					myWheel(e);
				},150)	
			});
		}
		//for ie, chrome--------------------------------
		content.onmousewheel = function(e){
			e = e || event;
			//set lock to prevent wheel scroll too fast----------------------
			clearTimeout(timeId);
			timeId = setTimeout(function(){
				myWheel(e);
			},150)	
		};		
	}
	setWheelScrollEvent();

	//set slider event for home section--------------------------------------------
	function setHomeSliderEvent(){
		var oldIndex = 0;
		var autoIndex = 0;
		var sliderTimeId;
		var buttonTimeId;
		var flag = true;
		for (var i = 0; i < homeButtonList.length; i++) {
			homeButtonList[i].index = i;
			homeButtonList[i].onclick = function(){
				var that = this;
				addHomeButtonClickHandle(that);
				clearTimeout(buttonTimeId);
				buttonTimeId = setTimeout(function(){
					flag = true;
				},1500)
			}	
		}
		
		function addHomeButtonClickHandle(that){
			if(flag){
				for (var j = 0; j < homeButtonList.length; j++) {
					homeButtonList[j].classList.remove('slider-button-current');
				}
				that.classList.add('slider-button-current');

				if(oldIndex < that.index){
					homeSlideList[that.index].classList.add('slider-right-display');
					homeSlideList[that.index].classList.remove('slider-left-display');
					homeSlideList[that.index].classList.remove('slider-right-hide');
					homeSlideList[that.index].classList.remove('slider-left-hide');

					homeSlideList[oldIndex].classList.add('slider-left-hide');
					homeSlideList[oldIndex].classList.remove('slider-left-display');
					homeSlideList[oldIndex].classList.remove('slider-right-hide');
					homeSlideList[oldIndex].classList.remove('slider-right-display');
				}
				if(oldIndex > that.index){
					homeSlideList[that.index].classList.add('slider-left-display');
					homeSlideList[that.index].classList.remove('slider-right-hide');
					homeSlideList[that.index].classList.remove('slider-left-hide');
					homeSlideList[that.index].classList.remove('slider-right-display');

					homeSlideList[oldIndex].classList.add('slider-right-hide');
					homeSlideList[oldIndex].classList.remove('slider-left-hide');
					homeSlideList[oldIndex].classList.remove('slider-left-display');
					homeSlideList[oldIndex].classList.remove('slider-right-display');
				}
				oldIndex = that.index;
				autoIndex = that.index;
				flag = false;
			}
		}
		function autoPlay(){
			autoIndex++;
			if(autoIndex == homeSlideList.length){
				autoIndex = 0;
			}
			for (var i = 0; i < homeButtonList.length; i++) {
				homeButtonList[i].classList.remove('slider-button-current');
			}
			homeButtonList[autoIndex].classList.add('slider-button-current');

			homeSlideList[autoIndex].classList.add('slider-right-display');
			homeSlideList[autoIndex].classList.remove('slider-left-display');
			homeSlideList[autoIndex].classList.remove('slider-right-hide');
			homeSlideList[autoIndex].classList.remove('slider-left-hide');

			homeSlideList[oldIndex].classList.add('slider-left-hide');
			homeSlideList[oldIndex].classList.remove('slider-left-display');
			homeSlideList[oldIndex].classList.remove('slider-right-hide');
			homeSlideList[oldIndex].classList.remove('slider-right-display');

			oldIndex = autoIndex;
		}
		function setSliderAutoPlayEvent(){
			clearInterval(sliderTimeId);
			sliderTimeId = setInterval(autoPlay,2500);
		}

		setSliderAutoPlayEvent();

		home.onmouseenter = function(){
			clearInterval(sliderTimeId);
		}

		home.onmouseleave = setSliderAutoPlayEvent;
	}//will trigger in setOnLoadAmination()-------------------------------------
	
	//set pic amination for about section-------------------------------------------
	function setAboutPicEvent(){

		var listWidth = picFrame1.clientWidth/2;
		var listHeight = picFrame1.clientHeight/2;

		for (var i = 0; i < aboutUL.length; i++) {

			var src = aboutUL[i].dataset['picSrc'];

			for (var j = 0; j < 4; j++) {
				var liObj = document.createElement('li');
				var imgObj = document.createElement('img');
				liObj.style.width = listWidth + 'px';
				liObj.style.height = listHeight + 'px';
				imgObj.style.left= -(j%2)*listWidth+"px";
				imgObj.style.top=  -Math.floor(j/2)*listHeight+"px";
				imgObj.src = src;
				liObj.appendChild(imgObj);
				aboutUL[i].appendChild(liObj);
			}

			aboutUL[i].onmouseover = addMouseoverHandle;
			aboutUL[i].onmouseout = addMouseoutHandle;

		}

		function addMouseoverHandle(){
			var imgList = this.querySelectorAll('img');
			imgList[0].style.top = listHeight + 'px';
			imgList[1].style.left = -listWidth*2 + 'px';
			imgList[2].style.left = listWidth + 'px';
			imgList[3].style.top = -listHeight*2 + 'px';
		}
		function addMouseoutHandle(){
			var imgList = this.querySelectorAll('img');
			imgList[0].style.top = 0 + 'px';
			imgList[1].style.left = -listWidth + 'px';
			imgList[2].style.left = 0 + 'px';
			imgList[3].style.top = -listHeight + 'px';
		}
	}
	setAboutPicEvent();

	//set team section event------------------------------------------------------
	function setTeamSectionEvent(){
		for (var i = 0; i < teamList.length; i++) {
			teamList[i].onmouseenter = function(){
				for (var j = 0; j < teamList.length; j++) {
					teamList[j].style.opacity = 0.5;
				}
				this.style.opacity = 1;
			}

			teamList[i].onmouseleave = function(){
				for (var j = 0; j < teamList.length; j++) {
					teamList[j].style.opacity = '';
				}
			}
		}
	}
	setTeamSectionEvent();
	
}
