export default interface VisitorsDto {
  id: number,
  name: string | null,
  cellphone: string | null,
  cpf: string | null,
  visits: {
    id: number,
    visitor: string | null,
    resident: string | null,
    status: string | null,
    createdAt: Date,
    updatedAt: Date
  } | null,
  createdAt: Date,
  updatedAt: Date
}