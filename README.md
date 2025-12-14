# 🚀 React Native Bookworm API - Backend Setup on Contabo VPS

This document explains how to deploy and run the **React Native Wallet API backend** on a Contabo VPS using Node.js, PM2, Neon DB, Upstash Redis, **NGINX**, and **Certbot** for HTTPS. It also covers troubleshooting steps and environment configuration.

---

## **1️⃣ Clone the repository**

```bash
git clone https://github.com/cyrillegs/react-native-wallet-api.git
cd react-native-wallet-api/backend/react-native-wallet-api
````

---

## **2️⃣ Install dependencies**

Make sure you are in the backend folder where `package.json` is located:

```bash
npm install
```

This will install all required Node.js packages, including `express`, `dotenv`, and `@neondatabase/serverless`.

---

## **3️⃣ Configure environment variables**

Create a `.env` file in the backend folder:

```bash
cp .env.example .env
```

Edit `.env` with your credentials for:

* **Database (Neon DB)**
* **Redis (Upstash)**
* **Cloudinary**
* **Any API keys required by the app**

---

## **4️⃣ Start the backend with PM2**

Install PM2 globally if you haven’t already:

```bash
npm install -g pm2
```

Start the server:

```bash
pm2 start npm --name "wallet-api" -- start
pm2 save
pm2 startup
```

Check logs:

```bash
pm2 logs wallet-api
```

---

## **5️⃣ Install and configure NGINX**

Install NGINX:

```bash
sudo apt update
sudo apt install nginx -y
```

Create a new NGINX server block for your domain:

```bash
sudo nano /etc/nginx/sites-available/wallet-api
```

Add the following configuration (replace `yourdomain.com` with your actual domain):

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;  # Your Node.js backend port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the configuration and restart NGINX:

```bash
sudo ln -s /etc/nginx/sites-available/wallet-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## **6️⃣ Install Certbot for HTTPS**

Install Certbot and NGINX plugin:

```bash
sudo apt install certbot python3-certbot-nginx -y
```

Obtain and install SSL certificate:

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Test automatic renewal:

```bash
sudo certbot renew --dry-run
```

After this, your backend should be accessible securely over HTTPS.

---

## **7️⃣ Verify deployment**

* Visit `https://yourdomain.com` to confirm the API is running.
* Check PM2 status: `pm2 status`
* Check NGINX logs: `sudo tail -f /var/log/nginx/error.log`

```

---

If you want, I can also **add a diagram showing Node.js → PM2 → NGINX → HTTPS flow**, which makes it very clear for deployment documentation.  

Do you want me to add that diagram?
```
