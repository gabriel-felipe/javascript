(function( $ ) {
  $.fn.abas = function() {
  	conteudoBox = this.find(".aba-conteudo");
  	abas = this.find("li");
  	abas.click(function(){
  		abas.removeClass("ativa");
  		$(this).addClass("ativa");
  	});
  	abas.first().addClass("ativa");
  }

  $.fn.abasotherdiv = function() {
    conteudoBox = this.find(".aba-conteudo");
    abas = this.find("li");
    abas.find("div.conteudo").hide();
    abas.click(function(){
      abas.removeClass("ativa");
      $(this).addClass("ativa");
      conteudoBox.html($(this).find("div.conteudo").html());
    });
    abas.first().addClass("ativa");
    conteudoBox.html(abas.first().find("div.conteudo").html());
  }
})( jQuery );
$("section.abas").each(function(){
  if($(this).hasClass("other-div")){
    $(this).abasotherdiv();
  } else {
    $(this).abas();
  }
});