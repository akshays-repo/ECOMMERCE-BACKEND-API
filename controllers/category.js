const Category = require("../models/category")

exports.getCategoryId = (req, res,next, id, ) =>{
    Category.findById(id).exec((err,cate) =>{
        if (err){
            return res.status(400).json({
                error:'id not found'
            })
            }
            req.category = cate
            next()
    })
    
}

exports.createCategory = (req,res) =>{
    category = new Category(req.body)
    category.save((err , cate) => {
        if (err){
            return res.status(400).json({
                error:" Category cant create  "
            })
            
        }res.json(cate)
    })
}

exports.getCategory = (req, res) =>{
    return res.json(req.category)

}

exports.getAllCategory = (req, res) =>{
    Category.find().exec((err, categories) =>{
        if (err){
            return res.status(400).json({
                error:"categories not found"
            })
            
        }res.json(categories)

    })
}


exports.updateCategory = (req,res) =>{
   const category = req.category;
   category.name = req.body.name;
   category.save((err ,updatedCategory) =>{
    if (err){
        return res.status(400).json({
            error:" Category cant update  "
        })
        }res.json(updatedCategory)
    })
  }

exports.removeCategory = (req,res) =>{
    const category = req.category
    category.remove((err, category) =>{
        if (err){
            return res.status(400).json({
                error:" Category cant delete "
            })
            }
            res.json({
                message:"sucessfully deleted"
            })
    })
}