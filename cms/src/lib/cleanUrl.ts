/**
 * Universal URL Sanitizer for MHD Valuation Platform.
 * Converts any legacy static HTML file paths (.dc.html or .html)
 * to exact Next.js / React application routes.
 */
export function cleanNavHref(url?: string | null): string {
  if (!url) return '#'

  let u = url.trim()

  // Keep external / protocol links as-is
  if (
    u.startsWith('http://') ||
    u.startsWith('https://') ||
    u.startsWith('tel:') ||
    u.startsWith('mailto:') ||
    u.startsWith('javascript:')
  ) {
    return u
  }

  // Handle in-page anchors
  if (u.startsWith('#')) {
    return u
  }

  // Normalize leading slash
  if (!u.startsWith('/')) {
    u = '/' + u
  }

  // Exact mappings for legacy static filenames & section anchors
  const exactMap: Record<string, string> = {
    // About & sub-sections
    '/MHD About.dc.html': '/about',
    '/MHD About.dc.html#phap-ly': '/about#phap-ly',
    '/MHD About.dc.html#doi-ngu': '/about#doi-ngu',
    '/MHD About.dc.html#doi-tac': '/about#doi-tac',
    '/MHD About.dc.html#du-an': '/about#du-an',
    '/MHD About.html': '/about',
    '/about#phap-ly': '/about#phap-ly',
    '/about#doi-ngu': '/about#doi-ngu',
    '/about#doi-tac': '/about#doi-tac',
    '/about#du-an': '/about#du-an',

    // Services
    '/Dich-vu-Doanh-nghiep.dc.html': '/services/Dich-vu-Doanh-nghiep',
    '/Dich-vu-Bat-dong-san.dc.html': '/services/Dich-vu-Bat-dong-san',
    '/Dich-vu-May-thiet-bi.dc.html': '/services/Dich-vu-May-thiet-bi',
    '/Dich-vu-Thuong-hieu.dc.html': '/services/Dich-vu-Thuong-hieu',
    '/Dich-vu-Du-an-dau-tu.dc.html': '/services/Dich-vu-Du-an-dau-tu',
    '/Dich-vu-Chung-minh-tai-chinh.dc.html': '/services/Dich-vu-Chung-minh-tai-chinh',

    // Projects
    '/MHD Projects.dc.html': '/projects',
    '/MHD Projects.dc.html#doanh-nghiep': '/projects/doanh-nghiep',
    '/MHD Projects.dc.html#bat-dong-san': '/projects/bat-dong-san',
    '/MHD Projects.dc.html#ha-tang': '/projects/ha-tang',
    '/MHD Projects.html': '/projects',

    // Insights
    '/Du-lieu-Insight.dc.html': '/insights',
    '/Du-lieu-Insight-Chuyen-muc.dc.html': '/insights',
    '/Du-lieu-Insight-Chuyen-muc.dc.html#cm/thi-truong': '/insights?category=thi-truong',
    '/Du-lieu-Insight-Chuyen-muc.dc.html#cm/kien-thuc': '/insights?category=kien-thuc',
    '/Du-lieu-Insight-Chuyen-muc.dc.html#cm/chinh-sach': '/insights?category=chinh-sach',
    '/Du-lieu-Insight-Chuyen-muc.dc.html#cm/case-study': '/insights?category=case-study',
    '/Du-lieu-Insight-Chuyen-muc.dc.html#cm/bao-cao': '/insights?category=bao-cao',
    '/Du-lieu-Insight-Chi-tiet.dc.html': '/insights',

    // Legal & Lookup
    '/Phap-ly.dc.html': '/about#phap-ly',
    '/Phap-ly-Tra-cuu.dc.html': '/phap-ly/tra-cuu',
    '/Phap-ly-Tieu-chuan.dc.html': '/phap-ly/quy-trinh',
    '/Phap-ly-Chat-luong.dc.html': '/phap-ly/chinh-sach',
    '/Phap-ly-Quy-trinh.dc.html': '/phap-ly/quy-trinh',
    '/Phap-ly-Chinh-sach.dc.html': '/phap-ly/chinh-sach',

    // Contact
    '/MHD Contact.dc.html': '/contact',
    '/MHD Contact.dc.html#yeu-cau': '/contact#yeu-cau',
    '/MHD Contact.dc.html#van-phong': '/contact#van-phong',
    '/MHD Contact.dc.html#bao-gia': '/contact#bao-gia',
    '/MHD Contact.dc.html#faq': '/contact#faq',
    '/contact#yeu-cau': '/contact#yeu-cau',
    '/contact#van-phong': '/contact#van-phong',
    '/contact#bao-gia': '/contact#bao-gia',
    '/contact#faq': '/contact#faq',
    '/#quy-trinh': '/#quy-trinh',
    '/#portals': '/#portals',

    // Careers
    '/Tuyen-dung.dc.html': '/tuyen-dung',
    '/Tuyen-dung.html': '/tuyen-dung',

    // Homepage
    '/MHD Homepage v2.dc.html': '/',
    '/index.html': '/',
  }

  if (exactMap[u]) {
    return exactMap[u]
  }

  // Split path and hash
  const hashIdx = u.indexOf('#')
  const pathPart = hashIdx !== -1 ? u.slice(0, hashIdx) : u
  const hashPart = hashIdx !== -1 ? u.slice(hashIdx) : ''

  if (exactMap[pathPart]) {
    return exactMap[pathPart] + hashPart
  }

  // Regex replacement for any remaining .dc.html or .html
  if (u.includes('.html')) {
    let cleaned = u.replace(/\.dc\.html/gi, '').replace(/\.html/gi, '')
    // Replace spaces if any
    cleaned = cleaned.replace(/\s+/g, '-')
    return cleaned
  }

  return u
}
