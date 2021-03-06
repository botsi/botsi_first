		var canvArrow, titleMe, imageMe, scrollMe, topMe, bottomMe, chapterLinks, num_chapter, cp, resizeId, lines_x, lines_y;
		
		var language = 'de';
		
		var lang_str = {
			"Object_de":"Objekt",
			"back_to_main_menu_de":"oder zurück zum Hauptmenu",
			"Object_en":"Object",
			"back_to_main_menu_en":"or back to main menu"
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

		function change_language(t){
			
			if(t.innerHTML == 'wechseln zu deutsch'){
				language = 'de';
				t.innerHTML = 'change to english';
			}else{
				language = 'en';
				t.innerHTML = 'wechseln zu deutsch';
			}
			
			page_load.load_ext(false,build_chapter.text[num_chapter[1]].count);
			
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
				
				bottomMe.innerHTML = lang_str['Object_' + language] + ' &quot;' + build_chapter.text[num_chapter[1]].objs[build_chapter.text[num_chapter[1]].count] + '&quot; (' + parseInt(build_chapter.text[num_chapter[1]].count + 1) + '/' + build_chapter.text[num_chapter[1]].url_epi.length + '): ' + build_chapter.text[num_chapter[1]].url_epi[build_chapter.text[num_chapter[1]].count] + build_chapter.text[num_chapter[1]].ih;
			
		}
		
		var page_load = {
			
			load_ext: function(firsttime,old_num_count) {
	
				loadXMLDoc('botsi_first/text/' + language + '.txt',function(){
															  
					if (xmlhttp.readyState==4){
							  
						  if (xmlhttp.status==200){
							  
							build_chapter.text = JSON.parse(xmlhttp.responseText);
										
							num_chapter = Object.keys(build_chapter.text);
				
							loadXMLDoc('botsi_first/text/about_me_' + language + '.html',function(){
																		  
								if (xmlhttp.readyState==4){
										  
									  if (xmlhttp.status==200){
										  
										build_chapter.text[num_chapter[4]].ih = xmlhttp.responseText;
										  
										build_chapter.text[num_chapter[1]].count = 0;
										
										build_chapter.text[num_chapter[1]].objs = ['draw_net','build_chapter','page_load'];
	
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
			
				canvArrow = document.getElementById("arrow_Canvas");
				
				titleMe = document.getElementById("titleme");
				
				imageMe = document.getElementById("imageme");
				
				scrollMe = document.getElementById("scrollme");
				
				topMe = document.getElementById("topme");
				
				bottomMe = document.getElementById("bottomme");
				
				chapterLinks = document.getElementsByClassName("scrollme_content");

				var l = (msieversion() == 0)?window.navigator.language.slice(0, 2):window.navigator.browserLanguage.slice(0, 2);
				
				if(l == 'en'){
					
					language = 'en';
				
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
			
	 		set_mb: function(){document.getElementById('cv_table').style.padding = parseInt(draw_net.indent_y) + 'px 0';},
		
			draw_allow: true,
			
			show: function(t){
				
				setTimeout(function(){
									
					build_chapter.draw_allow = true;
					
				},800);
				
				this.draw_allow = false;
			
				draw_net.spherize = cp;
				
				if(this.old_c != ''){imageMe.classList.remove(this.old_c);}
				
				var cl = t.innerHTML;
				
				imageMe.classList.add(cl);
																									
				imageMe.innerHTML = (cl != num_chapter[1]) ? '' : '<div></div>' + display_code(window[this.text[num_chapter[1]].objs[this.text[num_chapter[1]].count]]);
				
				bottomMe.innerHTML = (cl != num_chapter[1]) ? this.text[cl].ih : lang_str['Object_' + language] + ' &quot;' + this.text[num_chapter[1]].objs[this.text[num_chapter[1]].count] + '&quot; (' + parseInt(this.text[num_chapter[1]].count + 1) + '/' + this.text[num_chapter[1]].url_epi.length + '): ' + this.text[num_chapter[1]].url_epi[this.text[num_chapter[1]].count] + this.text[num_chapter[1]].ih;
				
				if(cl == num_chapter[4]){

					bottomMe.style.cssText = 'bottom:auto;height:100%;background:none;box-shadow:none;';
					
					this.set_mb();
					
					bottomMe.getElementsByTagName('a')[bottomMe.getElementsByTagName('a').length-1].scrollIntoView({block: "start", behavior: "smooth"});

				}else{
					
					bottomMe.style.cssText = 'bottom:0;height:auto;background:rgba(255, 255, 255, 0.5);box-shadow:0px 75px 36px 111px rgba(255, 255, 255, 0.5);margin-bottom:' + parseInt(draw_net.indent_y) + 'px';
					
					bottomMe.scrollIntoView({block: "start", behavior: "smooth"});
					
				}
				
				this.old_c = cl;
			
			},
			
			switchme_op: 1,
			
			switchme_allow: false,
			
			query_switch: function(sh,p){
				
				if(draw_net.wh_store[1] < 200 || draw_net.wh_store[1] > canvArrow.height - 200){return;}
				
				if(sh != 0){
							
					if(document.getElementById('switchme')){
					
						scrollMe.removeChild(document.getElementById('switchme'));
					
					}
					
					var sheetpos = 0;
							
					if(this.text[sh].url.length > 1){
						
						sheetpos += parseInt(draw_net.wh_store[0] / (canvArrow.width * 0.33));
							
						if(draw_net.wh_store[1] >= canvArrow.height / 2){sheetpos += 3;}
					
					}
					
					var d = document.createElement('div');
				
					d.id = 'switchme';
					
					d.innerHTML = '<span onclick="build_chapter.query_switch(0);open_ext(\'' + this.text[sh].url[sheetpos] + this.text[sh].url_epi[sheetpos] + '\',\'' + typeof this.text[sh].count + '\')">' + this.text[sh].prelink + this.text[sh].url[sheetpos] + '</span>' + (function() {if(draw_net.spherize < 250){return '<hr/><span onclick="build_chapter.query_switch(0);go_top();">' + lang_str['back_to_main_menu_' + language] + '</span>';}return '';})();
					
					scrollMe.appendChild(d);
					
					this.switchme_allow = true;
				
					d.style.left = draw_net.wh_store[0] - 100 + 'px';
				
					d.style.top = (draw_net.spherize < 250) ? draw_net.wh_store[1] - 50 + 'px' : draw_net.wh_store[1] - 25 + 'px';
				
				}else{
					
					scrollMe.removeChild(document.getElementById('switchme'));
					
				}
				
			}
			
		};
		
		
		var draw_net = {
		
			draw_all: function(w,h){
				
			if(w < this.indent_x || w > canvArrow.width - this.indent_x || h < this.indent_y || h > canvArrow.height - this.indent_y){return;}
				
				this.wh_store = [w,h];
							
					if(document.getElementById('switchme') && build_chapter.switchme_allow == false){
					
						build_chapter.switchme_op -= 0.01;
						
						if(build_chapter.switchme_op <= 0){
					
							scrollMe.removeChild(document.getElementById('switchme'));
							
							build_chapter.switchme_op = 1;
							
							build_chapter.switchme_allow = false;
					
						}else{
						
							document.getElementById('switchme').style.opacity = build_chapter.switchme_op;
							
						}
					
					}


				var ctx = canvArrow.getContext("2d");
					
				ctx.clearRect(0, 0, canvArrow.width, canvArrow.height);

				this.draw_center_x(w,h,ctx);
						
			},
			
			draw_center_x: function(w,h,ctx){
				
				ctx.globalCompositeOperation='source-over';
			
				ctx.beginPath();
				
				ctx.fillStyle = "#fff";
		
				var hh = parseInt((w-1-this.indent_x) / 50);

					var x_shift = lines_x[hh];
						
					var c = this.giveMeC(x_shift,w,canvArrow.width);
					
					ctx.moveTo(x_shift, 0);
						
					ctx.lineTo(x_shift, h - this.dw_param[2]);
				
					ctx.bezierCurveTo(
											x_shift, h - this.dw_param[1], 
											x_shift + c, h - this.dw_param[0], 
											x_shift + c, h
										);
				
					ctx.bezierCurveTo(
											x_shift + c, h + this.dw_param[0], 
											x_shift, h + this.dw_param[1], 
											x_shift, h + this.dw_param[2]
										);
				
					ctx.lineTo(x_shift, canvArrow.height);
					
					ctx.lineTo(x_shift + 50, canvArrow.height);

					x_shift = lines_x[hh+1];
						
					c = this.giveMeC(x_shift,w,canvArrow.width);
					
					ctx.lineTo(x_shift, h + this.dw_param[2]);
					
					ctx.bezierCurveTo(
											x_shift, h + this.dw_param[1], 
											x_shift + c, h + this.dw_param[0], 
											x_shift + c, h
										);
					ctx.bezierCurveTo(
											x_shift + c, h - this.dw_param[0], 
											x_shift, h - this.dw_param[1], 
											x_shift, h - this.dw_param[2]
										);
					
					ctx.lineTo(x_shift, 0);
					
					ctx.lineTo(x_shift - 50, 0);
					
				ctx.fill();
		
				ctx.closePath();
				
				
				this.draw_center_y(w,h,ctx);
						
			},
			
			draw_center_y: function(w,h,ctx){
				
				ctx.globalCompositeOperation='destination-in';
				
				ctx.beginPath();
				
				ctx.fillStyle = "#fff";
		
				var hh = parseInt((h-1-this.indent_y) / 50);
		
					var y_shift = lines_y[hh];
						
					var c = this.giveMeC(y_shift,h,canvArrow.height);
					
					ctx.moveTo(0, y_shift);
						
					ctx.lineTo(w - this.dw_param[2], y_shift);
				
					ctx.bezierCurveTo(
											w - this.dw_param[1], y_shift, 
											w - this.dw_param[0], y_shift + c, 
											w, y_shift + c
										);
				
					ctx.bezierCurveTo(
											w + this.dw_param[0], y_shift + c,
											w + this.dw_param[1], y_shift, 
											w + this.dw_param[2], y_shift
										);
				
					ctx.lineTo(canvArrow.width, y_shift);
					
					ctx.lineTo(canvArrow.width, y_shift + 50);

					y_shift = lines_y[hh+1];
						
					c = this.giveMeC(y_shift,h,canvArrow.height);
					
					ctx.lineTo(w + this.dw_param[2], y_shift);
					
					ctx.bezierCurveTo(
											w + this.dw_param[1], y_shift, 
											w + this.dw_param[0], y_shift + c, 
											w, y_shift + c
										);
					ctx.bezierCurveTo(
											w - this.dw_param[0], y_shift + c, 
											w - this.dw_param[1], y_shift, 
											w - this.dw_param[2], y_shift
										);
					
					ctx.lineTo(0, y_shift);
					
					ctx.lineTo(0, y_shift - 50);
					
				ctx.fill();
				ctx.closePath();
				
				ctx.globalCompositeOperation='xor';
			
				ctx.beginPath();
		
				ctx.fillStyle = "#fff";
				ctx.fillRect(0, 0, canvArrow.width, canvArrow.height);
				ctx.closePath();
				
				ctx.globalCompositeOperation='source-over';
				
				if(this.spherize < 3){
					
					ctx.beginPath();
			
					ctx.lineWidth = 50;
					ctx.strokeStyle = "#fff";
					ctx.arc(w,h,parseInt(((cp * 0.5) / this.spherize)+25),0,2*Math.PI);
					ctx.stroke();
	
					ctx.closePath();
				
				}
				
				this.draw_lines_x(w,h,ctx);
						
			},
			
			draw_lines_x: function(w,h,ctx){
				
				ctx.beginPath();
		
				ctx.lineWidth = 1;
				ctx.strokeStyle = '#999';
		
					for(var i = 0; i < lines_x.length; i++){
						
						var x_shift = lines_x[i];
						
						var c = 0;
						
						if(x_shift < w + cp * 0.5 && x_shift > w - cp * 0.5){
							c = this.giveMeC(x_shift,w,canvArrow.width);
						}
						
						ctx.moveTo(x_shift, 0);
						
							ctx.lineTo(x_shift, h - this.dw_param[2]);
						
							ctx.bezierCurveTo(
													x_shift, h - this.dw_param[1], 
													x_shift + c, h - this.dw_param[0], 
													x_shift + c, h
												);
						
							ctx.bezierCurveTo(
													x_shift + c, h + this.dw_param[0], 
													x_shift, h + this.dw_param[1], 
													x_shift, h + this.dw_param[2]
												);
					
						ctx.lineTo(x_shift, canvArrow.height);
						
					}
					
				ctx.stroke();
				ctx.closePath();
					
				
				this.draw_lines_y(w,h,ctx);
						
			},
			
			draw_lines_y: function(w,h,ctx){
				
				ctx.beginPath();
		
				for(var i = 0; i < lines_y.length; i++){
					
					var y_shift = lines_y[i];
					
					var c = 0;
					
					if(y_shift < h + cp * 0.5 && y_shift > h - cp * 0.5){
						c = this.giveMeC(y_shift,h,canvArrow.height);
					}
					
					ctx.moveTo(0, y_shift);
					
						ctx.lineTo(w - this.dw_param[2], y_shift);
					
						ctx.bezierCurveTo(
												w - this.dw_param[1], y_shift, 
												w - this.dw_param[0], y_shift + c, 
												w, y_shift + c
											);
					
						ctx.bezierCurveTo(
												w + this.dw_param[0], y_shift + c, 
												w + this.dw_param[1], y_shift, 
												w + this.dw_param[2], y_shift
											);
				
					ctx.lineTo(canvArrow.width, y_shift);
					
				}
					
				ctx.stroke();
				ctx.closePath();
			
			},
			
			
			wh_store: [0,0],
			
			dw_param: [200,300,500],
			
			spherize: 3,
			
			giveMeC: function(s,p,o){
				
				var c = cp;
				
				if(p > s){c = -cp;}
				
				return (p - s + c * 0.5) / this.spherize;
				
			},
			
			eye_scroll: function(p){
						
					bottomMe.style.cursor = canvArrow.style.cursor = (p > 20) ? 'default' : 'pointer';
					
					if(p < 2.5){
						
						p = 2.5;
						
						}
				
					if(p > 300){
						
						p = 300;
						
						}
					
					this.spherize = p;
											  
					this.draw_all(this.wh_store[0], this.wh_store[1]);
			
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
			
			window.addEventListener('touchmove', function(e){
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
		
			clearTimeout(resizeId);
				
			resizeId = setTimeout(function(){
										   
				resizeCanvas();
			
			}, 200);
			
		}
							  
		function resizeCanvas() {
				
			lines_x = [];
			lines_y = [];
		
			canvArrow.width = window.innerWidth;
			canvArrow.height = window.innerHeight;
			
			draw_net.indent_x = parseInt((canvArrow.width % 50) / 2);
			draw_net.indent_y = parseInt((canvArrow.height % 50) / 2);
			
			for(var i = draw_net.indent_x; i < canvArrow.width; i+=50){
				lines_x.push(i);
			}
			
			for(var i = draw_net.indent_y; i < canvArrow.height; i+=50){
				lines_y.push(i);
			}
			
			cp = (canvArrow.width + canvArrow.height) / 2;
			
			draw_net.dw_param = [cp * 0.18,cp * 0.18,cp * 0.4];
			
			draw_net.spherize = cp;
			
			scrollMe.style.height = imageMe.style.height = window.innerHeight + 300 + 'px';
			
			titleMe.style.margin = '0 ' + parseInt(50 + draw_net.indent_x) + 'px';
			
			titleMe.style.top = parseInt(100 + draw_net.indent_y) + 'px';
			
			titleMe.style.width = parseInt(canvArrow.width - 100 - draw_net.indent_x * 2) + 'px';
			
			bottomMe.style.marginBottom = parseInt(draw_net.indent_y) + 'px';
	 
	 		document.getElementById('cv_table') != null && build_chapter.set_mb();
				
			for(var i = 0; i < chapterLinks.length; i++){
				
				chapterLinks[i].style.top = titleMe.style.top;
				
				if(i > 0){
					
					if(chapterLinks[i-1].getBoundingClientRect().top < chapterLinks[i].getBoundingClientRect().top){
				
						chapterLinks[i].style.marginLeft = parseInt(50 + draw_net.indent_x) + 'px';
					
					}else{
				
						chapterLinks[i].style.marginLeft = 50 + 'px';
					
					}
				
				}
				
			}
			
			chapterLinks[0].style.marginLeft = parseInt(50 + draw_net.indent_x) + 'px';
			
			draw_net.draw_all(canvArrow.width * 0.5, canvArrow.height * 0.5);
		
		}
		
		function arrow(e) {
			
			if(imageMe.classList[0] != num_chapter[1]){return;};
			
			if (!e){
			  e = window.event;
			}
			  
			if (e.keyCode == 37){
				
				build_chapter.text[num_chapter[1]].count--;
				
				cycle_in_view_code();
			
			}
			  
			if (e.keyCode == 39){
				
				build_chapter.text[num_chapter[1]].count++;
				
				cycle_in_view_code();
				
			}
						
		}
