export interface InsightPost {
  slug: string
  cat: string
  img: string
  date: string
  author: string
  tags: string[]
  title: string
  excerpt: string
  readTime: string
  body: Array<['p' | 'h' | 'q' | 'l', string | string[]]>
}

export interface InsightCategory {
  id: string
  label: string
  desc: string
  mode: 'image' | 'text'
}

export const INSIGHT_CATEGORIES: InsightCategory[] = [
  { id: 'thi-truong', label: 'Tin thị trường', desc: 'Diễn biến giá theo khu vực', mode: 'image' },
  { id: 'kien-thuc', label: 'Kiến thức', desc: 'Phương pháp và nghiệp vụ thẩm định giá', mode: 'text' },
  { id: 'chinh-sach', label: 'Chính sách', desc: 'Văn bản pháp luật mới ban hành', mode: 'text' },
  { id: 'case-study', label: 'Case study', desc: 'Phân tích hồ sơ đã ẩn thông tin bảo mật', mode: 'image' },
  { id: 'bao-cao', label: 'Báo cáo', desc: 'Báo cáo thị trường định kỳ', mode: 'text' },
]

export const INSIGHT_CATEGORIES_EN: InsightCategory[] = [
  { id: 'thi-truong', label: 'Market News', desc: 'Price movements across key regions', mode: 'image' },
  { id: 'kien-thuc', label: 'Knowledge', desc: 'Methodologies & valuation standards', mode: 'text' },
  { id: 'chinh-sach', label: 'Policy & Legal', desc: 'Newly enacted statutory regulations', mode: 'text' },
  { id: 'case-study', label: 'Case Studies', desc: 'De-identified dossier analysis', mode: 'image' },
  { id: 'bao-cao', label: 'Market Reports', desc: 'Periodic market research publications', mode: 'text' },
]

export function getInsightCategories(locale: string = 'vi'): InsightCategory[] {
  return locale === 'en' ? INSIGHT_CATEGORIES_EN : INSIGHT_CATEGORIES
}

