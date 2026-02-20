/**
 * Admin Permission System
 * Defines all permissions and permission checking utilities
 */

export const Permissions = {
  // User management
  USERS_READ: 'users:read',
  USERS_WRITE: 'users:write',
  USERS_DELETE: 'users:delete',
  USERS_IMPERSONATE: 'users:impersonate',
  USERS_BAN: 'users:ban',
  
  // Feature flags
  FEATURES_READ: 'features:read',
  FEATURES_WRITE: 'features:write',
  FEATURES_DELETE: 'features:delete',
  
  // LLM configuration
  LLM_READ: 'llm:read',
  LLM_WRITE: 'llm:write',
  LLM_DELETE: 'llm:delete',
  
  // System settings
  SETTINGS_READ: 'settings:read',
  SETTINGS_WRITE: 'settings:write',
  
  // Analytics
  ANALYTICS_READ: 'analytics:read',
  ANALYTICS_EXPORT: 'analytics:export',
  
  // Audit logs
  AUDIT_READ: 'audit:read',
  
  // Content management
  CONTENT_READ: 'content:read',
  CONTENT_WRITE: 'content:write',
  CONTENT_DELETE: 'content:delete',
  CONTENT_MODERATE: 'content:moderate',
  
  // Security
  SECURITY_READ: 'security:read',
  SECURITY_WRITE: 'security:write',
  
  // Admin management
  ADMINS_READ: 'admins:read',
  ADMINS_WRITE: 'admins:write',
  ADMINS_DELETE: 'admins:delete',
  
  // System
  SYSTEM_READ: 'system:read',
  SYSTEM_MAINTENANCE: 'system:maintenance',
  
  // Super admin - all permissions
  ALL: '*',
} as const

export type Permission = typeof Permissions[keyof typeof Permissions]

// Role-based permission mappings
export const RolePermissions: Record<string, Permission[]> = {
  SUPER_ADMIN: [Permissions.ALL],
  ADMIN: [
    Permissions.USERS_READ,
    Permissions.USERS_WRITE,
    Permissions.USERS_BAN,
    Permissions.FEATURES_READ,
    Permissions.FEATURES_WRITE,
    Permissions.LLM_READ,
    Permissions.LLM_WRITE,
    Permissions.SETTINGS_READ,
    Permissions.SETTINGS_WRITE,
    Permissions.ANALYTICS_READ,
    Permissions.ANALYTICS_EXPORT,
    Permissions.AUDIT_READ,
    Permissions.CONTENT_READ,
    Permissions.CONTENT_WRITE,
    Permissions.CONTENT_MODERATE,
    Permissions.SECURITY_READ,
    Permissions.SECURITY_WRITE,
    Permissions.ADMINS_READ,
    Permissions.SYSTEM_READ,
  ],
  MODERATOR: [
    Permissions.USERS_READ,
    Permissions.FEATURES_READ,
    Permissions.CONTENT_READ,
    Permissions.CONTENT_WRITE,
    Permissions.CONTENT_MODERATE,
    Permissions.AUDIT_READ,
  ],
  SUPPORT: [
    Permissions.USERS_READ,
    Permissions.USERS_IMPERSONATE,
    Permissions.CONTENT_READ,
    Permissions.AUDIT_READ,
  ],
}

/**
 * Check if a user has a specific permission
 */
export function hasPermission(userPermissions: Permission[], requiredPermission: Permission): boolean {
  // Super admin has all permissions
  if (userPermissions.includes(Permissions.ALL)) {
    return true
  }
  
  // Check exact permission
  if (userPermissions.includes(requiredPermission)) {
    return true
  }
  
  // Check wildcard permissions (e.g., 'users:*' grants 'users:read')
  const [resource, action] = requiredPermission.split(':')
  const wildcardPermission = `${resource}:*` as Permission
  
  if (userPermissions.includes(wildcardPermission)) {
    return true
  }
  
  return false
}

/**
 * Check if a user has any of the specified permissions
 */
export function hasAnyPermission(userPermissions: Permission[], requiredPermissions: Permission[]): boolean {
  return requiredPermissions.some(permission => hasPermission(userPermissions, permission))
}

