export default function formatCPFNumber(cpf: string | null) {
  if (!cpf) return cpf;

  const cleaned = cpf.replace(/\D/g, '');

  if (cleaned.length > 11) return cleaned;

  let formatted = cleaned;

  switch (cleaned.length) {
    case 0:
      formatted = cleaned; 
      break;
    case 1:
    case 2:
    case 3:
      formatted = cleaned;
      break;
    case 4:
    case 5:
    case 6:
      formatted = cleaned.replace(/(\d{3})(\d{1,3})/, '$1.$2'); // XXX.XXX
      break;
    case 7:
    case 8:
    case 9:
      formatted = cleaned.replace(/(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3'); // XXX.XXX.XXXX
      break;
    case 10:
    case 11:
      formatted = cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); // XXX.XXX.XXX-XX
      break;
    default:
      break;
  }

  return formatted;
}
