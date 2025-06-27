function validate(req,res){
    const {url}=req.body;
    if(url==null || url==''){
        res.status(400).send("original url is empty");
    }
}
module.exports = validate;