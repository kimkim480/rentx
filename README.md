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
- [x] O usuário responsável pelo cadastro deve ser um usuário administrador.
- [x] O aluguel deve ter duração mínima de 24 horas.
- [x] Não deve ser possível cadastrar um novo aluguel para um carro alugado.
- [x] Não deve ser possível cadastrar um novo aluguel para um usuário com um aluguel em aberto.