/*Limpar os valores padrões dos campos de input*/
$("input[type=text],textarea").focus(function(){
	if ($(this)[0].value == $(this)[0].defaultValue) {
		$(this)[0].value = "";
	}	
});
$("input[type=text],textarea").blur(function(){
        if ($(this)[0].value == "") {
	        $(this)[0].value = $(this)[0].defaultValue;
        }
});
