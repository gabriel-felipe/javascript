
(function( $ ) {
  $.fn.numberBox = function() {
    var input = this.find("input");
    var numberHolder = this.find("p.number");
    var numberAtual = 0;
    var get_number = function(){
      number = parseInt(numberHolder.html());
      return number;
    }
    var soma = function(){
      numberAtual = get_number() + 1;
      set_number();
    }
    var menos = function(){
      if(get_number() > 1){
      numberAtual = get_number() - 1;
      } else{
        alert("VocÃª nÃ£o pode adicionar menos que uma peÃ§a");
      }

      set_number();
    }
    var set_number = function(){
      numberHolder.html(numberAtual);
      if(input){
        input.val(numberAtual);
        input.change();

      }

    }

    var maisBt = this.find(".mais");
    var menosBt = this.find(".menos");
    var numberAtual = get_number();
    
    
    maisBt.click(function(){
      soma();
    });
    menosBt.click(function(){
      menos();
    });
  }
})( jQuery );
$(".numberBox").numberBox();