/**
 * Check if a user has all of the specified permissions
 */
export function hasAllPermissions(userPermissions: Permission[], requiredPermissions: Permission[]): boolean {
  return requiredPermissions.every(permission => hasPermission(userPermissions, permission))
}

/**
 * Get permissions for a role
 */
export function getRolePermissions(roleName: string): Permission[] {
  return RolePermissions[roleName] || []
}

/**
 * Permission groups for UI organization
 */
export const PermissionGroups = [
  {
    name: 'User Management',
    permissions: [
      { value: Permissions.USERS_READ, label: 'View Users', description: 'View user profiles and data' },
      { value: Permissions.USERS_WRITE, label: 'Edit Users', description: 'Modify user profiles and settings' },
      { value: Permissions.USERS_DELETE, label: 'Delete Users', description: 'Permanently delete user accounts' },
      { value: Permissions.USERS_IMPERSONATE, label: 'Impersonate Users', description: 'Login as another user' },
      { value: Permissions.USERS_BAN, label: 'Ban Users', description: 'Suspend or ban user accounts' },
    ],
  },
  {
    name: 'Feature Flags',
    permissions: [
      { value: Permissions.FEATURES_READ, label: 'View Features', description: 'View feature flag configurations' },
      { value: Permissions.FEATURES_WRITE, label: 'Edit Features', description: 'Create and modify feature flags' },
      { value: Permissions.FEATURES_DELETE, label: 'Delete Features', description: 'Delete feature flags' },
    ],
  },
  {
    name: 'LLM Configuration',
    permissions: [
      { value: Permissions.LLM_READ, label: 'View LLM', description: 'View LLM provider configurations' },
      { value: Permissions.LLM_WRITE, label: 'Edit LLM', description: 'Modify LLM providers and routing' },
      { value: Permissions.LLM_DELETE, label: 'Delete LLM', description: 'Remove LLM providers' },
    ],
  },
  {
    name: 'System Settings',
    permissions: [
      { value: Permissions.SETTINGS_READ, label: 'View Settings', description: 'View system configuration' },
      { value: Permissions.SETTINGS_WRITE, label: 'Edit Settings', description: 'Modify system settings' },
    ],
  },
  {
    name: 'Analytics',
    permissions: [
      { value: Permissions.ANALYTICS_READ, label: 'View Analytics', description: 'Access analytics dashboards' },
      { value: Permissions.ANALYTICS_EXPORT, label: 'Export Analytics', description: 'Export analytics data' },
    ],
  },
  {
    name: 'Content Management',
    permissions: [
      { value: Permissions.CONTENT_READ, label: 'View Content', description: 'View platform content' },
      { value: Permissions.CONTENT_WRITE, label: 'Edit Content', description: 'Create and modify content' },
      { value: Permissions.CONTENT_DELETE, label: 'Delete Content', description: 'Delete content' },
      { value: Permissions.CONTENT_MODERATE, label: 'Moderate Content', description: 'Review and moderate user content' },
    ],
  },
  {
    name: 'Security',
    permissions: [
      { value: Permissions.SECURITY_READ, label: 'View Security', description: 'View security settings' },
      { value: Permissions.SECURITY_WRITE, label: 'Edit Security', description: 'Modify security configuration' },
    ],
  },
  {
    name: 'Admin Management',
    permissions: [
      { value: Permissions.ADMINS_READ, label: 'View Admins', description: 'View admin users' },
      { value: Permissions.ADMINS_WRITE, label: 'Edit Admins', description: 'Assign admin roles' },
      { value: Permissions.ADMINS_DELETE, label: 'Remove Admins', description: 'Remove admin privileges' },
    ],
  },
  {
    name: 'System',
    permissions: [
      { value: Permissions.SYSTEM_READ, label: 'View System', description: 'View system status' },
      { value: Permissions.SYSTEM_MAINTENANCE, label: 'Maintenance', description: 'Perform system maintenance' },
      { value: Permissions.AUDIT_READ, label: 'View Audit Logs', description: 'Access audit logs' },
    ],
  },
]
