export const formatDate = (providedDate) => {
  if (!providedDate) return ''

  const date = new Date(providedDate);

  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const yyyy = date.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
}