import bcrypt from 'bcrypt'
import { db } from '../database/db.js'
import { safeOperation, safeOperations, checkReq } from '../error-handling.js'

export async function register(req, res) {
  const {username, email, password} = req.body
  checkReq(!username || !email || !password)

  const [[dbUsername], [dbEmail]] = await safeOperations([
    () => db.query("select * from users where username = ?", [username]),
    () => db.query("select * from users where email = ?", [email])
  ], "Error while fetching username")

  if (dbUsername.length !== 0) return res.status(400).json({success: false, message: "Username is taken"})
  if (dbEmail.length !== 0) return res.status(400).json({success: false, message: "E-Mail is taken"})

  const hashedpassword = await bcrypt.hash(password, 10)

  await safeOperation(
    () => db.query("insert into users (username, email, password) values (?,?,?)", [username, email, hashedpassword]),
    "Error while registering"
  )

  res.status(200).json({success: true, message: "Registered successfully"})
}

export async function login(req, res) {
  const {username, email, password} = req.body
  checkReq((!username && !email) || !password)

  const [[dbUser]] = await safeOperation(
    async () => {
      if (username) {
        return await db.query("select * from users where username = ?", [username])
      } else {
        return await db.query("select * from users where email = ?", [email])
      }
    }, 
    "Error while fetching user from the database"
  )

  if (!dbUser) return res.status(404).json({success: false, message: "User not found"})

  const isPasswordValid = await bcrypt.compare(password, dbUser.password)
  if (!isPasswordValid) return res.status(401).json({success: false, message: "Wrong password"})

  req.session.user = { id: dbUser.userId }
  res.status(200).json({success: true, message: "User successfully logged in"})
}

export async function logout(req, res) {
  req.session.destroy()
  res.clearCookie('SessionId')
  res.status(200).json({success: true, message: 'Logged out successfully'})
}

export async function checkLogin(req, res) {
  if (req.session.user) {
    res.status(200).json({success: true, message: "Logged in", loggedIn: true})
  } else {
    res.status(200).json({success: true, message: "Not logged in", loggedIn: false})
  }
}

export async function getUserdata(req, res) {
  const [[user]] = await safeOperation( 
    () => db.query("select userId, username, email from users where userId = ?", [req.session.user.id]),
    "Error while retrieving userdata from the database"
  )
  
  res.status(200).json({success: true, message: "Successfully retrieved userdata from database", user: user})
}

export async function editUserdata(req, res) {
  const {username, email} = req.body
  checkReq(!username && !email)

  const [[dbUsername], [dbEmail]] = await safeOperations([
    () => db.query("select * from users where username = ? and userId != ?", [username, req.session.user.id]),
    () => db.query("select * from users where email = ? and userId != ?", [email, req.session.user.id])
  ], "Error while fetching username")

  if (dbUsername.length !== 0) return res.status(400).json({success: false, message: "Username is taken"})
  if (dbEmail.length !== 0) return res.status(400).json({success: false, message: "E-Mail is taken"})

  await safeOperation(
    async () => {
      if (username) await db.query("update users set username = ? where userId = ?", [username, req.session.user.id])
      if (email) await db.query("update users set email = ? where userId = ?", [email, req.session.user.id])
    },
    "Error while updating userdata"
  )

  res.status(200).json({ success: true, message: "Successfully updated user" })
}

export async function deleteUser(req, res) {
  await safeOperation(
    () => db.query("delete from users where userId = ?", [req.session.user.id]),
    "Error while deleting user"
  )

  res.status(200).json({ success: true, message: "Successfully deleted user" })
}