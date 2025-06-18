/**
 * Define which permissions each role has
 * Format: resource:action
 */
module.exports = {
  admin: [
    '*:*', // full quyền
  ],

  // HR
  employee_manager: ['employee:create', 'employee:read', 'employee:update', 'employee:delete'],
  employee_staff: ['employee:read'],

  // Tài sản
  asset_manager: ['asset:create', 'asset:read', 'asset:update', 'asset:delete'],
  asset_staff: ['asset:read'],

  // Kho
  inventory_manager: ['inventory:create', 'inventory:read', 'inventory:update', 'inventory:delete'],
  inventory_staff: ['inventory:read'],

  // Đơn hàng
  order_manager: ['order:create', 'order:read', 'order:update', 'order:delete'],
  order_staff: ['order:read'],

  // Báo cáo
  report_manager: ['report:read'],
  report_staff: ['report:read'],

  // Kế toán
  account_manager: ['account:create', 'account:read', 'account:update', 'account:delete'],
  account_staff: ['account:read'],

  // Sản xuất
  manufacture_manager: ['manufacture:create', 'manufacture:read', 'manufacture:update', 'manufacture:delete'],
  manufacture_staff: ['manufacture:read'],

  // Logistics
  logistics_manager: ['logistics:create', 'logistics:read', 'logistics:update', 'logistics:delete'],
  logistics_staff: ['logistics:read'],
};
