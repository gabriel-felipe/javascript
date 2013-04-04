
function radio(obj){
//Construindo.

var radio = this;
radio.all = $(obj);
radio.opcoes = $(obj).find(".option");
radio.input = $(obj).find("input");

radio.opcoes.attr("tabindex",'0');

radio.opcoes.click(function(){
	radio.opcoes.removeClass('ativa');
	$(this).addClass('ativa');
	radio.input.val($(this).attr('value'));
	$(this).blur();
	$(this).focus();
});
radio.opcoes.keydown(function(e){
	if(e.which == 13 || e.which == 32){
		$(this).click();
	}
});

}
function madeRadios(){
  $('div.radio').each(function(){
    var radioa = new radio(this);     
  });
}

madeRadios();

