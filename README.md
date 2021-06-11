# Requisitos da aplicação

* **RF** -> Requisitos Funcionais
* **RNF** -> Requisitos Não Funcionais
* **RN** -> Regra de Negócios

## Cadastro de carro

**RF**
* Deve ser possível cadastrar um novo carro.

**RN**
* O usuário responsável pelo cadastro deve ser um usuário administrador.
* Não deve ser possível cadastrar um carro com uma placa já cadastrada.
* Não deve ser possível alterar a placa de um carro já cadastrado.
* O carro deve ser cadastrado, por padrão, com disponibilidade.

## Listagem de Carros

**RF**
* Deve ser possível listar todos os carros disponíveis.
* Não deve ser possível listar todos os carros disponíveis pelo nome da categoria.
* Deve ser possível listar todos os carros disponíveis pelo nome do fabricante.
* Deve ser possível listar todos os carros disponíveis pelo modelo do carro.

**RN**
* O usuário não precisa estar logado.

## Cadastro de Especificação no carro

**RF**
* Deve ser possível cadastrar uma especificação para um carro.

**RN**
* O usuário responsável pelo cadastro deve ser um usuário administrador.
* Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
* Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.

## Cadastro de imagens do carro

**RF**
* Deve ser possível cadastrar a imagem do carro.
* Deve ser possível listar todos os carros.

**RNF**
* Utilizar o multer para upload dos arquivos.

**RN**
* O usuário responsável pelo cadastro deve ser um usuário administrador.
* O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.

## Aluguel de carro

**RF**
* Deve ser possível cadastrar um aluguel.

**RN**
* O aluguel deve ter duração mínima de 24 horas.
* Não deve ser possível cadastrar um novo aluguel para um carro alugado.
* Não deve ser possível cadastrar um novo aluguel para um usuário com um aluguel em aberto.