export interface SupportIncident {
  id: string
  title: string
  type: string
  status: 'open' | 'investigating' | 'resolved'
  createdAt: string
  owner: string
}

export interface SupportUser {
  id: string
  name: string
  email: string
  curp: string
  status: 'active' | 'locked' | 'pending'
  lastLogin: string
  loginAttempts: number
}

export interface SupportTicket {
  id: string
  subject: string
  status: 'open' | 'pending' | 'closed'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  requester: string
}

export interface SupportCertificate {
  id: string
  folio: string
  candidate: string
  status: 'issued' | 'revoked' | 'pending'
  issuedAt: string
}

export interface SupportVoucher {
  id: string
  code: string
  status: 'activo' | 'usado' | 'expirado'
  expiresAt: string
  assignedTo: string
}

export interface SupportTelemetryLog {
  id: string
  message: string
  level: 'info' | 'warning' | 'error'
  createdAt: string
}

export const supportDashboardKpis = [
  { label: 'Tickets abiertos', value: 18, delta: '+3 hoy' },
  { label: 'Usuarios bloqueados', value: 7, delta: '+1 hoy' },
  { label: 'Certificados emitidos hoy', value: 42, delta: '+12 hoy' },
  { label: 'Incidencias activas', value: 5, delta: '-2 vs ayer' },
]

export const supportIncidents: SupportIncident[] = [
  {
    id: 'INC-1024',
    title: 'Tiempo de respuesta elevado en /api/auth/login',
    type: 'API',
    status: 'investigating',
    createdAt: 'Hace 12 min',
    owner: 'Equipo API',
  },
  {
    id: 'INC-1023',
    title: 'Usuarios con bloqueo por intentos fallidos',
    type: 'Seguridad',
    status: 'open',
    createdAt: 'Hace 35 min',
    owner: 'Soporte',
  },
  {
    id: 'INC-1022',
    title: 'Error intermitente en generación de certificados',
    type: 'Certificados',
    status: 'resolved',
    createdAt: 'Hace 2 h',
    owner: 'Backoffice',
  },
]

export const supportUsers: SupportUser[] = [
  {
    id: 'USR-0091',
    name: 'María Sánchez',
    email: 'maria.sanchez@demo.com',
    curp: 'SACM900101MDFRRR01',
    status: 'active',
    lastLogin: 'Hoy 09:12',
    loginAttempts: 1,
  },
  {
    id: 'USR-0088',
    name: 'Luis Pérez',
    email: 'luis.perez@demo.com',
    curp: 'PERL880505HDFABC02',
    status: 'locked',
    lastLogin: 'Ayer 19:44',
    loginAttempts: 6,
  },
  {
    id: 'USR-0085',
    name: 'Carla Méndez',
    email: 'carla.mendez@demo.com',
    curp: 'MENC850303MDFXYZ09',
    status: 'pending',
    lastLogin: 'Hace 3 días',
    loginAttempts: 0,
  },
]

export const supportTickets: SupportTicket[] = [
  {
    id: 'TCK-320',
    subject: 'No puedo completar el examen',
    status: 'open',
    priority: 'high',
    createdAt: 'Hace 5 min',
    requester: 'maria.sanchez@demo.com',
  },
  {
    id: 'TCK-318',
    subject: 'Recuperación de contraseña',
    status: 'pending',
    priority: 'medium',
    createdAt: 'Hace 1 h',
    requester: 'luis.perez@demo.com',
  },
  {
    id: 'TCK-317',
    subject: 'Actualización de datos de certificado',
    status: 'closed',
    priority: 'low',
    createdAt: 'Ayer',
    requester: 'carla.mendez@demo.com',
  },
]

export const supportCertificates: SupportCertificate[] = [
  {
    id: 'CRT-7741',
    folio: 'CERT-2024-7781',
    candidate: 'María Sánchez',
    status: 'issued',
    issuedAt: 'Hoy 10:05',
  },
  {
    id: 'CRT-7738',
    folio: 'CERT-2024-7748',
    candidate: 'Luis Pérez',
    status: 'pending',
    issuedAt: 'Ayer 18:22',
  },
  {
    id: 'CRT-7721',
    folio: 'CERT-2024-7610',
    candidate: 'Carla Méndez',
    status: 'revoked',
    issuedAt: 'Hace 2 días',
  },
]

export const supportVouchers: SupportVoucher[] = [
  {
    id: 'VCH-222',
    code: 'VCH-2024-AX91',
    status: 'activo',
    expiresAt: '2024-12-01',
    assignedTo: 'maria.sanchez@demo.com',
  },
  {
    id: 'VCH-219',
    code: 'VCH-2024-BT07',
    status: 'usado',
    expiresAt: '2024-08-15',
    assignedTo: 'luis.perez@demo.com',
  },
  {
    id: 'VCH-214',
    code: 'VCH-2024-CC19',
    status: 'expirado',
    expiresAt: '2024-05-01',
    assignedTo: 'carla.mendez@demo.com',
  },
]

export const supportTelemetry = {
  latencyMs: 183,
  warmupStatus: 'warm',
  uptime: '99.92%',
  logs: [
    {
      id: 'LOG-991',
      message: 'Warmup ejecutado correctamente (200 OK).',
      level: 'info',
      createdAt: 'Hace 2 min',
    },
    {
      id: 'LOG-989',
      message: 'Incremento de latencia en auth/login.',
      level: 'warning',
      createdAt: 'Hace 18 min',
    },
    {
      id: 'LOG-987',
      message: 'Timeout intermitente en certificados.',
      level: 'error',
      createdAt: 'Hace 1 h',
    },
  ] as SupportTelemetryLog[],
}
