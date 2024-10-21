export default function (name: string | null | undefined): { initials: string, color: string } {
  const vuetifyColors = [
    'primary', 'secondary', 'success', 'info', 'warning', 'error',
    'blue', 'green', 'red', 'purple', 'orange', 'pink'
  ];

  if(!name) name = '';
  const words = name.trim().split(' ').filter(Boolean);
  const initials = words.slice(0, 2).map(word => word[0].toUpperCase()).join('');

  const randomColor = vuetifyColors[Math.floor(Math.random() * vuetifyColors.length)];

  return {
    initials: initials || '',
    color: randomColor,
  };
}