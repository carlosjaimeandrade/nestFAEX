
# 🚀 Principais Características do NestJS
O NestJS é um framework poderoso para Node.js que utiliza TypeScript e uma arquitetura modular. Abaixo estão suas principais características:
## Baseado em módulos
O NestJS organiza o código em módulos (modules), controladores (controllers) e serviços (services), tornando o projeto mais estruturado e fácil de entender.
## Suporte nativo a TypeScript
O TypeScript fornece tipagem estática, autocompletar e detecção de erros em tempo de compilação.
## Injeção de dependência (DI)
O NestJS usa um sistema de Dependency Injection, o que facilita o reaproveitamento e o teste de componentes.
## Compatível com bibliotecas do ecossistema Node.js
Ele integra facilmente com Express (por padrão) ou Fastify (para melhor performance).

# 🚀 Programação Orientada a Objetos (POO)
A Programação Orientada a Objetos (POO) é um paradigma de programação que organiza o código em objetos — estruturas que representam entidades do mundo real, combinando dados (atributos) e comportamentos (métodos).

Em vez de criar funções soltas, você cria classes que modelam conceitos como “Usuário”, “Produto” ou “Pedido”.
Essas classes servem como modelos (ou “moldes”) para criar instâncias — os objetos em si.

##  POO no NestJS

O NestJS é um framework fortemente baseado em orientação a objetos, pois:

Usa classes para criar controllers, services e modules.

Utiliza decorators (@Controller, @Injectable, @Module) para dar contexto às classes.

Trabalha com injeção de dependência (instancia automaticamente classes dentro de outras).

```ts
class Usuario {
  constructor(
    private nome: string,
    private idade: number
  ) {}

  apresentar() {
    return `Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.`;
  }
}

// Criando um objeto (instância)
const user1 = new Usuario('Carlos', 30);
console.log(user1.apresentar());

// Criando um segundo objeto (instância)
const user2 = new Usuario('Jose', 31);
console.log(user2.apresentar());

```
🔹 Aqui, Usuario é uma classe (modelo), e user é uma instância (objeto real criado a partir dela).

🔹O constructor (ou construtor) é um método especial de uma classe que é executado automaticamente quando você cria uma nova instância dessa classe.

👉 Em outras palavras:
Ele inicializa o objeto, define seus valores iniciais e prepara tudo o que ele precisa para funcionar.

🔹O nest foi projetado para trabalhar com POO

# 🚀 Guia de Instalação e Uso do Nest.js

## 🔧 Instalar o CLI globalmente
O CLI (Command Line Interface) do Nest.js é um conjunto de comandos que te permite criar, gerar e gerenciar projetos de forma automática, sem precisar fazer tudo manualmente.

```bash
npm install -g @nestjs/cli
```

## 📋 Ver lista de comandos disponíveis
```bash
nest
```

### 📘 Resumo de alguns comandos

| Comando | Função |
|----------|---------|
| `nest new nome-projeto` | Cria um novo projeto Nest.js do zero |
| `nest generate module users` ou `nest g mo users` | Cria um módulo |
| `nest generate controller users` ou `nest g co users` | Cria um controller |
| `nest generate service users` ou `nest g s users` | Cria um service |
| `nest build` | Compila o projeto (gera o diretório `dist/`) |
| `nest start` | Inicia o servidor |
| `nest start --watch` ou `npm run start:dev` | Inicia o servidor com reload automático |
| `nest info` | Mostra as versões do Nest, Node, TypeScript, etc. |

---

## 🆕 Criar um novo projeto
```bash
nest new api-faex
```

---

## 📦 Estrutura básica de um módulo

No arquivo `app.module.ts`:
```ts
@Module({
  imports: [],       // importa outros módulos
  controllers: [],   // declara os controllers deste módulo
  providers: [],     // registra os serviços (providers) deste módulo
  exports: [],       // (opcional) exporta providers para outros módulos
})
export class MeuModulo {}
```

---

## 🌐 Definindo verbos HTTP em Controllers

