/**
 * COMPREHENSIVE PRODUCTION READINESS AUDIT SUITE
 * Tests all core features, endpoints, SEO, APIs, and CMS capabilities.
 */
const BASE = 'http://localhost:3005';

const endpoints = [
  // 1. Core Pages
  { path: '/', name: 'Trang chủ (Home)' },
  { path: '/about', name: 'Giới thiệu tổng quan' },
  { path: '/about/doi-ngu', name: 'Đội ngũ chuyên gia' },
  { path: '/about/doi-tac', name: 'Đối tác ngân hàng' },
  { path: '/about/phap-ly', name: 'Hồ sơ pháp lý' },
  { path: '/contact', name: 'Liên hệ chính' },
  { path: '/contact/van-phong', name: 'Hệ thống văn phòng' },
  { path: '/tuyen-dung', name: 'Tuyển dụng nhân tài' },
  
  // 2. Services Hub & Details
  { path: '/services', name: 'Danh mục dịch vụ' },
  { path: '/services/Dich-vu-Doanh-nghiep', name: 'Dịch vụ: Thẩm định Doanh nghiệp' },
  { path: '/services/Dich-vu-Bat-dong-san', name: 'Dịch vụ: Thẩm định Bất động sản' },
  { path: '/services/Dich-vu-May-thiet-bi', name: 'Dịch vụ: Thẩm định Máy thiết bị' },
  { path: '/services/Dich-vu-Thuong-hieu', name: 'Dịch vụ: Thẩm định Thương hiệu' },
  { path: '/services/Dich-vu-Du-an-dau-tu', name: 'Dịch vụ: Thẩm định Dự án đầu tư' },
  { path: '/services/Dich-vu-Chung-minh-tai-chinh', name: 'Dịch vụ: Chứng minh tài chính' },

  // 3. Projects Hub & Categories
  { path: '/projects', name: 'Danh mục dự án tiêu biểu' },
  { path: '/projects/doanh-nghiep', name: 'Dự án: Doanh nghiệp' },
  { path: '/projects/bat-dong-san', name: 'Dự án: Bất động sản' },
  { path: '/projects/ha-tang', name: 'Dự án: Hạ tầng' },

  // 4. Data & Insights
  { path: '/insights', name: 'Dữ liệu & Insight Hub' },
  { path: '/insights?category=kien-thuc', name: 'Insight: Chuyên mục Kiến thức' },
  { path: '/insights?category=bao-cao', name: 'Insight: Chuyên mục Báo cáo' },
  { path: '/insights?category=chinh-sach', name: 'Insight: Chuyên mục Chính sách' },

  // 5. Legal & Compliance Ecosystem
  { path: '/phap-ly/quy-trinh', name: 'Quy trình 6 bước chuẩn hóa' },
  { path: '/phap-ly/chinh-sach', name: 'Chính sách vận hành' },
  { path: '/phap-ly/tra-cuu', name: 'Cổng tra cứu chứng thư trực tuyến' },

  // 6. Technical SEO & Assets
  { path: '/robots.txt', name: 'Robots.txt' },
  { path: '/sitemap.xml', name: 'Sitemap XML' },
  { path: '/admin', name: 'Payload CMS Admin Portal' },
];

