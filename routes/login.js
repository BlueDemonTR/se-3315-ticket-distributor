import { sign } from "jsonwebtoken"
import config from "../config"
import { Admin } from "../models"

async function adminLogin(req, res, id) {
  const { body } = req,
    { username, password } = body

  const user = await Admin.findOne({ username })

  if(!user) return res.send({
    err: 'User doesn\'t exist'
  })

  if(!user.validPassword(password, user.password)) {
    return res.send("Incorrect password", 400)
  }

  delete user.password

  const token = sign(
    { data: { _id: user._id } },
    config.JWT_SECRET,
    { expiresIn: '7d' }
  )

  return res.send({
    user,
    token
  })
}

export default adminLogin