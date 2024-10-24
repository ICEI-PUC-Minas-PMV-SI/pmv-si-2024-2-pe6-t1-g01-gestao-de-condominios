export default interface VisitorsForm {
  id: number | null,
  name: string | null,
  cellphone: string | null,
  cpf: string | null,
  visits: [] | null,
  createdAt: Date | null,
  updatedAt: Date | null
}