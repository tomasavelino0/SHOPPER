# Usar a imagem do Node.js
FROM node:18

# Criar e definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos do projeto para o contêiner
COPY package*.json ./
COPY . .

# Instalar dependências
RUN npm install

# Construir o projeto
RUN npm run build

# Expor a porta do backend
EXPOSE 8080

# Comando para iniciar o servidor
CMD ["npm", "run", "start"]
