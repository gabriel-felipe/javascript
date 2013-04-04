var slider = new function(){
	slide = this
	S = this;
	S.conf = {};
	S.controls = {};
	S.controls.dir = $("#slider .seta.dir");
	S.controls.esq = $("#slider .seta.esq");
	S.controls.play = $("#slider .play");
	S.conf.timerWidth = $("#slider .timer").width();
	S.conf.progressObj = $("#slider .progress");
	S.conf.progress = 0;
	S.conf.slides = $("#slider .slide");
	S.conf.numAtual = 1;
	S.playing = true;
	slide.updProgress = function(){
		var time = 5000 - 5000 * parseInt(S.conf.progressObj.width())/S.conf.timerWidth;
		S.conf.progressObj.animate({"width":S.conf.timerWidth+"px"},time, function(){
			if(S.playing){
				S.proximaImg();
				window.setTimeout(function(){
					S.conf.progressObj.css("width", "0");
					S.updProgress();
				},500);
			}
		});
	}
	function prepare(){
		num = 1;
		S.conf.slides.each(function(){
			$(this).attr("num", num);
			classeCounter = "";
			if(num == 1){
				$(this).addClass("atual");
			} else {
				$(this).addClass("proximo");
			}
			num++;
		});
	}
	slide.updateClasses = function(){
		numAtual = S.conf.numAtual;
		S.conf.slides.each(function(){
			num = $(this).attr("num");
			if(num < numAtual){
				$(this).removeClass("proximo");
				$(this).removeClass("atual");
				if(!$(this).hasClass("anterior")){
					$(this).addClass("anterior");
				}
			} else if(num == numAtual){
				$(this).removeClass("anterior");
				$(this).removeClass("proximo");
				if(!$(this).hasClass("atual")){
					$(this).addClass("atual");
				}
			} else if(num > numAtual){
				$(this).removeClass("anterior");
				$(this).removeClass("atual");
				if(!$(this).hasClass("proximo")){
					$(this).addClass("proximo");
				}
			}
		});
	}
	slide.pause = function(){
		S.controls.play.show();
		S.conf.progressObj.stop();
		S.playing = false;
	}
	slide.play = function(){
		S.controls.play.hide();
		S.playing = true;
		slide.updProgress();
	}
	slide.proximaImg = function(){
		S.conf.numAtual = (S.conf.numAtual < S.conf.slides.size()) ? S.conf.numAtual + 1 : 1; 
		slide.updateClasses();
	}
	slide.voltaImg = function(){
		S.conf.numAtual = (S.conf.numAtual > 1) ? S.conf.numAtual - 1 : S.conf.slides.size(); 
		slide.updateClasses();
	}
	slide.vaipara = function(n){
		S.conf.numAtual = n;
		slide.updateClasses();
	}
	S.controls.dir.click(function(){
		slide.pause();
		slide.proximaImg();
	});
	S.controls.esq.click(function(){
		slide.pause();
		slide.voltaImg();
	});
	S.controls.play.click(function(){
		slide.play();
	});
	prepare();
	slide.play();
}
