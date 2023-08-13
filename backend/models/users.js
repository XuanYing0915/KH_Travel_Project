// 資料庫查詢處理函式
const {
  find,
  count,
  findOneById,
  insertOne,
  insertMany,
  remove,
  updateById,
  cleanTable,
  findOne,
} = require ('./base.js')

// 定義資料庫表格名稱
const table = 'member'

// 所需的資料處理函式
const getUsers = async () => {
  const { rows } = await find(table)
  return rows
}
const getUserById = async (id) => await findOneById(table, id)
const getCount = async (where) => await count(table, where)
const createUser = async (user) => await insertOne(table, user)
const createBulkUsers = async (users) => await insertMany(table, users)
const deleteUserById = async (id) => await remove(table, { id })

// 針對PUT更新user資料
const updateUserById = async (user, id) => await updateById(table, user, id)
const updateUser = async (user) => await updateById(table, user, user.member_id)

// 登入使用
const verifyUser = async ({ email, password }) =>
  Boolean(await count(table, { email, password }))

const getUser = async ({ email, password }) =>
  await findOne(table, { email, password })

// 其它用途
const cleanAll = async () => await cleanTable(table)

module.exports = {
  cleanAll,
  createBulkUsers,
  createUser,
  deleteUserById,
  getCount,
  getUser,
  getUserById,
  getUsers,
  updateUser,
  updateUserById,
  verifyUser,
}