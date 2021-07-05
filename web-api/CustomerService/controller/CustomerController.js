const CustomerSchema = require('../model/CustomerDTO');


const saveCustomer = async (req, resp) =>{
    CustomerSchema.findOne({CustomerNic: req.body.CustomerNic}).then(result=>{
        if(result == null){
            const customer = new CustomerSchema({
                    CustomerName:req.body.CustomerName,
                    CustomerEmail:req.body. CustomerEmail,
                    CustomerMobile:req.body.CustomerMobile,
                    CustomerWork:req.body.CustomerWork,
                    CustomerNic:req.body. CustomerNic,
                    CustomerGender:req.body.CustomerGender,
                    CustomerRole:req.body.CustomerRole,
                    CustomerHiredDate:req.body.CustomerHiredDate

            });
            customer.save().then(result => {
                resp.status(200).json({isSaved: true, data: result});
            }).catch(error => {
                resp.status(500).json(error);
            })
        }else{
            resp.status(200).json({isSaved: false, data: result});
        }
    }).catch(er=>{
        resp.status(500).json(er);
    });



};

const getAllCustomers = (req, resp) => {
    CustomerSchema.find().then(result =>{
        resp.status(200).json(result);

    }).catch(error =>{
        resp.status(500).json(result);
    })
};

const getCustomer = (req, resp) => {
   const {id} = req.params;
   CustomerSchema.findById(id).then(result =>{
      resp.status(200).json(result);
   }).catch(error =>{
       resp.status(500).json(result);
   })
};
const getAllCustomersSelect = (req, resp) => {
    CustomerSchema.find().then(result => {
        resp.status(200).json(result);
    }).catch(error => {
        resp.status(500).json(result);
    })
}

const deleteCustomer=(req,resp)=>{
    CustomerSchema.deleteOne({CustomerNic:req.headers.id}).then(result=>{
        if (result.deletedCount>0){
            resp.status(200).json({message:'deleted'});
        } else{
            resp.status(200).json({message:'try Again'});
        }
    }).catch(error=>{
        resp.status(500).json({error});
    })
};


module.exports ={
    saveCustomer,
    getAllCustomers,
    getCustomer,
    deleteCustomer,
    getAllCustomersSelect
};
