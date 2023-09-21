const ProductData = require('../Model/productModel')
const jwt = require('jsonwebtoken')
const AdminData = require('../Model/adminSchema')
const bcrypt = require('bcrypt')
const secret_key = "My name Abhi"
exports.add = async (req, res, next) => {
    const product = new ProductData(req.body.product)
    await product.save()
    res.status(201).json({
        message: 'Product added successfully',
        // data:product
    })
}
exports.showAll = async (req, res, next) => {
    const data = await ProductData.find()
    res.status(200).json(data)
}
exports.update = async (req, res, next) => {
    const product = await ProductData.findByIdAndUpdate(req.params.id, req.body, { new: true })
    console.log(product)
    res.status(200).json({
        messsage: 'updated'
    })
}
exports.deleteProduct = async (req, res, next) => {
    const id = req.params.id
    console.log(id)
    const product = await ProductData.findByIdAndRemove(id)
    // console.log(product)
    res.status(200).json({
        message: 'success Delete'
    })
}

// exports.register=async (req,res,next)=>{
//     const { email, password } = req.body
//     const hashedPassword = await bcrypt.hash(password, 10)
//     const user = new AdminData({ email, password: hashedPassword })
//     await user.save()
//     res.status(201).json({ message: 'User registered successfully' });
// }
exports.authenticateToken = (req, res, next) => {
    const token = req.query.token
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: 'Access denied',auth:false });
    }

    jwt.verify(token, 'secret_key', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}
exports.login = async (req, res, next) => {
    // const take = req.query.token
    // console.log(take)
    const { email, password } = req.body
    const user = await AdminData.findOne({ email })
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