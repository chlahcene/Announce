const superadminRole = 'SUPERADMIN';
const adminRole = 'ADMIN';
const userRole = 'USER';
const sellerRole = 'SELLER';
const clientRole = 'CLIENT';

const roles = [
  superadminRole,
  adminRole,
  userRole,
  sellerRole,
  clientRole,
];

const groupes = {
  superadminRole: [
    superadminRole,
    adminRole,
    sellerRole,
    clientRole,
    userRole,
  ],
  adminRole: [adminRole, sellerRole, clientRole, userRole],
  sellerRole: [sellerRole, userRole],
  clientRole: [clientRole, userRole],
  userRole: [userRole],
};

module.exports = {
  roles,
  groupes,
  userRole,
  adminRole,
  sellerRole,
  clientRole,
  superadminRole,
};
