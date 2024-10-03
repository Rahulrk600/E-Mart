import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudnary.js"
import { Product } from "../models/product.model.js"
import { isValidObjectId } from "mongoose";
import { ApiFeatures } from "../utils/ApiFeatures.js"

// create product by admin

const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, category, } = req.body

    if ([name, description, price, category].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "all fields are required")
    }

    if (!req.files || req.files.length === 0) {
        throw new ApiError(400, "No file uploaded")
    }

    let imageUrl = []

    for (let i = 0; i < req.files.length; i++) {
        const localFilePath = req.files[i].path

        const result = await uploadOnCloudinary(localFilePath);
        imageUrl.push(result.url)

    }

    const product = await Product.create({
        name,
        description,
        price,
        category,
        images: imageUrl
    })

    if (!product) {
        throw new ApiError(500, "Something went worng while creating product")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, product, "Product created successfully"))
})

// get all product with search, filter, pagenation

const getAllProduct = asyncHandler(async (req, res) => {
    const resultParPage = 8
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
    let products = await apiFeature.query

    let filterProductCount = products.length

    apiFeature.pagination(resultParPage)

    // products = await apiFeature.query
    // const resultParPage = 8
    // const productsCount = await Product.countDocuments();
    // const apiFeautures = new ApiFeatures(Product.find(), req.query)
    //     .search()
    //     .filter()
    //     .pagination(resultParPage);

    // const products = await apiFeautures.query



    return res
        .status(200)
        .json(new ApiResponse(200, { products, productsCount, resultParPage, filterProductCount }, "all products fetched successfully"))
})

//get all products (admin)
const getAllProductByAdmin = asyncHandler(async (req, res) => {

    const products = await Product.find()
    if (!products) {
        throw new ApiError(404, "Something went wrong while fetching products ")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, products, "fetched all products successfully"))
})

// get product details
const getProductDetails = asyncHandler(async (req, res) => {
    const productId = req.params.id

    if (!isValidObjectId(productId)) {
        throw new ApiError(404, "invaild productId")
    }

    const product = await Product.findById(productId)

    if (!product) {
        throw new ApiError(404, "somthing want wrong while fetuching product details")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, product, "productDetails fetuched successfully"))

})

//update product
const updateProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id
    const { name, description, price, stock,category } = req.body
    //console.log(productId);
    

    if (!isValidObjectId(productId)) {
        throw new ApiError(404, "invaild productId")
    }

    const product = await Product.findById(productId)

    if (!product) {
        throw new ApiError(401, "product not exist")
    }

    const newProduct = await Product.findByIdAndUpdate(productId, {
        $set: {
            name,
            description,
            stock,
            price,
            category
        }
    },
        {
            new: true
        })

    if (!newProduct) {
        throw new ApiError(500, "Somthing went wrong while updataeting product")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, newProduct, "product updated successfully"))

})

//updateproduct image
const updateProductImage = asyncHandler(async (req, res) => {

    if (!req.files || req.files.length === 0) {
        throw new ApiError(400, "No file uploaded")
    }

    let imageUrl = []

    for (let i = 0; i < req.files.length; i++) {
        const localFilePath = req.files[i].path

        const result = await uploadOnCloudinary(localFilePath);
        imageUrl.push(result.url)

    }

    const updatedImage = await Product.findByIdAndUpdate(req.params.id, {
        $addToSet: {
            images: imageUrl
        }
    })

    if (!updatedImage) {
        throw new ApiError(404, "somthing went wrong while updateing images ")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, imageUrl, "images updated successfully"))
})
// delete product with image and review

const deleteProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id

    if (!isValidObjectId(productId)) {
        throw new ApiError(404, "invaild productId")
    }

    const product = await Product.findById(productId)

    if (!product) {
        throw new ApiError(401, "product not found")
    }

    const { images } = product

    if (images && images.length > 0) {
        for (const image of images) {
            await deleteOnCloudinary(image)
        }
    }

    //Delete associated reviews
    // const {reviews} = product

    // if(reviews && reviews.length > 0){
    //     for(const review of reviews){
    //         await de
    //     }
    // }

    await Product.findByIdAndDelete(productId)

    return res
        .status(200)
        .json(new ApiResponse(200, productId, "product deleted successfully"))
})

// create review or update review 
const createReview = asyncHandler(async (req, res) => {
    const { ratings, comment, productId } = req.body

    const review = {
        user: req.user._id,
        avatar: req.user.avatar,
        fullName: req.user.fullName,
        ratings: Number(ratings),
        comment,
    }
    const product = await Product.findById(productId)

    if (!product) {
        throw new ApiError(404, "product not found")
    }

    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString());
    console.log(isReviewed);


    if (isReviewed) {
        isReviewed.ratings = review.ratings;
        isReviewed.comment = review.comment

    } else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, rev) => acc + rev.ratings, 0) / product.reviews.length;

    await product.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200, review, "create review successfully"))
})

const getAllReview = asyncHandler(async (req, res) => {
     const {id} = req.params
   // console.log(id);
    const product = await Product.findById(id)
    

    if (!product) {
        throw new ApiError(404, "product not found")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, { reviews: product.reviews }, "fetuched review successfully"))
})

//delete review

const deleteReview = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.query.productId);

    if (!product) {
        throw new ApiError(404, "product not found")
    }

    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.ratings
    });

    let rating = 0

    if (reviews.length === 0) {
        rating = 0;
    } else {
        rating = avg / reviews.length
    }

    const numOfReviews = reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        rating,
        reviews,
        numOfReviews
    }, { new: true })
    return res
        .status(200)
        .json(new ApiResponse(200, `successfully deleted your review`))
})

// get Product'category
const getCategoryProducts = asyncHandler(async (req, res) => {
    const productCategory = await Product.distinct("category")
    // console.log("ptryryr",productCategory);

    if (!productCategory.length) {
        throw new ApiError(404, "not  categories available")
    }

    // store one product from each category
    const productByCategory = []

    for (const category of productCategory) {
        const product = await Product.findOne({ category: category })

        if (!product) {
            throw new ApiError(404, "Product not found")
        }
        productByCategory.push(product)
    }
    return res
        .status(200)
        .json(new ApiResponse(200, productByCategory, "product category"))
})

//search product
const searchProduct = asyncHandler(async (req, res) => {
    const query = req.query.q
    //console.log("backqur", query);

    if (!query) {
        throw new ApiError(404, "query not found")
    }

    const regex = new RegExp(query, 'i', 'g')

    const product = await Product.find({
        "$or": [
            {
                category: regex
            },
            {
                description: regex
            },
            {
                name: regex
            }
        ]
    })
    return res
        .status(200)
     .json(new ApiResponse(200,product," search product list"))
})

// get category products
const getProductsOfCategory = asyncHandler(async (req, res) => {
    const {category} = req.body || req?.query

    if(!category){
        throw new ApiError(404,"category not found")
    }

    const product = await Product.find({category})
    // console.log("ptryryr",productCategory);

    if (!product.length) {
        throw new ApiError(404, "no products exites in this category ")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, product, "products found successfull"))
})



export {
    createProduct,
    getAllProduct,
    getAllProductByAdmin,
    getProductDetails,
    updateProduct,
    deleteProduct,
    createReview,
    getAllReview,
    deleteReview,
    updateProductImage,
    getCategoryProducts,
    getProductsOfCategory,
    searchProduct,
}