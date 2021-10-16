import { HmacSHA512, enc } from 'crypto-js';

const cryptEmail = HmacSHA512(req.body.email, process.env.SECRET_CRYPTOJS_TOKEN).toString(enc.Base64);
export default cryptEmail;