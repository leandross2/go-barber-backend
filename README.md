# Recuperação de senha

**Requisitos Funcionais**

- O usuário deve poder recuperar sua senha informando o seu email
- O usuário deve receber um email com instruçoes de recuperação de senha
- O usuário deve poder resetar sua senha

**Requisitos Não Funcionais**

- Utilizar MailTrap para testar envios em ambiente de desenvolvimento
- Utilizar amazon SES para envios em produção
- O envio de emails deve acontecer em segundo plano(background job)

**Regras de Negócio**

- O Link enviado por emial para resetar senha, deve expirar em 2 horas
- O usuario precisa confirmar a nova senha ao retar sua senha
- Identificar o usuário

# Atualização do perfil

**Requisitos Funcionais**

- O usuário deve poder atualizar seu nome, email e senha

**Requisitos Não Funcionais**

**Regras de Negócio**

- O usuário nã pode alterar seu email para um email já utilizado
- para atualizar sua senha, o usuário deve informar a senha antiga
- para atualuzar sua senha, o usuario precisa confirmar a nova senha

# Painel do prestador
**Requisitos Funcionais**

- O usuário deve poder listar seus agendamentos de um dia específico
- O prestador deve receber uma notificação sempre que houver um novo agendamento
- O Prestador deve poder visualizar as notificações não lidas


**Requisitos Não Funcionais**

- Os agendamentos do prestador do dia devem ser armazenados em cache
- As notificaçoes do prestador devem ser armazenadas no mongoDB
- As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io

**Regras de Negócio**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar

# Agendamento de serviços

**Requisitos Funcionais**

- O usuário deve poder listar todos prestadores de serviço cadastrados
- O usuário deve poder lista os dias de um mês com pelo menos um horário disponível de um prestador
- O usuário deve poder lsitar os horários disponiveis em um dia especifíco de um prestador
- O usuário deve poder realizar um novo agendamento com um prestador

**Requisitos Não Funcionais**

- A listamge de prestadores deve ser armazenada em cache
-

**Regras de Negócio**

- Cada agendamento deve durar uma hora exatamente
- Os agendamentos dem estar disponiveis entre 8h e 18h(Primeiro as 8h, último as 17h)
- O usuário não pode agendar em um horário já ocupado
- O usuáio não pode agendar em um horário que já passou
- O usuário não pode agendar serviços ele mesmo
