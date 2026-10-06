'use client'

import React, { useState } from 'react'

interface JobItem {
  id: string
  region: string
  regionLabel: string
  title: string
  level: string
  dept: string
  type: string
  qty: number
  deadline: string
  salary: string
  place: string
  summary: string
  desc: string[]
  req: string[]
  benefits: string[]
}

const JOBS_DATA: JobItem[] = [
  {
    id: 'hcm-bds',
    region: 'hcm',
    regionLabel: 'TP. Hồ Chí Minh',
    title: 'Chuyên viên thẩm định giá bất động sản',
    level: '1 – 3 năm',
    dept: 'Phòng Thẩm định Bất động sản',
    type: 'Toàn thời gian',
    qty: 2,
    deadline: '31/10/2026',
    salary: 'Thỏa thuận',
    place: 'Trụ sở chính TP.HCM',
    summary: 'Thực hiện hồ sơ thẩm định giá nhà, đất và công trình phục vụ vay vốn, mua bán, góp vốn và báo cáo tài chính.',
    desc: [
      'Khảo sát hiện trạng, thu thập thông tin pháp lý và thông tin thị trường',
      'Áp dụng cách tiếp cận thị trường, chi phí, thu nhập theo Chuẩn mực thẩm định giá Việt Nam',
      'Lập báo cáo và dự thảo chứng thư để thẩm định viên về giá rà soát',
      'Phối hợp với ngân hàng và khách hàng bổ sung hồ sơ',
    ],
    req: [
      'Tốt nghiệp đại học chuyên ngành thẩm định giá, kinh tế, tài chính, xây dựng hoặc quản lý đất đai',
      'Từ 1 năm kinh nghiệm thẩm định giá bất động sản',
      'Đọc hiểu giấy chứng nhận, thông tin quy hoạch và bản vẽ',
      'Sử dụng thành thạo Excel; có phương tiện đi lại',
    ],
    benefits: [
      'Thu nhập theo năng lực, xét điều chỉnh hằng năm',
      'Đóng BHXH, BHYT, BHTN theo quy định',
      'Hỗ trợ chi phí ôn thi và cấp thẻ thẩm định viên về giá',
      'Phụ cấp công tác khi khảo sát ngoài tỉnh',
    ],
  },
  {
    id: 'hcm-tdv',
    region: 'hcm',
    regionLabel: 'TP. Hồ Chí Minh',
    title: 'Thẩm định viên về giá',
    level: 'Trên 5 năm',
    dept: 'Phòng Thẩm định Doanh nghiệp',
    type: 'Toàn thời gian',
    qty: 1,
    deadline: '15/11/2026',
    salary: 'Thỏa thuận',
    place: 'Trụ sở chính TP.HCM',
    summary: 'Chịu trách nhiệm chuyên môn và ký báo cáo, chứng thư thẩm định giá trong phạm vi được phân công.',
    desc: [
      'Rà soát phương pháp, giả thiết và số liệu trong báo cáo thẩm định giá',
      'Ký báo cáo và chứng thư thẩm định giá theo quy định của Luật Giá 2023',
      'Hướng dẫn chuyên môn cho chuyên viên trong nhóm',
      'Trao đổi với khách hàng về phạm vi công việc và kết quả',
    ],
    req: [
      'Có thẻ thẩm định viên về giá do Bộ Tài chính cấp',
      'Đủ điều kiện đăng ký hành nghề thẩm định giá theo quy định',
      'Từ 5 năm kinh nghiệm, ưu tiên thẩm định giá doanh nghiệp hoặc tài sản vô hình',
      'Nắm vững hệ thống Chuẩn mực thẩm định giá Việt Nam hiện hành',
    ],
    benefits: [
      'Mức đãi ngộ và thưởng kết quả hồ sơ hấp dẫn',
      'Môi trường làm việc chuyên nghiệp, chuẩn mực cao',
      'Chế độ bảo hiểm sức khỏe cao cấp',
    ],
  },
  {
    id: 'hcm-mtb',
    region: 'hcm',
    regionLabel: 'TP. Hồ Chí Minh',
    title: 'Chuyên viên thẩm định giá máy móc thiết bị',
    level: '1 – 3 năm',
    dept: 'Phòng Thẩm định Động sản',
    type: 'Toàn thời gian',
    qty: 1,
    deadline: '31/10/2026',
    salary: 'Thỏa thuận',
    place: 'Trụ sở chính TP.HCM',
    summary: 'Thẩm định giá dây chuyền sản xuất, máy móc, phương tiện vận tải cho mục đích thế chấp, thanh lý và góp vốn.',
    desc: [
      'Khảo sát, ghi nhận thông số kỹ thuật và tình trạng vận hành của tài sản',
      'Ước tính chất lượng còn lại, thu thập báo giá và dữ liệu giao dịch',
      'Lập báo cáo thẩm định giá động sản',
      'Công tác tại nhà máy, khu công nghiệp ở các tỉnh phía Nam',
    ],
    req: [
      'Tốt nghiệp chuyên ngành cơ khí, điện, ô tô hoặc kinh tế, thẩm định giá',
      'Đọc hiểu catalogue, tài liệu kỹ thuật tiếng Anh',
      'Sẵn sàng đi công tác ngắn ngày',
      'Ưu tiên ứng viên đã có kinh nghiệm thẩm định giá máy móc thiết bị',
    ],
    benefits: [
      'Phụ cấp công tác và di chuyển đầy đủ',
      'Được đào tạo định kỳ từ các chuyên gia thiết bị',
      'Lương tháng 13 và thưởng dự án',
    ],
  },
  {
    id: 'hcm-tts',
    region: 'hcm',
    regionLabel: 'TP. Hồ Chí Minh',
    title: 'Thực tập sinh thẩm định giá',
    level: 'Sinh viên',
    dept: 'Khối Nghiệp vụ',
    type: 'Thực tập 3 – 6 tháng',
    qty: 3,
    deadline: '30/11/2026',
    salary: 'Hỗ trợ thực tập',
    place: 'Trụ sở chính TP.HCM',
    summary: 'Tham gia hỗ trợ đội ngũ thẩm định trong các hồ sơ bất động sản và động sản, có người hướng dẫn trực tiếp.',
    desc: [
      'Hỗ trợ thu thập thông tin thị trường và tài sản so sánh',
      'Tham gia khảo sát hiện trạng cùng chuyên viên',
      'Nhập liệu, sắp xếp hồ sơ và hỗ trợ lập bảng tính',
    ],
    req: [
      'Sinh viên năm cuối hoặc mới tốt nghiệp ngành thẩm định giá, kinh tế, tài chính',
      'Làm việc tối thiểu 4 ngày/tuần',
      'Sử dụng tốt Excel, Word',
    ],
    benefits: [
      'Phụ cấp thực tập hằng tháng',
      'Người hướng dẫn là thẩm định viên về giá giàu kinh nghiệm',
      'Xác nhận dấu thực tập và cơ hội trở thành nhân viên chính thức',
    ],
  },
  {
    id: 'hn-dn',
    region: 'hn',
    regionLabel: 'Hà Nội',
    title: 'Chuyên viên thẩm định giá doanh nghiệp',
    level: '2 – 4 năm',
    dept: 'Phòng Thẩm định Doanh nghiệp',
    type: 'Toàn thời gian',
    qty: 1,
    deadline: '15/11/2026',
    salary: 'Thỏa thuận',
    place: 'Chi nhánh Hà Nội',
    summary: 'Xác định giá trị doanh nghiệp và phần vốn góp cho M&A, cổ phần hoá, chuyển nhượng vốn và tái cấu trúc.',
    desc: [
      'Phân tích báo cáo tài chính, kế hoạch kinh doanh của doanh nghiệp',
      'Xây dựng mô hình dòng tiền chiết khấu và so sánh thị trường',
      'Lập báo cáo thẩm định giá doanh nghiệp',
      'Làm việc với ban lãnh đạo và tư vấn của khách hàng',
    ],
    req: [
      'Tốt nghiệp chuyên ngành tài chính, kế toán, kiểm toán hoặc thẩm định giá',
      'Từ 2 năm kinh nghiệm thẩm định giá, kiểm toán hoặc tư vấn tài chính',
      'Thành thạo mô hình tài chính trên Excel',
      'Ưu tiên đang theo học CFA, ACCA hoặc ôn thi thẻ thẩm định viên',
    ],
    benefits: [
      'Thu nhập cạnh tranh cùng thưởng hiệu quả hồ sơ',
      'Cơ hội tham gia các thương vụ định giá lớn',
      'Được tài trợ tham gia các hội thảo chuyên sâu',
    ],
  },
  {
    id: 'hn-kh',
    region: 'hn',
    regionLabel: 'Hà Nội',
    title: 'Chuyên viên phát triển khách hàng',
    level: '1 – 2 năm',
    dept: 'Phòng Kinh doanh',
    type: 'Toàn thời gian',
    qty: 2,
    deadline: '31/10/2026',
    salary: 'Lương CB + Thưởng doanh số',
    place: 'Chi nhánh Hà Nội',
    summary: 'Tiếp nhận nhu cầu từ ngân hàng, doanh nghiệp và cá nhân; phối hợp với phòng nghiệp vụ để lập báo giá và theo dõi hồ sơ.',
    desc: [
      'Tiếp nhận yêu cầu, xác nhận thông tin tài sản và mục đích thẩm định',
      'Lập báo giá, hợp đồng dịch vụ và theo dõi tiến độ hồ sơ',
      'Duy trì quan hệ với chi nhánh ngân hàng và đối tác',
    ],
    req: [
      'Tốt nghiệp chuyên ngành kinh tế, ngân hàng, quản trị kinh doanh',
      'Từ 1 năm kinh nghiệm bán dịch vụ cho doanh nghiệp hoặc ngân hàng',
      'Giao tiếp tốt, chủ động với khách hàng',
    ],
    benefits: [
      'Chính sách hoa hồng và thưởng doanh số rõ ràng',
      'Được đào tạo kiến thức chuyên sâu về dịch vụ thẩm định giá',
      'Môi trường năng động, nhiều cơ hội mở rộng quan hệ',
    ],
  },
  {
    id: 'dn-ks',
    region: 'dn',
    regionLabel: 'Đà Nẵng',
    title: 'Chuyên viên khảo sát hiện trạng tài sản',
    level: 'Dưới 1 năm',
    dept: 'Chi nhánh Đà Nẵng',
    type: 'Toàn thời gian',
    qty: 2,
    deadline: '31/10/2026',
    salary: 'Thỏa thuận',
    place: 'Chi nhánh Đà Nẵng',
    summary: 'Khảo sát, đo đạc và ghi nhận hiện trạng tài sản tại Đà Nẵng và các tỉnh miền Trung.',
    desc: [
      'Khảo sát, chụp ảnh và lập biên bản hiện trạng tài sản',
      'Thu thập thông tin giao dịch thị trường tại khu vực',
      'Chuyển dữ liệu cho chuyên viên lập báo cáo',
    ],
    req: [
      'Tốt nghiệp cao đẳng trở lên chuyên ngành kinh tế, xây dựng, quản lý đất đai',
      'Có xe máy, sẵn sàng di chuyển trong khu vực',
      'Cẩn thận, trung thực trong ghi nhận thông tin',
    ],
    benefits: [
      'Phụ cấp xăng xe và điện thoại hằng tháng',
      'Được đào tạo kỹ năng chụp ảnh, khảo sát hiện trạng chuyên nghiệp',
      'Lộ trình thăng tiến lên Chuyên viên thẩm định giá',
    ],
  },
  {
    id: 'ct-bds',
    region: 'ct',
    regionLabel: 'Cần Thơ',
    title: 'Chuyên viên thẩm định giá bất động sản',
    level: '1 – 3 năm',
    dept: 'Văn phòng Cần Thơ',
    type: 'Toàn thời gian',
    qty: 1,
    deadline: '15/11/2026',
    salary: 'Thỏa thuận',
    place: 'Văn phòng Cần Thơ',
    summary: 'Thực hiện hồ sơ thẩm định giá bất động sản tại Cần Thơ và các tỉnh Đồng bằng sông Cửu Long.',
    desc: [
      'Khảo sát tài sản và thu thập thông tin thị trường khu vực',
      'Lập báo cáo thẩm định giá bất động sản',
      'Phối hợp với chi nhánh ngân hàng tại địa phương',
    ],
    req: [
      'Tốt nghiệp đại học chuyên ngành thẩm định giá, kinh tế, quản lý đất đai',
      'Từ 1 năm kinh nghiệm thẩm định giá bất động sản',
      'Am hiểu thị trường khu vực Đồng bằng sông Cửu Long',
    ],
    benefits: [
      'Chế độ đãi ngộ tốt, môi trường thân thiện',
      'Chế độ thưởng ngày lễ tết, du lịch hằng năm',
    ],
  },
]

