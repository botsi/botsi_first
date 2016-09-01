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
				
			var c = this.giveMeC(x_shift,w);
			
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
				
			c = this.giveMeC(x_shift,w);
			
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
				
			var c = this.giveMeC(y_shift,h);
			
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
				
			c = this.giveMeC(y_shift,h);
			
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
					c = this.giveMeC(x_shift,w);
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
				c = this.giveMeC(y_shift,h);
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
	
	giveMeC: function(s,p){
		
	if(window.innerWidth  <= mobil_switch_size){
		
		return 0;
		
	}
		
		return (p - s + ((p > s) ? -cp : cp) * 0.5) / this.spherize;
		
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