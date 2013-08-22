/*
* ----------------------------------------------------------------------------
* "THE BEER-WARE LICENSE" (Revision 42):
* <phk@FreeBSD.ORG> wrote this file. As long as you retain this notice you
* can do whatever you want with this stuff. If we meet some day, and you think
* this stuff is worth it, you can buy me a beer in return Poul-Henning Kamp
* ----------------------------------------------------------------------------
*/

/*Plugin para fazer select box customizado utilizando a seguinte marcação:
<div class="pergunta select">
	<div class="seta"></div>
	<label title='renda_pessoal'>Selecione à renda da sua família</label>
	<div class="opcoes">
		<button>Nenhuma (Estudante / Desempregado)</button>
		<button>Até R$800</button>
		<button>De R$800 Até R$1200</button>
		<button>De R$1200 Até R$1600</button>
		<button>De R$1600 Até R$2500</button>
		<button>Maior que R$2500</button>
	</div>
	<input type='hidden' name='renda_pessoal' />
</div>
select = new selectBox('.pergunta.select');

Suporte a navegação por teclado.
*/
//--=-=-=-=-SELECT SINGLE //
function selectBox(obj){
//Construindo.
var select = this;
select.all = $(obj);
select.label = $(obj).children("label");
select.seta = $(obj).children("#seta");
select.opcoes = $(obj).children(".opcoes");
select.nomeCampo = this.seta.attr("title");
select.input = $(obj).children("input");
select.duracaoEfeito = 150;
select.efeitoIn = "fade";
select.efeitoOut = "fade";
select.buttonAtivo = 0;

//Tratando div como input
select.all.attr("tabindex",'0');

//Definindo FunÃƒÂ§ÃƒÂµes

select.all.keydown(function(e){

        if(e.which ==40){
          e.preventDefault();
          select.mostraOpcoes();
          select.buttonAtivo = (select.buttonAtivo >= $(this).find('button').size() - 1)  ? 0 : select.buttonAtivo + 1;
          $(this).find('button').removeClass("on");
          $(this).find('button').eq(select.buttonAtivo).addClass("on");
        } else if(e.which == 38){
          e.preventDefault();
          select.mostraOpcoes();
          select.buttonAtivo = (select.buttonAtivo  <= 0)  ? $(this).find('button').size() - 1: select.buttonAtivo - 1;
          $(this).find('button').removeClass("on");
          $(this).find('button').eq(select.buttonAtivo).addClass("on");
        } else if(e.which == 13 || e.which == 32){
          select.mostraOpcoes();
          $(this).find('button').eq(select.buttonAtivo).click();
        } 
      });
select.all.focus(function(){
  scroll = ($('body,html').scrollTop() > select.all.offset().top + select.all.height() + select.opcoes.height() - $('body').height() + 50 ) ? $('body,html').scrollTop() : select.all.offset().top + select.all.height() + select.opcoes.height() - $('body').height() + 50;
  $('body,html').scrollTop(scroll);
});
select.all.blur(function(){
  select.buttonAtivo = 0;
  $(this).find('button').removeClass("on");
});

select.all.find('button').mouseenter(function(){
  $(this).parent().find("button").removeClass("on");
  $(this).addClass("on");
  select.buttonAtivo = $(this).index();
  select.all.focus();
});

select.apagaOpcoes = function(){
 switch(select.efeitoOut){
 case "fade": select.opcoes.fadeOut(select.duracaoEfeito); break;
 case "slide": select.opcoes.slideUp(select.duracaoEfeito); break;
 case "none": select.opcoes.hide(select.duracaoEfeito); break;
 }
}

select.mostraOpcoes = function(){
 switch(select.efeitoIn){
 case "fade": select.opcoes.fadeIn(select.duracaoEfeito); break;
 case "slide": select.opcoes.slideDown(select.duracaoEfeito); break;
 case "none": select.opcoes.show(select.duracaoEfeito); break;
 }
}

select.confEfeito = function(obj) {
jQuery.extend(select, obj);
}

//PrÃƒÂ© funÃƒÂ§ÃƒÂµes
select.opcoes.fadeOut(0);

//Configurando CSS's

select.opcoes.css(
 {
 "position": "absolute",
 "z-index" : "100"
 });
//Controladores de evento
 select.seta.click(function(){
 select.mostraOpcoes();
 });
 select.all.click(function(){
 select.mostraOpcoes();
 });
 select.all.focus(function(){
  select.mostraOpcoes();
 });
 select.all.blur(function(){
  select.apagaOpcoes();
 });
 select.opcoes.children("button").click(function(){
   valor=$(this).attr("value");
   html = $(this).html();
   select.label.html(html);
   select.input.val(valor);
   select.onchange(valor);
   select.apagaOpcoes();
   return false;
  });
 select.onchange = function(valor){

 }

 select.all.mouseleave(function(){
  select.apagaOpcoes();
 });
}

/* Função para transformar todas as div.select em select box customizadas */
function caixaformulario(){
  $('div.select').each(function(){
    var selecta = new selectBox(this);
       if($(this).hasClass("filtro")){  
          selecta.onchange = function(valor){
           location = valor;
        }
     }
  });
}

caixaformulario();

