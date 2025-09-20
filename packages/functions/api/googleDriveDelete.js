/* eslint-disable consistent-return */
/* eslint-disable no-return-await */
import { google } from 'googleapis'
import allowCors from '../utils/allowCORS'

require('dotenv').config()

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
  const fileId = req.body

  const { CLIENT_ID } = process.env
  const { CLIENT_SECRET } = process.env
  const { REDIRECT_URI } = process.env
  const { REFRESH_TOKEN } = process.env

  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  )

  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

  const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
  })

  try {
    const response = await drive.files.delete({
      fileId: Object.keys(fileId),
    })
    res.json({
      message: `File deleted: ${response.status} ${Object.keys(fileId)}`,
      success: true,
    })
  } catch (error) {
    res.json({
      message: `File delete error ${Object.keys(fileId)}`,
      success: false,
    })
  }
}

export default allowCors(handler)
