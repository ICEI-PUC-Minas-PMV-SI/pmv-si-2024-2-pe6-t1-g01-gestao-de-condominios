export default function formatPhoneNumber(phone: string) {
  const cleaned = phone.replace(/\D/g, '');

  switch (cleaned.length) {
    case 8: // Ex: 98136678 => 9813-6676
      return cleaned.replace(/(\d{4})(\d{4})/, '$1-$2');
      
    case 9: // Ex: 998136678 => 9 9813-6678
      return cleaned.replace(/(\d{1})(\d{4})(\d{4})/, '$1 $2-$3');
      
    case 10: // Ex: 3135394785 => (31) 3539-4785
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      
    case 11: // Ex: 31998136678 => (31) 9 9813-6678
      return cleaned.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
      
    default:
      return phone;
  }
}