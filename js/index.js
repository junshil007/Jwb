window.onload = function(){
	
	var oNav = $$('nav');
	var oList = $$('list');
	var oContent = $$('content');
	var aLiNav = oNav.getElementsByTagName('a');
	var aLiList = getByClass( oList , 'liList' );
	var aDivList = getByClass( oList , 'divList' );

    var oBus1Content = $$('bus1');
    var oBus2Content = $$('bus2');
    var oBus3Content = $$('bus3');
    var oBus4Content = $$('bus4');
    var oBus5Content = $$('bus5');
    var oBus6Content = $$('bus6');
    var oAbout7Content = $$('about7');
	
//	var oMenu = $$('menu');
//	var aLiMenu = oMenu.getElementsByTagName('li');
	var oLoading = $$('loading');
	
	var iNow = 0;
	var prevIndex = 0;
	var iContentHeight = 0;
	
	showLoading();
	contentAuto();
	listContentAuto();
	bindNav();
	mouseWheel();
	
	function showLoading(){
		var oSpan = oLoading.getElementsByTagName('span')[0];
		var aDiv = oLoading.getElementsByTagName('div');
        var arr = ['jwb_0_bj.jpg','jwb_1_bj.jpg','about_midbg.jpg','bg4.jpg','business_bg1.jpg','business_bg2.jpg','business_bg3.jpg','business_bg4.jpg','business0.jpg','business0_up.png','jwb.png','logo.png','logo_small.png','next.png','sign.png'];
        var iNow = 0;
		
		for(var i=0;i<arr.length;i++){			
			var objImg = new Image();
			objImg.src = 'images/'+arr[i];
			objImg.onload = function(){
				iNow++;
				oSpan.style.width = iNow/arr.length*100 + '%';
			};			
		}
		oSpan.addEventListener('webkitTransitionend',spanChange,false);
		oSpan.addEventListener('transitionend',spanChange,false);
		
		function spanChange(){
			if(oSpan.style.width == '100%'){
				oSpan.style.display = 'none';
				aDiv[0].style.height = 0;
				aDiv[1].style.height = 0;
			}
		}
		
		aDiv[0].addEventListener('webkitTransitionend',divChange,false);
		aDiv[0].addEventListener('transitionend',divChange,false);
		
		
		function divChange(){
			oLoading.parentNode.removeChild(oLoading);
			cjAnimate[0].inAn();
		}
		myfun();	
	}
	
	function bindNav(){    
        
		var oDiv = aLiNav[0].getElementsByTagName('div')[0];// 得到第一个
		oDiv.style.width = '100%';
		
		for(var i=0; i<4 ;i++){          
            var j = 0;
            
            if(i==0){
                j = 6;
            }else if(i==1){
                j = 2;    
            }else if(i==2){
                j = 1; 
            }else if(i==3){
                j = 0; 
            }
			aLiNav[i].index = j;            
			aLiNav[i].onmousedown = function(){
				prevIndex = iNow;
				iNow = this.index;
				toMove( this.index );
			};
		}
        
//		for(var i=0;i<aLiMenu.length;i++){
//			aLiMenu[i].index = i;
//			aLiMenu[i].onclick = function(){
//				prevIndex = iNow;
//				iNow = this.index;
//				toMove( this.index );
//			};
//		}
	}
	
	function toMove(index){
		
//		for(var i=0;i<aLiNav.length;i++){
//			var oDiv = aLiNav[i].getElementsByTagName('div')[0];
//			oDiv.style.width = '';
//		}
//		var oDiv = aLiNav[index].getElementsByTagName('div')[0];
//		oDiv.style.width = '100%';
		
		oList.style.top = - index * iContentHeight + 'px';
        
        //menu
//		for(var i=0;i<aLiMenu.length;i++){
//			aLiMenu[i].className = '';
//		}
//		aLiMenu[index].className = 'active';
        
        for(var i=0;i<aLiNav.length;i++){
			aLiNav[i].className = '';
		}
        var j = 0;
        if(index == 0){
            j = 3;
        }else if(index == 1){
            j = 2;  
        }else if(index == 2){
            j = 1;   
        }else if(index == 3){
            j = 1;   
        }else if(index == 4){
            j = 1;   
        }else if(index == 5){
            j = 1;  
        }else if(index == 6){
            j = 0;  
        }
		aLiNav[j].className = 'xz';

		
		if( cjAnimate[index].inAn ){
			cjAnimate[index].inAn();
		}
		if( cjAnimate[prevIndex].outAn ){
			cjAnimate[prevIndex].outAn();
		}
		
        if(index == 0){
           $("header").removeClass("scroll-header");
        }else{
           $("header").addClass("scroll-header");
        }
	}
	
	function contentAuto(){
		iContentHeight = viewHeight();// - oHeader.offsetHeight;
		oContent.style.height = iContentHeight + 'px';
		for(var i=0;i<aLiList.length;i++){
			aLiList[i].style.height = iContentHeight + 'px';
		}
		oList.style.top = - iNow * iContentHeight + 'px';
	}
	
	function listContentAuto(){
		var mt = (iContentHeight - 520)/2;
		for(var i=0;i<aDivList.length;i++){
			aDivList[i].style.marginTop = mt + 'px';
		}
	}
	
	function fnResize(){
		contentAuto();
		listContentAuto();
	}
	
	function mouseWheel(){
		//火狐 : DOMMouseScroll( DOM事件必须用绑定事件的方式去写 addEventListener )
		//IE ,  谷歌 : mousewheel
		var bBtn = true;
		var timer = null;
		if(oContent.addEventListener){
			oContent.addEventListener('DOMMouseScroll',function(ev){
				var ev = ev || window.event;
				clearTimeout(timer);
				timer = setTimeout(function(){
					toChange(ev);
				},200);
			},false);
		}
		oContent.onmousewheel = function(ev){
			var ev = ev || window.event;
			clearTimeout(timer);
			timer = setTimeout(function(){
				toChange(ev);
			},200);
		};
		
		function toChange(ev){
			//alert(ev.detail);  //↓ 3  ↑ -3
			//alert(ev.wheelDelta); //↓ -120  ↑ 120
			
			if(ev.detail){
				bBtn = ev.detail > 0 ? true : false;
			}
			else{
				bBtn = ev.wheelDelta < 0 ? true : false;
			}
			
			if( (iNow == 0 && !bBtn) || (iNow == aLiList.length-1 && bBtn) ){return;}
			
			prevIndex = iNow;
			if(bBtn){   //↓
				if(iNow != aLiList.length-1){
					iNow++;
				}
				toMove(iNow);
			}
			else{   //↑
				if(iNow != 0){
					iNow--;
				}
				toMove(iNow);
			}
			
			if(ev.preventDefault){
				ev.preventDefault();
			}
			else{
				return false;
			}
		}
		
	}
	
	var cjAnimate = [
		{
			inAn : function(){
                var oBus1Content1 = getByClass(oBus1Content,'sign')[0];
				oBus1Content1.style.opacity = 1;
				setStyle(oBus1Content1,'transform','rotateY(0)');
			},
			outAn : function(){
                var oBus1Content1 = getByClass(oBus1Content,'sign')[0];
				oBus1Content1.style.opacity = 0;
				setStyle(oBus1Content1,'transform','rotateY(180deg)');
			}
		},
		{        
            inAn : function(){
				var oGreenContent1 = getByClass(oBus2Content , 'bus2_rightBG')[0];
				var oRedContent2 = getByClass(oBus2Content , 'bus2_left')[0];
				oGreenContent1.style.opacity = 1;
				oRedContent2.style.opacity = 1;
				setStyle(oGreenContent1,'transform','translate(0,0)');
				setStyle(oRedContent2,'transform','translate(0,0)');
			},
			outAn : function(){
				var oGreenContent1 = getByClass(oBus2Content , 'bus2_rightBG')[0];
				var oRedContent2 = getByClass(oBus2Content , 'bus2_left')[0];
				oGreenContent1.style.opacity = 0;
				oRedContent2.style.opacity = 0;
				setStyle(oGreenContent1,'transform','translate(25vw,0)');
				setStyle(oRedContent2,'transform','translate(-25vw,0)');
			}
            
		},
		{            
            inAn : function(){
				var oGreenContent1 = getByClass(oBus3Content , 'bus3_green')[0];
				var oRedContent2 = getByClass(oBus3Content , 'bus3_red')[0];
				oGreenContent1.style.opacity = 1;
				oRedContent2.style.opacity = 1;
				setStyle(oGreenContent1,'transform','translate(0,0)');
				setStyle(oRedContent2,'transform','translate(0,0)');
			},
			outAn : function(){
				var oGreenContent1 = getByClass(oBus3Content , 'bus3_green')[0];
				var oRedContent2 = getByClass(oBus3Content , 'bus3_red')[0];
				oGreenContent1.style.opacity = 0;
				oRedContent2.style.opacity = 0;
				setStyle(oGreenContent1,'transform','translate(25vw,0)');
				setStyle(oRedContent2,'transform','translate(-25vw,0)');
			}
		},
		{
            inAn : function(){
				var oGreenContent1 = getByClass(oBus4Content , 'bus4_green')[0];
				var oRedContent2 = getByClass(oBus4Content , 'bus4_red')[0];
				oGreenContent1.style.opacity = 1;
				oRedContent2.style.opacity = 1;
				setStyle(oGreenContent1,'transform','translate(0,0)');
				setStyle(oRedContent2,'transform','translate(0,0)');
			},
			outAn : function(){
				var oGreenContent1 = getByClass(oBus4Content , 'bus4_green')[0];
				var oRedContent2 = getByClass(oBus4Content , 'bus4_red')[0];
				oGreenContent1.style.opacity = 0;
				oRedContent2.style.opacity = 0;
				setStyle(oGreenContent1,'transform','translate(25vw,0)');
				setStyle(oRedContent2,'transform','translate(-25vw,0)');
			}
		},
		{
			inAn : function(){
				var oGreenContent1 = getByClass(oBus5Content , 'bus5_green')[0];
				var oRedContent2 = getByClass(oBus5Content , 'bus5_red')[0];
				oGreenContent1.style.opacity = 1;
				oRedContent2.style.opacity = 1;
				setStyle(oGreenContent1,'transform','translate(0,0)');
				setStyle(oRedContent2,'transform','translate(0,0)');
			},
			outAn : function(){
				var oGreenContent1 = getByClass(oBus5Content , 'bus5_green')[0];
				var oRedContent2 = getByClass(oBus5Content , 'bus5_red')[0];
				oGreenContent1.style.opacity = 0;
				oRedContent2.style.opacity = 0;
				setStyle(oGreenContent1,'transform','translate(25vw,0)');
				setStyle(oRedContent2,'transform','translate(-25vw,0)');
			}
		},
        {
			inAn : function(){
				var oGreenContent1 = getByClass(oBus6Content , 'bus6_green')[0];
				var oRedContent2 = getByClass(oBus6Content , 'bus6_red')[0];
				oGreenContent1.style.opacity = 1;
				oRedContent2.style.opacity = 1;
				setStyle(oGreenContent1,'transform','translate(0,0)');
				setStyle(oRedContent2,'transform','translate(0,0)');
			},
			outAn : function(){
				var oGreenContent1 = getByClass(oBus6Content , 'bus6_green')[0];
				var oRedContent2 = getByClass(oBus6Content , 'bus6_red')[0];
				oGreenContent1.style.opacity = 0;
				oRedContent2.style.opacity = 0;
				setStyle(oGreenContent1,'transform','translate(25vw,0)');
				setStyle(oRedContent2,'transform','translate(-25vw,0)');
			}
		},
        {
			inAn : function(){
				var oAbout7Content1 = getByClass(oAbout7Content , 'about7_redleft')[0];
				var oAbout7Content2 = getByClass(oAbout7Content , 'about7_redright')[0];
                
                var oAbout7Middle1 = getByClass(oAbout7Content , 'about7_middleL')[0];
				var oAbout7Middle2 = getByClass(oAbout7Content , 'about7_middleR')[0];
				oAbout7Content1.style.opacity = 1;
				oAbout7Content2.style.opacity = 1;
				setStyle(oAbout7Content1,'transform','translate(0,0)');
				setStyle(oAbout7Content2,'transform','translate(0,0)');
                
                setStyle(oAbout7Middle1,'transform','translate(0,0)');
				setStyle(oAbout7Middle2,'transform','translate(0,0)');
			},
			outAn : function(){
				var oAbout7Content1 = getByClass(oAbout7Content , 'about7_redleft')[0];
				var oAbout7Content2 = getByClass(oAbout7Content , 'about7_redright')[0];
                
                var oAbout7Middle1 = getByClass(oAbout7Content , 'about7_middleL')[0];
				var oAbout7Middle2 = getByClass(oAbout7Content , 'about7_middleR')[0];
				oAbout7Content1.style.opacity = 0;
				oAbout7Content2.style.opacity = 0;
				setStyle(oAbout7Content1, 'transform','translate(-40vw,0vw)');
				setStyle(oAbout7Content2,'transform','translate(40vw,0vw)');
                
                setStyle(oAbout7Middle1, 'transform','translate(-25vw,0vw)');
				setStyle(oAbout7Middle2,'transform','translate(25vw,0vw)');
			}
		}
	];
      
                
                
	for(var i=0;i<cjAnimate.length;i++){
		cjAnimate[i].outAn();
	}
	

	function $$(id){
		return document.getElementById(id);
	}
	
	function viewWidth(){
		return window.innerWidth || document.documentElement.clientWidth;
	}
	
	function viewHeight(){
		return window.innerHeight || document.documentElement.clientHeight;
	}
	
	function getByClass(oParent,sClass){
		var aElem = oParent.getElementsByTagName('*');
		var arr = [];
		for(var i=0;i<aElem.length;i++){
			if( aElem[i].className == sClass ){
				arr.push( aElem[i] );
			}
		}
		return arr;
	}
	
	function setStyle(obj,attr,value){
		obj.style[attr] = value;
		obj.style['webkit'+attr.substring(0,1).toUpperCase() + attr.substring(1)] = value;
	}
	
};