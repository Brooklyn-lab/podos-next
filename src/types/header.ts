type PhoneContact = {
  number: string
  icon: string
}

type EmailContact = {
  address: string
  icon: string
}

export type Contacts = {
  phone: PhoneContact
  email: EmailContact
}