const JOBS_DATA_EN: JobItem[] = [
  {
    id: 'hcm-bds',
    region: 'hcm',
    regionLabel: 'Ho Chi Minh City',
    title: 'Real Estate Valuation Specialist',
    level: '1 – 3 years',
    dept: 'Real Estate Appraisal Department',
    type: 'Full-time',
    qty: 2,
    deadline: '31/10/2026',
    salary: 'Negotiable',
    place: 'Head Office - Ho Chi Minh City',
    summary: 'Executing valuation dossiers for residential and commercial real estate serving bank credit, transactions, and statutory reporting.',
    desc: [
      'Perform on-site surveys, compile legal dossiers, and gather local real estate market data',
      'Apply market comparison, cost, and income approaches under Vietnam Valuation Standards',
      'Draft valuation reports and certificates for review by certified practicing valuers',
      'Liaise with banking partners and clients for supplementary documentation',
    ],
    req: [
      'Bachelor degree in Valuation, Economics, Finance, Civil Engineering, or Land Management',
      'From 1 year of hands-on experience in real estate appraisal',
      'Proficiency in interpreting land title deeds, approved master plans, and architectural drawings',
      'Proficiency in Excel; mobile with personal transportation',
    ],
    benefits: [
      'Competitive merit-based compensation with annual performance reviews',
      'Full social, medical, and unemployment insurance under statutory regulations',
      'Subsidized preparation and examination costs for the Ministry of Finance Valuer Card',
      'Travel per diem and field survey allowances for assignments outside the city',
    ],
  },
  {
    id: 'hcm-tdv',
    region: 'hcm',
    regionLabel: 'Ho Chi Minh City',
    title: 'Certified Practicing Valuer',
    level: '5+ years',
    dept: 'Enterprise Valuation Department',
    type: 'Full-time',
    qty: 1,
    deadline: '15/11/2026',
    salary: 'Negotiable',
    place: 'Head Office - Ho Chi Minh City',
    summary: 'Holding professional signatory responsibility for appraisal reports and certificates within authorized engagement scopes.',
    desc: [
      'Review methodology, valuation models, assumptions, and empirical datasets in appraisal reports',
      'Sign valuation reports and certificates in accordance with the Vietnam Law on Price 2023',
      'Provide senior technical guidance and mentoring to associate valuation specialists',
      'Consult directly with corporate clients regarding engagement scope and valuation conclusions',
    ],
    req: [
      'Certified Practicing Valuer Card officially issued by the Ministry of Finance (MOF)',
      'Statutorily eligible for valuation practice registration with the Ministry of Finance',
      'Minimum 5 years of appraisal experience, preferably in enterprise or intangible asset valuation',
      'Thorough mastery of the current system of Vietnam Valuation Standards',
    ],
    benefits: [
      'Attractive executive compensation package with transaction performance bonuses',
      'High-standard professional environment adhering strictly to ethical standards',
      'Premium comprehensive private healthcare insurance',
    ],
  },
  {
    id: 'hcm-mtb',
    region: 'hcm',
    regionLabel: 'Ho Chi Minh City',
    title: 'Machinery & Equipment Valuation Specialist',
    level: '1 – 3 years',
    dept: 'Movable Assets Appraisal Department',
    type: 'Full-time',
    qty: 1,
    deadline: '31/10/2026',
    salary: 'Negotiable',
    place: 'Head Office - Ho Chi Minh City',
    summary: 'Appraising industrial manufacturing lines, machinery, and transport vehicles for collateral, liquidation, and capital injection.',
    desc: [
      'Conduct on-site surveys, record technical specifications and operational status of machinery',
      'Estimate remaining useful life, gather price quotes and secondary market transaction data',
      'Formulate comprehensive movable asset valuation reports',
      'Conduct field surveys across factories and industrial parks in southern economic hubs',
    ],
    req: [
      'Graduated in Mechanical, Electrical, Automotive Engineering, Economics, or Valuation',
      'Ability to read technical catalogues and engineering documentation in English',
      'Willingness to undertake short business trips across southern provinces',
      'Prior experience in machinery and equipment valuation is an advantage',
    ],
    benefits: [
      'Full business travel per diems and transportation allowances',
      'Periodic specialized technical training by industrial machinery experts',
      '13th-month salary and performance-based project bonuses',
    ],
  },
  {
    id: 'hcm-tts',
    region: 'hcm',
    regionLabel: 'Ho Chi Minh City',
    title: 'Valuation Analyst Intern',
    level: 'Student',
    dept: 'Professional Operations Division',
    type: '3–6 month Internship',
    qty: 3,
    deadline: '30/11/2026',
    salary: 'Internship Allowance',
    place: 'Head Office - Ho Chi Minh City',
    summary: 'Assisting appraisal teams in real estate and tangible asset engagements under direct 1-on-1 senior mentorship.',
    desc: [
      'Support collection of market transactions and comparable asset data',
      'Accompany senior valuers on physical on-site asset surveys',
      'Perform data entry, document organization, and financial calculation assistance',
    ],
    req: [
      'Final-year students or recent graduates in Valuation, Economics, Finance, or Banking',
      'Ability to commit at least 4 working days per week',
      'Proficiency in Microsoft Excel and Word',
    ],
    benefits: [
      'Monthly internship stipend allowance',
      'Direct 1-on-1 mentorship by experienced Certified Practicing Valuers',
      'Official internship certificate seal and fast-track transition to full-time specialist',
    ],
  },
  {
    id: 'hn-dn',
    region: 'hn',
    regionLabel: 'Hanoi',
    title: 'Enterprise Valuation Specialist',
    level: '2 – 4 years',
    dept: 'Enterprise Valuation Department',
    type: 'Full-time',
    qty: 1,
    deadline: '15/11/2026',
    salary: 'Negotiable',
    place: 'Hanoi Branch',
    summary: 'Determining business enterprise values and equity stakes for M&A, equitization, capital restructuring, and divestment.',
    desc: [
      'Analyze historical corporate financial statements and management business plans',
      'Construct discounted cash flow (DCF) models and market multiple benchmarks',
      'Draft detailed corporate valuation reports',
      'Participate in technical meetings with executive management and client financial advisors',
    ],
    req: [
      'Degree in Corporate Finance, Accounting, Auditing, or Valuation',
      'From 2 years of experience in business valuation, financial auditing, or corporate advisory',
      'Proficiency in financial modeling on Excel',
      'Progress toward CFA, ACCA, or MOF Valuer Card is highly advantageous',
    ],
    benefits: [
      'Competitive compensation package with deal milestone bonuses',
      'Direct participation in marquee large-scale enterprise valuation deals',
      'Company sponsorship for specialized professional conferences and certifications',
    ],
  },
  {
    id: 'hn-kh',
    region: 'hn',
    regionLabel: 'Hanoi',
    title: 'Business Development Specialist',
    level: '1 – 2 years',
    dept: 'Commercial & Partnerships Department',
    type: 'Full-time',
    qty: 2,
    deadline: '31/10/2026',
    salary: 'Base Salary + Commission',
    place: 'Hanoi Branch',
    summary: 'Receiving valuation inquiries from banks, corporations, and investors; coordinating quotes and dossier workflows.',
    desc: [
      'Handle client inquiries, verify asset specifications and statutory valuation purposes',
      'Formulate service proposals and engagement contracts, monitoring execution progress',
      'Nurture business partnerships with commercial bank credit centers and corporate clients',
    ],
    req: [
      'Bachelor degree in Economics, Banking, Business Administration, or Commerce',
      'From 1 year of B2B corporate sales experience or banking client management',
      'Strong interpersonal communication and proactive client engagement skills',
    ],
    benefits: [
      'Transparent commission structure and performance bonuses',
      'In-depth training on statutory valuation regulations and banking credit workflows',
      'Dynamic professional environment with rich relationship expansion opportunities',
    ],
  },
  {
    id: 'dn-ks',
    region: 'dn',
    regionLabel: 'Da Nang',
    title: 'Asset Field Survey Specialist',
    level: 'Under 1 year',
    dept: 'Da Nang Branch',
    type: 'Full-time',
    qty: 2,
    deadline: '31/10/2026',
    salary: 'Negotiable',
    place: 'Da Nang Branch',
    summary: 'Conducting physical field surveys, measurements, and asset condition recording across Da Nang and Central Vietnam.',
    desc: [
      'Survey, photograph, and compile standardized on-site asset condition reports',
      'Gather local market transaction intelligence and planning parameters',
      'Transfer verified field data to reporting teams for valuation synthesis',
    ],
    req: [
      'College degree or higher in Economics, Construction, or Land Management',
      'Personal motorcycle and willingness to travel locally across the central region',
      'Meticulousness, high integrity, and objectivity in recording factual data',
    ],
    benefits: [
      'Monthly gasoline, vehicle, and mobile phone allowances',
      'Professional photography and on-site surveying technique training',
      'Clear career path to advance to Real Estate Valuation Specialist',
    ],
  },
  {
    id: 'ct-bds',
    region: 'ct',
    regionLabel: 'Can Tho',
    title: 'Real Estate Valuation Specialist',
    level: '1 – 3 years',
    dept: 'Can Tho Office',
    type: 'Full-time',
    qty: 1,
    deadline: '15/11/2026',
    salary: 'Negotiable',
    place: 'Can Tho Office',
    summary: 'Executing real estate appraisal dossiers across Can Tho and Mekong Delta provinces.',
    desc: [
      'Survey assets and collect local Mekong Delta real estate market transactions',
      'Draft standardized real estate appraisal reports',
      'Coordinate smoothly with regional commercial bank branches',
    ],
    req: [
      'University degree in Valuation, Economics, or Land Management',
      'From 1 year of real estate appraisal experience',
      'Familiarity with the Mekong Delta regional real estate market',
    ],
    benefits: [
      'Competitive compensation package in a collaborative working environment',
      'Annual holiday bonuses and company team retreats',
    ],
  },
]