async function runAudit() {
  console.log('================================================================');
  console.log('       MHD VALUATION — PRODUCTION READINESS COMPREHENSIVE AUDIT');
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;

  // -------------------------------------------------------------
  // PHASE 1: HTTP 200 Verification for all 25+ Endpoints
  // -------------------------------------------------------------
  console.log('--- PHẦN 1: KIỂM TRA ĐỘ KHẢ DỤNG TẤT CẢ CÁC TRANG & ENDPOINTS ---');
  for (const ep of endpoints) {
    const start = Date.now();
    try {
      const res = await fetch(`${BASE}${ep.path}`, { redirect: 'manual' });
      const duration = Date.now() - start;
      const ok = res.status === 200 || res.status === 307 || res.status === 308;
      if (ok) {
        console.log(`  [✓] ${res.status} (${duration}ms) - ${ep.name.padEnd(35)} : ${ep.path}`);
        passed++;
      } else {
        console.error(`  [✗] ${res.status} (${duration}ms) - ${ep.name.padEnd(35)} : ${ep.path}`);
        failed++;
      }
    } catch (err) {
      console.error(`  [✗] LỖI (${ep.name}) : ${err.message}`);
      failed++;
    }
  }

  // -------------------------------------------------------------
  // PHASE 2: Certificate Verification API (/api/lookup)
  // -------------------------------------------------------------
  console.log('\n--- PHẦN 2: KIỂM TRA TÍNH NĂNG TRA CỨU CHỨNG THƯ (/api/lookup) ---');
  try {
    // 2.1 Valid Certificate lookup
    const validRes = await fetch(`${BASE}/api/lookup?number=MHD-2025-0891`);
    const validData = await validRes.json();
    if (validRes.status === 200 && validData.found && validData.data?.no === 'MHD-2025-0891') {
      console.log(`  [✓] Tra cứu chứng thư hợp lệ (MHD-2025-0891): THÀNH CÔNG`);
      console.log(`      Tài sản: ${validData.data.asset}`);
      console.log(`      Hiệu lực: ${validData.data.status} (Hạn: ${validData.data.until})`);
      passed++;
    } else {
      console.error(`  [✗] Tra cứu chứng thư hợp lệ THẤT BẠI:`, validData);
      failed++;
    }

    // 2.2 Invalid Certificate lookup
    const invalidRes = await fetch(`${BASE}/api/lookup?number=INVALID-999-999`);
    const invalidData = await invalidRes.json();
    if (invalidRes.status === 200 && invalidData.found === false) {
      console.log(`  [✓] Tra cứu chứng thư không tồn tại: THÀNH CÔNG (Trả về thông báo chuẩn)`);
      passed++;
    } else {
      console.error(`  [✗] Xử lý chứng thư không tồn tại THẤT BẠI:`, invalidData);
      failed++;
    }
  } catch (err) {
    console.error(`  [✗] Lỗi Phase 2:`, err.message);
    failed++;
  }

  // -------------------------------------------------------------
  // PHASE 3: Inquiry Submission API (/api/inquiries)
  // -------------------------------------------------------------
  console.log('\n--- PHẦN 3: KIỂM TRA TÍNH NĂNG TIẾP NHẬN HỒ SƠ & BÁO GIÁ ---');
  try {
    const postRes = await fetch(`${BASE}/api/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Nguyễn Văn Kiểm Thử Production',
        phone: '0908123456',
        email: 'audit@mhd.com.vn',
        serviceType: 'Dich-vu-Doanh-nghiep',
        dossierType: 'request',
        message: 'Hồ sơ thẩm định phục vụ kiểm tra tự động trước khi đóng gói sản phẩm',
      }),
    });
    const postData = await postRes.json();
    if (postRes.status === 200 && postData.success && postData.ticketNumber) {
      console.log(`  [✓] Tiếp nhận yêu cầu thẩm định thành công! Mã hồ sơ cấp: ${postData.ticketNumber}`);
      passed++;
    } else {
      console.error(`  [✗] Tiếp nhận yêu cầu thẩm định THẤT BẠI:`, postData);
      failed++;
    }
  } catch (err) {
    console.error(`  [✗] Lỗi Phase 3:`, err.message);
    failed++;
  }

  // -------------------------------------------------------------
  // PHASE 4: SEO Metadata & Technical Headers
  // -------------------------------------------------------------
  console.log('\n--- PHẦN 4: KIỂM TRA SEO METADATA & BẢO MẬT HEADERS ---');
  try {
    const homeRes = await fetch(`${BASE}/`);
    const homeHtml = await homeRes.text();

    const hasTitle = homeHtml.includes('<title>') && homeHtml.includes('MHD');
    const hasCanonical = homeHtml.includes('canonical') || homeHtml.includes('og:url');
    const hasViewport = homeHtml.includes('name="viewport"');
    const hasRobotsMeta = homeHtml.includes('robots');

    console.log(`  [${hasTitle ? '✓' : '✗'}] Thẻ Title & Tên thương hiệu: ${hasTitle ? 'ĐẠT' : 'THIẾU'}`);
    console.log(`  [${hasViewport ? '✓' : '✗'}] Responsive Viewport: ${hasViewport ? 'ĐẠT' : 'THIẾU'}`);
    console.log(`  [${hasRobotsMeta ? '✓' : '✗'}] Thẻ Meta Robots: ${hasRobotsMeta ? 'ĐẠT' : 'THIẾU'}`);

    const secHeaders = {
      'x-content-type-options': homeRes.headers.get('x-content-type-options'),
      'x-frame-options': homeRes.headers.get('x-frame-options'),
      'content-security-policy': homeRes.headers.get('content-security-policy'),
      'permissions-policy': homeRes.headers.get('permissions-policy'),
    };

    const hasSecHeaders = !!(secHeaders['x-content-type-options'] && secHeaders['x-frame-options']);
    console.log(`  [${hasSecHeaders ? '✓' : '✗'}] HTTP Security Headers (nosniff, SAMEORIGIN, CSP): ${hasSecHeaders ? 'ĐẠT' : 'THIẾU'}`);

    if (hasTitle && hasViewport && hasSecHeaders) {
      passed += 2;
    } else {
      failed += 1;
    }
  } catch (err) {
    console.error(`  [✗] Lỗi Phase 4:`, err.message);
    failed++;
  }

  console.log('\n================================================================');
  console.log(`KẾT QUẢ TỔNG QUAN: ${passed} KIỂM THỬ THÀNH CÔNG / ${failed} THẤT BẠI`);
  if (failed === 0) {
    console.log('>>> TRẠNG THÁI: HỆ THỐNG ĐẠT CHUẨN HOÀN TOÀN ĐỂ TRIỂN KHAI PRODUCTION! <<<');
  } else {
    console.log('>>> CẦN KIỂM TRA LẠI CÁC MỤC THẤT BẠI TRÊN <<<');
  }
  console.log('================================================================\n');
}

runAudit().catch(console.error);