Importe os decoradores do Nest:
```ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  Query,
  Headers,
  Req,
  Res
} from '@nestjs/common';
```
## ⚙️ Exemplo de uso decoradores do Nest:
```ts
import { Controller, Get, Param, Query, Post, Body } from '@nestjs/common';
export class UsersController {
    constructor(
        private usersService: UsersService,
        @InjectModel(Users.name) private users: Model<Users>
    ) {}
    ...
    @Get()
    findAll(@Query() query: UserQuery) {
        return {
            name: query.name,
            age: query.age
        }
    }

    @Post()
    async create (@Body() body: CreateUserDto) {
        const numero = this.usersService.test()

        await this.users.create({
            nome: "test",
            email: "teste"
        })

        return {
            name: body.name,
            age: body.age, 
            numero
        }
    }
  ...
```
---

## 🧩 Uso do Class Validator

### Instalação:
```bash
npm install class-validator class-transformer
```

O **class-validator** faz a **validação**,  
e o **class-transformer** converte o `body` (JSON) para uma instância da classe DTO.

---

## ✅ Validações mais usadas

### 🔤 Strings

| Decorador | Descrição | Exemplo |
|------------|------------|----------|
| `@IsString()` | Verifica se é uma string | `"Carlos"` ✅ |
| `@IsNotEmpty()` | Verifica se não está vazio | `""` ❌ |
| `@MinLength(n)` | Tamanho mínimo da string | `@MinLength(3)` |
| `@MaxLength(n)` | Tamanho máximo da string | `@MaxLength(20)` |
| `@Matches(regex)` | Verifica regex | `@Matches(/^[A-Za-z]+$/)` |
| `@IsEmail()` | Verifica se é e-mail válido | `"user@gmail.com"` ✅ |
| `@IsUUID()` | Verifica se é UUID válido | `"f47ac10b-58cc-4372"` ✅ |
| `@IsPhoneNumber('BR')` | Verifica número de telefone | `"@IsPhoneNumber('BR')"` ✅ |

---

### 🔢 Números

| Decorador | Descrição | Exemplo |
|------------|------------|----------|
| `@IsInt()` | Número inteiro | `30` ✅ |
| `@IsNumber()` | Número (int/float) | `12.5` ✅ |
| `@Min(n)` | Valor mínimo | `@Min(18)` |
| `@Max(n)` | Valor máximo | `@Max(99)` |
| `@IsPositive()` | Verifica se > 0 | ✅ |
| `@IsNegative()` | Verifica se < 0 | ✅ |

---

### 📅 Datas

| Decorador | Descrição | Exemplo |
|------------|------------|----------|
| `@IsDate()` | Verifica se é um objeto `Date` | `new Date()` ✅ |
| `@IsDateString()` | Verifica se é string ISO | `"2025-11-10"` ✅ |
| `@MinDate(date)` | Depois da data informada | `@MinDate(new Date())` |
| `@MaxDate(date)` | Antes da data informada | `@MaxDate(new Date('2025-12-31'))` |

---

### ✅ Booleanos

| Decorador | Descrição | Exemplo |
|------------|------------|----------|
| `@IsBoolean()` | Verifica se é `true` ou `false` | ✅ |
| `@IsOptional()` | Campo opcional | ✅ |

---

### 📦 Arrays e Objetos

| Decorador | Descrição | Exemplo |
|------------|------------|----------|
| `@IsArray()` | Verifica se é um array | `[1, 2, 3]` ✅ |
| `@ArrayMinSize(n)` | Tamanho mínimo | `@ArrayMinSize(1)` |
| `@ArrayMaxSize(n)` | Tamanho máximo | `@ArrayMaxSize(5)` |
| `@IsObject()` | Verifica se é um objeto | `{}` ✅ |
| `@ValidateNested()` | Valida objetos aninhados | Usado com `@Type()` do class-transformer |

---

### 🌐 Outros úteis

| Decorador | Descrição | Exemplo |
|------------|------------|----------|
| `@IsDefined()` | Campo obrigatório | `obrigatório` |
| `@IsEnum(Enum)` | Verifica se pertence ao enum | `@IsEnum(UserRole)` |
| `@IsUrl()` | Verifica se é URL válida | `"https://site.com"` ✅ |
| `@IsJSON()` | Verifica se é JSON válido | `'{"a":1}'` ✅ |
| `@IsLowercase()` | Verifica minúsculas | `"abc"` ✅ |
| `@IsUppercase()` | Verifica maiúsculas | `"ABC"` ✅ |

