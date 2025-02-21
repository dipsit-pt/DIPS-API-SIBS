# 🏦 **SIBS API Integration**

## 🌟 **Overview**

This project provides a RESTful API to integrate with the [SIBS Payment Gateway](https://www.pay.sibs.com/documentacao/sibs-gateway/#getStarted). It enables secure and efficient payment processing through multiple payment methods, including MB WAY, MB REFERENCE, and credit cards.

---

## 🚀 **Installation**

1. **🧑‍💻 Clone the Repository**

   ```bash
   git clone https://github.com/dipsit-pt/DIPS-API-SIBS.git
   cd your-repository
   ```

2. **📦 Install Dependencies**

   Using `pnpm` (preferred):

   ```bash
   pnpm install
   ```

   Alternatively, use `npm`:

   ```bash
   npm install
   ```

3. **📄 Configure Environment**

   Create a `.env` file in the root directory with the following variables:

   ```plaintext
   # Server Configuration
   HOST=127.0.0.1
   PORT=3000
   NODE_ENV=development # Change to 'production' when deploying

   # SIBS API Credentials
   SIBS_URL=
   SIBS_TERMINAL_ID=
   SIBS_SECRET_KEY=
   ```

   > **Note**: Set `NODE_ENV=development` for local testing and `NODE_ENV=production` for deployment.

4. **✅ Run the Application**

   Start the server:

   ```bash
   pnpm dev
   ```

   Alternatively, use `npm`:

   ```bash
   npm dev
   ```

---

## 📄 **API Reference**

### 🛡️ **Authentication**

Before making any request, ensure that you include the following headers for authentication:

- **x-ibm-client-id**: The unique client ID provided for API access.
- **Authorization**: A valid authorization token (either **Bearer** or **Digest**).

Requests without these headers, or with invalid values, will be rejected immediately.

### 💳 **Payments**

> **All payment routes use [Zod](https://zod.dev/) for strict validation**. If any input does not conform to SIBS data requirements, the request will be rejected before reaching the SIBS API.

| Method  | Endpoint                                    | Description                                |
| ------- | ------------------------------------------- | ------------------------------------------ |
| 🔵 POST | /payments/create                            | Prepare the checkout with payment details. |
| 🔵 GET  | /payments/:transactionID/status             | Retrieve the status of a payment.          |
| 🔵 POST | /payments/:transactionID/mbway/purchase     | Process a transaction using MB WAY.        |
| 🔵 POST | /payments/:transactionID/reference/generate | Generate a transaction with MB REFERENCE.  |
| 🔵 POST | /payments/:transactionID/card/purchase      | Process a transaction using a credit card. |

---

## 📡 **Webhooks**

A webhook is an API mechanism that provides real-time payment status updates. The SIBS Gateway sends notifications to inform merchants of transaction status changes.

### **Webhook Behavior**

- Webhooks notify merchants via **email** or an **HTTP endpoint**.
- Only **one** notification is sent per transaction.
- Merchants must configure their webhook endpoint in the SIBS BackOffice.
- Notifications may arrive out of order due to system delays.
- Failed notifications are summarized in a daily email report.
- If no notification is received, merchants should query the **Checkout Status** before rejecting a transaction.

### **Webhook Requirements**

- Notifications are sent as **HTTPS callbacks** to the merchant’s endpoint.
- A **valid SSL certificate** is required (self-signed certificates are not accepted).
- The server must:
  - Accept **HTTP POST** requests.
  - Have an open **TCP port (443, 80)** with **TLSv1.2**.
  - Whitelist SIBS’ network if necessary.

### **Webhook Response Format**

To confirm receipt, merchants must respond with an **HTTP 200 OK** and the following JSON body:

json
{
"statusCode": "200",
"statusMsg": "Success",
"notificationID": "2533e456-5e36-42c8-9eea-7961902f185e"
}

### **Webhook Security & Decryption**

- Notifications are **AES-GCM encrypted** to prevent fraud.
- Decryption requires the **X-Initialization-Vector** and **X-Authentication-Tag** headers.
- The payload is **Base64-encoded** and must be decoded before decryption.

---

## 📚 **Documentation**

For more details, visit the [SIBS API Documentation](https://www.pay.sibs.com/documentacao/sibs-gateway/#getStarted).

---

## 🟪 **Insomnia API Testing**

[Insomnia Collection](https://drive.google.com/file/d/1byrR3lA_EKvD2cCgoKx6IopNRvGiQ7Ru/view?usp=drive_link)

## 🔌 Required Plugins

To ensure smooth API testing, install the following Insomnia plugins:

| Plugin Name                        | Description                                            |
| ---------------------------------- | ------------------------------------------------------ |
| `insomnia-plugin-customtimestamp`  | Generates custom timestamps for requests.              |
| `insomnia-plugin-fake`             | Generates fake data for testing.                       |
| `insomnia-plugin-get-access-token` | Helps with authentication by retrieving access tokens. |
| `insomnia-plugin-regex`            | Enables regex-based operations in requests.            |
| `insomnia-plugin-save-variables`   | Stores and manages environment variables.              |
| `insomnia-plugin-utils`            | Provides additional utility functions for requests.    |

### 📌 Installation

1. Open **Insomnia**.
2. Go to **Preferences** → **Plugins**.
3. Search for each plugin by name and install them.

## 🚀 Usage

1. Import the Insomnia collection (`.json` file).
2. Set up environment variables if needed.
3. Ensure the required plugins are installed.
4. Start testing your API requests.

---
