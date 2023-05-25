import { config } from 'dotenv'
import express, { Request, Response } from 'express'
import crypto from 'crypto'

config()

interface userDetails {
    id: string
    name: string
    age: number
    address: string
}

interface userDetailsBody {
    name: string
    age: number
    address: string
}

let user: userDetails[] = [
    {
        id: crypto.randomUUID(),
        name: 'hangthim limbu',
        age: 21,
        address: 'Birtamode,jhapa',
    },
]

const userVar = express()
userVar.use(express.json())
userVar.use(express.urlencoded({ extended: true }))

userVar.get('/user', (req: Request, res: Response) => {
    if (req.query) {
        res.send(user.filter((userEL) => userEL))
    }
    res.send(user)
})
userVar.post('/user', (req: Request, res: Response) => {
    const { name, age, address } = req.body as userDetailsBody
    const newUser: userDetails = { id: crypto.randomUUID(), name, age, address }
    user.push(newUser)
    res.sendStatus(201)
})

userVar.delete('/user/:id', (req: Request, res: Response) => {
    user = user.filter((userEL) => userEL.id !== req.params.id)
    res.sendStatus(200)
})
userVar.patch('/user/:id', (req: Request, res: Response) => {
    const { name, age, address } = req.body as userDetailsBody
    const updatedUsers = user.map((userEL) => 
        userEL.id === req.params.id ? { ...userEL, name, age, address } : userEL
    )
  user = updatedUsers;
  res.sendStatus(200)


})
const PORT = process.env.PORT || 3000

userVar.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`)
})
