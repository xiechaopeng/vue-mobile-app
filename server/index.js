const koa = require('koa')
const app = new koa()
const router = require('koa-router')()
const staticAssets = require('koa-static')
const path = require('path')
const fs = require('fs')

app.use(staticAssets(path.resolve(__dirname, '../wx')))
router.get('*', async ctx => {
    const html = fs.readFileSync(path.resolve(__dirname, '../wx/index.html'))
    ctx.body = html
})
app.use(router.routes())
let port = 4049
app.listen(port)
console.log(`app started at port ${port}...`);
