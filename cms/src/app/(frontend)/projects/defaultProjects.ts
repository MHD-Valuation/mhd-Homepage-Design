export interface ProjectDossier {
  id: string
  title: string
  category: 'may-thiet-bi' | 'bat-dong-san' | 'doanh-nghiep' | 'tai-san-vo-hinh' | 'ha-tang'
  categoryLabel: string
  context: string
  scope: string
  deliveredValue: string
  standard?: string
}

export const CANONICAL_DOSSIERS: { vi: ProjectDossier[]; en: ProjectDossier[] } = {
  vi: [
    {
      id: 'dossier-1',
      title: 'Dây chuyền sản xuất bột mì',
      category: 'may-thiet-bi',
      categoryLabel: 'Máy móc thiết bị',
      context: 'Doanh nghiệp cần cơ sở giá trị tài sản phục vụ cấp tín dụng và tái cấu trúc vốn.',
      scope: 'Khảo sát hiện trạng, thu thập hồ sơ kỹ thuật, phân tích thông tin thị trường.',
      deliveredValue: 'Chứng thư và báo cáo thẩm định giá làm cơ sở cho quyết định của khách hàng.',
      standard: 'Tiêu chuẩn Thẩm định giá Việt Nam về Máy móc thiết bị (Thông tư 31/2024/TT-BTC)',
    },
    {
      id: 'dossier-2',
      title: 'Khu đô thị tại TP. Hồ Chí Minh',
      category: 'bat-dong-san',
      categoryLabel: 'Bất động sản',
      context: 'Chủ đầu tư cần xác định giá trị dự án phục vụ hợp tác đầu tư.',
      scope: 'Rà soát pháp lý dự án, phân tích dòng tiền, đối chiếu giao dịch so sánh.',
      deliveredValue: 'Chứng thư và báo cáo thẩm định giá làm cơ sở cho quyết định của khách hàng.',
      standard: 'Tiêu chuẩn Thẩm định giá Bất động sản & Phương pháp Thặng dư (Thông tư 30/2024/TT-BTC)',
    },
    {
      id: 'dossier-3',
      title: 'Doanh nghiệp sản xuất',
      category: 'doanh-nghiep',
      categoryLabel: 'Giá trị doanh nghiệp',
      context: 'Doanh nghiệp cần xác định giá trị phục vụ tái cấu trúc vốn.',
      scope: 'Phân tích báo cáo tài chính, lựa chọn phương pháp theo Thông tư 36/2024/TT-BTC.',
      deliveredValue: 'Chứng thư và báo cáo thẩm định giá làm cơ sở cho quyết định của khách hàng.',
      standard: 'Tiêu chuẩn Thẩm định giá Doanh nghiệp (Thông tư 36/2024/TT-BTC)',
    },
    {
      id: 'dossier-4',
      title: 'Khách sạn nghỉ dưỡng',
      category: 'bat-dong-san',
      categoryLabel: 'Bất động sản thương mại',
      context: 'Tổ chức tín dụng cần cơ sở giá trị tài sản bảo đảm.',
      scope: 'Khảo sát tài sản, phân tích thu nhập và thị trường khu vực.',
      deliveredValue: 'Chứng thư và báo cáo thẩm định giá làm cơ sở cho quyết định của khách hàng.',
      standard: 'Phương pháp Chiết khấu dòng tiền (DCF) & Vốn hóa trực tiếp',
    },
  ],
  en: [
    {
      id: 'dossier-1',
      title: 'Flour Milling Production Line',
      category: 'may-thiet-bi',
      categoryLabel: 'Machinery & Equipment',
      context: 'Enterprise required asset value basis for credit facility and capital restructuring.',
      scope: 'On-site technical survey, engineering dossier audit, secondary machinery market analysis.',
      deliveredValue: 'Authoritative valuation report and certificate underpinning commercial banking approval.',
      standard: 'Vietnam Valuation Standards for Machinery & Equipment (Circular 31/2024/TT-BTC)',
    },
    {
      id: 'dossier-2',
      title: 'Urban Township Complex in Southern Hub',
      category: 'bat-dong-san',
      categoryLabel: 'Real Estate',
      context: 'Developer required project market valuation for joint-venture investment and financing.',
      scope: 'Statutory land permit review, DCF cash flow simulation, comparable transaction benchmarking.',
      deliveredValue: 'Robust valuation opinion facilitating institutional investor syndication.',
      standard: 'Real Estate Valuation Standards & Residual Approach (Circular 30/2024/TT-BTC)',
    },
    {
      id: 'dossier-3',
      title: 'FMCG Manufacturing Enterprise',
      category: 'doanh-nghiep',
      categoryLabel: 'Enterprise Valuation',
      context: 'Enterprise required valuation for capital reorganization and private placement.',
      scope: 'Financial audit review, selection of multiple approaches compliant with Circular 36/2024.',
      deliveredValue: 'Independent valuation certified for shareholder and board ratification.',
      standard: 'Vietnam Enterprise Valuation Standards (Circular 36/2024/TT-BTC)',
    },
    {
      id: 'dossier-4',
      title: 'Beachfront Luxury Resort Hotel',
      category: 'bat-dong-san',
      categoryLabel: 'Commercial Hospitality',
      context: 'Commercial credit institution required asset appraisal for collateralized loan facility.',
      scope: 'Comprehensive hospitality asset audit, RevPAR/ADR cash flow yield modeling, and regional market comparison.',
      deliveredValue: 'Valuation dossier rigorously defended before internal bank risk committee.',
      standard: 'Discounted Cash Flow (DCF) & Capitalization Method',
    },
  ],
}

export interface ProjectData {
  id: string | number
  title: string
  category: string
  client?: string
  valuationPurpose?: string
  scale?: string
  year?: number
  image?: string
  location?: string
  highlights?: string[]
}

// Deprecated mock project compatibility layer:
// Re-maps to canonical dossiers so no fake projects are ever exposed
export const DEFAULT_PROJECTS: { vi: ProjectData[]; en: ProjectData[] } = {
  vi: CANONICAL_DOSSIERS.vi.map((d) => ({
    id: d.id,
    title: d.title,
    category: d.category,
    client: 'Khách hàng bảo mật',
    valuationPurpose: d.context,
    scale: 'Thẩm định độc lập',
    year: 2025,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
    location: 'Việt Nam',
    highlights: [d.scope, d.deliveredValue],
  })),
  en: CANONICAL_DOSSIERS.en.map((d) => ({
    id: d.id,
    title: d.title,
    category: d.category,
    client: 'Confidential Client',
    valuationPurpose: d.context,
    scale: 'Independent Appraisal',
    year: 2025,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
    location: 'Vietnam',
    highlights: [d.scope, d.deliveredValue],
  })),
}

