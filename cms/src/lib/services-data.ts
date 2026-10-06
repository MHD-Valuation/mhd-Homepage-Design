export interface ServiceData {
  slug: string
  menu: string
  title: string
  noun: string
  sub: string
  hl: string[]
  purposes: [string, string][]
  scope: string[]
  methods: [string, string][]
  step3: string
  docs: string[]
  legal: string[]
  cases: [string, string, string][]
  faq: [string, string][]
}

export const SERVICES_CATALOG: Record<string, ServiceData> = {
  'Dich-vu-Doanh-nghiep': {
    slug: 'Dich-vu-Doanh-nghiep',
    menu: 'Thẩm định giá trị DN',
    title: 'Thẩm định giá trị doanh nghiệp',
    noun: 'giá trị doanh nghiệp',
    sub: 'Xác định giá trị doanh nghiệp và phần vốn phục vụ M&A, cổ phần hoá, tái cấu trúc vốn và chuyển nhượng cổ phần.',
    hl: [
      'Thực hiện theo Thông tư 36/2024/TT-BTC',
      'Kết hợp cách tiếp cận thị trường, thu nhập và tài sản',
      'Báo cáo nêu rõ giả thiết và điều kiện hạn chế',
    ],
    purposes: [
      ['M&A, mua bán sáp nhập', 'Xác định giá trị làm cơ sở đàm phán giao dịch.'],
      ['Cổ phần hoá, thoái vốn', 'Phục vụ phương án cổ phần hoá và chuyển nhượng vốn nhà nước.'],
      ['Góp vốn, chuyển nhượng phần vốn', 'Xác định giá trị phần vốn góp hoặc cổ phần chuyển nhượng.'],
      ['Tái cấu trúc, phát hành cổ phần', 'Cơ sở cho phương án tăng vốn, hoán đổi hoặc phát hành.'],
      ['Báo cáo tài chính', 'Phục vụ ghi nhận, đánh giá lại khoản đầu tư.'],
      ['Phân chia tài sản, tranh chấp', 'Cơ sở giá trị độc lập cho các bên liên quan.'],
    ],
    scope: [
      'Công ty cổ phần, công ty TNHH',
      'Doanh nghiệp có vốn nhà nước',
      'Phần vốn góp, cổ phần chưa niêm yết',
      'Doanh nghiệp khởi nghiệp, công nghệ',
      'Tập đoàn, công ty mẹ – con',
    ],
    methods: [
      [
        'Cách tiếp cận từ thị trường',
        'So sánh với doanh nghiệp và giao dịch tương tự thông qua các tỷ số như P/E, P/B, EV/EBITDA.',
      ],
      [
        'Cách tiếp cận từ thu nhập',
        'Chiết khấu dòng tiền tự do hoặc dòng cổ tức dự kiến về thời điểm thẩm định giá.',
      ],
      [
        'Cách tiếp cận từ tài sản',
        'Xác định giá trị theo tài sản thuần sau khi đánh giá lại từng khoản mục tài sản và nợ.',
      ],
    ],
    step3: 'Phân tích báo cáo tài chính, ngành và thị trường; áp dụng ít nhất hai cách tiếp cận phù hợp.',
    docs: [
      'Giấy chứng nhận đăng ký doanh nghiệp, điều lệ',
      'Báo cáo tài chính 3–5 năm gần nhất (đã kiểm toán nếu có)',
      'Kế hoạch kinh doanh, dự báo tài chính',
      'Danh mục tài sản cố định và hợp đồng lớn',
      'Cơ cấu vốn, danh sách cổ đông',
      'Thông tin khoản vay, bảo lãnh, nghĩa vụ tiềm tàng',
    ],
    legal: [
      'Luật Giá 2023 (số 16/2023/QH15)',
      'Thông tư 30/2024/TT-BTC – Chuẩn mực chung',
      'Thông tư 31/2024/TT-BTC – Thu thập và phân tích thông tin',
      'Thông tư 36/2024/TT-BTC – Thẩm định giá doanh nghiệp',
    ],
    cases: [
      [
        'Doanh nghiệp sản xuất',
        'Tái cấu trúc vốn',
        'Phân tích báo cáo tài chính 5 năm, áp dụng cách tiếp cận thu nhập và tài sản.',
      ],
      [
        'Công ty công nghệ',
        'Gọi vốn nhà đầu tư',
        'Dự báo dòng tiền, so sánh giao dịch doanh nghiệp cùng ngành trong khu vực.',
      ],
    ],
    faq: [
      [
        'Thẩm định giá doanh nghiệp mất bao lâu?',
        'Thời gian phụ thuộc quy mô doanh nghiệp, số lượng công ty con và mức độ đầy đủ của hồ sơ tài chính. Tiến độ dự kiến được ghi trong báo giá.',
      ],
      [
        'Doanh nghiệp chưa có báo cáo kiểm toán có thẩm định được không?',
        'Có thể thực hiện trên cơ sở báo cáo tài chính do doanh nghiệp lập. Báo cáo thẩm định giá sẽ nêu rõ giả thiết và giới hạn liên quan đến nguồn số liệu.',
      ],
      [
        'Kết quả có dùng cho giao dịch M&A được không?',
        'Chứng thư và báo cáo thẩm định giá có thể dùng làm cơ sở tham khảo cho đàm phán, trong phạm vi mục đích được ghi trên chứng thư.',
      ],
      [
        'Thông tin doanh nghiệp có được bảo mật không?',
        'MHD bảo mật thông tin khách hàng theo quy tắc đạo đức nghề nghiệp và thoả thuận bảo mật ký kèm hợp đồng dịch vụ (nếu có).',
      ],
    ],
  },
  'Dich-vu-Bat-dong-san': {
    slug: 'Dich-vu-Bat-dong-san',
    menu: 'Thẩm định giá bất động sản',
    title: 'Thẩm định giá bất động sản',
    noun: 'bất động sản',
    sub: 'Thẩm định giá đất, nhà, công trình và dự án phục vụ vay vốn, chuyển nhượng, góp vốn và báo cáo tài chính.',
    hl: [
      'Khảo sát hiện trạng tài sản trực tiếp',
      'Đối chiếu giao dịch thị trường khu vực',
      'Chứng thư có mã QR để đối chiếu thông tin',
    ],
    purposes: [
      ['Vay vốn, thế chấp', 'Cơ sở giá trị tài sản bảo đảm cho ngân hàng và tổ chức tín dụng.'],
      ['Mua bán, chuyển nhượng', 'Tham khảo giá trị trước khi giao dịch.'],
      ['Góp vốn bằng bất động sản', 'Xác định giá trị quyền sử dụng đất, công trình góp vốn.'],
      ['Báo cáo tài chính', 'Đánh giá lại bất động sản đầu tư, tài sản cố định.'],
      ['Tính thuế, lệ phí', 'Cơ sở xác định nghĩa vụ tài chính liên quan.'],
      ['Phân chia tài sản, tranh chấp', 'Giá trị độc lập phục vụ thoả thuận hoặc tố tụng.'],
    ],
    scope: [
      'Nhà phố, biệt thự, căn hộ chung cư',
      'Đất ở, đất nông nghiệp, đất sản xuất kinh doanh',
      'Nhà xưởng, kho bãi, đất khu công nghiệp',
      'Khách sạn, văn phòng, trung tâm thương mại',
      'Dự án bất động sản đang triển khai',
    ],
    methods: [
      [
        'Cách tiếp cận từ thị trường',
        'Đối chiếu giao dịch, chào bán tài sản tương tự và điều chỉnh theo vị trí, pháp lý, diện tích, hiện trạng.',
      ],
      [
        'Cách tiếp cận từ thu nhập',
        'Vốn hoá hoặc chiết khấu dòng tiền cho bất động sản tạo thu nhập như cho thuê, khách sạn.',
      ],
      [
        'Cách tiếp cận từ chi phí',
        'Áp dụng cho công trình xây dựng, kết hợp phương pháp thặng dư với đất có tiềm năng phát triển.',
      ],
    ],
    step3: 'Khảo sát vị trí, hiện trạng, pháp lý; thu thập giao dịch so sánh trong khu vực.',
    docs: [
      'Giấy chứng nhận quyền sử dụng đất, quyền sở hữu nhà',
      'Giấy phép xây dựng, bản vẽ hoàn công (nếu có)',
      'Hợp đồng mua bán, cho thuê (nếu có)',
      'Giấy tờ tuỳ thân hoặc đăng ký doanh nghiệp của chủ sở hữu',
      'Hình ảnh hiện trạng tài sản',
      'Thông tin quy hoạch liên quan (nếu có)',
    ],
    legal: [
      'Luật Giá 2023 (số 16/2023/QH15)',
      'Luật Đất đai 2024',
      'Thông tư 30/2024/TT-BTC – Chuẩn mực chung',
      'Thông tư 31/2024/TT-BTC – Thu thập và phân tích thông tin',
    ],
    cases: [
      [
        'Nhà phố trung tâm TP.HCM',
        'Vay vốn ngân hàng',
        'Khảo sát hiện trạng, đối chiếu 6 giao dịch so sánh trong bán kính 1 km.',
      ],
      [
        'Khách sạn nghỉ dưỡng',
        'Tài sản bảo đảm',
        'Phân tích thu nhập vận hành, kết hợp cách tiếp cận chi phí cho công trình.',
      ],
    ],
    faq: [
      [
        'Thời gian thẩm định một bất động sản là bao lâu?',
        'Với nhà đất thông thường có hồ sơ đầy đủ, thời gian thường ngắn hơn so với dự án hoặc tài sản thương mại. Tiến độ cụ thể được ghi trong báo giá.',
      ],
      [
        'Có bắt buộc khảo sát thực tế không?',
        'Có. Thẩm định viên khảo sát hiện trạng, vị trí và các yếu tố ảnh hưởng đến giá trị theo quy định của chuẩn mực.',
      ],
      [
        'Chứng thư có được ngân hàng chấp nhận không?',
        'Việc chấp nhận do từng ngân hàng quyết định theo quy chế nội bộ. MHD cung cấp hồ sơ pháp lý để ngân hàng thẩm tra khi cần.',
      ],
      [
        'Tài sản chưa có giấy chứng nhận có thẩm định được không?',
        'Tuỳ mục đích thẩm định. Báo cáo sẽ nêu rõ tình trạng pháp lý và giả thiết áp dụng.',
      ],
    ],
  },
  'Dich-vu-May-thiet-bi': {
    slug: 'Dich-vu-May-thiet-bi',
    menu: 'Động sản & máy thiết bị',
    title: 'Thẩm định giá động sản & máy thiết bị',
    noun: 'máy thiết bị',
    sub: 'Thẩm định giá dây chuyền sản xuất, máy móc, thiết bị và phương tiện vận tải phục vụ vay vốn, mua bán, thanh lý và góp vốn.',
    hl: [
      'Khảo sát tình trạng kỹ thuật tại nơi lắp đặt',
      'Đối chiếu giá thiết bị trong và ngoài nước',
      'Áp dụng cho tài sản đơn lẻ hoặc cả dây chuyền',
    ],
    purposes: [
      ['Vay vốn, thế chấp', 'Cơ sở giá trị tài sản bảo đảm là máy móc, phương tiện.'],
      ['Mua bán, nhập khẩu', 'Tham khảo giá trị trước khi mua hoặc nhập khẩu thiết bị.'],
      ['Thanh lý, xử lý tài sản', 'Xác định giá khởi điểm đấu giá, thanh lý tài sản.'],
      ['Góp vốn bằng tài sản', 'Xác định giá trị máy móc, dây chuyền góp vốn.'],
      ['Bảo hiểm tài sản', 'Cơ sở xác định số tiền bảo hiểm phù hợp.'],
      ['Đánh giá lại tài sản', 'Phục vụ báo cáo tài chính, cổ phần hoá.'],
    ],
    scope: [
      'Dây chuyền, nhà máy sản xuất',
      'Máy móc công nghiệp, máy xây dựng',
      'Phương tiện vận tải: ô tô, tàu thuyền, xe chuyên dùng',
      'Thiết bị y tế, công nghệ, văn phòng',
      'Hàng hoá, vật tư, nguyên liệu tồn kho',
    ],
    methods: [
      [
        'Cách tiếp cận từ thị trường',
        'Đối chiếu giá chào bán, giao dịch của thiết bị cùng loại, cùng thông số kỹ thuật.',
      ],
      [
        'Cách tiếp cận từ chi phí',
        'Xác định chi phí tái tạo hoặc thay thế, trừ hao mòn hữu hình, lỗi thời chức năng và kinh tế.',
      ],
      [
        'Cách tiếp cận từ thu nhập',
        'Áp dụng cho thiết bị hoặc dây chuyền tạo dòng tiền độc lập.',
      ],
    ],
    step3: 'Khảo sát tình trạng kỹ thuật, công suất, năm sản xuất; tra cứu giá thiết bị tương đương.',
    docs: [
      'Hoá đơn, hợp đồng mua bán, tờ khai hải quan',
      'Catalogue, thông số kỹ thuật',
      'Giấy đăng ký, đăng kiểm (với phương tiện)',
      'Biên bản nghiệm thu, lịch sử bảo trì',
      'Danh mục tài sản và vị trí lắp đặt',
    ],
    legal: [
      'Luật Giá 2023 (số 16/2023/QH15)',
      'Thông tư 30/2024/TT-BTC – Chuẩn mực chung',
      'Thông tư 31/2024/TT-BTC – Thu thập và phân tích thông tin',
      'Chuẩn mực thẩm định giá Việt Nam về các cách tiếp cận',
    ],
    cases: [
      [
        'Dây chuyền sản xuất bột mì',
        'Tài sản bảo đảm',
        'Khảo sát tại nhà máy, thu thập hồ sơ kỹ thuật, đối chiếu giá thiết bị nhập khẩu.',
      ],
      [
        'Đội xe vận tải 40 chiếc',
        'Thanh lý tài sản',
        'Kiểm tra đăng kiểm, tình trạng từng xe, đối chiếu giao dịch thị trường xe cũ.',
      ],
    ],
    faq: [
      [
        'Có cần tháo dỡ thiết bị để khảo sát không?',
        'Không. Thẩm định viên khảo sát tại vị trí lắp đặt, ghi nhận tình trạng vận hành và hồ sơ kỹ thuật đi kèm.',
      ],
      [
        'Thiết bị nhập khẩu không còn sản xuất thì xác định giá thế nào?',
        'MHD sử dụng thiết bị thay thế có tính năng tương đương và điều chỉnh theo công suất, công nghệ, tình trạng.',
      ],
      [
        'Có thẩm định một lúc nhiều tài sản được không?',
        'Có. Với danh mục lớn, MHD lập phạm vi công việc và tiến độ theo từng nhóm tài sản.',
      ],
      [
        'Kết quả có dùng để đấu giá thanh lý không?',
        'Có thể làm cơ sở xác định giá khởi điểm trong phạm vi mục đích được ghi trên chứng thư.',
      ],
    ],
  },
  'Dich-vu-Thuong-hieu': {
    slug: 'Dich-vu-Thuong-hieu',
    menu: 'Thương hiệu & tài sản vô hình',
    title: 'Thẩm định giá thương hiệu & tài sản vô hình',
    noun: 'tài sản vô hình',
    sub: 'Thẩm định giá thương hiệu, sáng chế, quyền sở hữu trí tuệ và tài sản vô hình phục vụ góp vốn, chuyển nhượng, M&A và báo cáo tài chính.',
    hl: [
      'Phân tích đóng góp của tài sản vào dòng tiền',
      'Đối chiếu tỷ lệ phí bản quyền tham chiếu',
      'Báo cáo nêu rõ nguồn thông tin và giả thiết',
    ],
    purposes: [
      ['Góp vốn bằng tài sản trí tuệ', 'Xác định giá trị thương hiệu, sáng chế góp vốn.'],
      ['Chuyển nhượng, nhượng quyền', 'Cơ sở cho hợp đồng chuyển nhượng, li-xăng, franchise.'],
      ['M&A, phân bổ giá mua', 'Tách giá trị tài sản vô hình trong giao dịch.'],
      ['Báo cáo tài chính', 'Ghi nhận, đánh giá lại tài sản vô hình.'],
      ['Vay vốn', 'Cơ sở giá trị khi dùng tài sản trí tuệ bảo đảm khoản vay.'],
      ['Tranh chấp, xử lý vi phạm', 'Xác định thiệt hại, giá trị quyền bị xâm phạm.'],
    ],
    scope: [
      'Thương hiệu, nhãn hiệu',
      'Sáng chế, giải pháp hữu ích, kiểu dáng công nghiệp',
      'Quyền tác giả, phần mềm',
      'Danh sách khách hàng, hợp đồng có giá trị',
      'Quyền khai thác, quyền thuê dài hạn',
    ],
    methods: [
      [
        'Cách tiếp cận từ thu nhập',
        'Phương pháp miễn tiền bản quyền, thu nhập vượt trội hoặc chênh lệch lợi nhuận do tài sản mang lại.',
      ],
      [
        'Cách tiếp cận từ thị trường',
        'Đối chiếu giao dịch chuyển nhượng và tỷ lệ phí bản quyền của tài sản tương tự.',
      ],
      [
        'Cách tiếp cận từ chi phí',
        'Xác định chi phí tạo lập hoặc thay thế tài sản vô hình tương đương.',
      ],
    ],
    step3: 'Phân tích doanh thu gắn với tài sản, vị thế thị trường, thời hạn bảo hộ.',
    docs: [
      'Văn bằng bảo hộ, giấy chứng nhận đăng ký nhãn hiệu',
      'Báo cáo tài chính, doanh thu gắn với tài sản',
      'Hợp đồng li-xăng, nhượng quyền (nếu có)',
      'Chi phí đầu tư phát triển, marketing',
      'Thông tin thị trường, đối thủ cạnh tranh',
    ],
    legal: [
      'Luật Giá 2023 (số 16/2023/QH15)',
      'Luật Sở hữu trí tuệ',
      'Thông tư 30/2024/TT-BTC – Chuẩn mực chung',
      'Chuẩn mực thẩm định giá Việt Nam về tài sản vô hình',
    ],
    cases: [
      [
        'Thương hiệu hàng tiêu dùng',
        'Góp vốn liên doanh',
        'Phân tích doanh thu 5 năm, áp dụng phương pháp miễn tiền bản quyền.',
      ],
      [
        'Phần mềm quản trị doanh nghiệp',
        'Chuyển nhượng quyền sở hữu',
        'Đối chiếu chi phí phát triển và thu nhập từ hợp đồng khách hàng.',
      ],
    ],
    faq: [
      [
        'Thương hiệu chưa đăng ký bảo hộ có thẩm định được không?',
        'Có thể thực hiện, nhưng tình trạng pháp lý ảnh hưởng đến giá trị và sẽ được nêu rõ trong báo cáo.',
      ],
      [
        'Giá trị thương hiệu có ghi nhận vào báo cáo tài chính được không?',
        'Việc ghi nhận phụ thuộc chuẩn mực kế toán áp dụng. Kết quả thẩm định giá là một căn cứ tham khảo.',
      ],
      [
        'Cần bao nhiêu năm số liệu doanh thu?',
        'Thông thường 3–5 năm gần nhất, kèm kế hoạch kinh doanh cho giai đoạn dự báo.',
      ],
      [
        'Có thẩm định sáng chế đang chờ cấp bằng không?',
        'Có, với giả thiết về khả năng được cấp bằng được nêu rõ trong báo cáo.',
      ],
    ],
  },
  'Dich-vu-Du-an-dau-tu': {
    slug: 'Dich-vu-Du-an-dau-tu',
    menu: 'Thẩm định dự án đầu tư',
    title: 'Thẩm định dự án đầu tư',
    noun: 'dự án đầu tư',
    sub: 'Phân tích hiệu quả và tính khả thi tài chính của dự án đầu tư theo phạm vi công việc đã thoả thuận.',
    hl: [
      'Phân tích dòng tiền, NPV, IRR và thời gian hoàn vốn',
      'Kiểm tra độ nhạy theo nhiều kịch bản',
      'Rà soát pháp lý và giả thiết đầu vào',
    ],
    purposes: [
      ['Vay vốn dự án', 'Hồ sơ phân tích tài chính gửi tổ chức tín dụng.'],
      ['Chuyển nhượng dự án', 'Xác định giá trị dự án hoặc quyền phát triển.'],
      ['Hợp tác đầu tư', 'Cơ sở đàm phán tỷ lệ góp vốn, phân chia lợi ích.'],
      ['Dự án dở dang', 'Đánh giá lại dự án đang triển khai.'],
      ['Phê duyệt nội bộ', 'Ý kiến độc lập cho hội đồng quản trị, nhà đầu tư.'],
      ['Quyết toán, điều chỉnh', 'Đánh giá lại hiệu quả khi thay đổi tổng mức đầu tư.'],
    ],
    scope: [
      'Dự án bất động sản, khu đô thị',
      'Dự án công nghiệp, nhà máy',
      'Dự án năng lượng, hạ tầng',
      'Dự án nông nghiệp, du lịch, dịch vụ',
    ],
    methods: [
      [
        'Chiết khấu dòng tiền',
        'Tính NPV, IRR, thời gian hoàn vốn trên cơ sở dòng tiền dự án và chi phí vốn phù hợp.',
      ],
      [
        'Phân tích độ nhạy và kịch bản',
        'Kiểm tra tác động của giá bán, chi phí, tiến độ và lãi suất đến hiệu quả dự án.',
      ],
      [
        'Phương pháp thặng dư',
        'Áp dụng cho dự án bất động sản: giá trị phát triển trừ chi phí và lợi nhuận nhà đầu tư.',
      ],
    ],
    step3: 'Rà soát pháp lý, tổng mức đầu tư, giả thiết doanh thu – chi phí; lập mô hình tài chính.',
    docs: [
      'Quyết định chủ trương đầu tư, giấy chứng nhận đăng ký đầu tư',
      'Báo cáo nghiên cứu khả thi',
      'Tổng mức đầu tư, dự toán chi tiết',
      'Kế hoạch doanh thu, chi phí, phương án vốn vay',
      'Hồ sơ pháp lý đất đai, quy hoạch',
    ],
    legal: [
      'Luật Giá 2023 (số 16/2023/QH15)',
      'Luật Đầu tư',
      'Thông tư 30/2024/TT-BTC – Chuẩn mực chung',
      'Thông tư 31/2024/TT-BTC – Thu thập và phân tích thông tin',
    ],
    cases: [
      [
        'Khu đô thị tại TP.HCM & các tỉnh',
        'Hợp tác đầu tư',
        'Lập mô hình dòng tiền 10 năm, phân tích 3 kịch bản giá bán.',
      ],
      [
        'Dự án năng lượng tái tạo',
        'Hồ sơ vay vốn',
        'Rà soát tổng mức đầu tư, phân tích độ nhạy theo sản lượng và giá bán điện.',
      ],
    ],
    faq: [
      [
        'Thẩm định dự án khác thẩm định giá bất động sản thế nào?',
        'Thẩm định dự án tập trung vào hiệu quả và tính khả thi tài chính của toàn bộ dòng tiền đầu tư, không chỉ giá trị tài sản tại một thời điểm.',
      ],
      [
        'Kết quả có bảo đảm dự án khả thi không?',
        'Không. Kết quả phản ánh phân tích trên các giả thiết được nêu rõ; hiệu quả thực tế phụ thuộc quá trình triển khai.',
      ],
      [
        'Cần những số liệu gì để bắt đầu?',
        'Tối thiểu gồm tổng mức đầu tư, tiến độ, phương án doanh thu và cơ cấu vốn. MHD gửi danh mục chi tiết sau khi tiếp nhận.',
      ],
      [
        'Có thực hiện cho dự án đang triển khai không?',
        'Có. MHD đánh giá lại trên cơ sở chi phí đã thực hiện và kế hoạch còn lại.',
      ],
    ],
  },
  'Dich-vu-Chung-minh-tai-chinh': {
    slug: 'Dich-vu-Chung-minh-tai-chinh',
    menu: 'Chứng minh tài chính',
    title: 'Thẩm định giá chứng minh tài chính',
    noun: 'tài sản chứng minh tài chính',
    sub: 'Thẩm định giá tài sản phục vụ hồ sơ chứng minh tài chính khi du học, định cư, du lịch hoặc công tác nước ngoài.',
    hl: [
      'Chứng thư tiếng Việt kèm bản tiếng Anh',
      'Hỗ trợ tài sản của người bảo lãnh',
      'Hướng dẫn hồ sơ theo yêu cầu từng quốc gia',
    ],
    purposes: [
      ['Du học', 'Chứng minh năng lực tài chính của du học sinh hoặc người bảo lãnh.'],
      ['Định cư', 'Bổ sung hồ sơ tài sản cho chương trình định cư.'],
      ['Du lịch, thăm thân', 'Chứng minh tài sản khi xin thị thực du lịch.'],
      ['Bảo lãnh người thân', 'Tài sản của cha mẹ, người thân bảo lãnh.'],
      ['Công tác, lao động', 'Hồ sơ tài chính khi đi công tác, làm việc nước ngoài.'],
    ],
    scope: [
      'Nhà, đất, căn hộ',
      'Ô tô và phương tiện có đăng ký',
      'Phần vốn góp, cổ phần',
      'Tài sản khác có giấy tờ sở hữu',
    ],
    methods: [
      [
        'Cách tiếp cận từ thị trường',
        'Đối chiếu giao dịch tài sản tương tự tại khu vực để xác định giá trị thị trường.',
      ],
      [
        'Cách tiếp cận từ chi phí',
        'Áp dụng cho công trình xây dựng trên đất và phương tiện.',
      ],
      [
        'Chứng thư song ngữ',
        'Chứng thư tiếng Việt kèm bản tiếng Anh theo yêu cầu hồ sơ nộp cơ quan nước ngoài.',
      ],
    ],
    step3: 'Khảo sát tài sản, đối chiếu giao dịch thị trường; chuẩn bị bản tiếng Anh theo yêu cầu.',
    docs: [
      'Giấy chứng nhận quyền sở hữu tài sản',
      'CCCD hoặc hộ chiếu của chủ sở hữu',
      'Giấy tờ chứng minh quan hệ (khi dùng tài sản người bảo lãnh)',
      'Giấy đăng ký xe (với ô tô)',
      'Yêu cầu hồ sơ của trường hoặc cơ quan lãnh sự (nếu có)',
    ],
    legal: [
      'Luật Giá 2023 (số 16/2023/QH15)',
      'Thông tư 30/2024/TT-BTC – Chuẩn mực chung',
      'Thông tư 31/2024/TT-BTC – Thu thập và phân tích thông tin',
      'Chuẩn mực thẩm định giá Việt Nam về các cách tiếp cận',
    ],
    cases: [
      [
        'Căn hộ tại TP.HCM',
        'Hồ sơ du học Úc',
        'Khảo sát căn hộ, lập chứng thư tiếng Việt kèm bản tiếng Anh.',
      ],
      [
        'Nhà phố và ô tô',
        'Hồ sơ định cư Canada',
        'Thẩm định đồng thời hai tài sản của người bảo lãnh.',
      ],
    ],
    faq: [
      [
        'Chứng thư có bảo đảm hồ sơ visa được duyệt không?',
        'Không. Chứng thư là tài liệu chứng minh giá trị tài sản; quyết định xét duyệt thuộc cơ quan lãnh sự hoặc cơ sở đào tạo.',
      ],
      [
        'Có bản tiếng Anh không?',
        'Có. MHD cung cấp chứng thư tiếng Việt kèm bản tiếng Anh theo yêu cầu.',
      ],
      [
        'Tài sản đứng tên cha mẹ có dùng được không?',
        'Có, kèm giấy tờ chứng minh quan hệ. Yêu cầu cụ thể tuỳ quy định của từng quốc gia.',
      ],
      [
        'Chứng thư có hiệu lực trong bao lâu?',
        'Thời hạn hiệu lực được ghi trên chứng thư. Nên kiểm tra yêu cầu về thời gian của cơ quan tiếp nhận hồ sơ.',
      ],
    ],
  },
}