---

## ⚙️ Exemplo de uso create-user.dto
```ts
import {IsString, IsNumber} from "class-validator"

export class CreateUserDto {
    @IsString()
    name: string

    @IsNumber()
    age: number
}
```

### Outro exemplo

```ts
import {IsString, IsEmail, IsArray, IsIn, IsBoolean, IsOptional, ValidateNested } from "class-validator"
import { Type } from 'class-transformer';

//criando tipo personalizado de dados
export class SchedulerFieldDto {
  @IsString()
  type: string;

  @IsBoolean()
  required: boolean;

  @IsString()
  label: string;

  @IsString()
  placeholder: string;

  @IsOptional()
  @IsArray()
  options?: any[];
}

export class CreateSchedulerConfigDto {
    @IsString()
    name: string

    @IsString()
    description: string;

    @IsString()
    color: string;

    //podemos usar o isIN para definir alguns valores obrigtorios dentro da lista
    @IsArray()
    @IsString({ each: true })
    @IsIn(["segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"], { each: true })
    weekdays: string[];

    @IsArray()
    @Type(() => SchedulerFieldDto) //transforma o JSON bruto que vem no request em objetos no formato que o NestJS (e o class-validator) entendem corretamente.
    @ValidateNested({ each: true }) //diz que cada item do array deve ser validado baseado na configuração personalizada do dto
    fields: SchedulerFieldDto[];
}
```

```ts
import { IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

//quando criamos um dto de query params todos os dados vem do tipo string, nesse caso como queremos um dato do tipo boolean podemos converter o dado usando o transform
export class QueryGetSchedulerDto {
    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => value === 'true') 
    status?: boolean;
}
```

## ⚙️ Ativando validação global (main.ts)

No arquivo `main.ts`:
```ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔥 Habilita a validação automática em todos os DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // remove campos que não estão no DTO
      forbidNonWhitelisted: true, // retorna erro se enviar campos extras
      transform: true,           // converte payload em instância da classe DTO
    }),
  );

  await app.listen(3000);
}
bootstrap();
```

💡 Esse `ValidationPipe` é quem:
- Lê seus decorators (`@IsString`, `@IsNumber`, etc.)
- Chama o `class-validator`
- E dispara o erro 400 automaticamente se algo estiver inválido.



## ⚠️ Personalizando erros


### Resumo rápido

| Tipo | Exemplo | Status | Descrição |
|------|----------|---------|-----------|
| Erro de validação | `throw new BadRequestException('Campos inválidos')` | 400 | Entrada incorreta |
| Não autorizado | `throw new UnauthorizedException()` | 401 | Falta de token |
| Acesso negado | `throw new ForbiddenException()` | 403 | Permissão insuficiente |
| Não encontrado | `throw new NotFoundException('Usuário não encontrado')` | 404 | Recurso inexistente |
| Genérico | `throw new HttpException('Falha', HttpStatus.INTERNAL_SERVER_ERROR)` | 500 | Erro geral |

Importe as exceções de:
```ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
...
export class UsersService {
    test() {
        throw new BadRequestException('ocorreu um erro')
        ...
    }
    ...
}
```

# 🗄️ Guia Completo de Instalação e Uso do MongoDB + NestJS

## 🚀 Instalação do MongoDB e Ferramentas

### 🧩 Baixe o MongoDB Compass
🔗 [https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass)

> **MongoDB Compass** é a interface gráfica oficial do MongoDB — uma ferramenta visual que te permite explorar, gerenciar e manipular seus bancos de dados de forma simples, sem precisar usar comandos no terminal.

### ☁️ Crie uma conta no MongoDB Atlas
Crie uma conta gratuita no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) para ter um banco de dados na nuvem.

