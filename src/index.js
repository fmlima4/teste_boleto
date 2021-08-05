const express = require('express');
const boleto = require( './app/controllers/BoletoController');

const app = express();

app.use(express.json())

//defino a rota da aplicação onde o :linha é o codigo a ser informado 
app.get("/boleto/:linha", (request ,response) => {
    const {linha} = request.params
    //verifico se existe apenas numeros na linha infomrada
    var is_num = new RegExp('^\\d+$');
    if (!is_num.test(linha)) {
        return response.status(400).json({error: "Linha invalida", message: "Informe apenas numeros por favor"})
    }
    //verifico tamanho da linha informada
    if(linha.length < 47) {
        return response.status(400).json({error: "Linha invalida", message: "Numero informado menor que 47 caracteres"})
    }   

    //transformo a linha em codigo de barras
    const barCode = boleto.calcula_barra(linha)
    console.log(barCode)

    // verifico se calculou certo o codigo de barras a partir da linha informada caso nao tenha retorno erro
    if(!is_num.test(barCode) ){
        return response.status(400).json(barCode)
    }

    //pego a data de vencimento do boleto usando a data base + numero de dias informado no boleto
    const expirationDate = boleto.fator_vencimento(barCode.substr(5,4)).substr(0,9)
    console.log(expirationDate)

    //Formato o valor do boleto 
    const amount = boleto.calcula_valor(barCode.substr(9,10))
    console.log(amount)

    //retorno o objeto com as informaçoes solicitadas
    return response.status(200).json({
        barCode: barCode, 
        expirationDate:expirationDate, 
        amount:amount
    })

});

//rodo a aplicação na porta localhost:8080
app.listen(8080);

//
//
//
//
// Exemplo de resquest 
// GET/ http://localhost:8080/boleto/23799755200003700003381260007827139500006330 

//Exemplo de response 

// status 200 

// { 
//  “barCode”: “21299758700000020000001121100012100447561740”, 
//  “amount”: “20.00”, 
//  “expirationDate”: “2018-07-16” 
// } 
