export const welcomeTemplate = (name) => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
          .header { background-color: #000000; padding: 40px 20px; text-align: center; }
          .header h1 { color: #f97316; margin: 0; font-size: 28px; letter-spacing: -1px; }
          .content { padding: 40px 30px; line-height: 1.6; color: #333333; }
          .content h2 { color: #111111; margin-top: 0; }
          .button-container { text-align: center; margin: 30px 0; }
          .button { background-color: #f97316; color: #ffffff !important; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; }
          .footer { background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #888888; }
          .social-links { margin-bottom: 10px; }
          .orange-text { color: #f97316; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>WELCOME TO <span style="color: white;">NNANYA</span> CNC</h1>
          </div>
          <div class="content">
            <h2>Hi ${name}, 👋</h2>
            <p>We are absolutely thrilled to have you join our community! Thank you for choosing <span class="orange-text">Nnanya CNC</span>.</p>
            <p>Your account is now active, and you can start exploring our services, managing your applications, and connecting with our team right away.</p>
            
            <div class="button-container">
              <a href="https://yourwebsite.com" class="button">Access Dealer portal</a>
            </div>

            <p>If you have any questions, just reply to this email. Our support team is always here to help you out.</p>
            <p>Best Regards,<br><strong>The Nnanya CNC Team</strong></p>
          </div>

          <div class="footer">
            <p>&copy; 2024 Nnanya CNC. All rights reserved.</p>
            <p>You received this email because you signed up on our platform.</p>
          </div>
          
        </div>
      </body>
    </html>
  `;
};
