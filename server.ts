

import express,{ Express } from 'express'
import cors from 'cors'
import { storyRoutes } from './api/story/story.routes'
import { authRoutes } from './api/auth/auth.routes'
import cookieParser from 'cookie-parser'

const app :Express = express()
const corsOptions = {
    origin: [   'http://127.0.0.1:3000',
                'http://localhost:3000',
                'http://127.0.0.1:4200',
                'http://localhost:4200'
            ],
    credentials: true
}
app.use(cors(corsOptions))
app.use(cookieParser())


app.use('/api/story', storyRoutes)
app.use('/api/auth',authRoutes)
const port =  3000
app.listen( port ,()=>{
    console.log('Server is running on port: ' + port)
})
