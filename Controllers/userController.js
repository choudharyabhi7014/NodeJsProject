const UserData = require('../Model/userModel')
const ProductData = require('../Model/productModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const secret_key = "My name Abhishek"

exports.register = async (req, res, next) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new UserData({ email, password: hashedPassword })
    user.save();
    res.status(201).json({ message: 'User registered successfully' });
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body
    // const take = req.query.token
    // console.log(take)
    const user = await UserData.findOne({ email })
    if (!user) {
        return res.status(401).json({ message: 'Invalid user1' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid User1' });
    }
    const token = jwt.sign({ userId: user._id }, secret_key, { expiresIn: '1d' })
    res.status(200).json({ message: 'Login successful', token });

}
exports.showall = async (req, res, next) => {
    console.log(req.user)
    const data = await ProductData.find()
    res.status(200).json(data)
}

exports.cart = async (req, res, next) => {
    const productId = req.params.productId
    // console.log(productId)
    const token = req.query.token
    const product = await ProductData.findById(productId)
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    // user.cart.push(product);
    // console.log(user)
    // await user.save();
    let data = jwt.decode(token)
    const userId = data.userId
    const user = await UserData.findById(userId)
    user.cart.push(product)
    user.save()
    // console.log(data.userId)

    // console.log(req.query)
    // console.log(req.headers.Authorization)
    console.log(req.get('Authorization'))
    res.status(200).json({ message: "Product added to cart" });
}
exports.showCart = async (req, res, next) => {
    const userId = req.user
    // console.log(userId)
    const user = await UserData.findById(userId)
    const cartItems = user.cart
    // console.log(user)
    res.json(cartItems);
}
exports.removeFromCart = async (req, res, next) => {
    const userId = req.user;
    // console.log(userId)
    const productId = req.params.productId
    // console.log(productId)
    const user = await UserData.findById(userId)
    if (!user) {
        console.log("User not Found")
    }

    const cart = user.cart.filter(item => item._id.toString() !== productId);
    // console.log(user.cart[0]._id.toString())
    // console.log(user)
    user.cart = cart
    await user.save()
};

exports.forget = async (req, res, next) => {
    const { email } = req.body
    const token = jwt.sign({ email }, secret_key, { expiresIn: '1h' })
    console.log(email)
    const transporter = nodemailer.createTransport({
        // host:'smtp.gmail.com',
        // port : 587 ,
        // secureConnection: false,
        secure: false,
        service: "hotmail",
        auth: {
            user: 'choudharyabhi7014@hotmail.com',
            pass: '#992865#'
        }
    })
    const mailOptions = {
        from: 'choudharyabhi7014@hotmail.com',
        to: email,
        subject: "Forget Password",
        html: `<a href="http://localhost:5173/forget/${token}">Click Here</a>`

    }
    // transporter.verify(err=>console.log(err))
    transporter.sendMail(mailOptions, (err) => {
        if (!err) {
            console.log(`Email sent successfully`);
        } else {
            res.statusCode = 500
            console.error('Error occurred');
        };
    })

    // const token = crypto.randomBytes(20).toString('hex')
    // const user = await UserData.findOne({ email })
    // if (!user) {
    //     console.log('User Not Found')
    // }
    // user.resetPasswordToken = token
    // user.expireResetPassordDate = new Date().getTime() + 3600 * 1000// 1 hour in ms
    // await user.save();
    // const transporter = nodemailer.createTransport({
    //     service: 'Gmail',
    //     auth: {
    //         email: UserData.email.user,
    //         password: UserData.password.user
    //     }
    // })
    // var mailOptions = {
    //     from: UserData.email.user,
    //     to: email,
    //     subject: "Forget Password",
    //     text: `You are receiving this because you have requested the reset of a password for your account.\n\nPlease click on the following link,
    //     text:`
    //     text: `Please click on the link below to reset your passowrd\nhttp://localhost:${process.env.PORT}/api/v`
    // }

}


// exports.reset = async (req, res, next) => {
//     const { newPassowrd } = req.body
//     const resetToken = req.params.token;
//     // const { token } = req.params;
//     // const resetToken=req.params.token
//     const decoded = jwt.verify(resetToken, secret_key);
//     if (!decoded || !decoded.email) {
//         return res.status(400).json({ message: 'Invalid or expired token' });
//     }
//     const user = await UserData.findOne({ email: decoded.email })
//     if (!user) {
//         return console.log('user not found')
//     }
//     const hashedPassword = await bcrypt.hash(newPassowrd, 10);

//     // user.password = newPassowrd;
//     // user.resetTokenExpire=''

//     user.password = hashedPassword;
//     user.resetToken = '';
//     await user.save();
//     res.status(200).json({ message: 'Password reset successfully.' })
//     const { email } = req.body
//     const transporter = nodemailer.createTransport({
//         service: 'hotmail', auth: {
//             user: 'choudharyabhi7014@hotmail.com',
//             pass: '#992865#'
//         }
//     })
//     var mailOptions = {
//         from: "choudharyabhi7014@hotmai.com", to: email, subject: "test", text: "hello",
//         html: `<a href="http://localhost:3000/reset/${resetToken}">Reset Password</a>`
//     }
//     transporter.sendMail(mailOptions, (err) => { if (!err) { console.log("Email sent") } })
// }