class ApiFeatures{
    constructor(query, queryStr){
        this.query = query,
        this.queryStr = queryStr
    }

    search(){
        const keyword = this.queryStr.keyword
       ? {
            name:{
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        }
       :{}
        this.query = this.query.find({...keyword});
        return this
    }

    filter(){
        const queryCopy = {...this.queryStr};

        //removing some fields for category
        const removeFields = ["page", "limit"];
        
        removeFields.forEach((key)=> delete queryCopy[key]);
        //filter for price and rating

        let queryStr = JSON.stringify(queryCopy);

        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key)=> `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr))
        return this
    }

    pagination(resultParPage){
        const currentPage = Number(this.query.page) || 1;
        const skip = resultParPage * (currentPage-1);
        this.query = this.query.limit(resultParPage).skip(skip);
         return this
    }
}

export {ApiFeatures}