
const BOLETO = { }
 
BOLETO.calcula_valor = (val) => {
    //Instanciando o objeto
    var formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
    });
    //pega o valor no campo e transforma em float
    var valor = parseFloat(val.substr(0,8));

    var formatado = formatter.format(valor); 

    return(formatado + ',' + val.substr(8,2));
}

BOLETO.calcula_barra = (linha) => {
    var barra  = linha.replace(/[^0-9]/g,'');
        
    barra  = barra.substr(0,4)
            +barra.substr(32,15)
            +barra.substr(4,5)
            +barra.substr(10,10)
            +barra.substr(21,10);

    if (modulo11_banco(barra.substr(0,4)+barra.substr(5,39)) != barra.substr(4,1)) {
        return ({error: "Digito verificador invalido", message:'Digito verificador '+barra.substr(4,1)+', o correto é '+modulo11_banco(barra.substr(0,4)+barra.substr(5,39))});
    }

    return(barra);
}

BOLETO.fator_vencimento = (dias) => {
    var currentDate, t, d, mes;
    t = new Date();
    currentDate = new Date();
    currentDate.setFullYear(1997,9,7);
    t.setTime(currentDate.getTime() + (1000 * 60 * 60 * 24 * dias));
    mes = (currentDate.getMonth()+1); if (mes < 10) mes = "0" + mes;
    dia = (currentDate.getDate()+1); if (dia < 10) dia = "0" + dia;
    
    return(t.toLocaleString());
}

function modulo11_banco(numero){

    numero = numero.replace(/[^0-9]/g,'');
    //debug('Barra: '+numero);
    var soma  = 0;
    var peso  = 2;
    var base  = 9;
    var resto = 0;
    var contador = numero.length - 1;
    //debug('tamanho:'+contador);
    // var numero = "12345678909";
    for (var i=contador; i >= 0; i--) {
        //alert( peso );
        soma = soma + ( numero.substring(i,i+1) * peso);
        //debug( i+': '+numero.substring(i,i+1) + ' * ' + peso + ' = ' +( numero.substring(i,i+1) * peso)+' soma='+ soma);
        if (peso < base) {
            peso++;
        } else {
            peso = 2;
        }
    }
    var digito = 11 - (soma % 11);
    //debug( '11 - ('+soma +'%11='+(soma % 11)+') = '+digito);
    if (digito >  9) digito = 0;

    if (digito == 0) digito = 1;
    return digito;
}

module.exports = BOLETO
