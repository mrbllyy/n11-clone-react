# n11 Clone - Frontend (React + Vite)

Bu proje, n11.com'un modern bir klonu olarak tasarlanmış, mikroservis mimarisiyle tam entegre çalışan bir e-ticaret ön yüz uygulamasıdır. Proje, sadece bir arayüz çalışması değil, arka planda karmaşık asenkron süreçleri (SAGA Choreography) yöneten bir ekosistemin parçasıdır.

## 🚀 Öne Çıkan Özellikler

*   **Modern Teknoloji Yığını:** Vite ile güçlendirilmiş React uygulaması.
*   **Gelişmiş Kimlik Doğrulama:** JWT tabanlı login sistemi ve sessizce çalışan **Refresh Token** mekanizması (403 hatalarında otomatik yenileme).
*   **Dinamik Sepet Yönetimi:** Arka planda `shopping-cart-service` ile senkronize, sayfa yenilense bile kaybolmayan sepet içeriği.
*   **Sipariş ve Ödeme Akışı:** Adres ve ödeme bilgilerinin toplandığı, Order Service üzerinden SAGA sürecini tetikleyen Checkout yapısı.
*   **Marka Kimliği:** n11'in yeni nesil renk paleti (`#ff44ee` Magenta & `#1c1c1e` Dark) ile hazırlanmış UI.
*   **Esnek Veri Yapısı:** Farklı backend response tiplerine uyumlu, hata toleranslı veri işleme mantığı.

## 🛠 Teknik Mimari

### Frontend Stack
*   **Framework:** React 18
*   **Build Tool:** Vite
*   **State Management:** React Context API (AuthContext, CartContext)
*   **Routing:** React Router DOM
*   **HTTP Client:** Axios (Interceptor destekli)

### Mikroservis Entegrasyonu
Uygulama, tüm istekleri bir **API Gateway (Port: 8763)** üzerinden şu servislere iletir:
*   **Auth Service:** Giriş ve Token yönetimi.
*   **Product Service:** Ürün listeleme ve detay.
*   **Shopping Cart Service:** Sepet senkronizasyonu.
*   **Order Service:** Sipariş oluşturma ve SAGA başlatma.
*   **Payment Service:** Ödeme doğrulama süreci.

## 📦 Kurulum ve Çalıştırma

1.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    ```

2.  **Geliştirme Sunucusunu Başlatın:**
    ```bash
    npm run dev
    ```

3.  **Proxy Ayarları:**
    `vite.config.js` dosyasındaki proxy hedefinin Gateway IP'nizle (`http://192.168.1.106:8763`) uyumlu olduğundan emin olun.

## 🔐 Güvenlik ve Interceptor Yapısı

Uygulama, her istekte `localStorage` üzerindeki JWT'yi otomatik olarak `Authorization: Bearer <token>` header'ına ekler. Eğer token süresi dolarsa (403 hatası), Axios interceptor devreye girerek:
1.  Refresh token ile yeni bir JWT alır.
2.  Yeni token'ı kaydeder.
3.  Kullanıcının yaptığı son isteği hiçbir kopukluk hissettirmeden yeni token ile tekrar gönderir.

## 🎨 Tasarım Detayları

*   **Ana Renk (Magenta):** `#ff44ee`
*   **Koyu Ton (Black):** `#1c1c1e`
*   **Tipografi:** Inter / Roboto
*   **UI Bileşenleri:** Tamamen n11 UX standartlarına uygun, responsive (mobil uyumlu) yapı.

---
*Bu proje n11 ve Patika.dev'in düzenlediği bootcamp kapsamında geliştirilmiş olup, mikroservis dünyasında frontend-backend iletişimini en üst seviyede deneyimlemek için tasarlanmıştır.*
