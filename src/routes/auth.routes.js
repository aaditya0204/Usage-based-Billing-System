import express from "express"
import { googleRedirect, googleCallback } from "../controllers/auth.controller.js"

const router = express.Router()

router.get("/google", googleRedirect)
router.get("/google/callback", googleCallback)

export default router
