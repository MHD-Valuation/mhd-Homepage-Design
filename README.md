# 🏢 MHD Valuation — Enterprise Website & CMS Platform

> **Nền tảng Cổng thông tin & Hệ thống Quản trị Nội dung Thẩm định giá MHD (MHD Valuation)**  
> Phát triển trên nền tảng **Next.js 15 (App Router)** kết hợp **Payload CMS 3.0 (PostgreSQL)**, chuẩn hóa SEO, giao diện song ngữ (VI / EN), tối ưu tải trang dưới 50ms và bảo mật dữ liệu cấp doanh nghiệp.

---

## 📑 Mục lục
1. [Giới thiệu & Kiến trúc tổng quan](#1-giới-thiệu--kiến-trúc-tổng-quan)
2. [Yêu cầu hệ thống](#2-yêu-cầu-hệ-thống)
3. [Cài đặt & Khởi chạy Local Development](#3-cài-đặt--khởi-chạy-local-development)
4. [Cấu hình Biến môi trường (.env)](#4-cấu-hình-biến-môi-trường-env)
5. [Khởi tạo Dữ liệu mẫu (Database Seeding)](#5-khởi-tạo-dữ-liệu-mẫu-database-seeding)
6. [Cấu trúc Thư mục Dự án](#6-cấu-trúc-thư-mục-dự-án)
7. [Hệ thống Cache & Tối ưu Hiệu suất (Performance)](#7-hệ-thống-cache--tối-ưu-hiệu-suất-performance)
8. [Bảo mật & Phân quyền Dữ liệu](#8-bảo-mật--phân-quyền-dữ-liệu)
9. [Hướng dẫn Deploy Production (Docker / VPS / Cloud)](#9-hướng-dẫn-deploy-production-docker--vps--cloud)
10. [Các lệnh CLI thường dùng](#10-các-lệnh-cli-thường-dùng)

---

## 1. Giới thiệu & Kiến trúc tổng quan

Dự án được xây dựng theo mô hình **Monolith hiện đại**, tích hợp cả Front-end trải nghiệm người dùng và Back-end CMS headless trong cùng một codebase Next.js duy nhất:

```text
┌────────────────────────────────────────────────────────┐
│               MHD Valuation Web Platform               │
├───────────────────────────┬────────────────────────────┤
│   Front-end (User Facing) │      Back-end CMS Engine   │
│   • Next.js 15 App Router │      • Payload CMS 3.0     │
│   • React 19 (Server/Clt) │      • PostgreSQL 16       │
│   • Song ngữ: VI & EN     │      • Lexical RichText    │
│   • GPU Smooth Transition │      • Private Uploads     │
└───────────────────────────┴────────────────────────────┘
```

### Các phân hệ chính:
- **Trang chủ (`/`)**: Hero giới thiệu năng lực, giải pháp thẩm định giá tiêu biểu, mạng lưới đối tác ngân hàng & kiểm toán, quy trình 6 bước, dự án nổi bật, bài viết chuyên môn và form yêu cầu thẩm định.
- **Dịch vụ (`/services/[slug]`)**: 5 lĩnh vực chuyên sâu (Doanh nghiệp & M&A, Bất động sản, Máy thiết bị, Hạ tầng khu công nghiệp, Tài sản vô hình).
- **Hồ sơ năng lực & Đội ngũ (`/about`)**: Giới thiệu tổ chức, danh bạ Thẩm định viên Bộ Tài chính cấp thẻ (`/about/doi-ngu`), mạng lưới đối tác (`/about/doi-tac`), hồ sơ pháp lý & chuẩn mực (`/about/phap-ly`).
- **Dự án thực tế (`/projects`, `/projects/[category]`)**: Danh mục case study và hồ sơ đã thực hiện theo năm và lĩnh vực.
- **Tra cứu chứng thư & Quy trình (`/phap-ly/tra-cuu`, `/phap-ly/quy-trinh`)**: Cổng tra cứu chứng thư điện tử bảo mật và quy trình chuẩn mực pháp lý.
- **Bài viết & Báo cáo nghiên cứu (`/insights`, `/insights/[slug]`)**: Phân tích thị trường, chuẩn mực thẩm định giá và tin tức ngành.
- **Trợ lý tư vấn & Quick Contact**: Widget liên hệ Hotline, Zalo OA chính thức và modal AI Assistant tối ưu tải ngầm.

---

## 2. Yêu cầu hệ thống

Trước khi bắt đầu, hãy đảm bảo máy tính hoặc máy chủ của bạn đã cài đặt:
- **Node.js**: Phiên bản `18.20.0+` hoặc `20.9.0+` (Khuyến nghị `20.x LTS` hoặc `22.x LTS`).
- **npm**: Phiên bản `9.x+` hoặc `10.x+`.
- **Docker & Docker Compose** (để khởi chạy cơ sở dữ liệu PostgreSQL nhanh chóng).
- **Git**.

---

## 3. Cài đặt & Khởi chạy Local Development

### Bước 1: Clone mã nguồn từ GitHub
```bash
git clone https://github.com/MHD-Valuation/mhd-Homepage-Design.git
cd mhd-Homepage-Design
```

### Bước 2: Cài đặt dependencies
Cài đặt packages cho toàn bộ dự án:
```bash
npm install --prefix cms
```
*(Hoặc di chuyển vào thư mục `cd cms && npm install`)*

### Bước 3: Khởi chạy cơ sở dữ liệu PostgreSQL qua Docker
Dự án đã chuẩn bị sẵn file `docker-compose.yml` cấu hình PostgreSQL 16 tại cổng `5434`:
```bash
cd cms
docker compose up -d
```
> **Ghi chú**: Container chạy ở cổng cục bộ `127.0.0.1:5434`, cách ly hoàn toàn khỏi mạng ngoài để bảo mật.

### Bước 4: Tạo file cấu hình môi trường
Sao chép tệp mẫu sang `.env`:
```bash
cp .env.example .env
```
Mở `.env` và thiết lập `POSTGRES_PASSWORD` cùng `PAYLOAD_SECRET` (xem chi tiết mục 4).

### Bước 5: Khởi chạy môi trường phát triển (Dev Server)
Tại thư mục gốc:
```bash
npm run dev
```
Hoặc tại thư mục `cms/`:
```bash
npm run dev
```
Website sẽ hoạt động tại:
- **Giao diện người dùng (Front-end)**: [http://localhost:3005](http://localhost:3005)
- **Bảng quản trị CMS (Admin Panel)**: [http://localhost:3005/admin](http://localhost:3005/admin)

---

## 4. Cấu hình Biến môi trường (.env)

Tệp `cms/.env` chứa các thiết lập quan trọng của hệ thống:

| Biến môi trường | Ý nghĩa | Mẫu cục bộ | Mẫu Production |
| :--- | :--- | :--- | :--- |
| `POSTGRES_PASSWORD` | Mật khẩu database PostgreSQL | `postgres123` | *Chuỗi ngẫu nhiên phức tạp* |
| `DATABASE_URI` | Chuỗi kết nối cơ sở dữ liệu | `postgresql://postgres:<PASS>@localhost:5434/mhd_payload` | `postgresql://user:pass@host:5432/db` |
| `PAYLOAD_SECRET` | Khóa bí mật mã hóa cookie/JWT session (≥32 ký tự) | `generate_via_openssl_rand_hex_32` | *Khóa bí mật bắt buộc ≥ 32 ký tự* |
| `NEXT_PUBLIC_SERVER_URL` | URL gốc của website | `http://localhost:3005` | `https://mhd.com.vn` |
| `ALLOWED_ORIGINS` | Danh sách domain được phép gọi API (phân tách bởi dấu phẩy) | `http://localhost:3005` | `https://mhd.com.vn,https://admin.mhd.com.vn` |
| `PORT` | Cổng HTTP Server chạy Next.js | `3005` | `3005` (hoặc do Reverse Proxy điều hướng) |
| `PRIVATE_UPLOAD_DIR` | Thư mục lưu tệp đính kèm nhạy cảm (ngoài `/public`) | `private-uploads` | `/var/data/mhd-private-uploads` |
| `ENABLE_DEMO_CERTIFICATES` | Bật/Tắt dữ liệu chứng thư demo ở trang Tra cứu | `true` | `false` |

> 💡 **Mẹo tạo PAYLOAD_SECRET an toàn**:
> ```bash
> openssl rand -hex 32
> ```

---

## 5. Khởi tạo Dữ liệu mẫu (Database Seeding)

Hệ thống có sẵn bộ seed dữ liệu chuẩn hóa gồm đầy đủ các dịch vụ, bài viết chuyên môn, danh bạ thẩm định viên, hồ sơ mẫu và tài liệu pháp lý:

```bash
cd cms
npm run seed
```

Tài khoản Quản trị viên (Admin) mặc định sau khi seed:
- **Email**: `admin@mhd.com.vn`
- **Mật khẩu**: Được in ra màn hình console trong lần seed đầu tiên (hoặc tạo tài khoản mới ngay tại giao diện `/admin` khi truy cập lần đầu).

---

## 6. Cấu trúc Thư mục Dự án

```text
mhd-Homepage-Design/
├── .gitignore                      # Loại trừ file nhạy cảm (.env, uploads, build)
├── package.json                    # Root package scripts
├── Prompt - Research...            # Tài liệu nghiên cứu & định vị thương hiệu
└── cms/                            # Ứng dụng Next.js & Payload CMS chính
    ├── .env.example                # Bản mẫu biến môi trường
    ├── docker-compose.yml          # Cấu hình container PostgreSQL 16
    ├── next.config.mjs             # Tối ưu hóa Compiler, Compression & AVIF/WebP
    ├── package.json
    ├── tsconfig.json
    ├── public/                     # Static assets (Logo, biểu đồ, icon)
    └── src/
        ├── app/
        │   ├── (frontend)/         # Giao diện người dùng (App Router)
        │   │   ├── layout.tsx      # Layout gốc, nạp font, Header, Footer, Widget
        │   │   ├── template.tsx    # Bọc chuyển route với animation mhd-page-enter
        │   │   ├── global.css      # Design tokens, Typography, Animation 60 FPS
        │   │   ├── page.tsx        # Trang chủ MHD Valuation
        │   │   ├── about/          # Về MHD, Đội ngũ, Đối tác, Pháp lý
        │   │   ├── services/       # Danh mục & Chi tiết 5 dịch vụ định giá
        │   │   ├── projects/       # Dự án & Hồ sơ thực tế
        │   │   ├── insights/       # Báo cáo & Tin tức chuyên ngành
        │   │   ├── contact/        # Liên hệ & Văn phòng
        │   │   ├── phap-ly/        # Tra cứu chứng thư, quy trình chuẩn mực
        │   │   └── api/            # API Tra cứu chứng thư & Tiếp nhận Inquiries
        │   └── (payload)/          # Bảng điều khiển Quản trị viên (/admin)
        ├── collections/            # Schema định nghĩa dữ liệu (Services, Team, Projects...)
        ├── globals/                # Schema cấu hình toàn cục (Header, Footer, SiteSettings)
        ├── components/             # Reusable UI Components
        ├── lib/
        │   ├── cachedQueries.ts    # Bọc unstable_cache + cơ chế Zero-Crash Fallback
        │   ├── services-data.ts    # Dữ liệu tĩnh dự phòng 5 khối dịch vụ
        │   └── security.ts         # Rate limiting, sanitize đầu vào & upload validation
        └── scripts/                # Scripts kiểm thử, kiểm toán an toàn & seeding
```

---

## 7. Hệ thống Cache & Tối ưu Hiệu suất (Performance)

Dự án được tối ưu theo tiêu chuẩn khắt khe cho môi trường Production:

1. **Caching đa tầng qua Next.js `unstable_cache`**:
   - Mọi truy vấn DB (`getCachedGlobal`, `getCachedHomepageData`, `getCachedAboutData`, `getCachedProjectsData`, `getCachedServiceUpdates`...) đều lưu trong bộ nhớ RAM của Node.js với thời gian sống 600s (10 phút).
   - TTFB (Time to First Byte) của các trang con duy trì ở mức **< 30ms - 50ms**.
2. **Cơ chế phòng thủ Zero-Crash (Fail-Safe)**:
   - Toàn bộ hàm truy vấn đều bọc `try/catch`. Nếu DB tạm thời không phản hồi hoặc mất kết nối trong 1.5 giây, trang web sẽ **tự động trả về dữ liệu catalog tĩnh** mượt mà, loại bỏ triệt để lỗi `500 Internal Server Error`.
3. **Nén dữ liệu & Định dạng ảnh thế hệ mới**:
   - `next.config.mjs` bật sẵn `compress: true` (Gzip/Brotli).
   - Tự động chuyển đổi toàn bộ ảnh sang chuẩn **AVIF và WebP**, giảm 30-50% dung lượng mà vẫn giữ nguyên độ sắc nét.
4. **Hiệu ứng chuyển trang mượt mà (Cinematic GPU Transitions)**:
   - 100% sử dụng CSS 3D Transforms (`translate3d(0, 14px, 0)`), `blur filter` quang học và đường cong chuyển động `cubic-bezier(0.16, 1, 0.3, 1)`.
   - Chạy trực tiếp trên GPU compositor layer, cam kết **60 FPS** không gây giật lag hay tốn dung lượng JS.
5. **Giảm kích thước Bundle (Tree-shaking & Dynamic Import)**:
   - Modal trợ lý AI (`MhdAssistantModal`, ~27KB) được cấu hình `dynamic import` không tải kèm ban đầu mà chỉ load khi người dùng mở ra.

---

## 8. Bảo mật & Phân quyền Dữ liệu

- **Quản lý tệp tải lên riêng tư (`private-uploads`)**:
  - Tệp hồ sơ do khách hàng gửi qua form yêu cầu thẩm định được lưu ở thư mục riêng tư nằm ngoài thư mục web công khai (`public/`), ngăn chặn việc lộ tài liệu mật của doanh nghiệp.
- **Bảo vệ cổng kết nối Database**:
  - `docker-compose.yml` chỉ bind cổng vào loopback nội bộ `127.0.0.1:5434`, không mở ra mạng Internet công cộng.
- **CORS & CSRF Whitelist**:
  - Chỉ cho phép các domain được khai báo trong `ALLOWED_ORIGINS` và `NEXT_PUBLIC_SERVER_URL` gửi cookie xác thực.

---

## 9. Hướng dẫn Deploy Production (Docker / VPS / Cloud)

### Phương án: Triển khai trên máy chủ Linux (Ubuntu/Debian) với PM2 & Nginx

#### 1. Chuẩn bị môi trường trên máy chủ
```bash
# Cài đặt Node.js 20 LTS, Docker, Nginx, PM2
sudo apt update && sudo apt install -y curl git nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

#### 2. Kéo mã nguồn và cấu hình
```bash
git clone https://github.com/MHD-Valuation/mhd-Homepage-Design.git /var/www/mhd
cd /var/www/mhd/cms

# Tạo file môi trường production
cp .env.example .env.production
nano .env.production
# Điền DATABASE_URI, PAYLOAD_SECRET thật, NEXT_PUBLIC_SERVER_URL=https://mhd.com.vn
```

#### 3. Chạy cơ sở dữ liệu
```bash
docker compose up -d
```

#### 4. Cài đặt packages & Build Production
```bash
npm install
npm run seed     # Chạy nếu cần nạp dữ liệu ban đầu
npm run build    # Biên dịch tối ưu toàn bộ trang
```

#### 5. Khởi chạy ứng dụng qua PM2
```bash
pm2 start npm --name "mhd-web" -- start
pm2 save
pm2 startup
```

#### 6. Cấu hình Nginx Reverse Proxy
Tạo tệp cấu hình Nginx: `/etc/nginx/sites-available/mhd.conf`:
```nginx
server {
    listen 80;
    server_name mhd.com.vn www.mhd.com.vn;

    location / {
        proxy_pass http://127.0.0.1:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    client_max_body_size 50M;
}
```
Kích hoạt site và cài đặt chứng chỉ SSL miễn phí từ Let's Encrypt:
```bash
sudo ln -s /etc/nginx/sites-available/mhd.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d mhd.com.vn -d www.mhd.com.vn
```

---

## 10. Các lệnh CLI thường dùng

| Lệnh | Vị trí chạy | Mục đích |
| :--- | :--- | :--- |
| `npm run dev` | Thư mục gốc hoặc `cms/` | Chạy dev server tại cổng 3005 |
| `npm run build` | `cms/` | Biên dịch bản build tối ưu cho Production |
| `npm run start` | `cms/` | Khởi chạy bản build Production |
| `npm run seed` | `cms/` | Nạp dữ liệu mẫu ban đầu vào database |
| `npm run generate:types` | `cms/` | Tạo lại file `payload-types.ts` khi sửa schema |
| `npx tsc --noEmit -p .` | `cms/` | Kiểm tra tính toàn vẹn kiểu dữ liệu TypeScript (0 lỗi) |
| `docker compose ps` | `cms/` | Kiểm tra trạng thái cơ sở dữ liệu Postgres |

---

## 📞 Hỗ trợ & Liên hệ
- **Đơn vị phát triển**: MHD Valuation Engineering Team
- **Website chính thức**: [https://mhd.com.vn](https://mhd.com.vn)
- **Email kỹ thuật**: `contact@mhd.com.vn`

---
*Bản quyền © 2026 MHD Valuation. Toàn quyền bảo lưu.*
