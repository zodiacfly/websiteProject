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
	var picFrame = about.querySelector('.pic-one');

	//set header nav event------------------------------------------------------------
	function setHeaderNavEvent(){
		function addClickHandle(){
			for (var i = 0; i < upper.length; i++) {
				upper[i].style.width = '';
			}
			num = this.index;
			upper[this.index].style.width = '100%';
			indicator.style.left = navList[this.index].offsetLeft + navList[this.index].offsetWidth/2 + 'px';
			lastPosition = navList[this.index].offsetLeft + navList[this.index].offsetWidth/2;
			contentUl.style.top = -this.index*(document.documentElement.clientHeight - header.offsetHeight) + 'px';
		}

		function addMouseoverHandle(){
			indicator.style.left = navList[this.index].offsetLeft + navList[this.index].offsetWidth/2 + 'px';
		}

		function addMouseoutHandle(){
			indicator.style.left = lastPosition + 'px';
		}
		for (var i = 0; i < navList.length; i++) {

			navList[i].index = i;
			navList[i].addEventListener('click',addClickHandle);
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
					num--;
					for (var i = 0; i < upper.length; i++) {
						upper[i].style.width = '';
					}
					upper[num].style.width = '100%';
					contentUl.style.top = -num*(document.documentElement.clientHeight - header.offsetHeight) + 'px';
					indicator.style.left = navList[num].offsetLeft + navList[num].offsetWidth/2 + 'px';
					lastPosition = navList[num].offsetLeft + navList[num].offsetWidth/2;
				}
			} else if(direct == 'down'){
				if(num < contentList.length - 1){
					num++;
					for (var i = 0; i < upper.length; i++) {
						upper[i].style.width = '';
					}
					upper[num].style.width = '100%';
					contentUl.style.top = -num*(document.documentElement.clientHeight - header.offsetHeight) + 'px';
					indicator.style.left = navList[num].offsetLeft + navList[num].offsetWidth/2 + 'px';
					lastPosition = navList[num].offsetLeft + navList[num].offsetWidth/2;
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
		function sliderAutoPlayEvent(){
			clearInterval(sliderTimeId);
			sliderTimeId = setInterval(autoPlay,2000);
		}

		sliderAutoPlayEvent();

		home.onmouseover = function(){
			clearInterval(sliderTimeId);
		}

		home.onmouseout = sliderAutoPlayEvent;
	}
	setHomeSliderEvent();
	//set pic amination for about section-------------------------------------------
	function setAboutPicEvent(){

		var listWidth = picFrame.clientWidth/2;
		var listHeight = picFrame.clientHeight/2;

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
	
}