export const INSIGHT_POSTS: InsightPost[] = [
  {
    slug: 'bien-dong-gia-bds-trung-tam-q3',
    cat: 'thi-truong',
    img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    date: '05/09/2026',
    author: 'Phòng Nghiên cứu thị trường',
    tags: ['Bất động sản', 'TP.HCM'],
    title: 'Biến động giá bất động sản khu vực trung tâm TP.HCM quý 3',
    excerpt: 'Phân tích xu hướng giá nhà phố và căn hộ tại các phường trung tâm dựa trên dữ liệu thẩm định thực tế.',
    readTime: '4 phút đọc',
    body: [
      ['p', 'Trong quý 3/2026, mặt bằng giá chào bán nhà phố và căn hộ tại các phường trung tâm TP.HCM nhìn chung đi ngang. Thanh khoản tập trung ở nhóm tài sản có pháp lý hoàn chỉnh và vị trí thuận tiện khai thác.'],
      ['h', 'Nhà phố mặt tiền: giá chào cao, giao dịch thưa'],
      ['p', 'Tài sản mặt tiền các tuyến thương mại vẫn được chào bán ở mức cao. Chênh lệch giữa giá chào và giá giao dịch thành công ở nhóm này thường lớn, nên thẩm định viên cần điều chỉnh khi sử dụng làm tài sản so sánh.'],
      ['h', 'Căn hộ: phân hoá theo pháp lý'],
      ['p', 'Căn hộ đã có giấy chứng nhận giữ thanh khoản tốt hơn so với dự án đang chờ hoàn tất thủ tục. Yếu tố này cần được ghi nhận rõ khi lựa chọn và điều chỉnh tài sản so sánh.'],
      ['q', 'Giá chào bán chỉ là một nguồn thông tin. Kết quả thẩm định dựa trên giao dịch đã được kiểm chứng và điều chỉnh theo đặc điểm của tài sản.'],
      ['p', 'Nội dung trong bài được tổng hợp từ hồ sơ MHD thực hiện và nguồn thông tin công khai; thông tin khách hàng đã được ẩn theo nguyên tắc bảo mật.']
    ]
  },
  {
    slug: 'ba-phuong-phap-tdg-doanh-nghiep',
    cat: 'kien-thuc',
    img: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/2077fe3b06f028c4e065ba98ce099959f9f13806.jpg',
    date: '01/09/2026',
    author: 'Nhóm Thẩm định Doanh nghiệp',
    tags: ['Doanh nghiệp', 'Chuẩn mực thẩm định giá', 'M&A'],
    title: '3 cách tiếp cận phổ biến khi thẩm định giá trị doanh nghiệp',
    excerpt: 'Tiếp cận từ thị trường, từ thu nhập và từ chi phí: mỗi cách phù hợp với loại doanh nghiệp và mục đích khác nhau.',
    readTime: '5 phút đọc',
    body: [
      ['p', 'Giá trị doanh nghiệp không có một con số duy nhất đúng cho mọi mục đích. Tuỳ đặc điểm ngành, mức độ sẵn có của dữ liệu và mục đích thẩm định, thẩm định viên lựa chọn cách tiếp cận phù hợp.'],
      ['h', 'Cách tiếp cận từ thị trường'],
      ['p', 'So sánh doanh nghiệp cần thẩm định với các doanh nghiệp tương tự đã niêm yết hoặc đã giao dịch, thông qua các hệ số như P/E, EV/EBITDA, P/B. Phù hợp khi có đủ doanh nghiệp so sánh cùng ngành, cùng quy mô.'],
      ['h', 'Cách tiếp cận từ thu nhập'],
      ['p', 'Chiết khấu dòng tiền dự kiến về hiện tại. Kết quả phụ thuộc lớn vào kế hoạch kinh doanh và tỷ suất chiết khấu, nên các giả thiết cần được giải trình rõ trong báo cáo.'],
      ['h', 'Cách tiếp cận từ chi phí'],
      ['p', 'Xác định giá trị trên cơ sở giá trị các tài sản và nợ phải trả của doanh nghiệp. Thường áp dụng với doanh nghiệp nắm giữ nhiều tài sản hoặc hoạt động kinh doanh không ổn định.'],
      ['p', 'Trên thực tế, báo cáo thường sử dụng nhiều hơn một cách tiếp cận để đối chiếu và giải thích chênh lệch giữa các kết quả.']
    ]
  },
  {
    slug: 'cap-nhat-thong-tu-36-2024',
    cat: 'chinh-sach',
    img: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/64fd47e6ee64b69ba0dc9f8e8fa185a03992b0df.jpg',
    date: '28/08/2026',
    author: 'Ban Kiểm soát chất lượng',
    tags: ['Doanh nghiệp', 'Chuẩn mực thẩm định giá'],
    title: 'Cập nhật Thông tư 36/2024/TT-BTC về thẩm định giá doanh nghiệp',
    excerpt: 'Những điểm doanh nghiệp cần chuẩn bị khi thực hiện thẩm định giá theo chuẩn mực hiện hành.',
    readTime: '4 phút đọc',
    body: [
      ['p', 'Thông tư 36/2024/TT-BTC ban hành Chuẩn mực thẩm định giá Việt Nam về thẩm định giá doanh nghiệp, áp dụng cùng các chuẩn mực chung tại Thông tư 30/2024/TT-BTC và Thông tư 31/2024/TT-BTC.'],
      ['h', 'Hồ sơ doanh nghiệp nên chuẩn bị'],
      ['l', ['Báo cáo tài chính các năm gần nhất, ưu tiên bản đã kiểm toán', 'Kế hoạch kinh doanh làm cơ sở dự báo dòng tiền', 'Thông tin về quyền sử dụng đất, tài sản vô hình và các khoản đầu tư', 'Giải trình về nợ tiềm tàng và các cam kết ngoài bảng']],
      ['h', 'Ý nghĩa với người sử dụng kết quả'],
      ['p', 'Chuẩn mực yêu cầu báo cáo thể hiện rõ cơ sở giá trị, cách tiếp cận được lựa chọn và các giả thiết chính. Người sử dụng kết quả có thể đối chiếu và đánh giá mức độ phù hợp với mục đích của mình.'],
      ['p', 'Bài viết mang tính tham khảo. Khi áp dụng cho hồ sơ cụ thể, vui lòng đối chiếu văn bản gốc hoặc trao đổi với thẩm định viên phụ trách.']
    ]
  },
  {
    slug: 'luat-gia-2023-diem-moi',
    cat: 'chinh-sach',
    img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    date: '20/08/2026',
    author: 'Ban Kiểm soát chất lượng',
    tags: ['Luật Giá 2023', 'Chứng thư'],
    title: 'Luật Giá 2023: những điểm cần biết về hoạt động thẩm định giá',
    excerpt: 'Tóm lược các quy định về thẩm định viên, doanh nghiệp thẩm định giá và giá trị sử dụng của chứng thư.',
    readTime: '4 phút đọc',
    body: [
      ['p', 'Luật Giá số 16/2023/QH15 có hiệu lực từ ngày 01/7/2024, dành một chương riêng cho hoạt động thẩm định giá.'],
      ['h', 'Thẩm định viên và doanh nghiệp'],
      ['p', 'Luật quy định tiêu chuẩn thẩm định viên về giá, điều kiện đăng ký hành nghề và điều kiện kinh doanh dịch vụ thẩm định giá. Doanh nghiệp chỉ được phát hành chứng thư khi đáp ứng các điều kiện này.'],
      ['h', 'Báo cáo và chứng thư'],
      ['p', 'Kết quả thẩm định giá được thể hiện qua báo cáo và chứng thư, chỉ được sử dụng đúng mục đích, trong thời hạn hiệu lực ghi trên chứng thư.'],
      ['q', 'Chứng thư thẩm định giá là căn cứ tham khảo để các bên xem xét, quyết định — không thay thế quyết định của người sử dụng kết quả.']
    ]
  },
  {
    slug: 'gia-thue-dat-kcn-phia-nam',
    cat: 'thi-truong',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    date: '14/08/2026',
    author: 'Phòng Nghiên cứu thị trường',
    tags: ['Bất động sản', 'Khu công nghiệp'],
    title: 'Giá thuê đất khu công nghiệp phía Nam sau nửa đầu năm',
    excerpt: 'Nhu cầu thuê đất công nghiệp tiếp tục tập trung tại các khu có hạ tầng kết nối và quỹ đất sẵn sàng bàn giao.',
    readTime: '3 phút đọc',
    body: [
      ['p', 'Nửa đầu năm 2026, nhu cầu thuê đất khu công nghiệp tại khu vực phía Nam duy trì ổn định, tập trung vào các khu có hạ tầng giao thông kết nối cảng và quỹ đất sạch sẵn sàng bàn giao.'],
      ['h', 'Yếu tố ảnh hưởng đến giá thuê'],
      ['l', ['Khoảng cách tới cảng biển, sân bay và trục cao tốc', 'Thời hạn thuê còn lại và phương thức thanh toán', 'Mức độ hoàn thiện hạ tầng kỹ thuật trong khu']],
      ['p', 'Khi thẩm định giá quyền thuê đất trong khu công nghiệp, thời hạn thuê còn lại và điều khoản hợp đồng thuê là những yếu tố cần làm rõ đầu tiên.']
    ]
  },
  {
    slug: 'case-study-day-chuyen-thanh-ly',
    cat: 'case-study',
    img: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/2077fe3b06f028c4e065ba98ce099959f9f13806.jpg',
    date: '08/08/2026',
    author: 'Phòng Thẩm định Động sản',
    tags: ['Máy móc thiết bị', 'Doanh nghiệp'],
    title: 'Thẩm định giá dây chuyền sản xuất phục vụ thanh lý tài sản',
    excerpt: 'Một hồ sơ thẩm định giá dây chuyền đã qua sử dụng, khi thị trường thứ cấp có ít giao dịch so sánh.',
    readTime: '4 phút đọc',
    body: [
      ['p', 'Khách hàng là doanh nghiệp sản xuất cần xác định giá trị dây chuyền đã qua sử dụng để làm căn cứ thanh lý. Thông tin khách hàng đã được ẩn theo nguyên tắc bảo mật.'],
      ['h', 'Khó khăn'],
      ['p', 'Dây chuyền được lắp đặt đồng bộ, có một số thiết bị đã ngừng sản xuất. Giao dịch thứ cấp của tài sản tương tự trên thị trường rất ít.'],
      ['h', 'Cách thực hiện'],
      ['l', ['Khảo sát hiện trạng, ghi nhận thông số và tình trạng vận hành từng cụm thiết bị', 'Thu thập báo giá thiết bị mới tương đương làm cơ sở tính theo cách tiếp cận từ chi phí', 'Đối chiếu với các giao dịch thanh lý thiết bị cùng loại có thể kiểm chứng']],
      ['p', 'Báo cáo trình bày riêng giá trị theo từng cụm thiết bị, giúp khách hàng chủ động phương án thanh lý toàn bộ hoặc từng phần.']
    ]
  },
  {
    slug: 'bao-cao-can-ho-ha-noi-q2',
    cat: 'bao-cao',
    img: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/64fd47e6ee64b69ba0dc9f8e8fa185a03992b0df.jpg',
    date: '30/07/2026',
    author: 'Phòng Nghiên cứu thị trường',
    tags: ['Bất động sản', 'Hà Nội'],
    title: 'Báo cáo thị trường căn hộ Hà Nội quý 2/2026',
    excerpt: 'Tóm tắt nguồn cung, mức giá và thanh khoản căn hộ theo khu vực tại Hà Nội.',
    readTime: '4 phút đọc',
    body: [
      ['p', 'Báo cáo tổng hợp diễn biến thị trường căn hộ Hà Nội quý 2/2026 theo khu vực, phân khúc và tình trạng pháp lý của dự án.'],
      ['h', 'Nội dung chính'],
      ['l', ['Nguồn cung mới và nguồn cung thứ cấp theo khu vực', 'Mặt bằng giá chào bán và giá giao dịch ghi nhận', 'Thanh khoản theo phân khúc và tình trạng pháp lý']],
      ['p', 'Bản đầy đủ của báo cáo được gửi theo yêu cầu cho đối tác và khách hàng của MHD.']
    ]
  },
  {
    slug: 'ho-so-tham-dinh-gia-vay-von',
    cat: 'kien-thuc',
    img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    date: '22/07/2026',
    author: 'Phòng Thẩm định Bất động sản',
    tags: ['Vay vốn', 'Bất động sản', 'Chứng thư'],
    title: 'Hồ sơ cần chuẩn bị khi thẩm định giá tài sản thế chấp vay vốn',
    excerpt: 'Danh mục hồ sơ cơ bản giúp rút ngắn thời gian khảo sát và phát hành chứng thư.',
    readTime: '3 phút đọc',
    body: [
      ['p', 'Với mục đích vay vốn, chứng thư thẩm định giá là một trong các căn cứ để ngân hàng xem xét giá trị tài sản bảo đảm. Hồ sơ đầy đủ ngay từ đầu giúp rút ngắn thời gian thực hiện.'],
      ['h', 'Hồ sơ cơ bản với bất động sản'],
      ['l', ['Giấy chứng nhận quyền sử dụng đất, quyền sở hữu nhà ở và tài sản gắn liền với đất', 'Giấy phép xây dựng, bản vẽ hoàn công (nếu có)', 'Giấy tờ tuỳ thân của chủ tài sản', 'Thông tin về ngân hàng dự kiến vay và mục đích vay']],
      ['p', 'Tuỳ yêu cầu của từng ngân hàng, MHD sẽ gửi danh mục bổ sung sau khi tiếp nhận thông tin tài sản.']
    ]
  },
  {
    slug: 'case-study-thuong-hieu-gop-von',
    cat: 'case-study',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    date: '15/07/2026',
    author: 'Nhóm Thẩm định Doanh nghiệp',
    tags: ['Tài sản vô hình', 'Doanh nghiệp', 'M&A'],
    title: 'Xác định giá trị thương hiệu phục vụ góp vốn liên doanh',
    excerpt: 'Cách tách dòng thu nhập do thương hiệu tạo ra khi hai bên góp vốn thành lập doanh nghiệp mới.',
    readTime: '4 phút đọc',
    body: [
      ['p', 'Hai doanh nghiệp thành lập liên doanh, trong đó một bên góp vốn bằng quyền sử dụng thương hiệu. Các bên cần một giá trị được xác định độc lập làm cơ sở đàm phán tỷ lệ góp vốn.'],
      ['h', 'Cách tiếp cận'],
      ['p', 'Nhóm thẩm định sử dụng cách tiếp cận từ thu nhập, ước tính khoản tiết kiệm phí bản quyền mà liên doanh có được khi sở hữu quyền sử dụng thương hiệu, đối chiếu với mức phí bản quyền trong các thoả thuận tương tự.'],
      ['q', 'Điểm then chốt là tách được phần thu nhập do thương hiệu tạo ra khỏi phần do hệ thống phân phối và năng lực sản xuất mang lại.'],
      ['p', 'Báo cáo trình bày rõ các giả thiết để cả hai bên cùng xem xét trước khi ký thoả thuận góp vốn.']
    ]
  },
  {
    slug: 'doi-chieu-chung-thu-qr',
    cat: 'kien-thuc',
    img: 'https://images.unsplash.com/photo-1595079672139-545c0ecac32a?auto=format&fit=crop&w=1200&q=80',
    date: '08/07/2026',
    author: 'MHD',
    tags: ['Chứng thư'],
    title: 'Cách đối chiếu thông tin chứng thư thẩm định giá bằng mã QR',
    excerpt: 'Ba bước kiểm tra thông tin phát hành của chứng thư MHD trên hệ thống tra cứu.',
    readTime: '3 phút đọc',
    body: [
      ['p', 'Mỗi chứng thư MHD phát hành có mã QR và số chứng thư để người sử dụng đối chiếu thông tin phát hành.'],
      ['h', 'Các bước đối chiếu'],
      ['l', ['Quét mã QR in trên chứng thư bằng camera điện thoại, hoặc truy cập trang tra cứu', 'Nhập số chứng thư nếu không quét được mã', 'So khớp số chứng thư, ngày phát hành, tên tài sản và thẩm định viên với bản giấy']],
      ['p', 'Kết quả tra cứu chỉ dùng để đối chiếu, không thay thế bản chứng thư và báo cáo thẩm định giá.']
    ]
  },
  {
    slug: 'bao-cao-dat-nen-tphcm-6-thang',
    cat: 'bao-cao',
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    date: '01/07/2026',
    author: 'Phòng Nghiên cứu thị trường',
    tags: ['Bất động sản', 'TP.HCM'],
    title: 'Báo cáo giá đất nền TP.HCM và vùng ven 6 tháng đầu năm 2026',
    excerpt: 'Diễn biến giá đất nền theo khu vực và các yếu tố cần lưu ý khi sử dụng làm tài sản so sánh.',
    readTime: '4 phút đọc',
    body: [
      ['p', 'Báo cáo tổng hợp diễn biến giá đất nền tại TP.HCM và các khu vực vùng ven trong 6 tháng đầu năm 2026.'],
      ['h', 'Nội dung chính'],
      ['l', ['Mặt bằng giá theo khu vực và loại đường', 'Ảnh hưởng của hạ tầng giao thông đang triển khai', 'Lưu ý về pháp lý khi sử dụng giao dịch đất nền làm tài sản so sánh']],
      ['p', 'Bản đầy đủ của báo cáo được gửi theo yêu cầu cho đối tác và khách hàng của MHD.']
    ]
  },
  {
    slug: 'co-so-gia-tri-thi-truong',
    cat: 'kien-thuc',
    img: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/64fd47e6ee64b69ba0dc9f8e8fa185a03992b0df.jpg',
    date: '24/06/2026',
    author: 'Ban Kiểm soát chất lượng',
    tags: ['Chuẩn mực thẩm định giá'],
    title: 'Cơ sở giá trị thị trường và phi thị trường: khi nào áp dụng?',
    excerpt: 'Lựa chọn cơ sở giá trị phù hợp với mục đích thẩm định là bước đầu tiên của mọi hồ sơ.',
    readTime: '3 phút đọc',
    body: [
      ['p', 'Cơ sở giá trị là một trong các chuẩn mực chung được ban hành tại Thông tư 30/2024/TT-BTC. Việc lựa chọn cơ sở giá trị phụ thuộc vào mục đích thẩm định giá.'],
      ['h', 'Giá trị thị trường'],
      ['p', 'Áp dụng khi kết quả phản ánh mức giá có thể giao dịch giữa người mua và người bán tự nguyện, trong điều kiện thương mại bình thường. Phần lớn hồ sơ vay vốn, mua bán sử dụng cơ sở này.'],
      ['h', 'Giá trị phi thị trường'],
      ['p', 'Áp dụng khi mục đích hoặc điều kiện giao dịch khác thông thường, ví dụ tài sản chuyên dùng, bán thanh lý hoặc giá trị đối với một người sử dụng cụ thể.'],
      ['p', 'Cơ sở giá trị được ghi rõ trên báo cáo và chứng thư, giúp người sử dụng hiểu đúng phạm vi của kết quả.']
    ]
  },
  {
    slug: 'thong-tu-30-2024-chuan-muc-chung',
    cat: 'chinh-sach',
    img: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/64fd47e6ee64b69ba0dc9f8e8fa185a03992b0df.jpg',
    date: '12/06/2026',
    author: 'Ban Kiểm soát chất lượng',
    tags: ['Chuẩn mực thẩm định giá'],
    title: 'Thông tư 30/2024/TT-BTC: các chuẩn mực chung trong thẩm định giá',
    excerpt: 'Tóm lược nhóm chuẩn mực chung áp dụng cho mọi hồ sơ thẩm định giá.',
    readTime: '4 phút đọc',
    body: [
      ['p', 'Thông tư 30/2024/TT-BTC ban hành các chuẩn mực thẩm định giá Việt Nam áp dụng chung cho mọi loại tài sản.'],
      ['h', 'Nội dung chính'],
      ['l', ['Quy tắc đạo đức nghề nghiệp thẩm định giá', 'Phạm vi công việc thẩm định giá', 'Cơ sở giá trị thẩm định giá', 'Hồ sơ thẩm định giá']],
      ['p', 'Các chuẩn mực này là nền tảng để áp dụng chuẩn mực về cách tiếp cận tại Thông tư 31/2024/TT-BTC và chuẩn mực chuyên ngành như Thông tư 36/2024/TT-BTC.'],
      ['p', 'Bài viết mang tính tham khảo; vui lòng đối chiếu văn bản gốc khi áp dụng.']
    ]
  },
  {
    slug: 'hieu-luc-chung-thu-tham-dinh-gia',
    cat: 'chinh-sach',
    img: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    date: '03/06/2026',
    author: 'Ban Kiểm soát chất lượng',
    tags: ['Chứng thư', 'Luật Giá 2023'],
    title: 'Thời hạn hiệu lực của chứng thư thẩm định giá: những điểm cần lưu ý',
    excerpt: 'Chứng thư chỉ sử dụng đúng mục đích và trong thời hạn hiệu lực được ghi trên chứng thư.',
    readTime: '3 phút đọc',
    body: [
      ['p', 'Thời hạn hiệu lực của kết quả thẩm định giá được ghi rõ trên chứng thư, xác định trên cơ sở mục đích thẩm định, đặc điểm tài sản và biến động thị trường.'],
      ['h', 'Khi nào cần thẩm định lại'],
      ['l', ['Chứng thư đã hết thời hạn hiệu lực', 'Mục đích sử dụng kết quả thay đổi so với hợp đồng ban đầu', 'Tài sản có thay đổi đáng kể về hiện trạng hoặc pháp lý']],
      ['p', 'Nếu chưa chắc chắn, hãy liên hệ thẩm định viên phụ trách để được xác nhận trước khi nộp hồ sơ cho bên thứ ba.']
    ]
  },
  {
    slug: 'bao-cao-mat-bang-ban-le-tphcm-q2',
    cat: 'bao-cao',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    date: '18/07/2026',
    author: 'Phòng Nghiên cứu thị trường',
    tags: ['Bất động sản', 'TP.HCM'],
    title: 'Báo cáo thị trường mặt bằng bán lẻ TP.HCM quý 2/2026',
    excerpt: 'Nguồn cung, giá thuê và tỷ lệ lấp đầy mặt bằng bán lẻ tại khu vực trung tâm và cận trung tâm.',
    readTime: '4 phút đọc',
    body: [
      ['p', 'Báo cáo tổng hợp diễn biến thị trường mặt bằng bán lẻ TP.HCM quý 2/2026, gồm nhà phố mặt tiền và khối đế trung tâm thương mại.'],
      ['h', 'Nội dung chính'],
      ['l', ['Nguồn cung và tỷ lệ lấp đầy theo khu vực', 'Mặt bằng giá thuê chào và giá thuê giao dịch', 'Lưu ý khi sử dụng dữ liệu thuê làm cơ sở cách tiếp cận từ thu nhập']],
      ['p', 'Bản đầy đủ của báo cáo được gửi theo yêu cầu cho đối tác và khách hàng của MHD.']
    ]
  },
  {
    slug: 'bao-cao-bds-cong-nghiep-phia-nam',
    cat: 'bao-cao',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    date: '10/06/2026',
    author: 'Phòng Nghiên cứu thị trường',
    tags: ['Bất động sản', 'Khu công nghiệp'],
    title: 'Báo cáo bất động sản công nghiệp phía Nam 6 tháng đầu năm 2026',
    excerpt: 'Tổng hợp giá thuê đất, nhà xưởng xây sẵn và thời hạn thuê tại các tỉnh phía Nam.',
    readTime: '4 phút đọc',
    body: [
      ['p', 'Báo cáo tổng hợp diễn biến thị trường bất động sản công nghiệp tại TP.HCM và các tỉnh lân cận trong 6 tháng đầu năm 2026.'],
      ['h', 'Nội dung chính'],
      ['l', ['Giá thuê đất khu công nghiệp theo tỉnh', 'Nhà xưởng, kho bãi xây sẵn cho thuê', 'Thời hạn thuê còn lại và ảnh hưởng tới giá trị quyền thuê']],
      ['p', 'Bản đầy đủ của báo cáo được gửi theo yêu cầu cho đối tác và khách hàng của MHD.']
    ]
  },
  {
    slug: 'dat-nen-vung-ven-ha-noi',
    cat: 'thi-truong',
    img: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/64fd47e6ee64b69ba0dc9f8e8fa185a03992b0df.jpg',
    date: '26/08/2026',
    author: 'Phòng Nghiên cứu thị trường',
    tags: ['Bất động sản', 'Hà Nội'],
    title: 'Đất nền vùng ven Hà Nội: giao dịch phục hồi chậm',
    excerpt: 'Giao dịch tập trung ở các khu vực có hạ tầng đã hình thành và pháp lý rõ ràng.',
    readTime: '3 phút đọc',
    body: [
      ['p', 'Giao dịch đất nền tại các huyện vùng ven Hà Nội phục hồi chậm. Người mua ưu tiên khu vực có hạ tầng giao thông đã hình thành và thửa đất có pháp lý rõ ràng.'],
      ['h', 'Lưu ý khi chọn tài sản so sánh'],
      ['p', 'Nhiều giao dịch là chuyển nhượng giữa nhà đầu tư, giá có thể không phản ánh nhu cầu sử dụng thực. Thẩm định viên cần kiểm chứng và điều chỉnh khi sử dụng.']
    ]
  },
  {
    slug: 'gia-xe-co-gioi-da-qua-su-dung',
    cat: 'thi-truong',
    img: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/2077fe3b06f028c4e065ba98ce099959f9f13806.jpg',
    date: '12/08/2026',
    author: 'Phòng Thẩm định Động sản',
    tags: ['Máy móc thiết bị', 'Vay vốn'],
    title: 'Giá xe cơ giới đã qua sử dụng và tác động tới tài sản bảo đảm',
    excerpt: 'Biến động giá xe tải, xe chuyên dùng đã qua sử dụng ảnh hưởng tới giá trị tài sản bảo đảm tại ngân hàng.',
    readTime: '3 phút đọc',
    body: [
      ['p', 'Giá xe tải và xe chuyên dùng đã qua sử dụng biến động theo nhu cầu vận tải và nguồn cung xe mới. Điều này ảnh hưởng trực tiếp tới giá trị tài sản bảo đảm là phương tiện vận tải.'],
      ['h', 'Yếu tố cần ghi nhận khi khảo sát'],
      ['l', ['Năm sản xuất, số km đã vận hành và lịch sử bảo dưỡng', 'Tình trạng thân vỏ, động cơ và hệ thống chuyên dùng', 'Giấy tờ đăng ký, đăng kiểm còn hiệu lực']]
    ]
  },
  {
    slug: 'case-study-quyen-thue-dat-kcn-gop-von',
    cat: 'case-study',
    img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    date: '02/06/2026',
    author: 'Phòng Thẩm định Bất động sản',
    tags: ['Bất động sản', 'Khu công nghiệp', 'Doanh nghiệp'],
    title: 'Thẩm định giá quyền thuê đất khu công nghiệp phục vụ góp vốn',
    excerpt: 'Xác định giá trị quyền thuê đất trả tiền một lần khi doanh nghiệp góp vốn vào công ty con.',
    readTime: '4 phút đọc',
    body: [
      ['p', 'Doanh nghiệp góp vốn bằng quyền thuê đất trả tiền một lần trong khu công nghiệp vào công ty con. Thông tin khách hàng đã được ẩn theo nguyên tắc bảo mật.'],
      ['h', 'Cách thực hiện'],
      ['l', ['Rà soát hợp đồng thuê lại đất, thời hạn thuê còn lại và nghĩa vụ tài chính', 'Thu thập giá thuê đất tại các khu công nghiệp lân cận', 'Điều chỉnh theo thời hạn thuê còn lại và hạ tầng kỹ thuật']],
      ['p', 'Kết quả được sử dụng làm căn cứ để các bên thống nhất giá trị phần vốn góp.']
    ]
  }
]
