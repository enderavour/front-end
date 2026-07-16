export interface Company
{
  id: number,
  name: string,
  address: string,
  email: string
}

export const companies: Company[] = [
  {
    id: 1,
    name: "Mozilla",
    address: "Mountain View, CA",
    email: "contact@mozilla.org"
  },
  {
    id: 2,
    name: "FSF",
    address: "Boston, MA",
    email: "info@fsf.org"
  }
];
