import api from './api'
import { isSupportPreviewEnabled } from '../support/supportPreview'
import { mockCompanies, mockTickets } from '../support/mockSupportData'

export type SupportTicketStatus = 'open' | 'pending' | 'solved'
export type SupportPriority = 'low' | 'medium' | 'high'
export type SupportChannel = 'web' | 'email' | 'whatsapp'

export interface SupportTicketAttachment {
  name: string
  url: string
  size: string
}

export interface SupportTicket {
  id: string
  folio: string
  subject: string
  message: string
  userName: string
  userEmail: string
  companyId: string
  companyName: string
  status: SupportTicketStatus
  priority: SupportPriority
  createdAt: string
  updatedAt: string
  tags: string[]
  lastAgentResponseAt?: string
  channel: SupportChannel
  attachments: SupportTicketAttachment[]
}

export interface SupportTicketNote {
  id: string
  ticketId: string
  author: string
  message: string
  createdAt: string
}

export interface SupportCompany {
  id: string
  name: string
  industry?: string
  contactEmail?: string
  activeTickets?: number
}

export interface SupportTicketFilters {
  status?: SupportTicketStatus | ''
  priority?: SupportPriority | ''
  companyId?: string
  channel?: SupportChannel | ''
  search?: string
  dateFrom?: string
  dateTo?: string
}

const filterPreviewTickets = (tickets: SupportTicket[], filters?: SupportTicketFilters) => {
  if (!filters) return tickets
  return tickets.filter((ticket) => {
    const matchesStatus = filters.status ? ticket.status === filters.status : true
    const matchesPriority = filters.priority ? ticket.priority === filters.priority : true
    const matchesCompany = filters.companyId ? ticket.companyId === filters.companyId : true
    const matchesChannel = filters.channel ? ticket.channel === filters.channel : true
    const query = filters.search?.trim().toLowerCase() || ''
    const matchesSearch = query
      ? [
          ticket.subject,
          ticket.message,
          ticket.userName,
          ticket.userEmail,
          ticket.folio,
          ticket.companyName,
        ].some((value) => value.toLowerCase().includes(query))
      : true

    const createdAt = new Date(ticket.createdAt)
    const matchesFrom = filters.dateFrom ? createdAt >= new Date(filters.dateFrom) : true
    const matchesTo = filters.dateTo ? createdAt <= new Date(filters.dateTo) : true

    return (
      matchesStatus &&
      matchesPriority &&
      matchesCompany &&
      matchesChannel &&
      matchesSearch &&
      matchesFrom &&
      matchesTo
    )
  })
}

export const listTickets = async (filters?: SupportTicketFilters): Promise<SupportTicket[]> => {
  if (isSupportPreviewEnabled()) {
    return filterPreviewTickets(mockTickets, filters)
  }

  const response = await api.get('/support/tickets', { params: filters })
  return response.data?.tickets || response.data
}

export const getTicketById = async (ticketId: string): Promise<SupportTicket | null> => {
  if (isSupportPreviewEnabled()) {
    return mockTickets.find((ticket) => ticket.id === ticketId) || null
  }

  const response = await api.get(`/support/tickets/${ticketId}`)
  return response.data?.ticket || response.data
}

export const updateTicketStatus = async (
  ticketId: string,
  status: SupportTicketStatus,
): Promise<SupportTicket | null> => {
  if (isSupportPreviewEnabled()) {
    const ticket = mockTickets.find((item) => item.id === ticketId)
    return ticket ? { ...ticket, status, updatedAt: new Date().toISOString() } : null
  }

  const response = await api.patch(`/support/tickets/${ticketId}`, { status })
  return response.data?.ticket || response.data
}

export const addInternalNote = async (
  ticketId: string,
  message: string,
  author = 'Equipo Soporte',
): Promise<SupportTicketNote> => {
  if (isSupportPreviewEnabled()) {
    return {
      id: `note-${Math.random().toString(36).slice(2, 8)}`,
      ticketId,
      author,
      message,
      createdAt: new Date().toISOString(),
    }
  }

  const response = await api.post(`/support/tickets/${ticketId}/notes`, { message })
  return response.data?.note || response.data
}

export const listCompanies = async (): Promise<SupportCompany[]> => {
  if (isSupportPreviewEnabled()) {
    return mockCompanies
  }

  const response = await api.get('/partners', { params: { per_page: 100 } })
  if (response.data?.partners) {
    return response.data.partners.map((partner: any) => ({
      id: String(partner.id),
      name: partner.name,
      industry: partner.legal_name,
      contactEmail: partner.email,
      activeTickets: 0,
    }))
  }

  return response.data || []
}
