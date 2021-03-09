const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')

// todos & home 頁面須要驗證過身分才能觀看內容，users本身就會要求登入驗證
router.use('/todos', authenticator, todos)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home) // 定義最寬鬆的路由放在最下方，就不會一直被攔截

module.exports = router