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
	//set header nav event------------------------------------------------------------
	function setHeaderNavEvent(){
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
}
