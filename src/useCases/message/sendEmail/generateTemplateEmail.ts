export function generateHtmlTemplate(contentMessage: string, photoUrl: string): string {
  return `
  <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contato com Abrigo de Adoção</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }
        .container {
            max-width: 700px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 2px solid #e0e0e0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            color: #4A90E2;
        }
        .image-wrapper {
            display: block;
            width: 100%;
            max-width: 400px;
            margin: 0 auto 20px;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .image-wrapper img {
            width: 100%;
            height: auto;
            object-fit: cover;
        }
        .message-container {
            background-color: #f9f9f9;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            margin-bottom: 20px;
            text-align: center; /* Centraliza o texto dentro do container */
        }
        .message {
            font-size: 16px;
            color: #555555;
            margin: 0;
        }
        .button {
            display: inline-block;
            font-size: 16px;
            color: #ffffff;
            background-color: #4A90E2;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
            margin-top: 20px;
        }
        .footer {
            font-size: 14px;
            text-align: center;
            color: #888888;
            border-top: 2px solid #e0e0e0;
            padding-top: 10px;
        }
        .footer a {
            color: #4A90E2;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Contato com Abrigo de Adoção</h1>
        </div>
        <div class="image-wrapper">
            <img src="${photoUrl}" alt="Imagem do Pet">
        </div>
        <div class="message-container">
            <p class="message">${contentMessage}</p>
        </div>
        <div class="footer">
            <p>Este email foi enviado pela plataforma adota pet.</p>
            <p>Para mais informações, visite <a href="https://www.seusite.com">nosso site</a>.</p>
        </div>
    </div>
</body>
</html>

`;
}
