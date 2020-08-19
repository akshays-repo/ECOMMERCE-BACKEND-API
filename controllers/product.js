const Product = require('../models/product')
const formidabe = require("formidable")
const _ = require("lodash")
const fs = require("fs")


exports.productId = (req,res,next,id) =>{
    Product.findById(id).populate("category")
    .exec((err,product) =>{
        if(err){
            return res.status(400).json({
                error:"unable to find to product"
            }
            )}
            req.product = product
            next()
        
    })
}

exports.getProduct = (req,res) =>{
    req.product.photo = undefined
    return res.json(req.product)
}

exports.createProduct=(req,res)=>{
    let form = new formidabe.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"problem with image"
            })
        }
        
        //destructur the fields
        const {name, description, price, category,  stock} = fields
        if(!name || !description || !price || !category  || !stock){
            return res.status(400).json({
                error:"please fill all fields"
            })
        }

        let product = new Product(fields)
        // handle file here 
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"image should be less than 3MB"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        product.save((err, product) =>{
            if(err){
                res.status(400).json({
                    error:"saving a photo is unsuccesfull"
                })
            }
            console.log(product)
            return res.json(product)
        })
    })


}

exports.getPhoto = (req, res, next) =>{
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

exports.removeProduct = (req, res) =>{
    const product = req.product
    product.remove((err,product) =>{
        if(err){
            return res.status(400).json({
                error:"cant delete the product"
            })
        }
        res.json({
            message:"product is removed"
        })

        });
}

exports.updateProduct=(req,res)=>{
        let form = new formidabe.IncomingForm();
        form.keepExtensions = true;
        form.parse(req,(err,fields,file)=>{
            if(err){
                return res.status(400).json({
                    error:"problem with image"
                })
            }
            
            //destructur the fields
            const {name, description, price, category,  stock} = fields
           
    
            let product = req.product
            product = _.extend(product,fields)
            // handle file here 
            if(file.photo){
                if(file.photo.size > 3000000){
                    return res.status(400).json({
                        error:"image should be less than 3MB"
                    })
                }
                product.photo.data = fs.readFileSync(file.photo.path)
                product.photo.contentType = file.photo.type
            }
            product.save((err, product) =>{
                if(err){
                    res.status(400).json({
                        error:"updating a product is unsuccesfull"
                    })
                }
                return res.json(product)
            })
        })
    
    
}

exports.getAllProducts=(req, res) =>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 8 
    let sortBy = req.query.sortBy ? req.query.sortBy:"_id"
    Product.find()
    .select(-photo)
    .populate("category")
    .limit(limit)
    .sort([[sortBy, "asc"]])
    .exec((err, products) =>{
        if(err){
            return res.status(400).json({
                error:"no product is found"
            })
        }
        res.json(products)
    })
}

exports.updateInventory = (req, res, next) =>{
    let myOperations = req.body.order.products.map(prod =>{
        return{
            updatOne:{
                filter:{_id: prod._id},
                update:{$inc:{stock: -prod.count, sold: +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperations,{}, (err, products) =>{
        if(err){
            return res.status(400).json({
                error:"BULK operation is failed"
            })
        }
    })
}

exports.getAllUniqueCategories =(req, res)=>{
    Product.distinct("category", {}, (err, category) =>{
        if(err){
            return res.status(400).json({
                error:"NO category found"
            })
        }
        res.json(category)
    })
}