		var canvArrow, titleMe, imageMe, scrollMe, topMe, bottomMe, chapterLinks, cp, resizeId, lines_x, lines_y;

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
			
				cycle_in_view_code();
			
			}
			
		}
		
		function cycle_in_view_code() {
				
				chapter.text.view_code.count++;
				
				if(chapter.text.view_code.count > chapter.text.view_code.url_epi.length - 1){chapter.text.view_code.count = 0}
				
				imageMe.innerHTML = '<div></div>' + display_code(chapter.text.view_code.objs[chapter.text.view_code.count]);
				
				bottomMe.innerHTML = parseInt(chapter.text.view_code.count + 1) + '/' + chapter.text.view_code.url_epi.length + ' ' + chapter.text.view_code.url_epi[chapter.text.view_code.count] + chapter.text.view_code.ih;
			
		}
		
		var page_load = {
			
			first: function() {
			
				canvArrow = document.getElementById("arrow_Canvas");
				
				titleMe = document.getElementById("titleme");
				
				imageMe = document.getElementById("imageme");
				
				scrollMe = document.getElementById("scrollme");
				
				topMe = document.getElementById("topme");
				
				bottomMe = document.getElementById("bottomme");
				
				chapterLinks = document.getElementsByClassName("scrollme_content");
	
				loadXMLDoc('botsi_first/text/de.txt',function(){
															  
					if (xmlhttp.readyState==4){
							  
						  if (xmlhttp.status==200){
							  
							chapter.text = JSON.parse(xmlhttp.responseText);
				
							loadXMLDoc('botsi_first/text/about_me_de.html',function(){
																		  
								if (xmlhttp.readyState==4){
										  
									  if (xmlhttp.status==200){
										  
										chapter.text.about_me.ih = xmlhttp.responseText;
										  
										chapter.text.view_code.count = 0;
										
										chapter.text.view_code.objs = [dlg,chapter,page_load];
	
										page_load.second();
										  
									  }			else{alert('get about_me shit happens');}
								}
										  
							});
							
						  }			else{alert('get de shit happens');}
					}
							  
				});
			
			},
			
			second: function() {
	
				canvArrow.addEventListener('click', add_query_switch, false);
				
				bottomMe.addEventListener('click', add_query_switch, false);
						
				canvArrow.addEventListener('mouseover', function(){
																 
					chapter.switchme_allow = false;
					
				}, false);
			
				titleMe.addEventListener('click', go_top, false);
				
				for(var k in chapter.text){
				
					var s = document.createElement('span');
				
					s.className = 'scrollme_content';
					
					s.innerHTML = k;
					
					s.addEventListener('click', function(){
						 chapter.show(this);
					}, false);
					
					scrollMe.appendChild(s);
				
				}
	
				resizeCanvas();
				
				go_top();
			
			}
			
		};
			
		function add_query_switch() {
			
			if(chapter.draw_allow == false){return;}
			
			if(chapter.text[imageMe.className] && typeof chapter.text[imageMe.className].url !== "undefined"){
				
				chapter.query_switch(imageMe.className);
			
			}else{
			 
				go_top();
			
			};
		
		}
		
		var chapter = {
			
			old_c: 'intro',
			
	 		set_mb: function(){document.getElementById('cv_table').style.padding = parseInt(dlg.indent_y) + 'px 0';},
		
			draw_allow: true,
			
			show: function(t){
				
				setTimeout(function(){
									
					chapter.draw_allow = true;
					
				},800);
				
				this.draw_allow = false;
			
				dlg.spherize = cp;
				
				if(this.old_c != ''){imageMe.classList.remove(this.old_c);}
				
				var cl = t.innerHTML;
				
				imageMe.classList.add(cl);
																									
				imageMe.innerHTML = (cl != 'view_code') ? '' : '<div></div>' + display_code(this.text.view_code.objs[this.text.view_code.count]);
				
				bottomMe.innerHTML = (cl != 'view_code') ? this.text[cl].ih : parseInt(this.text.view_code.count + 1) + '/' + this.text.view_code.url_epi.length + ' ' + this.text.view_code.url_epi[this.text.view_code.count] + this.text.view_code.ih;

				if(cl == 'about_me'){

					bottomMe.style.cssText = 'bottom:auto;height:100%;background:none;box-shadow:none;';
					
					this.set_mb();
					
					bottomMe.getElementsByTagName('a')[bottomMe.getElementsByTagName('a').length-1].scrollIntoView({block: "start", behavior: "smooth"});

				}else{
					
					bottomMe.style.cssText = 'bottom:0;height:auto;background:rgba(255, 255, 255, 0.5);box-shadow:0px 75px 36px 111px rgba(255, 255, 255, 0.5);';
					
					bottomMe.scrollIntoView({block: "start", behavior: "smooth"});
					
				}
				
				this.old_c = cl;
			
			},
			
			switchme_op: 1,
			
			switchme_allow: false,
			
			query_switch: function(sh,p){
				
				if(dlg.wh_store[1] < 200 || dlg.wh_store[1] > canvArrow.height - 200){return;}
				
				if(sh != 0){
							
					if(document.getElementById('switchme')){
					
						scrollMe.removeChild(document.getElementById('switchme'));
					
					}
					
					var sheetpos = 0;
							
					if(chapter.text[sh].url.length > 1){
						
						sheetpos += parseInt(dlg.wh_store[0] / (canvArrow.width * 0.33));
							
						sheetpos += (dlg.wh_store[1] < canvArrow.height / 2) ? 0 : 3;
					
					}
					
					var d = document.createElement('div');
				
					d.id = 'switchme';
					
					d.innerHTML = '<span onclick="chapter.query_switch(0);open_ext(\'' + chapter.text[sh].url[sheetpos] + chapter.text[sh].url_epi[sheetpos] + '\',\'' + typeof chapter.text[sh].count + '\')">' + chapter.text[sh].prelink + chapter.text[sh].url[sheetpos] + '</span>' + (function() {if(dlg.spherize < 250){return '<hr/>or <span onclick="chapter.query_switch(0);go_top();">back to main menu</span>';}return '';})();
					
					scrollMe.appendChild(d);
					
					chapter.switchme_allow = true;
				
					d.style.left = dlg.wh_store[0] - 100 + 'px';
				
					d.style.top = (dlg.spherize < 250) ? dlg.wh_store[1] - 50 + 'px' : dlg.wh_store[1] - 25 + 'px';
				
				}else{
					
					scrollMe.removeChild(document.getElementById('switchme'));
					
				}
				
			}
			
		};
		
		
		var dlg = {
		
			draw_all: function(w,h){
				
			if(w < this.indent_x || w > canvArrow.width - this.indent_x || h < this.indent_y || h > canvArrow.height - this.indent_y){return;}
				
				dlg.wh_store = [w,h];
							
					if(document.getElementById('switchme') && chapter.switchme_allow == false){
					
						chapter.switchme_op -= 0.01;
						
						if(chapter.switchme_op <= 0){
					
							scrollMe.removeChild(document.getElementById('switchme'));
							
							chapter.switchme_op = 1;
							
							chapter.switchme_allow = false;
					
						}else{
						
							document.getElementById('switchme').style.opacity = chapter.switchme_op;
							
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
				
				if(dlg.spherize < 3){
					
					ctx.beginPath();
			
					ctx.lineWidth = 50;
					ctx.strokeStyle = "#fff";
					ctx.arc(w,h,parseInt(((cp * 0.5) / dlg.spherize)+25),0,2*Math.PI);
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
				
				return (p - s + c * 0.5) / dlg.spherize;
				
			},
			
			eye_scroll: function(p){
						
					bottomMe.style.cursor = canvArrow.style.cursor = (p > 20) ? 'default' : 'pointer';
					
					if(p < 2.5){
						
						p = 2.5;
						
						}
				
					if(p > 300){
						
						p = 300;
						
						}
					
					dlg.spherize = p;
											  
					dlg.draw_all(dlg.wh_store[0], dlg.wh_store[1]);
			
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
				dlg.draw_all(e.changedTouches[0].clientX,e.changedTouches[0].clientY);
			}, false);
			
		}else{
		
			window.addEventListener('mousemove', function(e){
				
				dlg.draw_all(e.clientX,e.clientY);
				
			}, false);
		
		}
		
		window.addEventListener('scroll', function(e){
			dlg.eye_scroll(300 - window.pageYOffset);
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
			
			dlg.indent_x = parseInt((canvArrow.width % 50) / 2);
			dlg.indent_y = parseInt((canvArrow.height % 50) / 2);
			
			for(var i = dlg.indent_x; i < canvArrow.width; i+=50){
				lines_x.push(i);
			}
			
			for(var i = dlg.indent_y; i < canvArrow.height; i+=50){
				lines_y.push(i);
			}
			
			cp = (canvArrow.width + canvArrow.height) / 2;
			
			dlg.dw_param = [cp * 0.18,cp * 0.18,cp * 0.4];
			
			dlg.spherize = cp;
			
			scrollMe.style.height = imageMe.style.height = window.innerHeight + 300 + 'px';
			
			titleMe.style.margin = '0 ' + parseInt(50 + dlg.indent_x) + 'px';
			
			titleMe.style.top = parseInt(100 + dlg.indent_y) + 'px';
			
			titleMe.style.width = parseInt(canvArrow.width - 100 - dlg.indent_x * 2) + 'px';
			
			bottomMe.style.marginBottom = parseInt(dlg.indent_y) + 'px';
	 
	 		document.getElementById('cv_table') != null && chapter.set_mb();
				
			for(var i = 0; i < chapterLinks.length; i++){
				
				chapterLinks[i].style.top = titleMe.style.top;
				
				if(i > 0){
					
					if(chapterLinks[i-1].getBoundingClientRect().top < chapterLinks[i].getBoundingClientRect().top){
				
						chapterLinks[i].style.marginLeft = parseInt(50 + dlg.indent_x) + 'px';
					
					}else{
				
						chapterLinks[i].style.marginLeft = 50 + 'px';
					
					}
				
				}
				
			}
			
			chapterLinks[0].style.marginLeft = parseInt(50 + dlg.indent_x) + 'px';
			
			dlg.draw_all(canvArrow.width * 0.5, canvArrow.height * 0.5);
		
		}