const REGIONS = [
  { id: 'all', label: 'Tất cả địa bàn' },
  { id: 'hcm', label: 'TP. Hồ Chí Minh' },
  { id: 'hn', label: 'Hà Nội' },
  { id: 'dn', label: 'Đà Nẵng' },
  { id: 'ct', label: 'Cần Thơ' },
]

export default function CareersClient({ currentLocale = 'vi' }: { currentLocale?: string }) {
  const isEn = currentLocale === 'en'
  const [activeRegion, setActiveRegion] = useState('all')
  const [expandedId, setExpandedId] = useState<string | null>('hcm-bds')
  const [selectedJob, setSelectedJob] = useState('hcm-bds')

  const currentJobsData = isEn ? JOBS_DATA_EN : JOBS_DATA

  // Form states
  const [form, setForm] = useState({
    job: 'hcm-bds',
    fullName: '',
    birthYear: '',
    phone: '',
    email: '',
    experience: '',
    cardStatus: '',
    notes: '',
  })
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [ticketNo, setTicketNo] = useState('')
  const [appliedJobTitle, setAppliedJobTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const filteredJobs =
    activeRegion === 'all' ? currentJobsData : currentJobsData.filter((j) => j.region === activeRegion)

  const handleApplyClick = (job: JobItem) => {
    setSelectedJob(job.id)
    setForm((prev) => ({ ...prev, job: job.id }))
    const el = document.getElementById('nop-ho-so')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.fullName.trim() || !form.phone.trim() || !form.email.trim()) {
      setError(isEn ? 'Please fill in full name, phone number, and email.' : 'Vui lòng điền đầy đủ họ tên, số điện thoại và email.')
      return
    }

    setLoading(true)
    setError(null)

    const jobObj = currentJobsData.find((j) => j.id === form.job)
    const title = jobObj ? jobObj.title : (isEn ? 'Spontaneous Application' : 'Ứng tuyển tự do')

    try {
      const formData = new FormData()
      formData.append('fullName', form.fullName)
      formData.append('phone', form.phone)
      formData.append('email', form.email)
      formData.append('serviceType', 'recruitment')
      formData.append('dossierType', 'recruitment')
      formData.append(
        'message',
        `[${isEn ? 'Application' : 'Ứng tuyển'}: ${title}] - ${isEn ? 'Birth Year' : 'Năm sinh'}: ${form.birthYear || 'N/A'} - ${isEn ? 'Experience' : 'Kinh nghiệm'}: ${form.experience || 'N/A'} - ${isEn ? 'Valuer Card' : 'Thẻ TĐV'}: ${form.cardStatus || 'N/A'} - ${isEn ? 'Notes' : 'Giới thiệu'}: ${form.notes || (isEn ? 'None' : 'Không có')}`
      )
      if (cvFile) {
        formData.append('file', cvFile)
      }

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json().catch(() => ({}))

      if (res.ok && data.success) {
        setTicketNo(data.ticketNumber || '')
        setAppliedJobTitle(title)
        setSubmitted(true)
      } else {
        setError(data.error || data.message || (isEn ? 'An error occurred while submitting your dossier. Please try again.' : 'Có lỗi xảy ra khi nộp hồ sơ. Vui lòng thử lại.'))
      }
    } catch (err: any) {
      setError(isEn ? 'Server connection error. Please try again later.' : 'Lỗi kết nối máy chủ. Vui lòng thử lại sau.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Job list Section */}
      <section id="vi-tri" style={{ background: '#fff', padding: 'clamp(4rem, 7vw, 6.5rem) 0' }}>
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            padding: '0 clamp(1rem, 4vw, 2.5rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(2rem, 4vw, 4rem)',
            alignItems: 'start',
          }}
        >
          {/* Sidebar Filters */}
          <aside style={{ position: 'sticky', top: 96, display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
            <div>
              <span
                style={{
                  display: 'block',
                  fontSize: '.74rem',
                  fontWeight: 700,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  color: 'var(--c-accent, #d94f0a)',
                  marginBottom: '.8rem',
                }}
              >
                {isEn ? 'Open Positions' : 'Vị trí đang tuyển'}
              </span>
              <h2
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontWeight: 600,
                  fontSize: 'clamp(1.6rem, 1.2rem + 1vw, 2.1rem)',
                  lineHeight: 1.28,
                  letterSpacing: '-.012em',
                }}
              >
                {isEn ? 'Select Work Location' : 'Chọn nơi làm việc'}
              </h2>
            </div>

            <div role="tablist" style={{ display: 'flex', flexDirection: 'column', gap: '.45rem' }}>
              {[
                { id: 'all', label: isEn ? 'All Locations' : 'Tất cả địa bàn' },
                { id: 'hcm', label: isEn ? 'Ho Chi Minh City' : 'TP. Hồ Chí Minh' },
                { id: 'hn', label: isEn ? 'Hanoi' : 'Hà Nội' },
                { id: 'dn', label: isEn ? 'Da Nang' : 'Đà Nẵng' },
                { id: 'ct', label: isEn ? 'Can Tho' : 'Cần Thơ' },
              ].map((r) => {
                const count =
                  r.id === 'all' ? currentJobsData.length : currentJobsData.filter((j) => j.region === r.id).length
                const isSelected = activeRegion === r.id
                return (
                  <button
                    key={r.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveRegion(r.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '.9rem',
                      padding: '.7rem 1rem',
                      borderRadius: 8,
                      fontSize: '.88rem',
                      fontWeight: 700,
                      textAlign: 'left',
                      border: isSelected ? '1px solid var(--c-accent, #d94f0a)' : '1px solid var(--c-border, #e2e0da)',
                      background: isSelected ? 'var(--c-ink, #16181c)' : '#fff',
                      color: isSelected ? '#fff' : 'var(--c-ink, #16181c)',
                      cursor: 'pointer',
                      transition: 'all .2s ease',
                    }}
                  >
                    <span>{r.label}</span>
                    <span
                      style={{
                        minWidth: 26,
                        padding: '.1rem .45rem',
                        borderRadius: 999,
                        fontSize: '.74rem',
                        textAlign: 'center',
                        background: isSelected ? 'rgba(255,255,255,.2)' : 'var(--c-page, #f6f5f2)',
                        color: isSelected ? '#fff' : 'var(--c-muted, #5f656d)',
                      }}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Free application card */}
            <div
              style={{
                padding: '1.4rem',
                borderRadius: 12,
                background: 'var(--c-page, #f6f5f2)',
                border: '1px solid var(--c-border, #e2e0da)',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '.98rem', marginBottom: '.35rem' }}>
                {isEn ? "Don't see a matching position?" : 'Chưa thấy vị trí phù hợp?'}
              </div>
              <p style={{ fontSize: '.84rem', color: 'var(--c-muted, #5f656d)', marginBottom: '1rem', lineHeight: 1.55 }}>
                {isEn
                  ? 'Submit a spontaneous application. MHD always welcomes talent and keeps qualifying profiles on file to reach out when opportunities arise.'
                  : 'Gửi hồ sơ ứng tuyển tự do. MHD luôn chào đón nhân tài và lưu hồ sơ để liên hệ khi có cơ hội phù hợp.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedJob('free')
                  setForm((prev) => ({ ...prev, job: 'free' }))
                  const el = document.getElementById('nop-ho-so')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.45rem',
                  fontSize: '.86rem',
                  fontWeight: 700,
                  color: 'var(--c-accent, #d94f0a)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {isEn ? 'Spontaneous Application' : 'Ứng tuyển tự do'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
              <a
                href="mailto:tuyendung@mhd.com.vn"
                style={{
                  display: 'block',
                  marginTop: '1rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--c-border, #e2e0da)',
                  fontSize: '.84rem',
                  fontWeight: 600,
                  color: 'var(--c-ink, #16181c)',
                }}
              >
                tuyendung@mhd.com.vn
              </a>
            </div>
          </aside>

          {/* Jobs List Accordion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', minWidth: 0 }}>
            {filteredJobs.map((job) => {
              const isExpanded = expandedId === job.id
              return (
                <article
                  key={job.id}
                  style={{
                    border: '1px solid var(--c-border, #e2e0da)',
                    borderRadius: 12,
                    background: '#fff',
                    overflow: 'hidden',
                    boxShadow: isExpanded ? '0 12px 30px rgba(22,24,28,.06)' : 'none',
                    transition: 'all .25s ease',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : job.id)}
                    aria-expanded={isExpanded}
                    style={{
                      width: '100%',
                      display: 'grid',
                      gridTemplateColumns: 'minmax(0, 1fr) auto',
                      gap: '1rem',
                      alignItems: 'center',
                      padding: '1.2rem 1.4rem',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ minWidth: 0 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '.6rem', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 700, fontSize: '1.08rem', color: 'var(--c-ink, #16181c)' }}>
                          {job.title}
                        </span>
                        <span
                          style={{
                            fontSize: '.72rem',
                            fontWeight: 700,
                            padding: '.18rem .55rem',
                            borderRadius: 999,
                            background: 'var(--c-page, #f6f5f2)',
                            border: '1px solid var(--c-border, #e2e0da)',
                            color: 'var(--c-accent, #d94f0a)',
                          }}
                        >
                          {job.level}
                        </span>
                      </span>
                      <span
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '.35rem 1.1rem',
                          marginTop: '.5rem',
                          fontSize: '.82rem',
                          color: 'var(--c-muted, #5f656d)',
                        }}
                      >
                        <span>{job.dept}</span>
                        <span>•</span>
                        <span>{job.type}</span>
                        <span>•</span>
                        <span>{job.regionLabel}</span>
                        <span>•</span>
                        <span>{isEn ? 'Deadline:' : 'Hạn nộp:'} {job.deadline}</span>
                      </span>
                    </span>
                    <span
                      style={{
                        width: 34,
                        height: 34,
                        flexShrink: 0,
                        borderRadius: '50%',
                        border: '1px solid var(--c-border, #e2e0da)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: isExpanded ? 'rotate(180deg)' : 'none',
                        transition: 'transform .3s ease',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>

                  {/* Expanded Body */}
                  {isExpanded && (
                    <div style={{ margin: '0 1.4rem', padding: '1.2rem 0 1.5rem', borderTop: '1px solid var(--c-border, #e2e0da)' }}>
                      <p style={{ fontSize: '.94rem', color: 'var(--c-muted, #5f656d)', marginBottom: '1.4rem', lineHeight: 1.6 }}>
                        {job.summary}
                      </p>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                          gap: '1.4rem 2rem',
                        }}
                      >
                        {/* Desc */}
                        <div>
                          <span style={{ display: 'block', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--c-faint, #8a8f96)', marginBottom: '.8rem' }}>
                            {isEn ? 'Job Responsibilities' : 'Mô tả công việc'}
                          </span>
                          <ul style={{ display: 'flex', flexDirection: 'column', gap: '.55rem', fontSize: '.88rem', color: 'var(--c-ink, #16181c)' }}>
                            {job.desc.map((it, idx) => (
                              <li key={idx} style={{ display: 'flex', gap: '.6rem', alignItems: 'flex-start' }}>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d94f0a" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 3 }}>
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>{it}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Req */}
                        <div>
                          <span style={{ display: 'block', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--c-faint, #8a8f96)', marginBottom: '.8rem' }}>
                            {isEn ? 'Requirements' : 'Yêu cầu'}
                          </span>
                          <ul style={{ display: 'flex', flexDirection: 'column', gap: '.55rem', fontSize: '.88rem', color: 'var(--c-ink, #16181c)' }}>
                            {job.req.map((it, idx) => (
                              <li key={idx} style={{ display: 'flex', gap: '.6rem', alignItems: 'flex-start' }}>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d94f0a" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 3 }}>
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>{it}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Benefits */}
                        <div>
                          <span style={{ display: 'block', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--c-faint, #8a8f96)', marginBottom: '.8rem' }}>
                            {isEn ? 'Benefits' : 'Quyền lợi'}
                          </span>
                          <ul style={{ display: 'flex', flexDirection: 'column', gap: '.55rem', fontSize: '.88rem', color: 'var(--c-ink, #16181c)' }}>
                            {job.benefits.map((it, idx) => (
                              <li key={idx} style={{ display: 'flex', gap: '.6rem', alignItems: 'flex-start' }}>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d94f0a" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 3 }}>
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>{it}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '1rem',
                          flexWrap: 'wrap',
                          marginTop: '1.6rem',
                          padding: '1rem 1.2rem',
                          borderRadius: 10,
                          background: 'var(--c-page, #f6f5f2)',
                          border: '1px solid var(--c-border, #e2e0da)',
                        }}
                      >
                        <span style={{ display: 'flex', flexWrap: 'wrap', gap: '.3rem 1.6rem', fontSize: '.84rem', color: 'var(--c-muted, #5f656d)' }}>
                          <span>
                            {isEn ? 'Salary:' : 'Thu nhập:'}{' '}
                            <strong style={{ color: 'var(--c-ink, #16181c)' }}>{isEn && job.salary === 'Thỏa thuận' ? 'Negotiable' : job.salary}</strong>
                          </span>
                          <span>
                            {isEn ? 'Location:' : 'Nơi làm việc:'}{' '}
                            <strong style={{ color: 'var(--c-ink, #16181c)' }}>{job.place}</strong>
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleApplyClick(job)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '.5rem',
                            background: 'var(--c-ink, #16181c)',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '.86rem',
                            padding: '.75rem 1.2rem',
                            borderRadius: 6,
                            border: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          {isEn ? 'Apply for this position' : 'Ứng tuyển vị trí này'}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Online Application Form Section */}
      <section
        id="nop-ho-so"
        style={{
          scrollMarginTop: 80,
          background: 'var(--c-page, #f6f5f2)',
          borderTop: '1px solid var(--c-border, #e2e0da)',
          padding: 'clamp(4.5rem, 8vw, 7.5rem) 0',
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            padding: '0 clamp(1rem, 4vw, 2.5rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
            gap: 'clamp(2.5rem, 5vw, 5rem)',
            alignItems: 'start',
          }}
        >
          {/* Steps list */}
          <div>
            <span
              style={{
                display: 'block',
                fontSize: '.74rem',
                fontWeight: 700,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: 'var(--c-accent, #d94f0a)',
                marginBottom: '.8rem',
              }}
            >
              {isEn ? 'Application' : 'Nộp hồ sơ'}
            </span>
            <h2
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(1.8rem, 1.3rem + 1.3vw, 2.5rem)',
                lineHeight: 1.28,
                letterSpacing: '-.012em',
              }}
            >
              {isEn ? 'Apply Online' : 'Ứng tuyển trực tuyến'}
            </h2>
            <p style={{ fontSize: '.98rem', color: 'var(--c-muted, #5f656d)', margin: '1rem 0 2.2rem', maxWidth: '46ch', lineHeight: 1.6 }}>
              {isEn
                ? 'Fill in your details and resume. Human Resources will respond via email within 7 business days if your profile is shortlisted.'
                : 'Điền thông tin và đính kèm CV. Bộ phận Nhân sự phản hồi qua email trong 7 ngày làm việc nếu hồ sơ phù hợp.'}
            </p>
            <ol
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                borderLeft: '1px solid var(--c-border, #e2e0da)',
                marginLeft: 18,
              }}
            >
              <li style={{ position: 'relative', padding: '0 0 1.6rem 2rem' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: -18,
                    top: -2,
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'var(--c-accent, #d94f0a)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '.82rem',
                    fontWeight: 700,
                  }}
                >
                  1
                </span>
                <span style={{ display: 'block', fontWeight: 700, fontSize: '1rem', marginBottom: '.25rem' }}>
                  {isEn ? 'Resume Screening' : 'Sàng lọc hồ sơ'}
                </span>
                <span style={{ display: 'block', fontSize: '.88rem', color: 'var(--c-muted, #5f656d)' }}>
                  {isEn ? 'HR and department heads review CV against role requirements.' : 'Nhân sự và trưởng bộ phận xem xét CV theo yêu cầu vị trí.'}
                </span>
              </li>
              <li style={{ position: 'relative', padding: '0 0 1.6rem 2rem' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: -18,
                    top: -2,
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: '#fff',
                    color: 'var(--c-ink, #16181c)',
                    border: '1px solid var(--c-border, #e2e0da)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '.82rem',
                    fontWeight: 700,
                  }}
                >
                  2
                </span>
                <span style={{ display: 'block', fontWeight: 700, fontSize: '1rem', marginBottom: '.25rem' }}>
                  {isEn ? 'Technical Interview' : 'Phỏng vấn chuyên môn'}
                </span>
                <span style={{ display: 'block', fontSize: '.88rem', color: 'var(--c-muted, #5f656d)' }}>
                  {isEn ? 'Technical discussion with lead practicing valuers; case study for senior roles.' : 'Trao đổi với thẩm định viên phụ trách; một số vị trí có bài kiểm tra nghiệp vụ.'}
                </span>
              </li>
              <li style={{ position: 'relative', padding: '0 0 1.6rem 2rem' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: -18,
                    top: -2,
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: '#fff',
                    color: 'var(--c-ink, #16181c)',
                    border: '1px solid var(--c-border, #e2e0da)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '.82rem',
                    fontWeight: 700,
                  }}
                >
                  3
                </span>
                <span style={{ display: 'block', fontWeight: 700, fontSize: '1rem', marginBottom: '.25rem' }}>
                  {isEn ? 'Offer of Employment' : 'Thư mời nhận việc'}
                </span>
                <span style={{ display: 'block', fontSize: '.88rem', color: 'var(--c-muted, #5f656d)' }}>
                  {isEn ? 'MHD issues formal offer letter, aligning on compensation package and onboarding date.' : 'MHD gửi thư mời, thống nhất thu nhập và ngày bắt đầu công việc.'}
                </span>
              </li>
            </ol>
          </div>

          {/* Form Card */}
          <div
            style={{
              background: '#fff',
              border: '1px solid var(--c-border, #e2e0da)',
              borderRadius: 16,
              padding: 'clamp(1.5rem, 3vw, 2.4rem)',
              boxShadow: '0 30px 60px rgba(22,24,28,.07)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: 'linear-gradient(90deg, var(--c-accent, #d94f0a), var(--c-gold, #7d7d7d))',
              }}
            />

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    margin: '0 auto 1.4rem',
                    borderRadius: '50%',
                    background: 'rgba(31,122,77,.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#1f7a4d',
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '.6rem' }}>
                  {isEn ? 'Application Received' : 'Đã nhận hồ sơ ứng tuyển'}
                </h3>
                <p style={{ fontSize: '.92rem', color: 'var(--c-muted, #5f656d)', marginBottom: '.6rem' }}>
                  {isEn ? 'Applied position:' : 'Vị trí:'} <strong style={{ color: 'var(--c-ink, #16181c)' }}>{appliedJobTitle}</strong>
                </p>
                <p style={{ fontSize: '.92rem', color: 'var(--c-muted, #5f656d)', marginBottom: '1.2rem' }}>
                  {isEn
                    ? 'Human Resources will contact qualified applicants via email within 7 working days.'
                    : 'Bộ phận Nhân sự sẽ phản hồi qua email trong 7 ngày làm việc nếu hồ sơ phù hợp.'}
                </p>
                <div
                  style={{
                    display: 'inline-flex',
                    gap: '.5rem',
                    alignItems: 'center',
                    padding: '.55rem 1rem',
                    borderRadius: 999,
                    background: 'var(--c-page, #f6f5f2)',
                    border: '1px solid var(--c-border, #e2e0da)',
                    fontSize: '.82rem',
                    color: 'var(--c-muted, #5f656d)',
                    marginBottom: '1.6rem',
                  }}
                >
                  {isEn ? 'Application ID' : 'Mã hồ sơ'} <strong style={{ color: 'var(--c-ink, #16181c)' }}>{ticketNo}</strong>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setCvFile(null)
                      setForm({
                        job: 'hcm-bds',
                        fullName: '',
                        birthYear: '',
                        phone: '',
                        email: '',
                        experience: '',
                        cardStatus: '',
                        notes: '',
                      })
                    }}
                    style={{
                      fontSize: '.86rem',
                      fontWeight: 700,
                      color: 'var(--c-accent, #d94f0a)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {isEn ? 'Submit another application' : 'Nộp hồ sơ khác'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <label style={{ display: 'block' }}>
                  <span style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-ink, #16181c)', marginBottom: '.4rem' }}>
                    {isEn ? 'Position Applied' : 'Vị trí ứng tuyển'} <span style={{ color: 'var(--c-accent, #d94f0a)' }}>*</span>
                  </span>
                  <select
                    name="job"
                    value={form.job}
                    onChange={(e) => setForm({ ...form, job: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '.8rem .95rem',
                      border: '1px solid var(--c-border, #e2e0da)',
                      borderRadius: 8,
                      background: '#fff',
                      font: 'inherit',
                      fontSize: '.92rem',
                      color: 'var(--c-ink, #16181c)',
                      outline: 'none',
                    }}
                  >
                    {currentJobsData.map((j) => (
                      <option key={j.id} value={j.id}>
                        {j.title} — {j.regionLabel}
                      </option>
                    ))}
                    <option value="free">
                      {isEn ? 'Spontaneous Application (Open position)' : 'Ứng tuyển tự do (Chưa có vị trí cụ thể)'}
                    </option>
                  </select>
                </label>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1rem' }}>
                  <label style={{ display: 'block' }}>
                    <span style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-ink, #16181c)', marginBottom: '.4rem' }}>
                      {isEn ? 'Full Name' : 'Họ và tên'} <span style={{ color: 'var(--c-accent, #d94f0a)' }}>*</span>
                    </span>
                    <input
                      type="text"
                      required
                      placeholder={isEn ? 'John Doe' : 'Nguyễn Văn A'}
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '.8rem .95rem',
                        border: '1px solid var(--c-border, #e2e0da)',
                        borderRadius: 8,
                        background: '#fff',
                        font: 'inherit',
                        fontSize: '.92rem',
                        outline: 'none',
                      }}
                    />
                  </label>
                  <label style={{ display: 'block' }}>
                    <span style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-ink, #16181c)', marginBottom: '.4rem' }}>
                      {isEn ? 'Birth Year' : 'Năm sinh'}
                    </span>
                    <input
                      type="text"
                      placeholder="1998"
                      value={form.birthYear}
                      onChange={(e) => setForm({ ...form, birthYear: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '.8rem .95rem',
                        border: '1px solid var(--c-border, #e2e0da)',
                        borderRadius: 8,
                        background: '#fff',
                        font: 'inherit',
                        fontSize: '.92rem',
                        outline: 'none',
                      }}
                    />
                  </label>
                  <label style={{ display: 'block' }}>
                    <span style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-ink, #16181c)', marginBottom: '.4rem' }}>
                      {isEn ? 'Phone' : 'Điện thoại'} <span style={{ color: 'var(--c-accent, #d94f0a)' }}>*</span>
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="09xx xxx xxx"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '.8rem .95rem',
                        border: '1px solid var(--c-border, #e2e0da)',
                        borderRadius: 8,
                        background: '#fff',
                        font: 'inherit',
                        fontSize: '.92rem',
                        outline: 'none',
                      }}
                    />
                  </label>
                  <label style={{ display: 'block' }}>
                    <span style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-ink, #16181c)', marginBottom: '.4rem' }}>
                      Email <span style={{ color: 'var(--c-accent, #d94f0a)' }}>*</span>
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="name@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '.8rem .95rem',
                        border: '1px solid var(--c-border, #e2e0da)',
                        borderRadius: 8,
                        background: '#fff',
                        font: 'inherit',
                        fontSize: '.92rem',
                        outline: 'none',
                      }}
                    />
                  </label>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1rem' }}>
                  <label style={{ display: 'block' }}>
                    <span style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-ink, #16181c)', marginBottom: '.4rem' }}>
                      {isEn ? 'Valuation Experience' : 'Kinh nghiệm thẩm định giá'}
                    </span>
                    <select
                      value={form.experience}
                      onChange={(e) => setForm({ ...form, experience: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '.8rem .95rem',
                        border: '1px solid var(--c-border, #e2e0da)',
                        borderRadius: 8,
                        background: '#fff',
                        font: 'inherit',
                        fontSize: '.92rem',
                        outline: 'none',
                      }}
                    >
                      <option value="">{isEn ? 'Select' : 'Chọn'}</option>
                      <option value="Chưa có kinh nghiệm">{isEn ? 'No experience' : 'Chưa có kinh nghiệm'}</option>
                      <option value="Dưới 1 năm">{isEn ? 'Under 1 year' : 'Dưới 1 năm'}</option>
                      <option value="1 – 3 năm">{isEn ? '1 – 3 years' : '1 – 3 năm'}</option>
                      <option value="3 – 5 năm">{isEn ? '3 – 5 years' : '3 – 5 năm'}</option>
                      <option value="Trên 5 năm">{isEn ? 'Over 5 years' : 'Trên 5 năm'}</option>
                    </select>
                  </label>
                  <label style={{ display: 'block' }}>
                    <span style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-ink, #16181c)', marginBottom: '.4rem' }}>
                      {isEn ? 'MOF Valuer Card' : 'Thẻ thẩm định viên về giá'}
                    </span>
                    <select
                      value={form.cardStatus}
                      onChange={(e) => setForm({ ...form, cardStatus: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '.8rem .95rem',
                        border: '1px solid var(--c-border, #e2e0da)',
                        borderRadius: 8,
                        background: '#fff',
                        font: 'inherit',
                        fontSize: '.92rem',
                        outline: 'none',
                      }}
                    >
                      <option value="">{isEn ? 'Select' : 'Chọn'}</option>
                      <option value="Chưa có">{isEn ? 'Not certified yet' : 'Chưa có'}</option>
                      <option value="Đang ôn thi">{isEn ? 'Preparing / partially completed' : 'Đang ôn thi / đã đạt 1 phần'}</option>
                      <option value="Đã có thẻ">{isEn ? 'MOF certified cardholder' : 'Đã có thẻ Bộ Tài chính'}</option>
                    </select>
                  </label>
                </div>

                <label style={{ display: 'block' }}>
                  <span style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-ink, #16181c)', marginBottom: '.4rem' }}>
                    {isEn ? 'Brief Self-Introduction' : 'Giới thiệu ngắn'}
                  </span>
                  <textarea
                    rows={3}
                    placeholder={
                      isEn
                        ? 'Highlights, types of appraised assets, available start date…'
                        : 'Kinh nghiệm nổi bật, loại tài sản đã thẩm định, thời gian có thể bắt đầu…'
                    }
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '.8rem .95rem',
                      border: '1px solid var(--c-border, #e2e0da)',
                      borderRadius: 8,
                      background: '#fff',
                      font: 'inherit',
                      fontSize: '.92rem',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </label>

                {/* CV Attachment Field */}
                <div>
                  <span style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-ink, #16181c)', marginBottom: '.4rem' }}>
                    {isEn ? 'Curriculum Vitae (CV)' : 'Đính kèm hồ sơ lý lịch / CV'}
                    <span style={{ fontSize: '.78rem', fontWeight: 400, color: 'var(--c-muted,#5f656d)', marginLeft: '.4rem' }}>
                      ({isEn ? 'PDF, Word up to 25MB' : 'PDF, Word tối đa 25MB'})
                    </span>
                  </span>

                  {cvFile ? (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '.75rem 1rem',
                        borderRadius: 8,
                        background: 'var(--c-page, #f6f5f2)',
                        border: '1px solid var(--c-border, #e2e0da)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.65rem', overflow: 'hidden' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent, #d94f0a)" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                        <div style={{ minWidth: 0 }}>
                          <p style={{ margin: 0, fontSize: '.88rem', fontWeight: 600, color: 'var(--c-ink, #16181c)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {cvFile.name}
                          </p>
                          <span style={{ fontSize: '.75rem', color: 'var(--c-muted, #5f656d)' }}>
                            {cvFile.size < 1024 * 1024 ? (cvFile.size / 1024).toFixed(1) + ' KB' : (cvFile.size / (1024 * 1024)).toFixed(1) + ' MB'}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCvFile(null)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#c0392b',
                          cursor: 'pointer',
                          padding: '.3rem .5rem',
                          fontSize: '.82rem',
                          fontWeight: 600,
                        }}
                      >
                        {isEn ? 'Remove' : 'Xoá'}
                      </button>
                    </div>
                  ) : (
                    <label
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1.2rem 1rem',
                        border: '1.5px dashed var(--c-border, #e2e0da)',
                        borderRadius: 8,
                        cursor: 'pointer',
                        background: '#fafaf9',
                        transition: 'border-color .2s, background .2s',
                        textAlign: 'center',
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault()
                        if (e.dataTransfer.files?.[0]) {
                          setCvFile(e.dataTransfer.files[0])
                        }
                      }}
                    >
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setCvFile(e.target.files[0])
                          }
                        }}
                      />
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--c-muted, #5f656d)" strokeWidth="2" style={{ marginBottom: '.4rem' }}>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <span style={{ fontSize: '.86rem', fontWeight: 600, color: 'var(--c-ink, #16181c)' }}>
                        {isEn ? 'Click or drag file to attach CV' : 'Nhấp hoặc kéo thả để tải lên CV của bạn'}
                      </span>
                      <span style={{ fontSize: '.76rem', color: 'var(--c-muted, #5f656d)', marginTop: '.2rem' }}>
                        {isEn ? 'PDF, DOCX, DOC (up to 25MB)' : 'PDF, DOCX, DOC (tối đa 25MB)'}
                      </span>
                    </label>
                  )}
                </div>

                {error && <div style={{ color: '#c0392b', fontSize: '.85rem', fontWeight: 600 }}>{error}</div>}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '.55rem',
                    background: 'var(--c-ink, #16181c)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '.95rem',
                    padding: '1rem 1.4rem',
                    borderRadius: 8,
                    border: 'none',
                    cursor: loading ? 'wait' : 'pointer',
                    marginTop: '.4rem',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  {loading
                    ? isEn ? 'Submitting Application…' : 'Đang gửi hồ sơ...'
                    : isEn ? 'Submit Application' : 'Nộp hồ sơ'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
