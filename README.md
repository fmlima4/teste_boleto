# teste_boleto
Validação de linhas digitaveis/boleto

Por hora codigo testado e funcional para o seguinte comportamente descrito abaixo 


Exemplo de resquest:
    `GET/ http://localhost:8080/boleto/23799755200003700003381260007827139500006330`


Exemplo de response:
```
{
    status 200,
    { 
        “barCode”: “21299758700000020000001121100012100447561740”, 
        “amount”: “20.00”, 
        “expirationDate”: “2018-07-16” 
    } 
}
```
Para executar a aplicação:

1 - `Baixar o repositorio`
2 - `Rodar o comando yarn para baixar as dependencias nescessarias`
3 - `Rodar o comando yarn dev no terminal para iniciar a aplicação`  


By Felipe miranda de lima. 
