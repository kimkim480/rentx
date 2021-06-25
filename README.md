# Requisitos da aplicação

* **RF** -> Requisitos Funcionais
* **RNF** -> Requisitos Não Funcionais
* **RN** -> Regra de Negócios

## Cadastro de carro

**RF**
- [x] Deve ser possível cadastrar um novo carro.

**RN**
- [x] O usuário responsável pelo cadastro deve ser um usuário administrador.
- [x] Não deve ser possível cadastrar um carro com uma placa já cadastrada.
- [x] O carro deve ser cadastrado, por padrão, com disponibilidade.

## Listagem de Carros

**RF**
- [x] Deve ser possível listar todos os carros disponíveis.
- [x] Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- [x] Deve ser possível listar todos os carros disponíveis pelo nome do fabricante.
- [x] Deve ser possível listar todos os carros disponíveis pelo modelo do carro.

**RN**
- [x] O usuário não precisa estar logado.

## Cadastro de Especificação no carro

**RF**
- [x] Deve ser possível cadastrar uma especificação para um carro.

**RN**
- [x] O usuário responsável pelo cadastro deve ser um usuário administrador.
- [x] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- [x] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.

## Cadastro de imagens do carro

**RF**
 - [x] Deve ser possível cadastrar a imagem do carro.

**RNF**
- [x] Utilizar o multer para upload dos arquivos.

**RN**
- [x] O usuário responsável pelo cadastro deve ser um usuário administrador.
- [x] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.

## Aluguel de carro

**RF**
- [x] Deve ser possível cadastrar um aluguel.

**RN**
- [x] O usuário deve estar logado na aplicação.
- [x] O aluguel deve ter duração mínima de 24 horas.
- [x] Não deve ser possível cadastrar um novo aluguel para um carro alugado.
- [x] Não deve ser possível cadastrar um novo aluguel para um usuário com um aluguel em aberto.

## Listagem de Alugueis para usuário

**RF**
- [x] Deve ser possível realizar a busca de todos os alugueis para o usuário.

**RN**
- [x] O usuário deve estar logado na aplicação.

## Devolução de carro

**RF** 
- [x] Deve ser possível realizar a devolução de um carro.

**RN**
- [x] O usuário deve estar logado na aplicação.
- [x] Se o carro for devolvido com menos de 24 horas, deverá ser cobrado a diária completa.
- [x] Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- [x] Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- [x] Ao realizar a devolução,  deverá ser calculado o total do aluguel.
- [x] Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atrsaso.
- [x] Caso haja multa, deverá ser somado ao total do aluguel.

## Recuperar senha

**RF**
- [ ] Deve sere possível o usuário recuperar a senha informando o email.
- [ ] O usuário deve receber um email com o passo a passo para a recuperação da senha.
- [ ] O usuário deve conseguir inserior uma nova senha.

**RN**
- [ ] O usuário precisa informar uma nova senha.
- [ ] O link enviado para a recuperação deve expirar em 3 horas.