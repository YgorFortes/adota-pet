# Define a versão do Node
FROM node:20.9.0

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todos os arquivos do projeto para o contêiner
COPY . .

# Expõe a porta 3000
EXPOSE 3000

# Define as variáveis de ambiente
ENV DB_USERNAME=postgres
ENV DB_PASSWORD=aDfbcPxDyzckdGRj
ENV DB_NAME=adota_pet
ENV DB_HOST=localhost
ENV DB_PORT=5432

# Comando para rodar a aplicação
CMD ["npm", "run", "start:dev"]