### 💾 Baixe o MongoDB Community Server
🔗 [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

Após a instalação, execute o arquivo:
```
C:\Program Files\MongoDB\Server\8.2\bin\mongod
```
> Isso iniciará o servidor MongoDB local.

### 🧭 Conecte-se ao servidor no MongoDB Compass
Abra o Compass e crie uma nova conexão com a URL:
```
mongodb://localhost:27017
```

---

## 🧠 Antes de conectar — entendendo a diferença entre ORM e ODM

### 🔹 1. O que é ORM (Object Relational Mapper)

O **ORM** (*Object Relational Mapping*) é uma técnica (ou biblioteca) que faz a **ponte entre os objetos do seu código** e as **tabelas de um banco de dados relacional (SQL)**.

👉 Em outras palavras, ele converte **classes e objetos** em **linhas e colunas** no banco.

Exemplo de ORM:  
- **Sequelize**, **TypeORM**, **Prisma** (para MySQL, PostgreSQL, etc.)

---

### 🔹 2. O que é ODM (Object Document Mapper)

O **ODM** (*Object Document Mapping*) é o equivalente do ORM, mas para **bancos de dados orientados a documentos**, como o **MongoDB**.

👉 Ele converte **objetos do código** em **documentos JSON (ou BSON)** armazenados no banco.


| Conceito | MySQL | MongoDB | Explicação |
|-----------|--------|----------|-------------|
| Banco de Dados | Database | Database | Conjunto principal que armazena todas as tabelas (MySQL) ou coleções (MongoDB). |
| Tabela | Table | Collection | Agrupa registros do mesmo tipo. |
| Linha | Row | Document | Cada registro dentro da tabela/coleção. |
| Coluna | Column | Field | Nome de uma propriedade dentro de um documento. |
| Valor | Cell Value | Value | Conteúdo real armazenado. |
| Chave Primária | id | _id: ObjectId(...) | Identificador único gerado automaticamente. |
| Relacionamento | Foreign Key | ObjectId ou Embedded Document | Mongo usa referências ou documentos embutidos. |
| Estrutura | Fixa | Flexível | No MySQL, a estrutura é fixa; no Mongo, pode variar. |
| Consulta | SQL | BSON/JSON | SQL usa comandos, Mongo usa objetos JSON. |
| Join | JOIN | populate() | Mongo faz junções via referências. |

---

## 🧠 Comandos básicos do MongoDB

| Categoria | Comando | Explicação | Exemplo |
|------------|----------|-------------|----------|
| Criar/Selecionar banco | `use nomeDoBanco` | Cria ou muda para o banco especificado | `use escola` |
| Ver bancos | `show dbs` | Lista todos os bancos de dados | — |
| Ver coleções | `show collections` | Mostra as coleções do banco atual | — |
| Criar coleção | `db.createCollection("nome")` | Cria uma nova coleção | `db.createCollection("users")` |
| Inserir documento | `db.users.insertOne({...})` | Insere um documento | `db.users.insertOne({ nome: "Ana", idade: 20 })` |
| Buscar todos | `db.users.find()` | Lista todos os documentos | `db.users.find()` |
| Buscar por filtro | `db.users.find({ campo: valor })` | Busca documentos com base em condição | `db.users.find({ nome: "Ana" })` |
| Atualizar documento | `db.users.updateOne(filtro, { $set: {...} })` | Atualiza um documento | `db.users.updateOne({ nome: "Ana" }, { $set: { idade: 22 } })` |
| Excluir documento | `db.users.deleteOne(filtro)` | Remove o primeiro documento correspondente | `db.users.deleteOne({ nome: "João" })` |
| Contar documentos | `db.users.countDocuments()` | Conta quantos documentos existem | `db.users.countDocuments()` |

---

## ⚙️ Conectando o MongoDB no NestJS

### Instalar o Mongoose ODM
```bash
npm install @nestjs/mongoose mongoose
```

### Configurar o AppModule
```ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/meuBanco'),
    UsersModule,
  ],
})
export class AppModule {}
```

---

## 📘 Criando o Schema `users`

Crie o arquivo `src/users/schema/users.schema.ts`:

```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Users extends Document {
  @Prop()
  nome: string;

  @Prop()
  email: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
```
---
  @Prop() diz ao Nest + Mongoose que esse campo deve existir dentro do documento salvo no MongoDB.
  @Schema() → indica que essa classe representa um schema MongoDB

---

## 🔗 Ligando o Schema ao Service

```ts
import { Model } from 'mongoose';
import { Users } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';

constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}
```
---
 
  O @InjectModel() é um decorator de injeção de dependência do NestJS
  usado para injetar o Model (modelo do Mongoose) dentro de um service.
  Em resumo:

  Ele permite que você use a coleção do MongoDB (via Mongoose) dentro de uma classe do NestJS, como o Service.

---

## 🧩 Registrando o Schema no Módulo

Arquivo `src/users/users.module.ts`:

```ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users, UsersSchema } from './schema/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

---

## 🧪 Testando a Inserção

```ts
await this.usersModel.create({
  nome: "test",
  email: "teste@email.com"
});
```

---

## 🧱 Sobre o campo `__v`

O campo `__v` é adicionado automaticamente pelo Mongoose e serve como **controle de versão** do documento.  
Cada vez que você executa um `.save()`, o valor de `__v` é incrementado.

Pode ser desativado com:
```ts
@Schema({ versionKey: false })
```

## Função de cada camada no nest

# ✔ Controller

Recebe a requisição HTTP

Extrai parâmetros (@Body, @Param, @Query)

Chama o service

Não contém lógica de negócio

Não decide regras, nem faz validações de banco

Só retorna o resultado do service para o cliente

# ✔ Service

Contém toda lógica de negócio

Valida dados

Chama o repository

Decide o que retornar

Lança exceções (NotFoundException, BadRequestException, etc.)

# ✔ Repository

Acessa o banco

CRUD puro (sem regra)

```js
Request → Controller → Service → Repository → Database
                         ↑
                     (retorno)
```

## Comandos do mongose

https://mongoosejs.com/docs/queries.html

# EXEMPLO DE DOCUMENTAÇÃO 

# 📘 API de Exemplo -- Documentação

Este repositório contém uma API simples criada para demonstrar um modelo
de documentação para endpoints REST.\
O objetivo é oferecer um padrão claro de descrição, instalação e
exemplos de uso.

------------------------------------------------------------------------

## 📄 Descrição

A API recebe dados via requisições **POST**, realiza validações básicas
e retorna mensagens padronizadas de sucesso ou erro.\
Este projeto pode servir como base para estruturar documentações de
outras APIs.

------------------------------------------------------------------------

## 🛠️ Como instalar

Siga as etapas para executar o projeto localmente:

### 1. Clonar o repositório

``` bash
git clone https://github.com/seu-repositorio/exemplo-api.git
```

### 2. Acessar o diretório do projeto

``` bash
cd exemplo-api
```

### 3. Instalar dependências

``` bash
npm install
```

### 4. Iniciar o servidor

``` bash
npm start
```

A API ficará disponível em:

    http://localhost:3000

------------------------------------------------------------------------

## 🔗 Endpoint

### POST `/api/exemplo`

### 📄 Descrição

Endpoint responsável por receber dados via **JSON**, validar os campos
necessários e retornar uma resposta adequada.\
Ele demonstra como estruturar entradas e saídas de forma clara e
objetiva.

------------------------------------------------------------------------

## 📥 Exemplo de Requisição

``` http
POST /api/exemplo HTTP/1.1
Content-Type: application/json
```

``` json
{
  "nome": "João Silva",
  "email": "joao@example.com"
}
```

------------------------------------------------------------------------

## ✔️ Exemplo de Retorno (Sucesso)

``` json
{
  "status": "sucesso",
  "mensagem": "Dados recebidos com sucesso!",
  "dados": {
    "nome": "João Silva",
    "email": "joao@example.com"
  }
}
```

------------------------------------------------------------------------

## ❌ Exemplo de Retorno (Erro)

``` json
{
  "status": "erro",
  "mensagem": "Campo 'email' é obrigatório."
}
```

------------------------------------------------------------------------

✅ **Este modelo pode ser reutilizado para qualquer API REST**, bastando
adaptar os endpoints, exemplos e descrições.
