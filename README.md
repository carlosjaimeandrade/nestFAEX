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

---

## ⚠️ Personalizando erros

Importe as exceções de:
```ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
```

### Resumo rápido

| Tipo | Exemplo | Status | Descrição |
|------|----------|---------|-----------|
| Erro de validação | `throw new BadRequestException('Campos inválidos')` | 400 | Entrada incorreta |
| Não autorizado | `throw new UnauthorizedException()` | 401 | Falta de token |
| Acesso negado | `throw new ForbiddenException()` | 403 | Permissão insuficiente |
| Não encontrado | `throw new NotFoundException('Usuário não encontrado')` | 404 | Recurso inexistente |
| Genérico | `throw new HttpException('Falha', HttpStatus.INTERNAL_SERVER_ERROR)` | 500 | Erro geral |
