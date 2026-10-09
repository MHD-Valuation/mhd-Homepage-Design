# 🏢 MHD Valuation — Enterprise Website & CMS Platform

> **Nền tảng Cổng thông tin & Hệ thống Quản trị Nội dung Thẩm định giá MHD (MHD Valuation)**  
> Phát triển trên nền tảng **Next.js 15 (App Router)** kết hợp **Payload CMS 3.0 (PostgreSQL)**, chuẩn hóa SEO & OpenGraph tự động theo domain, giao diện song ngữ (VI / EN), tối ưu tải trang dưới 50ms và bảo mật dữ liệu cấp doanh nghiệp.

---

## 📑 Mục lục
1. [Giới thiệu & Kiến trúc tổng quan](#1-giới-thiệu--kiến-trúc-tổng-quan)
2. [Yêu cầu hệ thống](#2-yêu-cầu-hệ-thống)
3. [Cài đặt & Khởi chạy Local Development](#3-cài-đặt--khởi-chạy-local-development)
4. [Cấu hình Biến môi trường (.env)](#4-cấu-hình-biến-môi-trường-env)
5. [Khởi tạo Dữ liệu & Cơ chế Quản lý Media](#5-khởi-tạo-dữ-liệu--cơ-chế-quản-lý-media)
6. [Cấu trúc Thư mục Dự án](#6-cấu-trúc-thư-mục-dự-án)
7. [Hệ thống Cache & Tối ưu Hiệu suất (Performance)](#7-hệ-thống-cache--tối-ưu-hiệu-suất-performance)
8. [Bảo mật & Quản lý Thông tin nhạy cảm](#8-bảo-mật--quản-lý-thông-tin-nhạy-cảm)
9. [Hướng dẫn Deploy Production (Docker / VPS / Coolify)](#9-hướng-dẫn-deploy-production-docker--vps--coolify)
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
│   • Dynamic SEO/OpenGraph │      • Private Uploads     │
│   • GPU Smooth Transition │      • Realtime Ticket Gen │
└───────────────────────────┴────────────────────────────┘
```

### Các tính năng & Phân hệ chính:
- **Trang chủ (`/`)**: Hero định vị thương hiệu, giải pháp thẩm định tiêu biểu, mạng lưới đối tác ngân hàng & kiểm toán, quy trình 6 bước, dự án thực hiện, báo cáo chuyên môn và form yêu cầu thẩm định.
- **Dịch vụ (`/services`, `/services/[slug]`)**: 5 khối nghiệp vụ chuyên sâu (Doanh nghiệp & M&A, Bất động sản, Máy thiết bị, Hạ tầng KCN, Tài sản vô hình).
- **Hồ sơ năng lực & Đội ngũ (`/about`)**: Giới thiệu tổ chức, danh bạ Thẩm định viên Bộ Tài chính cấp thẻ (`/about/doi-ngu`), đối tác chiến lược (`/about/doi-tac`), hồ sơ pháp lý & quy trình kiểm soát (`/about/phap-ly`).
- **Dự án thực tế (`/projects`, `/projects/[category]`)**: Bộ lọc case study và hồ sơ đã thực hiện theo năm và lĩnh vực.
- **Tra cứu chứng thư & Quy trình (`/phap-ly/tra-cuu`, `/phap-ly/quy-trinh`)**: Cổng tra cứu chứng thư điện tử bảo mật, phòng chống làm giả chứng thư.
- **Tự động sinh Mã hồ sơ / Mã biên nhận thời gian thực**:
  - Mã hồ sơ được tạo tự động theo định dạng chuẩn: `HS-{NĂM}-{MÃ_SỐ}` hoặc `TD-{NĂM}-{MÃ_SỐ}` (Tuyển dụng).
  - Năm (`{NĂM}`) được tính toán **theo thời gian thực chuẩn múi giờ Việt Nam (`Asia/Ho_Chi_Minh` / GMT+7)**, tự động cập nhật khi bước sang năm mới mà không cần can thiệp code.
- **Bộ nhận diện thương hiệu & Favicon đa kích thước**:
  - Tự động tích hợp Favicon logo MHD chuẩn nét: `favicon.ico` (đa độ phân giải 16/32/48px), `icon.png` (32x32), `icon-192.png` (PWA) và `apple-icon.png` (iOS/Safari).
- **SEO & OpenGraph động 100%**:
  - Sơ đồ trang web (`/sitemap.xml`), chỉ mục robot (`/robots.txt`) và thẻ chia sẻ Zalo/Facebook (`openGraph`) tự động nhận diện theo biến môi trường `NEXT_PUBLIC_SERVER_URL`, không viết cứng bất kỳ tên miền cố định nào.

---

## 2. Yêu cầu hệ thống

Trước khi bắt đầu, hãy đảm bảo môi trường đã cài đặt:
- **Node.js**: Phiên bản `18.20.0+` hoặc `20.9.0+` (Khuyến nghị `20.x LTS`).
- **npm**: Phiên bản `9.x+` hoặc `10.x+`.
- **Docker & Docker Compose** (để chạy cơ sở dữ liệu PostgreSQL hoặc chạy toàn bộ stack container).
- **Git**.

---

## 3. Cài đặt & Khởi chạy Local Development

### Bước 1: Clone mã nguồn từ GitHub
```bash
git clone https://github.com/MHD-Valuation/mhd-Homepage-Design.git
cd mhd-Homepage-Design
```

### Bước 2: Cài đặt dependencies
```bash
npm install --prefix cms
```
*(Hoặc di chuyển vào thư mục: `cd cms && npm install`)*

### Bước 3: Tạo file cấu hình môi trường (.env)
Sao chép tệp mẫu sang `.env` trong thư mục `cms/`:
```bash
cd cms
cp .env.example .env
```
Mở file `cms/.env` và điền cấu hình cơ bản:
```env
POSTGRES_PASSWORD=mhd_cms_password_2026
DATABASE_URI=postgresql://postgres:mhd_cms_password_2026@localhost:5434/mhd_payload
PAYLOAD_SECRET=your_super_secret_payload_key_min_32_characters_12345
NEXT_PUBLIC_SERVER_URL=http://localhost:3005
PORT=3005
```

### Bước 4: Khởi chạy cơ sở dữ liệu PostgreSQL qua Docker
Tại thư mục `cms/`:
```bash
docker compose up -d
```
> **Ghi chú**: Database Postgres chạy tại cổng cục bộ `127.0.0.1:5434` (được cách ly an toàn).

### Bước 5: Khởi chạy môi trường phát triển (Dev Server)
Tại thư mục `cms/`:
```bash
npm run dev
```
Website sẽ hoạt động tại:
- **Giao diện Front-end**: [http://localhost:3005](http://localhost:3005)
- **Bảng quản trị CMS (Admin Panel)**: [http://localhost:3005/admin](http://localhost:3005/admin)

---

## 4. Cấu hình Biến môi trường (.env)

Tệp `cms/.env` quản lý toàn bộ cấu hình hệ thống:

| Biến môi trường | Ý nghĩa | Mẫu Local | Mẫu Production |
| :--- | :--- | :--- | :--- |
| `POSTGRES_PASSWORD` | Mật khẩu database PostgreSQL | *Chuỗi ngẫu nhiên bảo mật* |
| `DATABASE_URI` | Chuỗi kết nối PostgreSQL | `postgresql://postgres:<PASS>@localhost:5434/mhd_payload` | `postgresql://postgres:<PASS>@postgres:5432/mhd_payload` |
| `PAYLOAD_SECRET` | Khóa mã hóa session/JWT (bắt buộc ≥32 ký tự) | *Chuỗi ngẫu nhiên ≥32 ký tự* | *Khóa bí mật tạo qua openssl* |
| `NEXT_PUBLIC_SERVER_URL` | Tên miền chính thức của website | `http://localhost:3005` | `https://<ten-mien-chinh-thuc-cua-ban>` |
| `ALLOWED_ORIGINS` | Danh sách domain được phép gọi API (phân tách bởi dấu phẩy) | `http://localhost:3005` | `https://<ten-mien>,https://admin.<ten-mien>` |
| `PORT` | Cổng HTTP Server chạy Next.js | `3005` | `3005` |
| `PRIVATE_UPLOAD_DIR` | Thư mục lưu tệp đính kèm nhạy cảm (ngoài `/public`) | `private-uploads` | `private-uploads` |
| `ENABLE_DEMO_CERTIFICATES` | Bật/Tắt dữ liệu chứng thư demo ở trang Tra cứu | `true` | `false` |

> 💡 **Tạo PAYLOAD_SECRET an toàn bằng dòng lệnh:**
> ```bash
> openssl rand -hex 32
> ```

---

## 5. Khởi tạo Dữ liệu & Cơ chế Quản lý Media

### 5.1. Khởi tạo dữ liệu mẫu cục bộ (Local Seed)
Nếu cần nạp bộ dữ liệu mẫu (dịch vụ, bài viết, nhân sự, dự án) vào database cục bộ:
```bash
cd cms
npm run seed
```

### 5.2. Cơ chế tách biệt mã nguồn và Media (Clean Git Repository)
Để đảm bảo kho mã nguồn Git luôn **siêu nhẹ, tải nhanh và không chứa dữ liệu rác**:
- **Thư mục `cms/media/` và `cms/src/scripts/` đã được cấu hình loại trừ (`.gitignore`)** khỏi Git.
- **Hình ảnh giao diện cố định** (Logo MHD, Favicon, ảnh nền trụ sở) được lưu tại `cms/public/assets/` và được theo dõi trong Git.
- **Hình ảnh do người dùng tải lên** (ảnh bài viết, logo đối tác, ảnh đại diện) trên Production được lưu trữ độc lập qua Docker volume (`mhd_uploads:/app/media`), đảm bảo khi cập nhật hoặc pull code mới không bị mất ảnh.

---

## 6. Cấu trúc Thư mục Dự án

```text
mhd-Homepage-Design/
├── .gitignore                      # Loại trừ file nhạy cảm (.env, uploads, scripts, media)
├── docker-compose.yml              # Cấu hình Production Multi-Service (Web + Postgres + Volumes)
├── Dockerfile                      # Multi-stage Docker build cho Next.js 15 & Payload CMS
├── package.json                    # Root package scripts
└── cms/                            # Ứng dụng Next.js & Payload CMS chính
    ├── .env.example                # Bản mẫu biến môi trường
    ├── docker-compose.yml          # Container PostgreSQL cho local dev (Port 5434)
    ├── next.config.mjs             # Tối ưu hóa Compiler, Compression, AVIF/WebP
    ├── package.json
    ├── tsconfig.json
    ├── public/
    │   ├── assets/                 # Brand assets cố định (logomhd.png, hero-office.png...)
    │   ├── favicon.ico             # Favicon đa kích thước (16x16, 32x32, 48x48)
    │   ├── icon.png                # Web icon chuẩn PNG 32x32
    │   ├── icon-192.png            # Web icon kích thước lớn 192x192
    │   └── apple-icon.png          # Apple Touch Icon 180x180
    └── src/
        ├── app/
        │   ├── (frontend)/         # Giao diện người dùng (Next.js App Router)
        │   │   ├── layout.tsx      # Layout gốc, Dynamic Metadata/OpenGraph, Favicon
        │   │   ├── template.tsx    # Chuyển trang mượt mà GPU 60 FPS
        │   │   ├── global.css      # Design tokens, Typography, Responsive Styling
        │   │   ├── page.tsx        # Trang chủ MHD Valuation
        │   │   ├── about/          # Về MHD, Đội ngũ, Đối tác, Pháp lý
        │   │   ├── services/       # Danh mục & Chi tiết 5 dịch vụ định giá
        │   │   ├── projects/       # Dự án & Hồ sơ thực tế
        │   │   ├── insights/       # Báo cáo thị trường & Tin tức chuyên ngành
        │   │   ├── contact/        # Liên hệ, Bản đồ văn phòng, Báo giá
        │   │   ├── phap-ly/        # Tra cứu chứng thư, quy trình chuẩn mực
        │   │   └── api/            # API Inquiries (POST tiếp nhận hồ sơ), Revalidate
        │   ├── (payload)/          # Giao diện quản trị Payload CMS (/admin)
        │   ├── sitemap.ts          # Tự động sinh sitemap.xml theo tên miền thực tế
        │   └── robots.ts           # Tự động sinh robots.txt chuẩn SEO
        ├── collections/            # Schema quản trị dữ liệu (Inquiries, Services, Projects...)
        ├── globals/                # Schema cấu hình toàn cục (Header, Footer, SiteSettings)
        ├── components/             # Reusable UI Components
        ├── lib/
        │   ├── cachedQueries.ts    # Bọc unstable_cache + cơ chế Zero-Crash Fail-Safe
        │   ├── services-data.ts    # Dữ liệu tĩnh dự phòng 5 khối dịch vụ
        │   ├── privateUploads.ts   # Quản lý file hồ sơ bảo mật
        │   └── security.ts         # Rate limiting, sanitize đầu vào & upload validation
        └── scripts/                # Scripts nội bộ hỗ trợ dev/seed (đã bỏ qua khỏi Git)
```

---

## 7. Hệ thống Cache & Tối ưu Hiệu suất (Performance)

1. **Caching đa tầng qua Next.js `unstable_cache`**:
   - Mọi truy vấn DB (`getCachedGlobal`, `getCachedHomepageData`, `getCachedAboutData`...) đều lưu trong bộ nhớ RAM Node.js với thời gian sống 600s (10 phút).
   - Tốc độ phản hồi phản hồi máy chủ (TTFB) duy trì ở mức **< 30ms - 50ms**.
2. **Cơ chế phòng vệ Zero-Crash (Fail-Safe)**:
   - Các hàm truy vấn được bọc xử lý lỗi tự động. Nếu DB tạm ngắt kết nối, website sẽ **tự động trả về dữ liệu catalog tĩnh** mượt mà, loại bỏ triệt để lỗi màn hình trắng hay `500 Server Error`.
3. **Nén dữ liệu & Định dạng ảnh tối ưu**:
   - Bật sẵn nén Gzip/Brotli qua `next.config.mjs`.
   - Tự động chuyển đổi toàn bộ ảnh sang chuẩn **AVIF và WebP**, giảm 30-50% dung lượng truyền tải.
4. **Hiệu ứng chuyển trang GPU Compositor**:
   - 100% sử dụng CSS 3D Transforms (`translate3d(0, 14px, 0)`), bộ lọc quang học và đường cong chuyển động `cubic-bezier(0.16, 1, 0.3, 1)`.
   - Cam kết trải nghiệm cuộn và chuyển trang đạt **60 FPS**.

---

## 8. Bảo mật & Quản lý Thông tin nhạy cảm

- **Không lưu thông tin nhạy cảm trong Git**:
  - Toàn bộ mật khẩu cơ sở dữ liệu, secret keys và tệp `.env` đều được cấu hình trong `.gitignore`.
  - Scripts kiểm thử và công cụ nội bộ không bị đẩy lên GitHub.
- **Bảo mật tệp hồ sơ đính kèm (`private-uploads`)**:
  - File CV và hồ sơ báo giá của khách hàng được lưu ngoài thư mục `public/`.
  - Chỉ quản trị viên đã đăng nhập (`admin`) mới có quyền truy cập và tải file qua endpoint API xác thực.
- **Bảo vệ cổng kết nối Database**:
  - Container PostgreSQL ở môi trường dev chỉ mở cổng tại `127.0.0.1:5434`, không lộ ra mạng ngoài.
- **Chống Spam & Tấn công Brute-force**:
  - Form gửi hồ sơ tích hợp Rate Limiter (giới hạn số lần gửi theo IP) và bộ lọc Honeypot chặn bot tự động.

---

## 9. Hướng dẫn Deploy Production (Docker / VPS / Coolify)

### Phương án 1: Triển khai bằng Docker Compose (Khuyến nghị)

Tại thư mục gốc dự án đã có sẵn `docker-compose.yml` chuẩn hóa gồm cả Web app và PostgreSQL:

1. **Tạo file môi trường `.env` tại thư mục gốc**:
   ```env
   NODE_ENV=production
   PORT=3005
   POSTGRES_PASSWORD=MatKhauDatabaseNgauNhien123!
   PAYLOAD_SECRET=KhoaBiMatPayloadChieuDaiTren32KyTu123456!
   NEXT_PUBLIC_SERVER_URL=https://<ten-mien-chinh-thuc-cua-ban>
   ALLOWED_ORIGINS=https://<ten-mien-chinh-thuc-cua-ban>
   ENABLE_DEMO_CERTIFICATES=false
   ```

2. **Khởi chạy toàn bộ hệ thống bằng Docker**:
   ```bash
   docker compose up -d --build
   ```
   Docker sẽ tự động:
   - Build ứng dụng Next.js 15 ở chế độ độc lập (`standalone`).
   - Khởi chạy PostgreSQL 16 với healthcheck tự động.
   - Gắn các volume lưu trữ dữ liệu bền vững:
     - `mhd_uploads`: Lưu hình ảnh upload của CMS.
     - `mhd_private_uploads`: Lưu hồ sơ khách hàng bảo mật.
     - `mhd_postgres_data`: Lưu trữ dữ liệu cơ sở dữ liệu.

---

### Phương án 2: Triển khai trực tiếp trên VPS Ubuntu (Node.js + PM2 + Nginx)

1. **Chuẩn bị môi trường trên máy chủ**:
   ```bash
   sudo apt update && sudo apt install -y curl git nginx
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs
   sudo npm install -g pm2
   ```

2. **Kéo mã nguồn và cấu hình biến môi trường**:
   ```bash
   git clone https://github.com/MHD-Valuation/mhd-Homepage-Design.git /var/www/mhd
   cd /var/www/mhd/cms
   cp .env.example .env.production
   nano .env.production
   ```
   > *Điền `DATABASE_URI`, `PAYLOAD_SECRET` và `NEXT_PUBLIC_SERVER_URL=https://<ten-mien-chinh-thuc-cua-ban>`.*

3. **Build & Khởi chạy ứng dụng qua PM2**:
   ```bash
   npm install --production=false
   npm run build
   pm2 start npm --name "mhd-web" -- start
   pm2 save
   pm2 startup
   ```

4. **Cấu hình Nginx Reverse Proxy & SSL**:
   Tạo tệp cấu hình Nginx `/etc/nginx/sites-available/mhd.conf`:
   ```nginx
   server {
       listen 80;
       server_name <ten-mien-cua-ban> www.<ten-mien-cua-ban>;

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
   Kích hoạt và cài chứng chỉ SSL Let's Encrypt:
   ```bash
   sudo ln -s /etc/nginx/sites-available/mhd.conf /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d <ten-mien-cua-ban> -d www.<ten-mien-cua-ban>
   ```

---

## 10. Các lệnh CLI thường dùng

| Lệnh | Vị trí chạy | Mục đích |
| :--- | :--- | :--- |
| `npm run dev` | `cms/` | Khởi chạy máy chủ phát triển tại cổng 3005 |
| `npm run build` | `cms/` | Biên dịch bản build tối ưu cho môi trường Production |
| `npm run start` | `cms/` | Khởi chạy bản build Production |
| `npm run seed` | `cms/` | Nạp dữ liệu mẫu ban đầu vào cơ sở dữ liệu |
| `npm run generate:types` | `cms/` | Cập nhật lại TypeScript types (`payload-types.ts`) |
| `npx tsc --noEmit` | `cms/` | Kiểm tra toàn bộ kiểu dữ liệu TypeScript (0 lỗi) |
| `docker compose ps` | Thư mục gốc / `cms/` | Kiểm tra trạng thái các container đang chạy |
| `docker compose logs -f web` | Thư mục gốc | Xem log ứng dụng theo thời gian thực |

---

*Bản quyền © 2026 MHD Valuation. Toàn quyền bảo lưu.*
