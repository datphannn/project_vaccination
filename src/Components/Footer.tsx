  export default function Footer(){
    return(
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">HỆ THỐNG TIÊM CHỦNG</h3>
              <p className="text-gray-300">
                Cung cấp dịch vụ tiêm chủng chất lượng cao với đội ngũ y bác sĩ chuyên nghiệp.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">LIÊN HỆ</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Hotline: 1800 6928</li>
                <li>Email: info@tiemchung.vn</li>
                <li>Địa chỉ: Hà Nội, Việt Nam</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">GIỜ LÀM VIỆC</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Thứ 2 - Thứ 6: 7:30 - 17:00</li>
                <li>Thứ 7: 7:30 - 12:00</li>
                <li>Chủ nhật: Nghỉ</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© 2025 Hệ thống Tiêm chủng. Bảo lưu mọi quyền.</p>
          </div>
        </div>
      </footer>
      );
  }