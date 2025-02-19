'use client'

import { request } from "@/api/request"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


export default function Register() {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [zip, setZip] = useState('')
  const [city, setCity] = useState('')
  const [siret, setSiret] = useState('')
  const [type, setType] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    // Here you would typically handle the registration logic
    console.log('Registration attempt with:', { name, contact, email, phone, address, zip, city, siret, type })
    // Reset form fields after submission
    setName('')
    setContact('')
    setEmail('')
    setPhone('')
    setAddress('')
    setZip('')
    setCity('')
    setSiret('')
    setType('')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Demande d'inscription</CardTitle>
          <CardDescription>Suite a votre demande, vous serrez contacté par un administrateur dans les plus brefs delais</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Nom de l'organisation
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Contact
              </label>
              <Input
                id="contact"
                type="text"
                placeholder="Entrez le nom du contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Téléphone
              </label>
              <Input
                id="phone"
                type="phone"
                placeholder="Enter your phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Adresse
              </label>
              <Input
                id="address"
                type="address"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="zip" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Code Postal
              </label>
              <Input
                id="zip"
                type="zip"
                placeholder="Enter your zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="city" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Ville
              </label>
              <Input
                id="city"
                type="city"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="siret" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Siret
              </label>
              <Input
                id="siret"
                type="siret"
                placeholder="Enter your siret"
                value={siret}
                onChange={(e) => setSiret(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Type
              </label>
              <Input
                id="type"
                type="type"
                placeholder="Enter your type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              />
            </div>              
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

