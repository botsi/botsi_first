		var canvArrow, titleMe, imageMe, scrollMe, topMe, bottomMe, chapterLinks, num_chapter, cp, resizeId, lines_x, lines_y, imgme_calc_h, isiPad;
		
		var mobil_switch_size = 1024;
		
		var ScrollFix = function(elem) {
			// Variables to track inputs
			var startY = startTopScroll = deltaY = undefined,
		
			elem = elem || elem.querySelector(elem);
		
			// If there is no element, then do nothing	
			if(!elem)
				return;
		
			// Handle the start of interactions
			elem.addEventListener('touchstart', function(event){
				startY = event.touches[0].pageY;
				startTopScroll = elem.scrollTop;
		
				if(startTopScroll <= 0)
					elem.scrollTop = 1;
		
				if(startTopScroll + elem.offsetHeight >= elem.scrollHeight)
					elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
			}, false);
		};
		
			
			
		function rep_body_if_pad(){
			
			isiPad = navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/iPhone/i) != null || navigator.userAgent.match(/CriOS/i) != null || navigator.userAgent.match(/Android/i) != null || navigator.userAgent.match(/BlackBerry/i) != null || navigator.userAgent.match(/IEMobile/i) != null;
			
			if(isiPad == true) {
				document.getElementsByTagName('body')[0].innerHTML = '<div id="content"><div id="imageme" class="intro"></div><canvas id="arrow_Canvas"></canvas><div id="scrollme"><div id="topme"></div><div id="bottomme"></div></div></div><div id="titleme" class="noBounce">david abotsi&nbsp; |&nbsp;&nbsp;vanilla javascript programming<span>change to english</span></div>';
				
				
				//Prevent Header & Footer From Showing Browser Chrome
				
				document.addEventListener('touchmove', function(event) {
					if(event.target.parentNode.className.indexOf('noBounce') != -1 || event.target.className.indexOf('noBounce') != -1 ) {
						event.preventDefault();
					}
				}, false);
				
				// Add ScrollFix
				var scrollingContent = document.getElementById("content");
				new ScrollFix(scrollingContent);
				
			}
				
		}


		function msieversion(){
			
			  var ua = window.navigator.userAgent;
			  var msie = ua.indexOf ( "MSIE " );
		
			  if ( msie > 0 ) {     // If Internet Explorer, return version number
				 return parseInt (ua.substring (msie+5, ua.indexOf (".", msie )));
			  }else{                 // If another browser, return 0
				 return 0;
			  }
		
		}

		function loadXMLDoc(url,cfunc,val){
		
			xmlhttp = new XMLHttpRequest();
			
			xmlhttp.onreadystatechange = cfunc;
			
			xmlhttp.open("GET", url, true);
			xmlhttp.send();
		
		}

		function go_top(){
			
			topMe.scrollIntoView({block: "end", behavior: "smooth"});
			
		}
		
		function open_ext(u,s){
			
			if(s == "undefined"){
					
				window.open('http://' + u,'_blank');
				
			}else{
				
				build_chapter.text[num_chapter[1]].count++;
			
				cycle_in_view_code();
			
			}
			
		}
		
		function cycle_in_view_code() {
				
				if(build_chapter.text[num_chapter[1]].count > build_chapter.text[num_chapter[1]].url_epi.length - 1){build_chapter.text[num_chapter[1]].count = 0}
				
				if(build_chapter.text[num_chapter[1]].count < 0){build_chapter.text[num_chapter[1]].count = build_chapter.text[num_chapter[1]].url_epi.length - 1}
				
				imageMe.innerHTML = '<div></div>' + display_code(window[build_chapter.text[num_chapter[1]].objs[build_chapter.text[num_chapter[1]].count]]);
				
				bottomMe.innerHTML = language.str['Object_' + language.actual] + ' &quot;' + build_chapter.text[num_chapter[1]].objs[build_chapter.text[num_chapter[1]].count] + '&quot; (' + parseInt(build_chapter.text[num_chapter[1]].count + 1) + '/' + build_chapter.text[num_chapter[1]].url_epi.length + '): ' + build_chapter.text[num_chapter[1]].url_epi[build_chapter.text[num_chapter[1]].count] + build_chapter.text[num_chapter[1]].ih;
			
		}
		
		var language = {
			
			actual: 'de',
			
			change: function(el_ih){
				
				var t = titleMe.getElementsByTagName('span')[0];
				
				(function(){
							 
					if(el_ih == 'wechseln zu deutsch'){
						
						language.actual = 'de';
						
						t.innerHTML = 'change to english';
						
						return;
						
					}
										 
					language.actual = 'en';
					
					t.innerHTML = 'wechseln zu deutsch';
									 
				})();
				
				page_load.load_ext(false,build_chapter.text[num_chapter[1]].count);
				
			},
			
			str: {
			"Object_de":"Objekt",
			"back_to_main_menu_de":"oder zurück zum Hauptmenu",
			"Object_en":"Object",
			"back_to_main_menu_en":"or back to main menu"
			}
			
		};
		
		var page_load = {
			
			load_ext: function(firsttime,old_num_count) {
	
				loadXMLDoc('botsi_first/text/' + language.actual + '.txt',function(){
															  
					if (xmlhttp.readyState==4){
							  
						  if (xmlhttp.status==200){
							  
							build_chapter.text = JSON.parse(xmlhttp.responseText);
										
							num_chapter = Object.keys(build_chapter.text);
				
							loadXMLDoc('botsi_first/text/about_me_' + language.actual + '.html',function(){
																		  
								if (xmlhttp.readyState==4){
										  
									  if (xmlhttp.status==200){
										  
										build_chapter.text[num_chapter[4]].ih = xmlhttp.responseText;
										  
										build_chapter.text[num_chapter[1]].count = 0;
										
										build_chapter.text[num_chapter[1]].objs = ['build_chapter','draw_net','page_load','language'];
	
										if(firsttime == true){page_load.second();}else{
											
											page_load.update(old_num_count);
											
										}
										  
									  }			else{alert('get about_me shit happens');}
								}
										  
							});
							
						  }			else{alert('get de shit happens');}
					}
							  
				});
			
			},
			
			first: function() {
			
				rep_body_if_pad();
				
				canvArrow = document.getElementById("arrow_Canvas");
				
				titleMe = document.getElementById("titleme");
				
				imageMe = document.getElementById("imageme");
				
				scrollMe = document.getElementById("scrollme");
				
				topMe = document.getElementById("topme");
				
				bottomMe = document.getElementById("bottomme");
				
				chapterLinks = document.getElementsByClassName("scrollme_content");
				
				if(((msieversion() == 0)?window.navigator.language.slice(0, 2):window.navigator.browserLanguage.slice(0, 2)) == 'en'){
					
					language.actual = 'en';
				
					titleMe.getElementsByTagName('span')[0].innerHTML = 'wechseln zu deutsch';
				
				}
				
				page_load.load_ext(true);
			
			},
			
			second: function() {
	
				canvArrow.addEventListener('click', add_query_switch, false);
				
				bottomMe.addEventListener('click', add_query_switch, false);
						
				canvArrow.addEventListener('mouseover', function(){
																 
					build_chapter.switchme_allow = false;
					
				}, false);
			
				titleMe.addEventListener('click', go_top, false);
			
				titleMe.getElementsByTagName('span')[0].addEventListener('click', function(){language.change(this.innerHTML);}, false);
				
				for(var k in build_chapter.text){
				
					var s = document.createElement('span');
				
					s.className = 'scrollme_content';
					
					s.innerHTML = k;
					
					s.addEventListener('click', function(){
														 
						 build_chapter.show(this);
						 
					}, false);
					
					scrollMe.appendChild(s);
				
				}
	
				resizeCanvas();
				
				go_top();
			
			},
			
			update: function(o) {
				
				build_chapter.text[num_chapter[1]].count = o;
				
				var el = scrollMe.getElementsByTagName('span');
				
				var c = 0;
				
				for(var k in build_chapter.text){
					
					if(el[c].innerHTML == build_chapter.old_c){build_chapter.old_c = k;}
					
					el[c].innerHTML = k;
					
					c++;
				
				}
				
				if(build_chapter.old_c != 'intro'){
				
					imageMe.className = build_chapter.old_c;
					
					bottomme.innerHTML = build_chapter.text[build_chapter.old_c].ih;
					
					if(imageMe.classList[0] == num_chapter[1]){cycle_in_view_code();};
					
					if(imageMe.classList[0] == num_chapter[4]){build_chapter.set_mb();}

				
				}
			
			}
			
		};
			
		function add_query_switch() {
			
			if(build_chapter.draw_allow == false){return;}
			
			if(build_chapter.text[imageMe.className] && typeof build_chapter.text[imageMe.className].url !== "undefined"){
				
				build_chapter.query_switch(imageMe.className);
			
			}else{
			 
				go_top();
			
			};
		
		}
		
		var build_chapter = {
			
			old_c: 'intro',
			
	 		set_mb: function(){
				
					if(window.innerWidth  <= mobil_switch_size){
				
						document.getElementById('cv_table').style.padding = parseInt(draw_net.indent_y - 150 + (chapterLinks.length - 1) * 100) + 'px 0 ' + parseInt(draw_net.indent_y) + 'px 0';
						
					}else{
				
						document.getElementById('cv_table').style.padding = parseInt(draw_net.indent_y) + 'px 0';
						
					}
					
				},
		
			draw_allow: true,
			
			show: function(t){
				
				setTimeout(function(){
									
					build_chapter.draw_allow = true;
					
				},800);
				
				this.draw_allow = false;
			
				draw_net.spherize = cp;
				
				if(this.old_c != ''){imageMe.classList.remove(this.old_c);}
				
				bottomMe.style.visibility = 'visible';
				
				var cl = t.innerHTML;
				
				imageMe.classList.add(cl);
																									
				imageMe.innerHTML = (cl != num_chapter[1]) ? '' : '<div></div>' + display_code(window[this.text[num_chapter[1]].objs[this.text[num_chapter[1]].count]]);
				
				bottomMe.innerHTML = (cl != num_chapter[1]) ? this.text[cl].ih : language.str['Object_' + language.actual] + ' &quot;' + this.text[num_chapter[1]].objs[this.text[num_chapter[1]].count] + '&quot; (' + parseInt(this.text[num_chapter[1]].count + 1) + '/' + this.text[num_chapter[1]].url_epi.length + '): ' + this.text[num_chapter[1]].url_epi[this.text[num_chapter[1]].count] + this.text[num_chapter[1]].ih;
								
				calc_bot_and_img(cl);
				
				this.old_c = cl;
			
			},
			
			switchme_op: 1,
			
			switchme_allow: false,
			
			query_switch: function(sh,p){
					
				if(window.innerWidth  <= mobil_switch_size){
					
					if(draw_net.wh_store[1] < imageMe.offsetTop || draw_net.wh_store[1] > imageMe.offsetHeight + imageMe.offsetTop){return;}
					
				}else{
					
					if(draw_net.wh_store[1] < 200 || draw_net.wh_store[1] > canvArrow.height - 200){return;}
					
				}
				
				if(sh != 0){
							
					if(document.getElementById('switchme')){
					
						scrollMe.removeChild(document.getElementById('switchme'));
					
					}
						
					var sheetpos = (function(){
								
						if(build_chapter.text[sh].url.length > 1){
								
							if(canvArrow.width > canvArrow.height){
								
								var s = parseInt(draw_net.wh_store[0] / (canvArrow.width * 0.33));
									
								if(draw_net.wh_store[1] >= imageMe.offsetHeight / 2){return s += 3;}
								
								return s;
								
							}else{
								
								var s = parseInt(draw_net.wh_store[0] / (canvArrow.width * 0.5));
									
								if(draw_net.wh_store[1] >= imageMe.offsetHeight * 0.33 && draw_net.wh_store[1] < imageMe.offsetHeight * 0.66 ){return s += 2;}
									
								if(draw_net.wh_store[1] >= imageMe.offsetHeight * 0.66 ){return s += 4;}
								
								return s;
								
							}
						
						}
						
						
						return 0;
						
					})();
					
					var d = document.createElement('div');
				
					d.id = 'switchme';
					
					d.innerHTML = '<span onclick="build_chapter.query_switch(0);open_ext(\'' + this.text[sh].url[sheetpos] + this.text[sh].url_epi[sheetpos] + '\',\'' + typeof this.text[sh].count + '\')">' + this.text[sh].prelink + this.text[sh].url[sheetpos] + '</span>' + (function() {if(draw_net.spherize < 250 || isiPad == true){return '<hr/><span onclick="build_chapter.query_switch(0);go_top();">' + language.str['back_to_main_menu_' + language.actual] + '</span>';}return '';})();
					
					scrollMe.appendChild(d);
					
					this.switchme_allow = true;
					
					if(window.innerWidth  <= mobil_switch_size){
					
						d.style.width = document.getElementsByClassName('scrollme_content')[0].offsetWidth + 'px';
					
						d.style.left = document.getElementsByClassName('scrollme_content')[0].offsetLeft + 'px';
					
					}else{
				
						d.style.left = draw_net.wh_store[0] - 100 + 'px';
						
						d.style.width = 200 + 'px';
					
					}
					
					var to = (window.innerWidth  <= mobil_switch_size) ? [75,38] : [50,25];
				
					d.style.top = (draw_net.spherize < 250 || window.innerWidth  <= mobil_switch_size) ? draw_net.wh_store[1] - to[0] + 'px' : draw_net.wh_store[1] - to[1] + 'px';
				
				}else{
					
					scrollMe.removeChild(document.getElementById('switchme'));
					
				}
				
			}
			
		};
		
				
		function display_code(t){
			
			var r = '';
			
			for (var k in t) {
				if (t.hasOwnProperty(k)){
					r = r + k.toString() + ' : ';
					r = r + t[k].toString().replace('<hr/>','').replace(/{/g,'<br/>{<br/>').replace(/}/g,'}<br/>').replace(/;/g,';<br/>') + '<br/>';
				}
			}
			
			return r;
		}
		
		document.addEventListener('DOMContentLoaded', page_load.first, false);

		if ('ontouchstart' in window){
			
			window.addEventListener('touchstart', function(e){
				draw_net.draw_all(e.changedTouches[0].clientX,e.changedTouches[0].clientY);
			}, false);
			
		}else{
		
			window.addEventListener('mousemove', function(e){
				
				draw_net.draw_all(e.clientX,e.clientY);
				
			}, false);
			
			window.addEventListener("keydown", arrow, false);
		
		}
		
		window.addEventListener('scroll', function(e){
					draw_net.eye_scroll(300 - window.pageYOffset);
		}, false);
		
		window.addEventListener('resize', pre_resizeCanvas, false);
				
		function pre_resizeCanvas() {
			
			//imageMe.style.opacity = 0.1;
			
			canvArrow.style.visibility = 'hidden';
		
			clearTimeout(resizeId);
				
			resizeId = setTimeout(function(){
										   
				resizeCanvas();
			
			}, 200);
			
		}
							  
		function resizeCanvas() {
		
			canvArrow.width = window.innerWidth;
			canvArrow.height = window.innerHeight;
			
			cp = (canvArrow.width + canvArrow.height) / 2;
				
			lines_x = [];
			lines_y = [];
			
			draw_net.indent_x = parseInt((canvArrow.width % 50) / 2);
			draw_net.indent_y = parseInt((canvArrow.height % 50) / 2);
			
			for(var i = draw_net.indent_x; i < canvArrow.width; i+=50){
				lines_x.push(i);
			}
			
			for(var i = draw_net.indent_y; i < canvArrow.height; i+=50){
				lines_y.push(i);
			}
			
			draw_net.dw_param = [cp * 0.18,cp * 0.18,cp * 0.4];
			
			draw_net.spherize = cp;
			
			if(window.innerWidth  <= mobil_switch_size){

				console.log(build_chapter.old_c);
				scrollMe.style.top = (isiPad == true) ? '-50px' : 0;

				titleMe.style.lineHeight = titleMe.style.height = parseInt(50 + draw_net.indent_y) + 'px';
				
				titleMe.style.margin = 0;
				
				titleMe.style.top = 0;
				
				titleMe.style.width = '100%';

				
			}else{
				
				scrollMe.style.height = imageMe.style.height = window.innerHeight + 300 + 'px';
				
				scrollMe.style.top = 0;
				
				titleMe.style.lineHeight = titleMe.style.height = '50px';
				
				titleMe.style.margin = '0 ' + parseInt(50 + draw_net.indent_x) + 'px';
				
				titleMe.style.top = parseInt(100 + draw_net.indent_y) + 'px';
				
				titleMe.style.width = parseInt(canvArrow.width - 100 - draw_net.indent_x * 2) + 'px';
			
			}


			calc_bot_and_img(build_chapter.old_c);
				







	 		document.getElementById('cv_table') != null && build_chapter.set_mb();
				
			for(var i = 0; i < chapterLinks.length; i++){
				
				if(window.innerWidth  <= mobil_switch_size){
				
					chapterLinks[i].style.width = canvArrow.width - 100 - 2 * draw_net.indent_x + 'px';
					
					chapterLinks[i].style.top = draw_net.indent_y + 'px';
				
				}else{
					
					chapterLinks[i].style.width = '100px';
					
					chapterLinks[i].style.top = titleMe.style.top;
				
				}
				
				if(i > 0){
					
					if(chapterLinks[i-1].getBoundingClientRect().top < chapterLinks[i].getBoundingClientRect().top){
				
						chapterLinks[i].style.marginLeft = parseInt(50 + draw_net.indent_x) + 'px';
					
					}else{
				
						chapterLinks[i].style.marginLeft = 50 + 'px';
					
					}
				
				}
				
			}
			
			chapterLinks[0].style.marginLeft = parseInt(50 + draw_net.indent_x) + 'px';
			
			//imageMe.style.opacity = 1;
			
			canvArrow.style.visibility = 'visible';
			
			draw_net.draw_all(canvArrow.width * 0.5, canvArrow.height * 0.5);
		
		}
		
		
			function calc_bot_and_img(cl){


				
				if(document.getElementById("content")){
					
					//document.getElementById("content").style.height = 0;
					imgme_calc_h = document.getElementById("content").offsetHeight + 150;
					
				}else{
					
					imgme_calc_h = window.innerHeight;
					
				}



				if(cl == num_chapter[4]){

					bottomMe.style.height = '100%';
					bottomMe.style.bottom = 'auto';
					bottomMe.style.background = 'none';
					bottomMe.style.boxShadow = 'none';
					bottomMe.style.paddingTop = 0;
					bottomMe.style.paddingBottom = 0;
					
				}else{
					
					bottomMe.style.height = 'auto';
					
					var ir = (cl == num_chapter[0] && window.innerWidth  <= mobil_switch_size) ? -(bottomMe.offsetHeight - imgme_calc_h - draw_net.indent_y + 75) : 0;

					bottomMe.style.bottom = ir + 'px';
					
					var op = (window.innerWidth  <= mobil_switch_size) ? 1 : 0.5;
					
					bottomMe.style.background = 'rgba(255, 255, 255, ' + op + ')';
					bottomMe.style.boxShadow = (window.innerWidth  <= mobil_switch_size) ? 'none' : '0 0 36px 36px rgba(255, 255, 255, ' + op + ')';
	//				bottomMe.style.boxShadow = '0 0 36px 36px rgba(255, 255, 255, ' + op + ')';
					bottomMe.style.paddingTop = (cl == num_chapter[0] && !document.getElementById("content")) ? parseInt(50 + draw_net.indent_y) + 'px' : parseInt(draw_net.indent_y) + 'px';
					bottomMe.style.paddingBottom = parseInt(draw_net.indent_y) + 'px';
					
				}
				
				if(window.innerWidth  <= mobil_switch_size){
					
					if(cl != 'intro'){
					
					scrollMe.style.height = parseInt(window.innerHeight + 300 + (chapterLinks.length - 1) * 100) + 'px';
					
					}
					
					if(cl == num_chapter[2] || cl == num_chapter[3]){
							
						imageMe.style.height = parseInt(imgme_calc_h - bottomMe.offsetHeight - 75) + 'px';
						
					}else{
							
						imageMe.style.height = parseInt(imgme_calc_h) + 'px';
					
					}
				
				}else{
					
					imageMe.style.height = '100%';
					
				}
				

				if(cl == num_chapter[4]){
					
					build_chapter.set_mb();
					
					bottomMe.getElementsByTagName('a')[bottomMe.getElementsByTagName('a').length-1].scrollIntoView({block: "start", behavior: "smooth"});

				}else{
					
					bottomMe.scrollIntoView({block: "start", behavior: "smooth"});
					
				}





		}
		
		
		
		
		function arrow(e) {
			
			if (!e){
			  e = window.event;
			}
			  
			if (e.keyCode == 68){
				
				language.change('wechseln zu deutsch');
			
			}
			  
			if (e.keyCode == 69){
				
				language.change('');
			
			}
			
			if(imageMe.classList[0] != num_chapter[1]){return;};
			  
			if (e.keyCode == 37){
				
				build_chapter.text[num_chapter[1]].count--;
				
				cycle_in_view_code();
			
			}
			  
			if (e.keyCode == 39){
				
				build_chapter.text[num_chapter[1]].count++;
				
				cycle_in_view_code();
				
			}
						
		}