export const SERVICES_CATALOG_EN: Record<string, ServiceData> = {
  'Dich-vu-Doanh-nghiep': {
    slug: 'Dich-vu-Doanh-nghiep',
    menu: 'Enterprise Valuation',
    title: 'Enterprise Valuation & Equity Appraisal',
    noun: 'Enterprise',
    sub: 'Determining the value of enterprises and equity stakes for M&A, equitization, capital restructuring, and share transfers.',
    hl: [
      'Executed strictly under MOF Circular 36/2024/TT-BTC',
      'Combining market, income, and asset-based approaches',
      'Transparent reporting of assumptions and limiting conditions',
    ],
    purposes: [
      ['M&A, Mergers & Acquisitions', 'Establishing valuation basis for transaction price negotiations.'],
      ['Equitization & Divestment', 'Serving state-owned capital divestment and equitization plans.'],
      ['Capital Contribution & Share Transfer', 'Determining equity stake or unlisted share transaction value.'],
      ['Restructuring & Share Issuance', 'Basis for capital increase, debt-equity swaps, or equity issuance.'],
      ['Financial Reporting', 'Fair value measurement and revaluation of long-term investments.'],
      ['Asset Division & Dispute Resolution', 'Independent valuation basis for shareholder disputes or settlements.'],
    ],
    scope: [
      'Joint-stock companies & Limited liability companies (LLC)',
      'State-owned and state-invested enterprises',
      'Unlisted equity stakes and private shares',
      'Tech startups & high-growth scaleups',
      'Corporate conglomerates, parent-subsidiary structures',
    ],
    methods: [
      [
        'Market Approach',
        'Comparable company analysis and precedent transaction multiples (P/E, P/B, EV/EBITDA).',
      ],
      [
        'Income Approach',
        'Discounted cash flow (FCFF/FCFE) or projected dividend discount models.',
      ],
      [
        'Asset-based Approach',
        'Adjusted net asset method revaluing all tangible/intangible assets and liabilities.',
      ],
    ],
    step3: 'Analyzing financial statements, industry trends, and market multiples; applying at least two compliant approaches.',
    docs: [
      'Business Registration Certificate, Company Charter',
      'Audited financial statements for the last 3–5 years',
      'Business plans, cash flow forecasts, financial budgets',
      'Fixed asset register and material commercial contracts',
      'Shareholder structure and capital contribution records',
      'Details of loans, guarantees, and contingent liabilities',
    ],
    legal: [
      'Law on Price 2023 (No. 16/2023/QH15)',
      'Circular 30/2024/TT-BTC — General Valuation Standards',
      'Circular 31/2024/TT-BTC — Information Collection & Analysis',
      'Circular 36/2024/TT-BTC — Enterprise Valuation Standard',
    ],
    cases: [
      [
        'Manufacturing Enterprise',
        'Capital Restructuring',
        'Analyzed 5-year financial statements applying income and asset-based approaches.',
      ],
      [
        'Technology Company',
        'Fundraising Round',
        'Constructed DCF projections and regional tech transaction market multiples.',
      ],
    ],
    faq: [
      [
        'How long does enterprise valuation take?',
        'Timeline depends on company scale, subsidiary count, and financial dossier completeness. Expected timeline is specified in the quote.',
      ],
      [
        'Can enterprises without audited financial statements be valued?',
        'Yes, based on management-prepared financials. The report clearly outlines assumptions and limitations regarding source verification.',
      ],
      [
        'Can the valuation report be used for M&A negotiations?',
        'Yes. The certificate and report serve as an independent professional benchmark within the specified valuation purpose.',
      ],
      [
        'Is client enterprise information kept strictly confidential?',
        'MHD strictly maintains information confidentiality under professional codes of ethics and Non-Disclosure Agreements (NDAs).',
      ],
    ],
  },
  'Dich-vu-Bat-dong-san': {
    slug: 'Dich-vu-Bat-dong-san',
    menu: 'Real Estate Valuation',
    title: 'Real Estate & Land Appraisal',
    noun: 'Real Estate',
    sub: 'Valuation of land, residential, commercial properties, and development projects for bank financing, transfer, contribution, and statutory reporting.',
    hl: [
      'Mandatory on-site field survey and physical verification',
      'Verified local market transaction and listing cross-checks',
      'Certificate issued with verifiable QR code',
    ],
    purposes: [
      ['Bank Lending & Collateral', 'Valuation basis of secured assets for domestic and foreign banks.'],
      ['Buying, Selling & Transfer', 'Independent market benchmark prior to commercial transactions.'],
      ['Real Estate Capital Contribution', 'Determining land use rights and attached building values.'],
      ['Financial Reporting & IFRS', 'Periodic fair value revaluation of investment properties and fixed assets.'],
      ['Tax & Statutory Levies', 'Establishing reference basis for applicable statutory liabilities.'],
      ['Dispute Resolution & Asset Division', 'Independent valuation opinion for litigation or partnership settlements.'],
    ],
    scope: [
      'Townhouses, villas, luxury residential apartments',
      'Residential land, agricultural land, commercial/industrial plots',
      'Manufacturing plants, warehouses, industrial park land',
      'Hotels, serviced apartments, office towers, commercial centres',
      'Real estate development projects under execution',
    ],
    methods: [
      [
        'Market Comparison Approach',
        'Benchmarking against recent verified transactions with adjustments for location, legal status, and frontage.',
      ],
      [
        'Income Capitalization Approach',
        'Direct capitalization or discounted cash flow for income-generating properties (leases, hospitality).',
      ],
      [
        'Cost & Residual Approach',
        'Replacement cost minus depreciation for buildings; residual method for development-potential land.',
      ],
    ],
    step3: 'On-site survey of coordinates, physical state, and legal title; collecting verified comparable transactions.',
    docs: [
      'Land Use Right and Building Ownership Certificates (Red/Pink Book)',
      'Construction permits, approved master plans, as-built drawings',
      'Sales/purchase contracts, commercial lease agreements',
      'Identification or corporate registration documents of owner',
      'Photographs and surveyed physical state records',
      'Relevant official zoning and planning certificates',
    ],
    legal: [
      'Law on Price 2023 (No. 16/2023/QH15)',
      'Vietnam Land Law 2024',
      'Circular 30/2024/TT-BTC — General Valuation Standards',
      'Circular 31/2024/TT-BTC — Information Collection & Analysis',
    ],
    cases: [
      [
        'CBD Ho Chi Minh City Townhouse',
        'Bank Credit Facility',
        'Surveyed physical state, cross-verified with 6 market comparables within 1 km.',
      ],
      [
        'Beachfront Resort & Hotel',
        'Collateral Security',
        'Analyzed operating net income combined with replacement cost approach for structures.',
      ],
    ],
    faq: [
      [
        'How long does a real estate valuation take?',
        'For standard properties with complete dossiers, turnaround is usually 2–3 business days. Specific timeline is stated in the proposal.',
      ],
      [
        'Is physical on-site inspection mandatory?',
        'Yes. Certified appraisers personally verify actual physical status, location, and condition per national valuation standards.',
      ],
      [
        'Are MHD certificates recognized by commercial banks?',
        'Bank acceptance depends on each institution credit policy. MHD provides complete legal licensing dossiers for bank verification.',
      ],
      [
        'Can properties without official land titles be appraised?',
        'Depending on the valuation purpose. The report explicitly documents legal status, limiting conditions, and assumptions applied.',
      ],
    ],
  },
  'Dich-vu-May-thiet-bi': {
    slug: 'Dich-vu-May-thiet-bi',
    menu: 'Machinery & Equipment',
    title: 'Machinery, Equipment & Movable Assets Valuation',
    noun: 'Machinery & Equipment',
    sub: 'Appraisal of production lines, industrial machinery, and transport vehicles for bank collateral, acquisition, liquidation, and capital injection.',
    hl: [
      'Direct on-site inspection of technical condition at installation',
      'Global and domestic equipment market price benchmarking',
      'Applicable for individual equipment units or integrated production lines',
    ],
    purposes: [
      ['Bank Lending & Collateral', 'Determining asset value of industrial machinery and vehicles for credit facilities.'],
      ['Importation & Procurement', 'Independent price reference before procurement or customs clearance.'],
      ['Liquidation & Asset Recovery', 'Establishing starting auction price for asset disposal and recovery.'],
      ['In-kind Capital Contribution', 'Determining value of contributed equipment lines to corporate ventures.'],
      ['Asset Insurance Coverage', 'Determining replacement cost basis for appropriate insurance coverage.'],
      ['Financial Asset Revaluation', 'Serving statutory accounting revaluation and equitization audits.'],
    ],
    scope: [
      'Complete industrial manufacturing lines and plants',
      'Mechanical machinery, specialized construction equipment',
      'Transportation vehicles: trucks, vessel fleets, specialized tractors',
      'Medical diagnostic equipment, IT infrastructure, office technology',
      'Inventories, supplies, raw materials, and finished goods',
    ],
    methods: [
      [
        'Market Approach',
        'Direct comparison with market quotes and transactions of identical make, model, and capacity.',
      ],
      [
        'Cost Approach (Depreciated Replacement Cost)',
        'Estimating reproduction or replacement cost minus physical deterioration and obsolescence.',
      ],
      [
        'Income Approach',
        'Applied to standalone revenue-generating machinery clusters or self-contained processing lines.',
      ],
    ],
    step3: 'Surveying technical specifications, operating capacity, and manufacturing year; benchmarking equivalent equipment prices.',
    docs: [
      'Commercial invoices, purchase contracts, customs declarations',
      'Manufacturer technical specifications, equipment catalogues',
      'Vehicle registrations and technical inspection certificates',
      'Acceptance minutes, maintenance logs, operational hours records',
      'Equipment inventory list and factory installation layout',
    ],
    legal: [
      'Law on Price 2023 (No. 16/2023/QH15)',
      'Circular 30/2024/TT-BTC — General Valuation Standards',
      'Circular 31/2024/TT-BTC — Information Collection & Analysis',
      'Vietnam Standards on Tangible Assets Approaches',
    ],
    cases: [
      [
        'Flour Mill Production Line',
        'Collateral Security',
        'Factory on-site survey, engineering file analysis, imported equipment price benchmarking.',
      ],
      [
        'Fleet of 40 Commercial Trucks',
        'Asset Liquidation',
        'Inspected registrations and physical conditions, benchmarked against secondary fleet market.',
      ],
    ],
    faq: [
      [
        'Does the survey require dismantling machinery?',
        'No. Valuers inspect machines at their actual installation site, recording operating parameters and technical logs.',
      ],
      [
        'How are obsolete or discontinued imported machines valued?',
        'MHD benchmarks against modern equivalent units with adjustments for capacity, technological gap, and physical condition.',
      ],
      [
        'Can large multi-asset equipment inventories be appraised simultaneously?',
        'Yes. For large plant inventories, MHD structures phased work plans and milestones per asset category.',
      ],
      [
        'Can results be used to set starting prices for liquidation auctions?',
        'Yes. Reports establish professional starting price foundations within the intended purpose stated on the certificate.',
      ],
    ],
  },
  'Dich-vu-Thuong-hieu': {
    slug: 'Dich-vu-Thuong-hieu',
    menu: 'Brand & Intangible Assets',
    title: 'Brand, IP & Intangible Assets Valuation',
    noun: 'Intangible Assets',
    sub: 'Valuation of trademarks, brand names, patents, software, and intellectual property for capital contribution, licensing, M&A, and financial reporting.',
    hl: [
      'Economic contribution analysis isolating brand-generated cash flows',
      'Benchmarking against empirical licensing royalty rates',
      'Transparent disclosure of methodologies, parameters, and assumptions',
    ],
    purposes: [
      ['IP Capital Contribution', 'Establishing equity value of brand names or patents for joint ventures.'],
      ['Assignment & Licensing', 'Pricing basis for trademark assignment, licensing, and franchising agreements.'],
      ['M&A & Purchase Price Allocation (PPA)', 'Identifying and segregating intangible asset values in transactions.'],
      ['Financial Reporting & IFRS', 'Recognition, balance sheet recording, and periodic impairment testing.'],
      ['Collateral & Financing', 'Valuation foundation when leveraging IP portfolios to secure capital.'],
      ['Infringement & Litigation', 'Quantifying economic damage and lost profits in IP dispute cases.'],
    ],
    scope: [
      'Trademarks, corporate brands, product brand names',
      'Patents, utility models, industrial designs',
      'Copyrights, proprietary software, source codes',
      'Customer lists, supply agreements, long-term commercial contracts',
      'Exploitation concessions, long-term leasehold rights',
    ],
    methods: [
      [
        'Income Approach (Relief-from-Royalty / Multi-period Excess Earnings)',
        'Quantifying royalty savings or incremental profit margins specifically generated by the asset.',
      ],
      [
        'Market Approach',
        'Benchmarking against verified commercial licensing rates and comparable IP transfer deals.',
      ],
      [
        'Cost Approach',
        'Calculating historical and replacement costs required to recreate equivalent intangible utility.',
      ],
    ],
    step3: 'Analyzing revenue directly attributable to the asset, brand equity, market standing, and legal protection horizon.',
    docs: [
      'Trademark registration certificates, patent grant letters',
      'Financial statements and revenue records attributable to the asset',
      'Existing licensing, royalty, or franchise agreements',
      'Historical R&D, product development, and advertising expenditures',
      'Market share research and competitor benchmark studies',
    ],
    legal: [
      'Law on Price 2023 (No. 16/2023/QH15)',
      'Vietnam Intellectual Property Law',
      'Circular 30/2024/TT-BTC — General Valuation Standards',
      'Vietnam Valuation Standards on Intangible Assets',
    ],
    cases: [
      [
        'FMCG Consumer Brand',
        'Joint Venture Contribution',
        'Analyzed 5-year revenue trajectory applying relief-from-royalty method.',
      ],
      [
        'Enterprise SaaS Software',
        'Proprietary Transfer',
        'Benchmarked development engineering costs against multi-year recurring contract revenues.',
      ],
    ],
    faq: [
      [
        'Can unregistered trademarks be appraised?',
        'Yes, though lack of statutory protection impacts defensibility and value, which is fully documented in the report.',
      ],
      [
        'Can brand value be capitalized onto official financial statements?',
        'Capitalization depends on governing accounting standards (e.g. VAS vs. IFRS). Valuation reports provide independent input.',
      ],
      [
        'How many years of historical revenue data are required?',
        'Typically 3–5 years of historical financials, accompanied by forward-looking business projections.',
      ],
      [
        'Can pending patent applications be valued?',
        'Yes, under clear conditional assumptions regarding grant probability and scope of protection.',
      ],
    ],
  },
  'Dich-vu-Du-an-dau-tu': {
    slug: 'Dich-vu-Du-an-dau-tu',
    menu: 'Investment Projects',
    title: 'Investment Project Financial Appraisal',
    noun: 'Investment Projects',
    sub: 'Financial feasibility and economic efficiency appraisal of investment projects within agreed scopes of engagement.',
    hl: [
      'Discounted cash flow, NPV, IRR, and payback period modeling',
      'Multi-scenario stress testing and sensitivity analysis',
      'Rigorous legal review of input parameters and commercial assumptions',
    ],
    purposes: [
      ['Project Project Financing', 'Independent financial feasibility dossier for credit syndication.'],
      ['Project Transfer & M&A', 'Determining enterprise value of project equity or development rights.'],
      ['Joint Venture Partnerships', 'Negotiation basis for capital equity ratio and profit sharing.'],
      ['Work-in-progress Projects', 'Revaluing ongoing developments and capital expenditures.'],
      ['Internal Board Approval', 'Independent financial opinion for Board of Directors and investment committees.'],
      ['Adjustment & Final Accounts', 'Re-assessing project efficiency upon total investment budget revisions.'],
    ],
    scope: [
      'Urban townships and residential real estate developments',
      'Industrial complexes, logistics hubs, manufacturing plants',
      'Renewable energy projects, power plants, infrastructure',
      'Agricultural processing, hospitality, eco-tourism resorts',
    ],
    methods: [
      [
        'Discounted Cash Flow (DCF)',
        'Calculating NPV, IRR, and payback period on project free cash flows using tailored WACC discount rates.',
      ],
      [
        'Sensitivity & Scenario Analysis',
        'Stress-testing key variables: sales velocity, tariff, construction cost, and interest rates.',
      ],
      [
        'Residual Method',
        'Applied to property developments: gross development value minus total construction costs and developer profit.',
      ],
    ],
    step3: 'Reviewing statutory permits, total investment capital, revenue/cost assumptions, and building financial models.',
    docs: [
      'In-principle investment approvals, Investment Registration Certificate (IRC)',
      'Feasibility study reports, detailed cost estimates',
      'Revenue model, operational cost estimates, debt financing structure',
      '1/500 zoning approvals, land allocation decisions, environmental permits',
    ],
    legal: [
      'Law on Price 2023 (No. 16/2023/QH15)',
      'Vietnam Law on Investment',
      'Circular 30/2024/TT-BTC — General Valuation Standards',
      'Circular 31/2024/TT-BTC — Information Collection & Analysis',
    ],
    cases: [
      [
        'Urban Township Project',
        'Investment Partnership',
        'Built 10-year dynamic cash flow model across 3 absorption and pricing scenarios.',
      ],
      [
        'Renewable Solar Power Plant',
        'Credit Syndicate Dossier',
        'Reviewed total CAPEX, modeled PPA tariff yield and debt service coverage ratios (DSCR).',
      ],
    ],
    faq: [
      [
        'How does project appraisal differ from standard real estate valuation?',
        'Project appraisal focuses on dynamic cash flows, investment returns (IRR/NPV), and financial viability over the entire project lifecycle.',
      ],
      [
        'Does the report guarantee project commercial success?',
        'No. Conclusions reflect rigorous analytical models based on stated assumptions; actual results depend on project execution.',
      ],
      [
        'What input data are needed to initiate the engagement?',
        'At minimum: total investment budget, execution schedule, revenue concept, and financing scheme.',
      ],
      [
        'Can projects already under construction be appraised?',
        'Yes. MHD assesses remaining economic returns based on sunk capital expenditures and remaining commitments.',
      ],
    ],
  },
  'Dich-vu-Chung-minh-tai-chinh': {
    slug: 'Dich-vu-Chung-minh-tai-chinh',
    menu: 'Financial Verification',
    title: 'Asset Valuation for Financial Verification',
    noun: 'Financial Verification Assets',
    sub: 'Asset valuation serving financial capacity verification for study abroad, immigration, overseas travel, and international assignments.',
    hl: [
      'Vietnamese certificates accompanied by official English versions',
      'Support for guarantor assets with formal documentation',
      'Checklist guidance tailored to embassy requirements',
    ],
    purposes: [
      ['Study Abroad', 'Proving financial capacity of students or sponsoring parents.'],
      ['Immigration Programs', 'Supplementary asset dossiers for global residency and immigration programs.'],
      ['Tourism & Family Visits', 'Independent asset certificate when applying for international visitor visas.'],
      ['Family Guarantor Support', 'Valuing assets owned by parents or sponsors backing applicants.'],
      ['Overseas Work & Business', 'Financial capability proof for overseas work assignments and business travel.'],
    ],
    scope: [
      'Residential houses, land plots, condominiums',
      'Automobiles and officially registered motor vehicles',
      'Corporate equity stakes, company shareholdings',
      'Other tangible assets with official title deeds',
    ],
    methods: [
      [
        'Market Comparison Approach',
        'Benchmarking with recent local transactions to determine market value.',
      ],
      [
        'Cost Approach',
        'Applied to on-land construction structures and registered vehicles.',
      ],
      [
        'Bilingual Issuance',
        'Vietnamese certificate accompanied by an official English version for foreign submission.',
      ],
    ],
    step3: 'Surveying assets, verifying local market comparables; issuing official English version upon request.',
    docs: [
      'Proof of asset ownership (Land title, vehicle registration)',
      'National ID cards or passports of asset owners',
      'Proof of family relationship (when utilizing sponsor assets)',
      'Vehicle registration certificates (for automobiles)',
      'Specific dossier requirements from universities or consulates (if any)',
    ],
    legal: [
      'Law on Price 2023 (No. 16/2023/QH15)',
      'Circular 30/2024/TT-BTC — General Valuation Standards',
      'Circular 31/2024/TT-BTC — Information Collection & Analysis',
      'Vietnam Valuation Standards on Valuation Approaches',
    ],
    cases: [
      [
        'Ho Chi Minh City Condominium',
        'Australian Student Visa Dossier',
        'Surveyed condominium, issued Vietnamese certificate and official English translation.',
      ],
      [
        'Townhouse & Luxury Automobile',
        'Canada Immigration Program',
        'Simultaneously appraised two sponsor-owned assets with verifiable documentation.',
      ],
    ],
    faq: [
      [
        'Does the valuation certificate guarantee visa approval?',
        'No. The certificate proves asset market value; final approval rests exclusively with the relevant embassy or institution.',
      ],
      [
        'Is an official English version provided?',
        'Yes. MHD provides standard Vietnamese certificates alongside English versions as requested.',
      ],
      [
        'Can assets in parents names be used for sponsorship?',
        'Yes, accompanied by certified family relationship proof per destination consulate guidelines.',
      ],
      [
        'How long is the certificate valid?',
        'Validity is stated on the certificate. Applicants should verify validity window requirements with the receiving authority.',
      ],
    ],
  },
}

export function getServiceCatalog(locale: string = 'vi'): Record<string, ServiceData> {
  return locale === 'en' ? SERVICES_CATALOG_EN : SERVICES_CATALOG
}

export function getServiceData(slug: string, locale: string = 'vi'): ServiceData | undefined {
  const catalog = getServiceCatalog(locale)
  if (catalog[slug]) return catalog[slug]
  const lower = slug.toLowerCase()
  return Object.values(catalog).find(
    (s) =>
      s.slug.toLowerCase() === lower ||
      s.slug.toLowerCase().replace('dich-vu-', '') === lower ||
      s.slug.toLowerCase() === `dich-vu-${lower}`
  )
}
