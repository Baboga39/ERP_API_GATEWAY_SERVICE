/**
 * Mapping HR positions (from HR Service) → Role name (Auth Service)
 * Used when creating users via events
 */
module.exports = {
  // Nhân sự
  'Trưởng phòng Nhân sự': 'employee_manager',
  'Nhân viên Nhân sự': 'employee_staff',

  // Tài sản
  'Trưởng phòng Tài sản': 'asset_manager',
  'Nhân viên Tài sản': 'asset_staff',

  // Kho
  'Trưởng kho': 'inventory_manager',
  'Nhân viên kho': 'inventory_staff',

  // Đơn hàng
  'Trưởng phòng Đơn hàng': 'order_manager',
  'Nhân viên Đơn hàng': 'order_staff',

  // Báo cáo
  'Trưởng phòng Báo cáo': 'report_manager',
  'Nhân viên Báo cáo': 'report_staff',

  // Kế toán
  'Trưởng phòng Kế toán': 'account_manager',
  'Nhân viên Kế toán': 'account_staff',

  // Sản xuất
  'Trưởng xưởng Sản xuất': 'manufacture_manager',
  'Công nhân Sản xuất': 'manufacture_staff',

  // Vận chuyển
  'Trưởng phòng Logistics': 'logistics_manager',
  'Nhân viên Logistics': 'logistics_staff',

  // Admin
  'Quản trị hệ thống': 'admin',
};
