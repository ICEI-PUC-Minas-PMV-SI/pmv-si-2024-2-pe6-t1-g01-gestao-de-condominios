export default function formatDateTime(dateTime: string | Date | null) {
  if (!dateTime) return dateTime;

  // Se for uma string, cria um objeto Date
  const date = typeof dateTime === 'string' ? new Date(dateTime) : dateTime;

  // Verifica se a data é válida
  if (isNaN(date.getTime())) return null;

  // Formata os componentes da data e hora
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // Retorna a data e hora formatadas
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
