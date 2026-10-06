import type { Access, CollectionConfig, FieldAccess } from 'payload'

type RoleUser = { id: string | number; roles?: string[] | null } | null | undefined

export const isAdmin = (user: RoleUser): boolean => Boolean(user?.roles?.includes('admin'))

const adminOnly: Access = ({ req: { user } }) => isAdmin(user as RoleUser)

/** Admins manage everyone; editors may only see/update their own account. */
const adminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if (isAdmin(user as RoleUser)) return true
  return { id: { equals: user.id } }
}

const adminOnlyField: FieldAccess = ({ req: { user } }) => isAdmin(user as RoleUser)

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'roles'],
    group: 'Hệ thống',
  },
  auth: {
    tokenExpiration: 60 * 60 * 8, // 8h working session
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000, // 15 min lockout after 5 failures
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
  },
  access: {
    read: adminOrSelf,
    create: adminOnly,
    update: adminOrSelf,
    delete: adminOnly,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Họ và tên',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      label: 'Vai trò',
      hasMany: true,
      // Least privilege: new accounts are editors unless an admin says otherwise
      defaultValue: ['editor'],
      required: true,
      saveToJWT: true,
      access: {
        // Editors cannot promote themselves
        create: adminOnlyField,
        update: adminOnlyField,
      },
      options: [
        { label: 'Quản trị viên (Admin)', value: 'admin' },
        { label: 'Biên tập viên (Editor)', value: 'editor' },
      ],
    },
  ],
}
