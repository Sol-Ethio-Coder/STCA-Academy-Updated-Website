const CODES = '/.netlify/functions/codes'
const REQS = '/.netlify/functions/requests'
export const getCreds = () => { try { return JSON.parse(sessionStorage.getItem('stca-admin-cred')) } catch (e) { return null } }
export const setCreds = (email, password) => { try { sessionStorage.setItem('stca-admin-cred', JSON.stringify({ email, password })) } catch (e) {} }
async function post(url, body) {
  let r
  try { r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }) } catch (e) { throw Object.assign(new Error('The server is not reachable. Check your internet connection (or run the site with Netlify: npx netlify dev).'), { status: 0 }) }
  const j = await r.json().catch(() => ({}))
  if (!r.ok) throw Object.assign(new Error(j.error || 'This service is not available here. Run the site with Netlify (npx netlify dev) or deploy it.'), { status: r.status })
  return j
}
const withCreds = (action, extra) => {
  const c = getCreds()
  if (!c) throw Object.assign(new Error('Enter your admin email and password to continue.'), { status: 401 })
  return { action, ...c, ...extra }
}
export const redeem = (code, course) => post(CODES, { action: 'redeem', code, course })
export const serverLogin = (email, password) => post(CODES, { action: 'login', email, password })
export const adminCall = (action, extra = {}) => post(CODES, withCreds(action, extra))
export const submitRequest = data => post(REQS, { action: 'submit', ...data })
export const adminReq = (action, extra = {}) => post(REQS, withCreds(action, extra))
