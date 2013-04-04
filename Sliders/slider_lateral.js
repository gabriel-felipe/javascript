slider_lateral = function(holder, item){
	var S = this;
	S.principal = $(holder);
	S.miniHolder = S.principal.find(".container");
	S.viewport = S.principal.find(".window");
	
	S.ctrLeft = S.principal.find(".seta.esq");
	S.ctrRight = S.principal.find(".seta.dir");
	S.pics = S.miniHolder.find(item);
	S.qtnPics = S.pics.size();
	S.picSize = {w: null, h:null};

	if(S.qtnPics > 0){
		pic = S.pics.first();
		picW = pic.width();

		picW += parseFloat(pic.css("padding-left"));

		picW += parseFloat(pic.css("padding-right"));

		picW += parseFloat(pic.css("margin-left"));

		picW += parseFloat(pic.css("margin-right"));
		picW += parseFloat(pic.css("border-left-width"));
		picW += parseFloat(pic.css("border-right-width"));
		
		S.picSize.w = picW;

		picH = pic.width();
		picH += parseFloat(pic.css("padding-top"));
		picH += parseFloat(pic.css("padding-bottom"));
		picH += parseFloat(pic.css("margin-top"));
		picH += parseFloat(pic.css("margin-bottom"));
		picH += parseFloat(pic.css("border-width")) * 2;
		picH += 1;
		S.picSize.h = picH;
	}
	S.viewport.css("width", (S.picSize.w * S.qtnPics)+"px");
	S.viewportSize = {h: S.viewport.height(), w: S.viewport.width()};
	S.picsShown = Math.round(S.miniHolder.width() / S.picSize.w);
	S.VPFirst = 1;
	S.VPLast = (S.qtnPics >= S.picsShown) ? S.picsShown : S.qtnPics;
	S.timer = 200;
	S.canMove = true;
	S.next = function(){
		if(S.canMove){
			S.canMove = false;
			nextAmount = (S.qtnPics - S.VPLast >= S.picsShown) ? S.picsShown : S.qtnPics - S.VPLast;
			S.VPFirst += nextAmount;
			S.VPLast += nextAmount;
			nextAmount = nextAmount*S.picSize.w;
			S.viewport.animate({"margin-left": "-="+nextAmount+"px"}, S.timer, function(){
				S.canMove = true;
				S.shControls();
			});	
		}

	}
	S.previous = function(){
		if(S.canMove){
			S.canMove = false;
			nextAmount = (S.VPFirst <= S.picsShown) ? S.VPFirst - 1 : S.picsShown;
			S.VPFirst -= nextAmount;
			S.VPLast -= nextAmount;

			nextAmount = nextAmount*S.picSize.w;
			S.viewport.animate({"margin-left": "+="+nextAmount+"px"}, S.timer, function(){
				S.canMove = true;
				S.shControls();
			});	

		}
	}
	S.ctrRight.click(function(){
		if(!$(this).hasClass("off")){
			S.next();
		}
	});
	S.ctrLeft.click(function(){
		if(!$(this).hasClass("off")){
			S.previous();
		}
	});

	S.shControls = function(){
		if(S.VPFirst <= 1){
			S.ctrLeft.addClass("off");
		} else {
			S.ctrLeft.removeClass("off");
		}
		if(S.VPLast >= S.qtnPics){
			S.ctrRight.addClass("off");
		} else {
			S.ctrRight.removeClass("off");
		}
	}
	S.shControls();
}